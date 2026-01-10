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
  const { user, logout, role } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

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
    `px-4 py-2.5 text-sm text-gray-700 dark:text-slate-200 hover:text-red-600 dark:hover:text-red-300 font-medium transition-all duration-300 rounded-lg hover:bg-white/15 dark:hover:bg-white/8 backdrop-blur-sm ${isActive ? "text-red-600 dark:text-red-300 bg-white/25 dark:bg-white/12 shadow-sm" : ""
    }`;

  const mobileLinkStyle =
    "block text-gray-700 dark:text-slate-200 hover:text-red-600 dark:hover:text-red-300 hover:bg-white/15 dark:hover:bg-white/8 px-5 py-3.5 rounded-lg font-medium transition-all duration-300 backdrop-blur-sm";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-50/80 dark:bg-slate-800/90 backdrop-blur-xl border-b border-gray-200/40 dark:border-slate-600/40 shadow-sm">
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
          <div className="hidden lg:flex items-center space-x-1">
            <NavLink to="/" className={navLinkStyle}>Home</NavLink>
            <NavLink to="/services" className={navLinkStyle}>Services</NavLink>
            <NavLink to="/statistics" className={navLinkStyle}>Statistics</NavLink>
            <NavLink to="/about-our-mission" className={navLinkStyle}>Our Mission</NavLink>
            <NavLink to="/pending-requests" className={navLinkStyle}>Pending Requests</NavLink>
            <button
              onClick={handleContactClick}
              className="px-4 py-2.5 text-sm text-gray-700 dark:text-slate-200 hover:text-red-600 dark:hover:text-red-300 font-medium transition-all duration-300 rounded-lg hover:bg-white/15 dark:hover:bg-white/8 backdrop-blur-sm"
            >
              Contact
            </button>
            {user && (
              <>
                <div className="w-px h-6 bg-gray-300/50 dark:bg-slate-500/50 mx-2"></div>
                <NavLink to="/donate" className={navLinkStyle}>Donate</NavLink>
                <NavLink to="/search" className={navLinkStyle}>Search</NavLink>
              </>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              className="p-2.5 text-gray-600 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-300 hover:bg-white/15 dark:hover:bg-white/8 rounded-lg transition-all duration-300 hover:scale-105 backdrop-blur-sm"
              aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            >
              {isDark ? <FaSun className="w-4 h-4" /> : <FaMoon className="w-4 h-4" />}
            </button>

            {user ? (
              <div className="relative user-dropdown">
                <button
                  onClick={toggleDropdown}
                  className="flex items-center space-x-2.5 text-gray-700 dark:text-slate-200 hover:bg-white/15 dark:hover:bg-white/8 px-3 py-2.5 rounded-lg transition-all duration-300 focus:outline-none backdrop-blur-sm"
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
                  <div className="absolute right-0 mt-2 w-52 bg-white/95 dark:bg-slate-700/95 backdrop-blur-xl rounded-xl border border-gray-200/50 dark:border-slate-600/50 py-2 z-50 animate-fade-in shadow-lg">
                    <Link to="/dashboard" className="flex items-center px-4 py-2.5 text-gray-700 dark:text-slate-200 hover:bg-white/15 dark:hover:bg-white/8 hover:text-red-600 transition-all duration-300 mx-1.5 rounded-lg backdrop-blur-sm text-sm" onClick={() => setIsDropdownOpen(false)}>
                      <FaHome className="mr-3 text-red-500 w-3.5 h-3.5" />
                      <span className="font-medium">Dashboard</span>
                    </Link>
                    {role === "admin" && (
                      <Link to="/dashboard/all-users" className="flex items-center px-4 py-2.5 text-gray-700 dark:text-slate-200 hover:bg-white/15 dark:hover:bg-white/8 hover:text-red-600 transition-all duration-300 mx-1.5 rounded-lg backdrop-blur-sm text-sm" onClick={() => setIsDropdownOpen(false)}>
                        <FaUser className="mr-3 text-red-500 w-3.5 h-3.5" />
                        <span className="font-medium">Manage Users</span>
                      </Link>
                    )}
                    <hr className="my-1.5 border-gray-200/50 dark:border-slate-600/50 mx-1.5" />
                    <button onClick={handleLogout} className="flex items-center w-full px-4 py-2.5 text-gray-700 dark:text-slate-200 hover:bg-white/15 dark:hover:bg-white/8 hover:text-red-600 text-left transition-all duration-300 mx-1.5 rounded-lg backdrop-blur-sm text-sm">
                      <FaSignOutAlt className="mr-3 text-red-500 w-3.5 h-3.5" />
                      <span className="font-medium">Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden lg:flex items-center space-x-3">
                <Link to="/login" className="text-gray-700 dark:text-slate-200 hover:text-red-600 font-medium px-4 py-2.5 rounded-lg transition-all duration-300 hover:bg-white/15 dark:hover:bg-white/8 backdrop-blur-sm text-sm">Login</Link>
                <Link to="/register" className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-5 py-2.5 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] text-sm">Join Now</Link>
              </div>
            )}

            <button onClick={toggleMenu} className="lg:hidden text-gray-700 dark:text-slate-200 hover:bg-white/15 dark:hover:bg-white/8 p-2.5 rounded-lg transition-all duration-300 focus:outline-none backdrop-blur-sm">
              <GiHamburgerMenu size={20} />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white/95 dark:bg-slate-700/95 backdrop-blur-xl rounded-xl mt-3 mb-4 py-4 border border-gray-200/50 dark:border-slate-600/50 overflow-hidden animate-slide-up shadow-lg">
            <div className="flex flex-col space-y-2 px-3">
              {user && (
                <div className="flex items-center p-4 mb-3 bg-gray-50/60 dark:bg-slate-600/40 backdrop-blur-sm rounded-xl border border-gray-200/40 dark:border-slate-500/40">
                  <img src={user.photoURL} className="w-12 h-12 rounded-full border-2 border-red-500 mr-3 shadow-md" alt="user" />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white text-base">{user.displayName}</p>
                    <p className="text-xs text-red-600 dark:text-red-300 font-medium capitalize bg-red-100/50 dark:bg-red-900/30 px-2.5 py-1 rounded-md inline-block mt-1">{role}</p>
                  </div>
                </div>
              )}

              <Link to="/" className={mobileLinkStyle} onClick={toggleMenu}>Home</Link>
              <Link to="/services" className={mobileLinkStyle} onClick={toggleMenu}>Services</Link>
              <Link to="/statistics" className={mobileLinkStyle} onClick={toggleMenu}>Statistics</Link>
              <Link to="/about-our-mission" className={mobileLinkStyle} onClick={toggleMenu}>Our Mission</Link>
              <Link to="/pending-requests" className={mobileLinkStyle} onClick={toggleMenu}>Pending Requests</Link>
              <button onClick={handleContactClick} className={`${mobileLinkStyle} w-full text-left`}>
                Contact
              </button>

              {user ? (
                <>
                  <Link to="/donate" className={mobileLinkStyle} onClick={toggleMenu}>Donate</Link>
                  <Link to="/search" className={mobileLinkStyle} onClick={toggleMenu}>Search</Link>
                  <hr className="my-3 border-gray-200/50 dark:border-slate-600/50 mx-2" />
                  <Link to="/dashboard" className={`${mobileLinkStyle} bg-white/25 dark:bg-white/8 text-red-700 dark:text-red-300 font-semibold`} onClick={toggleMenu}>
                    <span className="flex items-center"><FaHome className="mr-2.5 w-3.5 h-3.5" /> Dashboard</span>
                  </Link>
                  {role === "admin" && (
                    <Link to="/dashboard/all-users" className={mobileLinkStyle} onClick={toggleMenu}>
                      <span className="flex items-center"><FaUser className="mr-2.5 w-3.5 h-3.5" /> Manage Users</span>
                    </Link>
                  )}
                  <button onClick={handleLogout} className={`${mobileLinkStyle} text-red-600 dark:text-red-300 w-full text-left font-semibold`}>
                    <span className="flex items-center"><FaSignOutAlt className="mr-2.5 w-3.5 h-3.5" /> Logout</span>
                  </button>
                </>
              ) : (
                <div className="pt-3 border-t border-gray-200/50 dark:border-slate-600/50 flex flex-col space-y-3 mt-3">
                  <Link to="/login" className="block text-center text-gray-700 dark:text-slate-200 py-3 font-medium hover:bg-white/15 dark:hover:bg-white/8 rounded-lg transition-all duration-300" onClick={toggleMenu}>Login</Link>
                  <Link to="/register" className="block text-center bg-gradient-to-r from-red-500 to-red-600 text-white py-3 rounded-lg font-semibold shadow-md" onClick={toggleMenu}>Join as Donor</Link>
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