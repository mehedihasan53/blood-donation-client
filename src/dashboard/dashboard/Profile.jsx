import React, { useState, useEffect } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useAuth } from "../../Provider/AuthProvider";
import {
  FaUser,
  FaEnvelope,
  FaTint,
  FaMapMarkerAlt,
  FaEdit,
  FaSave,
  FaTimes,
  FaUserShield,
  FaUserFriends,
} from "react-icons/fa";
import toast from "react-hot-toast";
import Loading from "../../components/shared/Loading";
import DynamicTitle from "../../components/shared/DynamicTitle";

const Profile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bloodGroup: "",
    district: "",
    upazila: "",
    avatar: "",
    role: "",
  });
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user?.email) fetchUserData();
    fetchLocationData();
  }, [user]);

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
    } catch (error) {
      console.error("Location error:", error);
    }
  };

  const fetchUserData = async () => {
    setLoading(true);
    try {
      const response = await axiosSecure.get(`/users/role/${user.email}`);
      const userData = response.data;
      setFormData({
        name: userData.name || "",
        email: userData.email || "",
        bloodGroup: userData.bloodGroup || "",
        district: userData.district || "",
        upazila: userData.upazila || "",
        avatar: userData.avatar || "",
        role: userData.role || "donor",
      });
      if (userData.district) {
        const districtObj = districts.find((d) => d.name === userData.district);
        if (districtObj) setSelectedDistrict(districtObj.id);
      }
    } catch (error) {
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const filteredUpazilas = upazilas.filter(
    (u) => String(u.district_id) === String(selectedDistrict)
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "districtId") {
      setSelectedDistrict(value);
      const districtObj = districts.find((d) => d.id == value);
      setFormData((prev) => ({
        ...prev,
        district: districtObj ? districtObj.name : "",
        upazila: "",
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Save profile updates
  const handleSave = async () => {
    if (!formData.name.trim()) return toast.error("Name is required");
    setSaving(true);
    try {
      const { role, email, ...updateData } = formData;
      await axiosSecure.patch(`/users/${user.email}`, updateData);
      toast.success("Profile updated!");
      setEditMode(false);
      fetchUserData();
    } catch (error) {
      toast.error("Update failed");
    } finally {
      setSaving(false);
    }
  };

  const getBloodGroupColor = (bg) => {
    const colors = {
      "A+": "bg-red-100 text-red-800",
      "B+": "bg-blue-100 text-blue-800",
      "O+": "bg-green-100 text-green-800",
    };
    return colors[bg] || "bg-gray-100 text-gray-700";
  };

  const getRoleBadge = (role) => {
    const colors = {
      admin: "bg-purple-100 text-purple-800",
      volunteer: "bg-blue-100 text-blue-800",
      donor: "bg-green-100 text-green-800",
    };
    return colors[role] || "bg-gray-100 text-gray-800";
  };

  const getRoleIcon = (role) => {
    if (role === "admin") return <FaUserShield className="text-purple-600" />;
    if (role === "volunteer")
      return <FaUserFriends className="text-blue-600" />;
    return <FaUser className="text-green-600" />;
  };

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <DynamicTitle title="My Profile" />
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-600 mt-2">Manage your personal information</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-red-500 to-red-600 p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="w-32 h-32 bg-white rounded-full border-4 border-white shadow-lg overflow-hidden">
                {formData.avatar ? (
                  <img
                    src={formData.avatar}
                    alt="avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <FaUser className="text-5xl text-gray-400" />
                  </div>
                )}
              </div>

              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-white uppercase tracking-tight">
                      {formData.name || "User Name"}
                    </h2>

                    <div className="mt-1 mb-2">
                      <span
                        className={`inline-flex items-center px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm bg-white ${
                          getRoleBadge(formData.role).split(" ")[1]
                        }`}
                      >
                        {formData.role}
                      </span>
                    </div>

                    <div className="flex items-center justify-center md:justify-start gap-2">
                      <FaEnvelope className="text-white/80" />
                      <p className="text-white/90 text-sm">{formData.email}</p>
                    </div>
                  </div>

                  <div className="flex gap-3 justify-center">
                    {editMode ? (
                      <>
                        <button
                          onClick={() => {
                            setEditMode(false);
                            fetchUserData();
                          }}
                          className="px-4 py-2 bg-white/20 text-white rounded-lg flex items-center gap-2"
                        >
                          <FaTimes /> Cancel
                        </button>
                        <button
                          onClick={handleSave}
                          disabled={saving}
                          className="px-4 py-2 bg-white text-red-600 font-semibold rounded-lg flex items-center gap-2"
                        >
                          {saving ? "Saving..." : "Save"}
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => setEditMode(true)}
                        className="px-4 py-2 bg-white text-red-600 font-semibold rounded-lg flex items-center gap-2"
                      >
                        <FaEdit /> Edit
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <FaUser className="text-gray-400" /> Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={!editMode}
                className={`w-full px-4 py-3 rounded-lg border ${
                  editMode
                    ? "border-red-300 focus:ring-2 focus:ring-red-500"
                    : "bg-gray-50 border-gray-200"
                }`}
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <FaTint className="text-gray-400" /> Blood Group
              </label>
              <select
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleChange}
                disabled={!editMode}
                className="w-full px-4 py-3 rounded-lg border"
              >
                <option value="">Select</option>
                {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                  (bg) => (
                    <option key={bg} value={bg}>
                      {bg}
                    </option>
                  )
                )}
              </select>
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <FaMapMarkerAlt className="text-gray-400" /> District
              </label>
              <select
                name="districtId"
                value={selectedDistrict}
                onChange={handleChange}
                disabled={!editMode}
                className="w-full px-4 py-3 rounded-lg border"
              >
                <option value="">Select District</option>
                {districts.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <FaMapMarkerAlt className="text-gray-400" /> Upazila
              </label>
              <select
                name="upazila"
                value={formData.upazila}
                onChange={handleChange}
                disabled={!editMode || !selectedDistrict}
                className="w-full px-4 py-3 rounded-lg border"
              >
                <option value="">Select Upazila</option>
                {filteredUpazilas.map((u) => (
                  <option key={u.id} value={u.name}>
                    {u.name}
                  </option>
                ))}
              </select>
            </div>

            {editMode && (
              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Avatar URL
                </label>
                <input
                  type="text"
                  name="avatar"
                  value={formData.avatar}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-lg"
                  placeholder="Image URL"
                />
              </div>
            )}
          </div>

          {/* Account Footer Info */}
          <div className="p-6 md:p-8 bg-gray-50 border-t flex flex-wrap gap-4">
            <div className="flex-1 min-w-[120px]">
              <p className="text-xs text-gray-500 uppercase">Role</p>
              <div className="flex items-center gap-2 mt-1">
                {getRoleIcon(formData.role)}
                <span className="font-bold text-gray-800 capitalize">
                  {formData.role}
                </span>
              </div>
            </div>
            <div className="flex-1 min-w-[120px]">
              <p className="text-xs text-gray-500 uppercase">Status</p>
              <p className="text-green-600 font-bold mt-1 uppercase">Active</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
