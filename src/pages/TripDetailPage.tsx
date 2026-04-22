import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchWeatherData, fetchCountryData } from '../services/api';

type Trip = {
    id: number;
    destination: string;
    country?: string;
    startDate: string;
    endDate: string;
};

const TripDetailPage: React.FC = () => {
    const { id } = useParams();

    const [trip, setTrip] = useState<Trip | null>(null);
    const [weather, setWeather] = useState<any>(null);
    const [countryInfo, setCountryInfo] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const stored = localStorage.getItem('trips');
        if (!stored || !id) return;

        const trips: Trip[] = JSON.parse(stored);
        const found = trips.find((t) => t.id === Number(id));
        setTrip(found || null);
    }, [id]);

    useEffect(() => {
        if (!trip) return;

        const load = async () => {
            setLoading(true);

            try {
                const weatherResp = await fetchWeatherData(
                    trip.destination + (trip.country ? ',' + trip.country : '')
                );
                setWeather(weatherResp);

                if (trip.country) {
                    try {
                        const countryResp = await fetchCountryData(trip.country);
                        setCountryInfo(Array.isArray(countryResp) ? countryResp[0] : countryResp);
                    } catch {
                        const res = await fetch(`https://restcountries.com/v3.1/name/${trip.country}`);
                        const data = await res.json();
                        setCountryInfo(data?.[0]);
                    }
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        load();
    }, [trip]);

    if (!trip) {
        return (
            <div className="p-6 text-center text-gray-500 dark:text-gray-400">
                Trip not found
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
            <div className="max-w-5xl mx-auto space-y-6">

                {/* HERO */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                        {trip.destination}
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">
                        {trip.country || 'Unknown Country'}
                    </p>

                    <div className="mt-4 flex gap-6 text-sm text-gray-600 dark:text-gray-300">
                        <div>📅 {trip.startDate}</div>
                        <div>➡️ {trip.endDate}</div>
                    </div>
                </div>

                {loading && (
                    <div className="text-center text-gray-500 dark:text-gray-400">
                        Loading details...
                    </div>
                )}

                {/* WEATHER */}
                {weather && (
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
                        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
                            🌦 Weather
                        </h2>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                            <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                                🌡 {weather.main?.temp}°C
                            </div>
                            <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                                🤒 {weather.main?.feels_like}°C
                            </div>
                            <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                                💧 {weather.main?.humidity}%
                            </div>
                            <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                                {weather.weather?.[0]?.description}
                            </div>
                        </div>
                    </div>
                )}

                {/* COUNTRY */}
                {countryInfo && countryInfo.name && (
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
                        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
                            🌍 Country Info
                        </h2>

                        <div className="flex flex-col sm:flex-row gap-6 items-center">
                            {countryInfo.flags?.png && (
                                <img
                                    src={countryInfo.flags.png}
                                    alt="flag"
                                    className="w-28 rounded-lg shadow"
                                />
                            )}

                            <div className="text-gray-600 dark:text-gray-300 space-y-1">
                                <div className="text-lg font-semibold text-gray-800 dark:text-white">
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
        </div>
    );
};

export default TripDetailPage;