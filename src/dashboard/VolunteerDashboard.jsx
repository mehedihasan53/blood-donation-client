import React, { useEffect, useState } from "react";
import { FaTint, FaHourglassHalf, FaCheckCircle, FaUsers, FaChartBar } from "react-icons/fa";
import { Link } from "react-router-dom";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Loading from "../components/shared/Loading";
import DynamicTitle from "../components/shared/DynamicTitle";
import OverviewCard from "../components/dashboard/OverviewCard";
import { BarChart, PieChart } from "../components/dashboard/Chart";
import { Card } from "../components/ui/Card";
import { motion } from "framer-motion";

const VolunteerDashboard = () => {
  const axiosSecure = useAxiosSecure();
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    done: 0,
    inprogress: 0,
    monthlyStats: [],
    statusStats: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await axiosSecure.get("/volunteer/stats");
      const data = res.data;

      // Generate sample chart data
      const monthlyStats = [
        { label: 'Jan', value: Math.floor(Math.random() * 50) + 20 },
        { label: 'Feb', value: Math.floor(Math.random() * 50) + 20 },
        { label: 'Mar', value: Math.floor(Math.random() * 50) + 20 },
        { label: 'Apr', value: Math.floor(Math.random() * 50) + 20 },
        { label: 'May', value: Math.floor(Math.random() * 50) + 20 },
        { label: 'Jun', value: Math.floor(Math.random() * 50) + 20 }
      ];

      const statusStats = [
        { label: 'Pending', value: data.pending || 0 },
        { label: 'In Progress', value: data.inprogress || Math.floor(Math.random() * 20) + 5 },
        { label: 'Completed', value: data.done || 0 }
      ];

      setStats({
        ...data,
        monthlyStats,
        statusStats
      });
    } catch (error) {
      console.error("Failed to load volunteer stats", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="dashboard-container container-safe bg-bg-secondary/50 dark:bg-bg-secondary/30 space-y-compact">
      <DynamicTitle title="Volunteer Dashboard" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-bg-card/95 dark:bg-bg-card/90 backdrop-blur-xl p-4 sm:p-5 rounded-xl shadow-modern-md dark:shadow-modern-lg border border-border-primary/30 dark:border-border-primary/40"
      >
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-text-primary mb-2">
          Volunteer Dashboard
        </h1>
        <p className="text-text-secondary text-sm sm:text-base">
          Manage blood donation requests and help coordinate donations
        </p>
      </motion.div>

      {/* Stats Cards - Using responsive grid to prevent overlapping */}
      <div className="overview-cards-grid">
        <OverviewCard
          title="Total Requests"
          value={stats.total || 0}
          icon={FaTint}
          color="red"
          delay={0.1}
          subtitle="All donation requests"
        />
        <OverviewCard
          title="Pending Requests"
          value={stats.pending || 0}
          icon={FaHourglassHalf}
          color="yellow"
          delay={0.2}
          subtitle="Awaiting action"
        />
        <OverviewCard
          title="Completed Requests"
          value={stats.done || 0}
          icon={FaCheckCircle}
          color="green"
          delay={0.3}
          subtitle="Successfully handled"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
        <BarChart
          data={stats.monthlyStats}
          title="Monthly Request Handling"
          height={280}
        />
        <PieChart
          data={stats.statusStats}
          title="Request Status Distribution"
          size={220}
        />
      </div>

      {/* Action Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="bg-bg-card/95 dark:bg-bg-card/90 backdrop-blur-xl rounded-xl shadow-modern-md dark:shadow-modern-lg p-4 sm:p-6 border border-border-primary/30 dark:border-border-primary/40"
      >
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
              <FaUsers className="text-lg sm:text-xl text-red-600 dark:text-red-400" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-text-primary mb-1">
                Manage Blood Donation Requests
              </h2>
              <p className="text-text-secondary text-xs sm:text-sm">
                View all requests, update donation status, and coordinate with donors
              </p>
            </div>
          </div>

          <Link
            to="/dashboard/all-blood-donation-request-volunteer"
            className="flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 bg-red-600 dark:bg-red-700 text-white rounded-lg hover:bg-red-700 dark:hover:bg-red-800 transition-all duration-300 shadow-md hover:shadow-lg font-medium text-sm flex-shrink-0"
          >
            <FaChartBar />
            View All Requests
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default VolunteerDashboard;
