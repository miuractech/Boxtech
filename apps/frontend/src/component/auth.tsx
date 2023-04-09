import { logEvent } from 'firebase/analytics';
import { FirebaseApp, FirebaseError } from 'firebase/app';
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  signOut,
  updateProfile,
  User,
} from 'firebase/auth';
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import {
  removeUserError,
  removeUserLoading,
  setPhone,
  setStep,
  setUser,
  setUserError,
  setUserLoading,
} from '../store/authSlice';
import { RootState } from '../store';
import { db } from '../configs/firebaseconfig';
import { IconCheck, IconX } from '@tabler/icons';
import { showNotification } from '@mantine/notifications';

type stepType = 'phone' | 'otp';

export default function usePhoneAuth(
  app: FirebaseApp,
  // redirectUrl?: string
): {
    sendOtp: (phone: string, success: () => void, failure: () => void) => void;
    verifyOtp: (otp: string, success: (user: User) => void, failure: (error: FirebaseError) => void) => void;
  logout: () => void;
} {
  const auth = getAuth(app);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    if (!window.recaptchaVerifier) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      window.recaptchaVerifier = new RecaptchaVerifier(
        'sign-in-button',
        {
          size: 'invisible',
        },
        auth
      );
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
    }

    // return () => {
    //     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //     //@ts-ignore
    //     window.recaptchaVerifier = null
    // }
  }, []);

  const sendOtp = async (phone: string, success: () => void, failure: () => void) => {
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      const appVerifier = window.recaptchaVerifier;
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        phone,
        appVerifier
      );
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      window.confirmationResult = confirmationResult;
      dispatch(setStep('otp'));
      showNotification({
        id: `reg-err-${Math.random()}`,
        autoClose: 5000,
        title: "Success",
        message: `OTP successfully sent to ${phone.substring(3)}`,
        color: "green",
        icon: <IconCheck />,
        loading: false,
      });
      success()
    } catch (error) {
      console.log(error);
      failure()
      showNotification({
        id: `reg-err-${Math.random()}`,
        autoClose: 5000,
        title: "Error",
        message: "Something went wrong try again",
        color: "red",
        icon: <IconX />,
        loading: false,
      });
    }
  };

  const verifyOtp = (code: string, success: (user: User) => void, failure: (error: FirebaseError) => void) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    window.confirmationResult
      .confirm(code)
      .then(async (result: any) => {
        const user = result.user;
        success(user)
      })
      .catch((error: FirebaseError) => {
        failure(error)
      });
  };

  const logout = () => {
    signOut(auth)
      .then(() => {
        dispatch(setUser(null));
      })
      .catch((error) => {
        dispatch(setUserError(error));
      });
  };

  return { sendOtp, verifyOtp, logout };
}
