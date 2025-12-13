import React from "react";
import Aside from "../dashboard/Aside";
import { Outlet } from "react-router";

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-100">
        <Aside />
      </aside>
      <main className="flex-1 p-4 bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
