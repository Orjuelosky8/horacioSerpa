'use server';

import { GoogleSpreadsheet } from 'google-spreadsheet';
import { z } from 'zod';

const formSchema = z.object({
  fullName: z.string().min(1, 'El nombre es requerido'),
  email: z.string().email('Correo electrónico no válido'),
  phone: z.string().min(1, 'El teléfono es requerido'),
  idCard: z.string().min(1, 'La cédula es requerida'),
  department: z.string().min(1, 'El departamento es requerido'),
  city: z.string().min(1, 'El municipio es requerido'),
  referrer: z.string().min(1, 'El nombre de quien te contó es requerido'),
  dataAuthorization: z.enum(['Sí'], {
    errorMap: () => ({ message: 'Debes autorizar el tratamiento de datos' }),
  }),
  proposal: z.string().optional(),
});

type FormState = {
  success: boolean;
  message: string;
  errors?: {
    [key in keyof z.infer<typeof formSchema>]?: string[];
  };
};

export async function submitForm(prevState: FormState, formData: FormData): Promise<FormState> {
  const rawData = Object.fromEntries(formData.entries());

  // Special handling for checkbox/boolean
  rawData.dataAuthorization = rawData.dataAuthorization ? 'Sí' : undefined;

  const validatedFields = formSchema.safeParse(rawData);

  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors);
    return {
      success: false,
      message: 'Por favor, corrige los errores en el formulario.',
      errors: validatedFields.error.flatten().fieldErrors,
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
    dataAuthorization,
    proposal,
  } = validatedFields.data;

  try {
    const serviceAccountAuth = {
      client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL!,
      private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY!.replace(/\\n/g, '\n'),
    };

    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID!, serviceAccountAuth);

    await doc.loadInfo();
    const sheet = doc.sheetsById[1238300168]; // Use GID

    if (!sheet) {
      throw new Error('Google Sheet no encontrada (GID: 1238300168).');
    }

    await sheet.addRow({
      'Marca temporal': new Date().toLocaleString('es-CO', { timeZone: 'America/Bogota' }),
      'Nombres y apellidos completos': fullName,
      'Correo electrónico': email,
      'Teléfono celular / WhatsApp': phone,
      'Cédula de ciudadanía': idCard,
      'Departamento': department,
      'Municipio - Ciudad': city,
      '¿Quién te contó de mí? Escribe su Nombre completo.': referrer,
      '¿Autoriza el tratamiento de sus datos?': dataAuthorization,
      'Dinos tu propuesta': proposal || '',
    });

    return {
      success: true,
      message: '¡Gracias por registrarte! Tu participación ha sido registrada con éxito.',
    };
  } catch (error) {
    console.error('Error al enviar a Google Sheets:', error);
    return {
      success: false,
      message:
        'Ocurrió un error al enviar tu información. Por favor, inténtalo de nuevo más tarde.',
    };
  }
}
