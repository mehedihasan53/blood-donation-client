import React, { useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Loading from "../components/shared/Loading";
import { MdLocationOn, MdBloodtype, MdAccessTime } from "react-icons/md";

const MyDonationRequest = () => {
  const axiosSecure = useAxiosSecure();
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const res = await axiosSecure.get("/donation-requests");
      if (res.data?.requests) {
        setRequests(res.data.requests);
        setFilteredRequests(res.data.requests);
      }
    } catch (error) {
      console.error("Error fetching donation requests:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  useEffect(() => {
    setFilteredRequests(
      statusFilter === "all"
        ? requests
        : requests.filter((r) => r.status === statusFilter)
    );
  }, [statusFilter, requests]);

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  const getStatusStyles = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-50 text-yellow-700 border border-yellow-100";
      case "inprogress":
        return "bg-blue-50 text-blue-700 border border-blue-100";
      case "done":
        return "bg-green-50 text-green-700 border border-green-100";
      case "canceled":
        return "bg-red-50 text-red-700 border border-red-100";
      default:
        return "bg-gray-50 text-gray-700 border border-gray-100";
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen p-4 md:p-6 bg-gray-50">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        My Donation Requests
      </h1>

      <div className="mb-6 flex gap-2 flex-wrap">
        {["all", "pending", "inprogress", "done", "canceled"].map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${
              statusFilter === status
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* No requests */}
      {filteredRequests.length === 0 && (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-12 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-12 h-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">
              No Donation Requests
            </h3>
            <p className="text-gray-600 mb-8">
              There are currently no donation requests available. Check back
              later or create a new request.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-medium rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Refresh Requests
            </button>
          </div>
        </div>
      )}

      {/* Table view for md+ */}
      <div className="hidden md:block space-y-3">
        {filteredRequests.map((r) => (
          <div
            key={r._id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 p-5"
          >
            <div className="grid grid-cols-5 gap-4 items-center">
              <div>
                <p className="font-semibold text-gray-900">{r.recipientName}</p>
                <p className="text-xs text-gray-500 mt-1">{r.requesterEmail}</p>
              </div>
              <div>
                <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-bold bg-gradient-to-r from-red-500 to-red-600 text-white">
                  {r.bloodGroup}
                </span>
              </div>
              <div>
                <p className="text-gray-700">
                  {r.recipientUpazila}, {r.recipientDistrict}
                </p>
                {r.hospitalName && (
                  <p className="text-xs text-gray-500 mt-1 truncate">
                    {r.hospitalName}
                  </p>
                )}
              </div>
              <div>
                <p className="font-medium text-gray-900">
                  {formatDate(r.donationDate)}
                </p>
                {r.donationTime && (
                  <p className="text-sm text-gray-600">{r.donationTime}</p>
                )}
              </div>
              <div>
                <span
                  className={`px-3 py-1.5 rounded-full text-xs font-bold capitalize ${getStatusStyles(
                    r.status
                  )}`}
                >
                  {r.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Card view for mobile */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {filteredRequests.map((r) => (
          <div
            key={r._id}
            className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg border border-gray-200 p-5 hover:shadow-xl transition-all"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 line-clamp-1">
                  {r.recipientName}
                </h3>
                <p className="text-sm text-gray-500 line-clamp-1">
                  {r.requesterEmail}
                </p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className="px-3 py-1 rounded-full text-sm font-bold bg-gradient-to-r from-red-500 to-red-600 text-white">
                  {r.bloodGroup}
                </span>
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${getStatusStyles(
                    r.status
                  )}`}
                >
                  {r.status}
                </span>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                  <MdLocationOn className="text-red-600 text-lg" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Location</p>
                  <p className="text-sm font-medium">
                    {r.recipientUpazila}, {r.recipientDistrict}
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                  <MdAccessTime className="text-blue-600 text-lg" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Date & Time</p>
                  <p className="text-sm font-medium">
                    {formatDate(r.donationDate)}{" "}
                    {r.donationTime ? `• ${r.donationTime}` : ""}
                  </p>
                </div>
              </div>
            </div>

            {r.hospitalName && (
              <div className="pt-3 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">🏥</span> {r.hospitalName}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyDonationRequest;
