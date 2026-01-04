
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const ACTIONS_CONFIG: Record<string, number> = {
  'share_whatsapp': 50,
  'view_proposal': 20,
  'complete_profile': 100,
  'visit_instagram': 30, // Example extra
};

export async function POST(request: Request) {
  try {
    const { userId, actionId } = await request.json();

    if (!userId || !actionId) {
      return NextResponse.json({ error: 'Faltan parámetros user/action' }, { status: 400 });
    }
    
    if (!ACTIONS_CONFIG[actionId]) {
         return NextResponse.json({ error: 'Acción no válida' }, { status: 400 });
    }

    if (
      !process.env.GOOGLE_SHEETS_CLIENT_EMAIL ||
      !process.env.GOOGLE_SHEETS_PRIVATE_KEY ||
      !process.env.GOOGLE_SHEET_ID
    ) {
      return NextResponse.json({ error: 'Configuración incompleta' }, { status: 500 });
    }

    const serviceAccountAuth = new JWT({
      email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      key: process.env.GOOGLE_SHEETS_PRIVATE_KEY.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID, serviceAccountAuth);
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];

    // Batch load for performance
    await sheet.loadCells();
    
    // Find columns
    const headerRowIndex = 0;
    const headers: string[] = [];
    for (let c = 0; c < sheet.columnCount; c++) {
        headers.push(sheet.getCell(headerRowIndex, c).value?.toString().toLowerCase() || '');
    }

    // Try to match "Cedula", "Telefono", or "Nombre"?
    // User ID here is likely the Name or Phone passed from UI.
    // For simplicity given prev prompt: Match by "Nombres y apellidos completos" (fuzzy) OR "Teléfono"
    
    const nameColIdx = headers.findIndex(h => h.includes('nombres') && h.includes('apellidos'));
    const phoneColIdx = headers.findIndex(h => h.includes('teléfono') || h.includes('celular'));
    const pointsColIdx = headers.findIndex(h => h === 'puntos');
    const actionsColIdx = headers.findIndex(h => h === 'acciones');
    
    if (pointsColIdx === -1) return NextResponse.json({ error: 'Columna Puntos faltante' }, { status: 500 });
    
    // Safety check for Actions column
    // If actionsColIdx is -1, we can't save state properly. We should error or skip.
    if (actionsColIdx === -1) {
         return NextResponse.json({ error: 'Columna Acciones faltante en Excel. Agrégala manualmente.' }, { status: 400 });
    }

    let targetRowIndex = -1;
    
    // Search user
    for (let r = 1; r < sheet.rowCount; r++) {
        const nameVal = sheet.getCell(r, nameColIdx).value?.toString().trim().toLowerCase();
        const phoneVal = sheet.getCell(r, phoneColIdx).value?.toString().trim();
        
        const searchInput = userId.toString().trim().toLowerCase();

        // Check match
        if ((nameVal && nameVal === searchInput) || (phoneVal && phoneVal === searchInput)) {
            targetRowIndex = r;
            break;
        }
    }

    if (targetRowIndex === -1) {
        return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
    }

    // Check if Action already triggers
    const actionsCell = sheet.getCell(targetRowIndex, actionsColIdx);
    const currentActions = actionsCell.value?.toString() || '';
    
    if (currentActions.includes(actionId)) {
        return NextResponse.json({ message: 'Acción ya completada previamente', pointsAdded: 0, alreadyDone: true });
    }

    // Update Actions
    actionsCell.value = currentActions ? `${currentActions},${actionId}` : actionId;

    // Update Points
    const pointsCell = sheet.getCell(targetRowIndex, pointsColIdx);
    const currentPoints = parseInt(pointsCell.value?.toString() || '0', 10);
    const pointsToAdd = ACTIONS_CONFIG[actionId];
    const newPoints = isNaN(currentPoints) ? pointsToAdd : currentPoints + pointsToAdd;
    
    pointsCell.value = newPoints.toString();

    await sheet.saveUpdatedCells();

    return NextResponse.json({ 
        success: true, 
        message: 'Acción registrada', 
        pointsAdded: pointsToAdd, 
        newTotal: newPoints 
    });

  } catch (error: any) {
    console.error('Error recording action:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
