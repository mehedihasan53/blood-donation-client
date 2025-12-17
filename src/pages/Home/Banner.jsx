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
    <div className="relative min-h-screen flex items-center overflow-hidden bg-transparent py-12 lg:py-0">
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-red-100 rounded-full mix-blend-multiply filter blur-[100px] opacity-30 animate-blob" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-pink-100 rounded-full mix-blend-multiply filter blur-[100px] opacity-30 animate-blob animation-delay-2000" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Main Hero Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left order-1"
          >
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 px-5 py-2 rounded-full text-sm font-bold mb-8"
            >
              <MdBloodtype className="text-xl animate-pulse" />
              <span className="uppercase tracking-wider">
                Be a Life Saver Today
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-gray-900 mb-6 leading-[1.1]"
            >
              Every Drop <span className="text-red-600">Saves</span> <br /> A
              Family's{" "}
              <span className="relative inline-block">
                Smile
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 100 10"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0 5 Q 50 10 100 5"
                    stroke="#ef4444"
                    strokeWidth="4"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-gray-600 mb-10 max-w-xl mx-auto lg:mx-0"
            >
              Join Bangladesh's most trusted blood donation network. Your
              contribution helps us analyze and meet the urgent blood demands in
              real-time.
            </motion.p>

            <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  to="/register"
                  className="group flex items-center justify-center gap-3 bg-red-600 text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-2xl hover:bg-red-700 transition-all duration-300 shadow-red-200"
                >
                  <FaHeartbeat /> Join as a Donor
                  <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  to="/search"
                  className="flex items-center justify-center gap-3 bg-white text-gray-800 border-2 border-gray-200 px-10 py-5 rounded-2xl font-bold text-lg hover:border-red-400 hover:text-red-600 transition-all duration-300"
                >
                  <FaSearch /> Search Donors
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* Banner Image  */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative flex justify-center items-center order-2 mt-12 lg:mt-0"
          >
            <div className="absolute w-[300px] h-[300px] lg:w-[550px] lg:h-[550px] bg-gradient-to-tr from-red-100/60 to-red-50/40 rounded-full animate-morph opacity-60" />

            <motion.div
              animate={{
                y: window.innerWidth > 1024 ? [0, -20, 0] : [0, 0, 0],
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-20 w-[85%] lg:w-[110%] max-w-[500px]"
            >
              <img
                src={bannerImg}
                alt="Blood Donation Banner"
                className="w-full h-auto drop-shadow-[0_20px_40px_rgba(220,38,38,0.15)] lg:drop-shadow-[0_40px_60px_rgba(220,38,38,0.15)] object-contain rounded-2xl"
              />
            </motion.div>

            {/* Verified Card */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1, type: "spring" }}
              className="hidden lg:flex absolute bottom-5 -right-8 z-30 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white items-center gap-3"
            >
              <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center text-green-600">
                <FaUserCheck />
              </div>
              <div>
                <p className="text-[10px] text-gray-400 font-bold uppercase">
                  Verified Network
                </p>
                <p className="text-sm font-black text-gray-800">
                  100% Secure Process
                </p>
              </div>
            </motion.div>

            {/* Blood Groups Floating Text */}
            <div className="hidden lg:block absolute inset-0 z-10 pointer-events-none">
              {bloodGroups.map((bg, i) => (
                <motion.span
                  key={i}
                  animate={{ y: [0, -40, 0], opacity: [0.2, 0.5, 0.2] }}
                  transition={{ duration: 4 + i, repeat: Infinity, delay: i }}
                  className="absolute font-black text-red-300 text-4xl"
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
