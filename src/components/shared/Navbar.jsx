import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaUser, FaSignOutAlt, FaBell, FaHome, FaSearch } from "react-icons/fa";
import { MdBloodtype } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { useAuth } from "../../Provider/AuthProvider";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isDropdownOpen && !event.target.closest(".user-dropdown")) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <nav className="bg-gradient-to-r from-red-600 to-red-800 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-10 h-10 bg-white rounded-full">
              <MdBloodtype className="text-red-600 text-2xl" />
            </div>
            <div>
              <h1 className="text-white text-xl font-bold">BloodConnect</h1>
              <p className="text-red-100 text-xs">Save Lives, Donate Blood</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-white hover:text-red-200 font-medium transition-colors duration-200 ${
                  isActive ? "border-b-2 border-white" : ""
                }`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/donation-requests"
              className={({ isActive }) =>
                `text-white hover:text-red-200 font-medium transition-colors duration-200 ${
                  isActive ? "border-b-2 border-white" : ""
                }`
              }
            >
              Donation Requests
            </NavLink>
            <NavLink
              to="/donate"
              className={({ isActive }) =>
                `text-white hover:text-red-200 font-medium transition-colors duration-200 ${
                  isActive ? "border-b-2 border-white" : ""
                }`
              }
            >
              Donate
            </NavLink>

            {user && (
              <NavLink
                to="/search"
                className={({ isActive }) =>
                  `text-white hover:text-red-200 font-medium transition-colors duration-200 ${
                    isActive ? "border-b-2 border-white" : ""
                  }`
                }
              >
                Search
              </NavLink>
            )}
          </div>

          {/* Right side - Auth/User Section */}
          <div className="flex items-center space-x-4">
            {/* Search Button for Mobile */}
            <Link
              to="/search"
              className="md:hidden text-white hover:text-red-200 transition-colors"
            >
              <FaSearch size={20} />
            </Link>

            {user ? (
              <div className="relative user-dropdown">
                <button
                  onClick={toggleDropdown}
                  className="flex items-center space-x-2 text-white hover:text-red-200 transition-colors focus:outline-none"
                >
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName}
                      className="w-8 h-8 rounded-full border-2 border-white"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                      <FaUser className="text-red-600" />
                    </div>
                  )}
                  <span className="hidden md:inline font-medium">
                    {user.displayName?.split(" ")[0]}
                  </span>
                  <svg
                    className={`w-4 h-4 transition-transform ${
                      isDropdownOpen ? "rotate-180" : ""
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

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                    <Link
                      to="/dashboard"
                      className="flex items-center px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <FaHome className="mr-3" />
                      Dashboard
                    </Link>

                    {user.role === "admin" && (
                      <Link
                        to="/dashboard/all-users"
                        className="flex items-center px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <FaUser className="mr-3" />
                        Manage Users
                      </Link>
                    )}

                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                    >
                      <FaSignOutAlt className="mr-3" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-4">
                <Link
                  to="/search"
                  className="text-white hover:text-red-200 font-medium transition-colors"
                >
                  Search Donors
                </Link>

                <Link
                  to="/login"
                  className="text-white hover:text-red-200 font-medium transition-colors"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="bg-white text-red-600 hover:bg-red-50 px-4 py-2 rounded-full font-semibold transition-colors duration-200 shadow-md hover:shadow-lg"
                >
                  Join as Donor
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden text-white hover:text-red-200 transition-colors focus:outline-none"
            >
              <GiHamburgerMenu size={24} />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white rounded-lg mt-2 mb-4 py-4 shadow-lg">
            <div className="flex flex-col space-y-2 px-4">
              <Link
                to="/"
                className="text-gray-700 hover:text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg transition-colors"
                onClick={toggleMenu}
              >
                Home
              </Link>

              <Link
                to="/donation-requests"
                className="text-gray-700 hover:text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg transition-colors"
                onClick={toggleMenu}
              >
                Donation Requests
              </Link>

              <Link
                to="/search"
                className="text-gray-700 hover:text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg transition-colors"
                onClick={toggleMenu}
              >
                Search Donors
              </Link>

              {user && (
                <Link
                  to="/dashboard/funding"
                  className="text-gray-700 hover:text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg transition-colors"
                  onClick={toggleMenu}
                >
                  Funding
                </Link>
              )}

              <div className="border-t pt-2 mt-2">
                {!user ? (
                  <>
                    <Link
                      to="/login"
                      className="block text-center text-gray-700 hover:text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg transition-colors"
                      onClick={toggleMenu}
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="block text-center bg-red-600 text-white hover:bg-red-700 px-4 py-2 rounded-lg font-semibold transition-colors mt-2"
                      onClick={toggleMenu}
                    >
                      Join as Donor
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      to="/dashboard"
                      className="block text-gray-700 hover:text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg transition-colors"
                      onClick={toggleMenu}
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        toggleMenu();
                      }}
                      className="block w-full text-left text-gray-700 hover:text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg transition-colors"
                    >
                      Logout
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
