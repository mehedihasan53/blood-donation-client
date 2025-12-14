import React, { useState } from "react";
import Aside from "../dashboard/Aside";
import { Outlet } from "react-router";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="flex">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block fixed inset-y-0 left-0 z-30 w-64">
          <Aside />
        </aside>

        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <>
            <div
              className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <aside className="fixed inset-y-0 left-0 z-50 w-64 lg:hidden">
              <Aside />
            </aside>
          </>
        )}

        {/* Main content area */}
        <div className="flex-1 lg:ml-64 min-h-screen">
          {/* Mobile top header */}
          <header className="lg:hidden sticky top-0 z-30 bg-gradient-to-r from-red-600 to-red-700 shadow-lg">
            <div className="flex items-center justify-between px-4 py-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="text-white hover:bg-red-700 p-2 rounded-lg transition-colors"
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
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <span className="text-red-600 font-bold text-lg">B</span>
                </div>
                <span className="text-white font-semibold">Dashboard</span>
              </div>
              <div className="w-10"></div> {/* For balance */}
            </div>
          </header>

          {/* Outlet renders */}
          <main className="min-h-[calc(100vh-64px)] lg:min-h-screen">
            <div className="p-4 md:p-6 lg:p-8">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
