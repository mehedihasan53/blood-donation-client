import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Provider/AuthProvider";
import { useState } from "react";
import { FaUser, FaUserShield, FaEye, FaEyeSlash, FaEnvelope, FaLock } from "react-icons/fa";
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
    <div className="min-h-screen bg-theme-primary flex items-center justify-center px-4 auth-page-offset relative overflow-hidden">
      <DynamicTitle title="Login - BloodConnect" />

      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-40 h-40 bg-primary/8 dark:bg-primary/12 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-accent/5 dark:bg-accent/10 rounded-full blur-3xl animate-pulse animation-delay-2000" />
      </div>

      <div className="relative z-10 w-full max-w-md mt-4 auth-form-safe">
        <div className="bg-theme-card/95 backdrop-blur-xl rounded-3xl border border-theme-primary/30 shadow-modern-2xl p-8 lg:p-10 mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-primary/20 to-red-500/20 dark:from-primary/30 dark:to-red-400/30 backdrop-blur-xl rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-modern-sm">
              <MdBloodtype className="text-3xl text-primary" />
            </div>
            <h1 className="text-3xl font-black text-text-primary mb-3">
              Welcome Back
            </h1>
            <p className="text-lg text-text-secondary font-medium">
              Login to your BloodConnect account
            </p>
          </div>

          {/* Demo Credentials */}
          <div className="mb-8">
            <p className="text-sm font-bold text-text-primary mb-4 text-center">
              Quick Demo Login:
            </p>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => fillDemoCredentials('user')}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-100/90 to-blue-200/90 dark:from-blue-900/50 dark:to-blue-800/50 text-blue-700 dark:text-blue-300 px-4 py-3 rounded-2xl font-bold hover:from-blue-200/90 hover:to-blue-300/90 dark:hover:from-blue-800/60 dark:hover:to-blue-700/60 transition-all duration-300 text-sm border-0 shadow-modern-sm hover:shadow-modern-lg"
              >
                <FaUser className="text-sm" />
                User Demo
              </button>
              <button
                type="button"
                onClick={() => fillDemoCredentials('admin')}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-100/90 to-purple-200/90 dark:from-purple-900/50 dark:to-purple-800/50 text-purple-700 dark:text-purple-300 px-4 py-3 rounded-2xl font-bold hover:from-purple-200/90 hover:to-purple-300/90 dark:hover:from-purple-800/60 dark:hover:to-purple-700/60 transition-all duration-300 text-sm border-0 shadow-modern-sm hover:shadow-modern-lg"
              >
                <FaUserShield className="text-sm" />
                Admin Demo
              </button>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-lg font-bold text-text-primary mb-3">
                Email Address
              </label>
              <div className="relative">
                <input
                  name="email"
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full bg-bg-tertiary/90 dark:bg-bg-tertiary/70 backdrop-blur-xl border-0 text-text-primary px-6 py-4 pl-14 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/30 dark:focus:ring-primary/40 transition-all duration-300 placeholder-text-muted text-lg font-medium shadow-modern-sm focus:shadow-modern-lg"
                  required
                />
                <div className="absolute left-5 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-gradient-to-r from-primary/20 to-red-500/20 dark:from-primary/30 dark:to-red-400/30 rounded-lg flex items-center justify-center">
                  <FaEnvelope className="text-primary text-sm" />
                </div>
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-lg font-bold text-text-primary mb-3">
                Password
              </label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full bg-bg-tertiary/90 dark:bg-bg-tertiary/70 backdrop-blur-xl border-0 text-text-primary px-6 py-4 pl-14 pr-14 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/30 dark:focus:ring-primary/40 transition-all duration-300 placeholder-text-muted text-lg font-medium shadow-modern-sm focus:shadow-modern-lg"
                  required
                />
                <div className="absolute left-5 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-gradient-to-r from-primary/20 to-red-500/20 dark:from-primary/30 dark:to-red-400/30 rounded-lg flex items-center justify-center">
                  <FaLock className="text-primary text-sm" />
                </div>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-bg-tertiary/80 dark:bg-bg-tertiary/60 backdrop-blur-xl rounded-lg flex items-center justify-center text-text-muted hover:text-primary transition-all duration-300 border-0"
                >
                  {showPassword ? <FaEyeSlash className="text-sm" /> : <FaEye className="text-sm" />}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-5 rounded-2xl font-black text-xl transition-all duration-300 border-0 shadow-modern-lg hover:shadow-modern-xl ${loading
                ? "bg-primary/60 cursor-not-allowed text-white/80"
                : "bg-gradient-to-r from-primary to-red-600 hover:from-red-600 hover:to-primary text-white"
                }`}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-3">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Logging in...
                </div>
              ) : (
                "Login to Account"
              )}
            </button>
          </form>

          {/* Register Link */}
          <div className="mt-8 pt-6 border-t border-border-primary/20 dark:border-border-primary/30 text-center">
            <p className="text-text-secondary text-lg font-medium">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-black text-primary hover:text-primary-hover transition-colors duration-300"
              >
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;