import React from "react";
import { Link } from "react-router-dom";
import { FaExclamationTriangle, FaHome } from "react-icons/fa";
import DynamicTitle from "./DynamicTitle";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <DynamicTitle title="Error Page" />
      <div className="text-center">
        <div className="flex justify-center mb-6">
          <div className="p-6 bg-red-100 rounded-full animate-bounce">
            <FaExclamationTriangle className="text-red-600 text-6xl" />
          </div>
        </div>

        <h1 className="text-9xl font-extrabold text-gray-200">404</h1>
        <h2 className="text-3xl font-bold text-gray-800 mt-4">
          Oops! Page Not Found
        </h2>
        <p className="text-gray-600 mt-2 mb-8 max-w-md mx-auto">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>

        <Link
          to="/"
          className="inline-flex items-center gap-2 px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
        >
          <FaHome />
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
