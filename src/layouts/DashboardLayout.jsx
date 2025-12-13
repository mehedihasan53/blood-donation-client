import React from "react";
import Aside from "../dashboard/Aside";
import { Outlet } from "react-router";

const DashboardLayout = () => {
  return (
    <div>
      <aside>
        <Aside />
      </aside>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
