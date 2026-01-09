import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaUser,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaClock,
  FaTint,
  FaStethoscope,
  FaArrowRight,
  FaChevronLeft,
  FaChevronRight,
  FaHeart,
  FaExclamationTriangle,
} from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import Loading from "./shared/Loading";
import useAxiosSecure from "../hooks/useAxiosSecure";
import DynamicTitle from "./shared/DynamicTitle";

const PendingRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
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
  }, [axiosInstance]);

  // Pagination calculations
  const totalPages = Math.ceil(requests.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentRequests = requests.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.6
      }
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (!requests.length) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50/30 via-white/20 to-pink-50/30 dark:from-gray-900/50 dark:via-gray-800/30 dark:to-gray-900/50 backdrop-blur-sm">
        <DynamicTitle title="Pending Requests" />

        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-40 h-40 bg-red-100/20 dark:bg-red-900/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-48 h-48 bg-pink-100/20 dark:bg-pink-900/10 rounded-full blur-3xl animate-pulse animation-delay-2000" />
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl border border-white/30 dark:border-gray-700/30 shadow-lg p-12">
              <div className="w-20 h-20 bg-gray-100/80 dark:bg-gray-800/60 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6">
                <FaHeart className="text-3xl text-gray-400 dark:text-gray-500" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                No Pending Requests
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                There are no pending donation requests at the moment.
                Check back later or help spread awareness about blood donation.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50/30 via-white/20 to-pink-50/30 dark:from-gray-900/50 dark:via-gray-800/30 dark:to-gray-900/50 backdrop-blur-sm">
      <DynamicTitle title="Pending Blood Requests" />
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
          className="max-w-7xl mx-auto"
        >
          {/* Header Section */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-red-50/80 dark:bg-red-900/30 backdrop-blur-sm border border-red-200/50 dark:border-red-700/30 text-red-600 dark:text-red-400 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <FaExclamationTriangle className="text-sm animate-pulse" />
              <span className="uppercase tracking-wide">Urgent Requests</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight mb-6">
              Pending Blood{" "}
              <span className="text-red-600 dark:text-red-400">Requests</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
              These are urgent blood donation requests waiting for generous donors like you.
              Every donation can save up to 3 lives.
            </p>

            {/* Stats */}
            <div className="inline-flex items-center gap-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl px-6 py-4 rounded-2xl border border-white/30 dark:border-gray-700/30 shadow-lg">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-red-100/80 dark:bg-red-900/40 backdrop-blur-sm rounded-lg flex items-center justify-center">
                  <FaHeart className="text-red-600 dark:text-red-400 text-sm" />
                </div>
                <span className="text-2xl font-bold text-red-600 dark:text-red-400">{requests.length}</span>
                <span className="text-gray-600 dark:text-gray-300 font-medium">
                  request{requests.length !== 1 ? "s" : ""} waiting
                </span>
              </div>
            </div>
          </motion.div>

          {/* Requests Grid */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-12"
          >
            {currentRequests.map((req) => {
              const bloodGroupColor = getBloodGroupColor(req.bloodGroup);

              return (
                <motion.div
                  key={req._id}
                  variants={itemVariants}
                  whileHover={{ y: -3 }}
                  className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl border border-white/30 dark:border-gray-700/30 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col"
                >
                  {/* Header */}
                  <div className="p-4 lg:p-5 border-b border-gray-200/50 dark:border-gray-700/30">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-red-100/80 dark:bg-red-900/40 backdrop-blur-sm rounded-xl flex items-center justify-center">
                        <FaUser className="text-red-600 dark:text-red-400 text-sm" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base font-bold text-gray-900 dark:text-white truncate">
                          {req.recipientName}
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400 text-xs truncate">
                          {req.requesterEmail}
                        </p>
                      </div>
                    </div>

                    {/* Blood Group Badge */}
                    <div className="flex justify-center">
                      <div className={`${bloodGroupColor.bg} backdrop-blur-sm ${bloodGroupColor.text} ${bloodGroupColor.border} border px-3 py-1.5 rounded-full flex items-center gap-1.5`}>
                        <FaTint className="text-xs" />
                        <span className="font-bold text-xs">{req.bloodGroup}</span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 lg:p-5 space-y-3 flex-grow">
                    {/* Location */}
                    <div className="flex items-center gap-2.5 p-2.5 bg-gray-50/80 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/30">
                      <div className="w-7 h-7 bg-blue-100/80 dark:bg-blue-900/40 backdrop-blur-sm rounded-lg flex items-center justify-center">
                        <FaMapMarkerAlt className="text-blue-600 dark:text-blue-400 text-xs" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 dark:text-white text-xs">
                          {req.recipientUpazila}
                        </p>
                        <p className="text-gray-600 dark:text-gray-300 text-xs">
                          {req.recipientDistrict}
                        </p>
                      </div>
                    </div>

                    {/* Date */}
                    <div className="flex items-center gap-2.5 p-2.5 bg-gray-50/80 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/30">
                      <div className="w-7 h-7 bg-green-100/80 dark:bg-green-900/40 backdrop-blur-sm rounded-lg flex items-center justify-center">
                        <FaCalendarAlt className="text-green-600 dark:text-green-400 text-xs" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 dark:text-white text-xs">
                          {formatDate(req.donationDate)}
                        </p>
                        {req.donationTime && (
                          <div className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-300">
                            <FaClock className="text-gray-400 dark:text-gray-500 text-xs" />
                            <span className="text-xs">{req.donationTime}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Hospital */}
                    {req.hospitalName && (
                      <div className="flex items-center gap-2.5 p-2.5 bg-gray-50/80 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/30">
                        <div className="w-7 h-7 bg-purple-100/80 dark:bg-purple-900/40 backdrop-blur-sm rounded-lg flex items-center justify-center">
                          <FaStethoscope className="text-purple-600 dark:text-purple-400 text-xs" />
                        </div>
                        <p className="text-xs text-gray-700 dark:text-gray-300 truncate font-medium">
                          {req.hospitalName}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="p-4 lg:p-5 pt-0">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Link
                        to={`/donation-request/${req._id}`}
                        className="w-full flex items-center justify-center gap-2 py-2.5 bg-red-600/90 dark:bg-red-600/80 backdrop-blur-sm text-white rounded-xl font-semibold hover:bg-red-700/90 dark:hover:bg-red-700/80 transition-all duration-300 border border-red-500/30 shadow-lg hover:shadow-xl text-sm"
                      >
                        <span>View & Donate</span>
                        <FaArrowRight className="text-xs" />
                      </Link>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Pagination */}
          {totalPages > 1 && (
            <motion.div variants={itemVariants} className="flex justify-center">
              <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl border border-white/30 dark:border-gray-700/30 shadow-lg p-4">
                <div className="flex items-center gap-2">
                  <motion.button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    whileHover={{ scale: currentPage === 1 ? 1 : 1.05 }}
                    whileTap={{ scale: currentPage === 1 ? 1 : 0.95 }}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100/80 dark:bg-gray-800/60 backdrop-blur-sm text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-200/80 dark:hover:bg-gray-700/60 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed border border-gray-200/50 dark:border-gray-700/30"
                  >
                    <FaChevronLeft className="text-sm" />
                    <span className="hidden sm:inline">Previous</span>
                  </motion.button>

                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <motion.button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`w-10 h-10 rounded-xl font-semibold transition-all duration-300 border ${currentPage === page
                          ? 'bg-red-600/90 dark:bg-red-600/80 text-white border-red-500/30 shadow-lg'
                          : 'bg-gray-100/80 dark:bg-gray-800/60 text-gray-700 dark:text-gray-300 border-gray-200/50 dark:border-gray-700/30 hover:bg-gray-200/80 dark:hover:bg-gray-700/60'
                          }`}
                      >
                        {page}
                      </motion.button>
                    ))}
                  </div>

                  <motion.button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    whileHover={{ scale: currentPage === totalPages ? 1 : 1.05 }}
                    whileTap={{ scale: currentPage === totalPages ? 1 : 0.95 }}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100/80 dark:bg-gray-800/60 backdrop-blur-sm text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-200/80 dark:hover:bg-gray-700/60 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed border border-gray-200/50 dark:border-gray-700/30"
                  >
                    <span className="hidden sm:inline">Next</span>
                    <FaChevronRight className="text-sm" />
                  </motion.button>
                </div>

                <div className="text-center mt-3 text-sm text-gray-600 dark:text-gray-400">
                  Showing {startIndex + 1}-{Math.min(endIndex, requests.length)} of {requests.length} requests
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default PendingRequests;
