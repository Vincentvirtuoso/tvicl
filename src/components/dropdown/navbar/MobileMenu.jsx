import React from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import ActionButton from "../../others/ActionButton";

const MobileMenu = ({
  navLinks = [],
  onClose,
  handleAuth,
  logout,
  availableActions = [],
  handleRoleSwitch,
  loading,
  user,
}) => {
  // Determine if the user is logged in
  const isLoggedIn = user && !user.isUnauthorized;

  return (
    <motion.aside
      key="mobile-menu"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ type: "spring", stiffness: 120, damping: 22 }}
      className="fixed top-18 right-4 w-80 max-w-full bg-white z-40 shadow-2xl py-6 px-3 max-h-[90vh] rounded-xl"
      aria-label="Mobile menu"
    >
      <nav className="flex flex-col gap-4 items-center h-full">
        {/* Nav links */}
        <div className="flex flex-col gap-2 overflow-y-auto max-h-[calc(90vh-120px)] w-full">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              className="py-2 px-3 rounded-md text-sm hover:text-primary w-full text-center"
            >
              {label}
            </NavLink>
          ))}
        </div>

        {/* Role switch / additional actions */}
        {isLoggedIn && availableActions.length > 0 && (
          <div className="flex flex-col gap-2 border-t border-gray-500/20 pt-4 w-full items-center">
            {availableActions.map((action, i) => (
              <ActionButton
                key={i}
                {...action}
                onClick={() => handleRoleSwitch(action.role)}
                loading={loading.updateRole}
              />
            ))}
          </div>
        )}

        {/* Auth buttons / Logout */}
        <div className="flex gap-2 sticky bottom-0 w-full mt-4 pt-2 border-t border-gray-500/20">
          {isLoggedIn ? (
            <>
              <button
                onClick={() => handleAuth("login")}
                className="text-sm flex-1 py-2 rounded-md bg-primary text-black"
              >
                Sign in
              </button>
              <button
                onClick={() => handleAuth("register")}
                className="text-sm flex-1 py-2 rounded-md border"
              >
                Sign up
              </button>
            </>
          ) : (
            <button
              onClick={logout}
              disabled={loading.logout}
              className={`text-sm flex-1 py-2 rounded-md bg-red-500 text-white flex items-center justify-center ${
                loading.logout
                  ? "bg-red-500/50 cursor-not-allowed"
                  : "hover:bg-red-500/80"
              }`}
            >
              {loading.logout ? (
                <div className="w-5 h-5 border-2 border-secondary border-t-transparent rounded-full animate-spin" />
              ) : (
                "Logout"
              )}
            </button>
          )}
        </div>
      </nav>
    </motion.aside>
  );
};

export default MobileMenu;
