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
        bg: "bg-gradient-to-r from-red-100/90 to-red-200/90 dark:from-red-900/50 dark:to-red-800/50",
        text: "text-red-700 dark:text-red-300",
        icon: "text-red-600 dark:text-red-400",
      };
    if (bloodGroup.includes("B"))
      return {
        bg: "bg-gradient-to-r from-blue-100/90 to-blue-200/90 dark:from-blue-900/50 dark:to-blue-800/50",
        text: "text-blue-700 dark:text-blue-300",
        icon: "text-blue-600 dark:text-blue-400",
      };
    if (bloodGroup.includes("O"))
      return {
        bg: "bg-gradient-to-r from-green-100/90 to-green-200/90 dark:from-green-900/50 dark:to-green-800/50",
        text: "text-green-700 dark:text-green-300",
        icon: "text-green-600 dark:text-green-400",
      };
    if (bloodGroup.includes("AB"))
      return {
        bg: "bg-gradient-to-r from-purple-100/90 to-purple-200/90 dark:from-purple-900/50 dark:to-purple-800/50",
        text: "text-purple-700 dark:text-purple-300",
        icon: "text-purple-600 dark:text-purple-400",
      };
    return {
      bg: "bg-gradient-to-r from-gray-100/90 to-gray-200/90 dark:from-gray-900/50 dark:to-gray-800/50",
      text: "text-gray-700 dark:text-gray-300",
      icon: "text-gray-600 dark:text-gray-400",
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
      <div className="min-h-screen bg-bg-primary dark:bg-bg-primary transition-colors duration-300">
        <DynamicTitle title="Pending Requests" />

        {/* Enhanced Background Elements for dark mode */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-20 w-40 h-40 bg-primary/8 dark:bg-primary/12 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-48 h-48 bg-accent/5 dark:bg-accent/10 rounded-full blur-3xl animate-pulse animation-delay-2000" />
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 lg:py-24">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-bg-card/98 dark:bg-bg-card/95 backdrop-blur-xl rounded-3xl border-0 shadow-modern-xl dark:shadow-modern-2xl p-16">
              <div className="w-24 h-24 bg-gradient-to-r from-bg-tertiary/90 to-bg-tertiary/80 dark:from-bg-tertiary/80 dark:to-bg-tertiary/70 backdrop-blur-xl rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-modern-sm">
                <FaHeart className="text-4xl text-text-muted" />
              </div>
              <h2 className="text-3xl font-black text-text-primary mb-6">
                No Pending Requests
              </h2>
              <p className="text-xl text-text-secondary leading-relaxed font-medium">
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
    <div className="min-h-screen bg-bg-primary dark:bg-bg-primary transition-colors duration-300">
      <DynamicTitle title="Pending Blood Requests" />
      <Toaster position="top-right" />

      {/* Enhanced Background Elements for dark mode */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-40 h-40 bg-primary/8 dark:bg-primary/12 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-accent/5 dark:bg-accent/10 rounded-full blur-3xl animate-pulse animation-delay-2000" />
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-green-500/5 dark:bg-green-400/8 rounded-full blur-2xl animate-pulse animation-delay-4000" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 lg:py-24">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-7xl mx-auto"
        >
          {/* Header Section */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-primary/15 to-red-500/15 dark:from-primary/25 dark:to-red-400/25 backdrop-blur-xl border-0 text-primary dark:text-red-400 px-6 py-3 rounded-2xl text-sm font-bold mb-8 shadow-modern-lg dark:shadow-modern-xl">
              <FaExclamationTriangle className="text-base animate-pulse" />
              <span className="uppercase tracking-wider">Urgent Requests</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-text-primary leading-tight mb-8">
              Pending Blood{" "}
              <span className="bg-gradient-to-r from-primary via-red-600 to-red-700 dark:from-red-400 dark:via-red-500 dark:to-primary bg-clip-text text-transparent">
                Requests
              </span>
            </h1>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed font-medium mb-8">
              These are urgent blood donation requests waiting for generous donors like you.
              Every donation can save up to 3 lives.
            </p>

            {/* Stats */}
            <div className="inline-flex items-center gap-4 bg-bg-card/98 dark:bg-bg-card/95 backdrop-blur-xl px-8 py-5 rounded-2xl border-0 shadow-modern-lg dark:shadow-modern-xl">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-primary/20 to-red-500/20 dark:from-primary/30 dark:to-red-400/30 backdrop-blur-xl rounded-2xl flex items-center justify-center">
                  <FaHeart className="text-primary text-xl" />
                </div>
                <span className="text-3xl font-black text-primary">{requests.length}</span>
                <span className="text-text-secondary font-bold text-lg">
                  request{requests.length !== 1 ? "s" : ""} waiting
                </span>
              </div>
            </div>
          </motion.div>

          {/* Requests Grid */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 mb-16"
          >
            {currentRequests.map((req) => {
              const bloodGroupColor = getBloodGroupColor(req.bloodGroup);

              return (
                <motion.div
                  key={req._id}
                  variants={itemVariants}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="bg-gradient-to-br from-bg-card/98 to-bg-card/95 dark:from-bg-card/95 dark:to-bg-card/90 backdrop-blur-xl rounded-3xl border-0 shadow-modern-lg hover:shadow-modern-2xl transition-all duration-300 overflow-hidden h-full flex flex-col"
                >
                  {/* Header */}
                  <div className="p-6 lg:p-7 border-b border-border-primary/20 dark:border-border-primary/30">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-primary/20 to-red-500/20 dark:from-primary/30 dark:to-red-400/30 backdrop-blur-xl rounded-2xl flex items-center justify-center">
                        <FaUser className="text-primary text-lg" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-black text-text-primary truncate">
                          {req.recipientName}
                        </h3>
                        <p className="text-text-muted text-sm truncate">
                          {req.requesterEmail}
                        </p>
                      </div>
                    </div>

                    {/* Blood Group Badge */}
                    <div className="flex justify-center">
                      <div className={`${bloodGroupColor.bg} backdrop-blur-xl ${bloodGroupColor.text} px-4 py-2 rounded-2xl flex items-center gap-2 border-0 shadow-modern-sm`}>
                        <FaTint className="text-sm" />
                        <span className="font-black text-lg">{req.bloodGroup}</span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 lg:p-7 space-y-4 flex-grow">
                    {/* Location */}
                    <div className="flex items-center gap-3 p-3 bg-bg-tertiary/50 dark:bg-bg-tertiary/30 backdrop-blur-xl rounded-2xl border-0">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 dark:from-blue-400/30 dark:to-indigo-400/30 backdrop-blur-xl rounded-xl flex items-center justify-center">
                        <FaMapMarkerAlt className="text-blue-600 dark:text-blue-400 text-sm" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-black text-text-primary text-sm">
                          {req.recipientUpazila}
                        </p>
                        <p className="text-text-secondary text-xs">
                          {req.recipientDistrict}
                        </p>
                      </div>
                    </div>

                    {/* Date */}
                    <div className="flex items-center gap-3 p-3 bg-bg-tertiary/50 dark:bg-bg-tertiary/30 backdrop-blur-xl rounded-2xl border-0">
                      <div className="w-10 h-10 bg-gradient-to-r from-green-500/20 to-emerald-500/20 dark:from-green-400/30 dark:to-emerald-400/30 backdrop-blur-xl rounded-xl flex items-center justify-center">
                        <FaCalendarAlt className="text-green-600 dark:text-green-400 text-sm" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-black text-text-primary text-sm">
                          {formatDate(req.donationDate)}
                        </p>
                        {req.donationTime && (
                          <div className="flex items-center gap-1 text-xs text-text-secondary">
                            <FaClock className="text-text-muted text-xs" />
                            <span className="text-xs">{req.donationTime}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Hospital */}
                    {req.hospitalName && (
                      <div className="flex items-center gap-3 p-3 bg-bg-tertiary/50 dark:bg-bg-tertiary/30 backdrop-blur-xl rounded-2xl border-0">
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-500/20 to-pink-500/20 dark:from-purple-400/30 dark:to-pink-400/30 backdrop-blur-xl rounded-xl flex items-center justify-center">
                          <FaStethoscope className="text-purple-600 dark:text-purple-400 text-sm" />
                        </div>
                        <p className="text-sm text-text-secondary truncate font-bold">
                          {req.hospitalName}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="p-6 lg:p-7 pt-0">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Link
                        to={`/donation-request/${req._id}`}
                        className="w-full flex items-center justify-center gap-3 py-4 bg-gradient-to-r from-primary to-red-600 hover:from-red-600 hover:to-primary backdrop-blur-xl text-white rounded-2xl font-black hover:shadow-modern-xl transition-all duration-300 border-0 shadow-modern-lg text-sm"
                      >
                        <span>View & Donate</span>
                        <FaArrowRight className="text-sm" />
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
              <div className="bg-bg-card/98 dark:bg-bg-card/95 backdrop-blur-xl rounded-3xl border-0 shadow-modern-xl dark:shadow-modern-2xl p-6">
                <div className="flex items-center gap-3">
                  <motion.button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    whileHover={{ scale: currentPage === 1 ? 1 : 1.05 }}
                    whileTap={{ scale: currentPage === 1 ? 1 : 0.95 }}
                    className="flex items-center gap-2 px-6 py-3 bg-bg-tertiary/90 dark:bg-bg-tertiary/70 backdrop-blur-xl text-text-secondary rounded-2xl font-bold hover:bg-gradient-to-r hover:from-primary/20 hover:to-red-500/20 dark:hover:from-primary/30 dark:hover:to-red-400/30 hover:text-primary transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed border-0 shadow-modern-sm hover:shadow-modern-lg"
                  >
                    <FaChevronLeft className="text-sm" />
                    <span className="hidden sm:inline">Previous</span>
                  </motion.button>

                  <div className="flex items-center gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <motion.button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`w-12 h-12 rounded-2xl font-black transition-all duration-300 border-0 ${currentPage === page
                          ? 'bg-gradient-to-r from-primary to-red-600 text-white shadow-modern-lg'
                          : 'bg-bg-tertiary/90 dark:bg-bg-tertiary/70 text-text-secondary hover:bg-gradient-to-r hover:from-primary/20 hover:to-red-500/20 dark:hover:from-primary/30 dark:hover:to-red-400/30 hover:text-primary shadow-modern-sm hover:shadow-modern-lg'
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
                    className="flex items-center gap-2 px-6 py-3 bg-bg-tertiary/90 dark:bg-bg-tertiary/70 backdrop-blur-xl text-text-secondary rounded-2xl font-bold hover:bg-gradient-to-r hover:from-primary/20 hover:to-red-500/20 dark:hover:from-primary/30 dark:hover:to-red-400/30 hover:text-primary transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed border-0 shadow-modern-sm hover:shadow-modern-lg"
                  >
                    <span className="hidden sm:inline">Next</span>
                    <FaChevronRight className="text-sm" />
                  </motion.button>
                </div>

                <div className="text-center mt-4 text-sm text-text-secondary font-medium">
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