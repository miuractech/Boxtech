import React, { ReactNode, useEffect } from 'react';
import { Nav } from './nav';
import { Footer } from './footer';
import { ClientDataType } from '../../pages/Quoatation/priceCalculation';
import { useNavigate, useParams } from 'react-router-dom';
import { collection, doc, getDoc } from 'firebase/firestore';
import { db } from '../../configs/firebaseconfig';
import { OrderType, setOrderDetails } from '../../store/orderSlice';
import { useDispatch } from 'react-redux';
import { showNotification } from '@mantine/notifications';
import { IconX } from '@tabler/icons';
import { Helmet } from 'react-helmet';

export const NavandFooter = ({
  children,
  clientData,
  setClientData,
}: {
  setClientData: any;
  children: ReactNode;
  clientData: ClientDataType | null;
}) => {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initFunc = async () => {
    if (orderId) {
      getDoc(doc(collection(db, 'Orders'), orderId)).then(async (document) => {
        if (document.exists()) {
          const data = document.data() as any;
          dispatch(setOrderDetails(data));

          const res = await getDoc(
            doc(collection(db, 'clients'), data.clientId)
          );
          if (res.exists()) setClientData(res.data());
          else {
            navigate(`/`);
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
        }
      });
    }
  };
  useEffect(() => {
    initFunc();
  }, [orderId]);
  return (
    <div>
      <Helmet>
        <title>{clientData?.brandName}</title>
        <meta
          name="description"
          content="Get help for all of your packing and moving related works"
        />
        <meta name="keywords" content="packing, moving, shifting" />
      </Helmet>
      <Nav clientData={clientData} />
      {children}
      <Footer clientData={clientData} />
    </div>
  );
};
