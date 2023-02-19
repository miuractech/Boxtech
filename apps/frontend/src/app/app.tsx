// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.css';
import { useJsApiLoader } from '@react-google-maps/api';
import { GoogleMapApiKey } from '../configs/googleMap';
import { LoadingOverlay } from '@mantine/core';
import useNetworkStatus from '../hooks/useNetworkStatus';
import Landing from '../pages/Landing';
import { Route, Routes } from 'react-router-dom';
import Items from '../pages/items';
import List from '../pages/items/list';
import LiftFacilityPage from '../pages/LiftFacilityPage';
import UserInfo from '../pages/UserInfo';
import Booking from '../pages/Booking';
import Quoatation from '../pages/Quoatation';
import { useEffect } from 'react';

export function App() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: GoogleMapApiKey,
    libraries: ['places'],
  });

  useEffect(() => {
    const unloadCallback = (event: { preventDefault: () => void; returnValue: string; }) => {
      event.preventDefault();
      event.returnValue = "";
      return "";
    };

    window.addEventListener("beforeunload", unloadCallback);
    return () => window.removeEventListener("beforeunload", unloadCallback);
  }, []);


  if (!isLoaded)
    return (
      <div style={{ width: 400, position: 'relative' }}>
        <LoadingOverlay visible={!isLoaded} />
      </div>
    );

  return (
    <div  >
      <Routes>
        <Route path="/:clientId" element={<Landing />} />
        <Route path="/:clientId/items" element={<Items />} />
        <Route path="/:clientId/list" element={<List />} />
        <Route path="/:clientId/liftQuery" element={<LiftFacilityPage />} />
        <Route path="/:clientId/userInfo" element={<UserInfo />} />
        <Route path="/:clientId/bookings" element={<Booking />} />
        <Route path="/:clientId/quotation/:id" element={<Quoatation />} />
      </Routes>
    </div>
  );
}

export default App;
