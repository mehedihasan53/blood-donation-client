import { useContext, useState } from "react";
import { motion } from "framer-motion";
import { FaHeart, FaDollarSign, FaShieldAlt, FaUser, FaEnvelope, FaHandsHelping } from "react-icons/fa";
import useAxios from "../hooks/useAxios";
import { AuthContext } from "../Provider/AuthProvider";
import DynamicTitle from "../components/shared/DynamicTitle";

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

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const quickAmounts = [10, 25, 50, 100];

  const handleQuickAmount = (amount) => {
    document.querySelector('input[name="donateAmount"]').value = amount;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50/30 via-white/20 to-pink-50/30 dark:from-gray-900/50 dark:via-gray-800/30 dark:to-gray-900/50 backdrop-blur-sm">
      <DynamicTitle title="Donate - Support Our Mission" />

      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-40 h-40 bg-red-100/20 dark:bg-red-900/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-pink-100/20 dark:bg-pink-900/10 rounded-full blur-3xl animate-pulse animation-delay-2000" />
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-orange-100/20 dark:bg-orange-900/10 rounded-full blur-2xl animate-pulse animation-delay-4000" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 lg:py-24">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-2xl mx-auto"
        >
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-red-50/80 dark:bg-red-900/30 backdrop-blur-sm border border-red-200/50 dark:border-red-700/30 text-red-600 dark:text-red-400 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <FaHeart className="text-sm animate-pulse" />
              <span className="uppercase tracking-wide">Support Our Cause</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight mb-6">
              Make a{" "}
              <span className="text-red-600 dark:text-red-400">Difference</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto leading-relaxed">
              Your generous donation helps us maintain our platform, support emergency responses,
              and save more lives across Bangladesh.
            </p>
          </div>

          {/* Main Donation Form */}
          <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl border border-white/30 dark:border-gray-700/30 shadow-lg p-8 lg:p-10">
            <form onSubmit={handleCheckOut} className="space-y-8">
              {/* Quick Amount Selection */}
              <div>
                <label className="block text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Choose Amount
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                  {quickAmounts.map((amount) => (
                    <button
                      key={amount}
                      type="button"
                      onClick={() => handleQuickAmount(amount)}
                      className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-white/40 dark:border-gray-700/40 text-gray-700 dark:text-gray-200 px-4 py-3 rounded-xl font-semibold hover:bg-red-50/80 dark:hover:bg-red-900/20 hover:border-red-200/50 dark:hover:border-red-700/30 hover:text-red-600 dark:hover:text-red-400 transition-all duration-300"
                    >
                      ${amount}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Amount Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  <FaDollarSign className="inline mr-2 text-red-500" />
                  Donation Amount (USD)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    name="donateAmount"
                    placeholder="Enter custom amount"
                    min="1"
                    step="0.01"
                    className="w-full bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-white/40 dark:border-gray-700/40 text-gray-900 dark:text-white px-4 py-4 pl-12 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-all duration-300 placeholder-gray-500 dark:placeholder-gray-400"
                  />
                  <FaDollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                </div>
              </div>

              {/* User Information Display */}
              {user && (
                <div className="bg-gray-50/80 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/30 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <FaUser className="text-red-500" />
                    Donor Information
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                      <FaUser className="text-sm text-gray-400" />
                      <span className="font-medium">Name:</span>
                      <span>{user.displayName}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                      <FaEnvelope className="text-sm text-gray-400" />
                      <span className="font-medium">Email:</span>
                      <span>{user.email}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="bg-red-50/80 dark:bg-red-900/20 backdrop-blur-sm border border-red-200/50 dark:border-red-700/30 rounded-xl p-4">
                  <p className="text-red-600 dark:text-red-400 font-medium text-center">
                    {error}
                  </p>
                </div>
              )}

              {/* Donate Button */}
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
                className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 disabled:from-red-400 disabled:to-red-500 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Redirecting to payment...
                  </>
                ) : (
                  <>
                    <FaHandsHelping className="text-xl" />
                    Donate Now
                  </>
                )}
              </motion.button>
            </form>

            {/* Security Notice */}
            <div className="mt-8 pt-6 border-t border-gray-200/50 dark:border-gray-700/30">
              <div className="flex items-center justify-center gap-2 text-gray-500 dark:text-gray-400 text-sm">
                <FaShieldAlt className="text-green-500" />
                <span>Secure payment powered by Stripe</span>
              </div>
            </div>
          </div>

          {/* Impact Information */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl rounded-2xl border border-white/30 dark:border-gray-700/30 p-6 text-center">
              <div className="w-12 h-12 bg-red-100/80 dark:bg-red-900/40 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-4">
                <FaHeart className="text-xl text-red-600 dark:text-red-400" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                Platform Maintenance
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Keep our life-saving platform running 24/7
              </p>
            </div>

            <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl rounded-2xl border border-white/30 dark:border-gray-700/30 p-6 text-center">
              <div className="w-12 h-12 bg-blue-100/80 dark:bg-blue-900/40 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-4">
                <FaShieldAlt className="text-xl text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                Emergency Response
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Support urgent blood requests and emergency coordination
              </p>
            </div>

            <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl rounded-2xl border border-white/30 dark:border-gray-700/30 p-6 text-center">
              <div className="w-12 h-12 bg-green-100/80 dark:bg-green-900/40 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-4">
                <FaHandsHelping className="text-xl text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                Community Outreach
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Expand our network and educate more donors
              </p>
            </div>
          </div>

          {/* Thank You Message */}
          <div className="mt-12 bg-gradient-to-r from-red-50/80 to-pink-50/80 dark:from-red-900/20 dark:to-pink-900/20 backdrop-blur-sm rounded-2xl border border-red-200/50 dark:border-red-700/30 p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Thank You for Your Generosity
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Every donation, no matter the size, helps us save more lives and build a stronger
              community of blood donors across Bangladesh. Your support makes a real difference.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Donate;
