import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaHeartbeat,
  FaSearch,
  FaArrowRight,
  FaUserCheck,
} from "react-icons/fa";
import { MdBloodtype } from "react-icons/md";
import bannerImg from "../../assets/banner.png";

const Banner = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const bloodGroups = [
    { label: "A+", top: "5%", left: "-9%" },
    { label: "B+", top: "30%", left: "-9%" },
    { label: "O-", top: "55%", left: "-9%" },
    { label: "AB+", top: "80%", left: "-9%" },
  ];

  return (
    <div className="relative flex items-center overflow-hidden bg-transparent pb-7 pt-25 lg:py-32">
      {/* Background Blobs - Reduced size on mobile */}
      <div className="absolute top-[-5%] left-[-10%] w-[200px] h-[200px] lg:w-[500px] lg:h-[500px] bg-red-100 dark:bg-red-900/20 rounded-full mix-blend-multiply filter blur-[60px] lg:blur-[100px] opacity-20 lg:opacity-30 animate-blob" />
      <div className="absolute bottom-[-5%] right-[-10%] w-[200px] h-[200px] lg:w-[500px] lg:h-[500px] bg-pink-100 dark:bg-pink-900/20 rounded-full mix-blend-multiply filter blur-[60px] lg:blur-[100px] opacity-20 lg:opacity-30 animate-blob animation-delay-2000" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left lg:order-1 max-w-4xl mx-auto lg:mx-0"
          >
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 bg-red-50/80 dark:bg-red-900/40 backdrop-blur-sm border border-red-200/50 dark:border-red-700/50 text-red-600 dark:text-red-400 px-4 py-2 rounded-full text-sm font-bold mb-6"
            >
              <MdBloodtype className="text-lg animate-pulse" />
              <span className="uppercase tracking-wider">
                Be a Life Saver Today
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-gray-900 dark:text-white mb-4 lg:mb-6 leading-tight"
            >
              Every Drop <span className="text-red-600 dark:text-red-400">Saves</span> <br className="hidden sm:block" /> A
              Family's{" "}
              <span className="relative inline-block">
                Smile
                <svg
                  className="absolute -bottom-1 lg:-bottom-2 left-0 w-full"
                  viewBox="0 0 100 10"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0 5 Q 50 10 100 5"
                    stroke="#ef4444"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-300 mb-6 lg:mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              Join Bangladesh's most trusted blood donation network. Your
              contribution helps us save lives in real-time.
            </motion.p>

            {/* Buttons - Compact mobile layout */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to="/register"
                  className="group flex items-center justify-center gap-3 bg-red-600/95 dark:bg-red-600/90 backdrop-blur-sm text-white border border-red-500/30 px-6 py-3 sm:px-8 sm:py-4 lg:px-10 lg:py-5 rounded-xl font-bold text-sm sm:text-base lg:text-lg shadow-lg hover:bg-red-700/95 dark:hover:bg-red-700/90 transition-all duration-300"
                >
                  <FaHeartbeat /> Join as a Donor
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to="/search"
                  className="flex items-center justify-center gap-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-gray-700 dark:text-gray-200 border border-white/50 dark:border-gray-700/50 px-6 py-3 sm:px-8 sm:py-4 lg:px-10 lg:py-5 rounded-xl font-bold text-sm sm:text-base lg:text-lg hover:bg-white/95 dark:hover:bg-gray-800/95 transition-all duration-300"
                >
                  <FaSearch className="text-red-500" /> Search Donors
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* Banner Image Area - Desktop Only */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative hidden lg:flex justify-center items-center lg:order-2 lg:min-h-[400px]"
          >
            <div className="absolute w-[450px] h-[450px] bg-gradient-to-tr from-red-100/40 to-red-50/20 dark:from-red-900/20 dark:to-red-800/10 rounded-full animate-morph opacity-60" />

            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-20 w-[90%] max-w-[400px]"
            >
              <img
                src={bannerImg}
                alt="Blood Donation Banner"
                className="w-full h-auto drop-shadow-[0_20px_40px_rgba(220,38,38,0.15)] dark:drop-shadow-[0_15px_35px_rgba(220,38,38,0.25)] object-contain rounded-xl"
              />
            </motion.div>

            {/* Verified Card - Smaller */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.2, type: "spring", stiffness: 100 }}
              className="absolute bottom-3 -right-6 z-30 bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl p-3 rounded-xl shadow-lg border border-white/30 dark:border-gray-700/30 flex items-center gap-2"
            >
              <div className="w-8 h-8 bg-green-50 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600 dark:text-green-400">
                <FaUserCheck className="text-sm" />
              </div>
              <div>
                <p className="text-[9px] text-gray-400 dark:text-gray-500 font-bold uppercase">Verified Network</p>
                <p className="text-xs font-black text-gray-800 dark:text-gray-200">100% Secure</p>
              </div>
            </motion.div>

            {/* Floating Blood Groups - Smaller */}
            <div className="absolute inset-0 z-10 pointer-events-none">
              {bloodGroups.map((bg, i) => (
                <motion.span
                  key={i}
                  animate={{ y: [0, -30, 0], opacity: [0.15, 0.4, 0.15] }}
                  transition={{ duration: 4 + i, repeat: Infinity, delay: i }}
                  className="absolute font-black text-red-300/60 dark:text-red-600/40 text-2xl lg:text-3xl"
                  style={{ top: bg.top, left: bg.left }}
                >
                  {bg.label}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Banner;