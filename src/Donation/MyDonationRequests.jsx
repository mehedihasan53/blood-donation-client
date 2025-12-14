import React, { useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import {
  FaEye,
  FaEdit,
  FaTrash,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

const STATUS = [
  { value: "all", label: "All" },
  { value: "pending", label: "Pending", color: "yellow" },
  { value: "inprogress", label: "In Progress", color: "blue" },
  { value: "done", label: "Completed", color: "green" },
  { value: "canceled", label: "Canceled", color: "red" },
];

const ITEMS_PER_PAGE = 3;

const MyDonationRequests = () => {
  const axiosSecure = useAxiosSecure();
  const [myRequests, setMyRequests] = useState([]);
  const [totalRequest, setTotalRequest] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editRequest, setEditRequest] = useState(null);
  const [viewRequest, setViewRequest] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      let url = `/donation-requests?page=${
        currentPage - 1
      }&size=${ITEMS_PER_PAGE}`;
      if (filter !== "all") url += `&status=${filter}`;

      const res = await axiosSecure.get(url);
      console.log("API Response:", res.data); // Debug
      setMyRequests(res.data.request || []);
      setTotalRequest(res.data.totalRequest || 0);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [currentPage, filter]);

  const numberOfPages = Math.ceil(totalRequest / ITEMS_PER_PAGE);
  const pages = [...Array(numberOfPages).keys()].map((e) => e + 1);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this request?"))
      return;
    try {
      console.log("Deleting request with ID:", id);
      const res = await axiosSecure.delete(`/donation-requests/${id}`);
      console.log("Delete response:", res);
      if (res.data.deletedCount === 1) {
        fetchRequests();
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete request");
    }
  };

  const handleView = async (id) => {
    try {
      const res = await axiosSecure.get(`/donation-requests/${id}`);
      console.log("View response:", res.data);
      setViewRequest(res.data);
      setModalOpen("view");
    } catch (err) {
      console.error("View error:", err);
      alert("Failed to load request details");
    }
  };

  const handleEdit = async (request) => {
    setEditRequest(request);
    setModalOpen("edit");
  };

  const handleUpdate = async (updatedData) => {
    if (!editRequest?._id) return;

    setIsUpdating(true);
    try {
      console.log("Updating request:", editRequest._id, updatedData);
      const res = await axiosSecure.patch(
        `/donation-requests/${editRequest._id}`,
        updatedData
      );
      console.log("Update response:", res);
      setModalOpen(false);
      setEditRequest(null);
      fetchRequests();
    } catch (err) {
      console.error("Update error:", err);
      alert("Failed to update request");
    } finally {
      setIsUpdating(false);
    }
  };

  const statusBadge = (status) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
      inprogress: "bg-blue-100 text-blue-800 border-blue-200",
      done: "bg-green-100 text-green-800 border-green-200",
      canceled: "bg-red-100 text-red-800 border-red-200",
    };
    return (
      <span
        className={`px-2 py-1 rounded-full text-xs sm:text-sm font-medium border capitalize ${
          colors[status] || "bg-gray-100 text-gray-800 border-gray-200"
        }`}
      >
        {status}
      </span>
    );
  };

  const bloodBadge = (bg) => {
    const colors = {
      "A+": "bg-red-50 text-red-700 border-red-200",
      "A-": "bg-red-100 text-red-800 border-red-300",
      "B+": "bg-blue-50 text-blue-700 border-blue-200",
      "B-": "bg-blue-100 text-blue-800 border-blue-300",
      "AB+": "bg-purple-50 text-purple-700 border-purple-200",
      "AB-": "bg-purple-100 text-purple-800 border-purple-300",
      "O+": "bg-green-50 text-green-700 border-green-200",
      "O-": "bg-green-100 text-green-800 border-green-300",
    };
    return (
      <span
        className={`px-2 py-1 rounded-full text-xs sm:text-sm font-medium border ${
          colors[bg] || "bg-gray-100 text-gray-700 border-gray-200"
        }`}
      >
        {bg}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin w-12 h-12 border-t-2 border-b-2 border-blue-500 rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Header & Filter */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
          My Donation Requests ({totalRequest})
        </h1>
        <select
          className="border px-3 py-2 rounded w-full sm:w-60 focus:outline-none focus:ring-2 focus:ring-red-500"
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
            setCurrentPage(1);
          }}
        >
          {STATUS.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto w-full rounded-lg shadow bg-white">
        {myRequests.length === 0 ? (
          <div className="text-center p-10 text-gray-500">
            No donation requests found. Create your first request!
          </div>
        ) : (
          <table className="w-full border-collapse">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3 text-left text-sm font-medium text-gray-600">
                  Recipient
                </th>
                <th className="p-3 text-left text-sm font-medium text-gray-600">
                  Location
                </th>
                <th className="p-3 text-left text-sm font-medium text-gray-600">
                  Blood
                </th>
                <th className="p-3 text-left text-sm font-medium text-gray-600">
                  Date & Time
                </th>
                <th className="p-3 text-left text-sm font-medium text-gray-600">
                  Status
                </th>
                <th className="p-3 text-left text-sm font-medium text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {myRequests.map((r) => (
                <tr key={r._id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-3 text-sm">{r.recipientName}</td>
                  <td className="p-3 text-sm">
                    {r.recipientUpazila}, {r.recipientDistrict}
                  </td>
                  <td className="p-3">{bloodBadge(r.bloodGroup)}</td>
                  <td className="p-3 text-sm">
                    {r.donationDate} {r.donationTime}
                  </td>
                  <td className="p-3">{statusBadge(r.status)}</td>
                  <td className="p-3 flex space-x-2">
                    <button
                      onClick={() => handleView(r._id)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                      title="View Details"
                    >
                      <FaEye />
                    </button>
                    <button
                      onClick={() => handleEdit(r)}
                      className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition"
                      title="Edit Request"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(r._id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                      title="Delete Request"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Mobile Card */}
      <div className="md:hidden grid grid-cols-1 gap-4">
        {myRequests.length === 0 ? (
          <div className="text-center p-6 text-gray-500">
            No donation requests found
          </div>
        ) : (
          myRequests.map((r) => (
            <div
              key={r._id}
              className="bg-white rounded-xl shadow p-4 space-y-3"
            >
              <div>
                <span className="font-semibold text-gray-500">Recipient: </span>
                <span className="text-gray-800">{r.recipientName}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-500">Location: </span>
                <span className="text-gray-800">
                  {r.recipientUpazila}, {r.recipientDistrict}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-gray-500">
                  Blood Group:
                </span>
                {bloodBadge(r.bloodGroup)}
              </div>
              <div>
                <span className="font-semibold text-gray-500">
                  Date & Time:{" "}
                </span>
                <span className="text-gray-800">
                  {r.donationDate} {r.donationTime}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-gray-500">Status:</span>
                {statusBadge(r.status)}
              </div>
              <div className="flex justify-end space-x-2 pt-2 border-t">
                <button
                  onClick={() => handleView(r._id)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                  title="View"
                >
                  <FaEye />
                </button>
                <button
                  onClick={() => handleEdit(r)}
                  className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition"
                  title="Edit"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(r._id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                  title="Delete"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {numberOfPages > 1 && (
        <div className="flex flex-wrap justify-center items-center mt-6 gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-2 border rounded-lg hover:bg-gray-100 transition disabled:opacity-50"
          >
            <FaChevronLeft />
          </button>
          {pages.map((p) => (
            <button
              key={p}
              onClick={() => setCurrentPage(p)}
              className={`px-3 py-1 rounded-lg transition ${
                p === currentPage
                  ? "bg-red-500 text-white"
                  : "border hover:bg-gray-100"
              }`}
            >
              {p}
            </button>
          ))}
          <button
            onClick={() =>
              setCurrentPage((p) => Math.min(numberOfPages, p + 1))
            }
            disabled={currentPage === numberOfPages}
            className="p-2 border rounded-lg hover:bg-gray-100 transition disabled:opacity-50"
          >
            <FaChevronRight />
          </button>
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
            <button
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
              onClick={() => {
                setModalOpen(false);
                setEditRequest(null);
                setViewRequest(null);
              }}
            >
              ✕
            </button>
            {modalOpen === "view" && viewRequest && (
              <div className="space-y-4">
                <h2 className="font-bold text-lg text-gray-800">
                  Donation Request Details
                </h2>
                <div className="space-y-2">
                  <p>
                    <b className="text-gray-600">Recipient:</b>{" "}
                    <span className="text-gray-800">
                      {viewRequest.recipientName}
                    </span>
                  </p>
                  <p>
                    <b className="text-gray-600">Location:</b>{" "}
                    <span className="text-gray-800">
                      {viewRequest.recipientUpazila},{" "}
                      {viewRequest.recipientDistrict}
                    </span>
                  </p>
                  <p>
                    <b className="text-gray-600">Blood Group:</b>{" "}
                    <span className="text-gray-800">
                      {viewRequest.bloodGroup}
                    </span>
                  </p>
                  <p>
                    <b className="text-gray-600">Date:</b>{" "}
                    <span className="text-gray-800">
                      {viewRequest.donationDate}
                    </span>
                  </p>
                  <p>
                    <b className="text-gray-600">Time:</b>{" "}
                    <span className="text-gray-800">
                      {viewRequest.donationTime}
                    </span>
                  </p>
                  <p>
                    <b className="text-gray-600">Status:</b>{" "}
                    <span className="capitalize text-gray-800">
                      {viewRequest.status}
                    </span>
                  </p>
                </div>
              </div>
            )}
            {modalOpen === "edit" && editRequest && (
              <EditForm
                request={editRequest}
                onUpdate={handleUpdate}
                isUpdating={isUpdating}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// Edit Form Component
const EditForm = ({ request, onUpdate, isUpdating }) => {
  const [form, setForm] = useState({
    recipientName: request.recipientName,
    recipientUpazila: request.recipientUpazila,
    recipientDistrict: request.recipientDistrict,
    bloodGroup: request.bloodGroup,
    donationDate: request.donationDate,
    donationTime: request.donationTime,
    status: request.status,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="font-bold text-lg text-gray-800">Edit Donation Request</h2>
      <div className="space-y-3">
        <input
          className="border px-3 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-red-500"
          name="recipientName"
          value={form.recipientName}
          onChange={handleChange}
          placeholder="Recipient Name"
          required
        />
        <input
          className="border px-3 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-red-500"
          name="recipientUpazila"
          value={form.recipientUpazila}
          onChange={handleChange}
          placeholder="Upazila"
          required
        />
        <input
          className="border px-3 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-red-500"
          name="recipientDistrict"
          value={form.recipientDistrict}
          onChange={handleChange}
          placeholder="District"
          required
        />
        <select
          name="bloodGroup"
          value={form.bloodGroup}
          onChange={handleChange}
          className="border px-3 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-red-500"
          required
        >
          <option value="">Select Blood Group</option>
          {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
        <input
          type="date"
          name="donationDate"
          value={form.donationDate}
          onChange={handleChange}
          className="border px-3 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-red-500"
          required
        />
        <input
          type="time"
          name="donationTime"
          value={form.donationTime}
          onChange={handleChange}
          className="border px-3 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-red-500"
          required
        />
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="border px-3 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-red-500"
          required
        >
          <option value="">Select Status</option>
          {STATUS.filter((s) => s.value !== "all").map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>
      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="px-4 py-2 border rounded hover:bg-gray-50 transition"
          disabled={isUpdating}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition disabled:opacity-50"
          disabled={isUpdating}
        >
          {isUpdating ? "Updating..." : "Update Request"}
        </button>
      </div>
    </form>
  );
};

export default MyDonationRequests;
