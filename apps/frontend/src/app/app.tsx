// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.css';
import { useJsApiLoader } from '@react-google-maps/api';
import { GoogleMapApiKey } from '../configs/googleMap';
import { LoadingOverlay } from '@mantine/core';
import useNetworkStatus from '../hooks/useNetworkStatus';
import Landing from '../pages/Landing';

export function App() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: GoogleMapApiKey,
    libraries: ['places'],
  });

  if (!isLoaded)
    return (
      <div style={{ width: 400, position: 'relative' }}>
        <LoadingOverlay visible={!isLoaded} />
      </div>
    );

  return (
    <div>
     <Landing />
    </div>
  );
}

export default App;
