import React from "react";
import { motion } from "framer-motion";
import { FaClock, FaUsers, FaShieldAlt } from "react-icons/fa";

const Featured = () => {
  const features = [
    {
      icon: <FaClock />,
      title: "24/7 Fast Search",
      description:
        "Find blood donors near your location in minutes during emergencies.",
      colorClass: "text-red-600 dark:text-red-400",
      bgClass: "bg-red-50/80 dark:bg-red-900/30",
      cardBg: "bg-gradient-to-br from-red-50/90 to-white/90 dark:from-red-900/20 dark:to-gray-800/90",
      borderColor: "border-red-200/40 dark:border-red-700/40",
      hoverBorder: "hover:border-red-300/60 dark:hover:border-red-600/60",
      lineColor: "bg-red-500 dark:bg-red-400",
    },
    {
      icon: <FaUsers />,
      title: "Largest Community",
      description: "Join thousands of verified blood donors across Bangladesh.",
      colorClass: "text-blue-600 dark:text-blue-400",
      bgClass: "bg-blue-50/80 dark:bg-blue-900/30",
      cardBg: "bg-gradient-to-br from-blue-50/90 to-white/90 dark:from-blue-900/20 dark:to-gray-800/90",
      borderColor: "border-blue-200/40 dark:border-blue-700/40",
      hoverBorder: "hover:border-blue-300/60 dark:hover:border-blue-600/60",
      lineColor: "bg-blue-500 dark:bg-blue-400",
    },
    {
      icon: <FaShieldAlt />,
      title: "Safe & Secure",
      description:
        "Your data is protected. We ensure a secure process for all members.",
      colorClass: "text-green-600 dark:text-green-400",
      bgClass: "bg-green-50/80 dark:bg-green-900/30",
      cardBg: "bg-gradient-to-br from-green-50/90 to-white/90 dark:from-green-900/20 dark:to-gray-800/90",
      borderColor: "border-green-200/40 dark:border-green-700/40",
      hoverBorder: "hover:border-green-300/60 dark:hover:border-green-600/60",
      lineColor: "bg-green-500 dark:bg-green-400",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="py-10 bg-transparent">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-6 py-3 mb-8 text-sm font-bold tracking-widest text-red-600 dark:text-red-400 uppercase bg-red-100/60 dark:bg-red-900/30 backdrop-blur-sm rounded-full border border-red-200/40 dark:border-red-700/40"
          >
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            Key Features
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white leading-tight mb-6 transition-colors duration-300">
            Why People Choose <br />
            <span className="bg-gradient-to-r from-red-600 via-red-500 to-red-600 dark:from-red-400 dark:via-red-300 dark:to-red-400 bg-clip-text text-transparent">
              Our Platform
            </span>
          </h2>

          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px bg-gradient-to-r from-transparent via-red-300 dark:via-red-600 to-transparent w-20"></div>
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="h-px bg-gradient-to-r from-transparent via-red-300 dark:via-red-600 to-transparent w-20"></div>
          </div>

          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg transition-colors duration-300 leading-relaxed">
            We've simplified blood donation with modern technology to save lives
            faster than ever before. Join our trusted community today.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{
                scale: 1.03,
                y: -5,
                transition: { duration: 0.3 }
              }}
              className={`group relative p-8 lg:p-10 ${feature.cardBg} backdrop-blur-xl rounded-3xl transition-all duration-300 shadow-lg hover:shadow-xl border ${feature.borderColor} ${feature.hoverBorder} overflow-hidden`}
            >
              {/* Subtle background pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-current transform translate-x-16 -translate-y-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-current transform -translate-x-12 translate-y-12"></div>
              </div>

              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
                className={`relative z-10 w-18 h-18 rounded-2xl flex items-center justify-center text-3xl ${feature.bgClass} ${feature.colorClass} backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-sm`}
              >
                {feature.icon}
              </motion.div>

              <h3 className="relative z-10 mt-8 text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
                {feature.title}
              </h3>

              <p className="relative z-10 mt-4 text-gray-600 dark:text-gray-300 leading-relaxed text-lg transition-colors duration-300">
                {feature.description}
              </p>

              {/* Enhanced progress line */}
              <div className="relative z-10 mt-8 w-16 h-2 bg-gray-200/60 dark:bg-gray-600/40 rounded-full overflow-hidden backdrop-blur-sm">
                <motion.div
                  className={`h-full rounded-full ${feature.lineColor}`}
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.5 + index * 0.2 }}
                />
              </div>

              {/* Hover glow effect */}
              <div className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 ${feature.lineColor} blur-xl`}></div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Featured;
