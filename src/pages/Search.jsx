import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FiPhone,
  FiMail,
  FiMapPin,
  FiCalendar,
  FiUser,
  FiDroplet,
  FiDownload,
  FiSearch,
  FiFilter,
} from "react-icons/fi";
import { FaHeart, FaUsers, FaSpinner } from "react-icons/fa";
import useAxios from "../hooks/useAxios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import DynamicTitle from "../components/shared/DynamicTitle";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const getBloodGroupColor = (bg) => {
  const colors = {
    "A+": "bg-red-100/80 dark:bg-red-900/40 text-red-700 dark:text-red-300 border-red-200/50 dark:border-red-700/30",
    "A-": "bg-red-50/80 dark:bg-red-900/20 text-red-600 dark:text-red-400 border-red-200/30 dark:border-red-700/20",
    "B+": "bg-blue-100/80 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border-blue-200/50 dark:border-blue-700/30",
    "B-": "bg-blue-50/80 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-200/30 dark:border-blue-700/20",
    "AB+": "bg-purple-100/80 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 border-purple-200/50 dark:border-purple-700/30",
    "AB-": "bg-purple-50/80 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 border-purple-200/30 dark:border-purple-700/20",
    "O+": "bg-green-100/80 dark:bg-green-900/40 text-green-700 dark:text-green-300 border-green-200/50 dark:border-green-700/30",
    "O-": "bg-green-50/80 dark:bg-green-900/20 text-green-600 dark:text-green-400 border-green-200/30 dark:border-green-700/20",
  };
  return colors[bg] || "bg-gray-100/80 dark:bg-gray-900/40 text-gray-700 dark:text-gray-300 border-gray-200/50 dark:border-gray-700/30";
};

