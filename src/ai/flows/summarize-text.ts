'use server';

/**
 * @fileOverview A utility flow to summarize text.
 *
 * - summarizeText - A function that takes text and returns a summary.
 * - SummarizeTextInput - The input type for the summarizeText function.
 * - SummarizeTextOutput - The return type for the summarizeText function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeTextInputSchema = z.object({
  text: z.string().describe('The text to summarize.'),
  maxLength: z.number().optional().describe('The maximum length of the summary in characters.'),
});
export type SummarizeTextInput = z.infer<typeof SummarizeTextInputSchema>;

const SummarizeTextOutputSchema = z.object({
  summary: z.string().describe('The generated summary.'),
});
export type SummarizeTextOutput = z.infer<typeof SummarizeTextOutputSchema>;

export async function summarizeText(input: SummarizeTextInput): Promise<SummarizeTextOutput> {
  return summarizeTextFlow(input);
}

const summarizeTextFlow = ai.defineFlow(
  {
    name: 'summarizeTextFlow',
    inputSchema: SummarizeTextInputSchema,
    outputSchema: SummarizeTextOutputSchema,
  },
  async ({ text, maxLength }) => {
    const { output } = await ai.generate({
      prompt: `Generate a concise and natural-sounding summary for the following text. The summary must be in Spanish.
      ${maxLength ? `The summary must be no more than ${maxLength} characters long.` : ''}
      
      Text to summarize:
      {{{text}}}
      `,
      input: { text },
      output: { schema: SummarizeTextOutputSchema },
    });
    return output!;
  }
);
