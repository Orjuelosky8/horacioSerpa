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

const prompt = ai.definePrompt({
  name: 'animatedAiAssistantPrompt',
  input: {schema: AnimatedAiAssistantInputSchema},
  output: {schema: AnimatedAiAssistantOutputSchema},
  prompt: `You are an animated AI assistant providing information about Horacio Serpa.

  Answer the following question about Horacio Serpa:

  {{query}}
  `,
});

const animatedAiAssistantFlow = ai.defineFlow(
  {
    name: 'animatedAiAssistantFlow',
    inputSchema: AnimatedAiAssistantInputSchema,
    outputSchema: AnimatedAiAssistantOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
