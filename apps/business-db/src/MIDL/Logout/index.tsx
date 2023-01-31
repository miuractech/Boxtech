import { signOut } from 'firebase/auth';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../configs/firebaseconfig';

export const Logout = () => {
  const navigate = useNavigate();
  const signoutFunc = async () => {
    await signOut(auth);
    navigate('/');
  };
  useEffect(() => {
    signoutFunc();
  }, []);

  return <div>Logging out...</div>;
};
