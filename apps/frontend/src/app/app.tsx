// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {Suspense, lazy} from 'react';
import { useJsApiLoader } from '@react-google-maps/api';
import { GoogleMapApiKey } from '../configs/googleMap';
import { LoadingOverlay } from '@mantine/core';
import Landing, { userInfoType } from '../pages/Landing';
import {
  Route,
  Routes,
  useNavigate,
  useParams,
  Outlet,
} from 'react-router-dom';

// import Items from '../pages/items';


import { useEffect } from 'react';
import { setUser } from '../store/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../configs/firebaseconfig';

import { doc, getDoc } from 'firebase/firestore';
import { setUserInfo } from '../store/OrderReducer';
// import PricingPlans from '../pages/components/pricing-plans/PricingPlans';

// import MyAccount from '../pages/components/myaccount/MyAccount';
// import MySubscriptions from '../pages/components/myaccount/MySubscriptions';
// import Checkout from '../pages/components/checkout/Checkout';
// import CheckoutPremium from '../pages/components/checkout/CheckoutPremium';

import { Helmet } from 'react-helmet';
const Items = lazy(() => import('../pages/items')); 
const List = lazy(() => import('../pages/items/list')); 
const LiftFacilityPage = lazy(() => import('../pages/LiftFacilityPage')); 
const UserInfo = lazy(() => import('../pages/UserInfo')); 
const Booking = lazy(() => import('../pages/Booking')); 
const Quoatation = lazy(() => import('../pages/Quoatation')); 
const SuccessPage = lazy(() => import('../pages/SuccessPage')); 
const HomePage = lazy(() => import('../pages/components/homepage/HomePage')); 
const Policy = lazy(() => import('./privacyPolicy')); 
const Navbar = lazy(() => import('../pages/components/navbar/Navbar')); 
export function App() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: GoogleMapApiKey,
    libraries: ['places'],
  });
  const { user } = useSelector((state: RootState) => state.User);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { clientId } = useParams();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        dispatch(setUser(user));
        const userDoc = await getDoc(doc(db, 'Users', user.uid));
        if (userDoc.exists()) {
          const data = userDoc.data() as userInfoType;
          dispatch(setUserInfo(data));
          console.log(data, user);
        }
      } else {
        if (clientId) {
          navigate(`/${clientId}`);
        }
      }
    });
    return () => unsub();
  }, []);

  if (!isLoaded)
    return (
      <div style={{ width: 400, position: 'relative' }}>
        <LoadingOverlay visible={!isLoaded} />
      </div>
    );

  return (
    <Suspense fallback={<LoadingOverlay visible={true} />} >
      <Helmet>
        <title>Boxtech</title>
        <meta
          name="discription"
          content="Get help for all of your packing and moving related works"
        />
        <meta name="keywords" content="packing, moving, shifting" />
      </Helmet>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <HomePage />
            </>
          }
        />
        <Route
          path="/terms-conditions"
          element={<Policy title="Terms and conditions" path={'tac'} />}
        />
        <Route
          path="/privacy-policy"
          element={<Policy title="Privacy Policy" path={'privacy'} />}
        />
        <Route
          path="/refund"
          element={<Policy title="Refund Policy" path={'refund'} />}
        />
        <Route path="/:clientId" element={<BoxTechWrapper />}>
          <Route index element={<Landing />} />
        </Route>
        <Route path="/quote/:quoteid">
          <Route index element={<Items />} />
          <Route path="list" element={<List />} />
          <Route path="liftQuery" element={<LiftFacilityPage />} />
          <Route path="userInfo" element={<UserInfo />} />
          <Route path="bookings" element={<Booking />} />
          <Route path="quotation/:id" element={<Quoatation />} />
          <Route
            path="quotation/:id/:razorpayID/success"
            element={<SuccessPage />}
          />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;

const BoxTechWrapper = () => {
  useEffect(() => {
    const unloadCallback = (event: {
      preventDefault: () => void;
      returnValue: string;
    }) => {
      event.preventDefault();
      event.returnValue = '';
      return '';
    };
    window.addEventListener('beforeunload', unloadCallback);
    return () => window.removeEventListener('beforeunload', unloadCallback);
  }, []);
  return <Outlet />;
};
