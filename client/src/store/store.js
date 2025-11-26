import { configureStore } from '@reduxjs/toolkit';
import itemsReducer from './itemsSlice';
import authReducer from './authSlice';

export const store = configureStore({
    reducer: {
        items: itemsReducer,
        auth: authReducer
    }
});