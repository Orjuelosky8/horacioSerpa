
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import { NextResponse } from 'next/server';
import { RankingUser } from '@/types/gamification';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
     // Check permissions
    if (
      !process.env.GOOGLE_SHEETS_CLIENT_EMAIL ||
      !process.env.GOOGLE_SHEETS_PRIVATE_KEY ||
      !process.env.GOOGLE_SHEET_ID
    ) {
      return NextResponse.json({ error: 'Faltan credenciales' }, { status: 500 });
    }

    const serviceAccountAuth = new JWT({
      email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      key: process.env.GOOGLE_SHEETS_PRIVATE_KEY.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID, serviceAccountAuth);
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];

    if (!sheet) return NextResponse.json([], { status: 200 });

    const rows = await sheet.getRows();
    
    // Parse rows to users
    const users: RankingUser[] = rows
        .map((row) => {
            const name = row.get('Nombres y apellidos completos');
            const pointsStr = row.get('Puntos');
            
            if (!name) return null;

            const points = parseInt(pointsStr || '0', 10);
            return {
                name: name.toString().split(' ')[0], // First name mainly for privacy/space? Or full name. Let's use Full for now or truncate.
                // Keeping full name might be too long for podium, but let's try.
                // Actually, let's just use First Name + Last Initial if possible, or just the name as is.
                // For safety, let's just take the string.
                fullName: name.toString(),
                points: isNaN(points) ? 0 : points,
                rank: 0, // calc later
            };
        })
        .filter((u): u is { name: string; fullName: string; points: number; rank: number } => u !== null);

    // Sort by points desc
    users.sort((a, b) => b.points - a.points);

    // Assign rank and format name
    const rankedUsers: RankingUser[] = users.map((u, index) => ({
        rank: index + 1,
        name: u.fullName, // Use full name as requested
        points: u.points,
        avatar: undefined
    })).slice(0, 25); // Top 25 Only

    return NextResponse.json(rankedUsers);

  } catch (error) {
    console.error('Error fetching ranking:', error);
    return NextResponse.json({ error: 'Error getting ranking' }, { status: 500 });
  }
}
