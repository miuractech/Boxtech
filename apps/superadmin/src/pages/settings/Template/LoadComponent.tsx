import { showNotification } from '@mantine/notifications';
import { setTemplates } from '../../../store/emailTemplatesSlice';
import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { environment } from '../../../environments/environment.prod';
import { IconX } from '@tabler/icons';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { db } from '../../../configs/firebaseconfig';
import { LoadingOverlay } from '@mantine/core';

export const LoadComponent = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getTemplates = async () => {
      try {
        const docRef = collection(db, 'emailTemplates');
        const res = await getDocs(docRef);
        const data = res.docs.map((tem) => ({ ...tem.data(), id: tem.id }));
        dispatch(setTemplates(data));
        setLoading(false);
      } catch (error: any) {
        showNotification({
          id: `reg-err-${Math.random()}`,
          autoClose: 5000,
          title: 'Error!',
          message: error.message,
          color: 'red',
          icon: <IconX />,
          loading: false,
        });
        setLoading(false);
      }
    };
    getTemplates();
  }, []);
  if (loading) return <LoadingOverlay visible />;
  return <Outlet />;
};
