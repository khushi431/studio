// src/ai/flows/resident-issue-insights.ts
'use server';
/**
 * @fileOverview An AI flow for prioritizing resident-reported issues and suggesting actions.
 *
 * - getResidentIssueInsights - A function that analyzes resident issues.
 * - ResidentIssueInput - The input type for the getResidentIssueInsights function.
 * - ResidentIssueOutput - The return type for the getResidentIssueInsights function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ResidentIssueInputSchema = z.object({
  issueCategory: z.string().describe('The category of the reported issue (e.g., Plumbing, Electrical, Noise Complaint).'),
  numberOfReports: z.number().describe('The number of times this issue has been reported recently.'),
  urgencyLevel: z.enum(["Low", "Medium", "High"]).describe('The perceived urgency of the issue.'),
  residentFeedbackSnippets: z.string().describe('A collection of short feedback snippets or descriptions from residents regarding this issue.'),
});
export type ResidentIssueInput = z.infer<typeof ResidentIssueInputSchema>;

const ResidentIssueOutputSchema = z.object({
  prioritizationSuggestion: z.string().describe('A suggestion on how to prioritize this issue based on the input.'),
  preventativeActions: z.string().describe('Recommended preventative actions to reduce future occurrences.'),
  communicationStrategy: z.string().describe('Suggestions for communicating with residents about the issue and its resolution.'),
  potentialImpact: z.string().describe('The potential impact on residents if the issue is not addressed promptly.')
});
export type ResidentIssueOutput = z.infer<typeof ResidentIssueOutputSchema>;

export async function getResidentIssueInsights(input: ResidentIssueInput): Promise<ResidentIssueOutput> {
  return residentIssueInsightsFlow(input);
}

const residentIssueInsightsPrompt = ai.definePrompt({
  name: 'residentIssueInsightsPrompt',
  input: {schema: ResidentIssueInputSchema},
  output: {schema: ResidentIssueOutputSchema},
  prompt: `You are an expert condo management assistant. Analyze the following resident-reported issue and provide insights.

  Issue Category: {{{issueCategory}}}
  Number of Reports: {{{numberOfReports}}}
  Urgency Level: {{{urgencyLevel}}}
  Resident Feedback: {{{residentFeedbackSnippets}}}

  Based on this information, provide:
  1. A prioritization suggestion (e.g., "High priority due to safety concerns and multiple reports").
  2. Recommended preventative actions (e.g., "Schedule regular maintenance for HVAC systems").
  3. A communication strategy for residents (e.g., "Send a building-wide notice acknowledging the issue and outlining steps for resolution").
  4. The potential impact on residents if not addressed (e.g., "Decreased resident satisfaction, potential safety hazards").

  Your response should be structured, actionable, and empathetic to resident concerns.
  Be concise and clear.
  `,
});

const residentIssueInsightsFlow = ai.defineFlow(
  {
    name: 'residentIssueInsightsFlow',
    inputSchema: ResidentIssueInputSchema,
    outputSchema: ResidentIssueOutputSchema,
  },
  async input => {
    const {output} = await residentIssueInsightsPrompt(input);
    return output!;
  }
);
