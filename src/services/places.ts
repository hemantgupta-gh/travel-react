import axios from 'axios';

const FOURSQUARE_KEY = process.env.REACT_APP_FOURSQUARE_KEY;

/**
 * Simple wrapper for searching places using Foursquare Places API v3 (if key provided)
 * Returns the raw response data so callers can adapt fields as needed.
 */
export const searchPlaces = async (
  query: string,
  near?: string,
  ll?: { lat: number; lon: number }
) => {
  try {
    if (!FOURSQUARE_KEY) {
      throw new Error(
        'FOURSQUARE API key not configured (REACT_APP_FOURSQUARE_KEY)'
      );
    }

    const params: any = { query, limit: 10 };
    if (near) params.near = near;
    if (ll) params.ll = `${ll.lat},${ll.lon}`;

    const resp = await axios.get(
      'https://api.foursquare.com/v3/places/search',
      {
        params,
        headers: {
          Authorization: FOURSQUARE_KEY,
          Accept: 'application/json',
        },
      }
    );

    return resp.data;
  } catch (error: any) {
    throw new Error(
      'Error searching places: ' + (error.message || String(error))
    );
  }
};

export default { searchPlaces };
