import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaTint, FaCalendarAlt, FaSave, FaEdit, FaCamera } from "react-icons/fa";
import { useAuth } from "../../Provider/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/Card";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";

const ProfileForm = () => {
    const { user, updateUserProfile } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [profileData, setProfileData] = useState({
        name: "",
        email: "",
        phone: "",
        bloodGroup: "",
        district: "",
        upazila: "",
        dateOfBirth: "",
        avatar: "",
        bio: ""
    });
    const [errors, setErrors] = useState({});

    const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

    const districts = [
        "Dhaka", "Chittagong", "Rajshahi", "Khulna", "Barisal", "Sylhet",
        "Rangpur", "Mymensingh", "Comilla", "Gazipur"
    ];

    useEffect(() => {
        if (user) {
            setProfileData({
                name: user.displayName || "",
                email: user.email || "",
                phone: user.phoneNumber || "",
                bloodGroup: user.bloodGroup || "",
                district: user.district || "",
                upazila: user.upazila || "",
                dateOfBirth: user.dateOfBirth || "",
                avatar: user.photoURL || "",
                bio: user.bio || ""
            });
        }
    }, [user]);

    const validateForm = () => {
        const newErrors = {};

        if (!profileData.name.trim()) {
            newErrors.name = "Name is required";
        }

        if (!profileData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(profileData.email)) {
            newErrors.email = "Please enter a valid email";
        }

        if (profileData.phone && !/^[0-9+\-\s()]+$/.test(profileData.phone)) {
            newErrors.phone = "Please enter a valid phone number";
        }

        if (profileData.dateOfBirth) {
            const birthDate = new Date(profileData.dateOfBirth);
            const today = new Date();
            const age = today.getFullYear() - birthDate.getFullYear();
            if (age < 18 || age > 65) {
                newErrors.dateOfBirth = "Age must be between 18 and 65 years";
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfileData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ""
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true);
        const toastId = toast.loading("Updating profile...");

        try {
            // Update profile in database
            await axiosSecure.patch("/user/profile", profileData);

            // Update Firebase profile
            await updateUserProfile({
                displayName: profileData.name,
                photoURL: profileData.avatar
            });

            toast.success("Profile updated successfully!", { id: toastId });
            setIsEditing(false);
        } catch (error) {
            console.error("Profile update error:", error);
            toast.error("Failed to update profile. Please try again.", { id: toastId });
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        // Reset form to original values
        if (user) {
            setProfileData({
                name: user.displayName || "",
                email: user.email || "",
                phone: user.phoneNumber || "",
                bloodGroup: user.bloodGroup || "",
                district: user.district || "",
                upazila: user.upazila || "",
                dateOfBirth: user.dateOfBirth || "",
                avatar: user.photoURL || "",
                bio: user.bio || ""
            });
        }
        setErrors({});
        setIsEditing(false);
    };

    const InputField = ({
        label,
        name,
        type = "text",
        icon: Icon,
        placeholder,
        required = false,
        disabled = false,
        options = null
    }) => (
        <div className="space-y-2">
            <label className="block text-sm font-semibold text-text-primary">
                <div className="flex items-center gap-2 mb-2">
                    <Icon className="text-red-600 dark:text-red-400" />
                    {label} {required && <span className="text-red-500">*</span>}
                </div>
            </label>

            {options ? (
                <select
                    name={name}
                    value={profileData[name]}
                    onChange={handleInputChange}
                    disabled={!isEditing || disabled}
                    className={`
            w-full px-4 py-3 rounded-xl border backdrop-blur-sm text-text-primary
            focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50
            transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed
            ${errors[name]
                            ? 'border-red-300 dark:border-red-600 bg-red-50/80 dark:bg-red-900/20'
                            : 'border-border-primary/50 dark:border-border-primary/60 bg-bg-tertiary/80 dark:bg-bg-tertiary/60'
                        }
          `}
                >
                    <option value="">{placeholder}</option>
                    {options.map(option => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>
            ) : type === "textarea" ? (
                <textarea
                    name={name}
                    value={profileData[name]}
                    onChange={handleInputChange}
                    placeholder={placeholder}
                    disabled={!isEditing || disabled}
                    rows={4}
                    className={`
            w-full px-4 py-3 rounded-xl border backdrop-blur-sm text-text-primary placeholder-text-muted
            focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50
            transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed resize-none
            ${errors[name]
                            ? 'border-red-300 dark:border-red-600 bg-red-50/80 dark:bg-red-900/20'
                            : 'border-border-primary/50 dark:border-border-primary/60 bg-bg-tertiary/80 dark:bg-bg-tertiary/60'
                        }
          `}
                />
            ) : (
                <input
                    type={type}
                    name={name}
                    value={profileData[name]}
                    onChange={handleInputChange}
                    placeholder={placeholder}
                    disabled={!isEditing || disabled}
                    className={`
            w-full px-4 py-3 rounded-xl border backdrop-blur-sm text-text-primary placeholder-text-muted
            focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50
            transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed
            ${errors[name]
                            ? 'border-red-300 dark:border-red-600 bg-red-50/80 dark:bg-red-900/20'
                            : 'border-border-primary/50 dark:border-border-primary/60 bg-bg-tertiary/80 dark:bg-bg-tertiary/60'
                        }
          `}
                />
            )}

            {errors[name] && (
                <p className="text-sm text-red-600 dark:text-red-500 mt-1">{errors[name]}</p>
            )}
        </div>
    );

    return (
        <Card className="overflow-hidden">
            {/* Header */}
            <CardHeader className="glass-border border-t-0 border-l-0 border-r-0">
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="text-2xl">Profile Information</CardTitle>
                        <p className="text-text-secondary mt-1">Manage your account details and preferences</p>
                    </div>

                    {!isEditing ? (
                        <Button
                            onClick={() => setIsEditing(true)}
                            className="flex items-center gap-2"
                        >
                            <FaEdit />
                            Edit Profile
                        </Button>
                    ) : (
                        <div className="flex gap-3">
                            <Button
                                variant="secondary"
                                onClick={handleCancel}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="success"
                                onClick={handleSubmit}
                                disabled={loading}
                                className="flex items-center gap-2"
                            >
                                <FaSave />
                                {loading ? "Saving..." : "Save Changes"}
                            </Button>
                        </div>
                    )}
                </div>
            </CardHeader>

            <form onSubmit={handleSubmit} className="p-6">
                {/* Avatar Section */}
                <div className="flex flex-col items-center mb-8">
                    <div className="relative group">
                        <img
                            src={profileData.avatar || "https://i.ibb.co/5R39p3F/user.png"}
                            alt="Profile"
                            className="w-24 h-24 rounded-full interactive-border object-cover shadow-modern-lg"
                        />
                        {isEditing && (
                            <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer">
                                <FaCamera className="text-white text-xl" />
                            </div>
                        )}
                    </div>

                    {isEditing && (
                        <div className="mt-4 w-full max-w-md">
                            <Input
                                label="Avatar URL"
                                name="avatar"
                                icon={FaCamera}
                                placeholder="Enter image URL"
                                value={profileData.avatar}
                                onChange={handleInputChange}
                                error={errors.avatar}
                            />
                        </div>
                    )}
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                        label="Full Name"
                        name="name"
                        icon={FaUser}
                        placeholder="Enter your full name"
                        value={profileData.name}
                        onChange={handleInputChange}
                        error={errors.name}
                        disabled={!isEditing}
                    />

                    <Input
                        label="Email Address"
                        name="email"
                        type="email"
                        icon={FaEnvelope}
                        placeholder="Enter your email"
                        value={profileData.email}
                        onChange={handleInputChange}
                        error={errors.email}
                        disabled={true}
                    />

                    <Input
                        label="Phone Number"
                        name="phone"
                        type="tel"
                        icon={FaPhone}
                        placeholder="Enter your phone number"
                        value={profileData.phone}
                        onChange={handleInputChange}
                        error={errors.phone}
                        disabled={!isEditing}
                    />

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-text-primary">
                            Blood Group
                        </label>
                        <select
                            name="bloodGroup"
                            value={profileData.bloodGroup}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="flex h-10 w-full rounded-xl bg-bg-tertiary/80 dark:bg-bg-tertiary/60 backdrop-blur-sm px-3 py-2 text-sm text-text-primary interactive-border focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300"
                        >
                            <option value="">Select blood group</option>
                            {bloodGroups.map(group => (
                                <option key={group} value={group}>{group}</option>
                            ))}
                        </select>
                        {errors.bloodGroup && (
                            <p className="text-sm text-red-600 dark:text-red-400">{errors.bloodGroup}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-text-primary">
                            District
                        </label>
                        <select
                            name="district"
                            value={profileData.district}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="flex h-10 w-full rounded-xl bg-bg-tertiary/80 dark:bg-bg-tertiary/60 backdrop-blur-sm px-3 py-2 text-sm text-text-primary interactive-border focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300"
                        >
                            <option value="">Select district</option>
                            {districts.map(district => (
                                <option key={district} value={district}>{district}</option>
                            ))}
                        </select>
                        {errors.district && (
                            <p className="text-sm text-red-600 dark:text-red-400">{errors.district}</p>
                        )}
                    </div>

                    <Input
                        label="Upazila"
                        name="upazila"
                        icon={FaMapMarkerAlt}
                        placeholder="Enter your upazila"
                        value={profileData.upazila}
                        onChange={handleInputChange}
                        error={errors.upazila}
                        disabled={!isEditing}
                    />

                    <Input
                        label="Date of Birth"
                        name="dateOfBirth"
                        type="date"
                        icon={FaCalendarAlt}
                        value={profileData.dateOfBirth}
                        onChange={handleInputChange}
                        error={errors.dateOfBirth}
                        disabled={!isEditing}
                    />
                </div>

                {/* Bio Section */}
                <div className="mt-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-text-primary">
                            Bio
                        </label>
                        <textarea
                            name="bio"
                            value={profileData.bio}
                            onChange={handleInputChange}
                            placeholder="Tell us about yourself..."
                            disabled={!isEditing}
                            rows={4}
                            className="flex w-full rounded-xl bg-bg-tertiary/80 dark:bg-bg-tertiary/60 backdrop-blur-sm px-3 py-2 text-sm text-text-primary placeholder:text-text-muted interactive-border focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300 resize-none"
                        />
                        {errors.bio && (
                            <p className="text-sm text-red-600 dark:text-red-400">{errors.bio}</p>
                        )}
                    </div>
                </div>
            </form>
        </Card>
    );
};

export default ProfileForm;