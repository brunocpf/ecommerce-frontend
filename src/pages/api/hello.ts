import {
  Client,
  Language,
  PlaceInputType,
} from '@googlemaps/google-maps-services-js';
import type { NextApiRequest, NextApiResponse } from 'next';

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse,
) {
  const client = new Client({});

  const result = await client.placesNearby({
    params: {
      location: { lat: -19.892674, lng: -43.944733 },
      language: Language.pt_BR,
      radius: 5000,
      type: 'bar',
      key: process.env.GOOGLE_MAPS_API_KEY ?? '',
    },
    timeout: 1000, // milliseconds
  });

  const bar = result.data.results[0];

  if (bar.place_id) {
    const placeResult = await client.findPlaceFromText({
      params: {
        input: 'Correria Music Bar',
        inputtype: PlaceInputType.textQuery,
        key: process.env.GOOGLE_MAPS_API_KEY ?? '',
      },
      timeout: 100,
    });

    const barResults = await client.placeDetails({
      params: {
        language: Language.pt_BR,
        place_id: placeResult.data.candidates[0].place_id ?? '',
        key: process.env.GOOGLE_MAPS_API_KEY ?? '',
      },
      timeout: 1000,
    });

    res.status(200).json(JSON.stringify(barResults.data, null, 2));
  } else {
    res.status(400);
  }
}
