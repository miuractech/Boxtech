import { configureStore } from '@reduxjs/toolkit';
import orderReducer from './OrderReducer';
import userReducer from './authSlice';
export const store = configureStore({
  reducer: {
    User:userReducer,
    order: orderReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
