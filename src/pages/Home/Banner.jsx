import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaHeartbeat, FaSearch, FaArrowRight, FaUserCheck } from "react-icons/fa";
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
    { label: "A+", top: "10%", left: "-5%" },
    { label: "B+", top: "35%", left: "-12%" },
    { label: "O-", top: "60%", left: "-8%" },
    { label: "AB+", top: "85%", left: "-2%" },
  ];

  return (
    <section className="relative flex items-center overflow-hidden bg-bg-secondary/90 dark:bg-bg-secondary/95 backdrop-blur-sm py-8 pt-24 sm:py-10 sm:pt-28 lg:py-12 lg:pt-32 xl:py-14 xl:pt-36 transition-colors duration-500">

      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 bg-red-500/10 dark:bg-red-600/15 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-blue-500/5 dark:bg-blue-600/10 rounded-full blur-[100px] animate-pulse animation-delay-2000" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Hero Content Section */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left lg:order-1 max-w-4xl mx-auto lg:mx-0"
          >
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-6 py-3 mb-8 text-sm font-bold tracking-widest uppercase bg-red-50 dark:bg-red-900/20 backdrop-blur-sm rounded-full border border-red-200 dark:border-red-800 shadow-lg text-red-600 dark:text-red-500"
            >
              <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse shadow-sm"></div>
              <MdBloodtype className="text-lg" />
              <span>Be a Life Saver Today</span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-text-primary mb-6 leading-[1.1]"
            >
              Every Drop <span className="text-red-600 dark:text-red-500">Saves</span> <br className="hidden sm:block" /> A
              Family's{" "}
              <span className="relative inline-block">
                Smile
                <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" className="text-red-600 dark:text-red-500" strokeWidth="4" fill="none" strokeLinecap="round" />
                </svg>
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg lg:text-xl text-text-secondary mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium"
            >
              Join Bangladesh's most trusted blood donation network. Your
              contribution helps us save lives in real-time with modern technology.
            </motion.p>

            <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to="/register"
                  className="group flex items-center justify-center gap-3 bg-red-600 text-white border border-red-700 px-8 py-4 lg:px-10 lg:py-5 rounded-2xl font-bold text-lg shadow-[0_10px_25px_-5px_rgba(220,38,38,0.4)] hover:bg-red-700 transition-all duration-300"
                >
                  <FaHeartbeat /> Join as a Donor
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to="/search"
                  className="flex items-center justify-center gap-3 bg-bg-card/90 dark:bg-bg-card/95 backdrop-blur-md text-text-primary  dark:border-border-primary/40 px-8 py-4 lg:px-10 lg:py-5 rounded-2xl font-bold text-lg hover:bg-gray-900 dark:hover:bg-bg-tertiary transition-all duration-300 shadow-xl"
                >
                  <FaSearch className="text-red-600 dark:text-red-500" /> Search Donors
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* Visual Elements and Floating Indicators */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative hidden lg:flex justify-center items-center lg:order-2"
          >
            <div className="absolute w-[500px] h-[500px] bg-red-100/30 dark:bg-red-900/10 rounded-full animate-morph opacity-60 blur-3xl" />

            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-20 w-[95%] max-w-[450px]"
            >
              <img src={bannerImg} alt="Blood Donation" className="w-full h-auto drop-shadow-2xl dark:drop-shadow-[0_20px_50px_rgba(220,38,38,0.2)]" />
            </motion.div>

            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="absolute bottom-10 -right-4 z-30 bg-bg-card/98 dark:bg-bg-card/95 backdrop-blur-xl p-5 rounded-3xl shadow-2xl dark:border-border-primary/40 flex items-center gap-4 hover:scale-105 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-green-50 dark:bg-green-500/20 rounded-2xl flex items-center justify-center text-green-600 dark:text-green-400 shadow-sm border border-green-100 dark:border-green-500/30">
                <FaUserCheck className="text-xl" />
              </div>
              <div>
                <p className="text-[10px] text-text-muted font-black uppercase tracking-[0.2em]">Verified Network</p>
                <p className="text-lg font-black text-text-primary">100% Secure</p>
              </div>
            </motion.div>

            <div className="absolute inset-0 z-10 pointer-events-none">
              {bloodGroups.map((bg, i) => (
                <motion.span
                  key={i}
                  animate={{ y: [0, -40, 0], opacity: [0.1, 0.4, 0.1], scale: [1, 1.1, 1] }}
                  transition={{ duration: 5 + i, repeat: Infinity, delay: i }}
                  className="absolute font-black text-red-600/30 dark:text-red-500/20 text-3xl lg:text-4xl"
                  style={{ top: bg.top, left: bg.left }}
                >
                  {bg.label}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Banner;