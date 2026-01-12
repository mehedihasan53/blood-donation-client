import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { FaUser, FaSignOutAlt, FaHome, FaSun, FaMoon } from "react-icons/fa";
import { MdBloodtype } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { useAuth } from "../../Provider/AuthProvider";
import { useTheme } from "../../contexts/ThemeContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout, role } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const handleContactClick = () => {
    const isOnHomePage = location.pathname === '/';

    if (isOnHomePage) {
      const contactSection = document.getElementById('contact-us');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      navigate('/', { replace: false });
      setTimeout(() => {
        const contactSection = document.getElementById('contact-us');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
    setIsMenuOpen(false);
  };

  const handleLogout = async () => {
    await logout();
    setIsMenuOpen(false);
    navigate("/login");
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isDropdownOpen && !event.target.closest(".user-dropdown")) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isDropdownOpen]);

  const navLinkStyle = ({ isActive }) =>
    `px-3.5 py-2.5 text-sm font-medium transition-all duration-300 rounded-md
     ${isDark
      ? `text-slate-200 hover:text-red-400 hover:bg-white/10 ${isActive ? "text-red-400 bg-white/10" : ""}`
      : `text-gray-700 hover:text-red-600 hover:bg-gray-100/80 ${isActive ? "text-red-600 bg-gray-100/80" : ""}`
    }`;

  const mobileLinkStyle = ({ isActive }) =>
    `block px-4 py-3 rounded-md font-medium transition-all duration-300 text-sm
     ${isDark
      ? `text-slate-200 hover:text-red-400 hover:bg-white/10 ${isActive ? "text-red-400 bg-white/10" : ""}`
      : `text-gray-700 hover:text-red-600 hover:bg-gray-100/80 ${isActive ? "text-red-600 bg-gray-100/80" : ""}`
    }`;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500
      ${isDark
        ? scrolled
          ? "bg-slate-900/80 backdrop-blur-xl border-b border-white/10 shadow-2xl"
          : "bg-slate-900/60 backdrop-blur-xl border-b border-white/5"
        : scrolled
          ? "bg-white/90 backdrop-blur-xl border-b border-gray-200/50 shadow-lg"
          : "bg-white/80 backdrop-blur-xl border-b border-gray-200/30"
      }`}>
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Section */}
          <Link to="/" className="flex items-center space-x-3 lg:space-x-4 group">
            <div className={`flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 rounded-xl shadow-lg 
              group-hover:shadow-xl transition-all duration-300 group-hover:scale-105
              ${isDark
                ? "bg-gradient-to-br from-red-500/90 to-red-600 shadow-red-500/20"
                : "bg-gradient-to-br from-red-500 to-red-600"
              }`}>
              <MdBloodtype className="text-white text-lg lg:text-2xl" />
            </div>
            <div>
              <h1 className={`text-lg lg:text-xl font-bold leading-tight
                ${isDark ? "text-white" : "text-gray-900"}`}>
                BloodConnect
              </h1>
              <p className={`text-xs font-medium hidden sm:block
                ${isDark ? "text-slate-300" : "text-gray-600"}`}>
                Save Lives, Donate Blood
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            <NavLink to="/" className={navLinkStyle}>Home</NavLink>
            <NavLink to="/services" className={navLinkStyle}>Services</NavLink>
            <NavLink to="/blogs" className={navLinkStyle}>Blogs</NavLink>
            <NavLink to="/testimonials" className={navLinkStyle}>Testimonials</NavLink>
            <NavLink to="/statistics" className={navLinkStyle}>Statistics</NavLink>
            <NavLink to="/about-our-mission" className={navLinkStyle}>Our Mission</NavLink>
            <NavLink to="/pending-requests" className={navLinkStyle}>Pending Requests</NavLink>
            {user && (
              <>
                <NavLink to="/donate" className={navLinkStyle}>Donate</NavLink>
                <NavLink to="/search" className={navLinkStyle}>Search</NavLink>
              </>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              className={`p-2.5 rounded-md transition-all duration-300 hover:scale-105
                ${isDark
                  ? "text-slate-300 hover:text-red-400 hover:bg-white/10"
                  : "text-gray-600 hover:text-red-600 hover:bg-gray-100/80"
                }`}
              aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            >
              {isDark ? <FaSun className="w-4 h-4" /> : <FaMoon className="w-4 h-4" />}
            </button>

            {user ? (
              <div className="relative user-dropdown">
                <button
                  onClick={toggleDropdown}
                  className={`flex items-center space-x-2.5 px-3 py-2.5 rounded-md transition-all duration-300 focus:outline-none
                    ${isDark
                      ? "text-slate-200 hover:bg-white/10"
                      : "text-gray-700 hover:bg-gray-100/80"
                    }`}
                >
                  <img
                    src={user.photoURL || "https://i.ibb.co/5GzXkwq/user.png"}
                    alt="user"
                    className="w-8 h-8 rounded-full border-2 border-red-500 object-cover shadow-sm"
                  />
                  <span className="hidden md:inline font-medium text-sm">
                    {user.displayName?.split(" ")[0]}
                  </span>
                  <svg className={`w-3.5 h-3.5 transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isDropdownOpen && (
                  <div className={`absolute right-0 mt-2 w-52 rounded-lg py-2 z-50 animate-fade-in shadow-xl backdrop-blur-xl
                    ${isDark
                      ? "bg-slate-900/95 border border-white/10"
                      : "bg-white/95 border border-gray-200/50"
                    }`}>
                    <Link
                      to="/dashboard"
                      className={`flex items-center px-4 py-2.5 transition-all duration-300 mx-1.5 rounded-md text-sm
                        ${isDark
                          ? "text-slate-200 hover:text-red-400 hover:bg-white/10"
                          : "text-gray-700 hover:text-red-600 hover:bg-gray-100/80"
                        }`}
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <FaHome className={`mr-3 w-3.5 h-3.5 ${isDark ? "text-red-400" : "text-red-500"}`} />
                      <span className="font-medium">Dashboard</span>
                    </Link>
                    {role === "admin" && (
                      <Link
                        to="/dashboard/all-users"
                        className={`flex items-center px-4 py-2.5 transition-all duration-300 mx-1.5 rounded-md text-sm
                          ${isDark
                            ? "text-slate-200 hover:text-red-400 hover:bg-white/10"
                            : "text-gray-700 hover:text-red-600 hover:bg-gray-100/80"
                          }`}
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <FaUser className={`mr-3 w-3.5 h-3.5 ${isDark ? "text-red-400" : "text-red-500"}`} />
                        <span className="font-medium">Manage Users</span>
                      </Link>
                    )}
                    <hr className={`my-1.5 mx-1.5 ${isDark ? "border-white/10" : "border-gray-200"}`} />
                    <button
                      onClick={handleLogout}
                      className={`flex items-center w-full px-4 py-2.5 text-left transition-all duration-300 mx-1.5 rounded-md text-sm
                        ${isDark
                          ? "text-slate-200 hover:text-red-400 hover:bg-white/10"
                          : "text-gray-700 hover:text-red-600 hover:bg-gray-100/80"
                        }`}
                    >
                      <FaSignOutAlt className={`mr-3 w-3.5 h-3.5 ${isDark ? "text-red-400" : "text-red-500"}`} />
                      <span className="font-medium">Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden lg:flex items-center space-x-2.5">
                <Link
                  to="/login"
                  className={`font-medium px-3.5 py-2.5 rounded-md transition-all duration-300 text-sm
                    ${isDark
                      ? "text-slate-200 hover:text-red-400 hover:bg-white/10"
                      : "text-gray-700 hover:text-red-600 hover:bg-gray-100/80"
                    }`}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className={`px-4 py-2.5 rounded-md font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] text-sm
                    ${isDark
                      ? "bg-gradient-to-r from-red-500/90 to-red-600 text-white hover:from-red-600 hover:to-red-700"
                      : "bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700"
                    }`}
                >
                  Join Now
                </Link>
              </div>
            )}

            <button
              onClick={toggleMenu}
              className={`lg:hidden p-2.5 rounded-md transition-all duration-300 focus:outline-none
                ${isDark
                  ? "text-slate-300 hover:text-red-400 hover:bg-white/10"
                  : "text-gray-700 hover:text-red-600 hover:bg-gray-100/80"
                }`}
            >
              <GiHamburgerMenu size={20} />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className={`lg:hidden rounded-lg mt-2 mb-3 py-3 overflow-hidden animate-slide-up shadow-xl backdrop-blur-xl
            ${isDark
              ? "bg-slate-900/95 border border-white/10"
              : "bg-white/95 border border-gray-200/50"
            }`}>
            <div className="flex flex-col space-y-1 px-2">
              {user && (
                <div className={`flex items-center p-4 mb-3 rounded-lg border
                  ${isDark
                    ? "bg-white/5 border-white/10"
                    : "bg-gray-50/80 border-gray-200"
                  }`}>
                  <img src={user.photoURL} className="w-12 h-12 rounded-full border-2 border-red-500 mr-3 shadow-md" alt="user" />
                  <div>
                    <p className={`font-semibold text-base ${isDark ? "text-white" : "text-gray-900"}`}>
                      {user.displayName}
                    </p>
                    <p className={`text-xs font-medium capitalize px-2.5 py-1 rounded-md inline-block mt-1
                      ${isDark
                        ? "text-red-400 bg-red-900/30"
                        : "text-red-600 bg-red-100"
                      }`}>
                      {role}
                    </p>
                  </div>
                </div>
              )}

              <NavLink to="/" className={mobileLinkStyle} onClick={toggleMenu}>Home</NavLink>
              <NavLink to="/services" className={mobileLinkStyle} onClick={toggleMenu}>Services</NavLink>
              <NavLink to="/blogs" className={mobileLinkStyle} onClick={toggleMenu}>Blogs</NavLink>
              <NavLink to="/testimonials" className={mobileLinkStyle} onClick={toggleMenu}>Testimonials</NavLink>
              <NavLink to="/statistics" className={mobileLinkStyle} onClick={toggleMenu}>Statistics</NavLink>
              <NavLink to="/about-our-mission" className={mobileLinkStyle} onClick={toggleMenu}>Our Mission</NavLink>
              <NavLink to="/pending-requests" className={mobileLinkStyle} onClick={toggleMenu}>Pending Requests</NavLink>

              {user ? (
                <>
                  <NavLink to="/donate" className={mobileLinkStyle} onClick={toggleMenu}>Donate</NavLink>
                  <NavLink to="/search" className={mobileLinkStyle} onClick={toggleMenu}>Search</NavLink>
                  <hr className={`my-3 mx-2 ${isDark ? "border-white/10" : "border-gray-200"}`} />
                  <NavLink to="/dashboard" className={mobileLinkStyle} onClick={toggleMenu}>
                    <span className="flex items-center">
                      <FaHome className={`mr-2.5 w-3.5 h-3.5 ${isDark ? "text-red-400" : "text-red-500"}`} />
                      Dashboard
                    </span>
                  </NavLink>
                  {role === "admin" && (
                    <NavLink to="/dashboard/all-users" className={mobileLinkStyle} onClick={toggleMenu}>
                      <span className="flex items-center">
                        <FaUser className={`mr-2.5 w-3.5 h-3.5 ${isDark ? "text-red-400" : "text-red-500"}`} />
                        Manage Users
                      </span>
                    </NavLink>
                  )}
                  <button onClick={handleLogout} className={`block w-full text-left px-4 py-3 rounded-md font-medium transition-all duration-300 text-sm
                    ${isDark
                      ? "text-red-400 hover:text-red-300 hover:bg-white/10"
                      : "text-red-600 hover:text-red-700 hover:bg-gray-100/80"
                    }`}>
                    <span className="flex items-center">
                      <FaSignOutAlt className={`mr-2.5 w-3.5 h-3.5 ${isDark ? "text-red-400" : "text-red-500"}`} />
                      Logout
                    </span>
                  </button>
                </>
              ) : (
                <div className={`pt-3 border-t flex flex-col space-y-3 mt-3
                  ${isDark ? "border-white/10" : "border-gray-200"}`}>
                  <Link
                    to="/login"
                    className={`block text-center py-3 font-medium rounded-md transition-all duration-300
                      ${isDark
                        ? "text-slate-200 hover:text-red-400 hover:bg-white/10"
                        : "text-gray-700 hover:text-red-600 hover:bg-gray-100/80"
                      }`}
                    onClick={toggleMenu}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className={`block text-center py-3 rounded-md font-semibold shadow-md hover:shadow-lg transition-all duration-300
                      ${isDark
                        ? "bg-gradient-to-r from-red-500/90 to-red-600 text-white"
                        : "bg-gradient-to-r from-red-500 to-red-600 text-white"
                      }`}
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