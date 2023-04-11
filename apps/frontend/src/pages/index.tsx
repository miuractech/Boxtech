import { doc, onSnapshot } from 'firebase/firestore';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../configs/firebaseconfig';
import { showNotification } from '@mantine/notifications';
import { IconX } from '@tabler/icons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { OrderType, setOrderDetails } from '../store/orderSlice';
import Landing from './Landing';
import Items from './items';
import LiftFacilityPage from './LiftFacilityPage';
import UserInfo from './UserInfo';
import Booking from './Booking';
import Lottie from 'lottie-react';
import truck from '../assets/json/truck-loading.json';
import Quoatation from './Quoatation';
import SuccessPage from './SuccessPage';

export const Index = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const { orderDetails } = useSelector(
    (state: RootState) => state.orderDetails
  );

  useEffect(() => {
    if (!orderId) return;
    const unsub = onSnapshot(doc(db, 'Orders', orderId), (doc) => {
      if (doc.exists()) {
        const data = doc.data() as OrderType;
        dispatch(setOrderDetails(data));
      } else {
        showNotification({
          id: `reg-err-${Math.random()}`,
          autoClose: 5000,
          title: 'Error',
          message: 'Invalid Link',
          color: 'red',
          icon: <IconX />,
          loading: false,
        });
      }
    });

    return () => unsub();
  }, []);
  console.log(orderDetails);

  if (orderDetails) {
    switch (orderDetails.status) {
      // case "created":
      //     return <Landing />;
      case 'geoDetected':
        return <Items />;
      case 'itemsSelected':
        return <LiftFacilityPage />;
      case 'queryComplete':
        return <UserInfo />;
      case 'userVerified':
        return <Booking />;
      case 'bookingConfirmed':
        return <Quoatation readOnly={false} />;
      case 'quotationCompleted':
        return <SuccessPage  />;
      default:
        return <div>UNKNOWN</div>;
    }
  } else {
    return (
      <div className="h-screen flex justify-center items-center">
        <Lottie animationData={truck} loop={true} className="h-72" />
      </div>
    );
  }
};
