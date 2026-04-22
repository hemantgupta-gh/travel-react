import React, { useEffect, useState } from 'react';

type Trip = {
  id: number;
  destination: string;
  country?: string;
  startDate: string;
  endDate: string;
};

const Home: React.FC = () => {
  const [trips, setTrips] = useState<Trip[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('trips');
    if (stored) {
      setTrips(JSON.parse(stored));
    }
  }, []);

  const today = new Date().toISOString().split('T')[0];

  const totalTrips = trips.length;
  const pastTrips = trips.filter((t) => t.endDate < today).length;
  const upcomingTrips = trips.filter((t) => t.startDate >= today).length;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Smart Travel Planner ✈️
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Plan your trips, explore destinations, and make unforgettable
          memories.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 hover:shadow-lg transition">
          <h3 className="text-gray-500 dark:text-gray-400 text-sm">
            Total Trips
          </h3>
          <p className="text-3xl font-semibold text-gray-800 dark:text-white mt-2">
            {totalTrips}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 hover:shadow-lg transition">
          <h3 className="text-gray-500 dark:text-gray-400 text-sm">
            Past Trips
          </h3>
          <p className="text-3xl font-semibold text-gray-800 dark:text-white mt-2">
            {pastTrips}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 hover:shadow-lg transition">
          <h3 className="text-gray-500 dark:text-gray-400 text-sm">
            Upcoming Trips
          </h3>
          <p className="text-3xl font-semibold text-gray-800 dark:text-white mt-2">
            {upcomingTrips}
          </p>
        </div>
      </div>

      {/* Trips Preview */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
          Recent Trips
        </h2>

        {trips.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow text-gray-500 dark:text-gray-400">
            No trips found. Start planning your journey 🚀
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {trips.slice(0, 3).map((trip) => (
              <div
                key={trip.id}
                className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow hover:shadow-lg transition"
              >
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  {trip.destination}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {trip.country || 'Unknown Country'}
                </p>

                <div className="mt-3 text-sm text-gray-600 dark:text-gray-300">
                  <p>📅 {trip.startDate}</p>
                  <p>➡️ {trip.endDate}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
