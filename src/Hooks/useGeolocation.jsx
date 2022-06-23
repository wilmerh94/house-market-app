import { useEffect, useState } from 'react';
import { useGeolocated } from 'react-geolocated';
import { toast } from 'react-toastify';

//Hook for useGeolocation

export const useGeolocation = () => {
 const [location, setLocation] = useState({
  coordinates: {
   lat: '',
   lng: '',
  },
 });
 useEffect(() => {
  const success = (position) => {
   const { latitude, longitude } = position.coords;
   return setLocation({
    coordinates: {
     lat: latitude,
     lng: longitude,
    },
   });
  };
  const error = (error) => {
   console.log(error);
  };
  navigator.geolocation.getCurrentPosition(success, error, {
   enableHighAccuracy: true,
   timeout: 3000,
  });
 }, []);

 return location;
};
