import { useEffect, useState } from 'react';

type error = {
  code: number;
  message: string;
};
export type locationType = {
  loaded: boolean;
  coordinates: { lat: string | null; lng: string | null };
  error: null | error;
  addressData: any;
};

const useGetLocation = () => {
  const [location, setLocation] = useState<locationType>({
    loaded: false,
    coordinates: { lat: null, lng: null },
    error: null,
    addressData: null,
  });
  const [hasLocationAccess, setHasLocationAccess] = useState<
    undefined | boolean
  >(undefined);
  const [results, setResults] = useState<any[] | null>(null);
  const [address, setAddress] = useState<null | string>(null);

  const onSuccess = async (loc: any) => {
    if (!results) {
      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${loc.coords.latitude},${loc.coords.longitude}&key=AIzaSyAQAen09Fg70paaU2FWaCL_t7DcJtMGXDU`
      const data = await fetch(url, {
        method: 'GET',
      })
      setLocation({
        loaded: true,
        coordinates: {
          lat: loc.coords.latitude,
          lng: loc.coords.longitude,
        },
        error: null,
        addressData: data,
      });
      const fetchResult = await data.json();
      if (!fetchResult) {
        setResults([]);
      } else {
        setResults(fetchResult);
        setHasLocationAccess(true);
      }
    }
  };

  const onError = (error: error) => {
    setHasLocationAccess(false);
    setLocation({
      loaded: true,
      coordinates: {
        lat: '',
        lng: '',
      },
      error,
      addressData: null,
    });
  };
  useEffect(() => {
    if (!('geolocation' in navigator)) {
      onError({
        code: 0,
        message: 'Geolocation not supported',
      });
    }
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }, []);

  return { address, location, hasLocationAccess, results, setAddress };
};

export default useGetLocation;
