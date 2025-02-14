export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  portfolio: string;
  summary?: string;
}

export interface Education {
  school: string;
  degree: string;
  startDate: string;
  endDate?: string;
  gpa?: string;
}

export interface Experience {
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  location: string;
  description: string;
}

export interface Skill {
  category: string;
  name: string;
}

export interface Project {
  name: string;
  url?: string;
  description: string;
  technologies: string[];
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

export interface RootState {
  resume: ResumeState;
}

export interface AIContentGeneratorProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerated: (content: string) => void;
  type: 'experience' | 'project' | 'summary' | 'skills' | 'education' | 'achievements';
  placeholder: string;
}

export interface ResumeFormProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export interface ResumePreviewProps {
  data: ResumeState;
} 