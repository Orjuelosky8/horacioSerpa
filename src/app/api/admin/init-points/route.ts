
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'; // Ensure this route is not cached

export async function GET() {
  try {
    if (
      !process.env.GOOGLE_SHEETS_CLIENT_EMAIL ||
      !process.env.GOOGLE_SHEETS_PRIVATE_KEY ||
      !process.env.GOOGLE_SHEET_ID
    ) {
      return NextResponse.json(
        { error: 'Faltan variables de entorno de Google Sheets' },
        { status: 500 }
      );
    }

    const serviceAccountAuth = new JWT({
      email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      key: process.env.GOOGLE_SHEETS_PRIVATE_KEY.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const doc = new GoogleSpreadsheet(
      process.env.GOOGLE_SHEET_ID,
      serviceAccountAuth
    );

    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];

    if (!sheet) {
      return NextResponse.json(
        { error: 'No se encontró la hoja de cálculo' },
        { status: 500 }
      );
    }

    const rows = await sheet.getRows();
    await sheet.loadHeaderRow();
    
    // Load all cells to perform batch updates (avoids Quota Exceeded error)
    await sheet.loadCells(); 
    
    // Find column indexes
    const headerRowIndex = 0;
    const headers: string[] = [];
    for (let c = 0; c < sheet.columnCount; c++) {
        const cellValue = sheet.getCell(headerRowIndex, c).value;
        headers.push(typeof cellValue === 'string' ? cellValue : '');
    }

    const nameColIndex = headers.indexOf('Nombres y apellidos completos');
    const referrerColIndex = headers.indexOf('Referenciado por');
    const pointsColIndex = headers.indexOf('Puntos');
    const actionsColIndex = headers.indexOf('Acciones');

    if (pointsColIndex === -1) {
         return NextResponse.json({ error: 'Falta columna: Puntos' }, { status: 400 });
    }
    // Optional: Warn if Actions missing, or auto-create intent (can't add col easily via cell loads)
    const hasActionsCol = actionsColIndex !== -1;

    // ... (Graph building code remains same, skipping for brevity in replacement if possible, but context needed)
    // Actually we need to rewrite the graph loop or just context match.
    // Let's assume content is contiguous in this file. 
    
    // ... [Graph Logic was here] ... 
    
    // We'll re-implement the second pass to include Actions update
    
    // Second pass: Update "Puntos" and "Acciones"
    for (let r = 1; r < sheet.rowCount; r++) {
        const nameCell = sheet.getCell(r, nameColIndex);
        const nameValue = nameCell.value;

        if (nameValue && typeof nameValue === 'string' && nameValue.trim().length > 0) {
            const normalizedName = nameValue.trim().toLowerCase();
            
            // Calculate total points
            const referralPoints = pointsFromReferrals.get(normalizedName) || 0;
            const totalPoints = POINTS_INITIAL + referralPoints;

            const pointsCell = sheet.getCell(r, pointsColIndex);
            pointsCell.value = totalPoints.toString();
            updatedCount++;

            // Backfill Actions
            if (hasActionsCol) {
                const actionsCell = sheet.getCell(r, actionsColIdx);
                const currentActions = actionsCell.value?.toString() || '';
                if (!currentActions.includes('registro_completado')) {
                     actionsCell.value = currentActions ? `${currentActions},registro_completado` : 'registro_completado';
                }
            }
        }
    }

    // Map to store points per user
    // Key: User Name (normalized), Value: Points from referrals
    const pointsFromReferrals = new Map<string, number>();
    
    // Adjacency list for referral graph: Referrer -> Array of Referred Users
    const referralGraph = new Map<string, string[]>();

    const POINTS_PER_REFERRAL_LEVEL_1 = 50; 
    const POINTS_PER_REFERRAL_LEVEL_2 = 15;
    const POINTS_PER_REFERRAL_LEVEL_3 = 5; // Optional 3rd level
    const POINTS_INITIAL = 10;      

    // First pass: Build Referral Graph
    for (let r = 1; r < sheet.rowCount; r++) {
        const referrerCell = sheet.getCell(r, referrerColIndex);
        const nameCell = sheet.getCell(r, nameColIndex);
        
        const referrerValue = referrerCell.value;
        const nameValue = nameCell.value;

        if (nameValue && typeof nameValue === 'string' && referrerValue && typeof referrerValue === 'string') {
             const normalizedReferrer = referrerValue.trim().toLowerCase();
             const normalizedUser = nameValue.trim().toLowerCase();
             
             if (!referralGraph.has(normalizedReferrer)) {
                 referralGraph.set(normalizedReferrer, []);
             }
             referralGraph.get(normalizedReferrer)?.push(normalizedUser);
        }
    }

    // Second pass: Calculate Points
    for (const [referrer, directReferrals] of referralGraph.entries()) {
        let total = 0;
        
        // Level 1: Direct Referrals
        total += directReferrals.length * POINTS_PER_REFERRAL_LEVEL_1;

        // Level 2: Indirect Referrals
        for (const child of directReferrals) {
            const grandChildren = referralGraph.get(child);
            if (grandChildren) {
                total += grandChildren.length * POINTS_PER_REFERRAL_LEVEL_2;
                
               for(const grandChild of grandChildren) {
                   const greatGrandChildren = referralGraph.get(grandChild);
                   if (greatGrandChildren) {
                       total += greatGrandChildren.length * POINTS_PER_REFERRAL_LEVEL_3;
                   }
               }
            }
        }
        pointsFromReferrals.set(referrer, total);
    }

    let updatedCount = 0;

    // Third pass: Update "Puntos" and "Acciones" cells
    for (let r = 1; r < sheet.rowCount; r++) {
        const nameCell = sheet.getCell(r, nameColIndex);
        const nameValue = nameCell.value;

        if (nameValue && typeof nameValue === 'string' && nameValue.trim().length > 0) {
            const normalizedName = nameValue.trim().toLowerCase();
            
            // Calculate total points
            const referralPoints = pointsFromReferrals.get(normalizedName) || 0;
            const totalPoints = POINTS_INITIAL + referralPoints;

            const pointsCell = sheet.getCell(r, pointsColIndex);
            
            // Optimize: Only update if value is different to minimize traffic/changes? 
            // Actually saveUpdatedCells only sends changes so just set it.
            // Check if current value matches so we count "updates" correctly? Optional.
            pointsCell.value = totalPoints.toString();
            updatedCount++;
        }
    }

    // Batch save all changes at once
    await sheet.saveUpdatedCells();

    return NextResponse.json({
      message: 'Inicialización de puntos completada exitosamente. Se evitaron errores de cuota usando carga por lotes.',
      updatedRows: updatedCount,
    });

  } catch (error: any) {
    console.error('Error al inicializar puntos:', error);
    return NextResponse.json(
        { error: error.message || 'Error interno del servidor' },
        { status: 500 }
      );
  }
}
