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
import toast, { Toaster } from "react-hot-toast";
import DynamicTitle from "../components/shared/DynamicTitle";

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

  const getBloodBadgeClass = (bg) => {
    const colors = {
      "A+": "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 border border-red-200 dark:border-red-700",
      "A-": "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border border-red-100 dark:border-red-800",
      "B+": "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-700",
      "B-": "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border border-blue-100 dark:border-blue-800",
      "AB+": "bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 border border-purple-200 dark:border-purple-700",
      "AB-": "bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 border border-purple-100 dark:border-purple-800",
      "O+": "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border border-green-200 dark:border-green-700",
      "O-": "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-100 dark:border-green-800",
    };
    return colors[bg] || "bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-400 border border-gray-200 dark:border-gray-700";
  };

  const getStatusBadgeClass = (status) => {
    const colors = {
      pending: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 border border-yellow-200 dark:border-yellow-700",
      inprogress: "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-700",
      done: "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border border-green-200 dark:border-green-700",
      canceled: "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 border border-red-200 dark:border-red-700",
    };
    return colors[status] || "bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-300 border border-gray-200 dark:border-gray-700";
  };

  if (loading) return <Loading />;

  return (
    <div className="container-safe min-h-screen bg-bg-secondary/50 dark:bg-bg-secondary/30 p-4 sm:p-6 space-y-6">
      <DynamicTitle title="All Donation Requests" />
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{ duration: 3000 }}
      />

      {/* Header + Filter */}
      <div className="bg-bg-card/95 dark:bg-bg-card/90 backdrop-blur-xl p-4 sm:p-6 rounded-2xl shadow-lg dark:shadow-2xl border border-border-primary/30 dark:border-border-primary/40">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-text-primary">
              My Donation Requests
            </h1>
            <p className="text-text-secondary mt-1">
              Total: {totalRequest} requests
            </p>
          </div>
          <select
            className="select-modern w-full sm:w-60"
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
      </div>

      {/* Desktop Table */}
      <div className="bg-bg-card/95 dark:bg-bg-card/90 backdrop-blur-xl rounded-2xl shadow-lg dark:shadow-2xl border border-border-primary/30 dark:border-border-primary/40 overflow-hidden">
        {myRequests.length === 0 ? (
          <div className="text-center p-10 text-text-muted">
            No donation requests found.
          </div>
        ) : (
          <div className="table-container">
            <table className="w-full">
              <thead className="bg-bg-tertiary/50 dark:bg-bg-tertiary/30">
                <tr>
                  <th className="p-4 text-left text-sm font-semibold text-text-primary">
                    Recipient
                  </th>
                  <th className="p-4 text-left text-sm font-semibold text-text-primary">
                    Location
                  </th>
                  <th className="p-4 text-left text-sm font-semibold text-text-primary">
                    Blood Group
                  </th>
                  <th className="p-4 text-left text-sm font-semibold text-text-primary">
                    Date & Time
                  </th>
                  <th className="p-4 text-left text-sm font-semibold text-text-primary">
                    Status
                  </th>
                  <th className="p-4 text-left text-sm font-semibold text-text-primary">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-primary/10 dark:divide-border-primary/20">
                {myRequests.map((r) => (
                  <tr key={r._id} className="table-row-hover">
                    <td className="p-4 text-sm text-text-primary font-medium">{r.recipientName}</td>
                    <td className="p-4 text-sm text-text-secondary">
                      {r.recipientUpazila}, {r.recipientDistrict}
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getBloodBadgeClass(
                          r.bloodGroup
                        )}`}
                      >
                        {r.bloodGroup}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-text-secondary">
                      {r.donationDate} {r.donationTime}
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${getStatusBadgeClass(
                          r.status
                        )}`}
                      >
                        {r.status}
                      </span>
                    </td>
                    <td className="p-4 flex space-x-2">
                      <button
                        onClick={() => handleView(r)}
                        className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors duration-200"
                      >
                        <FaEye />
                      </button>
                      <button
                        onClick={() => handleEdit(r)}
                        className="p-2 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors duration-200"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(r._id)}
                        className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors duration-200"
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
          <div className="text-center p-6 text-text-muted bg-bg-card/95 dark:bg-bg-card/90 backdrop-blur-xl rounded-2xl shadow-lg dark:shadow-2xl border border-border-primary/30 dark:border-border-primary/40">
            No donation requests found.
          </div>
        ) : (
          myRequests.map((r) => (
            <div
              key={r._id}
              className="bg-bg-card/95 dark:bg-bg-card/90 backdrop-blur-xl rounded-2xl shadow-lg dark:shadow-2xl p-4 space-y-3 border border-border-primary/30 dark:border-border-primary/40"
            >
              <div className="flex justify-between items-center">
                <div className="font-semibold text-text-primary">{r.recipientName}</div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${getStatusBadgeClass(
                    r.status
                  )}`}
                >
                  {r.status}
                </span>
              </div>
              <div className="text-sm text-text-secondary">
                {r.recipientUpazila}, {r.recipientDistrict}
              </div>
              <div className="flex justify-between items-center">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${getBloodBadgeClass(
                    r.bloodGroup
                  )}`}
                >
                  {r.bloodGroup}
                </span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleView(r)}
                    className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors duration-200"
                  >
                    <FaEye />
                  </button>
                  <button
                    onClick={() => handleEdit(r)}
                    className="p-2 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors duration-200"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(r._id)}
                    className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors duration-200"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
              <div className="text-sm text-text-secondary">
                {r.donationDate} {r.donationTime}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {Math.ceil(totalRequest / ITEMS_PER_PAGE) > 1 && (
        <div className="flex justify-center items-center gap-2 bg-bg-card/95 dark:bg-bg-card/90 backdrop-blur-xl p-4 rounded-2xl shadow-lg dark:shadow-2xl border border-border-primary/30 dark:border-border-primary/40">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-2 interactive-border rounded-lg hover:bg-bg-tertiary/50 dark:hover:bg-bg-tertiary/30 disabled:opacity-50 disabled:cursor-not-allowed text-text-primary transition-colors duration-200"
          >
            <FaChevronLeft />
          </button>
          {[...Array(Math.ceil(totalRequest / ITEMS_PER_PAGE)).keys()].map(
            (p) => (
              <button
                key={p}
                onClick={() => setCurrentPage(p + 1)}
                className={`px-3 py-2 rounded-lg font-medium transition-all duration-200 ${currentPage === p + 1
                  ? "bg-red-600 dark:bg-red-700 text-white shadow-lg"
                  : "interactive-border hover:bg-bg-tertiary/50 dark:hover:bg-bg-tertiary/30 text-text-primary"
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
            className="p-2 interactive-border rounded-lg hover:bg-bg-tertiary/50 dark:hover:bg-bg-tertiary/30 disabled:opacity-50 disabled:cursor-not-allowed text-text-primary transition-colors duration-200"
          >
            <FaChevronRight />
          </button>
        </div>
      )}

      {/* Modal */}
      {modalOpen && selectedRequest && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="modal-modern w-full max-w-lg max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-text-primary">
                {modalType === "view" ? "Request Details" : "Edit Request"}
              </h2>
              <button
                onClick={() => {
                  setModalOpen(false);
                  setSelectedRequest(null);
                  setFormData({});
                  setSelectedDistrictId("");
                }}
                className="text-text-muted hover:text-text-primary transition-colors duration-200 text-xl"
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
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Recipient Name *
                  </label>
                  <input
                    name="recipientName"
                    value={formData.recipientName || ""}
                    onChange={handleFormChange}
                    className="select-modern w-full"
                    required
                  />
                </div>

                {/* District Select  */}
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    District *
                  </label>
                  <select
                    name="districtId"
                    value={selectedDistrictId}
                    onChange={handleFormChange}
                    className="select-modern w-full"
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

                {/* Upazila Select  */}
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Upazila *
                  </label>
                  <select
                    name="recipientUpazila"
                    value={formData.recipientUpazila || ""}
                    onChange={handleFormChange}
                    disabled={!selectedDistrictId}
                    className={`select-modern w-full ${!selectedDistrictId ? "opacity-50 cursor-not-allowed" : ""
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

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Blood Group *
                  </label>
                  <select
                    name="bloodGroup"
                    value={formData.bloodGroup || ""}
                    onChange={handleFormChange}
                    className="select-modern w-full"
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

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Donation Date *
                  </label>
                  <input
                    type="date"
                    name="donationDate"
                    value={formData.donationDate || ""}
                    onChange={handleFormChange}
                    className="select-modern w-full"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Donation Time *
                  </label>
                  <input
                    type="time"
                    name="donationTime"
                    value={formData.donationTime || ""}
                    onChange={handleFormChange}
                    className="select-modern w-full"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Hospital Name
                  </label>
                  <input
                    name="hospitalName"
                    value={formData.hospitalName || ""}
                    onChange={handleFormChange}
                    className="select-modern w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Full Address
                  </label>
                  <textarea
                    name="fullAddress"
                    value={formData.fullAddress || ""}
                    onChange={handleFormChange}
                    className="select-modern w-full"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Request Message
                  </label>
                  <textarea
                    name="requestMessage"
                    value={formData.requestMessage || ""}
                    onChange={handleFormChange}
                    className="select-modern w-full"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Status *
                  </label>
                  <select
                    name="status"
                    value={formData.status || ""}
                    onChange={handleFormChange}
                    className="select-modern w-full"
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

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setModalOpen(false);
                      setSelectedRequest(null);
                      setFormData({});
                      setSelectedDistrictId("");
                    }}
                    className="px-6 py-2 interactive-border rounded-lg hover:bg-bg-tertiary/50 dark:hover:bg-bg-tertiary/30 text-text-primary font-medium transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isUpdating}
                    className="px-6 py-2 bg-red-600 dark:bg-red-700 text-white rounded-lg hover:bg-red-700 dark:hover:bg-red-800 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors duration-200 shadow-lg hover:shadow-xl"
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
  <div className="flex justify-between items-start p-3 bg-bg-tertiary/30 dark:bg-bg-tertiary/20 rounded-lg">
    <p className="text-sm font-medium text-text-secondary">{label}:</p>
    <p className="text-sm text-text-primary font-medium">{value}</p>
  </div>
);

export default AllDonationRequests;
