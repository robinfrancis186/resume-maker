import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
const genAI = new GoogleGenerativeAI(apiKey);

export async function generateContent(prompt: string): Promise<string> {
  try {
    if (!apiKey) {
      throw new Error('Gemini API key is not configured. AI features are disabled.');
    }
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Failed to generate content');
  }
} 