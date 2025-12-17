import React, { useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import {
  FaUser,
  FaSpinner,
  FaEye,
  FaEdit,
  FaTrashAlt,
  FaCheckCircle,
} from "react-icons/fa";
import { format } from "date-fns";
import toast, { Toaster } from "react-hot-toast";
import Loading from "../components/shared/Loading";
import DynamicTitle from "../components/shared/DynamicTitle";

const MyDonationRequests = () => {
  const axiosSecure = useAxiosSecure();

  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [modalData, setModalData] = useState({ request: null, isEdit: false });
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 8;

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await axiosSecure.get("/donation-requests");
      setRequests(res.data?.requests || []);
      setFilteredRequests(res.data?.requests || []);
    } catch {
      toast.error("Failed to fetch requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const filtered =
      statusFilter === "all"
        ? requests
        : requests.filter((r) => r.status === statusFilter);
    setFilteredRequests(filtered);
    setCurrentPage(1);
  }, [statusFilter, requests]);

  const updateStatus = async (id, status) => {
    try {
      await axiosSecure.patch(`/donation-requests/${id}`, { status });
      setRequests((prev) =>
        prev.map((r) => (r._id === id ? { ...r, status } : r))
      );
      toast.success("Status updated");
    } catch {
      toast.error("Update failed");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this request?")) return;
    try {
      await axiosSecure.delete(`/donation-requests/${id}`);
      setRequests((prev) => prev.filter((r) => r._id !== id));
      toast.success("Deleted");
    } catch {
      toast.error("Delete failed");
    }
  };

  const handleUpdateSubmit = async (updatedData) => {
    try {
      await axiosSecure.patch(
        `/donation-requests/${modalData.request._id}`,
        updatedData
      );
      setRequests((prev) =>
        prev.map((r) =>
          r._id === modalData.request._id ? { ...r, ...updatedData } : r
        )
      );
      setModalData({ request: null, isEdit: false });
      toast.success("Updated");
    } catch {
      toast.error("Update failed");
    }
  };

  if (loading) return <Loading />;

  const totalPages = Math.ceil(filteredRequests.length / pageSize);
  const paginatedRequests = filteredRequests.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const StatusBadge = ({ status }) => {
    const styles = {
      pending: "bg-amber-50 text-amber-700 border border-amber-200",
      inprogress: "bg-blue-50 text-blue-700 border border-blue-200",
      done: "bg-emerald-50 text-emerald-700 border border-emerald-200",
      canceled: "bg-rose-50 text-rose-700 border border-rose-200",
    };
    return (
      <span
        className={`px-3 py-1 rounded-xl text-sm font-medium capitalize ${
          styles[status] || "bg-gray-50"
        }`}
      >
        {status}
      </span>
    );
  };

  const BloodGroupBadge = ({ bloodGroup }) => {
    const styles = {
      "A+": "bg-red-50 text-red-700 border border-red-200",
      "A-": "bg-red-50/50 text-red-600 border border-red-100",
      "B+": "bg-blue-50 text-blue-700 border border-blue-200",
      "B-": "bg-blue-50/50 text-blue-600 border border-blue-100",
      "AB+": "bg-purple-50 text-purple-700 border border-purple-200",
      "AB-": "bg-purple-50/50 text-purple-600 border border-purple-100",
      "O+": "bg-emerald-50 text-emerald-700 border border-emerald-200",
      "O-": "bg-emerald-50/50 text-emerald-600 border border-emerald-100",
    };
    return (
      <span
        className={`px-4 py-2 rounded-xl font-bold ${
          styles[bloodGroup] || "bg-gray-50"
        }`}
      >
        {bloodGroup}
      </span>
    );
  };

  const FilterButtons = ({ statusFilter, setStatusFilter, requests }) => {
    const filters = [
      { label: "All", value: "all", count: requests.length },
      {
        label: "Pending",
        value: "pending",
        count: requests.filter((r) => r.status === "pending").length,
      },
      {
        label: "In Progress",
        value: "inprogress",
        count: requests.filter((r) => r.status === "inprogress").length,
      },
      {
        label: "Completed",
        value: "done",
        count: requests.filter((r) => r.status === "done").length,
      },
      {
        label: "Canceled",
        value: "canceled",
        count: requests.filter((r) => r.status === "canceled").length,
      },
    ];

    return (
      <div className="flex flex-wrap gap-2 mb-6">
        {filters.map(({ label, value, count }) => (
          <button
            key={value}
            onClick={() => setStatusFilter(value)}
            className={`px-4 py-2 rounded-lg text-sm transition-colors ${
              statusFilter === value
                ? "bg-red-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {label} ({count})
          </button>
        ))}
      </div>
    );
  };

  const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
    if (totalPages <= 1) return null;

    return (
      <div className="flex justify-center gap-2 mt-6">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
          className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-300 transition-colors"
        >
          Prev
        </button>
        {[...Array(totalPages)].map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentPage(idx + 1)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              currentPage === idx + 1
                ? "bg-red-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {idx + 1}
          </button>
        ))}
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
          className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-300 transition-colors"
        >
          Next
        </button>
      </div>
    );
  };

  const RequestModal = ({ request, isEdit, onClose, onUpdate }) => {
    if (!request) return null;

    const handleSubmit = (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const updatedData = Object.fromEntries(formData);
      onUpdate(updatedData);
    };

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl w-full max-w-md p-6 max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-4 border-b pb-2">
            <h3 className="text-2xl font-extrabold text-red-600">
              {isEdit ? "Edit Request" : "Request Details"}
            </h3>
            <button
              onClick={onClose}
              className="text-3xl text-gray-500 hover:text-gray-900 transition-colors"
            >
              &times;
            </button>
          </div>

          {isEdit ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                name="recipientName"
                defaultValue={request.recipientName}
                className="w-full border p-3 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Recipient Name"
                required
              />
              <input
                name="recipientUpazila"
                defaultValue={request.recipientUpazila}
                className="w-full border p-3 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Upazila"
                required
              />
              <input
                name="recipientDistrict"
                defaultValue={request.recipientDistrict}
                className="w-full border p-3 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="District"
                required
              />
              <input
                type="date"
                name="donationDate"
                defaultValue={request.donationDate?.split("T")[0]}
                className="w-full border p-3 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                required
              />
              <input
                type="time"
                name="donationTime"
                defaultValue={request.donationTime}
                className="w-full border p-3 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                required
              />
              <select
                name="bloodGroup"
                defaultValue={request.bloodGroup}
                className="w-full border p-3 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                required
              >
                {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                  (bg) => (
                    <option key={bg}>{bg}</option>
                  )
                )}
              </select>
              <select
                name="status"
                defaultValue={request.status}
                className="w-full border p-3 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                required
              >
                {["pending", "inprogress", "done", "canceled"].map((st) => (
                  <option key={st}>{st}</option>
                ))}
              </select>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Update Request
              </button>
            </form>
          ) : (
            <div className="space-y-4 text-gray-700">
              <p>
                <strong>Recipient:</strong> {request.recipientName}
              </p>
              <p>
                <strong>Location:</strong> {request.recipientUpazila},{" "}
                {request.recipientDistrict}
              </p>
              <p>
                <strong>Date & Time:</strong>{" "}
                {format(new Date(request.donationDate), "MMM dd, yyyy")} at{" "}
                {request.donationTime}
              </p>
              <p>
                <strong>Blood Group:</strong>{" "}
                <BloodGroupBadge bloodGroup={request.bloodGroup} />
              </p>
              <p>
                <strong>Status:</strong> <StatusBadge status={request.status} />
              </p>
            </div>
          )}
        </div>
      </div>
    );
  };

  const CardGrid = ({
    paginatedRequests,
    setModalData,
    handleDelete,
    updateStatus,
  }) => {
    if (paginatedRequests.length === 0) return null;

    return (
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {paginatedRequests.map((req) => (
          <div
            key={req._id}
            className="bg-white border border-gray-200 rounded-xl shadow-lg p-5 transition-transform hover:shadow-xl hover:scale-[1.01]"
          >
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-xl font-bold text-red-600">
                {req.recipientName}
              </h3>
              <BloodGroupBadge bloodGroup={req.bloodGroup} />
            </div>

            <div className="space-y-2 text-sm text-gray-700">
              <p>
                <strong className="font-semibold text-gray-900">
                  Location:
                </strong>{" "}
                {req.recipientUpazila}, {req.recipientDistrict}
              </p>
              <p>
                <strong className="font-semibold text-gray-900">Date:</strong>{" "}
                {format(new Date(req.donationDate), "MMM dd, yyyy")}
              </p>

              <p className="flex items-center gap-2">
                <strong className="font-semibold text-gray-900">Status:</strong>{" "}
                <StatusBadge status={req.status} />
              </p>
            </div>

            <div className="flex justify-between items-center mt-4 border-t pt-3">
              <div className="flex space-x-2">
                <button
                  onClick={() => setModalData({ request: req, isEdit: false })}
                  className="p-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition-colors"
                  title="View Details"
                >
                  <FaEye />
                </button>

                {(req.status === "pending" || req.status === "inprogress") && (
                  <button
                    onClick={() => setModalData({ request: req, isEdit: true })}
                    className="p-2 bg-green-100 text-green-600 rounded-full hover:bg-green-200 transition-colors"
                    title="Edit Request"
                  >
                    <FaEdit />
                  </button>
                )}

                {req.status === "inprogress" && (
                  <button
                    onClick={() => updateStatus(req._id, "done")}
                    className="p-2 bg-emerald-100 text-emerald-600 rounded-full hover:bg-emerald-200 transition-colors"
                    title="Mark as Done"
                  >
                    <FaCheckCircle />
                  </button>
                )}

                {req.status === "pending" && (
                  <button
                    onClick={() => handleDelete(req._id)}
                    className="p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors"
                    title="Delete Request"
                  >
                    <FaTrashAlt />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gray-50">
      <DynamicTitle title="My Donation Requests" />
      <Toaster />

      <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
        My Donation Requests
      </h1>
      <p className="text-gray-600 mb-6">Manage your blood donation requests</p>

      <FilterButtons
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        requests={requests}
      />

      {/* Desktop Table View  */}
      <div className="bg-white rounded-xl shadow-lg p-4 hidden md:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Recipient
                </th>
                <th className="p-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Location
                </th>
                <th className="p-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Date
                </th>
                <th className="p-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Blood Group
                </th>
                <th className="p-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="p-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paginatedRequests.map((req) => (
                <tr
                  key={req._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="p-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <FaUser className="text-red-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {req.recipientName}
                        </p>
                        <p className="text-sm text-gray-500">
                          {req.requesterEmail}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 whitespace-nowrap text-sm text-gray-700">
                    {req.recipientUpazila}, {req.recipientDistrict}
                  </td>
                  <td className="p-4 whitespace-nowrap text-sm text-gray-700">
                    {format(new Date(req.donationDate), "MMM dd, yyyy")}
                  </td>
                  <td className="p-4 whitespace-nowrap">
                    <BloodGroupBadge bloodGroup={req.bloodGroup} />
                  </td>
                  <td className="p-4 whitespace-nowrap">
                    <StatusBadge status={req.status} />
                  </td>
                  <td className="p-4 whitespace-nowrap">
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          setModalData({ request: req, isEdit: false })
                        }
                        className="p-2 text-blue-600 rounded-full hover:bg-blue-100 transition-colors"
                        title="View Details"
                      >
                        <FaEye />
                      </button>

                      {(req.status === "pending" ||
                        req.status === "inprogress") && (
                        <button
                          onClick={() =>
                            setModalData({ request: req, isEdit: true })
                          }
                          className="p-2 text-green-600 rounded-full hover:bg-green-100 transition-colors"
                          title="Edit Request"
                        >
                          <FaEdit />
                        </button>
                      )}

                      {req.status === "pending" && (
                        <button
                          onClick={() => handleDelete(req._id)}
                          className="p-2 text-red-600 rounded-full hover:bg-red-100 transition-colors"
                          title="Delete Request"
                        >
                          <FaTrashAlt />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredRequests.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No donation requests found for this filter.
          </div>
        )}
      </div>

      <div className="block md:hidden">
        <CardGrid
          paginatedRequests={paginatedRequests}
          setModalData={setModalData}
          handleDelete={handleDelete}
          updateStatus={updateStatus}
        />

        {filteredRequests.length === 0 && (
          <div className="text-center py-12 text-gray-500 bg-white rounded-xl shadow-lg mt-4">
            No donation requests found for this filter.
          </div>
        )}
      </div>

      {/* Pagination  */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />

      {modalData.request && (
        <RequestModal
          request={modalData.request}
          isEdit={modalData.isEdit}
          onClose={() => setModalData({ request: null, isEdit: false })}
          onUpdate={handleUpdateSubmit}
        />
      )}
    </div>
  );
};

export default MyDonationRequests;
