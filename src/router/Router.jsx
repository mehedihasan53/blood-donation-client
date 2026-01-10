import { createBrowserRouter } from "react-router-dom";
import Root from "../layouts/Root";
import Home from "../pages/Home/Home";
import DashboardLayout from "../layouts/DashboardLayout";
import DonationFAQ from "../pages/DonationFAQ";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import TermsOfService from "../pages/TermsOfService";
import AboutOurMission from "../pages/AboutOurMission";
import Services from "../pages/Services";
import Statistics from "../pages/Statistics";
import Blogs from "../pages/Blogs";
import BlogDetail from "../pages/BlogDetail";
import Testimonials from "../pages/Testimonials";

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
import VolunteerDonationRequests from "../dashboard/VolunteerDonationRequests";
import ErrorPage from "../components/shared/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage></ErrorPage>,
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
        path: "search",
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
        path: "donate",
        element: (
          <PrivateRoute>
            <Donate />
          </PrivateRoute>
        ),
      },
      {
        path: "payment-success",
        element: (
          <PrivateRoute>
            <PaymentSuccess />
          </PrivateRoute>
        ),
      },
      {
        path: "payment-cancel",
        element: <CancelPayment />,
      },
      {
        path: "pending-requests",
        element: <PendingRequests />,
      },
      {
        path: "donation-faq",
        element: <DonationFAQ />,
      },
      {
        path: "privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "terms-of-service",
        element: <TermsOfService />,
      },
      {
        path: "about-our-mission",
        element: <AboutOurMission />,
      },
      {
        path: "services",
        element: <Services />,
      },
      {
        path: "statistics",
        element: <Statistics />,
      },
      {
        path: "blogs",
        element: <Blogs />,
      },
      {
        path: "blogs/:id",
        element: <BlogDetail />,
      },
      {
        path: "testimonials",
        element: <Testimonials />,
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
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
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
      {
        path: "all-blood-donation-request-volunteer",
        element: <VolunteerDonationRequests />,
      },
    ],
  },
]);
