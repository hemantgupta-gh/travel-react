import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

const Header: React.FC = () => {
  const isAuth = localStorage.getItem('isLoggedIn');
  const { isDarkMode, toggleTheme } = useTheme();

  const [menuOpen, setMenuOpen] = useState(false);

  const linkClass = 'text-sm font-medium px-3 py-2 rounded-md transition';
  const activeClass = 'bg-blue-500 text-white';

  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-white/80 dark:bg-gray-900/90 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6 py-3">
        {/* Logo */}
        <h1 className="text-base sm:text-lg font-bold text-gray-800 dark:text-white">
          ✈️ Smart Travel Planner
        </h1>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-3">
          {isAuth && (
            <>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `${linkClass} ${
                    isActive
                      ? activeClass
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`
                }
              >
                Home
              </NavLink>

              <NavLink
                to="/planner"
                className={({ isActive }) =>
                  `${linkClass} ${
                    isActive
                      ? activeClass
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`
                }
              >
                Planner
              </NavLink>

              <NavLink
                to="/trip-details"
                className={({ isActive }) =>
                  `${linkClass} ${
                    isActive
                      ? activeClass
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`
                }
              >
                Trips
              </NavLink>
            </>
          )}

          {!isAuth && (
            <NavLink
              to="/login"
              className="text-sm font-medium text-blue-600 hover:underline"
            >
              Login
            </NavLink>
          )}

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="ml-2 flex items-center gap-2 px-3 py-2 rounded-full 
                       border border-gray-300 dark:border-gray-600
                       bg-white dark:bg-gray-800 
                       text-gray-800 dark:text-white
                       shadow-sm hover:shadow-md
                       hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            <span>{isDarkMode ? '☀️' : '🌙'}</span>
            <span className="hidden sm:inline">
              {isDarkMode ? 'Light' : 'Dark'}
            </span>
          </button>
        </nav>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gray-700 dark:text-white text-xl"
        >
          {menuOpen ? '✖' : '☰'}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
          {isAuth && (
            <>
              <NavLink
                to="/"
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `block ${linkClass} ${
                    isActive
                      ? activeClass
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`
                }
              >
                Home
              </NavLink>

              <NavLink
                to="/planner"
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `block ${linkClass} ${
                    isActive
                      ? activeClass
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`
                }
              >
                Planner
              </NavLink>

              <NavLink
                to="/trip-details"
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `block ${linkClass} ${
                    isActive
                      ? activeClass
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`
                }
              >
                Trips
              </NavLink>
            </>
          )}

          {!isAuth && (
            <NavLink
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="block text-sm font-medium text-blue-600"
            >
              Login
            </NavLink>
          )}

          {/* Theme Toggle Mobile */}
          <button
            onClick={toggleTheme}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-full 
                       border border-gray-300 dark:border-gray-600
                       bg-white dark:bg-gray-800 
                       text-gray-800 dark:text-white
                       hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
