import React from 'react';
import AppRoutes from './routes/AppRoutes';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import './styles/globals.css';

const App = () => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <AppRoutes />
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;