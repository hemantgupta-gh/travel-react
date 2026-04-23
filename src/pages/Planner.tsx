import React, { useEffect, useMemo, useState } from 'react';
import { getCoordinates } from '../services/geocoding';
import { fetchWeatherData, fetchCountryData } from '../services/api';

type Suggestion = {
  id?: number | string;
  name: string;
  region?: string;
  country?: string;
  countryCode?: string;
};

const Planner: React.FC = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);

  const [selected, setSelected] = useState<Suggestion | null>(null);
  const [weather, setWeather] = useState<any>(null);
  const [countryInfo, setCountryInfo] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const [showModal, setShowModal] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [trips, setTrips] = useState<any[]>([]);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('trips');
    if (stored) setTrips(JSON.parse(stored));
  }, []);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  useEffect(() => {
    if (!query || query.length < 2) return setSuggestions([]);

    let cancelled = false;

    const timer = setTimeout(async () => {
      setLoadingSuggestions(true);
      try {
        const resp = await getCoordinates(query);
        const items =
          resp?.data?.map((it: any) => ({
            id: it.id || `${it.latitude}-${it.longitude}`,
            name: it.city || it.name || query,
            country: it.country,
            countryCode: (it.countryCode || '').toUpperCase(),
          })) || [];

        if (!cancelled) setSuggestions(items);
      } catch (e: any) {
        if (!cancelled) setError(e.message);
      } finally {
        if (!cancelled) setLoadingSuggestions(false);
      }
    }, 300);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [query]);

  useEffect(() => {
    if (!selected) return;

    (async () => {
      try {
        const w = await fetchWeatherData(selected.name);
        setWeather(w);

        if (selected.countryCode) {
          const c = await fetchCountryData(selected.countryCode);
          setCountryInfo(c?.[0] || c);
        }
      } catch (e: any) {
        setError(e.message);
      }
    })();
  }, [selected]);

  const onSelect = (s: Suggestion) => {
    setSelected(s);
    setQuery(`${s.name}, ${s.country}`);
    setSuggestions([]);
  };

  const suggestionList = useMemo(() => suggestions.slice(0, 6), [suggestions]);

  const saveTrip = () => {
    if (!selected || !startDate || !endDate) return;

    const newTrip = {
      id: Date.now(),
      destination: selected.name,
      country: selected.country,
      startDate,
      endDate,
    };

    const updated = [...trips, newTrip];
    setTrips(updated);
    localStorage.setItem('trips', JSON.stringify(updated));

    setShowModal(false);
    showToast(`Trip to ${selected.name} booked ✈️`);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-6">
          ✈️ Travel Planner
        </h1>

        {/* Search */}
        <div className="relative">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search city or destination..."
            className="w-full p-3 sm:p-4 rounded-xl border border-gray-300 dark:border-gray-700 
                       bg-white dark:bg-gray-800 text-gray-800 dark:text-white 
                       text-sm sm:text-base
                       shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
          />

          {loadingSuggestions && (
            <div className="absolute right-4 top-3 sm:top-4 text-xs sm:text-sm text-gray-400">
              Loading...
            </div>
          )}

          {suggestionList.length > 0 && (
            <div
              className="absolute w-full mt-2 z-20 rounded-xl overflow-hidden
                            bg-white dark:bg-gray-800
                            border border-gray-200 dark:border-gray-700
                            shadow-lg"
            >
              {suggestionList.map((s, i) => (
                <div key={s.id}>
                  <div
                    onClick={() => onSelect(s)}
                    className="p-3 cursor-pointer transition
                               text-sm sm:text-base
                               text-gray-800 dark:text-gray-100
                               hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <div className="font-medium">{s.name}</div>
                    {s.country && (
                      <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                        {s.country}
                      </div>
                    )}
                  </div>
                  {i !== suggestionList.length - 1 && (
                    <div className="border-t border-gray-200 dark:border-gray-700" />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Selected */}
        {selected && (
          <div className="mt-6 bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-2xl shadow space-y-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
              <div>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white">
                  {selected.name}
                </h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  {selected.country}
                </p>
              </div>

              <button
                onClick={() => setShowModal(true)}
                className="w-full sm:w-auto bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Book Trip
              </button>
            </div>

            {/* Weather */}
            {weather && (
              <div>
                <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-800 dark:text-white">
                  🌦 Weather
                </h2>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                  {[
                    { label: 'Temperature', value: `${weather.main?.temp}°C` },
                    {
                      label: 'Feels Like',
                      value: `${weather.main?.feels_like}°C`,
                    },
                    { label: 'Humidity', value: `${weather.main?.humidity}%` },
                    {
                      label: 'Condition',
                      value: weather.weather?.[0]?.description,
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="p-3 sm:p-4 rounded-xl bg-gray-100 dark:bg-gray-700 text-center"
                    >
                      <div className="text-lg sm:text-2xl font-bold text-gray-800 dark:text-white capitalize">
                        {item.value}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                        {item.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Country */}
            {countryInfo && countryInfo.name && (
              <div>
                <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-800 dark:text-white">
                  🌍 Country Info
                </h2>

                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center sm:items-start">
                  {countryInfo.flags?.png && (
                    <img
                      src={countryInfo.flags.png}
                      alt="flag"
                      className="w-24 sm:w-28 rounded-lg shadow"
                    />
                  )}

                  <div className="text-gray-600 dark:text-gray-300 space-y-1 text-sm sm:text-base text-center sm:text-left">
                    <div className="font-semibold text-gray-800 dark:text-white">
                      {countryInfo.name?.common || countryInfo.name}
                    </div>

                    <div>
                      Capital:{' '}
                      {Array.isArray(countryInfo.capital)
                        ? countryInfo.capital.join(', ')
                        : countryInfo.capital || 'N/A'}
                    </div>

                    <div>Region: {countryInfo.region || 'N/A'}</div>

                    <div>
                      Population:{' '}
                      {countryInfo.population?.toLocaleString?.() || 'N/A'}
                    </div>

                    <div>
                      Languages:{' '}
                      {countryInfo.languages
                        ? Object.values(countryInfo.languages).join(', ')
                        : 'N/A'}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl w-full max-w-sm shadow-lg">
              <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
                Plan your trip
              </h3>

              <input
                type="date"
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full mb-3 p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
              />

              <input
                type="date"
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full mb-3 p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
              />

              <button
                onClick={saveTrip}
                className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
              >
                Confirm Booking
              </button>

              <button
                onClick={() => setShowModal(false)}
                className="w-full mt-2 text-gray-500 dark:text-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Toast */}
        {toast && (
          <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 bg-black text-white px-4 py-2 rounded-lg shadow text-sm">
            {toast}
          </div>
        )}
      </div>
    </div>
  );
};

export default Planner;
