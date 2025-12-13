import { useEffect, useState } from "react";
import { useAuth } from "../Provider/AuthProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import {
  FaUser,
  FaEnvelope,
  FaHospital,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaClock,
  FaTint,
  FaFileAlt,
} from "react-icons/fa";
import useAxiosSecure from "../hooks/useAxiosSecure";

const AddRequest = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [districtId, setDistrictId] = useState("");
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axios
      .get("/districts.json")
      .then((res) => setDistricts(res.data.districts));
    axios.get("/upazilas.json").then((res) => setUpazilas(res.data.upazilas));
  }, []);

  const filteredUpazilas = upazilas.filter((u) => u.district_id === districtId);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const district = districts.find((d) => d.id === districtId)?.name || "";

    const data = {
      requesterName: user?.displayName || "",
      requesterEmail: user?.email || "",
      recipientName: form.recipientName.value,
      recipientDistrict: district,
      recipientUpazila: form.recipientUpazila.value,
      hospitalName: form.hospitalName.value,
      fullAddress: form.fullAddress.value,
      bloodGroup: form.bloodGroup.value,
      donationDate: form.donationDate.value,
      donationTime: form.donationTime.value,
      requestMessage: form.requestMessage.value,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    try {
      await axiosSecure.post("/donation-requests", data);

      toast.success("Request created successfully!");

      navigate("/dashboard/my-donation-requests");
    } catch {
      toast.error("Failed to create request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header Card */}
        <div className="mb-8 bg-gradient-to-r from-red-600 to-red-700 rounded-2xl shadow-2xl overflow-hidden">
          <div className="p-8 text-white">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <FaFileAlt className="text-3xl" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Create Blood Request</h1>
                <p className="text-red-100 mt-2">
                  Fill the form to request blood donation
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          <form onSubmit={handleSubmit} className="p-8">
            {/* User Info */}
            <div className="mb-10">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                  <FaUser className="text-red-600" />
                </div>
                Your Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name
                  </label>
                  <div className="relative">
                    <FaUser className="absolute left-4 top-3.5 text-gray-400" />
                    <input
                      value={user?.displayName || ""}
                      readOnly
                      className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Email
                  </label>
                  <div className="relative">
                    <FaEnvelope className="absolute left-4 top-3.5 text-gray-400" />
                    <input
                      value={user?.email || ""}
                      readOnly
                      className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Recipient Details */}
            <div className="mb-10">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                  <FaUser className="text-red-600" />
                </div>
                Recipient Details
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Recipient Name *
                  </label>
                  <div className="relative">
                    <FaUser className="absolute left-4 top-3.5 text-gray-400" />
                    <input
                      name="recipientName"
                      placeholder="Enter recipient's full name"
                      className="w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      District *
                    </label>
                    <div className="relative">
                      <FaMapMarkerAlt className="absolute left-4 top-3.5 text-gray-400" />
                      <select
                        value={districtId}
                        onChange={(e) => setDistrictId(e.target.value)}
                        className="w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none appearance-none bg-white"
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
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Upazila *
                    </label>
                    <div className="relative">
                      <FaMapMarkerAlt className="absolute left-4 top-3.5 text-gray-400" />
                      <select
                        name="recipientUpazila"
                        disabled={!districtId}
                        className={`w-full pl-12 pr-4 py-3.5 border rounded-xl outline-none appearance-none ${
                          !districtId
                            ? "bg-gray-100 border-gray-200 cursor-not-allowed"
                            : "border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white"
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
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hospital Name *
                  </label>
                  <div className="relative">
                    <FaHospital className="absolute left-4 top-3.5 text-gray-400" />
                    <input
                      name="hospitalName"
                      placeholder="e.g., Dhaka Medical College Hospital"
                      className="w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Address *
                  </label>
                  <div className="relative">
                    <FaMapMarkerAlt className="absolute left-4 top-3.5 text-gray-400" />
                    <input
                      name="fullAddress"
                      placeholder="Street address with details"
                      className="w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Donation Details */}
            <div className="mb-10">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                  <FaTint className="text-red-600" />
                </div>
                Donation Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Blood Group *
                  </label>
                  <div className="relative">
                    <FaTint className="absolute left-4 top-3.5 text-gray-400" />
                    <select
                      name="bloodGroup"
                      className="w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none appearance-none bg-white"
                      required
                    >
                      <option value="">Select Blood Group</option>
                      {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                        (bg) => (
                          <option key={bg} value={bg}>
                            {bg}
                          </option>
                        )
                      )}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Donation Date *
                  </label>
                  <div className="relative">
                    <FaCalendarAlt className="absolute left-4 top-3.5 text-gray-400" />
                    <input
                      name="donationDate"
                      type="date"
                      className="w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Donation Time *
                  </label>
                  <div className="relative">
                    <FaClock className="absolute left-4 top-3.5 text-gray-400" />
                    <input
                      name="donationTime"
                      type="time"
                      className="w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Request Message *
                </label>
                <div className="relative">
                  <FaFileAlt className="absolute left-4 top-4 text-gray-400" />
                  <textarea
                    name="requestMessage"
                    rows={5}
                    placeholder="Please provide details about why blood donation is needed, patient condition, urgency, and any other relevant information..."
                    className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none resize-none"
                    required
                  />
                </div>
                <p className="text-sm text-gray-500 mt-3">
                  Be specific to help donors understand the urgency.
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={loading}
                className={`px-12 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-[1.02] ${
                  loading
                    ? "bg-red-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 shadow-xl hover:shadow-2xl"
                } text-white flex items-center space-x-3`}
              >
                {loading ? (
                  <>
                    <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Creating Request...</span>
                  </>
                ) : (
                  <>
                    <FaFileAlt className="text-xl" />
                    <span>Submit Donation Request</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddRequest;
