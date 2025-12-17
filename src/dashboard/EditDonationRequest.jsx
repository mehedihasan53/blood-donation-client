import React, { useEffect, useState } from "react";
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
} from "react-icons/fa";
import Loading from "../components/shared/Loading";
import DynamicTitle from "../components/shared/DynamicTitle";

const EditDonationRequest = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

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

    if (name === "recipientDistrict") {
      const matchedDistrict = districts.find((d) => d.name === value);
      setSelectedDistrict(matchedDistrict ? matchedDistrict.id : "");
      setRequestData((prev) => ({
        ...prev,
        recipientUpazila: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <Toaster />
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-red-600 text-white p-6 md:p-8 flex items-center justify-start gap-4">
          <button
            onClick={handleBack}
            className="p-2 rounded-full hover:bg-red-700 transition duration-200"
            aria-label="Go back to previous page"
          >
            <FaArrowLeft className="text-xl" />
          </button>

          <h1 className="text-3xl font-bold flex items-center gap-3">
            <FaEdit /> Edit Donation Request
          </h1>
        </div>

        <div className="p-6 border-b border-gray-100 bg-red-50">
          <p className="text-lg font-medium text-gray-700">
            Editing Request for:{" "}
            <span className="font-semibold text-red-700">
              {requestData.recipientName}
            </span>
          </p>
          <p className="text-sm text-gray-500">ID: {id}</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 md:p-10 space-y-6">
          <fieldset className="border border-gray-200 p-4 rounded-lg space-y-4">
            <legend className="text-lg font-semibold text-red-600 px-2">
              Recipient Details
            </legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="block col-span-2">
                <span className="text-gray-700 font-medium">
                  Recipient Name:
                </span>
                <input
                  type="text"
                  name="recipientName"
                  value={requestData.recipientName}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 p-3"
                />
              </label>
            </div>
          </fieldset>

          <fieldset className="border border-gray-200 p-4 rounded-lg space-y-4">
            <legend className="text-lg font-semibold text-red-600 px-2 flex items-center gap-1">
              <FaMapMarkerAlt className="text-sm" /> Donation Location
            </legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="block">
                <span className="text-gray-700 font-medium">
                  Recipient District:
                </span>
                <select
                  name="recipientDistrict"
                  value={requestData.recipientDistrict}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 p-3"
                >
                  <option value="" disabled>
                    Select District
                  </option>
                  {districts.map((d) => (
                    <option key={d.id} value={d.name}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="text-gray-700 font-medium">
                  Recipient Upazila:
                </span>
                <select
                  name="recipientUpazila"
                  value={requestData.recipientUpazila}
                  onChange={handleChange}
                  required
                  disabled={!requestData.recipientDistrict}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 p-3 disabled:bg-gray-100"
                >
                  <option value="" disabled>
                    Select Upazila
                  </option>
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
                </select>
              </label>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="block">
                <span className="text-gray-700 font-medium">
                  Hospital Name:
                </span>
                <input
                  type="text"
                  name="hospitalName"
                  value={requestData.hospitalName}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 p-3"
                />
              </label>
              <label className="block">
                <span className="text-gray-700 font-medium">
                  Full Hospital Address:
                </span>
                <input
                  type="text"
                  name="hospitalAddress"
                  value={requestData.hospitalAddress}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 p-3"
                />
              </label>
            </div>
          </fieldset>

          <fieldset className="border border-gray-200 p-4 rounded-lg space-y-4">
            <legend className="text-lg font-semibold text-red-600 px-2 flex items-center gap-1">
              <FaCalendarAlt className="text-sm" /> Donation Timing
            </legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="block">
                <span className="text-gray-700 font-medium flex items-center gap-1">
                  <FaCalendarAlt /> Donation Date:
                </span>
                <input
                  type="date"
                  name="donationDate"
                  value={requestData.donationDate}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 p-3"
                />
              </label>

              <label className="block">
                <span className="text-gray-700 font-medium flex items-center gap-1">
                  <FaClock /> Donation Time:
                </span>
                <input
                  type="time"
                  name="donationTime"
                  value={requestData.donationTime}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 p-3"
                />
              </label>
            </div>
          </fieldset>

          <label className="block">
            <span className="text-gray-700 font-medium">
              Request Message / Note:
            </span>
            <textarea
              name="requestMessage"
              value={requestData.requestMessage}
              onChange={handleChange}
              rows="3"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 p-3"
            ></textarea>
          </label>

          <div className="pt-4 border-t border-gray-100">
            <button
              type="submit"
              disabled={submitting}
              className="w-full flex justify-center items-center px-4 py-3 border border-transparent text-lg font-medium rounded-xl shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all disabled:bg-red-400 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <>
                  <FaSpinner className="animate-spin mr-3" /> Updating
                  Request...
                </>
              ) : (
                <>
                  <FaEdit className="mr-2" /> Update Donation Request
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditDonationRequest;
