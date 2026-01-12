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
    "A+": "bg-gradient-to-r from-red-100/90 to-red-200/90 dark:from-red-900/50 dark:to-red-800/50 text-red-700 dark:text-red-300",
    "A-": "bg-gradient-to-r from-red-50/90 to-red-100/90 dark:from-red-900/30 dark:to-red-800/30 text-red-600 dark:text-red-400",
    "B+": "bg-gradient-to-r from-blue-100/90 to-blue-200/90 dark:from-blue-900/50 dark:to-blue-800/50 text-blue-700 dark:text-blue-300",
    "B-": "bg-gradient-to-r from-blue-50/90 to-blue-100/90 dark:from-blue-900/30 dark:to-blue-800/30 text-blue-600 dark:text-blue-400",
    "AB+": "bg-gradient-to-r from-purple-100/90 to-purple-200/90 dark:from-purple-900/50 dark:to-purple-800/50 text-purple-700 dark:text-purple-300",
    "AB-": "bg-gradient-to-r from-purple-50/90 to-purple-100/90 dark:from-purple-900/30 dark:to-purple-800/30 text-purple-600 dark:text-purple-400",
    "O+": "bg-gradient-to-r from-green-100/90 to-green-200/90 dark:from-green-900/50 dark:to-green-800/50 text-green-700 dark:text-green-300",
    "O-": "bg-gradient-to-r from-green-50/90 to-green-100/90 dark:from-green-900/30 dark:to-green-800/30 text-green-600 dark:text-green-400",
  };
  return colors[bg] || "bg-gradient-to-r from-gray-100/90 to-gray-200/90 dark:from-gray-900/50 dark:to-gray-800/50 text-gray-700 dark:text-gray-300";
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

      doc.setFillColor(220, 38, 38);
      doc.rect(0, 0, doc.internal.pageSize.getWidth(), 40, 'F');

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(24);
      doc.setFont('helvetica', 'bold');
      doc.text('BloodConnect', 20, 25);

      doc.setFontSize(12);
      doc.text('Blood Donor Search Results', doc.internal.pageSize.getWidth() - 80, 25);

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
    <div className="min-h-screen bg-bg-primary dark:bg-bg-primary transition-colors duration-300">
      <DynamicTitle title="Search Blood Donors" />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-40 h-40 bg-primary/8 dark:bg-primary/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-accent/5 dark:bg-accent/10 rounded-full blur-3xl animate-pulse animation-delay-2000" />
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-green-500/5 dark:bg-green-400/8 rounded-full blur-2xl animate-pulse animation-delay-4000" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 lg:py-24">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-7xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-primary/15 to-blue-500/15 dark:from-primary/25 dark:to-blue-400/25 backdrop-blur-xl border-0 text-primary dark:text-blue-400 px-6 py-3 rounded-2xl text-sm font-bold mb-8 shadow-modern-lg dark:shadow-modern-xl">
              <FaUsers className="text-base animate-pulse" />
              <span className="uppercase tracking-wider">Find Blood Donors</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-text-primary leading-tight mb-8">
              Search for{" "}
              <span className="bg-gradient-to-r from-primary via-blue-600 to-indigo-700 dark:from-blue-400 dark:via-primary dark:to-blue-500 bg-clip-text text-transparent">
                Life Savers
              </span>
            </h1>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed font-medium">
              Find blood donors in your area quickly and easily. Connect with verified donors
              who are ready to help in times of emergency.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="mb-12">
            <form
              onSubmit={handleSearch}
              className="bg-bg-card/98 dark:bg-bg-card/95 backdrop-blur-xl rounded-3xl border-0 shadow-modern-xl dark:shadow-modern-2xl p-10"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-gradient-to-r from-primary/20 to-blue-500/20 dark:from-primary/30 dark:to-blue-400/30 backdrop-blur-xl rounded-2xl flex items-center justify-center">
                  <FiFilter className="text-primary text-lg" />
                </div>
                <h2 className="text-2xl font-black text-text-primary">
                  Search Filters
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                <div>
                  <label className="block text-lg font-bold text-text-primary mb-4 flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-red-500/20 to-pink-500/20 dark:from-red-400/30 dark:to-pink-400/30 rounded-xl flex items-center justify-center">
                      <FiDroplet className="text-red-600 dark:text-red-400 text-sm" />
                    </div>
                    Blood Group *
                  </label>
                  <select
                    name="bloodGroup"
                    required
                    className="w-full bg-bg-tertiary/90 dark:bg-bg-tertiary/70 backdrop-blur-xl border-0 text-text-primary px-6 py-4 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/30 dark:focus:ring-primary/40 transition-all duration-300 text-lg font-medium shadow-modern-sm focus:shadow-modern-lg"
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
                  <label className="block text-lg font-bold text-text-primary mb-4 flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 dark:from-blue-400/30 dark:to-indigo-400/30 rounded-xl flex items-center justify-center">
                      <FiMapPin className="text-blue-600 dark:text-blue-400 text-sm" />
                    </div>
                    District
                  </label>
                  <select
                    name="district"
                    value={selectedDistrict}
                    onChange={(e) => setSelectedDistrict(e.target.value)}
                    className="w-full bg-bg-tertiary/90 dark:bg-bg-tertiary/70 backdrop-blur-xl border-0 text-text-primary px-6 py-4 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/30 dark:focus:ring-primary/40 transition-all duration-300 text-lg font-medium shadow-modern-sm focus:shadow-modern-lg"
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
                  <label className="block text-lg font-bold text-text-primary mb-4 flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-green-500/20 to-emerald-500/20 dark:from-green-400/30 dark:to-emerald-400/30 rounded-xl flex items-center justify-center">
                      <FiMapPin className="text-green-600 dark:text-green-400 text-sm" />
                    </div>
                    Upazila
                  </label>
                  <select
                    name="upazila"
                    disabled={!selectedDistrict}
                    className="w-full bg-bg-tertiary/90 dark:bg-bg-tertiary/70 backdrop-blur-xl border-0 text-text-primary px-6 py-4 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/30 dark:focus:ring-primary/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-lg font-medium shadow-modern-sm focus:shadow-modern-lg"
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
                className="w-full bg-gradient-to-r from-primary via-blue-600 to-indigo-700 hover:from-indigo-700 hover:via-primary hover:to-blue-800 disabled:from-primary/60 disabled:to-blue-600/60 text-white px-10 py-6 rounded-2xl font-black text-xl shadow-modern-xl hover:shadow-modern-2xl transition-all duration-300 disabled:cursor-not-allowed flex items-center justify-center gap-4 border-0"
              >
                {loading ? (
                  <>
                    <FaSpinner className="animate-spin text-xl" />
                    <span className="font-bold">Searching Donors...</span>
                  </>
                ) : (
                  <>
                    <FiSearch className="text-2xl" />
                    <span>Search Blood Donors</span>
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Results Header */}
          {(results.length > 0 || loading) && (
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-between items-center gap-6 mb-12">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-primary/20 to-blue-500/20 dark:from-primary/30 dark:to-blue-400/30 backdrop-blur-xl rounded-2xl flex items-center justify-center">
                  <FaUsers className="text-primary text-lg" />
                </div>
                <h2 className="text-3xl font-black text-text-primary">
                  {loading ? "Searching..." : `Found ${results.length} Donor${results.length !== 1 ? 's' : ''}`}
                </h2>
              </div>

              {results.length > 0 && (
                <motion.button
                  onClick={downloadPDF}
                  disabled={downloadingPDF}
                  whileHover={{ scale: downloadingPDF ? 1 : 1.05 }}
                  whileTap={{ scale: downloadingPDF ? 1 : 0.95 }}
                  className="flex items-center gap-3 bg-gradient-to-r from-accent/90 to-blue-600/90 dark:from-accent/80 dark:to-blue-500/80 backdrop-blur-xl text-white border-0 px-8 py-4 rounded-2xl font-bold text-lg hover:from-blue-600/90 hover:to-accent/90 transition-all duration-300 shadow-modern-lg hover:shadow-modern-xl disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {downloadingPDF ? (
                    <>
                      <FaSpinner className="animate-spin text-lg" />
                      <span>Generating PDF...</span>
                    </>
                  ) : (
                    <>
                      <FiDownload className="text-lg" />
                      <span>Download PDF</span>
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
              className="bg-bg-card/98 dark:bg-bg-card/95 backdrop-blur-xl rounded-3xl border-0 shadow-modern-xl dark:shadow-modern-2xl p-16 text-center"
            >
              <div className="w-20 h-20 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-8"></div>
              <h3 className="text-2xl font-black text-text-primary mb-4">
                Searching for Donors
              </h3>
              <p className="text-xl text-text-secondary font-medium">
                Please wait while we find available blood donors in your area...
              </p>
            </motion.div>
          )}

          {/* Results Grid */}
          {!loading && results.length > 0 && (
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {results.map((donor, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="bg-gradient-to-br from-bg-card/98 to-bg-card/95 dark:from-bg-card/95 dark:to-bg-card/90 backdrop-blur-xl rounded-3xl border-0 shadow-modern-lg hover:shadow-modern-2xl transition-all duration-300 p-8 h-full flex flex-col"
                >
                  {/* Donor Avatar */}
                  <div className="flex flex-col items-center mb-8">
                    <div className="w-24 h-24 bg-gradient-to-r from-primary/20 to-blue-500/20 dark:from-primary/30 dark:to-blue-400/30 backdrop-blur-xl rounded-2xl flex items-center justify-center mb-6 border-0 shadow-modern-sm">
                      <FiUser className="text-4xl text-primary" />
                    </div>
                    <h3 className="text-2xl font-black text-text-primary text-center mb-2">
                      {donor.recipientName}
                    </h3>
                    <p className="text-text-muted text-base font-medium">
                      {donor.requesterEmail}
                    </p>
                  </div>

                  {/* Blood Group Badge */}
                  <div className="flex justify-center mb-8">
                    <span className={`px-6 py-3 rounded-2xl text-lg font-black uppercase backdrop-blur-xl border-0 shadow-modern-sm ${getBloodGroupColor(donor.bloodGroup)}`}>
                      {donor.bloodGroup}
                    </span>
                  </div>

                  {/* Donor Details */}
                  <div className="space-y-6 mb-8 flex-grow">
                    <div className="flex items-center gap-4 text-text-secondary bg-bg-tertiary/50 dark:bg-bg-tertiary/30 rounded-2xl p-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 dark:from-blue-400/30 dark:to-indigo-400/30 backdrop-blur-xl rounded-xl flex items-center justify-center">
                        <FiMapPin className="text-blue-600 dark:text-blue-400 text-lg" />
                      </div>
                      <span className="text-lg font-bold text-text-primary">
                        {donor.recipientUpazila}, {donor.recipientDistrict}
                      </span>
                    </div>

                    {donor.hospitalName && (
                      <div className="flex items-center gap-4 text-text-secondary bg-bg-tertiary/50 dark:bg-bg-tertiary/30 rounded-2xl p-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-green-500/20 to-emerald-500/20 dark:from-green-400/30 dark:to-emerald-400/30 backdrop-blur-xl rounded-xl flex items-center justify-center">
                          <FiDroplet className="text-green-600 dark:text-green-400 text-lg" />
                        </div>
                        <span className="text-lg font-bold text-text-primary truncate">
                          {donor.hospitalName}
                        </span>
                      </div>
                    )}

                    <div className="flex items-center gap-4 text-text-secondary bg-bg-tertiary/50 dark:bg-bg-tertiary/30 rounded-2xl p-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500/20 to-pink-500/20 dark:from-purple-400/30 dark:to-pink-400/30 backdrop-blur-xl rounded-xl flex items-center justify-center">
                        <FiCalendar className="text-purple-600 dark:text-purple-400 text-lg" />
                      </div>
                      <span className="text-lg font-bold text-text-primary">
                        {new Date(donor.donationDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4 mt-auto">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 bg-gradient-to-r from-bg-tertiary/90 to-bg-tertiary/80 dark:from-bg-tertiary/80 dark:to-bg-tertiary/70 backdrop-blur-xl text-primary border-0 py-4 rounded-2xl font-bold hover:from-primary/20 hover:to-blue-500/20 dark:hover:from-primary/30 dark:hover:to-blue-400/30 transition-all duration-300 flex items-center justify-center gap-3 text-lg shadow-modern-sm hover:shadow-modern-lg"
                    >
                      <FiPhone className="text-lg" />
                      <span>Contact</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 bg-gradient-to-r from-primary to-blue-600 hover:from-blue-600 hover:to-primary backdrop-blur-xl text-white border-0 py-4 rounded-2xl font-bold transition-all duration-300 flex items-center justify-center gap-3 text-lg shadow-modern-lg hover:shadow-modern-xl"
                    >
                      <FiMail className="text-lg" />
                      <span>Message</span>
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
              className="bg-bg-card/98 dark:bg-bg-card/95 backdrop-blur-xl rounded-3xl border-0 shadow-modern-xl dark:shadow-modern-2xl p-16 text-center"
            >
              <div className="w-24 h-24 bg-gradient-to-r from-bg-tertiary/90 to-bg-tertiary/80 dark:from-bg-tertiary/80 dark:to-bg-tertiary/70 backdrop-blur-xl rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-modern-sm">
                <FaHeart className="text-4xl text-text-muted" />
              </div>
              <h3 className="text-3xl font-black text-text-primary mb-6">
                Ready to Find Donors?
              </h3>
              <p className="text-xl text-text-secondary leading-relaxed max-w-lg mx-auto font-medium">
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