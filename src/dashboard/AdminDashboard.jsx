import React, { useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { FaUsers, FaTint, FaCheckCircle, FaClock } from "react-icons/fa";
import { GiHeartDrop } from "react-icons/gi";
import { MdAttachMoney } from "react-icons/md";
import Loading from "../components/shared/Loading";

const AdminDashboard = () => {
  const axiosSecure = useAxiosSecure();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalDonors: 0,
    totalRequests: 0,
    pendingRequests: 0,
    completedRequests: 0,
    totalFunding: 0,
    recentDonations: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const res = await axiosSecure.get("/dashboard/stats");
      if (res.data?.success) {
        setStats(res.data.stats);
      }
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ icon: Icon, title, value, color }) => (
    <div className="bg-white rounded-xl shadow p-5 flex items-center gap-4 hover:shadow-lg transition-all duration-300">
      <div className={`p-4 rounded-lg ${color}`}>
        <Icon className="text-2xl text-white" />
      </div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "inprogress":
        return "bg-blue-100 text-blue-700";
      case "done":
        return "bg-green-100 text-green-700";
      case "canceled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  if (loading) return <Loading />;

  // Recent Request Card Component
  const RecentRequestCard = ({ request }) => (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 p-6 hover:-translate-y-1 flex flex-col justify-between">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900">
            {request.recipientName || "Unknown"}
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            {request.requesterEmail || "-"}
          </p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <span className="px-3 py-1.5 rounded-full text-sm font-bold bg-red-100 text-red-800">
            {request.bloodGroup || "-"}
          </span>
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(
              request.status || "pending"
            )}`}
          >
            {request.status || "pending"}
          </span>
        </div>
      </div>

      <div className="mb-5">
        {request.recipientUpazila && request.recipientDistrict && (
          <p className="text-gray-600 text-sm mb-1">
            📍 {request.recipientUpazila}, {request.recipientDistrict}
          </p>
        )}
        <p className="text-gray-600 text-sm">
          📅 {request.donationDate ? formatDate(request.donationDate) : "-"}
        </p>
      </div>

      {request.hospitalName && (
        <p className="text-sm text-gray-600 mb-1">
          🏥 <span className="font-medium">Hospital:</span>{" "}
          {request.hospitalName}
        </p>
      )}
      {request.requestMessage && (
        <p className="text-sm text-gray-500 mt-2 line-clamp-2">
          "{request.requestMessage}"
        </p>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 md:px-8">
      {/* Welcome Section */}
      <div className="mb-10 bg-gradient-to-r from-red-50 via-white to-blue-50 p-6 rounded-xl shadow-md">
        <div className="flex flex-col md:flex-row items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center gap-4">
            <div className="bg-red-500 text-white rounded-full p-4 shadow-lg">
              <FaUsers className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800">
                Welcome, Admin
              </h1>
              <p className="text-gray-600 mt-2 text-lg">
                Quick overview of all users, donation requests, and total
                funding.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <StatCard
          icon={FaUsers}
          title="Total Users"
          value={stats.totalUsers}
          color="bg-blue-500"
        />
        <StatCard
          icon={GiHeartDrop}
          title="Total Donors"
          value={stats.totalDonors}
          color="bg-red-500"
        />
        <StatCard
          icon={FaTint}
          title="Donation Requests"
          value={stats.totalRequests}
          color="bg-purple-500"
        />
        <StatCard
          icon={MdAttachMoney}
          title="Total Funding"
          value={`$${stats.totalFunding}`}
          color="bg-green-500"
        />
      </div>

      {/* Pending & Completed Requests */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-white rounded-xl shadow p-6 flex items-center gap-4 hover:shadow-lg transition-shadow duration-300">
          <div className="p-4 bg-yellow-100 rounded-lg">
            <FaClock className="text-2xl text-yellow-600" />
          </div>
          <div>
            <p className="text-gray-500">Pending Requests</p>
            <p className="text-3xl font-bold text-yellow-600">
              {stats.pendingRequests}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6 flex items-center gap-4 hover:shadow-lg transition-shadow duration-300">
          <div className="p-4 bg-green-100 rounded-lg">
            <FaCheckCircle className="text-2xl text-green-600" />
          </div>
          <div>
            <p className="text-gray-500">Completed Requests</p>
            <p className="text-3xl font-bold text-green-600">
              {stats.completedRequests}
            </p>
          </div>
        </div>
      </div>

      {/* Recent Requests */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.recentDonations.length === 0 ? (
          <div className="col-span-full p-8 text-center text-gray-400">
            No donation requests found
          </div>
        ) : (
          stats.recentDonations.map((r) => (
            <RecentRequestCard key={r._id} request={r} />
          ))
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
