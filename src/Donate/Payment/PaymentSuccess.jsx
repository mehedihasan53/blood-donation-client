import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useAxios from "../../hooks/useAxios";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const axiosInstance = useAxios();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!sessionId || saved) return;

    const savePayment = async () => {
      try {
        await axiosInstance.post(`/success-payment?session_id=${sessionId}`);
        setSaved(true);
      } catch (err) {
        console.error(err);
        setError("Payment verified, but failed to save data.");
      } finally {
        setLoading(false);
      }
    };

    savePayment();
  }, [sessionId, saved, axiosInstance]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-medium text-gray-600">
          Verifying payment...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500 font-medium">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white rounded-xl shadow p-6 max-w-md w-full text-center space-y-4">
        <h1 className="text-2xl font-bold text-green-600">
          Payment Successful 🎉
        </h1>
        <p className="text-gray-600">
          Thank you for your donation. Your payment has been completed
          successfully.
        </p>
        <p className="text-sm text-gray-400">
          Transaction ID: <span className="break-all">{sessionId}</span>
        </p>
      </div>
    </div>
  );
};

export default PaymentSuccess;
