import React from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaUser, FaTint, FaBell, FaSignOutAlt } from "react-icons/fa";

const Aside = () => {
  const menu = [
    { name: "Dashboard", path: "/dashboard", icon: <FaHome /> },
    { name: "Donors", path: "/donors", icon: <FaUser /> },
    { name: "Requests", path: "/requests", icon: <FaTint /> },
    { name: "Notifications", path: "/notifications", icon: <FaBell /> },
  ];

  return (
    <aside className="w-64 h-screen bg-white shadow-lg border-r p-6 flex flex-col">
      <h2 className="text-2xl font-bold text-red-600 mb-10">BloodCare</h2>

      <nav className="flex flex-col gap-3">
        {menu.map((item, i) => (
          <NavLink
            key={i}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600 transition ${
                isActive ? "bg-red-100 text-red-700 font-semibold" : ""
              }`
            }
          >
            {item.icon}
            {item.name}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto">
        <button className="flex items-center gap-3 px-4 py-3 w-full text-left rounded-lg text-gray-500 hover:bg-red-50 hover:text-red-600 transition">
          <FaSignOutAlt />
          Log Out
        </button>
      </div>
    </aside>
  );
};

export default Aside;
