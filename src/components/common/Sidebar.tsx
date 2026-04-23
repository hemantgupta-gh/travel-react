import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const username = localStorage.getItem('username') || 'Admin';
  const userInitial = username.charAt(0).toUpperCase();

  const logout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    navigate('/login');
  };

  return (
    <>
      {/* User Icon Toggle */}
      <button
        onClick={() => setOpen(true)}
        className="
          md:hidden fixed left-2 top-1/2 -translate-y-1/2 z-50
          w-10 h-10 rounded-full
          bg-blue-600 text-white
          flex items-center justify-center font-bold
          shadow-lg
        "
      >
        {userInitial}
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50
          w-64 h-full
          bg-white dark:bg-gray-900
          border-r border-gray-200 dark:border-gray-700
          p-5 flex flex-col
          transform transition-transform duration-300
          ${open ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0 md:static md:flex
        `}
      >
        {/* Close Button (Mobile only) */}
        <button
          onClick={() => setOpen(false)}
          className="md:hidden absolute top-4 right-4 text-gray-600 dark:text-gray-300 text-xl"
        >
          ✕
        </button>

        {/* Profile */}
        <div className="flex items-center gap-3 mb-6 mt-4 md:mt-0">
          <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
            {userInitial}
          </div>
          <div>
            <div className="text-sm font-semibold text-gray-800 dark:text-white">
              {username}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Logged in
            </div>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={logout}
          className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      </aside>
    </>
  );
};

export default Sidebar;
