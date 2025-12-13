import { createBrowserRouter } from "react-router-dom";
import Root from "../layouts/Root";
import Home from "../pages/Home/Home";
import DashboardLayout from "../layouts/DashboardLayout";
import MainDashboard from "../dashboard/MainDashboard";
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
import ForgotPassword from "../pages/auth/ForgotPassword";
import AddRequest from "../dashboard/AddRequest";
import PrivateRoute from "../Provider/PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <h1>404 Not Found</h1>,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "donation-requests",
        element: <h1>Donation Requests Page</h1>,
      },
      {
        path: "search",
        element: <h1>Search Donors</h1>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    errorElement: <h1>404 Not Found</h1>,
    children: [
      {
        index: true,
        path: "dashboard",
        element: <MainDashboard />,
      },
      {
        path: "create-donation-request",
        element: <AddRequest />,
      },
      {
        path: "my-donation-requests",
        element: <h1>My Donation Requests</h1>,
      },
      {
        path: "all-blood-donation-request",
        element: <h1>All Blood Donation Requests</h1>,
      },
      {
        path: "all-users",
        element: <h1>All Users</h1>,
      },
      {
        path: "profile",
        element: <h1>Profile Page</h1>,
      },
      {
        path: "funding",
        element: <h1>Funding Page</h1>,
      },
      {
        path: "*",
        element: <h1>404 - Dashboard Page Not Found</h1>,
      },
    ],
  },
  {
    path: "*",
    element: <h1>404 - Page Not Found</h1>,
  },
]);
