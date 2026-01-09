import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "../Provider/AuthProvider";
import {
  FaUser,
  FaMapMarkerAlt,
  FaTint,
  FaCalendarAlt,
  FaUserCheck,
  FaHospital,
  FaHandHoldingHeart,
  FaSpinner,
  FaCheckCircle,
  FaEnvelope,
  FaArrowLeft,
  FaClock,
  FaExclamationTriangle,
  FaPhone,
  FaIdCard,
} from "react-icons/fa";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Loading from "../components/shared/Loading";
import DynamicTitle from "../components/shared/DynamicTitle";

const DonationRequestDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        if (!user) return;
        const token = await user.getIdToken();

        const res = await axiosSecure.get(
          `donation-requests/${id}`,
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
  }, [id, user, axiosSecure]);

  const confirmDonation = async () => {
    try {
      setSubmitting(true);
      if (!user) return;
      const token = await user.getIdToken();

      await axiosSecure.patch(
        `donation-requests/${id}`,
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

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (!request) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50/30 via-white/20 to-pink-50/30 dark:from-gray-900/50 dark:via-gray-800/30 dark:to-gray-900/50 backdrop-blur-sm">
        <DynamicTitle title="Request Not Found" />

        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-40 h-40 bg-red-100/20 dark:bg-red-900/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-48 h-48 bg-pink-100/20 dark:bg-pink-900/10 rounded-full blur-3xl animate-pulse animation-delay-2000" />
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl border border-white/30 dark:border-gray-700/30 shadow-lg p-12">
              <div className="w-20 h-20 bg-red-100/80 dark:bg-red-900/40 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6">
                <FaTint className="text-3xl text-red-500" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Request Not Found
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                The donation request you're looking for doesn't exist or may have been removed.
              </p>
              <Link
                to="/pending-requests"
                className="inline-flex items-center gap-2 bg-red-600/90 dark:bg-red-600/80 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-700/90 dark:hover:bg-red-700/80 transition-all duration-300"
              >
                <FaArrowLeft />
                Back to Requests
              </Link>
            </div>
          </div>
        </div>
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
          bg: "bg-amber-100/80 dark:bg-amber-900/40",
          text: "text-amber-700 dark:text-amber-300",
          border: "border-amber-200/50 dark:border-amber-700/30",
          icon: "bg-amber-500",
        };
      case "inprogress":
        return {
          bg: "bg-blue-100/80 dark:bg-blue-900/40",
          text: "text-blue-700 dark:text-blue-300",
          border: "border-blue-200/50 dark:border-blue-700/30",
          icon: "bg-blue-500",
        };
      case "done":
        return {
          bg: "bg-emerald-100/80 dark:bg-emerald-900/40",
          text: "text-emerald-700 dark:text-emerald-300",
          border: "border-emerald-200/50 dark:border-emerald-700/30",
          icon: "bg-emerald-500",
        };
      case "canceled":
        return {
          bg: "bg-rose-100/80 dark:bg-rose-900/40",
          text: "text-rose-700 dark:text-rose-300",
          border: "border-rose-200/50 dark:border-rose-700/30",
          icon: "bg-rose-500",
        };
      default:
        return {
          bg: "bg-gray-100/80 dark:bg-gray-900/40",
          text: "text-gray-700 dark:text-gray-300",
          border: "border-gray-200/50 dark:border-gray-700/30",
          icon: "bg-gray-500",
        };
    }
  };

  const getBloodGroupColor = (bloodGroup) => {
    if (bloodGroup.includes("A"))
      return {
        bg: "bg-red-100/80 dark:bg-red-900/40",
        text: "text-red-700 dark:text-red-300",
        border: "border-red-200/50 dark:border-red-700/30",
      };
    if (bloodGroup.includes("B"))
      return {
        bg: "bg-blue-100/80 dark:bg-blue-900/40",
        text: "text-blue-700 dark:text-blue-300",
        border: "border-blue-200/50 dark:border-blue-700/30",
      };
    if (bloodGroup.includes("O"))
      return {
        bg: "bg-emerald-100/80 dark:bg-emerald-900/40",
        text: "text-emerald-700 dark:text-emerald-300",
        border: "border-emerald-200/50 dark:border-emerald-700/30",
      };
    if (bloodGroup.includes("AB"))
      return {
        bg: "bg-purple-100/80 dark:bg-purple-900/40",
        text: "text-purple-700 dark:text-purple-300",
        border: "border-purple-200/50 dark:border-purple-700/30",
      };
    return {
      bg: "bg-gray-100/80 dark:bg-gray-900/40",
      text: "text-gray-700 dark:text-gray-300",
      border: "border-gray-200/50 dark:border-gray-700/30",
    };
  };

  const statusColor = getStatusColor(request.status);
  const bloodGroupColor = getBloodGroupColor(request.bloodGroup);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50/30 via-white/20 to-pink-50/30 dark:from-gray-900/50 dark:via-gray-800/30 dark:to-gray-900/50 backdrop-blur-sm">
      <DynamicTitle title={`Donation Request - ${request.recipientName}`} />
      <Toaster position="top-right" />

      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-40 h-40 bg-red-100/20 dark:bg-red-900/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-pink-100/20 dark:bg-pink-900/10 rounded-full blur-3xl animate-pulse animation-delay-2000" />
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-orange-100/20 dark:bg-orange-900/10 rounded-full blur-2xl animate-pulse animation-delay-4000" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="mb-8">
            <Link
              to="/pending-requests"
              className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 font-medium transition-colors duration-300 mb-6"
            >
              <FaArrowLeft />
              Back to Requests
            </Link>

            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-red-50/80 dark:bg-red-900/30 backdrop-blur-sm border border-red-200/50 dark:border-red-700/30 text-red-600 dark:text-red-400 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <FaExclamationTriangle className="text-sm animate-pulse" />
                <span className="uppercase tracking-wide">Urgent Request</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white leading-tight">
                Donation Request Details
              </h1>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            variants={itemVariants}
            className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl border border-white/30 dark:border-gray-700/30 shadow-lg overflow-hidden"
          >
            {/* Header Section */}
            <div className="p-8 border-b border-gray-200/50 dark:border-gray-700/30">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-red-100/80 dark:bg-red-900/40 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <FaUser className="text-red-600 dark:text-red-400 text-2xl" />
                  </div>
                  <div>
                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                      {request.recipientName}
                    </h2>
                    <div className="flex items-center gap-3 mt-2">
                      <span className={`px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-sm border ${statusColor.bg} ${statusColor.text} ${statusColor.border}`}>
                        {request.status.toUpperCase()}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                        <FaIdCard className="text-xs" />
                        ID: {request._id?.slice(-8)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Blood Group Highlight */}
                <div className={`${bloodGroupColor.bg} backdrop-blur-sm ${bloodGroupColor.text} ${bloodGroupColor.border} border px-6 py-4 rounded-2xl text-center min-w-[140px]`}>
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <FaTint className="text-lg" />
                    <span className="text-sm font-medium">BLOOD GROUP</span>
                  </div>
                  <div className="text-3xl font-bold">{request.bloodGroup}</div>
                </div>
              </div>
            </div>

            {/* Details Section */}
            <div className="p-8 space-y-6">
              {/* Location */}
              <div className="bg-gray-50/80 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/30 p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100/80 dark:bg-blue-900/40 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <FaMapMarkerAlt className="text-blue-600 dark:text-blue-400 text-lg" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Location</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      {request.recipientUpazila}, {request.recipientDistrict}
                    </p>
                  </div>
                </div>
              </div>

              {/* Date & Time */}
              <div className="bg-gray-50/80 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/30 p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100/80 dark:bg-green-900/40 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <FaCalendarAlt className="text-green-600 dark:text-green-400 text-lg" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Donation Date & Time</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      {formatDate(request.donationDate)}
                    </p>
                    {request.donationTime && (
                      <div className="flex items-center gap-2 mt-1">
                        <FaClock className="text-gray-400 dark:text-gray-500 text-sm" />
                        <span className="text-sm text-gray-600 dark:text-gray-300">{request.donationTime}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Hospital */}
              {request.hospitalName && (
                <div className="bg-gray-50/80 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/30 p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-purple-100/80 dark:bg-purple-900/40 backdrop-blur-sm rounded-xl flex items-center justify-center">
                      <FaHospital className="text-purple-600 dark:text-purple-400 text-lg" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Hospital</p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        {request.hospitalName}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Requester Contact */}
              <div className="bg-gray-50/80 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/30 p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-indigo-100/80 dark:bg-indigo-900/40 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <FaEnvelope className="text-indigo-600 dark:text-indigo-400 text-lg" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Requester Contact</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      {request.requesterEmail}
                    </p>
                  </div>
                </div>
              </div>

              {/* Assigned Donor (if in progress) */}
              {request.status === "inprogress" && (
                <div className="bg-blue-50/80 dark:bg-blue-900/20 backdrop-blur-sm rounded-xl border border-blue-200/50 dark:border-blue-700/30 p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100/80 dark:bg-blue-900/40 backdrop-blur-sm rounded-xl flex items-center justify-center">
                      <FaUserCheck className="text-blue-600 dark:text-blue-400 text-lg" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-1">Assigned Donor</p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        {request.donorName}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{request.donorEmail}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="p-8 pt-0">
              {request.status === "pending" ? (
                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.button
                    onClick={() => setOpenModal(true)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 flex items-center justify-center gap-3 bg-red-600/90 dark:bg-red-600/80 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-red-700/90 dark:hover:bg-red-700/80 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <FaHandHoldingHeart />
                    Donate Now
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center justify-center gap-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-700 dark:text-gray-200 border border-white/50 dark:border-gray-700/50 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/90 dark:hover:bg-gray-800/90 transition-all duration-300"
                  >
                    <FaPhone />
                    Contact Requester
                  </motion.button>
                </div>
              ) : (
                <div className="text-center">
                  <div className={`inline-flex items-center gap-3 ${statusColor.bg} backdrop-blur-sm ${statusColor.text} ${statusColor.border} border px-6 py-4 rounded-xl`}>
                    <FaCheckCircle />
                    <span className="font-semibold">
                      {request.status === "inprogress" ? "Donation In Progress" :
                        request.status === "done" ? "Donation Completed" : "Request Canceled"}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Confirmation Modal */}
      {openModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setOpenModal(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl w-full max-w-md border border-white/30 dark:border-gray-700/30 shadow-2xl"
          >
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200/50 dark:border-gray-700/30">
                <div className="w-12 h-12 bg-red-100/80 dark:bg-red-900/40 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <FaHandHoldingHeart className="text-red-600 dark:text-red-400 text-xl" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Confirm Donation
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    You're about to donate for {request.recipientName}
                  </p>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="bg-gray-50/80 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/30 p-4">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Your Information</p>
                  <div className="space-y-2">
                    <p className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                      <FaUser className="text-blue-500 text-sm" />
                      {user?.displayName || "Not available"}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 flex items-center gap-2">
                      <FaEnvelope className="text-green-500 text-sm" />
                      {user?.email || "Not available"}
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50/80 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/30 p-4">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Donation Details</p>
                  <div className="flex items-center gap-3">
                    <div className={`px-3 py-2 rounded-lg backdrop-blur-sm border ${bloodGroupColor.bg} ${bloodGroupColor.text} ${bloodGroupColor.border} font-bold`}>
                      {request.bloodGroup}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white text-sm">
                        {request.recipientUpazila}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {request.recipientDistrict}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-200/50 dark:border-gray-700/30">
                <button
                  onClick={() => setOpenModal(false)}
                  className="flex-1 px-4 py-3 bg-gray-100/80 dark:bg-gray-800/60 backdrop-blur-sm text-gray-700 dark:text-gray-300 border border-gray-200/50 dark:border-gray-700/30 rounded-xl hover:bg-gray-200/80 dark:hover:bg-gray-700/60 font-semibold transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  disabled={submitting}
                  onClick={confirmDonation}
                  className="flex-1 px-4 py-3 bg-red-600/90 dark:bg-red-600/80 backdrop-blur-sm text-white rounded-xl hover:bg-red-700/90 dark:hover:bg-red-700/80 font-semibold flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <>
                      <FaSpinner className="animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <FaCheckCircle />
                      Confirm Donation
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default DonationRequestDetails;
