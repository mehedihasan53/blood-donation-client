import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaUser,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaClock,
  FaTint,
  FaStethoscope,
  FaArrowRight,
} from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import Loading from "./shared/Loading";
import useAxiosSecure from "../hooks/useAxiosSecure";
import DynamicTitle from "./shared/DynamicTitle";

const PendingRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosInstance = useAxiosSecure();

  useEffect(() => {
    const fetchPendingRequests = async () => {
      try {
        const res = await axiosInstance.get(
          "/donation-requests/status/pending"
        );
        setRequests(res.data.requests || []);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch pending requests");
      } finally {
        setLoading(false);
      }
    };
    fetchPendingRequests();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (!requests.length) {
    return (
      <div className="text-center py-16">
        <div className="text-gray-400 text-6xl mb-4">🩸</div>
        <h2 className="text-2xl font-bold text-gray-700 mb-2">
          No Pending Requests
        </h2>
        <p className="text-gray-500">
          There are no pending donation requests at the moment.
        </p>
      </div>
    );
  }

  const getBloodGroupColor = (bloodGroup) => {
    if (bloodGroup.includes("A"))
      return {
        bg: "bg-red-100",
        text: "text-red-700",
        border: "border-red-200",
      };
    if (bloodGroup.includes("B"))
      return {
        bg: "bg-blue-100",
        text: "text-blue-700",
        border: "border-blue-200",
      };
    if (bloodGroup.includes("O"))
      return {
        bg: "bg-emerald-100",
        text: "text-emerald-700",
        border: "border-emerald-200",
      };
    if (bloodGroup.includes("AB"))
      return {
        bg: "bg-purple-100",
        text: "text-purple-700",
        border: "border-purple-200",
      };
    return {
      bg: "bg-gray-100",
      text: "text-gray-700",
      border: "border-gray-200",
    };
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-t border-white/20 dark:border-gray-700/20 p-4 md:p-8">
      <DynamicTitle title="Pending Requests" />

      <Toaster position="top-right" />

      <div className="max-w-7xl mx-auto mb-12">
        <div className="text-center space-y-4">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-red-800 to-gray-900 dark:from-white dark:via-red-300 dark:to-white bg-clip-text text-transparent leading-tight">
            Pending Blood Donation
            <br />
            <span className="text-red-600 dark:text-red-400">Requests</span>
          </h1>

          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="h-px bg-gradient-to-r from-transparent via-red-300 dark:via-red-600 to-transparent w-16"></div>
            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm px-6 py-3 rounded-full border border-white/30 dark:border-gray-700/30">
              <p className="text-gray-600 dark:text-gray-300 font-medium">
                <span className="text-2xl font-bold text-red-600 dark:text-red-400">{requests.length}</span>
                <span className="ml-2 text-sm">request{requests.length !== 1 ? "s" : ""} waiting for donors</span>
              </p>
            </div>
            <div className="h-px bg-gradient-to-r from-transparent via-red-300 dark:via-red-600 to-transparent w-16"></div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {requests.map((req) => {
          const bloodGroupColor = getBloodGroupColor(req.bloodGroup);

          return (
            <div
              key={req._id}
              className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-gray-700/30 border-l-4 border-l-red-500 overflow-hidden hover:bg-white/80 dark:hover:bg-gray-900/80 hover:border-white/30 dark:hover:border-gray-700/40 transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="flex items-center gap-3 p-4 bg-red-50/50 dark:bg-red-900/20 backdrop-blur-sm">
                <div className="w-12 h-12 bg-red-100/70 dark:bg-red-900/40 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <FaUser className="text-red-600 dark:text-red-400 text-xl" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-bold text-gray-900 dark:text-white truncate">
                    {req.recipientName}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-xs truncate">{req.requesterEmail}</p>
                </div>
                <div
                  className={`${bloodGroupColor.bg} dark:bg-opacity-20 ${bloodGroupColor.text} dark:text-opacity-90 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/20 dark:border-gray-700/30 flex items-center gap-1.5`}
                >
                  <FaTint className="text-xs" />
                  <span className="font-semibold text-sm">{req.bloodGroup}</span>
                </div>
              </div>

              <div className="p-4 space-y-3">
                <div className="flex items-center gap-2.5 p-2.5 bg-red-50/40 dark:bg-red-900/10 backdrop-blur-sm rounded-xl border border-white/10 dark:border-gray-700/20">
                  <div className="w-8 h-8 bg-red-100/70 dark:bg-red-900/30 backdrop-blur-sm rounded-lg flex items-center justify-center">
                    <FaMapMarkerAlt className="text-red-600 dark:text-red-400 text-sm" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">Location</p>
                    <p className="font-semibold text-gray-900 dark:text-white text-sm truncate">
                      {req.recipientUpazila}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 text-xs truncate">
                      {req.recipientDistrict}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 p-2.5 bg-emerald-50/40 dark:bg-emerald-900/10 backdrop-blur-sm rounded-xl border border-white/10 dark:border-gray-700/20">
                  <div className="w-8 h-8 bg-emerald-100/70 dark:bg-emerald-900/30 backdrop-blur-sm rounded-lg flex items-center justify-center">
                    <FaCalendarAlt className="text-emerald-600 dark:text-emerald-400 text-sm" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">Donation Date</p>
                    <p className="font-semibold text-gray-900 dark:text-white text-sm">
                      {formatDate(req.donationDate)}
                    </p>
                    {req.donationTime && (
                      <div className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-300 mt-0.5">
                        <FaClock className="text-gray-400 dark:text-gray-500" />
                        <span>{req.donationTime}</span>
                      </div>
                    )}
                  </div>
                </div>

                {req.hospitalName && (
                  <div className="flex items-center gap-2 p-2.5 bg-purple-50/40 dark:bg-purple-900/10 backdrop-blur-sm rounded-xl border border-white/10 dark:border-gray-700/20">
                    <FaStethoscope className="text-purple-500 dark:text-purple-400 text-sm" />
                    <p className="text-sm text-gray-700 dark:text-gray-300 truncate">{req.hospitalName}</p>
                  </div>
                )}

                <Link
                  to={`/donation-request/${req._id}`}
                  className="w-full flex items-center justify-center gap-2 py-2.5 bg-red-600/90 dark:bg-red-600/80 backdrop-blur-sm text-white rounded-xl font-medium hover:bg-red-700/90 dark:hover:bg-red-700/80 transition-all duration-300 border border-red-500/20"
                >
                  <span className="text-sm">View Details & Donate</span>
                  <FaArrowRight className="text-sm" />
                </Link>

                <div className="flex justify-center mt-2">
                  <span className="px-2.5 py-1 bg-amber-100/70 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 text-xs font-medium rounded-full backdrop-blur-sm border border-amber-200/30 dark:border-amber-700/30">
                    Urgent • Need {req.bloodGroup}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PendingRequests;
