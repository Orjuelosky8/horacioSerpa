
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const { documentId } = await request.json();

    if (!documentId) {
      return NextResponse.json({ error: 'Falta el número de documento' }, { status: 400 });
    }

    if (
        !process.env.GOOGLE_SHEETS_CLIENT_EMAIL ||
        !process.env.GOOGLE_SHEETS_PRIVATE_KEY ||
        !process.env.GOOGLE_SHEET_ID
      ) {
        return NextResponse.json({ error: 'Configuración de servidor incompleta' }, { status: 500 });
      }
  
      const serviceAccountAuth = new JWT({
        email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
        key: process.env.GOOGLE_SHEETS_PRIVATE_KEY.replace(/\\n/g, '\n'),
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
      });
  
      const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID, serviceAccountAuth);
      await doc.loadInfo();
      const sheet = doc.sheetsByIndex[0];

      // Load all cells for search & rank calc
      await sheet.loadCells();

      // Mappings
      const headers: string[] = [];
      for (let c = 0; c < sheet.columnCount; c++) {
          const val = sheet.getCell(0, c).value;
          headers.push(typeof val === 'string' ? val.toLowerCase().trim() : '');
      }

      console.log('--- LOGIN DEBUG ---');
      console.log('Headers Found:', headers);

      // Fix: Prioritize strict matches for "Cédula". 
      // Avoid matching "Tipo de documento" which contains "documento".
      let idColIdx = headers.findIndex(h => 
        (h.includes('cedula') || h.includes('cédula')) && !h.includes('tipo')
      );

      // Fallback: If no "cedula" column, try "documento" but ensure it's not "tipo de documento"
      if (idColIdx === -1) {
          idColIdx = headers.findIndex(h => h.includes(' documento') && !h.includes('tipo'));
      }
      // Fallback 2: Exact "numero de documento" or similar if needed
      
      const nameColIdx = headers.findIndex(h => h.includes('nombres'));
      const pointsColIdx = headers.findIndex(h => h.includes('puntos'));
      const actionsColIdx = headers.findIndex(h => h.includes('acciones'));
      const referrerColIdx = headers.findIndex(h => h.includes('referenciado'));

      console.log('Indices Corrected:', { idColIdx, nameColIdx, pointsColIdx });

      if (idColIdx === -1 || pointsColIdx === -1 || nameColIdx === -1) {
          console.error('Missing Columns');
          return NextResponse.json({ error: 'Columnas requeridas no encontradas. Se busca: "Cédula" o "Documento" (no tipo), "Puntos", "Nombres".' }, { status: 500 });
      }

      // 1. Find User by ID
      let userRowIndex = -1;
      let userData: any = null;

      // Normalize input ID: remove dots, spaces, check valid length
      // We accept input, strip non-digits. 
      const cleanId = documentId.toString().replace(/\D/g, '');
      console.log(`Checking ID: ${cleanId} in Col Index: ${idColIdx}`);

      if (!cleanId) {
         return NextResponse.json({ error: 'Cédula inválida' }, { status: 400 });
      }

      for (let r = 1; r < sheet.rowCount; r++) {
          const rawCell = sheet.getCell(r, idColIdx).value;
          if (!rawCell) continue;

          // Normalize cell ID too
          const cellId = rawCell.toString().replace(/\D/g, '');
          
          if (cellId === cleanId) {
              console.log(`MATCH FOUND at Row ${r}`);
              userRowIndex = r;
              userData = {
                  name: sheet.getCell(r, nameColIdx).value?.toString(),
                  points: parseInt(sheet.getCell(r, pointsColIdx).value?.toString() || '0', 10),
                  actions: (sheet.getCell(r, actionsColIdx).value?.toString() || '').split(',').filter(Boolean)
              };
              break;
          }
      }

      if (!userData) {
          console.log('User NOT found after scanning all rows.');
          return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
      }

      // 2. Calculate Rank (Get all points, sort, find index)
      const allPoints: number[] = [];
      for (let r = 1; r < sheet.rowCount; r++) {
           const Val = sheet.getCell(r, pointsColIdx).value;
           const p = parseInt(Val?.toString() || '0', 10);
           if (!isNaN(p)) allPoints.push(p);
      }
      // Sort Descending
      allPoints.sort((a, b) => b - a);
      // Rank is index + 1
      const rank = allPoints.indexOf(userData.points) + 1;

      // 3. Count Referrals
      let referralCount = 0;
      if (referrerColIdx !== -1 && userData.name) {
          const myNameLower = userData.name.toLowerCase().trim();
          for (let r = 1; r < sheet.rowCount; r++) {
               const refBy = sheet.getCell(r, referrerColIdx).value?.toString().toLowerCase().trim();
               if (refBy === myNameLower) {
                   referralCount++;
               }
          }
      }

      return NextResponse.json({
          success: true,
          user: {
              ...userData,
              rank,
              referralCount
          }
      });

  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}
