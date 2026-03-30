import { createBrowserRouter } from "react-router-dom";
import { InstallPage } from "../pages/install-page";
import LandingPage from "../pages/landing-page";
import DashboardPage from "../pages/dashboard-page";
import ReviewDetailsPage from "../pages/review-details-page";

export const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    errorElement: <div>Something went wrong loading this page.</div>,
  },
  {
    path: "/install",
    element: <InstallPage />,
    errorElement: <div>Something went wrong loading this page.</div>,
  },
  {
    path: "/dashboard",
    element: <DashboardPage />,
    errorElement: <div>Something went wrong loading this page.</div>,
  },
  {
    path: "/reviews/:id",
    element: <ReviewDetailsPage />,
    errorElement: <div>Something went wrong loading this page.</div>,
  },
]);
