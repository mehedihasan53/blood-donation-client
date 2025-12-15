import { createBrowserRouter } from "react-router-dom";
import Root from "../layouts/Root";
import Home from "../pages/Home/Home";
import DashboardLayout from "../layouts/DashboardLayout";

import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
import ForgotPassword from "../pages/auth/ForgotPassword";
import AddRequest from "../dashboard/AddRequest";
import PrivateRoute from "../Provider/PrivateRoute";
import AllUsers from "../dashboard/AllUsers";
import Donate from "../Donate/Donate";
import PaymentSuccess from "../Donate/Payment/PaymentSuccess";
import CancelPayment from "../Donate/Payment/CancelPayment";
import Search from "../pages/Search";
import AdminDashboard from "../dashboard/AdminDashboard";
import MyDonationRequest from "../Donation/MyDonationRequest";
import AllDonationRequests from "../Donation/AllDonationRequests";

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
        path: "/search",
        element: (
          <PrivateRoute>
            <Search />
          </PrivateRoute>
        ),
      },
      {
        path: "/donate",
        element: (
          <PrivateRoute>
            <Donate />
          </PrivateRoute>
        ),
      },
      {
        path: "/payment-success",
        element: <PaymentSuccess />,
      },
      {
        path: "/payment-cancel",
        element: <CancelPayment />,
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
        path: "/dashboard",
        element: <AdminDashboard />,
      },
      {
        path: "create-donation-request",
        element: <AddRequest />,
      },
      {
        path: "my-donation-requests",
        element: <AllDonationRequests />,
      },
      {
        path: "donation-requests",
        element: <MyDonationRequest />,
      },

      {
        path: "all-users",
        element: <AllUsers />,
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
