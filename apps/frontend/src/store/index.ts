import { configureStore } from '@reduxjs/toolkit';
import orderReducer from './OrderReducer';
import userReducer from './authSlice';
import OrderDetailsSlice from "./orderSlice"
export const store = configureStore({
  reducer: {
    User:userReducer,
    order: orderReducer,
    orderDetails: OrderDetailsSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
