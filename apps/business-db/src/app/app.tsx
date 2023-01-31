// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux/es/exports';
import AdminAuth from '../MIDL/AdminAuth';
import { RootState } from '../store';
import {useEffect} from "react"
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../configs/firebaseconfig';
import { showNotification } from '@mantine/notifications';
import { IconX } from '@tabler/icons';
import { setUser } from '../store/authSlice';
import { LoadingOverlay } from '@mantine/core';
import Dashboard from '../dashboard';


export function App() {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state: RootState) => state.user);
  useEffect(() => {
    const Unsubscribe = onAuthStateChanged(auth, async (cred) => {
      if (cred) {
        dispatch(setUser(cred));
      } else dispatch(setUser(null));
    });
    return () => Unsubscribe();
  }, []);
  if (loading) {
    return <LoadingOverlay visible={loading} overlayBlur={2} />;
  }
  if (!user) {
    return (
      <div className="text-center">
        <AdminAuth />
      </div>
    );
  }
  return (
    <Dashboard />
  );
}

export default App;
