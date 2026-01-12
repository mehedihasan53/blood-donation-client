import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
    FaUsers,
    FaTint,
    FaChartLine,
    FaCalendarAlt,
    FaMapMarkerAlt,
    FaHeartbeat,
    FaDownload,
    FaFilter
} from "react-icons/fa";
import { GiHeartDrop } from "react-icons/gi";
import { MdBloodtype, MdTrendingUp, MdTrendingDown } from "react-icons/md";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Loading from "../components/shared/Loading";
import DynamicTitle from "../components/shared/DynamicTitle";
import OverviewCard from "../components/dashboard/OverviewCard";
import { BarChart, PieChart, LineChart } from "../components/dashboard/Chart";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/Card";

const Analytics = () => {
    const axiosSecure = useAxiosSecure();
    const [analytics, setAnalytics] = useState({
        totalDonations: 0,
        totalDonors: 0,
        totalRequests: 0,
        successRate: 0,
        monthlyDonations: [],
        bloodGroupDistribution: [],
        locationStats: [],
        donationTrends: [],
        recentActivity: []
    });
    const [loading, setLoading] = useState(true);
    const [dateRange, setDateRange] = useState("30"); // days
    const [selectedBloodGroup, setSelectedBloodGroup] = useState("all");

    useEffect(() => {
        fetchAnalytics();
    }, [dateRange, selectedBloodGroup]);

    const fetchAnalytics = async () => {
        setLoading(true);
        try {
            // Simulate API call with mock data for now
            const mockData = {
                totalDonations: 1247,
                totalDonors: 892,
                totalRequests: 1456,
                successRate: 85.6,
                monthlyDonations: [
                    { label: 'Jan', value: 120 },
                    { label: 'Feb', value: 135 },
                    { label: 'Mar', value: 98 },
                    { label: 'Apr', value: 156 },
                    { label: 'May', value: 142 },
                    { label: 'Jun', value: 178 },
                    { label: 'Jul', value: 165 },
                    { label: 'Aug', value: 189 },
                    { label: 'Sep', value: 156 },
                    { label: 'Oct', value: 198 },
                    { label: 'Nov', value: 167 },
                    { label: 'Dec', value: 143 }
                ],
                bloodGroupDistribution: [
                    { label: 'O+', value: 35 },
                    { label: 'A+', value: 28 },
                    { label: 'B+', value: 22 },
                    { label: 'AB+', value: 8 },
                    { label: 'O-', value: 4 },
                    { label: 'A-', value: 2 },
                    { label: 'B-', value: 1 },
                    { label: 'AB-', value: 0.5 }
                ],
                locationStats: [
                    { district: 'Dhaka', donations: 456, requests: 523 },
                    { district: 'Chittagong', donations: 234, requests: 267 },
                    { district: 'Sylhet', donations: 189, requests: 198 },
                    { district: 'Rajshahi', donations: 167, requests: 189 },
                    { district: 'Khulna', donations: 145, requests: 156 }
                ],
                donationTrends: [
                    { month: 'Jan', successful: 98, failed: 22 },
                    { month: 'Feb', successful: 112, failed: 23 },
                    { month: 'Mar', successful: 87, failed: 11 },
                    { month: 'Apr', successful: 134, failed: 22 },
                    { month: 'May', successful: 125, failed: 17 },
                    { month: 'Jun', successful: 156, failed: 22 }
                ],
                recentActivity: [
                    { type: 'donation', message: 'Blood donation completed in Dhaka', time: '2 hours ago' },
                    { type: 'request', message: 'New blood request from Chittagong', time: '4 hours ago' },
                    { type: 'donor', message: 'New donor registered', time: '6 hours ago' },
                    { type: 'donation', message: 'Emergency donation fulfilled', time: '8 hours ago' }
                ]
            };

            // In a real app, you would make an API call like:
            // const res = await axiosSecure.get(`/analytics?days=${dateRange}&bloodGroup=${selectedBloodGroup}`);
            // setAnalytics(res.data);

            setAnalytics(mockData);
        } catch (error) {
            console.error("Failed to fetch analytics:", error);
        } finally {
            setLoading(false);
        }
    };

    const exportData = () => {
        // Implement export functionality
        console.log("Exporting analytics data...");
    };

    if (loading) return <Loading />;

    return (
        <div className="dashboard-container container-safe bg-bg-secondary/50 dark:bg-bg-secondary/30 space-y-compact">
            <DynamicTitle title="Analytics Dashboard" />

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-bg-card/95 dark:bg-bg-card/90 backdrop-blur-xl p-4 sm:p-5 rounded-xl shadow-modern-md dark:shadow-modern-lg border border-border-primary/30 dark:border-border-primary/40"
            >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                    <div>
                        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-text-primary mb-2">
                            Analytics Dashboard
                        </h1>
                        <p className="text-text-secondary text-sm sm:text-base">
                            Comprehensive insights into blood donation activities and trends
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                        {/* Date Range Filter */}
                        <select
                            value={dateRange}
                            onChange={(e) => setDateRange(e.target.value)}
                            className="select-modern"
                        >
                            <option value="7">Last 7 days</option>
                            <option value="30">Last 30 days</option>
                            <option value="90">Last 3 months</option>
                            <option value="365">Last year</option>
                        </select>

                        {/* Blood Group Filter */}
                        <select
                            value={selectedBloodGroup}
                            onChange={(e) => setSelectedBloodGroup(e.target.value)}
                            className="select-modern"
                        >
                            <option value="all">All Blood Groups</option>
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                        </select>

                        {/* Export Button */}
                        <button
                            onClick={exportData}
                            className="flex items-center gap-2 px-4 py-2 bg-red-600 dark:bg-red-700 text-white rounded-xl hover:bg-red-700 dark:hover:bg-red-800 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold text-sm"
                        >
                            <FaDownload />
                            Export
                        </button>
                    </div>
                </div>
            </motion.div>

            {/* Key Metrics */}
            <div className="overview-cards-grid">
                <OverviewCard
                    title="Total Donations"
                    value={analytics.totalDonations}
                    icon={GiHeartDrop}
                    color="red"
                    delay={0.1}
                    trend={{ type: 'up', value: '+12%' }}
                    subtitle="Successful donations"
                />
                <OverviewCard
                    title="Active Donors"
                    value={analytics.totalDonors}
                    icon={FaUsers}
                    color="blue"
                    delay={0.2}
                    trend={{ type: 'up', value: '+8%' }}
                    subtitle="Registered donors"
                />
                <OverviewCard
                    title="Total Requests"
                    value={analytics.totalRequests}
                    icon={FaTint}
                    color="purple"
                    delay={0.3}
                    trend={{ type: 'up', value: '+15%' }}
                    subtitle="Blood requests"
                />
                <OverviewCard
                    title="Success Rate"
                    value={`${analytics.successRate}%`}
                    icon={FaChartLine}
                    color="green"
                    delay={0.4}
                    trend={{ type: 'up', value: '+2.3%' }}
                    subtitle="Fulfillment rate"
                />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
                <BarChart
                    data={analytics.monthlyDonations}
                    title="Monthly Donation Trends"
                    height={280}
                />
                <PieChart
                    data={analytics.bloodGroupDistribution}
                    title="Blood Group Distribution"
                    size={220}
                />
            </div>

            {/* Donation Success Trends */}
            <Card className="bg-bg-card/95 dark:bg-bg-card/90 backdrop-blur-xl shadow-lg dark:shadow-2xl border border-border-primary/30 dark:border-border-primary/40">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-text-primary">
                        <MdTrendingUp className="text-green-600 dark:text-green-400" />
                        Donation Success Trends
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="chart-container">
                        <LineChart
                            data={analytics.donationTrends}
                            title="Success vs Failed Donations"
                            height={300}
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Location Statistics */}
            <Card className="bg-bg-card/95 dark:bg-bg-card/90 backdrop-blur-xl shadow-lg dark:shadow-2xl border border-border-primary/30 dark:border-border-primary/40">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-text-primary">
                        <FaMapMarkerAlt className="text-blue-600 dark:text-blue-400" />
                        Top Donation Locations
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {analytics.locationStats.map((location, index) => (
                            <motion.div
                                key={location.district}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                className="flex items-center justify-between p-4 bg-bg-tertiary/50 dark:bg-bg-tertiary/30 rounded-xl"
                            >
                                <div>
                                    <h4 className="font-semibold text-text-primary">{location.district}</h4>
                                    <p className="text-sm text-text-secondary">
                                        {location.donations} donations • {location.requests} requests
                                    </p>
                                </div>
                                <div className="text-right">
                                    <div className="text-lg font-bold text-green-600 dark:text-green-400">
                                        {Math.round((location.donations / location.requests) * 100)}%
                                    </div>
                                    <div className="text-xs text-text-muted">Success Rate</div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="bg-bg-card/95 dark:bg-bg-card/90 backdrop-blur-xl shadow-lg dark:shadow-2xl border border-border-primary/30 dark:border-border-primary/40">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-text-primary">
                        <FaHeartbeat className="text-red-600 dark:text-red-400" />
                        Recent Activity
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {analytics.recentActivity.map((activity, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                className="flex items-center gap-3 p-3 bg-bg-tertiary/30 dark:bg-bg-tertiary/20 rounded-lg"
                            >
                                <div className={`w-2 h-2 rounded-full ${activity.type === 'donation' ? 'bg-green-500' :
                                    activity.type === 'request' ? 'bg-blue-500' :
                                        'bg-purple-500'
                                    }`} />
                                <div className="flex-1">
                                    <p className="text-sm text-text-primary">{activity.message}</p>
                                    <p className="text-xs text-text-muted">{activity.time}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Analytics;