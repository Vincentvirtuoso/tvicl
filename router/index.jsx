import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../src/App";
import Home from "../src/pages/Home";
import PropertyLayout from "../src/layouts/PropertyLayout";
import PropertyDetail from "../src/pages/PropertyDetail";
import Cart from "../src/pages/Cart";
import PropertyList from "../src/pages/PropertyList";
import NotFound from "../src/pages/NotFound";
import WishList from "../src/pages/WishList";
import AccountPage from "../src/pages/Account";
import VerifyNotice from "../src/pages/auth/VerifyNotice";
import VerifyEmail from "../src/pages/auth/VerifyEmail";
import AddProperty from "../src/pages/AddProperty";
import AccessDenied from "../src/pages/AccessDenied";
import BecomeAgentOrAgency from "../src/pages/BecomeAgentOrAgency";
import InteriorDecoration from "../src/pages/InteriorDecoration";
import Auth from "../src/pages/Auth";
import ProtectedRoute from "../src/components/ProtectedRoute";
import PublicRoute from "../src/components/PublicRoute";
import Dashboard from "../src/pages/Dashboard";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "property",
        element: <PropertyLayout />,
        children: [
          { index: true, element: <Navigate to="list" replace /> },
          { path: "list", element: <PropertyList /> },
          { path: ":id/details", element: <PropertyDetail /> },
          {
            path: "wishlist",
            element: (
              <ProtectedRoute>
                <WishList />
              </ProtectedRoute>
            ),
          },
          {
            path: "add",
            element: <AddProperty />,
          },
        ],
      },
      { path: "become-agent-or-agency", element: <BecomeAgentOrAgency /> },
      { path: "interior-decoration", element: <InteriorDecoration /> },
      { path: "auth/verify-notice", element: <VerifyNotice /> },

      { path: "verify-email/:token", element: <VerifyEmail /> },

      {
        path: "auth",
        element: (
          <PublicRoute>
            <Auth />
          </PublicRoute>
        ),
      },
      { path: "cart", element: <Cart /> },
      {
        path: "account",
        element: (
          <ProtectedRoute>
            <AccountPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "admin/dashboard",
        element: (
          <ProtectedRoute allowedRoles={["admin"]}>
            <Dashboard role="admin" />
          </ProtectedRoute>
        ),
      },
      {
        path: "agent/dashboard",
        element: (
          <ProtectedRoute allowedRoles={["agent"]}>
            <Dashboard role="agent" />
          </ProtectedRoute>
        ),
      },
      {
        path: "estate/dashboard",
        element: (
          <ProtectedRoute allowedRoles={["estate"]}>
            <Dashboard role="estate" />
          </ProtectedRoute>
        ),
      },
      { path: "unauthorized", element: <AccessDenied /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default Router;
