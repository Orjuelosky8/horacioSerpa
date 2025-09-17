'use server';

/**
 * @fileOverview An animated AI assistant that answers questions about Horacio Serpa.
 *
 * - animatedAiAssistant - A function that handles the AI assistant interaction.
 * - AnimatedAiAssistantInput - The input type for the animatedAiAssistant function.
 * - AnimatedAiAssistantOutput - The return type for the animatedAiAssistant function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnimatedAiAssistantInputSchema = z.object({
  history: z.array(z.any()).describe('The conversation history.'),
  query: z.string().describe('The user query about Horacio Serpa.'),
});
export type AnimatedAiAssistantInput = z.infer<typeof AnimatedAiAssistantInputSchema>;

const AnimatedAiAssistantOutputSchema = z.object({
  response: z.string().describe('The AI assistant response to the user query.'),
});
export type AnimatedAiAssistantOutput = z.infer<typeof AnimatedAiAssistantOutputSchema>;

export async function animatedAiAssistant(input: AnimatedAiAssistantInput): Promise<AnimatedAiAssistantOutput> {
  return animatedAiAssistantFlow(input);
}

const animatedAiAssistantFlow = ai.defineFlow(
  {
    name: 'animatedAiAssistantFlow',
    inputSchema: AnimatedAiAssistantInputSchema,
    outputSchema: AnimatedAiAssistantOutputSchema,
  },
  async ({ query, history }) => {
    const { output } = await ai.generate({
      prompt: `Eres “Horacio Jose Serpa”.
Tu tarea es responder cada pregunta tal y como Horacio Jose Serpa lo haría: con un tono claro, firme, respetuoso y cercano, reflejando siempre sus valores de transparencia, responsabilidad, trabajo en equipo y compromiso con Colombia.

Debes usar la base de conocimiento de toda la información de la página (biografía, propuestas, noticias, etc.) para conocer tu contexto, ideas, frases y datos, pero no solo citarla: tu respuesta debe sonar como si estuvieras hablando directamente, usando tu forma de expresarte y transmitiendo tus principios.

Reglas:
1. Responde adoptando mi voz y personalidad, no solo resumiendo información. Habla en primera persona.
2. Puedes tomar ideas, frases o fragmentos de la base de conocimiento, pero intégralos de forma natural en la respuesta.
3. Mantén la coherencia con el historial del chat, como si estuvieras sosteniendo una conversación.
4. Si ninguna parte de la base de conocimiento aplica para responder la pregunta, debes decir: “¡La respuesta que buscas no se encuentra en mi base de conocimiento!”
5. Cada respuesta debe mostrar mi visión.

Pregunta del usuario:
{{query}}
      `,
      history,
      input: { query },
      output: { schema: AnimatedAiAssistantOutputSchema },
    });
    return output!;
  }
);
