import { useState, useEffect, useCallback } from "react";
import {
  FiMenu,
  FiX,
  FiSearch,
  FiShoppingCart,
  FiUser,
  FiBell,
  FiPhone,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollTracker } from "../../hooks/useScrollTracker";
import { useCart } from "../../context/CartContext";
import { useNavigate, NavLink, useLocation } from "react-router-dom";
import { IoBriefcaseOutline } from "react-icons/io5";
import { FaHandHoldingUsd } from "react-icons/fa";
import { MdOutlineAddHomeWork } from "react-icons/md";
import MiniCartDrawer from "../../section/cart/MiniCartDrawer";
import logo from "/images/logo.png";
import { useBodyScrollLock } from "../../hooks/useBodyScrollLock";
import { useScreen } from "../../hooks/useScreen";
import { useAuth } from "../../hooks/useAuth";
import NotificationPanel from "../dropdown/navbar/NotificationPanel";
import ProfileDropdown from "../dropdown/navbar/ProfileDropdown";
import MobileMenu from "../dropdown/navbar/MobileMenu";

const MOCK_AUTH_KEY = "mock_auth_user";

const Navbar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { scrollY } = useScrollTracker();
  const { items } = useCart();
  const { isDesktop } = useScreen();
  const { user, logout, loading } = useAuth()

  // UI state
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [mockuser, setUser] = useState(null);

  const isScrolled = scrollY > 55;

  // Body lock only when mobile menu open
  useBodyScrollLock(
    (menuOpen && !isDesktop) || notifOpen || (profileMenuOpen && isDesktop)
  );

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

  useEffect(() => {
    if (searchOpen) {
      navigate("/property/list", { state: { isSearch: true } });
    }
  }, [searchOpen]);

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
  
  const handleLogout=async ()=>{
    await logout() 
    setProfileMenuOpen(false);
  }

  // close menus on Escape and outside click
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setProfileMenuOpen(false);
        setSearchOpen(false);
        setNotifOpen(false);
        console.log(user);
        
      }
    }

    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
    };
  }, [profileMenuOpen, menuOpen]);

  // ensure menu closes when switching to desktop
  useEffect(() => {
    if (isDesktop) {
      if (menuOpen) {
        setMenuOpen(false);
        setProfileMenuOpen(true);
      }
    } else {
      if (profileMenuOpen) {
        setProfileMenuOpen(false);
        setMenuOpen(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const closeDropdowns = () => {
    setMenuOpen(false);
    setProfileMenuOpen(false);
    setNotifOpen(false);
  };

  useEffect(() => {
    closeDropdowns();
  }, [pathname]);

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "Properties", to: "/property/list" },
    { label: "Sell Properties", to: "/property/add" },
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
        className="fixed top-0 left-0 w-full z-50"
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
            </div>

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
            </div>

            {/* mobile menu toggle */}
            <div className="lg:hidden">
              {menuOpen ? (
                <button
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                  className="p-2 rounded-md"
                >
                  <FiX className="text-2xl" />
                </button>
              ) : (
                <button
                  onClick={() => {
                    if (notifOpen) {
                      setNotifOpen(false);
                    }
                    setMenuOpen(true);
                  }}
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

      <div className="fixed top-20 right-4 z-[40] flex flex-col gap-3">
        {/* Overlay */}
        {menuOpen || profileMenuOpen || notifOpen ? (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black z-30"
            onClick={closeDropdowns}
          />
        ) : null}

        {/* Notifications Dropdown */}
        <AnimatePresence>{notifOpen && <NotificationPanel />}</AnimatePresence>

        {/* Profile Dropdown (Desktop Only) */}
        <AnimatePresence>
          {profileMenuOpen && isDesktop && (
            <ProfileDropdown
              user={user}
              loadingAuth={loadingAuth}
              actions={actions}
              loginMock={loginMock}
              logoutMock={logoutMock}
            />
          )}
        </AnimatePresence>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && !isDesktop && (
            <MobileMenu
              navLinks={navLinks}
              onClose={() => setMenuOpen(false)}
              actions={actions}
              user={user}
              loginMock={loginMock}
              logoutMock={logoutMock}
            />
          )}
        </AnimatePresence>
      </div>

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
