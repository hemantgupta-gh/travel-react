import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
        {/* Left */}
        <p>© {new Date().getFullYear()} Smart Travel Planner</p>

        {/* Right */}
        <div className="flex items-center gap-4">
          <span className="hover:text-gray-800 dark:hover:text-white cursor-pointer">
            Privacy
          </span>
          <span className="hover:text-gray-800 dark:hover:text-white cursor-pointer">
            Terms
          </span>
          <span className="hover:text-gray-800 dark:hover:text-white cursor-pointer">
            Contact
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
