import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaHome, FaUser, FaTint } from "react-icons/fa";
import { MdBloodtype } from "react-icons/md";
import { AuthContext } from "../Provider/AuthProvider";

const Aside = () => {
  const navigate = useNavigate();
  const { role } = useContext(AuthContext);

  const menu = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <FaHome className="text-red-600" />,
    },

    ...(role === "admin"
      ? [
          {
            name: "All Requests",
            path: "/dashboard/my-donation-requests",
            icon: <FaTint className="text-red-600" />,
          },
          {
            name: "All Users",
            path: "/dashboard/all-users",
            icon: <FaUser className="text-red-600" />,
          },
        ]
      : []),

    ...(role === "volunteer"
      ? [
          {
            name: "All Requests",
            path: "/dashboard/all-blood-donation-request-volunteer",
            icon: <FaTint className="text-red-600" />,
          },
        ]
      : []),

    ...(role === "donor"
      ? [
          {
            name: "Create Request",
            path: "/dashboard/create-donation-request",
            icon: <FaUser className="text-red-600" />,
          },
          {
            name: "My Requests",
            path: "/dashboard/donation-requests",
            icon: <FaTint className="text-red-600" />,
          },
        ]
      : []),

    {
      name: "Profile",
      path: "/dashboard/profile",
      icon: <FaUser className="text-red-600" />,
    },
  ];

  return (
    <aside className="w-64 h-screen bg-white shadow-lg flex flex-col">
      {/* Logo */}
      <div className="flex items-center justify-center h-20 bg-red-700 gap-2">
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
          <MdBloodtype className="text-red-700 text-2xl" />
        </div>
        <div>
          <h1 className="text-white text-xl font-bold">BloodConnect</h1>
          <p className="text-red-100 text-xs">Save Lives, Donate Blood</p>
        </div>
      </div>

      {/* Menu */}
      <nav className="flex flex-col mt-6 gap-2 px-2">
        {menu.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                isActive
                  ? "bg-red-100 text-red-700 font-semibold border-l-4 border-red-700"
                  : "text-gray-700 hover:bg-red-50 hover:text-red-700"
              }`
            }
          >
            <span className="text-lg">{item.icon}</span>
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* Home Button */}
      <div className="mt-auto p-6 border-t">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-red-700 hover:bg-red-50 transition"
        >
          <FaHome className="text-red-700" />
          Home
        </button>
      </div>
    </aside>
  );
};

export default Aside;
