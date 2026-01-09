import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { FaUser, FaSignOutAlt, FaHome, FaSun, FaMoon, FaEnvelope } from "react-icons/fa";
import { MdBloodtype } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { useAuth } from "../../Provider/AuthProvider";
import { useTheme } from "../../contexts/ThemeContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, logout, role } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  // Handle contact scroll functionality
  const handleContactClick = () => {
    const isOnHomePage = location.pathname === '/';

    if (isOnHomePage) {
      // If already on home page, scroll to contact section
      const contactSection = document.getElementById('contact-us');
      if (contactSection) {
        contactSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    } else {
      // Navigate to home page and then scroll to contact section
      navigate('/', { replace: false });
      setTimeout(() => {
        const contactSection = document.getElementById('contact-us');
        if (contactSection) {
          contactSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 200); // Increased delay to avoid conflict with ScrollToTop
    }

    // Close mobile menu if open
    setIsMenuOpen(false);
  };

  // Handle user logout
  const handleLogout = async () => {
    await logout();
    setIsMenuOpen(false);
    navigate("/login");
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isDropdownOpen && !event.target.closest(".user-dropdown")) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isDropdownOpen]);

  // NavLink active styles with glassmorphism and professional colors
  const navLinkStyle = ({ isActive }) =>
    `px-6 py-3 text-gray-700 dark:text-slate-200 hover:text-red-600 dark:hover:text-red-300 font-medium transition-all duration-300 rounded-xl hover:bg-white/20 dark:hover:bg-white/10 backdrop-blur-sm ${isActive ? "text-red-600 dark:text-red-300 bg-white/30 dark:bg-white/15 shadow-sm" : ""
    }`;

  const mobileLinkStyle =
    "block text-gray-700 dark:text-slate-200 hover:text-red-600 dark:hover:text-red-300 hover:bg-white/20 dark:hover:bg-white/10 px-6 py-4 rounded-xl font-medium transition-all duration-300 backdrop-blur-sm";

  return (
    <nav className="bg-gray-50/80 dark:bg-slate-800/90 backdrop-blur-xl border-b border-gray-200/40 dark:border-slate-600/40 sticky top-0 z-50 shadow-sm supports-[backdrop-filter]:bg-gray-50/60 supports-[backdrop-filter]:dark:bg-slate-800/70 transition-all duration-200">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Section */}
          <Link to="/" className="flex items-center space-x-3 lg:space-x-4 group">
            <div className="flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              <MdBloodtype className="text-white text-lg lg:text-2xl" />
            </div>
            <div>
              <h1 className="text-gray-900 dark:text-white text-lg lg:text-xl font-bold leading-tight">
                BloodConnect
              </h1>
              <p className="text-gray-600 dark:text-slate-400 text-xs font-medium hidden sm:block">
                Save Lives, Donate Blood
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2">
            <NavLink to="/" className={navLinkStyle}>
              Home
            </NavLink>
            <NavLink to="/about-our-mission" className={navLinkStyle}>
              Our Mission
            </NavLink>
            <NavLink to="/pending-requests" className={navLinkStyle}>
              Pending Requests
            </NavLink>
            <button
              onClick={handleContactClick}
              className="px-6 py-3 text-gray-700 dark:text-slate-200 hover:text-red-600 dark:hover:text-red-300 font-medium transition-all duration-300 rounded-xl hover:bg-white/20 dark:hover:bg-white/10 backdrop-blur-sm flex items-center gap-2"
            >

              Contact
            </button>
            {user && (
              <>
                <NavLink to="/donate" className={navLinkStyle}>
                  Donate
                </NavLink>
                <NavLink to="/search" className={navLinkStyle}>
                  Search
                </NavLink>
              </>
            )}
          </div>

          {/* User Profile & Actions */}
          <div className="flex items-center space-x-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-3 text-gray-600 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-300 hover:bg-white/20 dark:hover:bg-white/10 rounded-xl transition-all duration-300 hover:scale-110 backdrop-blur-sm"
              aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            >
              {isDark ? (
                <FaSun className="w-5 h-5" />
              ) : (
                <FaMoon className="w-5 h-5" />
              )}
            </button>

            {user ? (
              <div className="relative user-dropdown">
                <button
                  onClick={toggleDropdown}
                  className="flex items-center space-x-3 text-gray-700 dark:text-slate-200 hover:bg-white/20 dark:hover:bg-white/10 px-4 py-3 rounded-xl transition-all duration-300 focus:outline-none backdrop-blur-sm"
                >
                  <img
                    src={user.photoURL || "https://i.ibb.co/5GzXkwq/user.png"}
                    alt="user"
                    className="w-9 h-9 rounded-full border-2 border-red-500 object-cover shadow-md"
                  />
                  <span className="hidden md:inline font-semibold text-sm">
                    {user.displayName?.split(" ")[0]}
                  </span>
                  <svg
                    className={`w-4 h-4 transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""
                      }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-56 bg-white/95 dark:bg-slate-700/95 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-slate-600/50 py-3 z-50 animate-fade-in shadow-lg">
                    <Link
                      to="/dashboard"
                      className="flex items-center px-5 py-3 text-gray-700 dark:text-slate-200 hover:bg-white/20 dark:hover:bg-white/10 hover:text-red-600 dark:hover:text-red-300 transition-all duration-300 mx-2 rounded-xl backdrop-blur-sm"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <FaHome className="mr-4 text-red-500 w-4 h-4" />
                      <span className="font-medium">Dashboard</span>
                    </Link>
                    {role === "admin" && (
                      <Link
                        to="/dashboard/all-users"
                        className="flex items-center px-5 py-3 text-gray-700 dark:text-slate-200 hover:bg-white/20 dark:hover:bg-white/10 hover:text-red-600 dark:hover:text-red-300 transition-all duration-300 mx-2 rounded-xl backdrop-blur-sm"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <FaUser className="mr-4 text-red-500 w-4 h-4" />
                        <span className="font-medium">Manage Users</span>
                      </Link>
                    )}
                    <hr className="my-2 border-gray-200/50 dark:border-slate-600/50 mx-2" />
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-5 py-3 text-gray-700 dark:text-slate-200 hover:bg-white/20 dark:hover:bg-white/10 hover:text-red-600 dark:hover:text-red-300 text-left transition-all duration-300 mx-2 rounded-xl backdrop-blur-sm"
                    >
                      <FaSignOutAlt className="mr-4 text-red-500 w-4 h-4" />
                      <span className="font-medium">Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden lg:flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-700 dark:text-slate-200 hover:text-red-600 dark:hover:text-red-300 font-semibold px-5 py-3 rounded-xl transition-all duration-300 hover:bg-white/20 dark:hover:bg-white/10 backdrop-blur-sm"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  Join Now
                </Link>
              </div>
            )}

            {/* Mobile Toggle Button */}
            <button
              onClick={toggleMenu}
              className="lg:hidden text-gray-700 dark:text-slate-200 hover:bg-white/20 dark:hover:bg-white/10 p-3 rounded-xl transition-all duration-300 focus:outline-none backdrop-blur-sm"
            >
              <GiHamburgerMenu size={24} />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white/95 dark:bg-slate-700/95 backdrop-blur-xl rounded-2xl mt-4 mb-6 py-6 border border-gray-200/50 dark:border-slate-600/50 overflow-hidden animate-slide-up shadow-lg">
            <div className="flex flex-col space-y-3 px-4">
              {user && (
                <div className="flex items-center p-5 mb-4 bg-gray-50/60 dark:bg-slate-600/40 backdrop-blur-sm rounded-2xl border border-gray-200/40 dark:border-slate-500/40">
                  <img
                    src={user.photoURL}
                    className="w-14 h-14 rounded-full border-3 border-red-500 mr-4 shadow-lg"
                    alt="user"
                  />
                  <div>
                    <p className="font-bold text-gray-900 dark:text-white text-lg">
                      {user.displayName}
                    </p>
                    <p className="text-sm text-red-600 dark:text-red-300 font-semibold capitalize bg-red-100/50 dark:bg-red-900/30 px-3 py-1 rounded-lg inline-block mt-1">
                      {role}
                    </p>
                  </div>
                </div>
              )}

              <Link to="/" className={mobileLinkStyle} onClick={toggleMenu}>
                Home
              </Link>
              <Link
                to="/about-our-mission"
                className={mobileLinkStyle}
                onClick={toggleMenu}
              >
                Our Mission
              </Link>
              <Link
                to="/pending-requests"
                className={mobileLinkStyle}
                onClick={toggleMenu}
              >
                Pending Requests
              </Link>
              <button
                onClick={handleContactClick}
                className={`${mobileLinkStyle} flex items-center gap-3 w-full text-left`}
              >
                <FaEnvelope className="text-sm" />
                Contact
              </button>

              {user && (
                <>
                  <Link
                    to="/donate"
                    className={mobileLinkStyle}
                    onClick={toggleMenu}
                  >
                    Donate
                  </Link>
                  <Link
                    to="/search"
                    className={mobileLinkStyle}
                    onClick={toggleMenu}
                  >
                    Search
                  </Link>
                  <hr className="my-4 border-gray-200/50 dark:border-slate-600/50 mx-2" />
                  <Link
                    to="/dashboard"
                    className={`${mobileLinkStyle} bg-white/30 dark:bg-white/10 text-red-700 dark:text-red-300 font-semibold backdrop-blur-sm`}
                    onClick={toggleMenu}
                  >
                    <span className="flex items-center">
                      <FaHome className="mr-3 w-4 h-4" /> Dashboard
                    </span>
                  </Link>
                  {role === "admin" && (
                    <Link
                      to="/dashboard/all-users"
                      className={mobileLinkStyle}
                      onClick={toggleMenu}
                    >
                      <span className="flex items-center">
                        <FaUser className="mr-3 w-4 h-4" /> Manage Users
                      </span>
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className={`${mobileLinkStyle} text-red-600 dark:text-red-300 w-full text-left font-semibold`}
                  >
                    <span className="flex items-center">
                      <FaSignOutAlt className="mr-3 w-4 h-4" /> Logout
                    </span>
                  </button>
                </>
              )}

              {!user && (
                <div className="pt-4 border-t border-gray-200/50 dark:border-slate-600/50 flex flex-col space-y-4 mt-4">
                  <Link
                    to="/login"
                    className="block text-center text-gray-700 dark:text-slate-200 py-4 font-semibold hover:bg-white/20 dark:hover:bg-white/10 rounded-xl transition-all duration-300 backdrop-blur-sm"
                    onClick={toggleMenu}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="block text-center bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                    onClick={toggleMenu}
                  >
                    Join as Donor
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
