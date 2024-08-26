"use client";

// src/store/index.ts

import { configureStore } from '@reduxjs/toolkit';
import productReducer from './slices/productSlice';
import { useDispatch } from 'react-redux';

// Configure the Redux store
const store = configureStore({
  reducer: {
    product: productReducer,
  },
});

// Define the store's dispatch type
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

// Create a typed useDispatch hook
export const useAppDispatch: () => AppDispatch = useDispatch;

// Export the store
export default store;
