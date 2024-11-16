import { configureStore } from '@reduxjs/toolkit';
import projectsReducer from '../features/projectsSlice';
import userReducer from '../features/userSlice';


export const store = configureStore({
    reducer: {
        projects: projectsReducer,
        user: userReducer
    },
    devTools: process.env.NODE_ENV !== 'production'
});