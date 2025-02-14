import { configureStore } from '@reduxjs/toolkit';
import resumeReducer from './resumeSlice';
import { ResumeState } from '../types/resume';

export interface RootState {
  resume: ResumeState;
}

export const store = configureStore({
  reducer: {
    resume: resumeReducer,
  },
});

export type AppDispatch = typeof store.dispatch; 