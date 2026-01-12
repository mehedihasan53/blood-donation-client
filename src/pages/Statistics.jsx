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
            transition: { staggerChildren: 0.1, duration: 0.6 },
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
            iconBgColor: "bg-blue-100 dark:bg-blue-900/30",
            progressBgColor: "bg-blue-600 dark:bg-blue-500",
            borderColor: "border-blue-100 dark:border-blue-900/20",
            progress: 85,
            trend: { value: 8.2, isPositive: true },
        },
        {
            icon: FaTint,
            title: "Total Donations",
            value: animatedStats.totalDonations.toLocaleString(),
            subtitle: "Lives Saved",
            color: "text-red-600 dark:text-red-400",
            iconBgColor: "bg-red-100 dark:bg-red-900/30",
            progressBgColor: "bg-red-600 dark:bg-red-500",
            borderColor: "border-red-100 dark:border-red-900/20",
            progress: 92,
            trend: { value: 15.3, isPositive: true },
        },
        {
            icon: FaClock,
            title: "Pending Requests",
            value: animatedStats.pendingRequests.toLocaleString(),
            subtitle: "Awaiting Response",
            color: "text-amber-600 dark:text-amber-400",
            iconBgColor: "bg-amber-100 dark:bg-amber-900/30",
            progressBgColor: "bg-amber-600 dark:bg-amber-500",
            borderColor: "border-amber-100 dark:border-amber-900/20",
            progress: 23,
            trend: { value: 2.1, isPositive: false },
        },
        {
            icon: FaCheckCircle,
            title: "Completed Donations",
            value: animatedStats.completedDonations.toLocaleString(),
            subtitle: "Successfully Matched",
            color: "text-emerald-600 dark:text-emerald-400",
            iconBgColor: "bg-emerald-100 dark:bg-emerald-900/30",
            progressBgColor: "bg-emerald-600 dark:bg-emerald-500",
            borderColor: "border-emerald-100 dark:border-emerald-900/20",
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
            iconBgColor: "bg-purple-100 dark:bg-purple-900/30",
        },
        {
            icon: FaGlobe,
            title: "Districts Served",
            value: animatedStats.districtsServed,
            color: "text-teal-600 dark:text-teal-400",
            iconBgColor: "bg-teal-100 dark:bg-teal-900/30",
        },
        {
            icon: FaHeart,
            title: "Emergency Requests",
            value: animatedStats.emergencyRequests,
            color: "text-rose-600 dark:text-rose-400",
            iconBgColor: "bg-rose-100 dark:bg-rose-900/30",
        },
        {
            icon: FaChartLine,
            title: "Monthly Growth",
            value: `${animatedStats.monthlyGrowth.toFixed(1)}%`,
            color: "text-indigo-600 dark:text-indigo-400",
            iconBgColor: "bg-indigo-100 dark:bg-indigo-900/30",
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
        <div className="min-h-screen bg-white dark:bg-[#0a0a0a] transition-colors duration-300">
            <DynamicTitle title="Statistics - BloodConnect" />

            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-20 w-40 h-40 bg-red-500/5 dark:bg-red-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-20 right-20 w-48 h-48 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
                <motion.div variants={containerVariants} initial="hidden" animate="visible" className="max-w-7xl mx-auto">

                    <motion.div variants={itemVariants} className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 bg-red-50 dark:bg-red-950/40 border border-red-100 dark:border-red-900/50 text-red-600 dark:text-red-400 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                            <FaChartLine className="text-[10px]" />
                            <span>Platform Statistics</span>
                        </div>
                        <h1 className="text-4xl lg:text-6xl font-black text-gray-900 dark:text-white mb-6">
                            Impact <span className="text-red-600 dark:text-red-500">Dashboard</span>
                        </h1>
                        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
                            Real-time insights into our blood donation network's performance, showing the lives we've touched
                            and the communities we've served across Bangladesh.
                        </p>
                    </motion.div>

                    <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                        {mainStats.map((stat, index) => (
                            <div key={index} className={`bg-white dark:bg-white/[0.03] p-6 rounded-3xl border ${stat.borderColor} shadow-sm hover:shadow-xl transition-all group`}>
                                <div className="flex justify-between items-start mb-6">
                                    <div className={`w-12 h-12 ${stat.iconBgColor} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                                        <stat.icon className={`text-xl ${stat.color}`} />
                                    </div>
                                    <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-bold ${stat.trend.isPositive ? 'bg-green-50 dark:bg-green-900/20 text-green-600' : 'bg-red-50 dark:bg-red-900/20 text-red-600'}`}>
                                        {stat.trend.isPositive ? <FaArrowUp /> : <FaArrowDown />}
                                        {stat.trend.value}%
                                    </div>
                                </div>
                                <div className="mb-6">
                                    <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-1">{stat.value}</h3>
                                    <p className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-tight">{stat.title}</p>
                                    <p className="text-xs text-gray-400 dark:text-gray-500">{stat.subtitle}</p>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-[10px] font-bold uppercase text-gray-400">
                                        <span>Target</span>
                                        <span>{stat.progress}%</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${stat.progress}%` }}
                                            transition={{ duration: 1.5, ease: "circOut" }}
                                            className={`h-full rounded-full ${stat.progressBgColor}`}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </motion.div>

                    <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                        {additionalStats.map((stat, index) => (
                            <div key={index} className="bg-gray-50 dark:bg-white/[0.02] p-6 rounded-3xl border border-gray-100 dark:border-white/10 text-center hover:shadow-lg transition-all">
                                <div className={`w-10 h-10 ${stat.iconBgColor} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                                    <stat.icon className={`text-lg ${stat.color}`} />
                                </div>
                                <div className="text-2xl font-black text-gray-900 dark:text-white mb-1">{stat.value}</div>
                                <div className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">{stat.title}</div>
                            </div>
                        ))}
                    </motion.div>

                    <motion.div variants={itemVariants} className="bg-white dark:bg-white/[0.02] p-8 lg:p-12 rounded-[2.5rem] border border-gray-100 dark:border-white/10 shadow-sm mb-16">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
                            <div>
                                <h2 className="text-2xl lg:text-3xl font-black text-gray-900 dark:text-white">Monthly Trends</h2>
                                <p className="text-gray-500 dark:text-gray-400 text-sm">Donation activities vs requests analysis</p>
                            </div>
                            <div className="flex gap-6">
                                <div className="flex items-center gap-2">
                                    <span className="w-3 h-3 rounded-full bg-red-500" />
                                    <span className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-tighter">Donations</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="w-3 h-3 rounded-full bg-blue-500" />
                                    <span className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-tighter">Requests</span>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-6 gap-2 sm:gap-4 h-64 items-end border-b border-gray-100 dark:border-white/10 pb-4">
                            {monthlyData.map((data, index) => (
                                <div key={index} className="group relative flex flex-col items-center h-full justify-end">
                                    <div className="flex items-end gap-1 sm:gap-2 h-full w-full justify-center">
                                        <motion.div
                                            initial={{ height: 0 }}
                                            animate={{ height: `${(data.donations / maxValue) * 100}%` }}
                                            className="w-3 sm:w-6 bg-red-500 dark:bg-red-600 rounded-t-lg transition-all group-hover:brightness-110 shadow-lg shadow-red-500/20"
                                        />
                                        <motion.div
                                            initial={{ height: 0 }}
                                            animate={{ height: `${(data.requests / maxValue) * 100}%` }}
                                            className="w-3 sm:w-6 bg-blue-500 dark:bg-blue-600 rounded-t-lg transition-all group-hover:brightness-110 shadow-lg shadow-blue-500/20"
                                        />
                                    </div>
                                    <span className="absolute -bottom-8 text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase">{data.month}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div variants={itemVariants} className="bg-red-800 dark:bg-red-700 rounded-[3rem] p-10 lg:p-16 text-center text-white relative overflow-hidden shadow-2xl shadow-red-600/20">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32" />
                        <div className="relative z-10">
                            <FaHeart className="text-5xl text-red-200 mb-8 mx-auto animate-pulse" />
                            <h2 className="text-3xl lg:text-5xl font-black mb-6">Making a Real Difference</h2>
                            <p className="text-red-100 text-lg max-w-2xl mx-auto mb-12">
                                Every number represents a life touched and a community strengthened. Together, we're building Bangladesh's most trusted blood donation network.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20">
                                    <div className="text-3xl font-black mb-1">{(animatedStats.totalDonations * 3).toLocaleString()}+</div>
                                    <div className="text-[10px] font-bold uppercase tracking-widest text-red-100">Lives Potentially Saved</div>
                                </div>
                                <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20">
                                    <div className="text-3xl font-black mb-1">98.5%</div>
                                    <div className="text-[10px] font-bold uppercase tracking-widest text-red-100">Success Rate</div>
                                </div>
                                <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20">
                                    <div className="text-3xl font-black mb-1">&lt; 15 min</div>
                                    <div className="text-[10px] font-bold uppercase tracking-widest text-red-100">Average Response Time</div>
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