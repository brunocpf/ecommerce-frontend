import {
  Client,
  // Language,
  LatLng,
  // PlaceInputType,
} from '@googlemaps/google-maps-services-js';
import type { NextApiRequest, NextApiResponse } from 'next';

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// type GetBarsQuery = {
//   searchTerms: string[];
// };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const location = JSON.parse(req.query.location.toString()) as LatLng;
  const radius = JSON.parse(req.query.radius.toString()) as number;
  // const searchTerms = JSON.parse(
  //   req.query.searchTerms?.toString() ?? '[]',
  // ) as string[];
  const client = new Client({});

  const result = await client.placesNearby({
    params: {
      location,
      radius,
      type: 'bar',
      key: process.env.GOOGLE_MAPS_API_KEY ?? '',
    },
    timeout: 1000, // milliseconds
  });

  const response = {
    results: await Promise.all(
      result.data.results.map(async r => {
        return {
          id: r.place_id,
          name: r.name,
          vincinity: r.vicinity,
          openingHours: r.opening_hours,
          position: r.geometry?.location,
          thumbnailPhoto: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${
            r.photos?.[0]?.photo_reference ?? ''
          }&key=${process.env.GOOGLE_MAPS_API_KEY ?? ''}`,
        };
      }),
    ),
    nextPageToken: result.data.next_page_token,
  };

  res.status(200).json(JSON.stringify(response, null, 2));

  // const bar = result.data.results[0];

  // if (bar.place_id) {
  //   const placeResult = await client.findPlaceFromText({
  //     params: {
  //       input: 'Correria Music Bar',
  //       inputtype: PlaceInputType.textQuery,
  //       key: process.env.GOOGLE_MAPS_API_KEY ?? '',
  //     },
  //     timeout: 100,
  //   });

  //   const barResults = await client.placeDetails({
  //     params: {
  //       language: Language.pt_BR,
  //       place_id: placeResult.data.candidates[0].place_id ?? '',
  //       key: process.env.GOOGLE_MAPS_API_KEY ?? '',
  //     },
  //     timeout: 1000,
  //   });

  //   res.status(200).json(JSON.stringify(barResults.data, null, 2));
  // } else {
  //   res.status(400);
  // }
}
