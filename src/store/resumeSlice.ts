import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ResumeState, Education, Experience, PersonalInfo, Project, Skill } from '../types/resume';

const initialState: ResumeState = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    github: '',
    portfolio: ''
  },
  education: [],
  experience: [],
  skills: [],
  projects: []
};

const resumeSlice = createSlice({
  name: 'resume',
  initialState,
  reducers: {
    updatePersonalInfo: (state, action: PayloadAction<PersonalInfo>) => {
      state.personalInfo = action.payload;
    },
    updateEducation: (state, action: PayloadAction<Education[]>) => {
      state.education = action.payload;
    },
    updateExperience: (state, action: PayloadAction<Experience[]>) => {
      state.experience = action.payload;
    },
    updateSkills: (state, action: PayloadAction<Skill[]>) => {
      state.skills = action.payload;
    },
    updateProjects: (state, action: PayloadAction<Project[]>) => {
      state.projects = action.payload;
    }
  }
});

export const {
  updatePersonalInfo,
  updateEducation,
  updateExperience,
  updateSkills,
  updateProjects
} = resumeSlice.actions;

export default resumeSlice.reducer; 