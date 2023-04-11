import { CostType, generalInfo } from '@boxtech/shared-constants';
import { collection, doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { db } from '../../configs/firebaseconfig';
import { ClientDetails } from './clientDetails';
import { PriceBreakup } from './priceBreakup';
import { QuoatTable } from './quoatTable';
import { UserDetails } from './userDetails';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { showNotification } from '@mantine/notifications';
import { IconX } from '@tabler/icons';
import {
  ClientDataType,
  UserDetailsType,
  priceCalculation,
} from './priceCalculation';
import Lottie from 'lottie-react';
import truck from '../../assets/json/truck-loading.json';
import { setOrderDetails } from '../../store/orderSlice';

export default function Quoatation({ readOnly }: { readOnly: boolean }) {
  const { orderId } = useParams();
  const { orderDetails } = useSelector(
    (state: RootState) => state.orderDetails
  );
  const [clientData, setClientData] = useState<generalInfo | null>(null);
  const [clientCostData, setClientCostData] = useState<CostType | null>(null);
  const [calculatePrice, setCalculatePrice] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetailsType | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      try {
        const res = await getDoc(doc(db, 'clients', orderDetails.clientId));
        if (res.exists()) {
          const data = res.data() as generalInfo;
          setClientData(data);
          const costResponse = await getDoc(
            doc(db, 'Cost', orderDetails.clientId)
          );
          if (costResponse.exists()) {
            const data = costResponse.data() as CostType;
            setClientCostData(data);
            setCalculatePrice(true);
          }
        }
      } catch (error) {
        showNotification({
          id: `reg-err-${Math.random()}`,
          autoClose: 5000,
          title: 'Error',
          message: 'Something went wrong try again',
          color: 'red',
          icon: <IconX />,
          loading: false,
        });
      }
    })();
  }, [orderDetails, orderId]);

  const detsils = (data: UserDetailsType) => {
    setUserDetails(data);
  };

  useEffect(() => {
    if (
      calculatePrice &&
      orderDetails &&
      clientData &&
      clientCostData &&
      orderId &&
      !orderDetails?.quotation
    ) {
      priceCalculation(
        orderDetails,
        clientData,
        clientCostData,
        orderId,
        detsils
      );
    }
  }, [calculatePrice, clientCostData, clientData, orderDetails, orderId]);

  useEffect(() => {
    if (!orderDetails) {
      getDoc(doc(collection(db, 'Orders'), orderId)).then((doc) => {
        if (doc.exists()) {
          dispatch(setOrderDetails(doc.data() as any));
        } else {
          navigate('/');
        }
      });
    }
  }, [orderDetails]);
  console.log('orderDetails,', orderDetails);

  if (orderDetails?.quotation) {
    return (
      <div className="bg-[#EDF2FF] pt-8">
        <div className="bg-white pb-5 p-3 rounded-lg space-y-5 max-w-5xl m-auto">
          <ClientDetails />
          <div className="md:w-10/12 m-auto">
            <UserDetails />
            <QuoatTable />
            <PriceBreakup
              readOnly={readOnly}
              userDetails={userDetails}
              clientData={clientData}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex justify-center items-center">
      <Lottie animationData={truck} loop={true} className="h-72" />
    </div>
  );
}
