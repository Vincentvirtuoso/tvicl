import { useState, useEffect, useCallback } from "react";
import {
  FiMenu,
  FiX,
  FiSearch,
  FiShoppingCart,
  FiHeart,
  FiUser,
  FiSun,
  FiMoon,
  FiBell,
  FiPhone,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollTracker } from "../../hooks/useScrollTracker";
import { useCart } from "../../context/CartContext";
import { useNavigate, NavLink } from "react-router-dom";
import { IoBriefcaseOutline } from "react-icons/io5";
import { FaHandHoldingUsd } from "react-icons/fa";
import { MdOutlineAddHomeWork } from "react-icons/md";
import MiniCartDrawer from "../../section/cart/MiniCartDrawer";
import Divider from "../common/Divider";
import logo from "/images/logo.png";
import { useBodyScrollLock } from "../../hooks/useBodyScrollLock";
import { useScreen } from "../../hooks/useScreen";
import { Loader } from "../common/Loader"; // named export

const MOCK_AUTH_KEY = "mock_auth_user";
const THEME_KEY = "app_theme"; // "light" | "dark"

const primary = "text-[#25aff3]";

const Navbar = () => {
  const navigate = useNavigate();
  const { scrollY } = useScrollTracker();
  const { items } = useCart();
  const { isDesktop } = useScreen();

  // UI state
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [user, setUser] = useState(null);

  const isScrolled = scrollY > 55;

  // Body lock only when mobile menu open
  useBodyScrollLock(menuOpen && !isDesktop);

  // Mock auth load from localStorage (persisted)
  useEffect(() => {
    setLoadingAuth(true);
    const t = setTimeout(() => {
      const raw = localStorage.getItem(MOCK_AUTH_KEY);
      if (raw) {
        try {
          setUser(JSON.parse(raw));
        } catch (e) {
          setUser(null);
          console.log(e);
        }
      } else {
        setUser(null);
      }
      setLoadingAuth(false);
    }, 200); // small shimmer to avoid flicker
    return () => clearTimeout(t);
  }, []);

  const loginMock = useCallback(() => {
    const fakeUser = {
      id: "u_123",
      name: "Jane Doe",
      email: "jane@example.com",
      avatar: null,
      role: "agent",
    };
    localStorage.setItem(MOCK_AUTH_KEY, JSON.stringify(fakeUser));
    setUser(fakeUser);
    setProfileMenuOpen(false);
  }, []);

  const logoutMock = useCallback(() => {
    localStorage.removeItem(MOCK_AUTH_KEY);
    setUser(null);
    setProfileMenuOpen(false);
  }, []);

  // close menus on Escape and outside click
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setProfileMenuOpen(false);
        setSearchOpen(false);
        setNotifOpen(false);
      }
    }

    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
    };
  }, [profileMenuOpen, menuOpen]);

  // ensure menu closes when switching to desktop
  useEffect(() => {
    if (isDesktop) setMenuOpen(false);
  }, [isDesktop]);

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

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "Properties", to: "/property/list" },
    { label: "Saved Properties", to: "/property/wishlist" },
    { label: "Interior Decoration", to: "/interior-decoration" },
  ];

  const actions = [
    {
      label: "Switch to Estate Mode",
      icon: <MdOutlineAddHomeWork className="text-lg" />,
      color: "text-emerald-600",
      bg: "hover:bg-emerald-50 hover:shadow-emerald-600",
    },
    {
      label: "Switch to Agent Mode",
      icon: <IoBriefcaseOutline className="text-lg" />,
      color: "text-indigo-600",
      bg: "hover:bg-indigo-50 hover:shadow-indigo-600",
    },
    {
      label: "Switch to Buyer Mode",
      icon: <FaHandHoldingUsd className="text-lg" />,
      color: "text-amber-600",
      bg: "hover:bg-amber-50 hover:shadow-amber-600",
    },
  ];

  /** Subcomponents */
  const NavLinkButton = ({ label, to }) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `text-sm px-2 py-1 rounded-md transition-colors duration-150 ${
          isActive && `font-semibold text-primary`
        } hover:brightness-95`
      }
      onClick={() => setMenuOpen(false)}
    >
      {label}
    </NavLink>
  );

  const ActionButton = ({ label, icon, color, bg }) => (
    <motion.button
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.97 }}
      className={`flex items-center gap-2 w-[240px] justify-center py-2 px-4 border text-sm border-gray-200 rounded-xl shadow-sm font-medium text-gray-700 bg-white ${bg}`}
    >
      {" "}
      <span className={color}>{icon}</span> {label}{" "}
    </motion.button>
  );

  /** Render */
  return (
    <>
      <motion.nav
        initial={false}
        animate={{
          backgroundColor: isScrolled ? "#ffffff" : "rgba(255,255,255,0)",
          boxShadow: isScrolled
            ? "0 6px 18px rgba(3,12,36,0.08)"
            : "0 0 0 rgba(0,0,0,0)",
        }}
        transition={{ duration: 0.25 }}
        className={`fixed top-0 left-0 w-full z-50 backdrop-blur-sm ${
          isScrolled ? "border-b" : ""
        }`}
      >
        <div
          className={`max-w-7xl mx-auto flex items-center justify-between px-4 lg:px-8 py-3 transition-colors duration-200 ${
            isScrolled ? "text-black" : "text-white"
          }`}
        >
          {/* left: logo */}
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => navigate("/")}
            aria-label="Go home"
          >
            <img
              src={logo}
              alt="TVICL"
              className="w-9 h-9 lg:w-12 lg:h-12 rounded-full"
            />
            <div className="hidden sm:block">
              <div className="font-bold text-lg leading-none">TVICL</div>
              <div className="text-[11px] text-gray-500 dark:text-gray-400">
                Tee & Vee Integrated Company Limited
              </div>
            </div>
          </div>

          {/* center: nav links (desktop) */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((n) => (
              <NavLinkButton key={n.to} {...n} />
            ))}
          </div>

          {/* right: actions */}
          <div className="flex items-center gap-3">
            {/* search */}
            <button
              onClick={() => setSearchOpen((s) => !s)}
              aria-label="Search"
              className="relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-black/5 transition-colors"
            >
              <FiSearch className="text-lg" />
            </button>

            {/* cart */}
            <button
              onClick={() => setDrawerOpen(true)}
              aria-label="Cart"
              className="relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-black/5 transition-colors"
            >
              <FiShoppingCart className="text-lg" />
              <span className="absolute top-1 right-1 bg-primary text-[10px] text-black rounded-full w-4 h-4 flex items-center justify-center">
                {items?.length || 0}
              </span>
            </button>

            {/* notifications */}
            <div className="relative">
              <button
                onClick={() => {
                  if (menuOpen) {
                    setMenuOpen(false);
                  }
                  setNotifOpen((s) => !s);
                }}
                aria-label="Notifications"
                className="relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-black/5 transition-colors"
              >
                <FiBell className="text-lg" />
                <span className="absolute top-1 right-1 bg-rose-500 text-[10px] text-white rounded-full w-4 h-4 flex items-center justify-center">
                  4
                </span>
              </button>
              <AnimatePresence>
                {notifOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -6 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98, y: -6 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-4 w-72 dark:bg-white bg-neutral-900 shadow-lg rounded-lg p-3 z-40"
                  >
                    <div className="text-sm dark:text-gray-900 text-gray-200">
                      You have 4 new notifications
                    </div>
                    <Divider margin="my-2" />
                    <div className="flex flex-col gap-4 text-gray-900">
                      <button className="text-left text-sm">
                        New message from the Admin
                      </button>
                      <button className="text-left text-sm">
                        Payment for Skyline property will be due tomorrow
                      </button>
                      <button className="text-left text-sm">
                        Property inquiry: Here's the feedback
                      </button>
                      <button className="text-left text-sm">
                        An agent sent a request to join your estate
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* contact */}
            <button
              onClick={() => handleNavigate("+2349087699874")}
              aria-label="Contact site owner"
              className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-black/5 transition-colors"
            >
              <FiPhone />
            </button>

            {/* profile */}
            <div className="relative">
              <button
                onClick={() => {
                  if (!isDesktop) {
                    navigate("/account");
                  } else {
                    setProfileMenuOpen((s) => !s);
                  }
                }}
                aria-haspopup="true"
                aria-expanded={profileMenuOpen}
                className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-black/5 transition-colors"
              >
                <FiUser className="text-lg" />
              </button>

              {/* profile dropdown (desktop only) */}
              <AnimatePresence>
                {profileMenuOpen && isDesktop && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-14 -right-2 mt-2 w-80 bg-white rounded-lg shadow-lg p-4 z-50 text-gray-600"
                  >
                    {/* auth loading */}
                    {loadingAuth ? (
                      <div className="flex items-center justify-center py-6">
                        <Loader variant="spinner" size={36} label="" />
                      </div>
                    ) : user ? (
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gray-100  flex items-center justify-center text-sm font-medium text-gray-600">
                            {user.name
                              ?.split(" ")
                              .map((s) => s[0])
                              .slice(0, 2)
                              .join("")}
                          </div>
                          <div>
                            <div className="font-semibold">{user.name}</div>
                            <div className="text-xs text-gray-500">
                              {user.email}
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col gap-2 pt-4 border-t border-gray-500/20">
                          <button
                            onClick={() => navigate("/account")}
                            className="text-left text-sm"
                          >
                            My profile
                          </button>
                          <button
                            onClick={() => navigate("/account/settings")}
                            className="text-left text-sm"
                          >
                            Account settings
                          </button>
                          <button
                            onClick={() => navigate("/property/wishlist")}
                            className="text-left text-sm"
                          >
                            Saved properties
                          </button>
                        </div>

                        <div className="flex flex-col items-center gap-2 pt-4 border-t border-gray-500/20">
                          {actions.map((a, i) => (
                            <ActionButton key={i} {...a} />
                          ))}
                        </div>

                        <Divider margin="my-2" width="w-full" />

                        <div className="flex items-center gap-2">
                          <button
                            onClick={logoutMock}
                            className="flex-1 py-2 rounded-md bg-rose-500 text-white text-sm"
                          >
                            Sign out
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-3">
                        <div className="text-sm">You are not signed in</div>
                        <div className="flex gap-2">
                          <button
                            onClick={loginMock}
                            className="flex-1 py-2 rounded-md bg-[#25aff3] text-black text-sm"
                          >
                            Sign in (mock)
                          </button>
                          <button
                            onClick={() => navigate("/signup")}
                            className="flex-1 py-2 rounded-md border border-gray-200 text-sm"
                          >
                            Sign up
                          </button>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* mobile menu toggle */}
            <div className="lg:hidden">
              {menuOpen ? (
                <button
                  onClick={() => {
                    if (notifOpen) {
                      setNotifOpen(false);
                    }
                    setMenuOpen(false);
                  }}
                  aria-label="Close menu"
                  className="p-2 rounded-md"
                >
                  <FiX className="text-2xl" />
                </button>
              ) : (
                <button
                  onClick={() => setMenuOpen(true)}
                  aria-label="Open menu"
                  className="p-2 rounded-md z-1"
                >
                  <FiMenu className="text-2xl" />
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "105%" }}
            transition={{ type: "spring", stiffness: 120, damping: 22 }}
            className="fixed top-16 right-2 w-80 max-w-full bg-white z-40 shadow-2xl py-6 px-3 max-h-[90vh] rounded-xl"
            aria-label="Mobile menu"
          >
            <nav className="flex flex-col gap-4 items-center">
              <div className="flex flex-col gap-2 overflow-y-auto max-h-[calc(90vh-50px)] items-center">
                {navLinks.map((n) => (
                  <NavLink
                    key={n.to}
                    to={n.to}
                    onClick={() => setMenuOpen(false)}
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
                        setMenuOpen(false);
                      }}
                      className="flex-1 py-2 rounded-md bg-primary text-black"
                    >
                      Sign in
                    </button>
                    <button
                      onClick={() => {
                        navigate("/signup");
                        setMenuOpen(false);
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
