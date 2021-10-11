import { LatLng } from '@googlemaps/google-maps-services-js';
import useSWR from 'swr';

const fetcher = async (
  url: string,
  location: LatLng | null,
  radius: number,
) => {
  console.log('fetcher');

  if (location == null) return null;

  const params = new URLSearchParams();
  params.append('location', JSON.stringify(location));
  params.append('radius', JSON.stringify(radius));

  const response = await fetch(`${url}?${params.toString()}`);
  const result = await response.json();

  return result;
};

const useBars = (location: LatLng | null, radius: number) =>
  useSWR(['/api/bars', location, radius], fetcher, {
    revalidateOnFocus: false,
    revalidateOnMount: false,
    revalidateOnReconnect: false,
    refreshWhenOffline: false,
    refreshWhenHidden: false,
    refreshInterval: 0,
  });

export default useBars;
