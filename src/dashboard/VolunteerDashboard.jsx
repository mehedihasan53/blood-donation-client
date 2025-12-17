import React, { useEffect, useState } from "react";
import { FaTint, FaHourglassHalf, FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Loading from "../components/shared/Loading";
import DynamicTitle from "../components/shared/DynamicTitle";

const VolunteerDashboard = () => {
  const axiosSecure = useAxiosSecure();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await axiosSecure.get("/volunteer/stats");
      setStats(res.data);
    } catch (error) {
      console.error("Failed to load volunteer stats", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="p-6 space-y-6">
      <DynamicTitle title="Volunteer Dashboard" />
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Volunteer Dashboard
        </h1>
        <p className="text-gray-500 text-sm">
          You can view all donation requests and update donation status
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          title="Total Requests"
          value={stats?.total || 0}
          icon={<FaTint />}
          color="red"
        />
        <StatCard
          title="Pending Requests"
          value={stats?.pending || 0}
          icon={<FaHourglassHalf />}
          color="yellow"
        />
        <StatCard
          title="Completed Requests"
          value={stats?.done || 0}
          icon={<FaCheckCircle />}
          color="green"
        />
      </div>

      {/* Action */}
      <div className="bg-white rounded-lg shadow p-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            Manage Blood Donation Requests
          </h2>
          <p className="text-sm text-gray-500">
            View all requests and update donation status
          </p>
        </div>

        <Link
          to="/dashboard/all-blood-donation-request-volunteer"
          className="px-5 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          View All Requests
        </Link>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, color }) => {
  const colors = {
    red: "bg-red-100 text-red-600",
    yellow: "bg-yellow-100 text-yellow-600",
    green: "bg-green-100 text-green-600",
  };

  return (
    <div className="bg-white rounded-lg shadow p-5 flex items-center gap-4">
      <div
        className={`w-12 h-12 flex items-center justify-center rounded-full ${colors[color]}`}
      >
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  );
};

export default VolunteerDashboard;
