import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.VITE_GEMINI_API_KEY);

export const generateContent = async (prompt, type) => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompts = {
      experience: `Write a professional and impactful job description for the following role and responsibilities. Make it resume-ready with bullet points highlighting key achievements and metrics: ${prompt}`,
      project: `Write a compelling project description highlighting the technical details, challenges overcome, and impact. Make it resume-ready with bullet points: ${prompt}`,
      summary: `Write a professional summary for a resume based on the following background: ${prompt}`,
    };

    const result = await model.generateContent(prompts[type] || prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating content:', error);
    throw error;
  }
}; 