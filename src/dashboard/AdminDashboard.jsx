import React, { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import {
  FaUsers,
  FaTint,
  FaCheckCircle,
  FaClock,
  FaStethoscope,
} from "react-icons/fa";
import { GiHeartDrop } from "react-icons/gi";
import { MdAttachMoney } from "react-icons/md";
import Loading from "../components/shared/Loading";
import { AuthContext } from "../Provider/AuthProvider";
import DynamicTitle from "../components/shared/DynamicTitle";
import { motion } from "framer-motion";
import OverviewCard from "../components/dashboard/OverviewCard";
import { BarChart, PieChart, LineChart } from "../components/dashboard/Chart";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/Card";
import { useSmoothScroll } from "../hooks/useSmoothScroll";

const AdminDashboard = () => {
  const axiosSecure = useAxiosSecure();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalDonors: 0,
    totalRequests: 0,
    pendingRequests: 0,
    completedRequests: 0,
    totalFunding: 0,
    monthlyStats: [],
    bloodGroupStats: [],
    statusStats: []
  });
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  // Initialize smooth scrolling
  useSmoothScroll();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const res = await axiosSecure.get("/dashboard/stats");
      if (res.data?.success) {
        const data = res.data.stats;

        // Generate sample data for charts (replace with real API data)
        const monthlyStats = [
          { label: 'Jan', value: Math.floor(Math.random() * 100) + 50 },
          { label: 'Feb', value: Math.floor(Math.random() * 100) + 50 },
          { label: 'Mar', value: Math.floor(Math.random() * 100) + 50 },
          { label: 'Apr', value: Math.floor(Math.random() * 100) + 50 },
          { label: 'May', value: Math.floor(Math.random() * 100) + 50 },
          { label: 'Jun', value: Math.floor(Math.random() * 100) + 50 }
        ];

        const bloodGroupStats = [
          { label: 'O+', value: Math.floor(Math.random() * 50) + 20 },
          { label: 'A+', value: Math.floor(Math.random() * 40) + 15 },
          { label: 'B+', value: Math.floor(Math.random() * 35) + 10 },
          { label: 'AB+', value: Math.floor(Math.random() * 20) + 5 },
          { label: 'O-', value: Math.floor(Math.random() * 15) + 3 },
          { label: 'Others', value: Math.floor(Math.random() * 25) + 8 }
        ];

        const statusStats = [
          { label: 'Pending', value: data.pendingRequests || 0 },
          { label: 'In Progress', value: Math.floor(Math.random() * 30) + 10 },
          { label: 'Completed', value: data.completedRequests || 0 },
          { label: 'Cancelled', value: Math.floor(Math.random() * 15) + 5 }
        ];

        setStats({
          ...data,
          monthlyStats,
          bloodGroupStats,
          statusStats
        });
      }
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  if (loading) return <Loading />;

  return (
    <div className="dashboard-container container-safe bg-bg-secondary/50 dark:bg-bg-secondary/30 space-y-compact">
      <DynamicTitle title={"Admin Dashboard"} />

      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="bg-bg-card/95 dark:bg-bg-card/90 backdrop-blur-xl shadow-modern-md dark:shadow-modern-lg border border-border-primary/30 dark:border-border-primary/40">
          <CardContent className="p-4 sm:p-5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
              <div className="bg-red-500 dark:bg-red-600 text-white rounded-xl p-2.5 sm:p-3 shadow-modern-md flex-shrink-0">
                <FaUsers className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-text-primary">
                  Welcome,{" "}
                  <span className="text-red-600 dark:text-red-400">
                    {user?.displayName || "Admin"}
                  </span>
                </h1>
                <p className="text-text-secondary text-sm sm:text-base">
                  Comprehensive overview of the blood donation system
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Overview Cards */}
      <div className="overview-cards-grid">
        <OverviewCard
          title="Total Users"
          value={stats.totalUsers}
          icon={FaUsers}
          color="blue"
          delay={0.1}
          trend={{ type: 'up', value: '+12%' }}
          subtitle="Active registered users"
        />
        <OverviewCard
          title="Total Donors"
          value={stats.totalDonors}
          icon={GiHeartDrop}
          color="red"
          delay={0.2}
          trend={{ type: 'up', value: '+8%' }}
          subtitle="Verified blood donors"
        />
        <OverviewCard
          title="Donation Requests"
          value={stats.totalRequests}
          icon={FaTint}
          color="purple"
          delay={0.3}
          trend={{ type: 'up', value: '+15%' }}
          subtitle="Total requests made"
        />
        <OverviewCard
          title="Total Funding"
          value={`${stats.totalFunding}`}
          icon={MdAttachMoney}
          color="green"
          delay={0.4}
          trend={{ type: 'up', value: '+22%' }}
          subtitle="Platform donations"
        />
      </div>
      <div className="hidden">
        {/* Duplicate section removed - cards already shown above */}
        <OverviewCard
          title="Total Users"
          value={stats.totalUsers}
          icon={FaUsers}
          color="blue"
          delay={0.1}
          trend={{ type: 'up', value: '+12%' }}
          subtitle="Active registered users"
        />
        <OverviewCard
          title="Total Donors"
          value={stats.totalDonors}
          icon={GiHeartDrop}
          color="red"
          delay={0.2}
          trend={{ type: 'up', value: '+8%' }}
          subtitle="Verified blood donors"
        />
        <OverviewCard
          title="Donation Requests"
          value={stats.totalRequests}
          icon={FaTint}
          color="purple"
          delay={0.3}
          trend={{ type: 'up', value: '+15%' }}
          subtitle="Total requests made"
        />
        <OverviewCard
          title="Total Funding"
          value={`$${stats.totalFunding}`}
          icon={MdAttachMoney}
          color="green"
          delay={0.4}
          trend={{ type: 'up', value: '+22%' }}
          subtitle="Platform donations"
        />
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <OverviewCard
          title="Pending Requests"
          value={stats.pendingRequests}
          icon={FaClock}
          color="yellow"
          delay={0.5}
          subtitle="Awaiting donors"
        />
        <OverviewCard
          title="Completed Requests"
          value={stats.completedRequests}
          icon={FaCheckCircle}
          color="green"
          delay={0.6}
          subtitle="Successfully fulfilled"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
        <BarChart
          data={stats.monthlyStats}
          title="Monthly Donation Requests"
          height={280}
        />
        <PieChart
          data={stats.bloodGroupStats}
          title="Blood Group Distribution"
          size={220}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
        <LineChart
          data={stats.monthlyStats}
          title="Donation Trends"
          height={280}
        />
        <PieChart
          data={stats.statusStats}
          title="Request Status Overview"
          size={220}
        />
      </div>
    </div>
  );
};

export default AdminDashboard;