const Search = () => {
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [downloadingPDF, setDownloadingPDF] = useState(false);

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

  const downloadPDF = async () => {
    setDownloadingPDF(true);

    try {
      const doc = new jsPDF();

      // Header
      doc.setFillColor(220, 38, 38);
      doc.rect(0, 0, doc.internal.pageSize.getWidth(), 40, 'F');

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(24);
      doc.setFont('helvetica', 'bold');
      doc.text('BloodConnect', 20, 25);

      doc.setFontSize(12);
      doc.text('Blood Donor Search Results', doc.internal.pageSize.getWidth() - 80, 25);

      // Reset text color
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(18);
      doc.setFont('helvetica', 'bold');
      doc.text('Blood Donation Search Results', 20, 55);

      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      doc.text(`Total Donors Found: ${results.length}`, 20, 65);
      doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 75);

      const tableColumn = [
        "Recipient Name",
        "Blood Group",
        "District",
        "Upazila",
        "Hospital",
        "Date Needed",
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
        startY: 85,
        theme: "grid",
        headStyles: {
          fillColor: [220, 38, 38],
          textColor: [255, 255, 255],
          fontStyle: 'bold'
        },
        styles: {
          fontSize: 9,
          cellPadding: 3
        },
        alternateRowStyles: {
          fillColor: [248, 249, 250]
        }
      });

      doc.save(`blood_donors_search_${new Date().toISOString().split('T')[0]}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setDownloadingPDF(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.6
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50/30 via-white/20 to-pink-50/30 dark:from-gray-900/50 dark:via-gray-800/30 dark:to-gray-900/50 backdrop-blur-sm">
      <DynamicTitle title="Search Blood Donors" />

      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-40 h-40 bg-red-100/20 dark:bg-red-900/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-pink-100/20 dark:bg-pink-900/10 rounded-full blur-3xl animate-pulse animation-delay-2000" />
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-blue-100/20 dark:bg-blue-900/10 rounded-full blur-2xl animate-pulse animation-delay-4000" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-7xl mx-auto"
        >
          {/* Header Section */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-red-50/80 dark:bg-red-900/30 backdrop-blur-sm border border-red-200/50 dark:border-red-700/30 text-red-600 dark:text-red-400 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <FaUsers className="text-sm" />
              <span className="uppercase tracking-wide">Find Blood Donors</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight mb-6">
              Search for{" "}
              <span className="text-red-600 dark:text-red-400">Life Savers</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Find blood donors in your area quickly and easily. Connect with verified donors
              who are ready to help in times of emergency.
            </p>
          </motion.div>

          {/* Search Form Section */}
          <motion.div variants={itemVariants} className="mb-12">
            <form
              onSubmit={handleSearch}
              className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl border border-white/30 dark:border-gray-700/30 shadow-lg p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-red-100/80 dark:bg-red-900/40 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <FiFilter className="text-red-600 dark:text-red-400" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Search Filters
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Blood Group *
                  </label>
                  <select
                    name="bloodGroup"
                    required
                    className="w-full bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-white/40 dark:border-gray-700/40 text-gray-900 dark:text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-all duration-300"
                  >
                    <option value="">Select Blood Group</option>
                    {bloodGroups.map((bg) => (
                      <option key={bg} value={bg}>
                        {bg}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    District
                  </label>
                  <select
                    name="district"
                    value={selectedDistrict}
                    onChange={(e) => setSelectedDistrict(e.target.value)}
                    className="w-full bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-white/40 dark:border-gray-700/40 text-gray-900 dark:text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-all duration-300"
                  >
                    <option value="">All Districts</option>
                    {districts.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Upazila
                  </label>
                  <select
                    name="upazila"
                    disabled={!selectedDistrict}
                    className="w-full bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-white/40 dark:border-gray-700/40 text-gray-900 dark:text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <option value="">All Upazilas</option>
                    {filteredUpazilas.map((u) => (
                      <option key={u.id} value={u.name}>
                        {u.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
                className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 disabled:from-red-400 disabled:to-red-500 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                {loading ? (
                  <>
                    <FaSpinner className="animate-spin" />
                    Searching Donors...
                  </>
                ) : (
                  <>
                    <FiSearch />
                    Search Blood Donors
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Results Header */}
          {(results.length > 0 || loading) && (
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100/80 dark:bg-green-900/40 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <FaUsers className="text-green-600 dark:text-green-400" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {loading ? "Searching..." : `Found ${results.length} Donor${results.length !== 1 ? 's' : ''}`}
                </h2>
              </div>

              {results.length > 0 && (
                <motion.button
                  onClick={downloadPDF}
                  disabled={downloadingPDF}
                  whileHover={{ scale: downloadingPDF ? 1 : 1.02 }}
                  whileTap={{ scale: downloadingPDF ? 1 : 0.98 }}
                  className="flex items-center gap-2 bg-blue-600/90 dark:bg-blue-600/80 backdrop-blur-sm text-white border border-blue-500/30 px-6 py-3 rounded-xl font-semibold hover:bg-blue-700/90 dark:hover:bg-blue-700/80 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {downloadingPDF ? (
                    <>
                      <FaSpinner className="animate-spin" />
                      Generating PDF...
                    </>
                  ) : (
                    <>
                      <FiDownload />
                      Download PDF
                    </>
                  )}
                </motion.button>
              )}
            </motion.div>
          )}

          {/* Loading State */}
          {loading && (
            <motion.div
              variants={itemVariants}
              className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl border border-white/30 dark:border-gray-700/30 shadow-lg p-12 text-center"
            >
              <div className="w-16 h-16 border-4 border-red-500/30 border-t-red-500 rounded-full animate-spin mx-auto mb-6"></div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Searching for Donors
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Please wait while we find available blood donors in your area...
              </p>
            </motion.div>
          )}

          {/* Results Grid */}
          {!loading && results.length > 0 && (
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {results.map((donor, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl border border-white/30 dark:border-gray-700/30 shadow-lg hover:shadow-xl transition-all duration-300 p-6 h-full flex flex-col"
                >
                  {/* Donor Avatar */}
                  <div className="flex flex-col items-center mb-6">
                    <div className="w-20 h-20 bg-red-100/80 dark:bg-red-900/40 backdrop-blur-sm rounded-full flex items-center justify-center mb-4 border border-red-200/50 dark:border-red-700/30">
                      <FiUser className="text-3xl text-red-600 dark:text-red-400" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white text-center">
                      {donor.recipientName}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                      {donor.requesterEmail}
                    </p>
                  </div>

                  {/* Blood Group Badge */}
                  <div className="flex justify-center mb-6">
                    <span className={`px-4 py-2 rounded-full text-sm font-bold uppercase backdrop-blur-sm border ${getBloodGroupColor(donor.bloodGroup)}`}>
                      {donor.bloodGroup}
                    </span>
                  </div>

                  {/* Donor Details */}
                  <div className="space-y-4 mb-6 flex-grow">
                    <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                      <div className="w-8 h-8 bg-gray-100/80 dark:bg-gray-800/60 backdrop-blur-sm rounded-lg flex items-center justify-center">
                        <FiMapPin className="text-red-500 text-sm" />
                      </div>
                      <span className="text-sm font-medium">
                        {donor.recipientUpazila}, {donor.recipientDistrict}
                      </span>
                    </div>

                    {donor.hospitalName && (
                      <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                        <div className="w-8 h-8 bg-gray-100/80 dark:bg-gray-800/60 backdrop-blur-sm rounded-lg flex items-center justify-center">
                          <FiDroplet className="text-red-500 text-sm" />
                        </div>
                        <span className="text-sm font-medium truncate">
                          {donor.hospitalName}
                        </span>
                      </div>
                    )}

                    <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                      <div className="w-8 h-8 bg-gray-100/80 dark:bg-gray-800/60 backdrop-blur-sm rounded-lg flex items-center justify-center">
                        <FiCalendar className="text-red-500 text-sm" />
                      </div>
                      <span className="text-sm font-medium">
                        {new Date(donor.donationDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 mt-auto">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm text-red-600 dark:text-red-400 border border-red-200/50 dark:border-red-700/30 py-3 rounded-xl font-semibold hover:bg-red-50/80 dark:hover:bg-red-900/20 transition-all duration-300 flex items-center justify-center gap-2 text-sm"
                    >
                      <FiPhone />
                      Contact
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 bg-red-600/90 dark:bg-red-600/80 backdrop-blur-sm text-white border border-red-500/30 py-3 rounded-xl font-semibold hover:bg-red-700/90 dark:hover:bg-red-700/80 transition-all duration-300 flex items-center justify-center gap-2 text-sm shadow-lg hover:shadow-xl"
                    >
                      <FiMail />
                      Message
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Empty State */}
          {!loading && results.length === 0 && (
            <motion.div
              variants={itemVariants}
              className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl border border-white/30 dark:border-gray-700/30 shadow-lg p-12 text-center"
            >
              <div className="w-20 h-20 bg-gray-100/80 dark:bg-gray-800/60 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6">
                <FaHeart className="text-3xl text-gray-400 dark:text-gray-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Ready to Find Donors?
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed max-w-md mx-auto">
                Use the search filters above to find blood donors in your area.
                Select a blood group to get started.
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Search;
