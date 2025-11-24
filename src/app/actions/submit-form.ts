'use server';

import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import { z } from 'zod';

const formSchema = z.object({
  fullName: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
  email: z.string().email('Correo electrónico no válido'),
  phone: z
    .string()
    .min(7, 'El teléfono debe tener al menos 7 dígitos')
    .regex(/^\d+$/, 'El teléfono solo debe contener números'),
  documentType: z.string().min(1, 'Debes seleccionar un tipo de documento'),
  idCard: z.string().min(5, 'El número de documento debe tener al menos 5 dígitos'),
  department: z.string().min(1, 'Debes seleccionar un departamento'),
  city: z.string().min(1, 'Debes seleccionar un municipio'),
  referrer: z
    .string()
    .min(1, 'Debes seleccionar un referente de la lista'),
  dataAuthorization: z.literal('on', {
    errorMap: () => ({ message: 'Debes autorizar el tratamiento de datos' }),
  }),
  proposal: z.string().optional(),
}).refine(data => {
  if (data.documentType === 'Pasaporte') {
    return true; // Si es pasaporte, no se aplica la validación de solo números
  }
  return /^\d+$/.test(data.idCard);
}, {
  message: 'La cédula de ciudadanía o extranjería solo debe contener números',
  path: ['idCard'],
});


type FormState = {
  success: boolean;
  message: string;
  errors?: z.ZodIssue[];
  values?: z.infer<typeof formSchema>;
};

export async function submitForm(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  console.log('DEBUG: La función submitForm se ha iniciado.');

  const rawData = Object.fromEntries(formData.entries());
  const validatedFields = formSchema.safeParse(rawData);

  if (!validatedFields.success) {
    console.log(
      'DEBUG: La validación del formulario falló.',
      validatedFields.error.flatten().fieldErrors
    );
    return {
      success: false,
      message: 'Por favor, corrige los errores en el formulario.',
      errors: validatedFields.error.issues,
      values: rawData as any,
    };
  }

  console.log('DEBUG: La validación del formulario fue exitosa.');

  try {
    const missingEnvVars: string[] = [];

    if (!process.env.GOOGLE_SHEETS_CLIENT_EMAIL) {
      missingEnvVars.push('GOOGLE_SHEETS_CLIENT_EMAIL');
    }
    if (!process.env.GOOGLE_SHEETS_PRIVATE_KEY) {
      missingEnvVars.push('GOOGLE_SHEETS_PRIVATE_KEY');
    }
    if (!process.env.GOOGLE_SHEET_ID) {
      missingEnvVars.push('GOOGLE_SHEET_ID');
    }

    if (missingEnvVars.length > 0) {
      throw new Error(
        `Error de configuración del servidor: faltan las siguientes variables de entorno: ${missingEnvVars.join(
          ', '
        )}.`
      );
    }

    const serviceAccountAuth = new JWT({
      email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      key: process.env.GOOGLE_SHEETS_PRIVATE_KEY.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const doc = new GoogleSpreadsheet(
      process.env.GOOGLE_SHEET_ID!,
      serviceAccountAuth
    );

    console.log(
      'DEBUG EMAIL:',
      process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      '| SHEET_ID:',
      process.env.GOOGLE_SHEET_ID
    );

    console.log('DEBUG: Conectando a Google Sheets...');
    await doc.loadInfo();
    console.log('DEBUG: ¡Conexión exitosa! Título del documento:', doc.title);

    const sheet = doc.sheetsByIndex[0];
    console.log('DEBUG: Hoja seleccionada:', sheet?.title);

    if (!sheet) {
      throw new Error(
        'No se encontró ninguna hoja en el documento de Google Sheets.'
      );
    }

    const {
      fullName,
      email,
      phone,
      documentType,
      idCard,
      department,
      city,
      referrer,
      proposal,
    } = validatedFields.data;

    console.log('DEBUG: Añadiendo fila a la hoja...');
    await sheet.addRow({
      'Fecha y Hora': new Date().toLocaleString('es-CO', {
        timeZone: 'America/Bogota',
      }),
      'Nombre completo': fullName,
      'Tipo de Documento': documentType,
      'Número de documento': idCard,
      'WhatsApp / Celular': phone,
      'Correo electrónico': email,
      'Departamento': department,
      'Ciudad / Municipio': city,
      'Acepta la política de tratamiento de datos personales': 'Sí',
      'Referenciado por': referrer,
      'Déjanos tu Propuesta': proposal || '',
    });
    
    console.log('DEBUG: ¡Fila añadida con éxito!');

    return {
      success: true,
      message:
        '¡Gracias por registrarte! Tu participación ha sido registrada con éxito.',
      values: {
        fullName: '',
        email: '',
        phone: '',
        documentType: '',
        idCard: '',
        department: '',
        city: '',
        referrer: '',
        proposal: '',
        dataAuthorization: 'on' as any,
      },
    };
  } catch (error: any) {
    const apiDetails =
      error?.response?.data?.error?.message ||
      error?.response?.data ||
      null;

    const baseMsg = 
      error instanceof Error
        ? error.message
        : typeof error === 'string'
        ? error
        : JSON.stringify(error);

    const fullMessage =
      apiDetails && apiDetails !== baseMsg
        ? `${baseMsg} | API_DETAILS: ${JSON.stringify(apiDetails)}`
        : baseMsg;

    console.error('DEBUG: ERROR al procesar el formulario:', fullMessage);

    return {
      success: false,
      message: `Ocurrió un error en el servidor. Por favor, inténtalo más tarde.`,
      values: validatedFields.success ? validatedFields.data : (rawData as any),
    };
  }

}