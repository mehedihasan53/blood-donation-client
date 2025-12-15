import React from "react";
import { useAuth } from "../../Provider/AuthProvider";
import AdminDashboard from "../AdminDashboard";
import DonorDashboard from "../DonorDashboard";
import VolunteerDashboard from "../VolunteerDashboard";

const Dashboard = () => {
  const { user, role } = useAuth();

  if (!user) return <p>Loading...</p>;

  switch (role?.toLowerCase()) {
    case "admin":
      return <AdminDashboard />;
    case "donor":
      return <DonorDashboard />;
    case "volunteer":
      return <VolunteerDashboard />;
    default:
      return <p>Invalid Role: {role}</p>;
  }
};

export default Dashboard;
