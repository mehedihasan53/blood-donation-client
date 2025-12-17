import React, { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import {
  FaUsers,
  FaTint,
  FaCheckCircle,
  FaClock,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaStethoscope,
} from "react-icons/fa";
import { GiHeartDrop } from "react-icons/gi";
import { MdAttachMoney } from "react-icons/md";
import Loading from "../components/shared/Loading";
import { AuthContext } from "../Provider/AuthProvider";
import DynamicTitle from "../components/shared/DynamicTitle";

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
  const { user } = useContext(AuthContext);

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
        return "bg-amber-100 text-amber-800";
      case "inprogress":
        return "bg-blue-100 text-blue-800";
      case "done":
        return "bg-emerald-100 text-emerald-800";
      case "canceled":
        return "bg-rose-100 text-rose-800";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getBloodGroupColor = (bg) => {
    if (bg.includes("A"))
      return "bg-red-100 text-red-700 border border-red-300";
    if (bg.includes("B"))
      return "bg-blue-100 text-blue-700 border border-blue-300";
    if (bg.includes("O"))
      return "bg-emerald-100 text-emerald-700 border border-emerald-300";
    if (bg.includes("AB"))
      return "bg-purple-100 text-purple-700 border border-purple-300";
    return "bg-gray-100 text-gray-700 border border-gray-300";
  };

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  if (loading) return <Loading />;

  const RecentRequestCard = ({ request }) => {
    const bloodGroupColor = getBloodGroupColor(request.bloodGroup || "");
    return (
      <div className="bg-white rounded-2xl shadow-lg border-l-6 border-red-500 overflow-hidden hover:shadow-xl transition-all duration-300">
        <DynamicTitle title={"Admin Dashboard"}></DynamicTitle>
        <div className="flex items-center gap-4 p-5 bg-red-50">
          <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center">
            <FaUsers className="text-red-600 text-2xl" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">
              {request.recipientName || "Unknown"}
            </h3>
            <p className="text-gray-500 text-sm">
              {request.requesterEmail || "-"}
            </p>
          </div>
          <div
            className={`${bloodGroupColor} ml-auto px-4 py-2 rounded-full border-2 flex items-center gap-2`}
          >
            <FaTint />
            <span className="font-semibold">{request.bloodGroup || "-"}</span>
          </div>
        </div>

        <div className="p-5 space-y-4 ">
          {request.recipientUpazila && request.recipientDistrict && (
            <div className="flex items-center gap-3 p-3 bg-red-50 rounded-xl">
              <FaMapMarkerAlt className="text-red-600 w-6 h-6" />
              <div>
                <p className="text-sm text-gray-500 mb-1">Location</p>
                <p className="font-semibold text-gray-900">
                  {request.recipientUpazila}
                </p>
                <p className="text-gray-600 text-sm">
                  {request.recipientDistrict}
                </p>
              </div>
            </div>
          )}

          {request.donationDate && (
            <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-xl">
              <FaCalendarAlt className="text-emerald-600 w-6 h-6" />
              <div>
                <p className="text-sm text-gray-500 mb-1">Donation Date</p>
                <p className="font-semibold text-gray-900">
                  {formatDate(request.donationDate)}
                </p>
                {request.donationTime && (
                  <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
                    <FaClock className="text-gray-400" />
                    <span>{request.donationTime}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {request.hospitalName && (
            <div className="flex items-center gap-2 p-3 bg-purple-50 rounded-xl">
              <FaStethoscope className="text-purple-500 w-6 h-6" />
              <p className="text-sm text-gray-700">{request.hospitalName}</p>
            </div>
          )}

          {request.requestMessage && (
            <p className="text-sm text-gray-500 mt-2 line-clamp-2">
              "{request.requestMessage}"
            </p>
          )}

          <div className="flex justify-center mt-2">
            <span className="px-3 py-1 bg-amber-100 text-amber-800 text-xs font-medium rounded-full">
              Urgent • Need {request.bloodGroup}
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 md:px-8">
      <div className="mb-10 bg-gradient-to-r from-red-50 via-white to-blue-50 p-6 rounded-xl shadow-md">
        <div className="flex flex-col md:flex-row items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center gap-4">
            <div className="bg-red-500 text-white rounded-full p-4 shadow-lg">
              <FaUsers className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800">
                Welcome,{" "}
                <span className="text-red-600">
                  {user?.displayName || "Admin"}
                </span>
              </h1>
              <p className="text-gray-600 mt-2 text-lg">
                Quick overview of all users, donation requests, and total
                funding.
              </p>
            </div>
          </div>
        </div>
      </div>

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
