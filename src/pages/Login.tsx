import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (username === 'admin' && password === 'admin') {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('username', username);
      navigate('/');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-blue-500 to-indigo-600 dark:from-gray-900 dark:to-gray-800">
      {/* Card */}
      <div className="bg-white dark:bg-gray-900 p-6 sm:p-8 rounded-2xl shadow-xl w-full max-w-md">
        {/* Title */}
        <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-800 dark:text-white">
          Welcome Back!
        </h2>
        <p className="text-center text-sm sm:text-base text-gray-500 dark:text-gray-400 mt-2">
          Login to your account
        </p>

        {/* Error */}
        {error && (
          <div className="mt-4 text-sm text-red-500 text-center">{error}</div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="mt-5 sm:mt-6 space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 text-sm sm:text-base rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 text-sm sm:text-base rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <button
            type="submit"
            className="w-full py-2.5 sm:py-3 text-sm sm:text-base bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-5 sm:mt-6">
          Demo: admin / admin
        </p>
      </div>
    </div>
  );
};

export default Login;
