import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaHome, FaUser, FaTint, FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../Provider/AuthProvider";
import { MdBloodtype } from "react-icons/md";
import { Link } from "react-router";

const Aside = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const menu = [
    { name: "Dashboard", path: "/dashboard", icon: <FaHome /> },
    {
      name: "My Requests",
      path: "/dashboard/my-donation-requests",
      icon: <FaTint />,
    },
    {
      name: "Create Request",
      path: "/dashboard/create-donation-request",
      icon: <FaUser />,
    },
  ];

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <aside className="w-64 h-screen bg-white shadow-lg border-r flex flex-col">
      {/* Logo / Brand */}
      <Link
        to={"/"}
        className="flex items-center justify-center w-full h-20 bg-red-600 space-x-2"
      >
        <div className="flex items-center justify-center w-10 h-10 bg-white rounded-full">
          <MdBloodtype className="text-red-600 text-2xl" />
        </div>
        <div>
          <h1 className="text-white text-xl font-bold">BloodConnect</h1>
          <p className="text-red-100 text-xs">Save Lives, Donate Blood</p>
        </div>
      </Link>

      {/* Navigation */}
      <nav className="flex flex-col mt-6 gap-2 px-2">
        {menu.map((item, i) => (
          <NavLink
            key={i}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive
                  ? "bg-red-100 text-red-700 font-semibold border-l-4 border-red-600"
                  : "text-gray-700 hover:bg-red-50 hover:text-red-600"
              }`
            }
          >
            <span className="text-lg">{item.icon}</span>
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* Footer / Logout */}
      <div className="mt-auto p-6 border-t">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 w-full text-left rounded-lg text-gray-500 hover:bg-red-50 hover:text-red-600 transition-all"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Aside;
