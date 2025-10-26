import React from "react";
import Navbar from "./components/layout/Navbar";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "./components/layout/Footer";
import ScrollToTop from "./components/common/ScrollToTop";
import UnauthorizedModal from "./components/common/UnauthorizedModal";
import { useAuth } from "./hooks/useAuth";

const App = () => {
  const { pathname } = useLocation();
  const { user } = useAuth();

  const hideNavPaths = ["auth", "auth/verify-notice", "verify-email",];
  const hideNav = hideNavPaths.some((path) => pathname.startsWith(`/${path}`));

  const protectedPaths = ["/account", "/properties", "/admin"]; 
  const requiresAuth = protectedPaths.some((path) => pathname.startsWith(path));


  return (
    <>
      <ScrollToTop />

      {/* Show navbar/footer normally */}
      {!hideNav && <Navbar />}
      <div className="flex flex-col">
        <Outlet />
        {!hideNav && <Footer logo="/images/logo.png" />}
      </div>

      {/* Show non-closable modal if user is unauthorized */}
      {user?.isUnauthorized && requiresAuth && pathname === '/' && <UnauthorizedModal countdown={6} />}
    </>
  );
};

export default App;
