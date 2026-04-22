import React, { useEffect, useMemo, useState } from 'react';
import { getCoordinates } from '../services/geocoding';
import { fetchWeatherData, fetchCountryData } from '../services/api';

type Suggestion = {
  id?: number | string;
  name: string;
  region?: string;
  country?: string;
  countryCode?: string;
  latitude?: number;
  longitude?: number;
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

  // Suggestions
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

  // Weather + country
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
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
          ✈️ Travel Planner
        </h1>

        {/* Search */}
        <div className="relative">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search city or destination..."
            className="w-full p-4 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
          />

          {loadingSuggestions && (
            <div className="absolute right-4 top-4 text-sm text-gray-400">
              Loading...
            </div>
          )}

          {suggestionList.length > 0 && (
            <div className="absolute w-full bg-white dark:bg-gray-800 shadow-lg rounded-xl mt-2 z-10">
              {suggestionList.map((s) => (
                <div
                  key={s.id}
                  onClick={() => onSelect(s)}
                  className="p-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <strong>{s.name}</strong> {s.country && `• ${s.country}`}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Selected Card */}
        {selected && (
          <div className="mt-6 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                  {selected.name}
                </h2>
                <p className="text-gray-500">{selected.country}</p>
              </div>

              <button
                onClick={() => setShowModal(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Book Trip
              </button>
            </div>

            {/* Weather */}
            {weather && (
              <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                  🌡 {weather.main?.temp}°C
                </div>
                <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                  💧 {weather.main?.humidity}%
                </div>
                <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                  {weather.weather?.[0]?.description}
                </div>
              </div>
            )}

            {/* Country */}
            {countryInfo && (
              <div className="mt-4 flex gap-4 items-center">
                <img src={countryInfo.flags?.png} className="w-20 rounded" />
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  <div>
                    <strong>{countryInfo.name?.common}</strong>
                  </div>
                  <div>Capital: {countryInfo.capital?.[0]}</div>
                  <div>
                    Population: {countryInfo.population?.toLocaleString()}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl w-80 shadow-lg">
              <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
                Plan your trip
              </h3>

              <input
                type="date"
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full mb-3 p-2 border rounded"
              />

              <input
                type="date"
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full mb-3 p-2 border rounded"
              />

              <button
                onClick={saveTrip}
                className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
              >
                Confirm Booking
              </button>

              <button
                onClick={() => setShowModal(false)}
                className="w-full mt-2 text-gray-500"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Toast */}
        {toast && (
          <div className="fixed bottom-6 right-6 bg-black text-white px-4 py-2 rounded-lg shadow">
            {toast}
          </div>
        )}
      </div>
    </div>
  );
};

export default Planner;
