import React, { useState } from "react";
import Aside from "../dashboard/Aside";
import { Outlet } from "react-router";
import { useAuth } from "../Provider/AuthProvider";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, role } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50 flex overflow-hidden">
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-2xl transform transition-transform duration-300 lg:translate-x-0 lg:static lg:inset-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Aside closeSidebar={() => setSidebarOpen(false)} />
      </aside>

      <div className="flex-1 flex flex-col h-screen overflow-y-auto overflow-x-hidden">
        {/* user profile and dynamic role */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-30 px-4 py-3">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-md hover:bg-gray-100 text-gray-600"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            <h2 className="hidden md:block text-xl font-bold text-gray-800">
              Blood<span className="text-red-600">Connect</span> Panel
            </h2>

            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-red-800">
                  {user?.displayName || "User Name"}
                </p>
                <p className="text-[10px] bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                  {role || "Active User"}
                </p>
              </div>
              <img
                src={user?.photoURL || "https://i.ibb.co/5R39p3F/user.png"}
                alt="profile"
                className="w-10 h-10 rounded-full border-2 border-red-500 object-cover shadow-sm"
              />
            </div>
          </div>
        </header>

        <main className="p-4 md:p-6 lg:p-8 flex-1 max-w-[1600px] mx-auto w-full">
          <Outlet />
        </main>
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default DashboardLayout;
