import React from "react";
import { motion } from "framer-motion";
import { NavLink, useNavigate } from "react-router-dom";
import ActionButton from "../../others/ActionButton";

const MobileMenu = ({
  navLinks,
  onClose,
  actions,
  user,
  loginMock,
  logoutMock,
}) => {
  const navigate = useNavigate();
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
      <nav className="flex flex-col gap-4 items-center">
        <div className="flex flex-col gap-2 overflow-y-auto max-h-[calc(90vh-50px)] items-center">
          {navLinks.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              onClick={onClose}
              className="py-2 px-3 rounded-md text-sm hover:text-primary"
            >
              {n.label}
            </NavLink>
          ))}
        </div>

        <div className="flex flex-col gap-2 border-t border-gray-500/20 pt-4 w-full items-center">
          {actions.map((a, i) => (
            <ActionButton key={i} {...a} />
          ))}
        </div>

        <div className="flex gap-2 sticky bottom-0 w-full">
          {user ? (
            <button
              onClick={logoutMock}
              className="flex-1 py-2 rounded-md bg-rose-500 text-white"
            >
              Sign out
            </button>
          ) : (
            <>
              <button
                onClick={() => {
                  loginMock();
                  onClose();
                }}
                className="flex-1 py-2 rounded-md bg-primary text-black"
              >
                Sign in
              </button>
              <button
                onClick={() => {
                  navigate("/signup");
                  onClose();
                }}
                className="flex-1 py-2 rounded-md border"
              >
                Sign up
              </button>
            </>
          )}
        </div>
      </nav>
    </motion.aside>
  );
};

export default MobileMenu;
