import React, { useEffect, useState } from "react";
import {
  FiPhone,
  FiMail,
  FiMapPin,
  FiCalendar,
  FiUser,
  FiDroplet,
  FiDownload,
} from "react-icons/fi";
import useAxios from "../hooks/useAxios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import DynamicTitle from "../components/shared/DynamicTitle";

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
      try {
        const districtsData = await fetch("/districts.json").then((res) =>
          res.json()
        );
        const upazilasData = await fetch("/upazilas.json").then((res) =>
          res.json()
        );
        setDistricts(districtsData.districts);
        setUpazilas(upazilasData.upazilas);
      } catch (err) {
        console.error("Error loading location data:", err);
      }
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
        )}&district=${encodeURIComponent(
          districtName
        )}&upazila=${encodeURIComponent(upazila)}`
      );
      setResults(res.data);
    } catch (err) {
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Blood Donation Search Results", 14, 15);
    doc.setFontSize(10);
    doc.text(`Total Donors Found: ${results.length}`, 14, 22);

    const tableColumn = [
      "Recipient Name",
      "Blood",
      "District",
      "Upazila",
      "Hospital",
      "Date",
    ];
    const tableRows = [];

    results.forEach((donor) => {
      const donorData = [
        donor.recipientName,
        donor.bloodGroup,
        donor.recipientDistrict,
        donor.recipientUpazila,
        donor.hospitalName || "N/A",
        new Date(donor.donationDate).toLocaleDateString(),
      ];
      tableRows.push(donorData);
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 30,
      theme: "grid",
      headStyles: { fillColor: [220, 38, 38] },
      styles: { fontSize: 9 },
    });

    doc.save("blood_donors_list.pdf");
  };

  return (
    <div className="min-h-screen bg-red-50 p-4">
      <DynamicTitle title="Search Blood Donors" />

      {/* Search Form Section */}
      <form
        onSubmit={handleSearch}
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
      >
        <select
          name="bloodGroup"
          required
          className="border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-red-500 transition"
        >
          <option value="">Select Blood Group</option>
          {bloodGroups.map((bg) => (
            <option key={bg} value={bg}>
              {bg}
            </option>
          ))}
        </select>

        <select
          name="district"
          value={selectedDistrict}
          onChange={(e) => setSelectedDistrict(e.target.value)}
          className="border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-red-500 transition"
        >
          <option value="">All Districts</option>
          {districts.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </select>

        <select
          name="upazila"
          disabled={!selectedDistrict}
          className="border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-red-500 transition"
        >
          <option value="">All Upazilas</option>
          {filteredUpazilas.map((u) => (
            <option key={u.id} value={u.name}>
              {u.name}
            </option>
          ))}
        </select>

        <button
          type="submit"
          disabled={loading}
          className="md:col-span-3 bg-red-600 text-white py-3 rounded-xl font-bold hover:bg-red-700 transition active:scale-95 flex items-center justify-center gap-2"
        >
          {loading ? "Searching..." : "Search Donors"}
        </button>
      </form>

      {/* Results  */}
      <div className="max-w-7xl mx-auto mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-800">
          {results.length > 0 ? `Donors Found (${results.length})` : "Results"}
        </h2>
        {results.length > 0 && (
          <button
            onClick={downloadPDF}
            className="w-full sm:w-auto bg-red-600 text-white px-6 py-2.5 rounded-xl flex items-center justify-center gap-2 hover:bg-red-700 transition shadow-md"
          >
            <FiDownload /> Download PDF
          </button>
        )}
      </div>

      {/* card */}
      {results.length > 0 ? (
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((donor, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border-l-8 border-red-600 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col items-center p-6 text-center"
            >
              <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-4 border border-red-100">
                <FiUser className="text-4xl text-red-600" />
              </div>

              <h3 className="text-xl font-bold text-gray-800">
                {donor.recipientName}
              </h3>
              <p className="text-gray-500 text-xs mb-3 italic">
                {donor.requesterEmail}
              </p>

              <span
                className={`px-4 py-1 rounded-full text-xs font-black uppercase mb-5 ${getBloodGroupColor(
                  donor.bloodGroup
                )}`}
              >
                Blood Group: {donor.bloodGroup}
              </span>

              <div className="w-full space-y-3 mb-6">
                <div className="flex items-center justify-center gap-2 text-gray-600">
                  <FiMapPin className="text-red-500 flex-shrink-0" />
                  <span className="text-sm font-medium">
                    {donor.recipientUpazila}, {donor.recipientDistrict}
                  </span>
                </div>

                {donor.hospitalName && (
                  <div className="flex items-center justify-center gap-2 text-gray-600">
                    <FiDroplet className="text-red-500 flex-shrink-0" />
                    <span className="text-sm font-medium truncate max-w-[200px]">
                      {donor.hospitalName}
                    </span>
                  </div>
                )}

                <div className="flex items-center justify-center gap-2 text-gray-600">
                  <FiCalendar className="text-red-500 flex-shrink-0" />
                  <span className="text-sm font-medium">
                    {new Date(donor.donationDate).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="flex gap-2 w-full mt-auto">
                <button className="flex-1 py-3 bg-red-50 text-red-600 font-bold rounded-xl hover:bg-red-100 transition flex items-center justify-center gap-2 text-sm border border-red-100">
                  <FiPhone /> Contact
                </button>
                <button className="flex-1 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition flex items-center justify-center gap-2 text-sm shadow-sm">
                  <FiMail /> Message
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        !loading && (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm max-w-7xl mx-auto border border-dashed border-gray-300">
            <p className="text-gray-400 font-medium">
              Search for donors to see results here.
            </p>
          </div>
        )
      )}
    </div>
  );
};

export default Search;
