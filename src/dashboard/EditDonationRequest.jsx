import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../hooks/useAxiosSecure";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import {
  FaEdit,
  FaSpinner,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaClock,
  FaArrowLeft,
  FaUser,
  FaHospital,
} from "react-icons/fa";
import Loading from "../components/shared/Loading";
import DynamicTitle from "../components/shared/DynamicTitle";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Select } from "../components/ui/Select";
import { motion } from "framer-motion";
import { useSmoothScroll } from "../hooks/useSmoothScroll";

const EditDonationRequest = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const formRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");

  const [requestData, setRequestData] = useState({
    recipientName: "",
    recipientDistrict: "",
    recipientUpazila: "",
    hospitalName: "",
    hospitalAddress: "",
    donationDate: "",
    donationTime: "",
    requestMessage: "",
  });

  const [errors, setErrors] = useState({});

  // Initialize smooth scrolling
  useSmoothScroll();

  // Scroll to form when component mounts
  useEffect(() => {
    if (formRef.current) {
      formRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
      });
    }
  }, [loading]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const districtsRes = await axios.get("/districts.json");
        setDistricts(districtsRes.data.districts);

        const upazilasRes = await axios.get("/upazilas.json");
        setUpazilas(upazilasRes.data.upazilas);
      } catch (error) {
        console.error("Error fetching location data:", error);
        toast.error("Failed to load location data.");
      }
    };

    fetchData();
  }, []);

  const filteredUpazilas = upazilas.filter(
    (u) => u.district_id === selectedDistrict
  );

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const res = await axiosSecure.get(`/donation-requests/${id}`);
        const data = res.data;

        setRequestData({
          recipientName: data.recipientName || "",
          recipientDistrict: data.recipientDistrict || "",
          recipientUpazila: data.recipientUpazila || "",
          hospitalName: data.hospitalName || "",
          hospitalAddress: data.hospitalAddress || "",
          donationDate: data.donationDate
            ? data.donationDate.split("T")[0]
            : "",
          donationTime: data.donationTime || "",
          requestMessage: data.requestMessage || "",
        });

        if (data.recipientDistrict && districts.length > 0) {
          const matchedDistrict = districts.find(
            (d) => d.name === data.recipientDistrict
          );
          if (matchedDistrict) {
            setSelectedDistrict(matchedDistrict.id);
          }
        }
      } catch (err) {
        console.error("Failed to fetch request details:", err);
        toast.error("Failed to load request details.");
        navigate("/dashboard");
      } finally {
        setLoading(false);
      }
    };

    if (id && districts.length > 0) {
      fetchRequest();
    } else if (id && loading) {
    }
  }, [id, axiosSecure, navigate, districts]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRequestData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }

    if (name === "recipientDistrict") {
      const matchedDistrict = districts.find((d) => d.name === value);
      setSelectedDistrict(matchedDistrict ? matchedDistrict.id : "");
      setRequestData((prev) => ({
        ...prev,
        recipientUpazila: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!requestData.recipientName.trim()) {
      newErrors.recipientName = "Recipient name is required";
    }

    if (!requestData.recipientDistrict) {
      newErrors.recipientDistrict = "District is required";
    }

    if (!requestData.hospitalName.trim()) {
      newErrors.hospitalName = "Hospital name is required";
    }

    if (!requestData.donationDate) {
      newErrors.donationDate = "Donation date is required";
    }

    if (!requestData.donationTime) {
      newErrors.donationTime = "Donation time is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fill in all required fields");
      return;
    }

    setSubmitting(true);
    const toastId = toast.loading("Updating donation request...");

    const updatedRequest = {
      ...requestData,
    };

    delete updatedRequest.selectedDistrict;

    try {
      await axiosSecure.patch(`/donation-requests/${id}`, updatedRequest);

      toast.success("Donation request updated successfully!", { id: toastId });
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (err) {
      console.error("Update failed:", err);
      toast.error("Failed to update request. Please try again.", {
        id: toastId,
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container-safe">
      <div className="content-container">
        <DynamicTitle title="Edit Donation Request" />
        <Toaster position="top-right" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
          ref={formRef}
        >
          <Card className="overflow-hidden scroll-to-form">
            {/* Header */}
            <CardHeader className="bg-gradient-to-r from-red-600 to-red-500 text-white">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleBack}
                  className="text-white hover:bg-white/20 p-2"
                >
                  <FaArrowLeft className="text-lg" />
                </Button>
                <CardTitle className="text-2xl text-white flex items-center gap-3">
                  <FaEdit /> Edit Donation Request
                </CardTitle>
              </div>
            </CardHeader>

            {/* Request Info */}
            <div className="p-6 glass-border border-t-0 border-l-0 border-r-0 bg-red-50/50 dark:bg-red-900/10">
              <p className="text-lg font-medium text-text-primary">
                Editing Request for:{" "}
                <span className="font-semibold text-red-600 dark:text-red-400">
                  {requestData.recipientName}
                </span>
              </p>
              <p className="text-sm text-text-muted">ID: {id}</p>
            </div>

            {/* Form */}
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Recipient Details */}
                <Card className="border-2 border-red-100 dark:border-red-900/30">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg text-red-600 dark:text-red-400 flex items-center gap-2">
                      <FaUser /> Recipient Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Input
                      label="Recipient Name"
                      name="recipientName"
                      icon={FaUser}
                      placeholder="Enter recipient's full name"
                      value={requestData.recipientName}
                      onChange={handleChange}
                      error={errors.recipientName}
                      required
                    />
                  </CardContent>
                </Card>

                {/* Location Details */}
                <Card className="border-2 border-blue-100 dark:border-blue-900/30">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg text-blue-600 dark:text-blue-400 flex items-center gap-2">
                      <FaMapMarkerAlt /> Donation Location
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Select
                        label="Recipient District"
                        name="recipientDistrict"
                        icon={FaMapMarkerAlt}
                        value={requestData.recipientDistrict}
                        onChange={handleChange}
                        error={errors.recipientDistrict}
                        placeholder="Select District"
                      >
                        {districts.map((d) => (
                          <option key={d.id} value={d.name}>
                            {d.name}
                          </option>
                        ))}
                      </Select>

                      <Select
                        label="Recipient Upazila"
                        name="recipientUpazila"
                        icon={FaMapMarkerAlt}
                        value={requestData.recipientUpazila}
                        onChange={handleChange}
                        error={errors.recipientUpazila}
                        placeholder="Select Upazila"
                        disabled={!requestData.recipientDistrict}
                      >
                        {filteredUpazilas.length > 0 ? (
                          filteredUpazilas.map((u) => (
                            <option key={u.id} value={u.name}>
                              {u.name}
                            </option>
                          ))
                        ) : (
                          <option value="" disabled>
                            Select a District first
                          </option>
                        )}
                      </Select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Input
                        label="Hospital Name"
                        name="hospitalName"
                        icon={FaHospital}
                        placeholder="Enter hospital name"
                        value={requestData.hospitalName}
                        onChange={handleChange}
                        error={errors.hospitalName}
                        required
                      />

                      <Input
                        label="Hospital Address"
                        name="hospitalAddress"
                        icon={FaMapMarkerAlt}
                        placeholder="Enter full hospital address"
                        value={requestData.hospitalAddress}
                        onChange={handleChange}
                        error={errors.hospitalAddress}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Timing Details */}
                <Card className="border-2 border-green-100 dark:border-green-900/30">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg text-green-600 dark:text-green-400 flex items-center gap-2">
                      <FaCalendarAlt /> Donation Timing
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Input
                        label="Donation Date"
                        name="donationDate"
                        type="date"
                        icon={FaCalendarAlt}
                        value={requestData.donationDate}
                        onChange={handleChange}
                        error={errors.donationDate}
                        required
                      />

                      <Input
                        label="Donation Time"
                        name="donationTime"
                        type="time"
                        icon={FaClock}
                        value={requestData.donationTime}
                        onChange={handleChange}
                        error={errors.donationTime}
                        required
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Request Message */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-primary">
                    Request Message / Note
                  </label>
                  <textarea
                    name="requestMessage"
                    value={requestData.requestMessage}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Enter any additional information or special requirements..."
                    className="flex w-full rounded-xl bg-bg-tertiary/80 dark:bg-bg-tertiary/60 backdrop-blur-sm px-3 py-2 text-sm text-text-primary placeholder:text-text-muted interactive-border focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-all duration-300 resize-none"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-6 glass-border border-b-0 border-l-0 border-r-0">
                  <Button
                    type="submit"
                    disabled={submitting}
                    size="lg"
                    className="w-full flex items-center justify-center gap-3"
                  >
                    {submitting ? (
                      <>
                        <FaSpinner className="animate-spin" />
                        Updating Request...
                      </>
                    ) : (
                      <>
                        <FaEdit />
                        Update Donation Request
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default EditDonationRequest;
