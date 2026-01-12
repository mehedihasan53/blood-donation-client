import React, { useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { FaEye, FaEdit, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import Loading from "../components/shared/Loading";
import DynamicTitle from "../components/shared/DynamicTitle";
import { Select } from "../components/ui/Select";
import { Modal } from "../components/ui/Modal";
import { Button } from "../components/ui/Button";
import { Card, CardContent } from "../components/ui/Card";
import { motion } from "framer-motion";
import { useSmoothScroll } from "../hooks/useSmoothScroll";

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

  // Initialize smooth scrolling
  useSmoothScroll();

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
    <div className="container-safe">
      <div className="content-container space-y-6">
        <DynamicTitle title="Donation Requests" />
        <Toaster position="top-right" />

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        >
          <h1 className="text-2xl font-bold text-text-primary">
            Donation Requests ({requests.length})
          </h1>

          <Select
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full sm:w-48"
            placeholder="Filter by status"
          >
            {STATUS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </Select>
        </motion.div>

        {/* Desktop Table */}
        <Card className="hidden md:block overflow-hidden">
          <div className="table-container">
            <table className="w-full border-collapse">
              <thead className="bg-bg-tertiary/50 dark:bg-bg-tertiary/30">
                <tr>
                  <th className="p-4 text-left text-sm font-semibold text-text-primary">Recipient</th>
                  <th className="p-4 text-left text-sm font-semibold text-text-primary">Location</th>
                  <th className="p-4 text-left text-sm font-semibold text-text-primary">Blood Group</th>
                  <th className="p-4 text-left text-sm font-semibold text-text-primary">Status</th>
                  <th className="p-4 text-center text-sm font-semibold text-text-primary">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-primary/10 dark:divide-border-primary/20">
                {requests.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="p-12 text-center text-text-muted">
                      No donation requests found for "{filter}"
                    </td>
                  </tr>
                ) : (
                  requests.map((r, index) => (
                    <motion.tr
                      key={r._id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="table-row-hover"
                    >
                      <td className="p-4 font-medium text-text-primary">{r.recipientName}</td>
                      <td className="p-4 text-sm text-text-secondary">
                        {r.recipientUpazila}, {r.recipientDistrict}
                      </td>
                      <td className="p-4">
                        <span className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-3 py-1 rounded-full text-xs font-bold">
                          {r.bloodGroup}
                        </span>
                      </td>
                      <td className="p-4">
                        <span
                          className={`capitalize text-sm font-medium ${r.status === "done"
                              ? "text-green-600 dark:text-green-400"
                              : r.status === "inprogress"
                                ? "text-blue-600 dark:text-blue-400"
                                : r.status === "canceled"
                                  ? "text-red-600 dark:text-red-400"
                                  : "text-orange-600 dark:text-orange-400"
                            }`}
                        >
                          {r.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2 justify-center">
                          <Button
                            size="sm"
                            variant="success"
                            onClick={() => openModal(r)}
                            className="p-2"
                          >
                            <FaEdit />
                          </Button>
                          <Button
                            size="sm"
                            variant="secondary"
                            className="p-2"
                          >
                            <FaEye />
                          </Button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-4">
          {requests.map((r, index) => (
            <motion.div
              key={r._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="border-l-4 border-l-red-500">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <p className="font-bold text-text-primary">{r.recipientName}</p>
                    <span className="text-xs font-bold uppercase bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-2 py-1 rounded-full">
                      {r.bloodGroup}
                    </span>
                  </div>
                  <p className="text-sm text-text-secondary mb-3">
                    {r.recipientUpazila}, {r.recipientDistrict}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className={`text-sm font-medium capitalize ${r.status === "done"
                        ? "text-green-600 dark:text-green-400"
                        : r.status === "inprogress"
                          ? "text-blue-600 dark:text-blue-400"
                          : r.status === "canceled"
                            ? "text-red-600 dark:text-red-400"
                            : "text-orange-600 dark:text-orange-400"
                      }`}>
                      Status: {r.status}
                    </span>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="success"
                        onClick={() => openModal(r)}
                        className="p-2"
                      >
                        <FaEdit />
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        className="p-2"
                      >
                        <FaEye />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Status Update Modal */}
        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Change Request Status"
          size="md"
        >
          {selected && (
            <div className="space-y-6">
              <div className="space-y-3">
                <div>
                  <span className="text-sm font-medium text-text-muted">Recipient:</span>
                  <p className="text-text-primary font-semibold">{selected.recipientName}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-text-muted">Current Status:</span>
                  <p className="text-text-primary font-semibold capitalize">{selected.status}</p>
                </div>
              </div>

              <Select
                label="Select New Status"
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                placeholder="Choose status"
              >
                {STATUS.filter((s) => s.value !== "all").map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </Select>

              <div className="flex justify-end gap-3">
                <Button
                  variant="secondary"
                  onClick={() => setModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={updateStatus}
                  disabled={updating || newStatus === selected.status}
                  className="flex items-center gap-2"
                >
                  {updating ? "Updating..." : "Update Status"}
                </Button>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default VolunteerDonationRequests;