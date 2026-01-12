import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaHome, FaUser, FaTint, FaUsers, FaPlus, FaList, FaChartBar, FaCog } from "react-icons/fa";
import { MdBloodtype, MdDashboard } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";
import { AuthContext } from "../Provider/AuthProvider";
import { motion } from "framer-motion";

const Aside = ({ closeSidebar }) => {
  const navigate = useNavigate();
  const { role, logout } = useContext(AuthContext);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const menu = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <MdDashboard className="text-lg" />,
      color: "from-red-500 to-red-600",
    },

    ...(role === "admin"
      ? [
        {
          name: "All Requests",
          path: "/dashboard/my-donation-requests",
          icon: <FaTint className="text-lg" />,
          color: "from-blue-500 to-blue-600",
        },
        {
          name: "All Users",
          path: "/dashboard/all-users",
          icon: <FaUsers className="text-lg" />,
          color: "from-purple-500 to-purple-600",
        },
        {
          name: "Analytics",
          path: "/dashboard/analytics",
          icon: <FaChartBar className="text-lg" />,
          color: "from-green-500 to-green-600",
        },
      ]
      : []),

    ...(role === "volunteer"
      ? [
        {
          name: "All Requests",
          path: "/dashboard/all-blood-donation-request-volunteer",
          icon: <FaTint className="text-lg" />,
          color: "from-blue-500 to-blue-600",
        },
        {
          name: "Manage Donors",
          path: "/dashboard/manage-donors",
          icon: <FaUsers className="text-lg" />,
          color: "from-purple-500 to-purple-600",
        },
      ]
      : []),

    ...(role === "donor"
      ? [
        {
          name: "Create Request",
          path: "/dashboard/create-donation-request",
          icon: <FaPlus className="text-lg" />,
          color: "from-green-500 to-green-600",
        },
        {
          name: "My Requests",
          path: "/dashboard/donation-requests",
          icon: <FaList className="text-lg" />,
          color: "from-blue-500 to-blue-600",
        },
      ]
      : []),

    {
      name: "Profile",
      path: "/dashboard/profile",
      icon: <FaUser className="text-lg" />,
      color: "from-indigo-500 to-indigo-600",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <motion.aside
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-64 h-screen bg-bg-card/95 dark:bg-bg-card/90 backdrop-blur-xl shadow-modern-lg dark:shadow-modern-xl flex flex-col glass-border overflow-hidden sidebar-content"
    >
      {/* Logo Section */}
      <motion.div
        variants={itemVariants}
        className="flex items-center justify-center h-14 bg-gradient-to-r from-red-600 to-red-500 dark:from-red-500 dark:to-red-400 relative overflow-hidden flex-shrink-0"
      >
        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
        <div className="relative z-10 flex items-center gap-2">
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
            className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 shadow-md"
          >
            <MdBloodtype className="sidebar-icon text-white" />
          </motion.div>
          <div>
            <h1 className="text-white text-base font-bold">BloodConnect</h1>
            <p className="text-red-100 text-xs font-medium hidden sm:block">Save Lives</p>
          </div>
        </div>
      </motion.div>

      {/* Role Badge */}
      <motion.div
        variants={itemVariants}
        className="px-3 py-2.5 flex-shrink-0"
      >
        <div className="bg-bg-tertiary/80 dark:bg-bg-tertiary/60 backdrop-blur-sm rounded-lg p-2 interactive-border shadow-modern-sm">
          <p className="text-xs text-text-muted font-medium uppercase tracking-wide">Current Role</p>
          <p className="text-sm font-bold bg-gradient-to-r from-red-600 to-red-500 dark:from-red-400 dark:to-red-300 bg-clip-text text-transparent capitalize">
            {role || "User"}
          </p>
        </div>
      </motion.div>

      {/* Navigation Menu */}
      <nav className="sidebar-nav">
        {menu.map((item, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <NavLink
              to={item.path}
              onClick={closeSidebar}
              className={({ isActive }) =>
                `sidebar-button-compact text-text-primary transition-all duration-300 group relative overflow-hidden ${isActive
                  ? "bg-gradient-to-r " + item.color + " text-white shadow-modern-lg transform scale-[1.02]"
                  : "hover:bg-bg-tertiary/60 dark:hover:bg-bg-tertiary/40 backdrop-blur-sm interactive-border hover:shadow-modern-lg"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className={`p-1.5 rounded-lg transition-all duration-300 ${isActive
                    ? "bg-white/20 backdrop-blur-sm"
                    : "bg-bg-secondary/80 dark:bg-bg-secondary/60 group-hover:bg-bg-secondary/90 dark:group-hover:bg-bg-secondary/80"
                    }`}>
                    <span className={`sidebar-icon ${isActive ? "text-white" : `bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}`}>
                      {item.icon}
                    </span>
                  </div>
                  <span className="font-medium truncate">{item.name}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute right-2 w-2 h-2 bg-white rounded-full shadow-lg"
                    />
                  )}
                </>
              )}
            </NavLink>
          </motion.div>
        ))}
      </nav>

      {/* Bottom Actions */}
      <motion.div
        variants={itemVariants}
        className="sidebar-bottom glass-border border-t-0 border-l-0 border-r-0"
      >
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            navigate("/");
            closeSidebar && closeSidebar();
          }}
          className="sidebar-button-compact w-full text-text-primary hover:bg-bg-tertiary/60 dark:hover:bg-bg-tertiary/40 backdrop-blur-sm interactive-border hover:shadow-modern-lg transition-all duration-300 group"
        >
          <div className="p-1.5 rounded-lg bg-bg-secondary/80 dark:bg-bg-secondary/60 group-hover:bg-bg-secondary/90 dark:group-hover:bg-bg-secondary/80 transition-all duration-300">
            <FaHome className="sidebar-icon bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent" />
          </div>
          <span className="font-medium truncate">Back to Home</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleLogout}
          className="sidebar-button-compact w-full text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 backdrop-blur-sm border-accent hover:shadow-modern-lg transition-all duration-300 group"
        >
          <div className="p-1.5 rounded-lg bg-red-100 dark:bg-red-900/30 group-hover:bg-red-200 dark:group-hover:bg-red-800/40 transition-all duration-300">
            <BiLogOut className="sidebar-icon text-red-600 dark:text-red-400" />
          </div>
          <span className="font-medium truncate">Logout</span>
        </motion.button>
      </motion.div>
    </motion.aside>
  );
};

export default Aside;