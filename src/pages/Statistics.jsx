import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
    FaUsers,
    FaTint,
    FaClock,
    FaCheckCircle,
    FaHeart,
    FaHospital,
    FaGlobe,
    FaChartLine,
    FaArrowUp,
    FaArrowDown,
    FaCalendarAlt,
} from "react-icons/fa";
import DynamicTitle from "../components/shared/DynamicTitle";

const Statistics = () => {
    const [animatedStats, setAnimatedStats] = useState({
        totalUsers: 0,
        totalDonations: 0,
        pendingRequests: 0,
        completedDonations: 0,
        activeHospitals: 0,
        districtsServed: 0,
        emergencyRequests: 0,
        monthlyGrowth: 0,
    });

    const finalStats = {
        totalUsers: 15247,
        totalDonations: 8934,
        pendingRequests: 127,
        completedDonations: 8807,
        activeHospitals: 52,
        districtsServed: 64,
        emergencyRequests: 89,
        monthlyGrowth: 12.5,
    };

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

    // Animate numbers on component mount
    useEffect(() => {
        const duration = 2000; 
        const steps = 60;
        const stepDuration = duration / steps;

        let currentStep = 0;
        const timer = setInterval(() => {
            currentStep++;
            const progress = currentStep / steps;
            const easeOutProgress = 1 - Math.pow(1 - progress, 3);

            setAnimatedStats({
                totalUsers: Math.floor(finalStats.totalUsers * easeOutProgress),
                totalDonations: Math.floor(finalStats.totalDonations * easeOutProgress),
                pendingRequests: Math.floor(finalStats.pendingRequests * easeOutProgress),
                completedDonations: Math.floor(finalStats.completedDonations * easeOutProgress),
                activeHospitals: Math.floor(finalStats.activeHospitals * easeOutProgress),
                districtsServed: Math.floor(finalStats.districtsServed * easeOutProgress),
                emergencyRequests: Math.floor(finalStats.emergencyRequests * easeOutProgress),
                monthlyGrowth: (finalStats.monthlyGrowth * easeOutProgress),
            });

            if (currentStep >= steps) {
                clearInterval(timer);
                setAnimatedStats(finalStats);
            }
        }, stepDuration);

        return () => clearInterval(timer);
    }, []);

    const mainStats = [
        {
            icon: FaUsers,
            title: "Total Users",
            value: animatedStats.totalUsers.toLocaleString(),
            subtitle: "Registered Donors",
            color: "text-blue-600 dark:text-blue-400",
            bgColor: "bg-blue-100/80 dark:bg-blue-900/40",
            borderColor: "border-blue-200/50 dark:border-blue-700/30",
            progress: 85,
            trend: { value: 8.2, isPositive: true },
        },
        {
            icon: FaTint,
            title: "Total Donations",
            value: animatedStats.totalDonations.toLocaleString(),
            subtitle: "Lives Saved",
            color: "text-red-600 dark:text-red-400",
            bgColor: "bg-red-100/80 dark:bg-red-900/40",
            borderColor: "border-red-200/50 dark:border-red-700/30",
            progress: 92,
            trend: { value: 15.3, isPositive: true },
        },
        {
            icon: FaClock,
            title: "Pending Requests",
            value: animatedStats.pendingRequests.toLocaleString(),
            subtitle: "Awaiting Response",
            color: "text-orange-600 dark:text-orange-400",
            bgColor: "bg-orange-100/80 dark:bg-orange-900/40",
            borderColor: "border-orange-200/50 dark:border-orange-700/30",
            progress: 23,
            trend: { value: 2.1, isPositive: false },
        },
        {
            icon: FaCheckCircle,
            title: "Completed Donations",
            value: animatedStats.completedDonations.toLocaleString(),
            subtitle: "Successfully Matched",
            color: "text-green-600 dark:text-green-400",
            bgColor: "bg-green-100/80 dark:bg-green-900/40",
            borderColor: "border-green-200/50 dark:border-green-700/30",
            progress: 98,
            trend: { value: 12.7, isPositive: true },
        },
    ];

    const additionalStats = [
        {
            icon: FaHospital,
            title: "Partner Hospitals",
            value: animatedStats.activeHospitals,
            color: "text-purple-600 dark:text-purple-400",
            bgColor: "bg-purple-100/80 dark:bg-purple-900/40",
        },
        {
            icon: FaGlobe,
            title: "Districts Served",
            value: animatedStats.districtsServed,
            color: "text-teal-600 dark:text-teal-400",
            bgColor: "bg-teal-100/80 dark:bg-teal-900/40",
        },
        {
            icon: FaHeart,
            title: "Emergency Requests",
            value: animatedStats.emergencyRequests,
            color: "text-pink-600 dark:text-pink-400",
            bgColor: "bg-pink-100/80 dark:bg-pink-900/40",
        },
        {
            icon: FaChartLine,
            title: "Monthly Growth",
            value: `${animatedStats.monthlyGrowth.toFixed(1)}%`,
            color: "text-indigo-600 dark:text-indigo-400",
            bgColor: "bg-indigo-100/80 dark:bg-indigo-900/40",
        },
    ];

    const monthlyData = [
        { month: "Jan", donations: 650, requests: 680 },
        { month: "Feb", donations: 720, requests: 750 },
        { month: "Mar", donations: 890, requests: 920 },
        { month: "Apr", donations: 1050, requests: 1080 },
        { month: "May", donations: 1200, requests: 1180 },
        { month: "Jun", donations: 1350, requests: 1320 },
    ];

    const maxValue = Math.max(...monthlyData.map(d => Math.max(d.donations, d.requests)));

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50/30 via-white/20 to-blue-50/30 dark:from-gray-900/50 dark:via-gray-800/30 dark:to-gray-900/50 backdrop-blur-sm">
            <DynamicTitle title="Statistics - BloodConnect" />

            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 left-20 w-40 h-40 bg-red-100/20 dark:bg-red-900/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-20 right-20 w-48 h-48 bg-blue-100/20 dark:bg-blue-900/10 rounded-full blur-3xl animate-pulse animation-delay-2000" />
                <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-green-100/20 dark:bg-green-900/10 rounded-full blur-2xl animate-pulse animation-delay-4000" />
            </div>

            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-25 pb-10 lg:py-24">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="max-w-7xl mx-auto"
                >
                    {/* Header Section */}
                    <motion.div variants={itemVariants} className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 bg-red-50/80 dark:bg-red-900/30 backdrop-blur-sm border border-red-200/50 dark:border-red-700/30 text-red-600 dark:text-red-400 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                            <FaChartLine className="text-sm" />
                            <span className="uppercase tracking-wide">Platform Statistics</span>
                        </div>
                        <h1 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight mb-6">
                            Impact{" "}
                            <span className="text-red-600 dark:text-red-400">
                                Dashboard
                            </span>
                        </h1>
                        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
                            Real-time insights into our blood donation network's performance, showing the lives we've touched
                            and the communities we've served across Bangladesh.
                        </p>
                        <div className="flex items-center justify-center gap-2 text-gray-500 dark:text-gray-400 text-sm">
                            <FaCalendarAlt className="text-xs" />
                            <span>Last updated: {new Date().toLocaleDateString()}</span>
                        </div>
                    </motion.div>

                    {/* Main Statistics Grid */}
                    <motion.div variants={itemVariants} className="mb-16">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {mainStats.map((stat, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1, duration: 0.5 }}
                                    className={`bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl p-6 rounded-2xl border ${stat.borderColor} hover:bg-white/90 dark:hover:bg-gray-900/90 hover:border-white/40 dark:hover:border-gray-700/40 transition-all duration-300 hover:scale-[1.02] shadow-sm hover:shadow-lg group`}
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <div className={`w-12 h-12 ${stat.bgColor} backdrop-blur-sm rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                                            <stat.icon className={`text-xl ${stat.color}`} />
                                        </div>
                                        <div className="flex items-center gap-1 text-xs">
                                            {stat.trend.isPositive ? (
                                                <FaArrowUp className="text-green-500" />
                                            ) : (
                                                <FaArrowDown className="text-red-500" />
                                            )}
                                            <span className={stat.trend.isPositive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}>
                                                {stat.trend.value}%
                                            </span>
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-1">
                                            {stat.value}
                                        </h3>
                                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                                            {stat.title}
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-500">
                                            {stat.subtitle}
                                        </p>
                                    </div>

                                    {/* Progress Bar */}
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs text-gray-500 dark:text-gray-500">Progress</span>
                                            <span className="text-xs font-medium text-gray-600 dark:text-gray-400">{stat.progress}%</span>
                                        </div>
                                        <div className="w-full bg-gray-200/60 dark:bg-gray-600/40 rounded-full h-2 overflow-hidden backdrop-blur-sm">
                                            <motion.div
                                                className={`h-full rounded-full ${stat.color.replace('text-', 'bg-')}`}
                                                initial={{ width: 0 }}
                                                animate={{ width: `${stat.progress}%` }}
                                                transition={{ duration: 1.5, delay: 0.5 + index * 0.1 }}
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Additional Statistics */}
                    <motion.div variants={itemVariants} className="mb-16">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                                Network Overview
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                                Key metrics showing the reach and effectiveness of our blood donation network.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                            {additionalStats.map((stat, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.1, duration: 0.5 }}
                                    className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl p-6 rounded-2xl border border-white/30 dark:border-gray-700/30 hover:bg-white/90 dark:hover:bg-gray-900/90 hover:border-white/40 dark:hover:border-gray-700/40 transition-all duration-300 hover:scale-[1.02] shadow-sm hover:shadow-lg group text-center"
                                >
                                    <div className={`w-12 h-12 ${stat.bgColor} backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                        <stat.icon className={`text-xl ${stat.color}`} />
                                    </div>
                                    <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                        {stat.value}
                                    </div>
                                    <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                        {stat.title}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Monthly Trends Chart */}
                    <motion.div variants={itemVariants} className="mb-16">
                        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl p-8 rounded-2xl border border-white/30 dark:border-gray-700/30 shadow-sm">
                            <div className="text-center mb-8">
                                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                                    Monthly Trends
                                </h2>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Donation requests vs completed donations over the past 6 months.
                                </p>
                            </div>

                            <div className="space-y-6">
                                <div className="flex justify-center gap-8 mb-6">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                        <span className="text-sm text-gray-600 dark:text-gray-400">Donations</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                                        <span className="text-sm text-gray-600 dark:text-gray-400">Requests</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-6 gap-4 h-64">
                                    {monthlyData.map((data, index) => (
                                        <div key={index} className="flex flex-col items-center justify-end space-y-2">
                                            <div className="flex items-end space-x-1 h-48">
                                                <motion.div
                                                    className="w-4 bg-red-500 rounded-t-sm"
                                                    initial={{ height: 0 }}
                                                    animate={{ height: `${(data.donations / maxValue) * 100}%` }}
                                                    transition={{ duration: 1, delay: index * 0.1 }}
                                                />
                                                <motion.div
                                                    className="w-4 bg-blue-500 rounded-t-sm"
                                                    initial={{ height: 0 }}
                                                    animate={{ height: `${(data.requests / maxValue) * 100}%` }}
                                                    transition={{ duration: 1, delay: index * 0.1 + 0.2 }}
                                                />
                                            </div>
                                            <div className="text-xs font-medium text-gray-600 dark:text-gray-400">
                                                {data.month}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Summary Card */}
                    <motion.div
                        variants={itemVariants}
                        className="bg-gradient-to-r from-red-50/80 to-blue-50/80 dark:from-red-900/20 dark:to-blue-900/20 backdrop-blur-sm p-8 lg:p-12 rounded-2xl border border-red-200/50 dark:border-red-700/30 text-center"
                    >
                        <div className="max-w-3xl mx-auto">
                            <div className="w-16 h-16 bg-red-100/80 dark:bg-red-900/40 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6">
                                <FaHeart className="text-2xl text-red-600 dark:text-red-400 animate-pulse" />
                            </div>
                            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                                Making a Real Difference
                            </h2>
                            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                                Every number represents a life touched, a family helped, and a community strengthened.
                                Together, we're building Bangladesh's most trusted blood donation network.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                                <div>
                                    <div className="text-2xl font-bold text-red-600 dark:text-red-400 mb-2">
                                        {(animatedStats.totalDonations * 3).toLocaleString()}+
                                    </div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">Lives Potentially Saved</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                                        98.5%
                                    </div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">Success Rate</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">
                                        &lt; 15 min
                                    </div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">Average Response Time</div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

export default Statistics;