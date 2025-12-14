import React, { useEffect, useState } from "react";
import {
  FiPhone,
  FiMail,
  FiMapPin,
  FiCalendar,
  FiUser,
  FiDroplet,
} from "react-icons/fi";
import useAxios from "../hooks/useAxios";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const getBloodGroupColor = (bg) => {
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
  return colors[bg] || "bg-gray-100 text-gray-800";
};

const Search = () => {
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const axiosInstance = useAxios();

  useEffect(() => {
    const fetchData = async () => {
      const districtsData = await fetch("/districts.json").then((res) =>
        res.json()
      );
      const upazilasData = await fetch("/upazilas.json").then((res) =>
        res.json()
      );
      setDistricts(districtsData.districts);
      setUpazilas(upazilasData.upazilas);
    };
    fetchData();
  }, []);

  const filteredUpazilas = upazilas.filter(
    (u) => String(u.district_id) === String(selectedDistrict)
  );

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);

    const bloodGroup = e.target.bloodGroup.value;
    const districtId = e.target.district.value;
    const districtName = districts.find((d) => d.id == districtId)?.name || "";
    const upazila = e.target.upazila.value || "";

    try {
      const res = await axiosInstance.get(
        `/search-request?bloodGroup=${encodeURIComponent(
          bloodGroup
        )}&district=${encodeURIComponent(districtName)}&upazila=${encodeURIComponent(
          upazila
        )}`
      );
      setResults(res.data);
    } catch (err) {
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Search Form */}
      <form
        onSubmit={handleSearch}
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
      >
        {/* Blood Group */}
        <select
          name="bloodGroup"
          required
          className="border rounded-xl px-4 py-3"
        >
          <option value="">Select Blood Group</option>
          {bloodGroups.map((bg) => (
            <option key={bg} value={bg}>
              {bg}
            </option>
          ))}
        </select>

        {/* District */}
        <select
          name="district"
          value={selectedDistrict}
          onChange={(e) => setSelectedDistrict(e.target.value)}
          className="border rounded-xl px-4 py-3"
        >
          <option value="">All Districts</option>
          {districts.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </select>

        {/* Upazila */}
        <select
          name="upazila"
          disabled={!selectedDistrict}
          className="border rounded-xl px-4 py-3"
        >
          <option value="">All Upazilas</option>
          {filteredUpazilas.map((u) => (
            <option key={u.id} value={u.name}>
              {u.name}
            </option>
          ))}
        </select>

        {/* Search Button */}
        <button
          type="submit"
          disabled={loading}
          className="md:col-span-3 bg-gradient-to-r from-red-600 to-red-700 text-white py-3 rounded-xl hover:from-red-700 hover:to-red-800 transition"
        >
          {loading ? "Searching..." : "Search Donors"}
        </button>
      </form>

      {/* Results */}
      {results.length > 0 ? (
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((donor, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-gray-200 shadow hover:shadow-lg transition transform hover:-translate-y-1"
            >
              {/* Card Header */}
              <div className="p-6 border-b border-gray-100 flex justify-between items-start">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mr-4">
                    <FiUser className="text-2xl text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">
                      {donor.recipientName}
                    </h3>
                    <p className="text-gray-600 text-sm">{donor.requesterEmail}</p>
                  </div>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-bold ${getBloodGroupColor(
                    donor.bloodGroup
                  )}`}
                >
                  {donor.bloodGroup}
                </span>
              </div>

              {/* Card Details */}
              <div className="p-6 space-y-4">
                {/* Location */}
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center mr-3">
                    <FiMapPin className="text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-medium">
                      {donor.recipientUpazila}, {donor.recipientDistrict}
                    </p>
                  </div>
                </div>

                {/* Hospital */}
                {donor.hospitalName && (
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center mr-3">
                      <FiDroplet className="text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Hospital</p>
                      <p className="font-medium">{donor.hospitalName}</p>
                    </div>
                  </div>
                )}

                {/* Donation Date */}
                {donor.donationDate && (
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center mr-3">
                      <FiCalendar className="text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Donation Date</p>
                      <p className="font-medium">
                        {new Date(donor.donationDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                )}

                {/* Full Address */}
                {donor.fullAddress && (
                  <p className="text-gray-500 text-sm">{donor.fullAddress}</p>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3 mt-4">
                  <button className="flex-1 py-3 px-4 bg-red-50 text-red-600 font-medium rounded-xl hover:bg-red-100 transition flex items-center justify-center">
                    <FiPhone className="mr-2" /> Contact
                  </button>
                  <button className="flex-1 py-3 px-4 bg-red-600 text-white font-medium rounded-xl hover:bg-red-700 transition flex items-center justify-center">
                    <FiMail className="mr-2" /> Message
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center mt-8">
          No donors found for selected criteria.
        </p>
      )}
    </div>
  );
};

export default Search;
