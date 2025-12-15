import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "../Provider/AuthProvider";
import {
  FaUser,
  FaMapMarkerAlt,
  FaTint,
  FaCalendarAlt,
  FaClock,
  FaInfoCircle,
  FaUserCheck,
  FaHospital,
  FaHandHoldingHeart,
  FaSpinner,
  FaCheckCircle,
  FaEnvelope,
  FaArrowLeft,
  FaShieldAlt,
} from "react-icons/fa";

const DonationRequestDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();

  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        if (!user) return;
        const token = await user.getIdToken();
        const res = await axios.get(
          `http://localhost:3000/donation-requests/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setRequest(res.data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load request");
      } finally {
        setLoading(false);
      }
    };
    fetchRequest();
  }, [id, user]);

  const confirmDonation = async () => {
    try {
      setSubmitting(true);
      if (!user) return;
      const token = await user.getIdToken();

      await axios.patch(
        `http://localhost:3000/donation-requests/${id}`,
        {
          status: "inprogress",
          donorName: user.displayName,
          donorEmail: user.email,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Donation confirmed successfully!");
      setOpenModal(false);
      setRequest({
        ...request,
        status: "inprogress",
        donorName: user.displayName,
        donorEmail: user.email,
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to confirm donation");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <FaSpinner className="animate-spin text-red-500 text-4xl mb-4" />
        <p className="text-gray-600">Loading donation details...</p>
      </div>
    );
  }

  if (!request) {
    return (
      <div className="text-center py-16">
        <div className="text-gray-400 text-6xl mb-4">🩸</div>
        <h2 className="text-2xl font-bold text-gray-700 mb-2">
          Request Not Found
        </h2>
        <p className="text-gray-500">
          The donation request you're looking for doesn't exist.
        </p>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return {
          bg: "bg-amber-100",
          text: "text-amber-800",
          icon: "bg-amber-500",
        };
      case "inprogress":
        return {
          bg: "bg-blue-100",
          text: "text-blue-800",
          icon: "bg-blue-500",
        };
      case "done":
        return {
          bg: "bg-emerald-100",
          text: "text-emerald-800",
          icon: "bg-emerald-500",
        };
      case "canceled":
        return {
          bg: "bg-rose-100",
          text: "text-rose-800",
          icon: "bg-rose-500",
        };
      default:
        return {
          bg: "bg-gray-100",
          text: "text-gray-800",
          icon: "bg-gray-500",
        };
    }
  };

  const getBloodGroupColor = (bloodGroup) => {
    if (bloodGroup.includes("A"))
      return {
        bg: "bg-red-100",
        text: "text-red-700",
        border: "border-red-300",
      };
    if (bloodGroup.includes("B"))
      return {
        bg: "bg-blue-100",
        text: "text-blue-700",
        border: "border-blue-300",
      };
    if (bloodGroup.includes("O"))
      return {
        bg: "bg-emerald-100",
        text: "text-emerald-700",
        border: "border-emerald-300",
      };
    if (bloodGroup.includes("AB"))
      return {
        bg: "bg-purple-100",
        text: "text-purple-700",
        border: "border-purple-300",
      };
    return {
      bg: "bg-gray-100",
      text: "text-gray-700",
      border: "border-gray-300",
    };
  };

  const statusColor = getStatusColor(request.status);
  const bloodGroupColor = getBloodGroupColor(request.bloodGroup);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <Toaster position="top-right" />

      {/* Header */}
      <div className="max-w-4xl mx-auto mb-8">
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <FaArrowLeft /> Back
        </button>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          Donation Request Details
        </h1>
        <p className="text-gray-600 mt-2">
          Complete information about this blood donation request
        </p>
      </div>

      {/* Main Card */}
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-l-8 border-red-500">
          {/* Card Header */}
          <div className="p-6 md:p-8 bg-red-50 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div
                className={`w-16 h-16 ${statusColor.icon} rounded-xl flex items-center justify-center shadow`}
              >
                <FaUser className="text-white text-2xl" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                  {request.recipientName}
                </h2>
                <div className="flex items-center gap-3 mt-2">
                  <span
                    className={`px-4 py-1.5 rounded-full text-sm font-medium ${statusColor.bg} ${statusColor.text}`}
                  >
                    {request.status.toUpperCase()}
                  </span>
                  <span className="text-sm text-gray-500">
                    ID: {request._id?.slice(-8)}
                  </span>
                </div>
              </div>
            </div>

            <div
              className={`${bloodGroupColor.bg} ${bloodGroupColor.border} ${bloodGroupColor.text} px-6 py-3 rounded-xl border-2 text-center`}
            >
              <div className="flex items-center gap-3">
                <FaTint className="text-2xl" />
                <div>
                  <p className="text-sm font-medium">BLOOD GROUP</p>
                  <p className="text-3xl font-bold">{request.bloodGroup}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Card Body */}
          <div className="p-6 md:p-8 space-y-6">
            {/* Location */}
            <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <FaMapMarkerAlt className="text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="font-medium text-gray-900">
                  {request.recipientUpazila}, {request.recipientDistrict}
                </p>
              </div>
            </div>

            {/* Donation Schedule */}
            <div className="flex items-center gap-4 p-4 bg-emerald-50 rounded-xl border border-emerald-100">
              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                <FaCalendarAlt className="text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Donation Date & Time</p>
                <p className="font-medium text-gray-900">
                  {formatDate(request.donationDate)}{" "}
                  {request.donationTime && `• ${request.donationTime}`}
                </p>
              </div>
            </div>

            {/* Hospital Info */}
            {request.hospitalName && (
              <div className="flex items-center gap-4 p-4 bg-cyan-50 rounded-xl border border-cyan-100">
                <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center">
                  <FaHospital className="text-cyan-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Hospital</p>
                  <p className="font-medium text-gray-900">
                    {request.hospitalName}
                  </p>
                </div>
              </div>
            )}

            {/* Donor Info */}
            {request.status === "inprogress" && (
              <div className="flex items-center gap-4 p-4 bg-purple-50 rounded-xl border border-purple-100">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <FaUserCheck className="text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Assigned Donor</p>
                  <p className="font-medium text-gray-900">
                    {request.donorName} • {request.donorEmail}
                  </p>
                </div>
              </div>
            )}

            {/* Donate Button */}
            {request.status === "pending" && (
              <div className="flex justify-center pt-4">
                <button
                  onClick={() => setOpenModal(true)}
                  className="px-8 py-4 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 flex items-center gap-2"
                >
                  <FaHandHoldingHeart /> Donate Now
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {openModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setOpenModal(false)}
          />
          <div className="relative bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6 pb-4 border-b">
              <div className="w-12 h-12 bg-gradient-to-br from-red-100 to-pink-100 rounded-xl flex items-center justify-center">
                <FaHandHoldingHeart className="text-red-500 text-xl" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Confirm Donation
                </h2>
                <p className="text-gray-600 text-sm">
                  You're about to donate for {request.recipientName}
                </p>
              </div>
            </div>

            {/* User Info */}
            <div className="space-y-4 mb-6">
              <div className="p-4 bg-blue-50 rounded-xl">
                <p className="text-sm text-gray-500 mb-1">Your Name</p>
                <p className="font-bold text-gray-900 flex items-center gap-2">
                  <FaUser className="text-blue-500" />{" "}
                  {user?.displayName || "Not available"}
                </p>
              </div>

              <div className="p-4 bg-emerald-50 rounded-xl">
                <p className="text-sm text-gray-500 mb-1">Your Email</p>
                <p className="font-medium text-gray-900 flex items-center gap-2">
                  <FaEnvelope className="text-emerald-500" />{" "}
                  {user?.email || "Not available"}
                </p>
              </div>

              <div className="p-4 bg-amber-50 rounded-xl">
                <p className="text-sm text-gray-500 mb-1">Donation Details</p>
                <div className="flex items-center gap-3">
                  <div
                    className={`px-4 py-2 rounded-lg ${bloodGroupColor.bg} ${bloodGroupColor.text} font-bold`}
                  >
                    {request.bloodGroup}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {request.recipientUpazila}
                    </p>
                    <p className="text-sm text-gray-600">
                      {request.recipientDistrict}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4 border-t">
              <button
                onClick={() => setOpenModal(false)}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                disabled={submitting}
                onClick={confirmDonation}
                className="flex-1 px-4 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 font-medium flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <>
                    <FaSpinner className="animate-spin" /> Processing...
                  </>
                ) : (
                  <>
                    <FaCheckCircle /> Confirm Donation
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default DonationRequestDetails;
