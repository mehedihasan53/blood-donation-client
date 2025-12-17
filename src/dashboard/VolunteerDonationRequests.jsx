import React, { useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { FaEye, FaEdit, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import Loading from "../components/shared/Loading";
import DynamicTitle from "../components/shared/DynamicTitle";

const STATUS = [
  { value: "all", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "inprogress", label: "In Progress" },
  { value: "done", label: "Completed" },
  { value: "canceled", label: "Canceled" },
];

const ITEMS_PER_PAGE = 8;

const VolunteerDonationRequests = () => {
  const axiosSecure = useAxiosSecure();
  const [requests, setRequests] = useState([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchRequests();
  }, [currentPage, filter]);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const params = { status: filter };
      const res = await axiosSecure.get("/volunteer/donation-requests", {
        params,
      });

      setRequests(res.data);
      setTotal(res.data.length);
    } catch (err) {
      toast.error("Failed to fetch requests");
    } finally {
      setLoading(false);
    }
  };

  const openModal = (req) => {
    setSelected(req);
    setNewStatus(req.status);
    setModalOpen(true);
  };

  const updateStatus = async () => {
    if (!selected || !newStatus) return;
    setUpdating(true);
    try {
      // 2. Updating status
      await axiosSecure.patch(
        `/volunteer/donation-requests/status/${selected._id}`,
        {
          status: newStatus,
        }
      );
      toast.success("Status updated successfully");
      setModalOpen(false);
      fetchRequests();
    } catch (err) {
      toast.error("Failed to update status");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="p-4 space-y-4">
      <DynamicTitle title="Donation Requests" />
      <Toaster position="top-right" />

      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">
          Donation Requests ({requests.length})
        </h1>
        {/* 3. Dropdown  */}
        <select
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="border px-3 py-2 rounded focus:outline-red-500"
        >
          {STATUS.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      <div className="hidden md:block bg-red-50 shadow rounded overflow-hidden">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3 text-left">Recipient</th>
              <th className="p-3 text-left">Location</th>
              <th className="p-3 text-left">Blood Group</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-10 text-center text-gray-500">
                  No donation requests found for "{filter}"
                </td>
              </tr>
            ) : (
              requests.map((r) => (
                <tr
                  key={r._id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="p-3 font-medium">{r.recipientName}</td>
                  <td className="p-3 text-sm">
                    {r.recipientUpazila}, {r.recipientDistrict}
                  </td>
                  <td className="p-3">
                    <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-xs font-bold">
                      {r.bloodGroup}
                    </span>
                  </td>
                  <td className="p-3">
                    <span
                      className={`capitalize text-sm ${
                        r.status === "done"
                          ? "text-green-600"
                          : "text-orange-500"
                      }`}
                    >
                      {r.status}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="flex gap-2 justify-center">
                      <button
                        onClick={() => openModal(r)}
                        className="p-2 bg-green-500 hover:bg-green-600 text-white rounded transition"
                        title="Update Status"
                      >
                        <FaEdit />
                      </button>
                      <button className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded transition">
                        <FaEye />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="md:hidden space-y-3">
        {requests.map((r) => (
          <div
            key={r._id}
            className="bg-white shadow rounded p-4 border-l-4 border-red-500"
          >
            <div className="flex justify-between items-start">
              <p className="font-bold text-gray-800">{r.recipientName}</p>
              <span className="text-xs font-bold uppercase text-red-500">
                {r.bloodGroup}
              </span>
            </div>
            <p className="text-sm text-gray-600">
              {r.recipientUpazila}, {r.recipientDistrict}
            </p>
            <div className="mt-3 flex justify-between items-center">
              <span className="text-sm italic text-gray-500">
                Status: {r.status}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => openModal(r)}
                  className="p-2 bg-green-500 text-white rounded"
                >
                  <FaEdit />
                </button>
                <button className="p-2 bg-blue-500 text-white rounded">
                  <FaEye />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && selected && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
            {/* 4. Modal  */}
            <h2 className="text-xl font-bold mb-4 border-b pb-2">
              Change Request Status
            </h2>
            <div className="space-y-3 mb-6">
              <p>
                <strong>Recipient:</strong> {selected.recipientName}
              </p>
              <p>
                <strong>Current Status:</strong>{" "}
                <span className="capitalize">{selected.status}</span>
              </p>
            </div>

            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select New Status
            </label>
            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              className="border p-2 w-full mb-6 rounded focus:ring-2 focus:ring-red-500 outline-none"
            >
              {STATUS.filter((s) => s.value !== "all").map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 border rounded hover:bg-gray-100 transition"
              >
                Close
              </button>
              <button
                onClick={updateStatus}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition disabled:bg-gray-400"
                disabled={updating || newStatus === selected.status}
              >
                {updating ? "Updating..." : "Update Now"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VolunteerDonationRequests;
