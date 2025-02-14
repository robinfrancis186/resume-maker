import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    github: '',
    portfolio: '',
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
    updatePersonalInfo: (state, action) => {
      state.personalInfo = { ...state.personalInfo, ...action.payload };
    },
    updateEducation: (state, action) => {
      state.education = action.payload;
    },
    updateExperience: (state, action) => {
      state.experience = action.payload;
    },
    updateSkills: (state, action) => {
      state.skills = action.payload;
    },
    updateProjects: (state, action) => {
      state.projects = action.payload;
    },
    updateCertifications: (state, action) => {
      state.certifications = action.payload;
    },
    setTemplate: (state, action) => {
      state.selectedTemplate = action.payload;
    },
    resetResume: (state) => {
      return initialState;
    },
  },
});

export const {
  updatePersonalInfo,
  updateEducation,
  updateExperience,
  updateSkills,
  updateProjects,
  updateCertifications,
  setTemplate,
  resetResume,
} = resumeSlice.actions;

export default resumeSlice.reducer; 