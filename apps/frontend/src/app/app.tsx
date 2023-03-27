// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.css';
import { useJsApiLoader } from '@react-google-maps/api';
import { GoogleMapApiKey } from '../configs/googleMap';
import { LoadingOverlay } from '@mantine/core';
import useNetworkStatus from '../hooks/useNetworkStatus';
import Landing from '../pages/Landing';
import { Route, Routes, useNavigate, useParams } from 'react-router-dom';
import Items from '../pages/items';
import List from '../pages/items/list';
import LiftFacilityPage from '../pages/LiftFacilityPage';
import UserInfo from '../pages/UserInfo';
import Booking from '../pages/Booking';
import Quoatation from '../pages/Quoatation';
import { useEffect } from 'react';
import { setUser, UserSlice } from '../store/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../configs/firebaseconfig';
import { SuccessPage } from '../pages/SuccessPage';
import PrivacyPolicy from './privacyPolicy';

export function App() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: GoogleMapApiKey,
    libraries: ['places'],
  });
  const { user } = useSelector((state: RootState) => state.User)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { clientId } = useParams()
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser(user))
      } else {
        if (clientId) {
          navigate(`/${clientId}`)
        }
      }
    });
    return () => unsub()
  }, [])
  
  // signOut(auth);
  
  useEffect(() => {
    const unloadCallback = async (event: { preventDefault: () => void; returnValue: string; }) => {
      await signOut(auth)
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
        <Route path="privacy" element={<PrivacyPolicy path='privacy' />} />
        <Route path="tac" element={<PrivacyPolicy path='tac' />} />
        <Route path="refund" element={<PrivacyPolicy path='refund' />} />
        <Route path="/:clientId" element={<Landing />} />
        <Route path="/:clientId/items" element={<Items />} />
        <Route path="/:clientId/list" element={<List />} />
        <Route path="/:clientId/liftQuery" element={<LiftFacilityPage />} />
        <Route path="/:clientId/userInfo" element={<UserInfo />} />
        <Route path="/:clientId/bookings" element={<Booking />} />
        <Route path="/:clientId/quotation/:id" element={<Quoatation />} />
        <Route path="/:clientId/quotation/:id/:razorpayID/success" element={<SuccessPage />} />
      </Routes>
    </div>
  );
}

export default App; 
