import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type Trip = {
  id: number;
  destination: string;
  country?: string;
  startDate: string;
  endDate: string;
};

const Home: React.FC = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const navigate = useNavigate();
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
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 sm:p-6 transition-colors duration-300">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">
          Smart Travel Planner ✈️
        </h1>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-2">
          Plan your trips, explore destinations, and make unforgettable
          memories.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-5 sm:p-6 hover:shadow-xl transition-all duration-300">
          <h3 className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            Total Trips
          </h3>
          <p className="text-2xl sm:text-3xl font-semibold text-gray-800 dark:text-white mt-2">
            {totalTrips}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-5 sm:p-6 hover:shadow-xl transition-all duration-300">
          <h3 className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            Past Trips
          </h3>
          <p className="text-2xl sm:text-3xl font-semibold text-gray-800 dark:text-white mt-2">
            {pastTrips}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-5 sm:p-6 hover:shadow-xl transition-all duration-300">
          <h3 className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            Upcoming Trips
          </h3>
          <p className="text-2xl sm:text-3xl font-semibold text-gray-800 dark:text-white mt-2">
            {upcomingTrips}
          </p>
        </div>
      </div>

      {/* Trips Preview */}
      <div className="mt-8 sm:mt-10">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white mb-3 sm:mb-4">
          Recent Trips
        </h2>

        {trips.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 p-5 sm:p-6 rounded-xl shadow text-sm sm:text-base text-gray-500 dark:text-gray-400">
            No trips found. Start planning your journey 🚀
          </div>
        ) : (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {trips.slice(0, 3).map((trip) => (
              <div
                key={trip.id}
                className="bg-white dark:bg-gray-800 p-4 sm:p-5 rounded-xl shadow hover:shadow-xl transition-all duration-300"
              >
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-white">
                  {trip.destination}
                </h3>

                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                  {trip.country || 'Unknown Country'}
                </p>

                <div className="mt-3 text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                  <p>📅 {trip.startDate}</p>
                  <p>➡️ {trip.endDate}</p>
                </div>
                <button
                  onClick={() => navigate(`/trip/${trip.id}`)}
                  className="flex-1 bg-blue-600 text-white mt-4 px-2 rounded-lg hover:bg-blue-700 transition"
                >
                  View details
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
