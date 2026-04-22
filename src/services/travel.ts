import { Trip } from '../types';

const STORAGE_KEY = 'travel_trips';

const travelService = {
  // Save a new trip
  saveTrip: async (trip: Trip): Promise<void> => {
    const existing = localStorage.getItem(STORAGE_KEY);
    const trips: Trip[] = existing ? JSON.parse(existing) : [];

    trips.push(trip);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(trips));
  },

  // Get all trips
  getTrips: async (): Promise<Trip[]> => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  // Delete a trip by ID
  deleteTrip: async (tripId: string): Promise<void> => {
    const data = localStorage.getItem(STORAGE_KEY);
    const trips: Trip[] = data ? JSON.parse(data) : [];

    const updatedTrips = trips.filter((trip) => trip.id !== tripId);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTrips));
  },
};

export default travelService;
