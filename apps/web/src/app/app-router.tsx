import { createBrowserRouter } from "react-router-dom";
import { InstallPage } from "../pages/install-page";
import LandingPage from "../pages/landing-page";
import DashboardPage from "../pages/dashboard-page";

export const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/install",
    element: <InstallPage />,
  },
  {
    path: "/dashboard",
    element: <DashboardPage />,
  },
]);
