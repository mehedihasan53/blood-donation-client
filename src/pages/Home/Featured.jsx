import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaClock, FaUsers, FaShieldAlt, FaArrowRight } from "react-icons/fa";

const Featured = () => {
  const features = [
    {
      icon: <FaClock />,
      title: "24/7 Fast Search",
      description:
        "Find blood donors near your location in minutes during emergencies.",
      colorClass: "text-red-600 dark:text-red-500",
      bgClass: "bg-red-50 dark:bg-red-900/20",
      iconBg: "bg-red-100 dark:bg-red-900/30",
      lineColor: "bg-red-600",
      cardClass: "card-primary card-hover-primary",
      glowClass: "bg-red-600",
    },
    {
      icon: <FaUsers />,
      title: "Largest Community",
      description: "Join thousands of verified blood donors across Bangladesh.",
      colorClass: "text-blue-600 dark:text-blue-500",
      bgClass: "bg-accent-blue/15 dark:bg-blue-500/20",
      iconBg: "bg-blue-100 dark:bg-blue-900/30",
      lineColor: "bg-blue-600",
      cardClass: "card-accent card-hover-accent",
      glowClass: "bg-blue-600",
    },
    {
      icon: <FaShieldAlt />,
      title: "Safe & Secure",
      description:
        "Your data is protected. We ensure a secure process for all members.",
      colorClass: "text-green-600 dark:text-green-500",
      bgClass: "bg-accent-green/15 dark:bg-green-500/20",
      iconBg: "bg-green-100 dark:bg-green-900/30",
      lineColor: "bg-green-600",
      cardClass: "card-success card-hover-success",
      glowClass: "bg-green-600",
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
      scale: 0.95,
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
    <section className="py-10  bg-bg-secondary/90 dark:bg-bg-secondary/95 backdrop-blur-sm relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-40 h-40 bg-red-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-accent/5 dark:bg-blue-500/10 rounded-full blur-3xl animate-pulse animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-green-500/5 dark:bg-green-400/10 rounded-full blur-2xl animate-pulse animation-delay-4000" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
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
            className="inline-flex items-center gap-2 px-6 py-3 mb-8 text-sm font-bold tracking-widest uppercase bg-red-50 dark:bg-red-900/20 backdrop-blur-sm rounded-full border border-red-200 dark:border-red-800 shadow-lg text-red-600 dark:text-red-500"
          >
            <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse shadow-sm"></div>
            Key Features
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-text-primary leading-tight mb-6 transition-colors duration-300">
            Why People Choose <br />
            <span className="text-red-600 dark:text-red-500">
              Our Platform
            </span>
          </h2>

          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px bg-gradient-to-r from-transparent via-red-600/50 to-transparent w-20"></div>
            <div className="w-3 h-3 bg-red-600 rounded-full shadow-lg"></div>
            <div className="h-px bg-gradient-to-r from-transparent via-red-600/50 to-transparent w-20"></div>
          </div>

          <p className="text-text-secondary max-w-2xl mx-auto text-lg transition-colors duration-300 leading-relaxed mb-8">
            We've simplified blood donation with modern technology to save lives
            faster than ever before. Join our trusted community today.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link
              to="/services"
              className="inline-flex items-center gap-3 bg-red-600 text-white border border-red-700 px-6 py-3 rounded-xl font-semibold hover:bg-red-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:gap-4 hover:scale-105"
            >
              Explore All Services
              <FaArrowRight className="text-sm" />
            </Link>
          </motion.div>
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
                transition: { duration: 0.3 },
              }}
              className={`group relative p-8 lg:p-10 bg-bg-card/98 dark:bg-bg-card/95 backdrop-blur-xl rounded-3xl transition-all duration-300 shadow-lg hover:shadow-xl dark:shadow-2xl  dark:border-border-primary/40 hover:border-border-primary/50 dark:hover:border-border-primary/60 overflow-hidden ${feature.cardClass}`}
            >
              <div className="absolute inset-0 opacity-5 dark:opacity-10">
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-current transform translate-x-16 -translate-y-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-current transform -translate-x-12 translate-y-12"></div>
              </div>

              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
                className={`relative z-10 w-18 h-18 rounded-2xl flex items-center justify-center text-3xl ${feature.bgClass} ${feature.colorClass} backdrop-blur-sm dark:border-border-primary/30 shadow-sm dark:shadow-lg`}
              >
                {feature.icon}
              </motion.div>

              <h3 className="relative z-10 mt-8 text-2xl font-bold text-text-primary transition-colors duration-300">
                {feature.title}
              </h3>

              <p className="relative z-10 mt-4 text-text-secondary leading-relaxed text-lg transition-colors duration-300">
                {feature.description}
              </p>

              <div className="relative z-10 mt-8 w-16 h-2 bg-border-primary/40 dark:bg-border-primary/60 rounded-full overflow-hidden backdrop-blur-sm">
                <motion.div
                  className={`h-full rounded-full ${feature.lineColor} shadow-sm dark:shadow-lg`}
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.5 + index * 0.2 }}
                />
              </div>

              <div
                className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-10 dark:group-hover:opacity-15 transition-opacity duration-300 ${feature.glowClass} blur-xl`}
              ></div>

              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-transparent via-transparent to-red-500/5 pointer-events-none"></div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Featured;