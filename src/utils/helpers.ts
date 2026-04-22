// This file contains utility functions to assist with various tasks in the application.

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString();
};

export const calculateTripDuration = (
  startDate: Date,
  endDate: Date
): number => {
  const duration = endDate.getTime() - startDate.getTime();
  return Math.ceil(duration / (1000 * 3600 * 24)); // Convert milliseconds to days
};

export const capitalizeFirstLetter = (string: string): string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const isValidEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};
