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
      <div className="min-h-screen bg-theme-primary relative overflow-hidden">
        <DynamicTitle title="Request Not Found" />

        {/* Enhanced Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-red-500/20 to-red-600/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-500/20 to-blue-600/10 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-theme-card/95 backdrop-blur-xl rounded-2xl border-0 shadow-modern-2xl p-12">
              <div className="w-20 h-20 bg-gradient-to-br from-red-500/20 to-red-600/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6">
                <FaTint className="text-3xl text-red-500" />
              </div>
              <h2 className="text-3xl font-bold text-theme-primary mb-4">
                Request Not Found
              </h2>
              <p className="text-lg text-theme-secondary leading-relaxed mb-8">
                The donation request you're looking for doesn't exist or may have been removed.
              </p>
              <Link
                to="/pending-requests"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-modern-lg hover:shadow-modern-xl"
              >
                <FaArrowLeft />
                Back
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
          bg: "bg-gradient-to-r from-amber-500/10 to-amber-600/10",
          text: "text-amber-600",
        };
      case "inprogress":
        return {
          bg: "bg-gradient-to-r from-blue-500/10 to-blue-600/10",
          text: "text-blue-600",
        };
      case "done":
        return {
          bg: "bg-gradient-to-r from-emerald-500/10 to-emerald-600/10",
          text: "text-emerald-600",
        };
      case "canceled":
        return {
          bg: "bg-gradient-to-r from-rose-500/10 to-rose-600/10",
          text: "text-rose-600",
        };
      default:
        return {
          bg: "bg-gradient-to-r from-gray-500/10 to-gray-600/10",
          text: "text-gray-600",
        };
    }
  };

  const getBloodGroupColor = (bloodGroup) => {
    if (bloodGroup.includes("A"))
      return {
        bg: "bg-gradient-to-r from-red-500/10 to-red-600/10",
        text: "text-red-600",
      };
    if (bloodGroup.includes("B"))
      return {
        bg: "bg-gradient-to-r from-blue-500/10 to-blue-600/10",
        text: "text-blue-600",
      };
    if (bloodGroup.includes("O"))
      return {
        bg: "bg-gradient-to-r from-emerald-500/10 to-emerald-600/10",
        text: "text-emerald-600",
      };
    if (bloodGroup.includes("AB"))
      return {
        bg: "bg-gradient-to-r from-purple-500/10 to-purple-600/10",
        text: "text-purple-600",
      };
    return {
      bg: "bg-gradient-to-r from-gray-500/10 to-gray-600/10",
      text: "text-gray-600",
    };
  };

  const statusColor = getStatusColor(request.status);
  const bloodGroupColor = getBloodGroupColor(request.bloodGroup);

  return (
    <div className="min-h-screen bg-theme-primary relative overflow-hidden">
      <DynamicTitle title={`Donation Request - ${request.recipientName}`} />
      <Toaster position="top-right" />

      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-red-500/20 to-red-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-500/20 to-blue-600/10 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto"
        >
          {/* Header Section with Gradient Badge */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <Link
              to="/pending-requests"
              className="inline-flex items-center gap-2 text-theme-secondary hover:text-red-500 font-medium transition-all duration-300 mb-8 group"
            >
              <FaArrowLeft className="group-hover:-translate-x-1 transition-transform duration-300" />
              Back
            </Link>

            {/* Gradient Badge */}
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-red-500/20 to-red-600/20 border border-red-500/30 rounded-full mb-6">
              <FaExclamationTriangle className="text-red-500 text-sm animate-pulse mr-2" />
              <span className="text-sm font-semibold bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent uppercase tracking-wide">
                Urgent Blood Request
              </span>
            </div>

            {/* Dramatic Title */}
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-red-500 via-red-600 to-red-700 bg-clip-text text-transparent">
                Donation Request
              </span>
            </h1>
            <p className="text-theme-secondary text-lg max-w-2xl mx-auto">
              Help save a life by donating blood for {request.recipientName}
            </p>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Main Information */}
            <div className="lg:col-span-2 space-y-6">
              {/* Patient Overview Card */}
              <motion.div
                variants={itemVariants}
                className="bg-theme-card/95 backdrop-blur-xl border-0 rounded-2xl shadow-modern-2xl overflow-hidden"
              >
                <div className="p-8">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-red-500/20 to-red-600/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                        <FaUser className="text-red-500 text-2xl" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-theme-primary mb-2">
                          {request.recipientName}
                        </h2>
                        <div className="flex items-center gap-3">
                          <span className={`px-4 py-2 rounded-full text-sm font-semibold ${statusColor.bg} ${statusColor.text}`}>
                            {request.status.toUpperCase()}
                          </span>
                          <span className="text-sm text-theme-muted flex items-center gap-1">
                            <FaIdCard className="text-xs" />
                            ID: {request._id?.slice(-8)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Blood Group Highlight */}
                    <div className="sm:ml-auto">
                      <div className={`${bloodGroupColor.bg} backdrop-blur-sm ${bloodGroupColor.text} px-6 py-4 rounded-2xl text-center min-w-[140px] border-0`}>
                        <div className="flex items-center justify-center gap-2 mb-1">
                          <FaTint className="text-lg" />
                          <span className="text-sm font-medium">BLOOD GROUP</span>
                        </div>
                        <div className="text-3xl font-bold">{request.bloodGroup}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Key Information Grid */}
              <motion.div variants={itemVariants} className="grid sm:grid-cols-2 gap-6">
                {/* Location Card */}
                <div className="bg-theme-card/95 backdrop-blur-xl border-0 rounded-2xl shadow-modern-lg p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                      <FaMapMarkerAlt className="text-blue-500 text-lg" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-theme-muted mb-1">Location</p>
                      <p className="text-lg font-semibold text-theme-primary">
                        {request.recipientUpazila}
                      </p>
                      <p className="text-sm text-theme-secondary">{request.recipientDistrict}</p>
                    </div>
                  </div>
                </div>

                {/* Date & Time Card */}
                <div className="bg-theme-card/95 backdrop-blur-xl border-0 rounded-2xl shadow-modern-lg p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500/20 to-green-600/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                      <FaCalendarAlt className="text-green-500 text-lg" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-theme-muted mb-1">Donation Date</p>
                      <p className="text-lg font-semibold text-theme-primary">
                        {formatDate(request.donationDate)}
                      </p>
                      {request.donationTime && (
                        <div className="flex items-center gap-2 mt-1">
                          <FaClock className="text-theme-muted text-sm" />
                          <span className="text-sm text-theme-secondary">{request.donationTime}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Hospital Information */}
              {request.hospitalName && (
                <motion.div variants={itemVariants}>
                  <div className="bg-theme-card/95 backdrop-blur-xl border-0 rounded-2xl shadow-modern-lg p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-purple-600/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                        <FaHospital className="text-purple-500 text-lg" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-theme-muted mb-1">Hospital</p>
                        <p className="text-lg font-semibold text-theme-primary">
                          {request.hospitalName}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Assigned Donor (if in progress) */}
              {request.status === "inprogress" && (
                <motion.div variants={itemVariants}>
                  <div className="bg-gradient-to-r from-blue-500/10 to-blue-600/10 backdrop-blur-xl border border-blue-500/20 rounded-2xl shadow-modern-lg p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500/30 to-blue-600/30 backdrop-blur-sm rounded-xl flex items-center justify-center">
                        <FaUserCheck className="text-blue-500 text-lg" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-blue-500 mb-1">Assigned Donor</p>
                        <p className="text-lg font-semibold text-theme-primary">
                          {request.donorName}
                        </p>
                        <p className="text-sm text-theme-secondary">{request.donorEmail}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Right Column - Actions & Contact */}
            <div className="space-y-6">
              {/* Action Card */}
              <motion.div
                variants={itemVariants}
                className="bg-theme-card/95 backdrop-blur-xl border-0 rounded-2xl shadow-modern-2xl p-6"
              >
                <h3 className="text-xl font-bold text-theme-primary mb-6">Take Action</h3>

                {request.status === "pending" ? (
                  <div className="space-y-4">
                    <motion.button
                      onClick={() => setOpenModal(true)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-4 rounded-xl font-bold text-lg shadow-modern-lg hover:shadow-modern-xl transform transition-all duration-300"
                    >
                      <FaHandHoldingHeart />
                      Donate Now
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center justify-center gap-3 bg-theme-tertiary/50 backdrop-blur-sm text-theme-primary border-0 px-6 py-4 rounded-xl font-semibold text-lg hover:bg-theme-tertiary/70 transition-all duration-300"
                    >
                      <FaPhone />
                      Contact Requester
                    </motion.button>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className={`inline-flex items-center gap-3 ${statusColor.bg} backdrop-blur-sm ${statusColor.text} px-6 py-4 rounded-xl border-0`}>
                      <FaCheckCircle />
                      <span className="font-semibold">
                        {request.status === "inprogress" ? "Donation In Progress" :
                          request.status === "done" ? "Donation Completed" : "Request Canceled"}
                      </span>
                    </div>
                  </div>
                )}
              </motion.div>

              {/* Contact Information Card */}
              <motion.div
                variants={itemVariants}
                className="bg-theme-card/95 backdrop-blur-xl border-0 rounded-2xl shadow-modern-lg p-6"
              >
                <h3 className="text-xl font-bold text-theme-primary mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-indigo-500/20 to-indigo-600/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                      <FaEnvelope className="text-indigo-500 text-sm" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-theme-muted">Requester Email</p>
                      <p className="text-sm font-semibold text-theme-primary break-all">
                        {request.requesterEmail}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Emergency Notice */}
              <motion.div
                variants={itemVariants}
                className="bg-gradient-to-r from-red-500/10 to-red-600/10 backdrop-blur-xl border border-red-500/20 rounded-2xl shadow-modern-lg p-6"
              >
                <div className="flex items-start gap-3">
                  <FaExclamationTriangle className="text-red-500 text-lg mt-1 animate-pulse" />
                  <div>
                    <h4 className="font-bold text-red-500 mb-2">Emergency Request</h4>
                    <p className="text-sm text-theme-secondary leading-relaxed">
                      This is an urgent blood donation request. Your quick response could help save a life.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
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
            className="relative bg-theme-card/95 backdrop-blur-xl rounded-2xl w-full max-w-md border-0 shadow-modern-2xl"
          >
            <div className="p-8">
              {/* Modal Header */}
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-red-500/20 to-red-600/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <FaHandHoldingHeart className="text-red-500 text-2xl" />
                </div>
                <h2 className="text-2xl font-bold text-theme-primary mb-2">
                  Confirm Donation
                </h2>
                <p className="text-theme-secondary">
                  You're about to donate for {request.recipientName}
                </p>
              </div>

              {/* Donor Information */}
              <div className="space-y-4 mb-8">
                <div className="bg-theme-tertiary/50 backdrop-blur-sm rounded-xl border-0 p-4">
                  <p className="text-sm font-medium text-theme-muted mb-3">Your Information</p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-lg flex items-center justify-center">
                        <FaUser className="text-blue-500 text-sm" />
                      </div>
                      <span className="font-semibold text-theme-primary">
                        {user?.displayName || "Not available"}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-lg flex items-center justify-center">
                        <FaEnvelope className="text-green-500 text-sm" />
                      </div>
                      <span className="text-theme-secondary text-sm">
                        {user?.email || "Not available"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-theme-tertiary/50 backdrop-blur-sm rounded-xl border-0 p-4">
                  <p className="text-sm font-medium text-theme-muted mb-3">Donation Details</p>
                  <div className="flex items-center gap-4">
                    <div className={`px-4 py-2 rounded-lg backdrop-blur-sm border-0 ${bloodGroupColor.bg} ${bloodGroupColor.text} font-bold`}>
                      {request.bloodGroup}
                    </div>
                    <div>
                      <p className="font-semibold text-theme-primary">
                        {request.recipientUpazila}
                      </p>
                      <p className="text-sm text-theme-secondary">
                        {request.recipientDistrict}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex gap-4">
                <button
                  onClick={() => setOpenModal(false)}
                  className="flex-1 px-6 py-3 bg-theme-tertiary/50 backdrop-blur-sm text-theme-secondary border-0 rounded-xl hover:bg-theme-tertiary/70 font-semibold transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  disabled={submitting}
                  onClick={confirmDonation}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
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
