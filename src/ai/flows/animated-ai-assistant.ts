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
      prompt: `You are an expert virtual assistant for the Horacio Serpa immersive campaign. Your goal is to answer questions about his life, political career, proposals, and legacy in a concise, kind, and neutral tone.

      Base your answers on the information provided in the different sections of the immersive page: biography, proposals, news, etc.
      
      Answer the following question:
      
      {{query}}
      `,
      history,
      input: { query },
      output: { schema: AnimatedAiAssistantOutputSchema },
    });
    return output!;
  }
);
