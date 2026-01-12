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
    <div className="min-h-screen bg-bg-primary dark:bg-bg-primary transition-colors duration-300">
      <DynamicTitle title="Donate - Support Our Mission" />

      {/* Enhanced Background Elements for dark mode */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-40 h-40 bg-primary/8 dark:bg-primary/12 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-accent/5 dark:bg-accent/10 rounded-full blur-3xl animate-pulse animation-delay-2000" />
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-green-500/5 dark:bg-green-400/8 rounded-full blur-2xl animate-pulse animation-delay-4000" />
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
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-primary/15 to-red-500/15 dark:from-primary/25 dark:to-red-400/25 backdrop-blur-xl border-0 text-primary dark:text-red-400 px-6 py-3 rounded-2xl text-sm font-bold mb-8 shadow-modern-lg dark:shadow-modern-xl">
              <FaHeart className="text-base animate-pulse" />
              <span className="uppercase tracking-wider">Support Our Cause</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-text-primary leading-tight mb-8">
              Make a{" "}
              <span className="bg-gradient-to-r from-primary via-red-600 to-red-700 dark:from-red-400 dark:via-red-500 dark:to-primary bg-clip-text text-transparent">
                Difference
              </span>
            </h1>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed font-medium">
              Your generous donation helps us maintain our platform, support emergency responses,
              and save more lives across Bangladesh.
            </p>
          </div>

          {/* Main Donation Form */}
          <div className="bg-bg-card/98 dark:bg-bg-card/95 backdrop-blur-xl rounded-3xl border-0 shadow-modern-xl dark:shadow-modern-2xl p-10 lg:p-12">
            <form onSubmit={handleCheckOut} className="space-y-10">
              {/* Quick Amount Selection */}
              <div>
                <label className="block text-xl font-bold text-text-primary mb-6 flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-primary/20 to-red-500/20 dark:from-primary/30 dark:to-red-400/30 rounded-xl flex items-center justify-center">
                    <FaDollarSign className="text-primary text-sm" />
                  </div>
                  Choose Amount
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                  {quickAmounts.map((amount) => (
                    <button
                      key={amount}
                      type="button"
                      onClick={() => handleQuickAmount(amount)}
                      className="bg-bg-tertiary/90 dark:bg-bg-tertiary/70 backdrop-blur-xl border-0 text-text-primary px-6 py-4 rounded-2xl font-bold text-lg hover:bg-gradient-to-r hover:from-primary/20 hover:to-red-500/20 dark:hover:from-primary/30 dark:hover:to-red-400/30 hover:text-primary hover:scale-105 transition-all duration-300 shadow-modern-sm hover:shadow-modern-lg"
                    >
                      ${amount}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Amount Input */}
              <div>
                <label className="block text-lg font-bold text-text-primary mb-4 flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-accent/20 to-blue-500/20 dark:from-accent/30 dark:to-blue-400/30 rounded-xl flex items-center justify-center">
                    <FaDollarSign className="text-accent text-sm" />
                  </div>
                  Custom Donation Amount (USD)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    name="donateAmount"
                    placeholder="Enter custom amount"
                    min="1"
                    step="0.01"
                    className="w-full bg-bg-tertiary/90 dark:bg-bg-tertiary/70 backdrop-blur-xl border-0 text-text-primary px-6 py-5 pl-14 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/30 dark:focus:ring-primary/40 transition-all duration-300 placeholder-text-muted text-lg font-medium shadow-modern-sm focus:shadow-modern-lg"
                  />
                  <div className="absolute left-5 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-gradient-to-r from-primary/20 to-red-500/20 dark:from-primary/30 dark:to-red-400/30 rounded-lg flex items-center justify-center">
                    <FaDollarSign className="text-primary text-sm" />
                  </div>
                </div>
              </div>

              {/* User Information Display */}
              {user && (
                <div className="bg-gradient-to-r from-bg-tertiary/90 to-bg-tertiary/80 dark:from-bg-tertiary/70 dark:to-bg-tertiary/60 backdrop-blur-xl rounded-2xl border-0 p-8 shadow-modern-sm">
                  <h3 className="text-xl font-bold text-text-primary mb-6 flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-500/20 to-emerald-500/20 dark:from-green-400/30 dark:to-emerald-400/30 rounded-xl flex items-center justify-center">
                      <FaUser className="text-green-600 dark:text-green-400 text-lg" />
                    </div>
                    Donor Information
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 text-text-secondary bg-bg-card/50 dark:bg-bg-card/30 rounded-xl p-4">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 dark:from-blue-400/30 dark:to-indigo-400/30 rounded-lg flex items-center justify-center">
                        <FaUser className="text-blue-600 dark:text-blue-400 text-sm" />
                      </div>
                      <span className="font-bold text-text-primary">Name:</span>
                      <span className="font-medium">{user.displayName}</span>
                    </div>
                    <div className="flex items-center gap-4 text-text-secondary bg-bg-card/50 dark:bg-bg-card/30 rounded-xl p-4">
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-500/20 to-pink-500/20 dark:from-purple-400/30 dark:to-pink-400/30 rounded-lg flex items-center justify-center">
                        <FaEnvelope className="text-purple-600 dark:text-purple-400 text-sm" />
                      </div>
                      <span className="font-bold text-text-primary">Email:</span>
                      <span className="font-medium">{user.email}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="bg-gradient-to-r from-red-50/90 to-rose-50/90 dark:from-red-900/30 dark:to-rose-900/30 backdrop-blur-xl border-0 rounded-2xl p-6 shadow-modern-sm">
                  <p className="text-red-600 dark:text-red-400 font-bold text-center text-lg">
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
                className="w-full bg-gradient-to-r from-primary via-red-600 to-red-700 hover:from-red-700 hover:via-primary hover:to-red-800 disabled:from-primary/60 disabled:to-red-600/60 text-white px-10 py-6 rounded-2xl font-black text-xl shadow-modern-xl hover:shadow-modern-2xl transition-all duration-300 disabled:cursor-not-allowed flex items-center justify-center gap-4 border-0"
              >
                {loading ? (
                  <>
                    <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                    <span className="font-bold">Redirecting to payment...</span>
                  </>
                ) : (
                  <>
                    <FaHandsHelping className="text-2xl" />
                    <span>Donate Now</span>
                  </>
                )}
              </motion.button>
            </form>

            {/* Security Notice */}
            <div className="mt-10 pt-8 border-t border-border-primary/20 dark:border-border-primary/30">
              <div className="flex items-center justify-center gap-3 text-text-muted">
                <div className="w-8 h-8 bg-gradient-to-r from-green-500/20 to-emerald-500/20 dark:from-green-400/30 dark:to-emerald-400/30 rounded-xl flex items-center justify-center">
                  <FaShieldAlt className="text-green-600 dark:text-green-400 text-sm" />
                </div>
                <span className="font-bold text-lg">Secure payment powered by Stripe</span>
              </div>
            </div>
          </div>

          {/* Impact Information */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-bg-card/90 to-bg-card/80 dark:from-bg-card/80 dark:to-bg-card/70 backdrop-blur-xl rounded-3xl border-0 p-8 text-center shadow-modern-lg hover:shadow-modern-xl transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-r from-primary/20 to-red-500/20 dark:from-primary/30 dark:to-red-400/30 backdrop-blur-xl rounded-2xl flex items-center justify-center mx-auto mb-6">
                <FaHeart className="text-2xl text-primary" />
              </div>
              <h3 className="text-xl font-black text-text-primary mb-4">
                Platform Maintenance
              </h3>
              <p className="text-base text-text-secondary font-medium leading-relaxed">
                Keep our life-saving platform running 24/7
              </p>
            </div>

            <div className="bg-gradient-to-br from-bg-card/90 to-bg-card/80 dark:from-bg-card/80 dark:to-bg-card/70 backdrop-blur-xl rounded-3xl border-0 p-8 text-center shadow-modern-lg hover:shadow-modern-xl transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 dark:from-blue-400/30 dark:to-indigo-400/30 backdrop-blur-xl rounded-2xl flex items-center justify-center mx-auto mb-6">
                <FaShieldAlt className="text-2xl text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-black text-text-primary mb-4">
                Emergency Response
              </h3>
              <p className="text-base text-text-secondary font-medium leading-relaxed">
                Support urgent blood requests and emergency coordination
              </p>
            </div>

            <div className="bg-gradient-to-br from-bg-card/90 to-bg-card/80 dark:from-bg-card/80 dark:to-bg-card/70 backdrop-blur-xl rounded-3xl border-0 p-8 text-center shadow-modern-lg hover:shadow-modern-xl transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500/20 to-emerald-500/20 dark:from-green-400/30 dark:to-emerald-400/30 backdrop-blur-xl rounded-2xl flex items-center justify-center mx-auto mb-6">
                <FaHandsHelping className="text-2xl text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-black text-text-primary mb-4">
                Community Outreach
              </h3>
              <p className="text-base text-text-secondary font-medium leading-relaxed">
                Expand our network and educate more donors
              </p>
            </div>
          </div>

          {/* Thank You Message */}
          <div className="mt-16 bg-gradient-to-r from-primary/15 via-red-500/10 to-primary/15 dark:from-primary/25 dark:via-red-400/20 dark:to-primary/25 backdrop-blur-xl rounded-3xl border-0 p-10 text-center shadow-modern-xl">
            <div className="w-20 h-20 bg-gradient-to-r from-primary/30 to-red-500/30 dark:from-primary/40 dark:to-red-400/40 rounded-2xl flex items-center justify-center mx-auto mb-8">
              <FaHeart className="text-3xl text-primary animate-pulse" />
            </div>
            <h3 className="text-3xl font-black text-text-primary mb-6">
              Thank You for Your Generosity
            </h3>
            <p className="text-xl text-text-secondary leading-relaxed font-medium max-w-3xl mx-auto">
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
