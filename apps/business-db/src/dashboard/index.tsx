import { LoadingOverlay } from '@mantine/core';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clientDbRef } from '../constants';
import { RootState } from '../store';
import { setClient } from '../store/clientSlice';
import CompanyDetails from './companyDetails';
import Dashboard from './dashboard';

export default function DashboardFront() {
  const { user } = useSelector((state: RootState) => state.user);
  const { client } = useSelector((state: RootState) => state.client);
  const dispatch = useDispatch();
  const setClientFunc = async () => {
    const clientDoc = await getDoc(doc(clientDbRef, user?.uid));
    if (!clientDoc.exists()) dispatch(setClient(null));
    else {
      dispatch(setClient(clientDoc.data()));
    }
  };
  useEffect(() => {
    setClientFunc();
  }, []);

  if (client === undefined) return <LoadingOverlay visible={true} />;
  if (!client) return <CompanyDetails />;
  return <Dashboard />;
}
