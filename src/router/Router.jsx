import { createBrowserRouter } from "react-router";
import Root from "../layouts/Root";
import Home from "../pages/Home/Home";
import DashboardLayout from "../layouts/DashboardLayout";
import MainDashboard from "../dashboard/MainDashboard";
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <h1>404 Not Found</h1>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
  {
    path: "dashboard",
    element: <DashboardLayout />,
    errorElement: <h1>404 Not Found</h1>,
    children: [
      {
        path: "main",
        element: <MainDashboard />,
      },
    ],
  },
]);
