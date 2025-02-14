export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
  github?: string;
  portfolio?: string;
  summary?: string;
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

export interface Skill {
  category: string;
  name: string;
}

export interface Project {
  name: string;
  description: string;
  technologies: string[];
  link?: string;
  github?: string;
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

export type ResumeSection = 'personal' | 'education' | 'experience' | 'projects' | 'skills';

export interface EducationEntry extends Education {
  id?: string;
}

export interface ExperienceEntry extends Experience {
  id?: string;
}

export interface ProjectEntry extends Project {
  id?: string;
}

export interface SkillEntry extends Skill {
  id?: string;
} 