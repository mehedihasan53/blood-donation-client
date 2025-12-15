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
import MyDonationRequest from "../Donation/MyDonationRequest";
import AllDonationRequests from "../Donation/AllDonationRequests";
import Dashboard from "../dashboard/dashboard/Dashboard";
import Profile from "../dashboard/dashboard/Profile";
import PendingRequests from "../components/PendingRequests";
import DonationRequestDetails from "../pages/DonationRequestDetails";
import EditDonationRequest from "../dashboard/EditDonationRequest";

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
        path: "donation-request/:id",
        element: (
          <PrivateRoute>
            <DonationRequestDetails />
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
      {
        path: "/Pending-requests",
        element: <PendingRequests />,
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
        element: <Dashboard />,
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
        element: <Profile />,
      },
      {
        path: "edit-request/:id",
        element: <EditDonationRequest />,
      },
    ],
  },
]);
