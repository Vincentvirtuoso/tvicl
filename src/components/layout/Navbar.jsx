import { useState, useEffect } from "react";
import {
  FiMenu,
  FiX,
  FiSearch,
  FiShoppingCart,
  FiUser,
  FiBell,
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
import { useToast } from "../../context/ToastManager";

const ROLE_ACTIONS = [
  {
    role: "estate",
    label: "Switch to Estate Mode",
    icon: <MdOutlineAddHomeWork className="text-lg" />,
    color: "text-emerald-600",
    bg: "hover:bg-emerald-50 hover:shadow-emerald-600",
  },
  {
    role: "agent",
    label: "Switch to Agent Mode",
    icon: <IoBriefcaseOutline className="text-lg" />,
    color: "text-indigo-600",
    bg: "hover:bg-indigo-50 hover:shadow-indigo-600",
  },
  {
    role: "buyer",
    label: "Switch to Buyer Mode",
    icon: <FaHandHoldingUsd className="text-lg" />,
    color: "text-amber-600",
    bg: "hover:bg-amber-50 hover:shadow-amber-600",
  },
];

const Navbar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { scrollY } = useScrollTracker();
  const { items } = useCart();
  const { isDesktop } = useScreen();
  const { user, logout, updateRole, loading } = useAuth();
  const { addToast } = useToast();

  // UI state
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  const requiresSolidBg = [
    "/unauthorized",
    "/become-agent-or-agency",
    "/interior-decoration",
  ];

  const isScrolled = scrollY > 55;
  const isSolid = requiresSolidBg.includes(pathname);

  const availableActions = user
    ? ROLE_ACTIONS.filter((a) => {
        // const hasRole = user.roles?.includes(a.role);
        const isActive = user.activeRole === a.role;
        return !isActive;
      })
    : [];

  // Handle switching or adding a role
  const handleRoleSwitch = async (role) => {
    try {
      if (!user.roles.includes(role)) {
        navigate("/become-agent-or-agency", { state: { role } });
      } else {
        await updateRole({
          role: user.activeRole,
          makeActive: role,
        });
        addToast(
          `You are now viewing as ${role === "buyer" ? "a" : "an"} ${role}`,
          "info",
          {
            duration: 4000,
          }
        );

        navigate(role === "buyer" ? "/" : `/${role}/dashboard`);
      }
    } catch (err) {
      console.error(err);
      addToast(err.response.data.message, "error", {
        duration: 6000,
      });
    }
  };

  // Body lock only when mobile menu open
  useBodyScrollLock(
    (menuOpen && !isDesktop) || notifOpen || (profileMenuOpen && isDesktop)
  );

  useEffect(() => {
    if (searchOpen) {
      navigate("/property/list", { state: { isSearch: true } });
    }
  }, [searchOpen]);

  const handleAuth = (action, onClose) => {
    navigate("/auth", { state: { from: "mobile-menu", action } });
    onClose();
  };

  const handleLogout = async () => {
    await logout();
    setProfileMenuOpen(false);
  };

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

  const closeDropdowns = () => {
    setMenuOpen(false);
    setProfileMenuOpen(false);
    setNotifOpen(false);
  };

  useEffect(() => {
    closeDropdowns();
  }, [pathname, user]);

  const extraLinks = [
    { label: "Interior Decoration", to: "/interior-decoration" },
  ];
  const allUserLinks = [
    { label: "Home", to: "/" },
    { label: "Properties", to: "/property/list" },
  ];

  // role-based dashboard links
  const roleLinks = {
    admin: [
      { label: "Dashboard", to: "/admin/dashboard" },
      { label: "Analytics", to: "/analytics" },
    ],
    agent: [
      { label: "Dashboard", to: "/agent/dashboard" },
      { label: "My Listings", to: "/agent/listings" },
      { label: "Sales", to: "/agent/sales" },
    ],
    estate: [
      { label: "Dashboard", to: "/estate/dashboard" },
      { label: "My Properties", to: "/estate/properties" },
      { label: "Maintenance", to: "/estate/maintenance" },
    ],
    buyer: [...allUserLinks, { label: "My Investments", to: "/investments" }],
  };

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

  // merge role links if user exists
  const mergedNavLinks = user
    ? [...(roleLinks[user.activeRole] || []), ...extraLinks]
    : [...allUserLinks, ...extraLinks];

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
          backgroundColor: isSolid
            ? "#fff"
            : isScrolled
            ? "#ffffff"
            : "rgba(255,255,255,0)",
          boxShadow: isSolid
            ? "0 6px 18px rgba(3,12,36,0.08)"
            : isScrolled
            ? "0 6px 18px rgba(3,12,36,0.08)"
            : "0 0 0 rgba(0,0,0,0)",
        }}
        transition={{ duration: 0.25 }}
        className="fixed top-0 left-0 w-full z-50"
      >
        <div
          className={`max-w-7xl mx-auto flex items-center justify-between px-4 lg:px-8 py-3 transition-colors duration-200 ${
            isSolid
              ? "text-secondary"
              : isScrolled
              ? "text-black"
              : "text-white"
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
            {mergedNavLinks.map((n) => (
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
                <span className="absolute top-1 right-1 bg-red-500 text-[10px] text-white rounded-full w-4 h-4 flex items-center justify-center">
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
              actions={actions}
              availableActions={availableActions}
              handleRoleSwitch={handleRoleSwitch}
            />
          )}
        </AnimatePresence>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && !isDesktop && (
            <MobileMenu
              navLinks={mergedNavLinks}
              onClose={() => setMenuOpen(false)}
              actions={actions}
              user={user}
              loading={loading}
              logout={handleLogout}
              availableActions={availableActions}
              handleRoleSwitch={handleRoleSwitch}
              handleAuth={handleAuth}
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
