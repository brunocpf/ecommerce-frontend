import { LatLng } from '@googlemaps/google-maps-services-js';
import { useEffect, useState } from 'react';

const useCurrentPosition = () => {
  const [position, setPosition] = useState<LatLng | null>(null);

  console.log(position);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(function (position) {
        console.log('watched');

        setPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  }, []);

  return position;
};

export default useCurrentPosition;
