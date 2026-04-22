import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

const Header: React.FC = () => {
  const isAuth = localStorage.getItem('isLoggedIn');
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <header className="bg-green-500 dark:bg-gray-900 text-white px-4 py-3 flex justify-between items-center">
      <h1 className="text-xl font-bold">Smart Travel Planner</h1>

      <nav>
        <ul className="flex items-center gap-4">
          {isAuth && (
            <>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/planner">Planner</Link>
              </li>
              <li>
                <Link to="/trip-details">Saved Trips</Link>
              </li>
            </>
          )}

          {!isAuth && (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}

          <li>
            <button
              onClick={toggleTheme}
              className="ml-2 px-3 py-1 rounded bg-white text-black dark:bg-gray-700 dark:text-white"
            >
              {isDarkMode ? '☀️ Light' : '🌙 Dark'}
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
