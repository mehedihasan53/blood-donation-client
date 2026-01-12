import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
    FaHeartbeat,
    FaUsers,
    FaSearch,
    FaShieldAlt,
    FaClock,
    FaPhone,
    FaHospital,
    FaUserMd,
    FaAmbulance,
    FaDatabase,
    FaBell,
    FaHandsHelping,
    FaArrowRight,
    FaCheckCircle,
    FaGlobe,
    FaMobile,
    FaChartLine,
} from "react-icons/fa";
import DynamicTitle from "../components/shared/DynamicTitle";

const Services = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                duration: 0.6,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" },
        },
    };

    const mainServices = [
        {
            icon: FaSearch,
            title: "Smart Donor Search",
            description: "Advanced search system to find compatible blood donors in your area instantly. Filter by blood type, location, and availability.",
            features: ["Real-time availability", "Location-based matching", "Blood type compatibility", "Instant notifications"],
            color: "text-blue-600 dark:text-blue-400",
            bgColor: "bg-blue-100/80 dark:bg-blue-900/40",
            borderColor: "border-blue-200/50 dark:border-blue-700/30",
            link: "/search"
        },
        {
            icon: FaUsers,
            title: "Donor Registration",
            description: "Simple and secure registration process for blood donors. Join our community of life-savers with verified profiles.",
            features: ["Secure verification", "Profile management", "Donation history", "Community access"],
            color: "text-green-600 dark:text-green-400",
            bgColor: "bg-green-100/80 dark:bg-green-900/40",
            borderColor: "border-green-200/50 dark:border-green-700/30",
            link: "/register"
        },
        {
            icon: FaClock,
            title: "Emergency Response",
            description: "24/7 emergency blood request system with rapid response capabilities. Critical situations get priority handling.",
            features: ["24/7 availability", "Priority handling", "Rapid response", "Emergency hotline"],
            color: "text-red-600 dark:text-red-400",
            bgColor: "bg-red-100/80 dark:bg-red-900/40",
            borderColor: "border-red-200/50 dark:border-red-700/30",
            link: "/pending-requests"
        },
        {
            icon: FaHospital,
            title: "Hospital Network",
            description: "Integrated network with hospitals and medical centers across Bangladesh for seamless blood donation coordination.",
            features: ["50+ partner hospitals", "Direct coordination", "Medical verification", "Safe procedures"],
            color: "text-purple-600 dark:text-purple-400",
            bgColor: "bg-purple-100/80 dark:bg-purple-900/40",
            borderColor: "border-purple-200/50 dark:border-purple-700/30",
            link: "/about-our-mission"
        }
    ];

    const additionalServices = [
        {
            icon: FaBell,
            title: "Smart Notifications",
            description: "Get instant alerts for blood requests in your area and donation reminders.",
            color: "text-orange-600 dark:text-orange-400",
            bgColor: "bg-orange-100/80 dark:bg-orange-900/40"
        },
        {
            icon: FaShieldAlt,
            title: "Safety & Verification",
            description: "Comprehensive safety protocols and donor verification for secure donations.",
            color: "text-teal-600 dark:text-teal-400",
            bgColor: "bg-teal-100/80 dark:bg-teal-900/40"
        },
        {
            icon: FaDatabase,
            title: "Donation Tracking",
            description: "Complete donation history and health tracking for donors and recipients.",
            color: "text-indigo-600 dark:text-indigo-400",
            bgColor: "bg-indigo-100/80 dark:bg-indigo-900/40"
        },
        {
            icon: FaMobile,
            title: "Mobile Optimized",
            description: "Fully responsive platform accessible from any device, anywhere, anytime.",
            color: "text-pink-600 dark:text-pink-400",
            bgColor: "bg-pink-100/80 dark:bg-pink-900/40"
        },
        {
            icon: FaUserMd,
            title: "Medical Support",
            description: "Professional medical guidance and support throughout the donation process.",
            color: "text-cyan-600 dark:text-cyan-400",
            bgColor: "bg-cyan-100/80 dark:bg-cyan-900/40"
        },
        {
            icon: FaGlobe,
            title: "Nationwide Coverage",
            description: "Service coverage across all 64 districts of Bangladesh with local coordinators.",
            color: "text-emerald-600 dark:text-emerald-400",
            bgColor: "bg-emerald-100/80 dark:bg-emerald-900/40"
        }
    ];

    const processSteps = [
        {
            step: "01",
            title: "Register",
            description: "Create your donor profile with medical verification",
            icon: FaUsers
        },
        {
            step: "02",
            title: "Get Matched",
            description: "Receive notifications for compatible blood requests",
            icon: FaBell
        },
        {
            step: "03",
            title: "Donate",
            description: "Visit the hospital and complete the donation safely",
            icon: FaHeartbeat
        },
        {
            step: "04",
            title: "Save Lives",
            description: "Your donation can save up to 3 lives",
            icon: FaHandsHelping
        }
    ];

    return (
        <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300">
            <DynamicTitle title="Our Services - BloodConnect" />

            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-20 w-40 h-40 bg-red-500/10 dark:bg-red-500/5 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-20 right-20 w-48 h-48 bg-red-600/10 dark:bg-red-600/5 rounded-full blur-3xl animate-pulse delay-2000" />
            </div>

            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-10 lg:py-24">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="max-w-6xl mx-auto"
                >
                    {/* Header Section */}
                    <motion.div variants={itemVariants} className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 bg-red-50 dark:bg-red-900/20 backdrop-blur-sm border border-red-100 dark:border-red-800/30 text-red-600 dark:text-red-400 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                            <FaHeartbeat className="text-sm animate-pulse" />
                            <span className="uppercase tracking-wide">Our Services</span>
                        </div>
                        <h1 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight mb-6">
                            Comprehensive{" "}
                            <span className="text-red-600 dark:text-red-500">
                                Blood Donation
                            </span>{" "}
                            Services
                        </h1>
                        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed mb-8">
                            From emergency blood requests to donor registration, we provide a complete ecosystem of services
                            designed to make blood donation safe, efficient, and accessible for everyone in Bangladesh.
                        </p>
                    </motion.div>

                    {/* Main Services Grid */}
                    <motion.div variants={itemVariants} className="mb-16">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {mainServices.map((service, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1, duration: 0.5 }}
                                    className={`bg-white dark:bg-slate-900/50 backdrop-blur-xl p-8 rounded-2xl border ${service.borderColor} hover:border-red-500/30 dark:hover:border-red-500/40 transition-all duration-300 hover:scale-[1.02] shadow-sm hover:shadow-xl dark:shadow-slate-900/50 group`}
                                >
                                    <div className="flex flex-col sm:flex-row items-start gap-6">
                                        <div className={`w-16 h-16 ${service.bgColor} backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                                            <service.icon className={`text-2xl ${service.color}`} />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                                                {service.title}
                                            </h3>
                                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                                                {service.description}
                                            </p>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
                                                {service.features.map((feature, idx) => (
                                                    <div key={idx} className="flex items-center gap-2 text-sm">
                                                        <FaCheckCircle className={`text-xs ${service.color}`} />
                                                        <span className="text-gray-600 dark:text-gray-400">{feature}</span>
                                                    </div>
                                                ))}
                                            </div>
                                            <Link
                                                to={service.link}
                                                className={`inline-flex items-center gap-2 ${service.color} hover:gap-3 font-semibold transition-all duration-300 group-hover:underline underline-offset-4`}
                                            >
                                                Learn More
                                                <FaArrowRight className="text-sm" />
                                            </Link>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Additional Services */}
                    <motion.div variants={itemVariants} className="mb-16">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                                Additional Features
                            </h2>
                            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
                                Comprehensive support services designed to enhance your blood donation experience
                                and ensure maximum safety and efficiency.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {additionalServices.map((service, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1, duration: 0.5 }}
                                    className="bg-white dark:bg-slate-900/50 backdrop-blur-xl p-6 rounded-2xl border border-gray-100 dark:border-slate-800 hover:border-red-500/20 transition-all duration-300 hover:scale-[1.02] shadow-sm hover:shadow-lg group"
                                >
                                    <div className={`w-12 h-12 ${service.bgColor} backdrop-blur-sm rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                        <service.icon className={`text-xl ${service.color}`} />
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                                        {service.title}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">
                                        {service.description}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* How It Works */}
                    <motion.div variants={itemVariants} className="mb-16">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                                How It Works
                            </h2>
                            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
                                Simple steps to become a life-saver. Our streamlined process makes blood donation
                                easy, safe, and rewarding.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {processSteps.map((step, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.2, duration: 0.5 }}
                                    className="relative bg-white dark:bg-slate-900/50 backdrop-blur-xl p-6 rounded-2xl border border-gray-100 dark:border-slate-800 hover:border-red-500/20 transition-all duration-300 hover:scale-[1.02] shadow-sm text-center group"
                                >
                                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-red-600 dark:bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                                        {step.step}
                                    </div>
                                    <div className="w-16 h-16 bg-red-50 dark:bg-red-900/30 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 mt-4 group-hover:scale-110 transition-transform duration-300">
                                        <step.icon className="text-2xl text-red-600 dark:text-red-400" />
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                                        {step.title}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">
                                        {step.description}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Call to Action */}
                    <motion.div
                        variants={itemVariants}
                        className="bg-red-800 dark:bg-red-700/90 backdrop-blur-sm p-8 lg:p-16 rounded-3xl text-center shadow-2xl shadow-red-500/20 relative overflow-hidden group"
                    >
                        {/* CTA Decoration */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl group-hover:bg-white/10 transition-colors" />

                        <div className="max-w-3xl mx-auto relative z-10">
                            <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-8 border border-white/30">
                                <FaHeartbeat className="text-4xl text-white animate-pulse" />
                            </div>
                            <h2 className="text-3xl lg:text-5xl font-black text-white mb-6">
                                Ready to Save Lives?
                            </h2>
                            <p className="text-lg text-red-50 mb-10 leading-relaxed font-medium">
                                Join thousands of heroes who are making a difference every day. Your blood donation
                                can save up to 3 lives and bring hope to families in need.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Link
                                        to="/register"
                                        className="flex items-center justify-center gap-3 bg-white text-red-600 px-10 py-5 rounded-2xl font-bold text-xl hover:bg-gray-50 transition-all duration-300 shadow-xl shadow-black/10 min-w-[220px]"
                                    >
                                        <FaUsers className="text-2xl" />
                                        Join as Donor
                                    </Link>
                                </motion.div>
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Link
                                        to="/statistics"
                                        className="flex items-center justify-center gap-3 bg-red-500/30 backdrop-blur-md text-white border border-white/40 px-10 py-5 rounded-2xl font-bold text-xl hover:bg-red-500/50 transition-all duration-300 min-w-[220px]"
                                    >
                                        <FaChartLine className="text-2xl" />
                                        View Stats
                                    </Link>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

export default Services;