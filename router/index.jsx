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
import AuthLayout from "../src/layouts/AuthLayout";
import VerifyNotice from "../src/pages/auth/VerifyNotice";
import VerifyEmail from "../src/pages/auth/VerifyEmail";
import AddProperty from "../src/pages/AddProperty";
import AccessDenied from "../src/pages/AccessDenied";
import Auth from "../src/pages/Auth";
import ProtectedRoute from "../src/components/ProtectedRoute";

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
            element: (
              <ProtectedRoute allowedRoles={["agent", "admin", 'seller', 'estate', 'buyer']}>
                <AddProperty />
              </ProtectedRoute>
            ),
          },
          
        ],
      },
      { path: "auth/verify-notice", element: <VerifyNotice /> },

      { path: "verify-email/:token", element: <VerifyEmail /> },

      { path: "auth", element: <Auth /> },
      { path: "cart", element: <Cart /> },
      {
        path: "account",
        element: (
          <ProtectedRoute>
            <AccountPage />
          </ProtectedRoute>
        ),
      },
      { path: 'unauthorized', element: <AccessDenied /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default Router;
