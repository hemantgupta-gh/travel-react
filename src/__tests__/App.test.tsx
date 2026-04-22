import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders the travel planner dashboard', () => {
  render(<App />);
  const linkElement = screen.getByText(/travel planner/i);
  expect(linkElement).toBeInTheDocument();
});
