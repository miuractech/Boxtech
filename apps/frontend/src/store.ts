import { configureStore } from '@reduxjs/toolkit';
import userReducer from './store/authSlice';
import OrderReducer from './store/OrderReducer';
import OrderDetailsSlice from './store/orderSlice';
export const store = configureStore({
  reducer: {
    order: OrderReducer,
    User:userReducer,
    orderDetails: OrderDetailsSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch