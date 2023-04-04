import { Title } from '@mantine/core';
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../../configs/firebaseconfig';
import { Actions } from './Actions';
import { OrdersTable } from './OrdersTable';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

export const Booking = () => {
  const [orderData, setOrderData] = useState<any[]>([]);
  const {user} = useSelector((state:RootState)=>state.user)
  
  useEffect(() => {
    const unsub = onSnapshot(
      query(collection(db, 'Orders'), where('clientId','==',user?.uid), orderBy('timeStamp', 'desc')),
      (snapshot) => {
        setOrderData(
          snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      }
    );
    return () => unsub();
  }, []);

  return (
    <div>
      <Title order={2} className="text-gray-500">
        Booking
      </Title>
      <Actions />
      <OrdersTable orderData={orderData} />
    </div>
  );
};
