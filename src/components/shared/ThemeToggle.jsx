import React from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex items-center justify-center w-14 h-8 rounded-full bg-gray-300 dark:bg-gray-700 transition-all duration-300 focus:outline-none"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <span
        className={`absolute left-1 w-6 h-6 rounded-full bg-white shadow-lg transform transition-transform duration-300 ${
          isDark ? 'translate-x-6' : 'translate-x-0'
        }`}
      >
        <div className="flex items-center justify-center w-full h-full">
          {isDark ? (
            <FaSun className="text-yellow-500 w-4 h-4" />
          ) : (
            <FaMoon className="text-gray-600 w-4 h-4" />
          )}
        </div>
      </span>
    </button>
  );
};

export default ThemeToggle;