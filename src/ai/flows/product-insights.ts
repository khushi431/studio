// src/ai/flows/product-insights.ts
'use server';
/**
 * @fileOverview A flow for providing insights on optimal product placement and promotion strategies.
 *
 * - getProductInsights - A function that analyzes product performance and sales data to provide insights.
 * - ProductInsightsInput - The input type for the getProductInsights function.
 * - ProductInsightsOutput - The return type for the getProductInsights function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProductInsightsInputSchema = z.object({
  productName: z.string().describe('The name of the product to analyze.'),
  category: z.string().describe('The category of the product.'),
  sold: z.number().describe('The number of units sold.'),
  price: z.number().describe('The price of the product.'),
  earnings: z.number().describe('The total earnings from the product.'),
  marketTrends: z.string().describe('Description of current market trends.'),
  competitorAnalysis: z.string().describe('Analysis of competitor products and strategies.'),
});
export type ProductInsightsInput = z.infer<typeof ProductInsightsInputSchema>;

const ProductInsightsOutputSchema = z.object({
  optimalPlacement: z.string().describe('Insights on where the product should be placed for optimal visibility and sales.'),
  promotionStrategies: z.string().describe('Recommended promotion strategies to increase sales.'),
  keyInsights: z.string().describe('A summary of the key insights and recommendations.'),
});
export type ProductInsightsOutput = z.infer<typeof ProductInsightsOutputSchema>;

export async function getProductInsights(input: ProductInsightsInput): Promise<ProductInsightsOutput> {
  return productInsightsFlow(input);
}

const productInsightsPrompt = ai.definePrompt({
  name: 'productInsightsPrompt',
  input: {schema: ProductInsightsInputSchema},
  output: {schema: ProductInsightsOutputSchema},
  prompt: `You are an expert marketing analyst providing insights on product performance.

  Analyze the following product data and provide insights on optimal product placement and promotion strategies.

  Product Name: {{{productName}}}
  Category: {{{category}}}
  Units Sold: {{{sold}}}
  Price: {{{price}}}
  Earnings: {{{earnings}}}
  Market Trends: {{{marketTrends}}}
  Competitor Analysis: {{{competitorAnalysis}}}

  Provide recommendations for optimal product placement, promotion strategies, and a summary of key insights.

  Consider current market trends and competitor strategies to maximize sales.
  Your response should be structured and easy to understand, providing actionable recommendations.
  `,
});

const productInsightsFlow = ai.defineFlow(
  {
    name: 'productInsightsFlow',
    inputSchema: ProductInsightsInputSchema,
    outputSchema: ProductInsightsOutputSchema,
  },
  async input => {
    const {output} = await productInsightsPrompt(input);
    return output!;
  }
);
