import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
const genAI = new GoogleGenerativeAI(apiKey);

const ATS_ANALYSIS_PROMPT = (resumeContent: string) => `
Analyze this resume content for ATS optimization and provide a detailed score and feedback:

${resumeContent}

Please evaluate and provide:
1. Overall ATS Score (0-100)
2. Keyword Optimization Analysis
3. Format and Structure Review
4. Section-by-Section Feedback:
   - Professional Summary
   - Work Experience
   - Skills
   - Education
5. Specific Improvement Suggestions
6. Missing Keywords or Skills
7. Formatting Issues (if any)

Format the response as JSON with the following structure:
{
  "score": number,
  "keywordOptimization": string,
  "formatReview": string,
  "sectionFeedback": {
    "summary": string,
    "experience": string,
    "skills": string,
    "education": string
  },
  "improvements": string[],
  "missingKeywords": string[],
  "formattingIssues": string[]
}`;

export interface ATSAnalysisResult {
  score: number;
  keywordOptimization: string;
  formatReview: string;
  sectionFeedback: {
    summary: string;
    experience: string;
    skills: string;
    education: string;
  };
  improvements: string[];
  missingKeywords: string[];
  formattingIssues: string[];
}

export async function analyzeResume(resumeContent: string): Promise<ATSAnalysisResult> {
  try {
    if (!apiKey) {
      throw new Error('Gemini API key is not configured. ATS analysis is disabled.');
    }
    
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const result = await model.generateContent(ATS_ANALYSIS_PROMPT(resumeContent));
    const response = await result.response;
    
    try {
      return JSON.parse(response.text());
    } catch (parseError) {
      throw new Error('Failed to parse ATS analysis results');
    }
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Failed to analyze resume');
  }
} 