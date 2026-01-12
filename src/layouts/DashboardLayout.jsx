import React, { useState, useEffect } from "react";
import Aside from "../dashboard/Aside";
import { Outlet, useLocation } from "react-router";
import { useAuth } from "../Provider/AuthProvider";
import ScrollToTop from "../components/shared/ScrollToTop";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import { useSmoothScroll } from "../hooks/useSmoothScroll";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, role } = useAuth();
  const location = useLocation();

  // Initialize smooth scrolling
  useSmoothScroll();

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarOpen && !event.target.closest('.sidebar-container') && !event.target.closest('.sidebar-toggle')) {
        setSidebarOpen(false);
      }
    };

    if (sidebarOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      // Prevent body scroll when sidebar is open on mobile
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [sidebarOpen]);

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setSidebarOpen(false);
  }, [location?.pathname]);

  return (
    <div className="min-h-screen bg-bg-primary dark:bg-bg-primary">
      <ScrollToTop />

      {/* Enhanced Glassmorphism Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-red-500/8 dark:bg-red-600/12 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-blue-500/6 dark:bg-blue-600/10 rounded-full blur-3xl animate-pulse animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/4 dark:bg-purple-600/8 rounded-full blur-3xl animate-pulse animation-delay-4000" />
      </div>

      {/* Layout Container */}
      <div className="flex relative min-h-screen">
        {/* Desktop Sidebar - Fixed positioning */}
        <div className="hidden lg:flex w-64 flex-shrink-0 relative z-20">
          <div className="sidebar-container fixed top-0 left-0 h-screen w-64 overflow-hidden">
            <Aside closeSidebar={() => setSidebarOpen(false)} />
          </div>
        </div>

        {/* Mobile Sidebar Overlay and Sidebar */}
        <AnimatePresence>
          {sidebarOpen && (
            <>
              {/* Mobile Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
                onClick={() => setSidebarOpen(false)}
              />

              {/* Mobile Sidebar */}
              <motion.div
                initial={{ x: -300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -300, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="sidebar-container fixed top-0 left-0 h-screen w-64 z-50 lg:hidden overflow-hidden"
              >
                <Aside closeSidebar={() => setSidebarOpen(false)} />
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-h-screen relative z-10 w-full lg:ml-0">
          {/* Enhanced Glassmorphism Header */}
          <motion.header
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-bg-card/95 dark:bg-bg-card/90 backdrop-blur-xl glass-border sticky top-0 z-30 px-4 sm:px-6 py-4 shadow-modern-lg dark:shadow-modern-2xl"
          >
            <div className="flex items-center justify-between max-w-full">
              {/* Mobile Menu Toggle */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="sidebar-toggle lg:hidden p-3 rounded-xl bg-bg-tertiary/80 dark:bg-bg-tertiary/60 backdrop-blur-sm hover:bg-bg-tertiary/90 dark:hover:bg-bg-tertiary/80 text-text-secondary interactive-border shadow-modern-md transition-all duration-300 flex-shrink-0"
              >
                {sidebarOpen ? <FiX size={20} /> : <FiMenu size={20} />}
              </motion.button>

              {/* Dashboard Title */}
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="hidden sm:block text-xl md:text-2xl font-bold bg-gradient-to-r from-red-600 to-red-500 dark:from-red-400 dark:to-red-300 bg-clip-text text-transparent flex-1 text-center lg:text-left"
              >
                Blood<span className="text-text-primary">Connect</span> Dashboard
              </motion.h2>

              {/* Mobile Title (Shorter) */}
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="block sm:hidden text-lg font-bold bg-gradient-to-r from-red-600 to-red-500 dark:from-red-400 dark:to-red-300 bg-clip-text text-transparent flex-1 text-center"
              >
                Dashboard
              </motion.h2>

              {/* User Profile Section */}
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-2 sm:gap-4 flex-shrink-0"
              >
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-bold text-text-primary truncate max-w-32">
                    {user?.displayName || "User Name"}
                  </p>
                  <p className="text-xs bg-gradient-to-r from-red-500 to-red-600 dark:from-red-400 dark:to-red-500 text-white px-2 sm:px-3 py-1 rounded-full font-semibold uppercase tracking-wider shadow-lg">
                    {role || "User"}
                  </p>
                </div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative flex-shrink-0"
                >
                  <img
                    src={user?.photoURL || "https://i.ibb.co/5R39p3F/user.png"}
                    alt="profile"
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full interactive-border object-cover shadow-modern-xl backdrop-blur-sm"
                  />
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-full border-2 border-bg-card dark:border-bg-card shadow-modern-lg"></div>
                </motion.div>
              </motion.div>
            </div>
          </motion.header>

          {/* Main Content */}
          <motion.main
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-1 p-4 sm:p-6 md:p-8 lg:p-10 max-w-full overflow-x-hidden"
          >
            <div className="max-w-[1600px] mx-auto w-full">
              <Outlet />
            </div>
          </motion.main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;