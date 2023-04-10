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
  else if (!client || !client?.kyc) return <CompanyDetails />;
  else if (client?.status === 'kyc error' && client.kyc)
    return <CompanyDetails />;
  else if (client?.status === 'created' && client.kyc)
    return (
      <div className="flex items-center h-screen text-center w-full justify-center">
        KYC verification under progress <br /> You will be verified in 24 hrs{' '}
      </div>
    );
  else if (client?.status === 'active' && client.kyc) return <Dashboard />;
  else if (client?.status === 'banned' && client.kyc)
    return (
      <div className="flex items-center h-screen text-center w-full justify-center bg-red-400">
        You are banned!
      </div>
    );
  else if (client?.status === 'disabled' && client.kyc)
    return (
      <div className="flex items-center h-screen text-center w-full justify-center">
        You account is disabled! Pay your pending amount and contact us!
      </div>
    );
  return <div className="flex items-center h-screen text-center w-full justify-center">
  Access Denied
</div>;
}
