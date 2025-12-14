import React, { useEffect, useState } from "react";
import { FaUsers, FaDonate, FaTint } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Loading from "../components/shared/Loading";

const MainDashboard = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalFunds: 0,
    totalRequests: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);

        const usersRes = await axiosSecure.get("/users");
        const totalUsers = usersRes.data.length;

        const requestsRes = await axiosSecure.get("/donation-requests");
        const totalRequests = requestsRes.data.length;

        const fundsRes = await axiosSecure.get("/donations");
        const totalFunds = fundsRes.data.reduce(
          (sum, donation) => sum + (donation.amount || 0),
          0
        );

        setStats({ totalUsers, totalFunds, totalRequests });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [axiosSecure]);

  if (loading) {
    return (
      <div className="text-center py-12">
        <Loading />
      </div>
    );
  }

  const cards = [
    {
      title: "Total Users (Donors)",
      value: stats.totalUsers,
      icon: <FaUsers />,
      color: "text-blue-500",
      onClick: () => navigate("/dashboard/all-users"),
    },
    {
      title: "Total Funding",
      value: `$${stats.totalFunds}`,
      icon: <FaDonate />,
      color: "text-green-500",
      onClick: () => navigate("/dashboard/funding"),
    },
    {
      title: "Blood Donation Requests",
      value: stats.totalRequests,
      icon: <FaTint />,
      color: "text-red-500",
      onClick: () => navigate("/dashboard/donation-requests"),
    },
  ];

  return (
    <div className="p-6">
      {/* Welcome Section */}
      <div className="mb-6 bg-blue-100 p-6 rounded-lg shadow">
        <h1 className="text-3xl font-bold mb-2">Welcome to the Dashboard!</h1>
        <p className="text-gray-700">
          Monitor users, donations, and blood donation requests at a glance.
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            onClick={card.onClick}
            className="bg-white p-6 rounded-lg shadow flex items-center gap-4 cursor-pointer transform transition duration-300 hover:scale-105 hover:shadow-xl"
          >
            <div
              className={`text-4xl ${card.color} transition-transform duration-300 hover:scale-110`}
            >
              {card.icon}
            </div>
            <div>
              <div className="text-2xl font-bold animate-count">
                {card.value}
              </div>
              <div className="text-gray-600">{card.title}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainDashboard;
