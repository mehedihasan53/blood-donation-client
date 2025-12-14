import React from "react";
import { Link } from "react-router-dom";

const CancelPayment = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white rounded-xl shadow p-6 max-w-md w-full text-center space-y-4">
        <h1 className="text-2xl font-bold text-red-500">Payment Cancelled</h1>

        <p className="text-gray-600">
          Your payment was not completed. No money has been charged.
        </p>

        <div className="flex justify-center gap-3 pt-2">
          <Link
            to="/donate"
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Try Again
          </Link>

          <Link
            to="/"
            className="px-4 py-2 border rounded hover:bg-gray-100 transition"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CancelPayment;
