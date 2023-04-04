import {  doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showNotification } from '@mantine/notifications';
import { environment } from '../environments/environment';
import {  defaultErrorMessage, clientDbRef } from '../constants';
import { IconX } from '@tabler/icons';
import { RootState } from '../store';
import { NavBar } from '../MIDL/navbar/Topbar';
import { Route, Routes } from 'react-router-dom';
import { Logout } from '../MIDL/Logout';
import Products from '../MIDL/products';
import { setClient } from '../store/clientSlice';
import CompanyDetails from './companyDetails';
import { Booking } from '../MIDL/Bookings';
import { Container } from '@mantine/core';

// type Props = {}

export default function Dashboard() {
  const dispatch = useDispatch();
  // const [fetchData, setFetchData] = useState(true);
  const { client } = useSelector((state: RootState) => state.client);
  const { user } = useSelector((state: RootState) => state.user);
  useEffect(() => {
    const getClient = async () => {
      try {
        const clientDb = doc(clientDbRef,user?.uid);
        const res = await getDoc(clientDb);
        const data = res.data();
        dispatch(setClient(data));
      } catch (error: any) {
        showNotification({
          id: `reg-err-${Math.random()}`,
          autoClose: 5000,
          title: 'Error!',
          message: environment.production ? defaultErrorMessage : error.message,
          color: 'red',
          icon: <IconX />,
          loading: false,
        });
        // setFetchData(false);
      }
    };
    if (!client) {
      getClient();
    }
  }, []);
  return <Container fluid >
    <NavBar >
      <Routes>
        <Route path='/' element={<Booking />} />
    <Route path="/products" element={<Products />} />
    <Route path="/settings" element={<CompanyDetails />} />
    <Route path="/Logout" element={<Logout />} />
    </Routes>
    </NavBar>
  </Container>;
}
