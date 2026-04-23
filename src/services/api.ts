import axios from 'axios';

// Use OpenWeather when available via REACT_APP_OPENWEATHER_KEY, otherwise fall back to a generic API_BASE_URL
const OPENWEATHER_KEY = process.env.REACT_APP_OPENWEATHER_KEY;
const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || 'https://restcountries.com/v3.1/alpha';

export const fetchWeatherData = async (location: string) => {
  try {
    if (OPENWEATHER_KEY) {
      // Use OpenWeatherMap current weather endpoint
      const resp = await axios.get(
        'https://api.openweathermap.org/data/2.5/weather',
        {
          params: {
            q: location,
            appid: OPENWEATHER_KEY,
            units: 'metric',
          },
        }
      );
      return resp.data;
    }

    // Fallback to a generic API if env key is not provided
    const response = await axios.get(`${API_BASE_URL}/weather`, {
      params: { location },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(
      'Error fetching weather data: ' + (error.message || String(error))
    );
  }
};

export const fetchCountryData = async (countryCode: string) => {
  try {
    // If you later add a specific country API key, handle it here. For now use API_BASE_URL.
    const response = await axios.get(
      'https://restcountries.com/v3.1/alpha?codes=' + countryCode,
      {
        //params: { code: countryCode },
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      'Error fetching country data: ' + (error.message || String(error))
    );
  }
};
