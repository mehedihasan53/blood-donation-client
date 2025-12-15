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
      // Fetch maximum 3 recent requests (size=3)
      const res = await axiosSecure.get("/donation-requests?size=3&page=0");

      const fetchedRequests = res.data?.requests || [];
      // Sort by creation date/time if not already sorted by API
      // Since API is fetching the first 3 (page=0), we assume they are the most recent.
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

      // Update local state
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
      pending: "bg-yellow-100 text-yellow-800 border border-yellow-200",
      inprogress: "bg-blue-100 text-blue-800 border border-blue-200",
      done: "bg-green-100 text-green-800 border border-green-200",
      canceled: "bg-red-100 text-red-800 border border-red-200",
    };
    return colors[status] || "bg-gray-100 text-gray-800 border border-gray-200";
  };

  const getBloodGroupColor = (bg) => {
    const colors = {
      "A+": "bg-red-100 text-red-800 border border-red-200",
      "A-": "bg-red-50 text-red-700 border border-red-100",
      "B+": "bg-blue-100 text-blue-800 border border-blue-200",
      "B-": "bg-blue-50 text-blue-700 border border-blue-100",
      "AB+": "bg-purple-100 text-purple-800 border border-purple-200",
      "AB-": "bg-purple-50 text-purple-700 border border-purple-100",
      "O+": "bg-green-100 text-green-800 border border-green-200",
      "O-": "bg-green-50 text-green-700 border border-green-100",
    };
    return colors[bg] || "bg-gray-100 text-gray-700 border border-gray-200";
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Not set";
    try {
      // Attempt to parse and format the date part only (to handle potential ISO string time)
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
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <FaSpinner className="animate-spin text-red-600 text-4xl" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <Toaster />

      <div className="max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="mb-8 p-4 bg-white shadow-md rounded-xl border-l-4 border-red-600">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">
            Welcome back, {user?.displayName || "Donor"}! 👋
          </h1>
          <p className="text-gray-600 text-lg">
            Here's a quick overview of your **recent donation requests**.
          </p>
        </div>

        {/* Recent Requests Section */}
        {requests.length > 0 ? (
          <div className="space-y-8">
            <div className="flex justify-between items-center border-b pb-3 mb-4">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <FaTint className="text-red-600" /> Maximum 3 Recent Requests
              </h2>
            </div>

            {/* --- Desktop Table View --- */}
            <div className="hidden md:block bg-white rounded-2xl shadow-xl overflow-x-auto border border-gray-100">
              <table className="min-w-full divide-y divide-gray-100">
                <thead className="bg-red-50">
                  <tr>
                    <th className="p-4 text-left text-sm font-semibold text-gray-700">
                      Recipient
                    </th>
                    <th className="p-4 text-left text-sm font-semibold text-gray-700">
                      Location
                    </th>
                    <th className="p-4 text-left text-sm font-semibold text-gray-700">
                      Date & Time
                    </th>
                    <th className="p-4 text-center text-sm font-semibold text-gray-700">
                      Blood Group
                    </th>
                    <th className="p-4 text-center text-sm font-semibold text-gray-700">
                      Status
                    </th>
                    <th className="p-4 text-center text-sm font-semibold text-gray-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {requests.map((req) => (
                    <tr
                      key={req._id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="p-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <FaUser className="text-red-600 text-xl" />
                          <div>
                            <p className="font-medium text-gray-900">
                              {req.recipientName || "Not specified"}
                            </p>
                            {/* Donor Info for In Progress status */}
                            {req.status === "inprogress" && (
                              <p className="text-xs text-blue-600 mt-1 font-medium">
                                Donor: {req.donorName || "N/A"} (
                                {req.donorEmail || "N/A"})
                              </p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="p-4 whitespace-nowrap">
                        <div className="flex items-center gap-2 text-gray-700 text-sm">
                          <FaMapMarkerAlt className="text-gray-400" />
                          <span>
                            {req.recipientUpazila || "N/A"},{" "}
                            {req.recipientDistrict || "N/A"}
                          </span>
                        </div>
                      </td>
                      <td className="p-4 whitespace-nowrap text-sm text-gray-700">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <FaCalendarAlt className="text-gray-400" />
                            <span>{formatDate(req.donationDate)}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <FaClock className="text-gray-400" />
                            <span>{req.donationTime || "Not set"}</span>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <span
                          className={`px-3 py-1.5 rounded-xl text-sm font-bold ${getBloodGroupColor(
                            req.bloodGroup
                          )}`}
                        >
                          {req.bloodGroup || "N/A"}
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        <span
                          className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize ${getStatusColor(
                            req.status
                          )}`}
                        >
                          {req.status || "pending"}
                        </span>
                      </td>
                      <td className="p-4 text-center whitespace-nowrap">
                        <div className="flex items-center justify-center gap-2">
                          {/* View Button */}
                          <Link
                            to={`/dashboard/donation-request/${req._id}`}
                            className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition"
                            title="View Details"
                          >
                            <FaEye />
                          </Link>

                          {/* Edit Button (Visible always, but may be restricted on edit page) */}
                          <Link
                            to={`/dashboard/edit-request/${req._id}`}
                            className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition"
                            title="Edit Request"
                          >
                            <FaEdit />
                          </Link>

                          {/* Delete Button */}
                          <button
                            onClick={() => handleDelete(req._id)}
                            className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition"
                            title="Delete Request"
                            disabled={updatingStatus}
                          >
                            <FaTrash />
                          </button>

                          {/* Done/Cancel Buttons (Only for In Progress) */}
                          {req.status === "inprogress" && (
                            <div className="flex gap-2 ml-3">
                              <button
                                onClick={() => updateStatus(req._id, "done")}
                                className="px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm font-medium flex items-center gap-1 disabled:opacity-50"
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
                                className="px-3 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm font-medium flex items-center gap-1 disabled:opacity-50"
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
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* --- Mobile Card View --- */}
            <div className="md:hidden space-y-4">
              {requests.map((req) => (
                <div
                  key={req._id}
                  className="bg-white rounded-xl shadow border border-gray-200 p-5"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-lg text-gray-900">
                        {req.recipientName || "Not specified"}
                      </h3>
                      {req.status === "inprogress" && (
                        <p className="text-xs text-blue-600 font-medium mt-1">
                          Donor: {req.donorName || "N/A"} (
                          {req.donorEmail || "N/A"})
                        </p>
                      )}
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(
                        req.status
                      )}`}
                    >
                      {req.status || "pending"}
                    </span>
                  </div>

                  <div className="space-y-3 mb-4 text-sm text-gray-700">
                    <div className="flex items-center">
                      <FaMapMarkerAlt className="w-4 h-4 mr-2 text-red-500" />
                      <span>
                        {req.recipientUpazila || "N/A"},{" "}
                        {req.recipientDistrict || "N/A"}
                      </span>
                    </div>

                    <div className="flex items-center">
                      <FaCalendarAlt className="w-4 h-4 mr-2 text-red-500" />
                      <span>
                        {formatDate(req.donationDate)} at{" "}
                        {req.donationTime || "Not set"}
                      </span>
                    </div>

                    <div className="flex items-center">
                      <FaTint className="w-4 h-4 mr-2 text-red-500" />
                      <span
                        className={`px-2 py-1 rounded-lg text-xs font-bold ${getBloodGroupColor(
                          req.bloodGroup
                        )}`}
                      >
                        {req.bloodGroup || "N/A"}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 pt-4 border-t border-gray-100">
                    <div className="flex gap-2 justify-center sm:justify-start">
                      {/* Action buttons group */}
                      <Link
                        to={`/dashboard/donation-request/${req._id}`}
                        className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg"
                        title="View Details"
                      >
                        <FaEye />
                      </Link>
                      <Link
                        to={`/dashboard/edit-request/${req._id}`}
                        className="p-2 text-green-600 hover:bg-green-100 rounded-lg"
                        title="Edit Request"
                      >
                        <FaEdit />
                      </Link>
                      <button
                        onClick={() => handleDelete(req._id)}
                        className="p-2 text-red-600 hover:bg-red-100 rounded-lg"
                        title="Delete Request"
                        disabled={updatingStatus}
                      >
                        <FaTrash />
                      </button>
                    </div>

                    {/* Done/Cancel buttons group */}
                    {req.status === "inprogress" && (
                      <div className="flex gap-2 justify-center sm:justify-start">
                        <button
                          onClick={() => updateStatus(req._id, "done")}
                          className="flex-1 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium disabled:opacity-50"
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
                          className="flex-1 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm font-medium disabled:opacity-50"
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
                </div>
              ))}
            </div>

            {/* View All Requests Button */}
            <div className="text-center mt-8">
              <Link
                to="/dashboard/donation-requests"
                className="inline-flex items-center px-6 py-3 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition-all duration-300 shadow-md hover:shadow-lg text-lg"
              >
                <FaEye className="mr-2" /> View My All Requests
              </Link>
            </div>
          </div>
        ) : (
          /* Hidden Section - No Requests */
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaTint className="text-3xl text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                No Donation Requests Yet
              </h3>
              <p className="text-gray-600 mb-8">
                You haven't created any donation requests yet. Start by creating
                your first request to help someone in need.
              </p>
              <Link
                to="/dashboard/create-request"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Create Your First Request
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DonorDashboard;
