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

    // === AUTENTICACIÓN CORRECTA PARA google-spreadsheet v5 ===
    const serviceAccountAuth = new JWT({
      email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      // reemplazamos los "\n" por saltos de línea reales
      key: process.env.GOOGLE_SHEETS_PRIVATE_KEY!.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    // Inyectamos el auth en el constructor
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
      idCard,
      department,
      city,
      referrer,
      proposal,
    } = validatedFields.data;

    console.log('DEBUG: Añadiendo fila a la hoja...');
    await sheet.addRow({
      // 1. Fecha y Hora
      'Fecha y Hora': new Date().toLocaleString('es-CO', {
        timeZone: 'America/Bogota',
      }),
    
      // 2. Nombre completo
      'Nombre completo': fullName,
    
      // 3. Tipo de Documento
      // Como en el formulario hoy solo pides cédula, podemos dejarlo fijo
      // o luego agregar un select en el form.
      'Tipo de Documento': 'Cédula de ciudadanía',
    
      // 4. Número de documento
      'Número de documento': idCard,
    
      // 5. WhatsApp / Celular
      'WhatsApp / Celular': phone,
    
      // 6. Correo electrónico
      'Correo electrónico': email,
    
      // 7. Departamento
      'Departamento': department,
    
      // 8. Ciudad / Municipio
      'Ciudad / Municipio': city,
    
      // 9. Acepta la política de tratamiento de datos personales
      // Como el zod exige que el checkbox esté en 'on', si llega acá es porque aceptó.
      'Acepta la política de tratamiento de datos personales': 'Sí',
    
      // 10. Referenciado por
      'Referenciado por': referrer,
    
      // 11. Déjanos tu Propuesta
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
        idCard: '',
        department: '',
        city: '',
        referrer: '',
        proposal: '',
        dataAuthorization: 'on' as any,
      },
    };
  } catch (error: any) {
    // Mejor logging para que tú lo veas en el toast
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
      message: `Ocurrió un error al enviar tu información. Detalles: ${fullMessage} | DEBUG EMAIL: *${
        process.env.GOOGLE_SHEETS_CLIENT_EMAIL
      }* | SHEET_ID: ${process.env.GOOGLE_SHEET_ID}`,
      values: validatedFields.success ? validatedFields.data : (rawData as any),
    };
  }

}
