'use server';

import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import { z } from 'zod';

const formSchema = z.object({
  fullName: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
  email: z.string().email('Correo electrónico no válido'),
  phone: z.string().min(7, 'El teléfono debe tener al menos 7 dígitos'),
  idCard: z.string().min(5, 'La cédula debe tener al menos 5 dígitos'),
  department: z.string().min(1, 'Debes seleccionar un departamento'),
  city: z.string().min(1, 'Debes seleccionar un municipio'),
  referrer: z
    .string()
    .min(3, 'El nombre del referido debe tener al menos 3 caracteres'),
  dataAuthorization: z.literal('on', {
    errorMap: () => ({ message: 'Debes autorizar el tratamiento de datos' }),
  }),
  proposal: z.string().optional(),
});

type FormState = {
  success: boolean;
  message: string;
  errors?: z.ZodIssue[];
  values?: z.infer<typeof formSchema>;
};

// 🔐 Validación de envs antes de crear el JWT
if (!process.env.GOOGLE_SHEETS_CLIENT_EMAIL) {
  throw new Error('La variable de entorno GOOGLE_SHEETS_CLIENT_EMAIL no está definida.');
}
if (!process.env.GOOGLE_SHEETS_PRIVATE_KEY) {
  throw new Error('La variable de entorno GOOGLE_SHEETS_PRIVATE_KEY no está definida.');
}
if (!process.env.GOOGLE_SHEET_ID) {
  throw new Error('La variable de entorno GOOGLE_SHEET_ID no está definida.');
}

const serviceAccountAuth = new JWT({
  email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
  // La clave privada de Google viene con saltos de línea \n.
  // Las variables de entorno los escapan como \\n.
  // Este reemplazo es crucial para que la clave sea válida.
  key: process.env.GOOGLE_SHEETS_PRIVATE_KEY.replace(/\\n/g, '\n'),
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID!, serviceAccountAuth);

export async function submitForm(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const rawData = Object.fromEntries(formData.entries());

  const validatedFields = formSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      success: false,
      message: 'Por favor, corrige los errores en el formulario.',
      errors: validatedFields.error.issues,
      values: rawData as any,
    };
  }

  const {
    fullName,
    email,
    phone,
    idCard,
    department,
    city,
    referrer,
    proposal,
  } = validatedFields.data;

  try {
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0]; // Usar la primera hoja del documento

    if (!sheet) {
      throw new Error('No se encontró ninguna hoja en el documento de Google Sheets.');
    }

    await sheet.addRow({
      'Marca temporal': new Date().toLocaleString('es-CO', {
        timeZone: 'America/Bogota',
      }),
      'Nombres y apellidos completos': fullName,
      'Correo electrónico': email,
      'Teléfono celular / WhatsApp': phone,
      'Cédula de ciudadanía': idCard,
      'Departamento': department,
      'Municipio - Ciudad': city,
      '¿Quién te contó de mí? Escribe su Nombre completo.': referrer,
      '¿Autoriza el tratamiento de sus datos?': 'Sí',
      'Dinos tu propuesta': proposal || '',
    });

    return {
      success: true,
      message:
        '¡Gracias por registrarte! Tu participación ha sido registrada con éxito.',
      values: {
        fullName: '',
        email: '',
        phone: '',
        idCard: '',
        department: '',
        city: '',
        referrer: '',
        proposal: '',
        dataAuthorization: '',
      },
    };
  } catch (error) {
    console.error('Error al enviar a Google Sheets:', error);
    const errorMessage =
      error instanceof Error ? error.message : 'Un error desconocido ocurrió.';
    return {
      success: false,
      message: `Ocurrió un error al enviar tu información. Detalles: ${errorMessage}`,
      values: validatedFields.data, // Devuelve los datos para repoblar el formulario
    };
  }
}
