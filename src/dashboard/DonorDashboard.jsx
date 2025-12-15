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


      // Check response structure
      const fetchedRequests = res.data?.request || res.data?.requests || [];
      setRequests(fetchedRequests);

      if (fetchedRequests.length === 0) {
        console.log("No requests found for user");
      }
    } catch (err) {
      console.error("Failed to load requests", err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    setUpdatingStatus(true);
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
    } catch (err) {
      console.error("Status update failed", err);
      alert("Failed to update status");
    } finally {
      setUpdatingStatus(false);
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this request?"
    );
    if (!confirm) return;

    try {
      await axiosSecure.delete(`/donation-requests/${id}`);
      setRequests((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      console.error("Delete failed", err);
      alert("Failed to delete request");
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
      return new Date(dateString).toLocaleDateString("en-US", {
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
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Welcome back, {user?.displayName || "Donor"}! 👋
          </h1>
          <p className="text-gray-600 text-lg">
            Here's a quick overview of your recent donation activities.
          </p>
        </div>
        {/* Quick Stats */}
        {requests.length > 0 && (
          <div className="my-12 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-6 border border-yellow-200">
              <div className="text-2xl font-bold text-yellow-700">
                {requests.filter((r) => r.status === "pending").length}
              </div>
              <div className="text-sm font-medium text-yellow-800">Pending</div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
              <div className="text-2xl font-bold text-blue-700">
                {requests.filter((r) => r.status === "inprogress").length}
              </div>
              <div className="text-sm font-medium text-blue-800">
                In Progress
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
              <div className="text-2xl font-bold text-green-700">
                {requests.filter((r) => r.status === "done").length}
              </div>
              <div className="text-sm font-medium text-green-800">
                Completed
              </div>
            </div>
            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-6 border border-red-200">
              <div className="text-2xl font-bold text-red-700">
                {requests.filter((r) => r.status === "canceled").length}
              </div>
              <div className="text-sm font-medium text-red-800">Canceled</div>
            </div>
          </div>
        )}

        {/* Recent Requests Section */}
        {requests.length > 0 ? (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">
                Recent Donation Requests
              </h2>
              <span className="text-sm text-gray-500">
                Showing {requests.length} recent requests
              </span>
            </div>

            {/* Desktop Table */}
            <div className="hidden md:block bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
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
                    <th className="p-4 text-left text-sm font-semibold text-gray-700">
                      Blood Group
                    </th>
                    <th className="p-4 text-left text-sm font-semibold text-gray-700">
                      Status
                    </th>
                    <th className="p-4 text-left text-sm font-semibold text-gray-700">
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
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                            <FaUser className="text-red-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              {req.recipientName || "Not specified"}
                            </p>
                            {req.status === "inprogress" && (
                              <div className="mt-1">
                                <p className="text-xs text-gray-500">
                                  Donor: {req.requesterEmail || "Not specified"}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2 text-gray-700">
                          <FaMapMarkerAlt className="text-gray-400" />
                          <span>
                            {req.recipientUpazila || "N/A"},{" "}
                            {req.recipientDistrict || "N/A"}
                          </span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <FaCalendarAlt className="text-gray-400" />
                            <span>{formatDate(req.donationDate)}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <FaClock className="text-gray-400" />
                            <span>{req.donationTime || "Not set"}</span>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-3 py-1.5 rounded-full text-sm font-bold ${getBloodGroupColor(
                            req.bloodGroup
                          )}`}
                        >
                          {req.bloodGroup || "Not specified"}
                        </span>
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-3 py-1.5 rounded-full text-sm font-medium capitalize ${getStatusColor(
                            req.status
                          )}`}
                        >
                          {req.status || "pending"}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <Link
                            to={`/dashboard/donation-request/${req._id}`}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                            title="View Details"
                          >
                            <FaEye />
                          </Link>

                          <Link
                            to={`/dashboard/edit-request/${req._id}`}
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition"
                            title="Edit Request"
                          >
                            <FaEdit />
                          </Link>

                          <button
                            onClick={() => handleDelete(req._id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                            title="Delete Request"
                            disabled={updatingStatus}
                          >
                            <FaTrash />
                          </button>

                          {req.status === "inprogress" && (
                            <div className="flex gap-2">
                              <button
                                onClick={() => updateStatus(req._id, "done")}
                                className="px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm font-medium flex items-center gap-1 disabled:opacity-50"
                                disabled={updatingStatus}
                              >
                                {updatingStatus ? (
                                  <FaSpinner className="animate-spin" />
                                ) : (
                                  <FaCheckCircle />
                                )}
                                {updatingStatus ? "Updating..." : "Done"}
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
                                )}
                                {updatingStatus ? "Updating..." : "Cancel"}
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

            {/* Mobile Cards */}
            <div className="md:hidden space-y-4">
              {requests.map((req) => (
                <div
                  key={req._id}
                  className="bg-white rounded-xl shadow border border-gray-200 p-5"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-gray-900">
                        {req.recipientName || "Not specified"}
                      </h3>
                      {req.status === "inprogress" && (
                        <p className="text-sm text-gray-500">
                          Donor: {req.requesterEmail || "Not specified"}
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

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center text-gray-700">
                      <FaMapMarkerAlt className="w-4 h-4 mr-2 text-gray-400" />
                      <span className="text-sm">
                        {req.recipientUpazila || "N/A"},{" "}
                        {req.recipientDistrict || "N/A"}
                      </span>
                    </div>

                    <div className="flex items-center text-gray-700">
                      <FaCalendarAlt className="w-4 h-4 mr-2 text-gray-400" />
                      <span className="text-sm">
                        {formatDate(req.donationDate)}
                      </span>
                    </div>

                    <div className="flex items-center text-gray-700">
                      <FaClock className="w-4 h-4 mr-2 text-gray-400" />
                      <span className="text-sm">
                        {req.donationTime || "Not set"}
                      </span>
                    </div>

                    <div className="flex items-center">
                      <FaTint className="w-4 h-4 mr-2 text-red-500" />
                      <span
                        className={`px-2 py-1 rounded text-xs font-bold ${getBloodGroupColor(
                          req.bloodGroup
                        )}`}
                      >
                        {req.bloodGroup || "Not specified"}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-4 border-t border-gray-100">
                    <div className="flex gap-2">
                      <Link
                        to={`/dashboard/donation-request/${req._id}`}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                      >
                        <FaEye />
                      </Link>
                      <Link
                        to={`/dashboard/edit-request/${req._id}`}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
                      >
                        <FaEdit />
                      </Link>
                      <button
                        onClick={() => handleDelete(req._id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                        disabled={updatingStatus}
                      >
                        <FaTrash />
                      </button>
                    </div>

                    {req.status === "inprogress" && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => updateStatus(req._id, "done")}
                          className="px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 text-xs font-medium disabled:opacity-50"
                          disabled={updatingStatus}
                        >
                          {updatingStatus ? "Updating..." : "Done"}
                        </button>
                        <button
                          onClick={() => updateStatus(req._id, "canceled")}
                          className="px-3 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 text-xs font-medium disabled:opacity-50"
                          disabled={updatingStatus}
                        >
                          {updatingStatus ? "Updating..." : "Cancel"}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
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
