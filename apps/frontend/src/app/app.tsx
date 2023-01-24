// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Suspense, lazy } from 'react';
import { useJsApiLoader } from '@react-google-maps/api';
import { GoogleMapApiKey } from '../configs/googleMap';
import { LoadingOverlay } from '@mantine/core';
import Landing from '../pages/Landing';
import { Route, Routes, Outlet } from 'react-router-dom';
import { useState } from 'react';
import PrivacyPolicy from './privacyPolicy';
import { Index } from '../pages';
import Lottie from 'lottie-react';
import truck from '../assets/json/truck-loading.json';
import { NavandFooter } from '../component/navandfooter';
import { ClientDataType } from '../pages/Quoatation/priceCalculation';
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
  const [clientData, setClientData] = useState<ClientDataType | null>(null);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: GoogleMapApiKey,
    libraries: ['places'],
  });

  if (!isLoaded)
    return (
      <div className="h-screen flex justify-center items-center">
        <Lottie animationData={truck} loop={true} className="h-72" />
      </div>
    );

  return (
    <Suspense fallback={<LoadingOverlay visible={true} />}>
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
        <Route
          path="/terms-conditions"
          element={
            <PrivacyPolicy path={'tac'} title={'Terms and Conditions'} />
          }
        />
        <Route
          path="/privacy-policy"
          element={<PrivacyPolicy path={'privacy'} title={'Privacy Policy'} />}
        />
        <Route
          path="/refund"
          element={<PrivacyPolicy path={'refund'} title={'Refund Policy'} />}
        />

        <Route
          path="/:clientId"
          element={
            <NavandFooter setClientData={setClientData} clientData={clientData}>
              <Landing setClientData={setClientData} />
            </NavandFooter>
          }
        />
        <Route
          path="/order"
          element={
            <NavandFooter setClientData={setClientData} clientData={clientData}>
              <Outlet />
            </NavandFooter>
          }
        >
          <Route path="/order/:orderId" element={<Index />} />
          <Route path="/order/:orderId/list" element={<List />} />
          <Route
            path="/order/:orderId/quotation"
            element={<Quoatation readOnly />}
          />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
