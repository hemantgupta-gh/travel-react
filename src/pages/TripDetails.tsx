import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type Trip = {
  id: number;
  destination: string;
  country?: string;
  startDate: string;
  endDate: string;
};

const TripDetails: React.FC = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem('trips');
    if (stored) setTrips(JSON.parse(stored));
  }, []);

  const deleteTrip = (id: number) => {
    const updated = trips.filter((t) => t.id !== id);
    setTrips(updated);
    localStorage.setItem('trips', JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            🧳 Your Trips
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Manage and explore your saved journeys
          </p>
        </div>

        {/* Empty State */}
        {trips.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow text-center">
            <p className="text-gray-500 dark:text-gray-400">
              No trips saved yet 🚀
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {trips.map((trip) => (
              <div
                key={trip.id}
                className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow hover:shadow-lg transition"
              >
                {/* Destination */}
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                  {trip.destination}
                </h3>

                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                  {trip.country || 'Unknown Country'}
                </p>

                {/* Dates */}
                <div className="mt-4 text-sm text-gray-600 dark:text-gray-300">
                  <p>📅 {trip.startDate}</p>
                  <p>➡️ {trip.endDate}</p>
                </div>

                {/* Actions */}
                <div className="mt-5 flex gap-3">
                  <button
                    onClick={() => navigate(`/trip/${trip.id}`)}
                    className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    View
                  </button>

                  <button
                    onClick={() => deleteTrip(trip.id)}
                    className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TripDetails;