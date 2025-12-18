import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaUser, FaSignOutAlt, FaHome } from "react-icons/fa";
import { MdBloodtype } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { useAuth } from "../../Provider/AuthProvider";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, logout, role } = useAuth();
  const navigate = useNavigate();

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

  // NavLink active styles
  const navLinkStyle = ({ isActive }) =>
    `text-white hover:text-red-200 font-medium transition-colors duration-200 ${
      isActive ? "border-b-2 border-white" : ""
    }`;

  const mobileLinkStyle =
    "block text-gray-700 hover:text-red-600 hover:bg-red-50 px-4 py-3 rounded-lg font-medium transition-colors";

  return (
    <nav className="bg-gradient-to-r from-red-600 to-red-800 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-10 h-10 bg-white rounded-full">
              <MdBloodtype className="text-red-600 text-2xl" />
            </div>
            <div>
              <h1 className="text-white text-xl font-bold leading-none">
                BloodConnect
              </h1>
              <p className="text-red-100 text-[10px] mt-1">
                Save Lives, Donate Blood
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/" className={navLinkStyle}>
              Home
            </NavLink>
            <NavLink to="/pending-requests" className={navLinkStyle}>
              Pending Requests
            </NavLink>
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
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="relative user-dropdown">
                <button
                  onClick={toggleDropdown}
                  className="flex items-center space-x-2 text-white focus:outline-none"
                >
                  <img
                    src={user.photoURL || "https://i.ibb.co/5GzXkwq/user.png"}
                    alt="user"
                    className="w-8 h-8 rounded-full border-2 border-white object-cover"
                  />
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

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 z-50">
                    <Link
                      to="/dashboard"
                      className="flex items-center px-4 py-2 text-gray-700 hover:bg-red-50"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <FaHome className="mr-3 text-red-600" /> Dashboard
                    </Link>
                    {role === "admin" && (
                      <Link
                        to="/dashboard/all-users"
                        className="flex items-center px-4 py-2 text-gray-700 hover:bg-red-50"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <FaUser className="mr-3 text-red-600" /> Manage Users
                      </Link>
                    )}
                    <hr className="my-1 border-gray-100" />
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-red-50 text-left"
                    >
                      <FaSignOutAlt className="mr-3 text-red-600" /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-white hover:text-red-200 font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-white text-red-600 px-5 py-2 rounded-full font-bold shadow-md hover:bg-red-50 transition-all"
                >
                  Join Now
                </Link>
              </div>
            )}

            {/* Mobile Toggle Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden text-white focus:outline-none"
            >
              <GiHamburgerMenu size={26} />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white rounded-xl mt-2 mb-4 py-4 shadow-2xl border border-red-50 overflow-hidden">
            <div className="flex flex-col space-y-1 px-3">
              {user && (
                <div className="flex items-center p-3 mb-3 bg-red-50 rounded-xl">
                  <img
                    src={user.photoURL}
                    className="w-12 h-12 rounded-full border-2 border-red-500 mr-3"
                    alt="user"
                  />
                  <div>
                    <p className="font-bold text-gray-800">
                      {user.displayName}
                    </p>
                    <p className="text-xs text-red-600 font-medium capitalize">
                      {role}
                    </p>
                  </div>
                </div>
              )}

              <Link to="/" className={mobileLinkStyle} onClick={toggleMenu}>
                Home
              </Link>
              <Link
                to="/pending-requests"
                className={mobileLinkStyle}
                onClick={toggleMenu}
              >
                Pending Requests
              </Link>

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
                  <hr className="my-2 border-gray-100" />
                  <Link
                    to="/dashboard"
                    className={`${mobileLinkStyle} bg-red-50 text-red-700`}
                    onClick={toggleMenu}
                  >
                    <span className="flex items-center">
                      <FaHome className="mr-2" /> Dashboard
                    </span>
                  </Link>
                  {role === "admin" && (
                    <Link
                      to="/dashboard/all-users"
                      className={mobileLinkStyle}
                      onClick={toggleMenu}
                    >
                      <span className="flex items-center">
                        <FaUser className="mr-2" /> Manage Users
                      </span>
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className={`${mobileLinkStyle} text-red-600 w-full text-left`}
                  >
                    <span className="flex items-center">
                      <FaSignOutAlt className="mr-2" /> Logout
                    </span>
                  </button>
                </>
              )}

              {!user && (
                <div className="pt-3 border-t flex flex-col space-y-2">
                  <Link
                    to="/login"
                    className="block text-center text-gray-700 py-3 font-semibold"
                    onClick={toggleMenu}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="block text-center bg-red-600 text-white py-3 rounded-xl font-bold"
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
