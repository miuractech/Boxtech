// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.css';
import React from 'react';
import { useJsApiLoader } from '@react-google-maps/api';
import { GoogleMapApiKey } from '../configs/googleMap';
import { LoadingOverlay } from '@mantine/core';
import useNetworkStatus from '../hooks/useNetworkStatus';
import Landing, { userInfoType } from '../pages/Landing';
import {
  Route,
  Routes,
  useNavigate,
  useParams,
  Outlet,
} from 'react-router-dom';
import Items from '../pages/items';
import List from '../pages/items/list';
import LiftFacilityPage from '../pages/LiftFacilityPage';
import UserInfo from '../pages/UserInfo';
import Booking from '../pages/Booking';
import Quoatation from '../pages/Quoatation';
import { useEffect } from 'react';
import { setUser } from '../store/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, db } from '../configs/firebaseconfig';
import { SuccessPage } from '../pages/SuccessPage';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { setUserInfo } from '../store/OrderReducer';
import PricingPlans from '../pages/components/pricing-plans/PricingPlans';
import HomePage from '../pages/components/homepage/HomePage';
import TermsCondition from '../pages/components/terms-n-conditions/TermsCondition';
import PrivacyPolicy from '../pages/components/privacy-policy/PrivacyPolicy';
import MyAccount from '../pages/components/myaccount/MyAccount';
import MySubscriptions from '../pages/components/myaccount/MySubscriptions';
import Checkout from '../pages/components/checkout/Checkout';
import CheckoutPremium from '../pages/components/checkout/CheckoutPremium';
import { Navbar } from '../pages/components/navbar/Navbar';
import { Helmet } from 'react-helmet';
import { showNotification } from '@mantine/notifications';
import { IconX } from '@tabler/icons';
import { Index } from '../pages';
import Lottie from "lottie-react";
import truck from "../assets/json/truck-loading.json"

export function App() {

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: GoogleMapApiKey,
    libraries: ['places'],
  });

  if (!isLoaded)
    return (
      <div className='h-screen flex justify-center items-center'>
        <Lottie animationData={truck} loop={true} className="h-72" />
      </div>
    );


  return (
    <div>
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
          index
          element={
            <>
              <Navbar />
              <HomePage />
            </>
          }
        />
        {/* <Route path="/pricing-plans" element={<PricingPlans />} /> */}
        <Route path="/terms-conditions" element={<TermsCondition />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        {/* <Route path="/account" element={<MyAccount />} /> */}
        {/* <Route path="/subscriptions" element={<MySubscriptions />} /> */}
        {/* <Route path="/checkout" element={<Checkout />} />
        <Route path="/checkout-premium" element={<CheckoutPremium />} /> */}
        {/* <Route element={<BoxTechWrapper />}> */}
        {/* </Route> */}
        <Route path="/:orderId" element={<Index />} />
        <Route path="/:orderId/list" element={<List />} />
        <Route index element={<Landing />} />
        {/* <Route path="/quote/:quoteid">
          <Route index element={<Items />} />
          <Route path="liftQuery" element={<LiftFacilityPage />} />
          <Route path="userInfo" element={<UserInfo />} />
          <Route path="bookings" element={<Booking />} />
          <Route path="quotation/:id" element={<Quoatation />} />
          <Route
            path="quotation/:id/:razorpayID/success"
            element={<SuccessPage />}
          />
        </Route> */}
      </Routes>
    </div>
  );
}

export default App;
