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
            color: "text-accent-blue",
            bgColor: "bg-accent-blue",
            borderColor: "border-border-primary/30 dark:border-border-primary/40",
            progress: 85,
            trend: { value: 8.2, isPositive: true },
            cardClass: "card-accent card-hover-accent",
        },
        {
            icon: FaTint,
            title: "Total Donations",
            value: animatedStats.totalDonations.toLocaleString(),
            subtitle: "Lives Saved",
            color: "text-primary",
            bgColor: "bg-primary/15 dark:bg-primary/20",
            borderColor: "border-border-primary/30 dark:border-border-primary/40",
            progress: 92,
            trend: { value: 15.3, isPositive: true },
            cardClass: "card-primary card-hover-primary",
        },
        {
            icon: FaClock,
            title: "Pending Requests",
            value: animatedStats.pendingRequests.toLocaleString(),
            subtitle: "Awaiting Response",
            color: "text-accent-orange",
            bgColor: "bg-accent-orange",
            borderColor: "border-border-primary/30 dark:border-border-primary/40",
            progress: 23,
            trend: { value: 2.1, isPositive: false },
            cardClass: "card-orange card-hover-orange",
        },
        {
            icon: FaCheckCircle,
            title: "Completed Donations",
            value: animatedStats.completedDonations.toLocaleString(),
            subtitle: "Successfully Matched",
            color: "text-accent-green",
            bgColor: "bg-accent-green",
            borderColor: "border-border-primary/30 dark:border-border-primary/40",
            progress: 98,
            trend: { value: 12.7, isPositive: true },
            cardClass: "card-success card-hover-success",
        },
    ];

    const additionalStats = [
        {
            icon: FaHospital,
            title: "Partner Hospitals",
            value: animatedStats.activeHospitals,
            color: "text-accent-purple",
            bgColor: "bg-accent-purple",
            cardClass: "card-purple card-hover-purple",
        },
        {
            icon: FaGlobe,
            title: "Districts Served",
            value: animatedStats.districtsServed,
            color: "text-accent-teal",
            bgColor: "bg-accent-teal",
            cardClass: "card-teal card-hover-teal",
        },
        {
            icon: FaHeart,
            title: "Emergency Requests",
            value: animatedStats.emergencyRequests,
            color: "text-accent-pink",
            bgColor: "bg-accent-pink",
            cardClass: "card-pink card-hover-pink",
        },
        {
            icon: FaChartLine,
            title: "Monthly Growth",
            value: `${animatedStats.monthlyGrowth.toFixed(1)}%`,
            color: "text-accent-indigo",
            bgColor: "bg-accent-indigo",
            cardClass: "card-indigo card-hover-indigo",
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
        <div className="min-h-screen bg-bg-primary dark:bg-bg-primary">
            <DynamicTitle title="Statistics - BloodConnect" />

            {/* Enhanced Background Elements for dark mode */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-20 w-40 h-40 bg-primary/8 dark:bg-primary/12 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-20 right-20 w-48 h-48 bg-accent/5 dark:bg-accent/10 rounded-full blur-3xl animate-pulse animation-delay-2000" />
                <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-green-500/5 dark:bg-green-400/8 rounded-full blur-2xl animate-pulse animation-delay-4000" />
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
                        <div className="inline-flex items-center gap-2 bg-primary-light/80 dark:bg-primary/20 backdrop-blur-sm border border-primary/30 dark:border-primary/40 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-6 shadow-lg dark:shadow-xl">
                            <FaChartLine className="text-sm" />
                            <span className="uppercase tracking-wide">Platform Statistics</span>
                        </div>
                        <h1 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold text-text-primary leading-tight mb-6">
                            Impact{" "}
                            <span className="text-primary dark:text-red-400">
                                Dashboard
                            </span>
                        </h1>
                        <p className="text-lg sm:text-xl text-text-secondary max-w-4xl mx-auto leading-relaxed mb-8">
                            Real-time insights into our blood donation network's performance, showing the lives we've touched
                            and the communities we've served across Bangladesh.
                        </p>
                        <div className="flex items-center justify-center gap-2 text-text-muted text-sm">
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
                                    className={`bg-bg-card/98 dark:bg-bg-card/95 backdrop-blur-xl p-6 rounded-2xl border ${stat.borderColor} hover:bg-bg-card/100 dark:hover:bg-bg-card/98 hover:border-border-primary/50 dark:hover:border-border-primary/60 transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-xl dark:shadow-2xl group ${stat.cardClass}`}
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <div className={`w-12 h-12 ${stat.bgColor} backdrop-blur-sm rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm dark:shadow-lg`}>
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
                                        <h3 className="text-2xl lg:text-3xl font-bold text-text-primary mb-1">
                                            {stat.value}
                                        </h3>
                                        <p className="text-sm font-medium text-text-secondary mb-1">
                                            {stat.title}
                                        </p>
                                        <p className="text-xs text-text-muted">
                                            {stat.subtitle}
                                        </p>
                                    </div>

                                    {/* Progress Bar */}
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs text-text-muted">Progress</span>
                                            <span className="text-xs font-medium text-text-secondary">{stat.progress}%</span>
                                        </div>
                                        <div className="w-full bg-border-primary/40 dark:bg-border-primary/60 rounded-full h-2 overflow-hidden backdrop-blur-sm">
                                            <motion.div
                                                className={`h-full rounded-full ${stat.color.replace('text-', 'bg-').replace('accent-', 'accent-')}`}
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
                            <h2 className="text-2xl lg:text-3xl font-bold text-text-primary mb-4">
                                Network Overview
                            </h2>
                            <p className="text-text-secondary max-w-2xl mx-auto">
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
                                    className={`bg-bg-card/98 dark:bg-bg-card/95 backdrop-blur-xl p-6 rounded-2xl border border-border-primary/30 dark:border-border-primary/40 hover:bg-bg-card/100 dark:hover:bg-bg-card/98 hover:border-border-primary/50 dark:hover:border-border-primary/60 transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-xl dark:shadow-2xl group text-center ${stat.cardClass}`}
                                >
                                    <div className={`w-12 h-12 ${stat.bgColor} backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-sm dark:shadow-lg`}>
                                        <stat.icon className={`text-xl ${stat.color}`} />
                                    </div>
                                    <div className="text-2xl font-bold text-text-primary mb-2">
                                        {stat.value}
                                    </div>
                                    <div className="text-sm font-medium text-text-secondary">
                                        {stat.title}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Monthly Trends Chart */}
                    <motion.div variants={itemVariants} className="mb-16">
                        <div className="bg-bg-card/98 dark:bg-bg-card/95 backdrop-blur-xl p-8 rounded-2xl border border-border-primary/30 dark:border-border-primary/40 shadow-lg dark:shadow-2xl">
                            <div className="text-center mb-8">
                                <h2 className="text-2xl lg:text-3xl font-bold text-text-primary mb-4">
                                    Monthly Trends
                                </h2>
                                <p className="text-text-secondary">
                                    Donation requests vs completed donations over the past 6 months.
                                </p>
                            </div>

                            <div className="space-y-6">
                                <div className="flex justify-center gap-8 mb-6">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 bg-primary rounded-full"></div>
                                        <span className="text-sm text-text-secondary">Donations</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 bg-accent rounded-full"></div>
                                        <span className="text-sm text-text-secondary">Requests</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-6 gap-4 h-64">
                                    {monthlyData.map((data, index) => (
                                        <div key={index} className="flex flex-col items-center justify-end space-y-2">
                                            <div className="flex items-end space-x-1 h-48">
                                                <motion.div
                                                    className="w-4 bg-primary rounded-t-sm"
                                                    initial={{ height: 0 }}
                                                    animate={{ height: `${(data.donations / maxValue) * 100}%` }}
                                                    transition={{ duration: 1, delay: index * 0.1 }}
                                                />
                                                <motion.div
                                                    className="w-4 bg-accent rounded-t-sm"
                                                    initial={{ height: 0 }}
                                                    animate={{ height: `${(data.requests / maxValue) * 100}%` }}
                                                    transition={{ duration: 1, delay: index * 0.1 + 0.2 }}
                                                />
                                            </div>
                                            <div className="text-xs font-medium text-text-secondary">
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
                        className="bg-gradient-to-r from-primary/15 to-primary/8 dark:from-primary/20 dark:to-primary/10 backdrop-blur-sm p-8 lg:p-12 rounded-2xl border border-primary/30 dark:border-primary/40 text-center shadow-lg dark:shadow-2xl"
                    >
                        <div className="max-w-3xl mx-auto">
                            <div className="w-16 h-16 bg-primary/15 dark:bg-primary/25 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg dark:shadow-xl">
                                <FaHeart className="text-2xl text-primary animate-pulse" />
                            </div>
                            <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-6">
                                Making a Real Difference
                            </h2>
                            <p className="text-lg text-text-secondary mb-8 leading-relaxed">
                                Every number represents a life touched, a family helped, and a community strengthened.
                                Together, we're building Bangladesh's most trusted blood donation network.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                                <div>
                                    <div className="text-2xl font-bold text-primary mb-2">
                                        {(animatedStats.totalDonations * 3).toLocaleString()}+
                                    </div>
                                    <div className="text-sm text-text-secondary">Lives Potentially Saved</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-accent mb-2">
                                        98.5%
                                    </div>
                                    <div className="text-sm text-text-secondary">Success Rate</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-accent-green mb-2">
                                        &lt; 15 min
                                    </div>
                                    <div className="text-sm text-text-secondary">Average Response Time</div>
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