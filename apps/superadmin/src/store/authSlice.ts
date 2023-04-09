import { createSlice } from '@reduxjs/toolkit';

import { User } from 'firebase/auth';
import { RootState } from './index';
// import { db } from "../firebaseConfig/config"
const user: User | null | undefined = localStorage.getItem('user')
  ? JSON.parse(localStorage.getItem('user') || '')
  : null;
type UserDetailState = {
  loading: boolean;
  step: 'phone' | 'otp';
  error: {
    errorCode: number;
    message: string;
  } | null;
  user: User | null | undefined;
  phoneNumber: null | number;
  name: string | undefined;
  fullName: string | undefined;
  email: string | undefined;
  feedBack: any;
  paymentDetails: [];
};

const initialState: UserDetailState = {
  loading: false,
  error: null,
  user: user,
  step: 'phone',
  phoneNumber: null,
  name: '',
  fullName: '',
  email: '',
  feedBack: null,
  paymentDetails: [],
};

export const UserSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    setStep: (state, action) => {
      state.step = action.payload;
    },
    setPhone: (state, action) => {
      state.phoneNumber = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },

    setUserError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    setUserLoading: (state) => {
      state.loading = true;
    },
    removeUserLoading: (state) => {
      state.loading = false;
    },
    removeUserError: (state) => {
      state.error = null;
    },
    // setLocation: (state, action) => {
    //   state.location = action.payload
    // },
    setFeedback: (state, action) => {
      state.feedBack = action.payload;
    },
    setName: (state, action) => {
      state.name = action.payload;
    },
  },
});

export const {
  setUser,
  setUserError,
  setUserLoading,
  removeUserError,
  removeUserLoading,
  setStep,
  setPhone,
  setFeedback,
  setName,
  setEmail,
} = UserSlice.actions;

// import of sanjeev's code
export const selectAuth = (state: RootState) => state.User;

export default UserSlice.reducer;
