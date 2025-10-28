import React from "react";
import Navbar from "./components/layout/Navbar";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "./components/layout/Footer";
import ScrollToTop from "./components/common/ScrollToTop";
import UnauthorizedModal from "./components/common/UnauthorizedModal";
import { useAuth } from "./hooks/useAuth";
import { useApiHealth } from "./hooks/useApiHealth";
import { motion, AnimatePresence } from "framer-motion";

const App = () => {
  const { pathname } = useLocation();
  const { user } = useAuth();

  // Check API health every 10s
  const apiStatus = useApiHealth(20000);

  const hideNavPaths = ["auth", "auth/verify-notice", "verify-email"];
  const hideNav = hideNavPaths.some((path) => pathname.startsWith(`/${path}`));

  const protectedPaths = ["/account", "/properties", "/admin"];
  const requiresAuth = protectedPaths.some((path) => pathname.startsWith(path));

  return (
    <>
      <ScrollToTop />

      {/* 🩸 API Health Status (Bottom-Right Corner) */}
      <AnimatePresence>
        {!apiStatus.ok && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.4 }}
            className="fixed bottom-4 right-4 bg-red-400/20 border border-red-600 text-red-600 px-4 py-2 rounded-lg text-sm font-medium shadow-lg z-50 flex items-center gap-2"
          >
            <span className="animate-pulse text-lg">🔴</span>
            Server Offline
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navbar + Page Layout */}
      {!hideNav && <Navbar />}
      <div className="flex flex-col min-h-screen">
        <Outlet />
        {!hideNav && <Footer logo="/images/logo.png" />}
      </div>

      {/* Unauthorized Modal */}
      {user?.isUnauthorized && requiresAuth && pathname === "/" && (
        <UnauthorizedModal countdown={6} />
      )}
    </>
  );
};

export default App;
