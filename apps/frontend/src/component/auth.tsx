import { logEvent } from 'firebase/analytics';
import { FirebaseApp, FirebaseError } from 'firebase/app';
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  signOut,
  updateProfile,
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

type stepType = 'phone' | 'otp';

export default function usePhoneAuth(
  app: FirebaseApp,
  // redirectUrl?: string
): {
  sendOtp: (phone: string) => void;
  verifyOtp: (otp: string) => void;
  logout: () => void;
} {
  const auth = getAuth(app);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { clientId } = useParams();
  const { name, phone, email } = useSelector(
    (state: RootState) => state.order.userInfo
  );
  const { user } = useSelector(
    (state: RootState) => state.User
  );
  const order = useSelector((state: RootState) => state.order);
  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);
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

  const sendOtp = async (phone: string) => {
    try {
      dispatch(setUserLoading());
      console.log('otp func', phone);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      const appVerifier = window.recaptchaVerifier;
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        phone,
        appVerifier
      );
      console.log('runing');
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      window.confirmationResult = confirmationResult;
      dispatch(setStep('otp'));
      dispatch(setPhone(phone));
      dispatch(removeUserError());
      dispatch(removeUserLoading());
    } catch (error) {
      dispatch(setUserError(error));
      setStep('otp');
    }
  };
  const verifyOtp = (code: string) => {
    // dispatch(setUserLoading());
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    window.confirmationResult
      .confirm(code)
      .then(async (result: any) => {
        const user = result.user;
        dispatch(setUser(user));
        const id = user.uid;
        const userInfo = { name, email, phone };
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        localStorage.setItem('user', JSON.stringify(user));
        // await setDoc(doc(db, id, 'users'), {

        // });
        await setDoc(doc(db, 'Users', id), {
          name: name,
          email: email,
          phone,
          createdAt: serverTimestamp(),
        });
        console.log(user);
        console.log(order);

        navigate(`/${clientId}/bookings`);
      })
      .catch((error: FirebaseError) => {
        dispatch(setUserError(error));
      });
  };

  const logout = () => {
    signOut(auth)
      .then(() => {
        dispatch(setUser(null));
        // logEvent(analytics,'user-logged-out')
      })
      .catch((error) => {
        dispatch(setUserError(error));
      });
  };

  return { sendOtp, verifyOtp, logout };
}
