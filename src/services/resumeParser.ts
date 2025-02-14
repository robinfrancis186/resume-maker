import { GoogleGenerativeAI } from '@google/generative-ai';
import { ResumeState } from '../types';
import * as pdfjs from 'pdfjs-dist';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
const genAI = new GoogleGenerativeAI(apiKey);

const PARSE_PROMPT = (content: string) => `
Extract and organize the following resume content into structured sections.
Parse the following resume content and return a JSON object with these sections:
- Personal Information (name, email, phone, location, linkedin, github, portfolio)
- Professional Summary
- Work Experience (company, position, location, dates, description)
- Education (school, degree, dates, GPA if available)
- Skills (categorized if possible)
- Projects (name, description, technologies used)
- Certifications (if any)

Resume Content:
${content}

Format the response as a JSON object that matches this structure:
{
  "personalInfo": {
    "fullName": string,
    "email": string,
    "phone": string,
    "location": string,
    "linkedin": string,
    "github": string,
    "portfolio": string,
    "summary": string
  },
  "experience": [{
    "company": string,
    "position": string,
    "location": string,
    "startDate": string,
    "endDate": string,
    "description": string[]
  }],
  "education": [{
    "school": string,
    "degree": string,
    "startDate": string,
    "endDate": string,
    "gpa": string
  }],
  "skills": [{
    "category": string,
    "name": string
  }],
  "projects": [{
    "name": string,
    "description": string,
    "technologies": string[]
  }],
  "certifications": [{
    "name": string,
    "issuer": string,
    "date": string
  }]
}`;

async function extractTextFromPDF(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
  let text = '';

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    text += content.items.map((item: any) => item.str).join(' ') + '\n';
  }

  return text;
}

async function parseJSON(file: File): Promise<ResumeState> {
  const text = await file.text();
  return JSON.parse(text);
}

export async function parseResume(file: File): Promise<ResumeState> {
  try {
    // If JSON file, parse directly
    if (file.type === 'application/json') {
      return await parseJSON(file);
    }

    // For PDF files, extract text and use AI to parse
    if (file.type === 'application/pdf') {
      const text = await extractTextFromPDF(file);
      
      if (!apiKey) {
        throw new Error('Gemini API key is not configured. Resume parsing is disabled.');
      }

      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
      const result = await model.generateContent(PARSE_PROMPT(text));
      const response = await result.response;
      
      try {
        const parsedContent = JSON.parse(response.text());
        return parsedContent;
      } catch (parseError) {
        throw new Error('Failed to parse resume content');
      }
    }

    throw new Error('Unsupported file type. Please upload a PDF or JSON file.');
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Failed to parse resume');
  }
} 