import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
const genAI = new GoogleGenerativeAI(apiKey);

const PROMPT_TEMPLATES = {
  experience: (input: string) => `Write a professional and impactful job description for the following role and responsibilities. Focus on quantifiable achievements, leadership, and technical skills. Format with bullet points:
Role: ${input}
- Use action verbs
- Include metrics and percentages
- Highlight technical skills
- Emphasize leadership and collaboration
- Keep each bullet point concise (1-2 lines)`,

  project: (input: string) => `Create a compelling project description highlighting technical details, challenges, and impact. Format with bullet points:
Project: ${input}
- Focus on technical implementation details
- Highlight challenges overcome
- Include technologies used
- Mention impact and results
- Keep each bullet point concise`,

  summary: (input: string) => `Write a powerful professional summary for a resume based on the following background. Make it concise (2-4 sentences):
Background: ${input}
- Highlight years of experience
- Mention key technical skills
- Include notable achievements
- Target the role/industry`,

  skills: (input: string) => `List relevant technical and soft skills based on the following background. Group them by category:
Background: ${input}
- Technical Skills
- Soft Skills
- Tools & Technologies
- Certifications`,

  education: (input: string) => `Write relevant coursework and academic achievements for:
Education: ${input}
- Include relevant coursework
- Highlight academic achievements
- Mention projects or research
- List technical skills gained`,

  achievements: (input: string) => `Transform the following accomplishment into a powerful bullet point:
Achievement: ${input}
- Use metrics when possible
- Start with action verb
- Show impact and results
- Keep it concise`
};

export async function generateContent(prompt: string, type: keyof typeof PROMPT_TEMPLATES = 'experience'): Promise<string> {
  try {
    if (!apiKey) {
      throw new Error('Gemini API key is not configured. AI features are disabled.');
    }
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const formattedPrompt = PROMPT_TEMPLATES[type](prompt);
    const result = await model.generateContent(formattedPrompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Failed to generate content');
  }
} 