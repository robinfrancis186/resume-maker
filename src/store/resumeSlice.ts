import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ResumeState } from '../types';

const initialState: ResumeState = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    github: '',
    portfolio: '',
    summary: '',
  },
  education: [],
  experience: [],
  skills: [],
  projects: [],
  certifications: [],
  selectedTemplate: 'modern',
};

const resumeSlice = createSlice({
  name: 'resume',
  initialState,
  reducers: {
    importResume: (state, action: PayloadAction<ResumeState>) => {
      return {
        ...action.payload,
        selectedTemplate: state.selectedTemplate, // Preserve selected template
      };
    },
    setTemplate: (state, action: PayloadAction<string>) => {
      state.selectedTemplate = action.payload;
    },
    updatePersonalInfo: (state, action: PayloadAction<Partial<ResumeState['personalInfo']>>) => {
      state.personalInfo = { ...state.personalInfo, ...action.payload };
    },
    addEducation: (state, action: PayloadAction<ResumeState['education'][0]>) => {
      state.education.push(action.payload);
    },
    updateEducation: (state, action: PayloadAction<{ index: number; education: ResumeState['education'][0] }>) => {
      state.education[action.payload.index] = action.payload.education;
    },
    removeEducation: (state, action: PayloadAction<number>) => {
      state.education.splice(action.payload, 1);
    },
    addExperience: (state, action: PayloadAction<ResumeState['experience'][0]>) => {
      state.experience.push(action.payload);
    },
    updateExperience: (state, action: PayloadAction<{ index: number; experience: ResumeState['experience'][0] }>) => {
      state.experience[action.payload.index] = action.payload.experience;
    },
    removeExperience: (state, action: PayloadAction<number>) => {
      state.experience.splice(action.payload, 1);
    },
    addSkill: (state, action: PayloadAction<ResumeState['skills'][0]>) => {
      state.skills.push(action.payload);
    },
    updateSkill: (state, action: PayloadAction<{ index: number; skill: ResumeState['skills'][0] }>) => {
      state.skills[action.payload.index] = action.payload.skill;
    },
    removeSkill: (state, action: PayloadAction<number>) => {
      state.skills.splice(action.payload, 1);
    },
    addProject: (state, action: PayloadAction<ResumeState['projects'][0]>) => {
      state.projects.push(action.payload);
    },
    updateProject: (state, action: PayloadAction<{ index: number; project: ResumeState['projects'][0] }>) => {
      state.projects[action.payload.index] = action.payload.project;
    },
    removeProject: (state, action: PayloadAction<number>) => {
      state.projects.splice(action.payload, 1);
    },
  },
});

export const {
  importResume,
  setTemplate,
  updatePersonalInfo,
  addEducation,
  updateEducation,
  removeEducation,
  addExperience,
  updateExperience,
  removeExperience,
  addSkill,
  updateSkill,
  removeSkill,
  addProject,
  updateProject,
  removeProject,
} = resumeSlice.actions;

export default resumeSlice.reducer; 