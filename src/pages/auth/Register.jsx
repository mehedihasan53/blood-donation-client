import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase/firebase.config";
import { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import DynamicTitle from "../../components/shared/DynamicTitle";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const axiosInstance = useAxios();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const districtsRes = await axios.get("/districts.json");
        setDistricts(districtsRes.data.districts);

        const upazilasRes = await axios.get("/upazilas.json");
        setUpazilas(upazilasRes.data.upazilas);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const filteredUpazilas = upazilas.filter(
    (u) => u.district_id === selectedDistrict
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const image = form.image.files[0];
    const bloodGroup = form.bloodGroup.value;
    const upazilaValue = form.upazila.value;
    const password = form.password.value;
    const confirmPassword = form.confirm_password.value;

    const districtName =
      districts.find((d) => d.id === selectedDistrict)?.name || "";

    if (password !== confirmPassword) {
      setLoading(false);
      return toast.error("Passwords don't match");
    }

    try {
      let imageUrl = "";

      if (image) {
        const formData = new FormData();
        formData.append("image", image);
        const imgRes = await axios.post(
          `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY
          }`,
          formData
        );
        imageUrl = imgRes.data.data.display_url;
      }

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // User profile update
      await updateProfile(userCredential.user, {
        displayName: name,
        photoURL: imageUrl,
      });

      await axiosInstance.post("/users", {
        name,
        email,
        bloodGroup,
        district: districtName,
        upazila: upazilaValue,
        avatar: imageUrl,
        role: "donor",
        status: "active",
      });

      toast.success("Registration successful! You are now logged in.");

      navigate("/");
    } catch (err) {
      toast.error(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-theme-secondary px-4 auth-page-offset relative overflow-hidden">
      <DynamicTitle title="Register" />

      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-red-500/20 to-red-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-500/20 to-blue-600/10 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse animation-delay-4000"></div>
      </div>

      <div className="w-full max-w-md relative z-10 mt-4 auth-form-safe">
        {/* Modern Glassmorphism Card */}
        <div className="bg-theme-card/95 backdrop-blur-xl border border-theme-primary/30 rounded-2xl shadow-modern-2xl p-8 mx-auto">
          {/* Header Section */}
          <div className="text-center mb-8">

            {/* Dramatic Title */}
            <h1 className="text-3xl font-bold mb-2">
              <span className="bg-gradient-to-r from-red-500 via-red-600 to-red-700 bg-clip-text text-transparent">
                Create Account
              </span>
            </h1>
            <p className="text-theme-secondary text-sm">
              Join our life-saving blood donation community
            </p>
          </div>

          {/* Enhanced Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name Input */}
            <div className="relative">
              <input
                name="name"
                placeholder="Full Name"
                className="w-full px-4 py-3 bg-theme-tertiary/50 backdrop-blur-sm border-0 rounded-xl text-theme-primary placeholder-theme-muted focus:ring-2 focus:ring-red-500/50 focus:bg-theme-tertiary/70 outline-none transition-all duration-300"
                required
              />
            </div>

            {/* Email Input */}
            <div className="relative">
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                className="w-full px-4 py-3 bg-theme-tertiary/50 backdrop-blur-sm border-0 rounded-xl text-theme-primary placeholder-theme-muted focus:ring-2 focus:ring-red-500/50 focus:bg-theme-tertiary/70 outline-none transition-all duration-300"
                required
              />
            </div>

            {/* Profile Image Upload */}
            <div className="relative">
              <input
                type="file"
                name="image"
                accept="image/*"
                className="w-full px-4 py-3 bg-theme-tertiary/50 backdrop-blur-sm border-0 rounded-xl text-theme-primary file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-gradient-to-r file:from-red-500 file:to-red-600 file:text-white file:font-medium file:cursor-pointer hover:file:from-red-600 hover:file:to-red-700 focus:ring-2 focus:ring-red-500/50 focus:bg-theme-tertiary/70 outline-none transition-all duration-300"
              />
            </div>

            {/* Blood Group Select */}
            <div className="relative">
              <select
                name="bloodGroup"
                className="w-full px-4 py-3 bg-theme-tertiary/50 backdrop-blur-sm border-0 rounded-xl text-theme-primary focus:ring-2 focus:ring-red-500/50 focus:bg-theme-tertiary/70 outline-none transition-all duration-300 appearance-none cursor-pointer"
                required
              >
                <option value="" className="bg-theme-card text-theme-primary">Select Blood Group</option>
                {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
                  <option key={bg} value={bg} className="bg-theme-card text-theme-primary">
                    {bg}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="w-5 h-5 text-theme-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* District Select */}
            <div className="relative">
              <select
                className="w-full px-4 py-3 bg-theme-tertiary/50 backdrop-blur-sm border-0 rounded-xl text-theme-primary focus:ring-2 focus:ring-blue-500/50 focus:bg-theme-tertiary/70 outline-none transition-all duration-300 appearance-none cursor-pointer"
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                required
              >
                <option value="" className="bg-theme-card text-theme-primary">Select District</option>
                {districts.map((d) => (
                  <option key={d.id} value={d.id} className="bg-theme-card text-theme-primary">
                    {d.name}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="w-5 h-5 text-theme-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Upazila Select */}
            <div className="relative">
              <select
                name="upazila"
                className="w-full px-4 py-3 bg-theme-tertiary/50 backdrop-blur-sm border-0 rounded-xl text-theme-primary focus:ring-2 focus:ring-green-500/50 focus:bg-theme-tertiary/70 outline-none transition-all duration-300 appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!selectedDistrict}
                required
              >
                <option value="" className="bg-theme-card text-theme-primary">Select Upazila</option>
                {filteredUpazilas.map((u) => (
                  <option key={u.id} value={u.name} className="bg-theme-card text-theme-primary">
                    {u.name}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="w-5 h-5 text-theme-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Password Input */}
            <div className="relative">
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="w-full px-4 py-3 bg-theme-tertiary/50 backdrop-blur-sm border-0 rounded-xl text-theme-primary placeholder-theme-muted focus:ring-2 focus:ring-purple-500/50 focus:bg-theme-tertiary/70 outline-none transition-all duration-300"
                required
              />
            </div>

            {/* Confirm Password Input */}
            <div className="relative">
              <input
                type="password"
                name="confirm_password"
                placeholder="Confirm Password"
                className="w-full px-4 py-3 bg-theme-tertiary/50 backdrop-blur-sm border-0 rounded-xl text-theme-primary placeholder-theme-muted focus:ring-2 focus:ring-purple-500/50 focus:bg-theme-tertiary/70 outline-none transition-all duration-300"
                required
              />
            </div>

            {/* Enhanced Register Button */}
            <button
              type="submit"
              className={`w-full mt-6 px-6 py-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold rounded-xl shadow-modern-lg hover:shadow-modern-xl transform hover:scale-[1.02] transition-all duration-300 ${loading ? "opacity-50 cursor-not-allowed scale-100" : ""
                }`}
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Creating Account...
                </div>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Login Link */}
          <div className="text-center mt-8 pt-6 border-t border-theme-primary/20">
            <p className="text-theme-secondary text-sm">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent hover:from-red-600 hover:to-red-700 transition-all duration-300"
              >
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
