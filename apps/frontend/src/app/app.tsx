// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Suspense, lazy } from 'react';
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

import { useEffect, useState } from 'react';
import { setUser } from '../store/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../configs/firebaseconfig';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  serverTimestamp,
} from 'firebase/firestore';
import { setUserInfo } from '../store/OrderReducer';
import PricingPlans from '../pages/components/pricing-plans/PricingPlans';
import TermsCondition from '../pages/components/terms-n-conditions/TermsCondition';
import PrivacyPolicy from '../pages/components/privacy-policy/PrivacyPolicy';
import MyAccount from '../pages/components/myaccount/MyAccount';
import MySubscriptions from '../pages/components/myaccount/MySubscriptions';
import Checkout from '../pages/components/checkout/Checkout';
import CheckoutPremium from '../pages/components/checkout/CheckoutPremium';
import { showNotification } from '@mantine/notifications';
import { IconX } from '@tabler/icons';
import { Index } from '../pages';
import Lottie from 'lottie-react';
import truck from '../assets/json/truck-loading.json';

// import MyAccount from '../pages/components/myaccount/MyAccount';
// import MySubscriptions from '../pages/components/myaccount/MySubscriptions';
// import Checkout from '../pages/components/checkout/Checkout';
// import CheckoutPremium from '../pages/components/checkout/CheckoutPremium';

import { Helmet } from 'react-helmet';
import { NavandFooter } from '../component/navandfooter';
import { ClientDataType } from '../pages/Quoatation/priceCalculation';
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
        {/* <Route path="/pricing-plans" element={<PricingPlans />} /> */}
        <Route path="/terms-conditions" element={<TermsCondition />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        {/* <Route path="/account" element={<MyAccount />} /> */}
        {/* <Route path="/subscriptions" element={<MySubscriptions />} /> */}
        {/* <Route path="/checkout" element={<Checkout />} />
        <Route path="/checkout-premium" element={<CheckoutPremium />} /> */}
        {/* <Route element={<BoxTechWrapper />}> */}
        {/* </Route> */}
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
        {/* <Route index element={<Landing />} /> */}
      </Routes>
    </Suspense>
  );
}

export default App;

// const InitialPage = () => {
//   const { clientId } = useParams()
//   const navigate = useNavigate()

//   useEffect(() => {
//     (async () => {
//       if (clientId) {
//         const res = await getDoc(doc(db, "clients", clientId))
//         if (res.exists()) {
//           const newOrder = await addDoc(collection(db, "Orders"), {
//             clientId: clientId,
//             status: "created",
//             createdAt: serverTimestamp()
//           })
//           navigate(`/order/${newOrder.id}`)
//         } else {
//           navigate(`/`)
//           showNotification({
//             id: `reg-err-${Math.random()}`,
//             autoClose: 5000,
//             title: "Error",
//             message: "Invalid Link",
//             color: "red",
//             icon: <IconX />,
//             loading: false,
//           });
//         }
//       }
//     })()

//   }, [clientId])

//   return (
//     <div className='h-screen flex justify-center items-center'>
//       <Lottie animationData={truck} loop={true} className="h-72" />
//     </div>
//   )
// }
