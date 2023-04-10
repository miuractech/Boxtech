import { configureStore } from '@reduxjs/toolkit';
import userReducer from './authSlice';
import emailTemplatesReduser from "./emailTemplatesSlice"
export const store = configureStore({
  reducer: {
    User:userReducer,
    templates:emailTemplatesReduser,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
