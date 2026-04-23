import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import Home from '../pages/Home';
import Planner from '../pages/Planner';
import TripDetails from '../pages/TripDetails';
import TripDetailPage from '../pages/TripDetailPage';
import Login from '../pages/Login';
import DashboardLayout from '../components/dashboard/DashboardLayout';

// 🔒 Auth check (replace with context if needed)
const isAuthenticated = () => {
  return localStorage.getItem('isLoggedIn');
};

// 🔒 Protected wrapper
const ProtectedLayout = ({ children }: { children: JSX.Element }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return <DashboardLayout>{children}</DashboardLayout>;
};

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* ✅ Public Route */}
      <Route path="/login" element={<Login />} />

      {/* 🔒 Protected Routes */}
      <Route
        path="/"
        element={
          <ProtectedLayout>
            <Home />
          </ProtectedLayout>
        }
      />

      <Route
        path="/planner"
        element={
          <ProtectedLayout>
            <Planner />
          </ProtectedLayout>
        }
      />

      <Route
        path="/trip-details"
        element={
          <ProtectedLayout>
            <TripDetails />
          </ProtectedLayout>
        }
      />

      <Route
        path="/trip/:id"
        element={
          <ProtectedLayout>
            <TripDetailPage />
          </ProtectedLayout>
        }
      />

      {/* fallback */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
