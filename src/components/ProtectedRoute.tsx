import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const isAuth = localStorage.getItem('isLoggedIn');

    if (!isAuth) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;