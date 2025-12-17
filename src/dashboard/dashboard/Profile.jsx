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
    if (user?.email) {
      fetchUserData();
    }
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
      console.error("Error fetching location data:", error);
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
      console.error("Error fetching user data:", error);
      toast.error("Failed to load profile data");
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
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSave = async () => {
    if (!formData.name.trim()) {
      toast.error("Name is required");
      return;
    }

    setSaving(true);
    try {
      const updateData = {
        name: formData.name,
        bloodGroup: formData.bloodGroup,
        district: formData.district,
        upazila: formData.upazila,
        avatar: formData.avatar,
      };

      await axiosSecure.patch(`/users/${user.email}`, updateData);
      toast.success("Profile updated successfully!");
      setEditMode(false);
      fetchUserData();
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    fetchUserData();
    setEditMode(false);
  };

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
    const icons = {
      admin: <FaUserShield className="text-purple-600" />,
      volunteer: <FaUserFriends className="text-blue-600" />,
      donor: <FaUser className="text-green-600" />,
    };
    return icons[role] || <FaUser className="text-gray-600" />;
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <DynamicTitle title="My Profile" />
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-600 mt-2">
            Manage your personal information and preferences
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-red-500 to-red-600 p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="relative">
                <div className="w-32 h-32 bg-white rounded-full border-4 border-white shadow-lg overflow-hidden">
                  {formData.avatar ? (
                    <img
                      src={formData.avatar}
                      alt={formData.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center">
                      <FaUser className="text-5xl text-gray-400" />
                    </div>
                  )}
                </div>
              </div>

              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-white">
                      {formData.name || "User Name"}
                    </h2>
                    <div className="flex items-center justify-center md:justify-start gap-2 mt-2">
                      <FaEnvelope className="text-white/80" />
                      <p className="text-white/90">{formData.email}</p>
                    </div>
                  </div>

                  <div className="flex flex-col items-center md:items-end gap-2">
                    <div className="flex justify-center md:justify-end gap-3">
                      {editMode ? (
                        <>
                          <button
                            onClick={handleCancel}
                            className="px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors flex items-center gap-2"
                          >
                            <FaTimes /> Cancel
                          </button>
                          <button
                            onClick={handleSave}
                            disabled={saving}
                            className="px-4 py-2 bg-white text-red-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-2 disabled:opacity-50"
                          >
                            <FaSave />
                            {saving ? "Saving..." : "Save Changes"}
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => setEditMode(true)}
                          className="px-4 py-2 bg-white text-red-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-2"
                        >
                          <FaEdit /> Edit Profile
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {formData.bloodGroup && (
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mt-4">
                    <FaTint className="text-white" />
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-bold ${getBloodGroupColor(
                        formData.bloodGroup
                      )}`}
                    >
                      {formData.bloodGroup}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <FaUser className="text-gray-500" />
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={!editMode}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    editMode
                      ? "border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-200 bg-gray-50"
                  } outline-none transition-all`}
                  placeholder="Enter your full name"
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <FaEnvelope className="text-gray-500" />
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  disabled
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 outline-none cursor-not-allowed"
                  readOnly
                />
                <p className="text-xs text-gray-500">Email cannot be changed</p>
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <FaTint className="text-gray-500" />
                  Blood Group
                </label>
                <select
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleChange}
                  disabled={!editMode}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    editMode
                      ? "border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-200 bg-gray-50"
                  } outline-none`}
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

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <FaMapMarkerAlt className="text-gray-500" />
                  District
                </label>
                <select
                  name="districtId"
                  value={selectedDistrict}
                  onChange={handleChange}
                  disabled={!editMode}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    editMode
                      ? "border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-200 bg-gray-50"
                  } outline-none`}
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
                  <FaMapMarkerAlt className="text-gray-500" />
                  Upazila
                </label>
                <select
                  name="upazila"
                  value={formData.upazila}
                  onChange={handleChange}
                  disabled={!editMode || !selectedDistrict}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    editMode && selectedDistrict
                      ? "border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-200 bg-gray-50"
                  } outline-none ${!selectedDistrict ? "opacity-60" : ""}`}
                >
                  <option value="">Select Upazila</option>
                  {filteredUpazilas.map((u) => (
                    <option key={u.id} value={u.name}>
                      {u.name}
                    </option>
                  ))}
                </select>
                {!selectedDistrict && editMode && (
                  <p className="text-xs text-gray-500 mt-1">
                    Please select a district first
                  </p>
                )}
              </div>

              {editMode && (
                <div className="col-span-1 md:col-span-2 space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Profile Picture URL
                  </label>
                  <input
                    type="text"
                    name="avatar"
                    value={formData.avatar}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                    placeholder="https://example.com/your-photo.jpg"
                  />
                  <p className="text-xs text-gray-500">
                    Enter a valid image URL for your profile picture
                  </p>
                </div>
              )}
            </div>

            <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Account Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-500 mb-2">Account Type</p>
                  <div className="flex items-center gap-2">
                    {getRoleIcon(formData.role)}
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getRoleBadge(
                        formData.role
                      )}`}
                    >
                      {formData.role || "User"}
                    </span>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-500 mb-2">Account Status</p>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    Active
                  </span>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-500 mb-2">Member Since</p>
                  <p className="font-medium text-gray-800">
                    {new Date().toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>

            {editMode && (
              <div className="mt-8 flex flex-col sm:flex-row gap-3 md:hidden">
                <button
                  onClick={handleCancel}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium disabled:opacity-50"
                >
                  {saving ? "Saving Changes..." : "Save Changes"}
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>
            Your profile information helps us provide better services. Keep your
            information up to date.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
