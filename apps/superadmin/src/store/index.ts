import { configureStore } from '@reduxjs/toolkit';
import userReducer from './authSlice';
export const store = configureStore({
  reducer: {
    User:userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
