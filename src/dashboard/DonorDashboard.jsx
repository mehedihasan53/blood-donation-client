import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../Provider/AuthProvider";
import useAxiosSecure from "../hooks/useAxiosSecure";
import {
  FaTint,
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaUser,
  FaEye,
  FaEdit,
  FaTrash,
  FaCheckCircle,
  FaTimesCircle,
  FaSpinner,
} from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import Loading from "../components/shared/Loading";
import DynamicTitle from "../components/shared/DynamicTitle";
import { motion } from "framer-motion";
import { Card } from "../components/ui/Card";

const DonorDashboard = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  useEffect(() => {
    fetchRecentRequests();
  }, []);

  const fetchRecentRequests = async () => {
    try {
      const res = await axiosSecure.get("/donation-requests?size=3&page=0");
      const fetchedRequests = res.data?.requests || [];
      setRequests(fetchedRequests);
    } catch (err) {
      console.error("Failed to load requests", err);
      toast.error("Failed to load recent requests.");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    setUpdatingStatus(true);
    const toastId = toast.loading(`Updating status to ${status}...`);

    try {
      await axiosSecure.patch(`/donation-requests/${id}`, { status });
      setRequests((prev) =>
        prev.map((r) => {
          if (r._id === id) {
            return { ...r, status };
          }
          return r;
        })
      );
      toast.success(`Status updated to ${status}.`, { id: toastId });
    } catch (err) {
      console.error("Status update failed", err);
      toast.error("Failed to update status.", { id: toastId });
    } finally {
      setUpdatingStatus(false);
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this request?"
    );
    if (!confirm) return;

    const toastId = toast.loading("Deleting request...");
    try {
      await axiosSecure.delete(`/donation-requests/${id}`);
      setRequests((prev) => prev.filter((r) => r._id !== id));
      toast.success("Request deleted successfully.", { id: toastId });
    } catch (err) {
      console.error("Delete failed", err);
      toast.error("Failed to delete request.", { id: toastId });
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 border border-yellow-200 dark:border-yellow-700",
      inprogress: "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-700",
      done: "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border border-green-200 dark:border-green-700",
      canceled: "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 border border-red-200 dark:border-red-700",
    };
    return colors[status] || "bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-300 border border-gray-200 dark:border-gray-700";
  };

  const getBloodGroupColor = (bg) => {
    const colors = {
      "A+": "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 border border-red-200 dark:border-red-700",
      "A-": "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 border border-red-100 dark:border-red-800",
      "B+": "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-700",
      "B-": "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-800",
      "AB+": "bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 border border-purple-200 dark:border-purple-700",
      "AB-": "bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 border border-purple-100 dark:border-purple-800",
      "O+": "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border border-green-200 dark:border-green-700",
      "O-": "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border border-green-100 dark:border-green-800",
    };
    return colors[bg] || "bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700";
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Not set";
    try {
      const dateOnly = dateString.split("T")[0];
      return new Date(dateOnly).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="dashboard-container container-safe bg-bg-secondary/50 dark:bg-bg-secondary/30 space-y-compact">
      <DynamicTitle title="Donor Dashboard" />
      <Toaster />

      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="bg-bg-card/95 dark:bg-bg-card/90 backdrop-blur-xl shadow-modern-md dark:shadow-modern-lg border border-border-primary/30 dark:border-border-primary/40 border-l-4 border-l-red-600 dark:border-l-red-500">
          <div className="p-4 sm:p-5">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-text-primary mb-2">
              Welcome back,{" "}
              <span className="text-red-600 dark:text-red-400">{user?.displayName || "Donor"}</span>
            </h1>
            <p className="text-text-secondary text-sm sm:text-base">
              Here's a quick overview of your recent donation requests.
            </p>
          </div>
        </Card>
      </motion.div>

      {requests.length > 0 ? (
        <div className="space-y-compact">
          <div className="flex justify-between items-center border-b border-border-primary/30 dark:border-border-primary/40 pb-2 mb-3">
            <h2 className="text-lg sm:text-xl font-bold text-text-primary flex items-center gap-2">
              <FaTint className="text-red-600 dark:text-red-400" /> Recent 3 Requests
            </h2>
          </div>

          {/* Desktop Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden md:block bg-bg-card/95 dark:bg-bg-card/90 backdrop-blur-xl rounded-2xl shadow-lg dark:shadow-2xl overflow-x-auto border border-border-primary/30 dark:border-border-primary/40"
          >
            <table className="min-w-full divide-y divide-border-primary/30 dark:divide-border-primary/40">
              <thead className="bg-red-50/80 dark:bg-red-900/20 backdrop-blur-sm">
                <tr>
                  <th className="p-4 text-left text-sm font-semibold text-text-primary">
                    Recipient
                  </th>
                  <th className="p-4 text-left text-sm font-semibold text-text-primary">
                    Location
                  </th>
                  <th className="p-4 text-left text-sm font-semibold text-text-primary">
                    Date & Time
                  </th>
                  <th className="p-4 text-center text-sm font-semibold text-text-primary">
                    Blood Group
                  </th>
                  <th className="p-4 text-center text-sm font-semibold text-text-primary">
                    Status
                  </th>
                  <th className="p-4 text-center text-sm font-semibold text-text-primary">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-primary/20 dark:divide-border-primary/30">
                {requests.map((req, index) => (
                  <motion.tr
                    key={req._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="hover:bg-bg-tertiary/30 dark:hover:bg-bg-tertiary/20 transition-colors"
                  >
                    <td className="p-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <FaUser className="text-red-600 dark:text-red-400 text-xl" />
                        <div>
                          <p className="font-medium text-text-primary">
                            {req.recipientName || "Not specified"}
                          </p>
                          {req.status === "inprogress" && (
                            <p className="text-xs text-blue-600 dark:text-blue-400 mt-1 font-medium">
                              Donor: {req.donorName || "N/A"} (
                              {req.donorEmail || "N/A"})
                            </p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      <div className="flex items-center gap-2 text-text-secondary text-sm">
                        <FaMapMarkerAlt className="text-text-muted" />
                        <span>
                          {req.recipientUpazila || "N/A"},{" "}
                          {req.recipientDistrict || "N/A"}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 whitespace-nowrap text-sm text-text-secondary">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <FaCalendarAlt className="text-text-muted" />
                          <span>{formatDate(req.donationDate)}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-text-muted">
                          <FaClock className="text-text-muted" />
                          <span>{req.donationTime || "Not set"}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <span
                        className={`px-3 py-1.5 rounded-xl text-sm font-bold backdrop-blur-sm ${getBloodGroupColor(
                          req.bloodGroup
                        )}`}
                      >
                        {req.bloodGroup || "N/A"}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <span
                        className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize backdrop-blur-sm ${getStatusColor(
                          req.status
                        )}`}
                      >
                        {req.status || "pending"}
                      </span>
                    </td>
                    <td className="p-4 text-center whitespace-nowrap">
                      <div className="flex items-center justify-center gap-2">
                        <Link
                          to={`/donation-request/${req._id}`}
                          className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition"
                          title="View Details"
                        >
                          <FaEye />
                        </Link>

                        <Link
                          to={`/dashboard/edit-request/${req._id}`}
                          className="p-2 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30 rounded-lg transition"
                          title="Edit Request"
                        >
                          <FaEdit />
                        </Link>

                        <button
                          onClick={() => handleDelete(req._id)}
                          className="p-2 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition"
                          title="Delete Request"
                          disabled={updatingStatus}
                        >
                          <FaTrash />
                        </button>

                        {req.status === "inprogress" && (
                          <div className="flex gap-2 ml-3">
                            <button
                              onClick={() => updateStatus(req._id, "done")}
                              className="px-3 py-1.5 bg-green-600 dark:bg-green-700 text-white rounded-lg hover:bg-green-700 dark:hover:bg-green-800 transition text-sm font-medium flex items-center gap-1 disabled:opacity-50"
                              disabled={updatingStatus}
                            >
                              {updatingStatus ? (
                                <FaSpinner className="animate-spin" />
                              ) : (
                                <FaCheckCircle />
                              )}{" "}
                              Done
                            </button>
                            <button
                              onClick={() =>
                                updateStatus(req._id, "canceled")
                              }
                              className="px-3 py-1.5 bg-red-600 dark:bg-red-700 text-white rounded-lg hover:bg-red-700 dark:hover:bg-red-800 transition text-sm font-medium flex items-center gap-1 disabled:opacity-50"
                              disabled={updatingStatus}
                            >
                              {updatingStatus ? (
                                <FaSpinner className="animate-spin" />
                              ) : (
                                <FaTimesCircle />
                              )}{" "}
                              Cancel
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4">
            {requests.map((req, index) => (
              <motion.div
                key={req._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-bg-card/95 dark:bg-bg-card/90 backdrop-blur-xl rounded-2xl shadow-lg dark:shadow-2xl border border-border-primary/30 dark:border-border-primary/40 p-5"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-lg text-text-primary">
                      {req.recipientName || "Not specified"}
                    </h3>
                    {req.status === "inprogress" && (
                      <p className="text-xs text-blue-600 dark:text-blue-400 font-medium mt-1">
                        Donor: {req.donorName || "N/A"} (
                        {req.donorEmail || "N/A"})
                      </p>
                    )}
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium capitalize backdrop-blur-sm ${getStatusColor(
                      req.status
                    )}`}
                  >
                    {req.status || "pending"}
                  </span>
                </div>

                <div className="space-y-3 mb-4 text-sm text-text-secondary">
                  <div className="flex items-center">
                    <FaMapMarkerAlt className="w-4 h-4 mr-2 text-red-500 dark:text-red-400" />
                    <span>
                      {req.recipientUpazila || "N/A"},{" "}
                      {req.recipientDistrict || "N/A"}
                    </span>
                  </div>

                  <div className="flex items-center">
                    <FaCalendarAlt className="w-4 h-4 mr-2 text-red-500 dark:text-red-400" />
                    <span>
                      {formatDate(req.donationDate)} at{" "}
                      {req.donationTime || "Not set"}
                    </span>
                  </div>

                  <div className="flex items-center">
                    <FaTint className="w-4 h-4 mr-2 text-red-500 dark:text-red-400" />
                    <span
                      className={`px-2 py-1 rounded-lg text-xs font-bold backdrop-blur-sm ${getBloodGroupColor(
                        req.bloodGroup
                      )}`}
                    >
                      {req.bloodGroup || "N/A"}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-3 pt-4 border-t border-border-primary/30 dark:border-border-primary/40">
                  <div className="flex gap-2 justify-center sm:justify-start">
                    <Link
                      to={`/donation-request/${req._id}`}
                      className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg"
                      title="View Details"
                    >
                      <FaEye />
                    </Link>
                    <Link
                      to={`/dashboard/edit-request/${req._id}`}
                      className="p-2 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30 rounded-lg"
                      title="Edit Request"
                    >
                      <FaEdit />
                    </Link>
                    <button
                      onClick={() => handleDelete(req._id)}
                      className="p-2 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg"
                      title="Delete Request"
                      disabled={updatingStatus}
                    >
                      <FaTrash />
                    </button>
                  </div>

                  {req.status === "inprogress" && (
                    <div className="flex gap-2 justify-center sm:justify-start">
                      <button
                        onClick={() => updateStatus(req._id, "done")}
                        className="flex-1 px-3 py-2 bg-green-600 dark:bg-green-700 text-white rounded-lg hover:bg-green-700 dark:hover:bg-green-800 text-sm font-medium disabled:opacity-50 flex items-center justify-center"
                        disabled={updatingStatus}
                      >
                        {updatingStatus ? (
                          <FaSpinner className="animate-spin w-4 h-4 mr-1" />
                        ) : (
                          <FaCheckCircle className="w-4 h-4 mr-1" />
                        )}{" "}
                        Done
                      </button>
                      <button
                        onClick={() => updateStatus(req._id, "canceled")}
                        className="flex-1 px-3 py-2 bg-red-600 dark:bg-red-700 text-white rounded-lg hover:bg-red-700 dark:hover:bg-red-800 text-sm font-medium disabled:opacity-50 flex items-center justify-center"
                        disabled={updatingStatus}
                      >
                        {updatingStatus ? (
                          <FaSpinner className="animate-spin w-4 h-4 mr-1" />
                        ) : (
                          <FaTimesCircle className="w-4 h-4 mr-1" />
                        )}{" "}
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center mt-8"
          >
            <Link
              to="/dashboard/donation-requests"
              className="inline-flex items-center px-6 py-3 bg-red-600 dark:bg-red-700 text-white font-semibold rounded-xl hover:bg-red-700 dark:hover:bg-red-800 transition-all duration-300 shadow-lg hover:shadow-xl text-lg"
            >
              <FaEye className="mr-2" /> View My All Requests
            </Link>
          </motion.div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaTint className="text-3xl text-red-600 dark:text-red-400" />
              </div>
              <h3 className="text-2xl font-bold text-text-primary mb-3">
                No Donation Requests Yet
              </h3>
              <p className="text-text-secondary mb-8">
                You haven't created any donation requests yet. Start by creating
                your first request to help someone in need.
              </p>
              <Link
                to="/dashboard/create-request"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 dark:from-red-600 dark:to-red-700 text-white font-semibold rounded-xl hover:from-red-600 hover:to-red-700 dark:hover:from-red-700 dark:hover:to-red-800 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Create Your First Request
              </Link>
            </div>
          </Card>
        </motion.div>
      )}
    </div>
  );
};

export default DonorDashboard;
