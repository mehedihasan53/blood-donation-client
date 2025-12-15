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

const PendingRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPendingRequests = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/donation-requests/status/pending"
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
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <Toaster position="top-right" />

      <div className="max-w-7xl mx-auto mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          Pending Blood Donation Requests
        </h1>
        <p className="text-gray-600 mb-6">
          {requests.length} request{requests.length !== 1 ? "s" : ""} waiting
          for donors
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {requests.map((req) => {
          const bloodGroupColor = getBloodGroupColor(req.bloodGroup);

          return (
            <div
              key={req._id}
              className="bg-white rounded-2xl shadow-lg border-l-6 border-red-500 overflow-hidden hover:shadow-xl transition-all"
            >
              <div className="flex items-center gap-4 p-5 bg-red-50">
                <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center">
                  <FaUser className="text-red-600 text-2xl" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    {req.recipientName}
                  </h3>
                  <p className="text-gray-500 text-sm">{req.requesterEmail}</p>
                </div>
                <div
                  className={`${bloodGroupColor.bg} ${bloodGroupColor.text} ${bloodGroupColor.border} ml-auto px-4 py-2 rounded-full border-2 flex items-center gap-2`}
                >
                  <FaTint />
                  <span className="font-semibold">{req.bloodGroup}</span>
                </div>
              </div>

              <div className="p-5 space-y-4">
                <div className="flex items-center gap-3 p-3 bg-red-50 rounded-xl">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                    <FaMapMarkerAlt className="text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Location</p>
                    <p className="font-semibold text-gray-900">
                      {req.recipientUpazila}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {req.recipientDistrict}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-xl">
                  <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <FaCalendarAlt className="text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Donation Date</p>
                    <p className="font-semibold text-gray-900">
                      {formatDate(req.donationDate)}
                    </p>
                    {req.donationTime && (
                      <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
                        <FaClock className="text-gray-400" />
                        <span>{req.donationTime}</span>
                      </div>
                    )}
                  </div>
                </div>

                {req.hospitalName && (
                  <div className="flex items-center gap-2 p-3 bg-purple-50 rounded-xl">
                    <FaStethoscope className="text-purple-500" />
                    <p className="text-sm text-gray-700">{req.hospitalName}</p>
                  </div>
                )}

                <Link
                  to={`/donation-request/${req._id}`}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition-all"
                >
                  <span>View Details & Donate</span>
                  <FaArrowRight />
                </Link>

                <div className="flex justify-center mt-2">
                  <span className="px-3 py-1 bg-amber-100 text-amber-800 text-xs font-medium rounded-full">
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
