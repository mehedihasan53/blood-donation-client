import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Provider/AuthProvider";
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import toast from "react-hot-toast";

const Login = () => {
  const { loginWithEmail } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      await loginWithEmail(email, password);
      toast.success("Successfully logged in!");
      navigate("/");
    } catch (err) {
      toast.error("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
              <div className="text-red-600 text-3xl">
                <FaUser />
              </div>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
          <p className="text-gray-600 mt-2">Login to your BloodCare account</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              name="email"
              type="email"
              placeholder="Enter your email address"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              name="password"
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold text-white transition-all duration-200 ${
              loading
                ? "bg-red-400 cursor-not-allowed"
                : "bg-red-600 hover:bg-red-700 shadow-lg"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-gray-200 text-center">
          <p className="text-gray-600 text-sm">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-red-600 hover:text-red-800"
            >
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
