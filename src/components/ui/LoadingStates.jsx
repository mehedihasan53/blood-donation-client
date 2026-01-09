import React from 'react';
import { motion } from 'framer-motion';

// Skeleton loader for cards
export const CardSkeleton = ({ count = 3 }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="bg-white rounded-2xl shadow-sm p-6 animate-pulse">
        <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4"></div>
        <div className="h-4 bg-gray-200 rounded mb-2"></div>
        <div className="h-3 bg-gray-200 rounded mb-4 w-3/4 mx-auto"></div>
        <div className="space-y-2">
          <div className="h-3 bg-gray-200 rounded"></div>
          <div className="h-3 bg-gray-200 rounded w-5/6"></div>
        </div>
        <div className="flex gap-2 mt-4">
          <div className="flex-1 h-10 bg-gray-200 rounded-xl"></div>
          <div className="flex-1 h-10 bg-gray-200 rounded-xl"></div>
        </div>
      </div>
    ))}
  </div>
);

// Table skeleton
export const TableSkeleton = ({ rows = 5, cols = 4 }) => (
  <div className="bg-white rounded-xl shadow-sm overflow-hidden">
    <div className="p-4 border-b">
      <div className="h-6 bg-gray-200 rounded w-1/4 animate-pulse"></div>
    </div>
    <div className="divide-y">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="p-4 flex gap-4">
          {Array.from({ length: cols }).map((_, j) => (
            <div key={j} className="flex-1 h-4 bg-gray-200 rounded animate-pulse"></div>
          ))}
        </div>
      ))}
    </div>
  </div>
);

// Spinner with different sizes
export const Spinner = ({ size = 'md', color = 'red' }) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8', 
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const colors = {
    red: 'border-red-600',
    blue: 'border-blue-600',
    green: 'border-green-600',
    gray: 'border-gray-600'
  };

  return (
    <div className={`${sizes[size]} border-4 ${colors[color]} border-t-transparent rounded-full animate-spin`}></div>
  );
};

// Full page loading
export const PageLoader = ({ message = 'Loading...' }) => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full mx-auto mb-4"
      />
      <p className="text-gray-600 font-medium">{message}</p>
    </div>
  </div>
);

// Button loading state
export const LoadingButton = ({ loading, children, ...props }) => (
  <button
    {...props}
    disabled={loading || props.disabled}
    className={`${props.className} ${loading ? 'cursor-not-allowed opacity-75' : ''}`}
  >
    {loading ? (
      <div className="flex items-center justify-center gap-2">
        <Spinner size="sm" color="white" />
        <span>Loading...</span>
      </div>
    ) : (
      children
    )}
  </button>
);

// Progress bar
export const ProgressBar = ({ progress, className = '' }) => (
  <div className={`w-full bg-gray-200 rounded-full h-2 ${className}`}>
    <motion.div
      className="bg-red-600 h-2 rounded-full"
      initial={{ width: 0 }}
      animate={{ width: `${progress}%` }}
      transition={{ duration: 0.5 }}
    />
  </div>
);