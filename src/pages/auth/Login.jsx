import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Provider/AuthProvider";
import { useState } from "react";
import { FaUser, FaUserShield, FaEye, FaEyeSlash } from "react-icons/fa";
import { MdBloodtype } from "react-icons/md";
import toast from "react-hot-toast";
import DynamicTitle from "../../components/shared/DynamicTitle";

const Login = () => {
  const { loginWithEmail } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const demoCredentials = {
    user: {
      email: "user@bloodconnect.com",
      password: "user123"
    },
    admin: {
      email: "admin3@gmail.com",
      password: "qqqqqqqq"
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      await loginWithEmail(email, password);
      toast.success("Successfully logged in!");
      navigate("/");
    } catch {
      toast.error("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fillDemoCredentials = (type) => {
    const emailInput = document.querySelector('input[name="email"]');
    const passwordInput = document.querySelector('input[name="password"]');

    if (emailInput && passwordInput) {
      emailInput.value = demoCredentials[type].email;
      passwordInput.value = demoCredentials[type].password;

      emailInput.dispatchEvent(new Event('input', { bubbles: true }));
      passwordInput.dispatchEvent(new Event('input', { bubbles: true }));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-secondary px-4 pt-24 pb-12">
      <DynamicTitle title="Login" />
      <div className="w-full max-w-md bg-bg-card rounded-2xl shadow-xl p-6">
        <div className="text-center mb-6">
          <div className="flex justify-center mb-3">
            <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center">
              <div className="text-red-600 text-2xl">
                <MdBloodtype />
              </div>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>
          <p className="text-gray-600 mt-1 text-sm">Login to your BloodConnect account</p>
        </div>

        <div className="mb-5">
          <p className="text-xs font-medium text-gray-700 mb-2 text-center">
            Quick Demo Login:
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => fillDemoCredentials('user')}
              className="flex items-center justify-center gap-1.5 bg-blue-50 text-blue-700 border border-blue-200 px-3 py-2 rounded-lg font-semibold hover:bg-blue-100 transition-all duration-300 text-xs"
            >
              <FaUser className="text-xs" />
              User Demo
            </button>
            <button
              type="button"
              onClick={() => fillDemoCredentials('admin')}
              className="flex items-center justify-center gap-1.5 bg-purple-50 text-purple-700 border border-purple-200 px-3 py-2 rounded-lg font-semibold hover:bg-purple-100 transition-all duration-300 text-xs"
            >
              <FaUserShield className="text-xs" />
              Admin Demo
            </button>
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Email Address
            </label>
            <input
              name="email"
              type="email"
              placeholder="Enter your email address"
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full px-3 py-2.5 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none text-sm"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-300"
              >
                {showPassword ? <FaEyeSlash className="text-sm" /> : <FaEye className="text-sm" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2.5 rounded-lg font-semibold text-white transition-all duration-200 ${loading
              ? "bg-red-400 cursor-not-allowed"
              : "bg-red-600 hover:bg-red-700 shadow-lg"
              }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="mt-5 pt-4 border-t border-gray-200 text-center">
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