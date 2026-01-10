import React from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className="relative inline-flex items-center w-14 h-8 rounded-full bg-gray-300 dark:bg-slate-700 transition-colors duration-500 focus:outline-none shadow-inner active:scale-95"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <span
        className={`absolute left-1 w-6 h-6 rounded-full bg-white dark:bg-slate-900 shadow-lg transform transition-transform duration-300 flex items-center justify-center ${isDark ? 'translate-x-6' : 'translate-x-0'
          }`}
      >
        {isDark ? (
          <FaSun className="text-yellow-500 w-3.5 h-3.5 animate-pulse" />
        ) : (
          <FaMoon className="text-gray-600 w-3.5 h-3.5" />
        )}
      </span>
    </button>
  );
};

export default ThemeToggle;