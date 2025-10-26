import React from "react";
import { motion } from "framer-motion";
import { NavLink, useNavigate } from "react-router-dom";
import ActionButton from "../../others/ActionButton";
import {useAuth} from "../../../hooks/useAuth";

const MobileMenu = ({
  navLinks,
  onClose,
  actions,
  // user,
  // loginMock,
  // logoutMock,
}) => {
  const navigate = useNavigate();
  const{ loading, user, logout }=useAuth();
  const handleAuth = (action) => {
    navigate("/auth", { state: { from: "mobile-menu", action } });
    onClose();
  };

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

       {user && <div className="flex flex-col gap-2 border-t border-gray-500/20 pt-4 w-full items-center">
          {actions.map((a, i) => (
            <ActionButton key={i} {...a} />
          ))}
        </div>}

        <div className="flex gap-2 sticky bottom-0 w-full">
          {user ? (
            <button
              onClick={logout}
              className="text-sm flex-1 py-2 rounded-md bg-rose-500 text-white"
            >
              { loading.logout 
                ? <div className="w-5 h-5 border-2 border-secondary border-t-transparent rounded-full animate-spin"/>
                : 'Logout'
              }
            </button>
          ) : (
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
          )}
        </div>
      </nav>
    </motion.aside>
  );
};

export default MobileMenu;
