import React, { useContext, useState } from "react";
import useAxios from "../hooks/useAxios";
import { AuthContext } from "../Provider/AuthProvider";

const Donate = () => {
  const axiosInstance = useAxios();
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCheckOut = async (e) => {
    e.preventDefault();
    setError("");

    const donateAmount = e.target.donateAmount.value;

    if (!donateAmount || isNaN(donateAmount) || donateAmount <= 0) {
      return setError("Please enter a valid amount");
    }

    const formData = {
      donorEmail: user?.email,
      donorName: user?.displayName,
      donateAmount,
    };

    try {
      setLoading(true);
      const res = await axiosInstance.post(
        "/create-payment-checkout",
        formData
      );
      window.location.href = res.data.url;
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow p-6 space-y-6">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Donate for the Cause ❤️
        </h1>

        <form onSubmit={handleCheckOut} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Donation Amount (USD)
            </label>
            <input
              type="number"
              name="donateAmount"
              placeholder="Enter amount"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {user && (
            <div className="text-sm text-gray-500 space-y-1">
              <p>
                <b>Name:</b> {user.displayName}
              </p>
              <p>
                <b>Email:</b> {user.email}
              </p>
            </div>
          )}

          {error && <p className="text-sm text-red-500 font-medium">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-500 text-white py-2 rounded font-medium hover:bg-red-600 transition disabled:opacity-60"
          >
            {loading ? "Redirecting to payment..." : "Donate Now"}
          </button>
        </form>

        <p className="text-xs text-center text-gray-400">
          Secure payment powered by Stripe
        </p>
      </div>
    </div>
  );
};

export default Donate;
