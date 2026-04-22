// This file exports TypeScript types and interfaces used throughout the application.

export interface TravelDestination {
  id: string;
  name: string;
  country: string;
  description: string;
  imageUrl: string;
}

export interface Itinerary {
  id: string;
  destinationId: string;
  activities: Activity[];
}

export interface Activity {
  id: string;
  name: string;
  time: string;
  location: string;
}

export interface Booking {
  id: string;
  destinationId: string;
  userId: string;
  date: string;
  status: 'confirmed' | 'pending' | 'canceled';
}

export interface User {
  id: string;
  name: string;
  email: string;
  preferences: UserPreferences;
}

export interface UserPreferences {
  theme: 'light' | 'dark';
  language: string;
}

export interface Trip {
  id: string;
  title: string;
  destination: string;
  startDate: string;
  endDate: string;
  notes?: string;
}
