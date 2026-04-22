import axios from 'axios';

// Prefer GeoDB (RapidAPI) if keys are configured in .env
const GEODB_KEY = process.env.REACT_APP_GEODB_KEY;
const GEODB_HOST =
  process.env.REACT_APP_GEODB_HOST || 'wft-geo-db.p.rapidapi.com';
const GEOCODING_API_URL =
  process.env.REACT_APP_GEOCODING_URL || 'https://api.example.com/geocoding';

export const getCoordinates = async (location: string) => {
  try {
    if (GEODB_KEY) {
      // Use GeoDB Cities search (namePrefix) to find matching cities
      const resp = await axios.get(
        'https://wft-geo-db.p.rapidapi.com/v1/geo/cities',
        {
          params: {
            namePrefix: location,
            limit: 5,
          },
          headers: {
            'x-rapidapi-key': GEODB_KEY,
            'x-rapidapi-host': GEODB_HOST,
          },
        }
      );
      return resp.data;
    }

    // Fallback to a generic geocoding endpoint
    const response = await axios.get(
      `${GEOCODING_API_URL}?q=${encodeURIComponent(location)}`
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      'Error fetching coordinates: ' + (error.message || String(error))
    );
  }
};

export const getLocationDetails = async (lat: number, lon: number) => {
  try {
    if (GEODB_KEY) {
      // GeoDB doesn't provide reverse geocoding in the free endpoints; fallback to a public reverse geocoding service if required.
      // For now return an object that callers can use.
      return { latitude: lat, longitude: lon };
    }

    const response = await axios.get(
      `${GEOCODING_API_URL}/details?lat=${lat}&lon=${lon}`
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      'Error fetching location details: ' + (error.message || String(error))
    );
  }
};
