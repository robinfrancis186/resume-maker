export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  portfolio?: string;
  linkedin?: string;
  github?: string;
}

export interface Education {
  school: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  description?: string;
}

export interface Experience {
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string[];
}

export interface Project {
  name: string;
  description: string;
  technologies: string[];
  link?: string;
  github?: string;
}

export interface Skill {
  category: string;
  name: string;
}

export interface ResumeState {
  personalInfo: PersonalInfo;
  education: Education[];
  experience: Experience[];
  skills: Skill[];
  projects: Project[];
  certifications: any[];
  selectedTemplate: string;
}

export type ResumeSection = 'personal' | 'education' | 'experience' | 'projects' | 'skills'; 