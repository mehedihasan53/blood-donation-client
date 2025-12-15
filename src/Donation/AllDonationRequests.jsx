import React, { useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import {
  FaEye,
  FaEdit,
  FaTrash,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import Loading from "../components/shared/Loading";
import toast, { Toaster } from "react-hot-toast"; // **1. Toasting Library Import**

const STATUS = [
  { value: "all", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "inprogress", label: "In Progress" },
  { value: "done", label: "Completed" },
  { value: "canceled", label: "Canceled" },
];

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const ITEMS_PER_PAGE = 8;

const AllDonationRequests = () => {
  const axiosSecure = useAxiosSecure();
  const [myRequests, setMyRequests] = useState([]);
  const [totalRequest, setTotalRequest] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [formData, setFormData] = useState({});
  const [selectedDistrictId, setSelectedDistrictId] = useState("");

  useEffect(() => {
    fetchLocationData();
    fetchRequests();
  }, [currentPage, filter]);

  // **2. Data Fetching Logic (Requests and Locations)**
  const fetchLocationData = async () => {
    try {
      const [districtsRes, upazilasRes] = await Promise.all([
        fetch("/districts.json"),
        fetch("/upazilas.json"),
      ]);
      const districtsData = await districtsRes.json();
      const upazilasData = await upazilasRes.json();
      setDistricts(districtsData.districts || []);
      setUpazilas(upazilasData.upazilas || []);
    } catch (err) {
      console.error("Error fetching location data:", err);
      toast.error("Failed to load location data");
    }
  };

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const params = { page: currentPage - 1, size: ITEMS_PER_PAGE };
      if (filter !== "all") params.status = filter;
      const res = await axiosSecure.get("/donation-requests", { params });
      setMyRequests(res.data.requests || []);
      setTotalRequest(res.data.totalRequest || 0);
    } catch (err) {
      console.error("Fetch error:", err);
      toast.error("Failed to fetch donation requests");
    } finally {
      setLoading(false);
    }
  };

  // **3. CRUD Operations (Delete and Update)**
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this request?"))
      return;
    try {
      await axiosSecure.delete(`/donation-requests/${id}`);
      fetchRequests();
      toast.success("Request deleted successfully!");
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("Failed to delete request");
    }
  };

  const handleView = (request) => {
    setSelectedRequest(request);
    setModalType("view");
    setModalOpen(true);
  };

  const handleEdit = (request) => {
    setSelectedRequest(request);
    setFormData({
      recipientName: request.recipientName,
      recipientUpazila: request.recipientUpazila,
      recipientDistrict: request.recipientDistrict,
      bloodGroup: request.bloodGroup,
      donationDate: request.donationDate,
      donationTime: request.donationTime,
      hospitalName: request.hospitalName || "",
      fullAddress: request.fullAddress || "",
      requestMessage: request.requestMessage || "",
      status: request.status,
    });

    const district = districts.find(
      (d) => d.name === request.recipientDistrict
    );
    setSelectedDistrictId(district?.id || "");

    setModalType("edit");
    setModalOpen(true);
  };

  const handleUpdate = async () => {
    if (!selectedRequest?._id) return;
    setIsUpdating(true);
    try {
      await axiosSecure.patch(
        `/donation-requests/${selectedRequest._id}`,
        formData
      );
      setModalOpen(false);
      setSelectedRequest(null);
      setFormData({});
      setSelectedDistrictId("");
      fetchRequests();
      toast.success("Request updated successfully!");
    } catch (err) {
      console.error("Update error:", err);
      toast.error("Failed to update request");
    } finally {
      setIsUpdating(false);
    }
  };

  // **4. Form and Location State Management**
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    if (name === "districtId") {
      const district = districts.find((d) => d.id == value);
      setSelectedDistrictId(value);
      setFormData((prev) => ({
        ...prev,
        recipientDistrict: district?.name || "",
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const filteredUpazilas = upazilas.filter(
    (u) => String(u.district_id) === String(selectedDistrictId)
  );

  // **5. Utility Functions for UI/Styling**
  const getBloodBadgeClass = (bg) => {
    const colors = {
      "A+": "bg-red-100 text-red-800",
      "A-": "bg-red-50 text-red-700",
      "B+": "bg-blue-100 text-blue-800",
      "B-": "bg-blue-50 text-blue-700",
      "AB+": "bg-purple-100 text-purple-800",
      "AB-": "bg-purple-50 text-purple-700",
      "O+": "bg-green-100 text-green-800",
      "O-": "bg-green-50 text-green-700",
    };
    return colors[bg] || "bg-gray-100 text-gray-700";
  };

  const getStatusBadgeClass = (status) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800",
      inprogress: "bg-blue-100 text-blue-800",
      done: "bg-green-100 text-green-800",
      canceled: "bg-red-100 text-red-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  if (loading) return <Loading />;

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{ duration: 3000 }}
      />
      {/* Header + Filter */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
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
      <div className="hidden md:block bg-white rounded-lg shadow overflow-hidden">
        {myRequests.length === 0 ? (
          <div className="text-center p-10 text-gray-500">
            No donation requests found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
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
                  <tr key={r._id} className="hover:bg-gray-50">
                    <td className="p-3 text-sm">{r.recipientName}</td>
                    <td className="p-3 text-sm">
                      {r.recipientUpazila}, {r.recipientDistrict}
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getBloodBadgeClass(
                          r.bloodGroup
                        )}`}
                      >
                        {r.bloodGroup}
                      </span>
                    </td>
                    <td className="p-3 text-sm">
                      {r.donationDate} {r.donationTime}
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusBadgeClass(
                          r.status
                        )}`}
                      >
                        {r.status}
                      </span>
                    </td>
                    <td className="p-3 flex space-x-2">
                      <button
                        onClick={() => handleView(r)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                      >
                        <FaEye />
                      </button>
                      <button
                        onClick={() => handleEdit(r)}
                        className="p-2 text-green-600 hover:bg-green-50 rounded"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(r._id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {myRequests.length === 0 ? (
          <div className="text-center p-4 text-gray-500">
            No donation requests found.
          </div>
        ) : (
          myRequests.map((r) => (
            <div
              key={r._id}
              className="bg-white rounded-lg shadow p-4 space-y-2"
            >
              <div className="flex justify-between items-center">
                <div className="font-medium">{r.recipientName}</div>
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${getStatusBadgeClass(
                    r.status
                  )}`}
                >
                  {r.status}
                </span>
              </div>
              <div className="text-sm text-gray-500">
                {r.recipientUpazila}, {r.recipientDistrict}
              </div>
              <div className="flex justify-between items-center">
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${getBloodBadgeClass(
                    r.bloodGroup
                  )}`}
                >
                  {r.bloodGroup}
                </span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleView(r)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                  >
                    <FaEye />
                  </button>
                  <button
                    onClick={() => handleEdit(r)}
                    className="p-2 text-green-600 hover:bg-green-50 rounded"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(r._id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
              <div className="text-sm text-gray-500">
                {r.donationDate} {r.donationTime}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {Math.ceil(totalRequest / ITEMS_PER_PAGE) > 1 && (
        <div className="flex justify-center items-center gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-2 border rounded hover:bg-gray-100 disabled:opacity-50"
          >
            <FaChevronLeft />
          </button>
          {[...Array(Math.ceil(totalRequest / ITEMS_PER_PAGE)).keys()].map(
            (p) => (
              <button
                key={p}
                onClick={() => setCurrentPage(p + 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === p + 1
                    ? "bg-red-500 text-white"
                    : "border hover:bg-gray-100"
                }`}
              >
                {p + 1}
              </button>
            )
          )}
          <button
            onClick={() =>
              setCurrentPage((p) =>
                Math.min(Math.ceil(totalRequest / ITEMS_PER_PAGE), p + 1)
              )
            }
            disabled={currentPage === Math.ceil(totalRequest / ITEMS_PER_PAGE)}
            className="p-2 border rounded hover:bg-gray-100 disabled:opacity-50"
          >
            <FaChevronRight />
          </button>
        </div>
      )}

      {/* Modal */}
      {modalOpen && selectedRequest && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-lg w-full max-w-lg max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-gray-800">
                {modalType === "view" ? "Request Details" : "Edit Request"}
              </h2>
              <button
                onClick={() => {
                  setModalOpen(false);
                  setSelectedRequest(null);
                  setFormData({});
                  setSelectedDistrictId("");
                }}
                className="text-gray-600 hover:text-gray-800"
              >
                ✕
              </button>
            </div>

            {modalType === "view" && (
              <div className="space-y-3">
                <DetailRow
                  label="Recipient"
                  value={selectedRequest.recipientName}
                />
                <DetailRow
                  label="District"
                  value={selectedRequest.recipientDistrict}
                />
                <DetailRow
                  label="Upazila"
                  value={selectedRequest.recipientUpazila}
                />
                <DetailRow
                  label="Blood Group"
                  value={selectedRequest.bloodGroup}
                />
                <DetailRow label="Date" value={selectedRequest.donationDate} />
                <DetailRow label="Time" value={selectedRequest.donationTime} />
                <DetailRow
                  label="Hospital"
                  value={selectedRequest.hospitalName || "N/A"}
                />
                <DetailRow label="Status" value={selectedRequest.status} />
                {selectedRequest.requestMessage && (
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Message:</p>
                    <p className="text-gray-800 bg-gray-50 p-3 rounded">
                      {selectedRequest.requestMessage}
                    </p>
                  </div>
                )}
              </div>
            )}

            {modalType === "edit" && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleUpdate();
                }}
                className="space-y-4"
              >
                {/* Recipient Name Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Recipient Name *
                  </label>
                  <input
                    name="recipientName"
                    value={formData.recipientName || ""}
                    onChange={handleFormChange}
                    className="border px-3 py-2 rounded w-full focus:ring-2 focus:ring-red-500"
                    required
                  />
                </div>

                {/* District Select Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    District *
                  </label>
                  <select
                    name="districtId"
                    value={selectedDistrictId}
                    onChange={handleFormChange}
                    className="border px-3 py-2 rounded w-full focus:ring-2 focus:ring-red-500"
                    required
                  >
                    <option value="">Select District</option>
                    {districts.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Upazila Select Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Upazila *
                  </label>
                  <select
                    name="recipientUpazila"
                    value={formData.recipientUpazila || ""}
                    onChange={handleFormChange}
                    disabled={!selectedDistrictId}
                    className={`border px-3 py-2 rounded w-full focus:ring-2 focus:ring-red-500 ${
                      !selectedDistrictId ? "bg-gray-50" : ""
                    }`}
                    required
                  >
                    <option value="">Select Upazila</option>
                    {filteredUpazilas.map((u) => (
                      <option key={u.id} value={u.name}>
                        {u.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Blood Group Select Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Blood Group *
                  </label>
                  <select
                    name="bloodGroup"
                    value={formData.bloodGroup || ""}
                    onChange={handleFormChange}
                    className="border px-3 py-2 rounded w-full focus:ring-2 focus:ring-red-500"
                    required
                  >
                    <option value="">Select Blood Group</option>
                    {BLOOD_GROUPS.map((bg) => (
                      <option key={bg} value={bg}>
                        {bg}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Donation Date Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Donation Date *
                  </label>
                  <input
                    type="date"
                    name="donationDate"
                    value={formData.donationDate || ""}
                    onChange={handleFormChange}
                    className="border px-3 py-2 rounded w-full focus:ring-2 focus:ring-red-500"
                    required
                  />
                </div>

                {/* Donation Time Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Donation Time *
                  </label>
                  <input
                    type="time"
                    name="donationTime"
                    value={formData.donationTime || ""}
                    onChange={handleFormChange}
                    className="border px-3 py-2 rounded w-full focus:ring-2 focus:ring-red-500"
                    required
                  />
                </div>

                {/* Hospital Name Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Hospital Name
                  </label>
                  <input
                    name="hospitalName"
                    value={formData.hospitalName || ""}
                    onChange={handleFormChange}
                    className="border px-3 py-2 rounded w-full focus:ring-2 focus:ring-red-500"
                  />
                </div>

                {/* Full Address Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Address
                  </label>
                  <textarea
                    name="fullAddress"
                    value={formData.fullAddress || ""}
                    onChange={handleFormChange}
                    className="border px-3 py-2 rounded w-full focus:ring-2 focus:ring-red-500"
                    rows={2}
                  />
                </div>

                {/* Request Message Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Request Message
                  </label>
                  <textarea
                    name="requestMessage"
                    value={formData.requestMessage || ""}
                    onChange={handleFormChange}
                    className="border px-3 py-2 rounded w-full focus:ring-2 focus:ring-red-500"
                    rows={2}
                  />
                </div>

                {/* Status Select Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status *
                  </label>
                  <select
                    name="status"
                    value={formData.status || ""}
                    onChange={handleFormChange}
                    className="border px-3 py-2 rounded w-full focus:ring-2 focus:ring-red-500"
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

                {/* Action Buttons */}
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setModalOpen(false);
                      setSelectedRequest(null);
                      setFormData({});
                      setSelectedDistrictId("");
                    }}
                    className="px-4 py-2 border rounded hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isUpdating}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
                  >
                    {isUpdating ? "Updating..." : "Update"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const DetailRow = ({ label, value }) => (
  <div className="flex justify-between items-start">
    <p className="text-sm font-medium text-gray-600">{label}:</p>
    <p className="text-sm text-gray-800">{value}</p>
  </div>
);

export default AllDonationRequests;
