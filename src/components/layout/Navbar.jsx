import React, { useState, useEffect, useCallback } from "react";
import {
  FiMenu,
  FiX,
  FiSearch,
  FiShoppingCart,
  FiHeart,
  FiUser,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollTracker } from "../../hooks/useScrollTracker";
import { useCart } from "../../context/CartContext";
import { useNavigate, NavLink } from "react-router-dom";
import { IoBriefcaseOutline } from "react-icons/io5";
import { FaHandHoldingUsd, FaUserTie } from "react-icons/fa";
import { MdOutlineAddHomeWork } from "react-icons/md";
import MiniCartDrawer from "../../section/cart/MiniCartDrawer";
import Divider from "../common/Divider";
import logo from "/images/logo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const { scrollY } = useScrollTracker();
  const { items } = useCart();

  const [menuOpen, setMenuOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isScrolled = scrollY > 55;

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  /** -------------------------------
   * Navigation helpers
   --------------------------------*/
  const handleNavigate = useCallback(
    (path) => {
      if (path.startsWith("+")) {
        window.location.href = `tel:${path}`;
      } else {
        navigate(path);
      }
      setMenuOpen(false);
    },
    [navigate]
  );

  /** -------------------------------
   * Navigation and Action Configs
   --------------------------------*/
  const navLinks = [
    { label: "Home", to: "/" },
    { label: "Properties", to: "/property/list" },
    { label: "About", to: "/about" },
    { label: "Contact", to: "tel:+2348102345678" },
  ];

  const actions = [
    {
      label: "Become an Agent",
      icon: <FaUserTie className="text-lg" />,
      color: "text-blue-600",
      bg: "hover:bg-blue-50",
    },
    {
      label: "Become a Buyer",
      icon: <MdOutlineAddHomeWork className="text-lg" />,
      color: "text-emerald-600",
      bg: "hover:bg-emerald-50",
    },
    {
      label: "Switch to Agent Mode",
      icon: <IoBriefcaseOutline className="text-lg" />,
      color: "text-indigo-600",
      bg: "hover:bg-indigo-50",
    },
    {
      label: "Switch to Buyer Mode",
      icon: <FaHandHoldingUsd className="text-lg" />,
      color: "text-amber-600",
      bg: "hover:bg-amber-50",
    },
  ];

  /** -------------------------------
   * Reusable Subcomponents
   --------------------------------*/
  const NavLinkButton = ({ label, to }) => (
    <motion.button
      whileHover={{ x: 4 }}
      transition={{ type: "tween", duration: 0.2 }}
      onClick={() => handleNavigate(to)}
      className="hover:text-primary transition-colors duration-200"
    >
      {label}
    </motion.button>
  );

  const ActionButton = ({ label, icon, color, bg }) => (
    <motion.button
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.97 }}
      className={`flex items-center gap-2 w-[240px] justify-center py-2 px-4 border text-sm border-gray-200 rounded-xl shadow-sm font-medium text-gray-700 bg-white ${bg}`}
    >
      <span className={color}>{icon}</span>
      {label}
    </motion.button>
  );

  /** -------------------------------
   * Render
   --------------------------------*/
  return (
    <>
      {/* Main Navbar */}
      <motion.nav
        initial={false}
        animate={{
          backgroundColor: isScrolled ? "#fff" : "rgba(255,255,255,0)",
          boxShadow: isScrolled
            ? "0 2px 10px rgba(0,0,0,0.1)"
            : "0 0 0 rgba(0,0,0,0)",
        }}
        transition={{ duration: 0.3 }}
        className={`fixed top-0 left-0 w-full flex items-center justify-between px-5 lg:px-10 py-3 z-50 ${
          isScrolled ? "text-black" : "text-white"
        }`}
      >
        {/* Logo */}
        <div
          className="flex items-center cursor-pointer gap-2"
          onClick={() => navigate("/")}
        >
          <img src={logo} alt="TVICL" className="w-8 h-8 lg:w-10 lg:h-10" />
          <span className="font-bold text-lg">TVICL</span>
        </div>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map(({ label, to }) => (
            <NavLinkButton key={to} label={label} to={to} />
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-black/10 cursor-pointer"
          >
            <FiSearch className="text-xl" />
          </motion.div>

          <motion.div
            whileTap={{ scale: 0.9 }}
            className="relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-black/10 cursor-pointer"
            onClick={() => setDrawerOpen(true)}
          >
            <span className="absolute right-1 top-1 h-4 w-4 bg-primary text-[10px] text-black rounded-full flex items-center justify-center font-bold">
              {items?.length || 0}
            </span>
            <FiShoppingCart className="text-xl" />
          </motion.div>

          <motion.div
            whileTap={{ scale: 0.9 }}
            className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-black/10 cursor-pointer"
            onClick={() => navigate("/profile")}
          >
            <FiUser className="text-xl" />
          </motion.div>

          {/* Mobile Menu Icon */}
          <div className="lg:hidden flex items-center">
            {menuOpen ? (
              <FiX
                className="text-2xl cursor-pointer"
                onClick={() => setMenuOpen(false)}
              />
            ) : (
              <FiMenu
                className="text-2xl cursor-pointer"
                onClick={() => setMenuOpen(true)}
              />
            )}
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "105%" }}
            transition={{ type: "spring", stiffness: 100, damping: 18 }}
            className="fixed top-18 right-2 w-70 max-h-[70vh] bg-white text-secondary shadow-xl shadow-gray-500/30 z-40 flex flex-col p-6 overflow-hidden rounded-2xl"
          >
            {/* Nav Links */}
            <div className="flex flex-col gap-6 text-lg text-gray-700 overflow-y-auto items-center">
              {navLinks.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                    `${isActive ? "text-primary font-medium" : ""} text-[15px]`
                  }
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </NavLink>
              ))}
            </div>

            <Divider align="center" margin="my-8" />

            {/* Quick Links */}
            <div className="flex flex-col gap-4 text-sm">
              <button onClick={() => handleNavigate("/property/wishlist")}>
                <FiHeart className="inline mr-2" /> Saved Properties
              </button>
              <button onClick={() => handleNavigate("/profile")}>
                <FiUser className="inline mr-2" /> My Account
              </button>
            </div>

            <Divider align="center" margin="my-8" />

            {/* Role Switch / CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center gap-2 w-full"
            >
              {actions.map((action, i) => (
                <ActionButton key={i} {...action} />
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mini Cart Drawer */}
      <MiniCartDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        cart={items}
      />
    </>
  );
};

export default Navbar;
