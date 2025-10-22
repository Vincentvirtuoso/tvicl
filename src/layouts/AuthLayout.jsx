// src/layouts/AuthLayout.jsx
import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FiHome } from "react-icons/fi";
import { FaFacebookF } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import logo from "/images/logo.png";
import hero from "/images/hero.jpeg";

/**
 * Props:
 * - pageTitle (string) - optional, shown above the form
 * - pageSubtitle (string) - optional subtitle
 */
const AuthLayout = () => {
  const [header, setHeader] = useState({ pageSubtitle: "", pageTitle: "" });
  const handleHeaderChange = (data) => {
    setHeader(data);
  };
  const { pathname } = useLocation();
  const { pageTitle = "", pageSubtitle = "" | [] } = header;
  const [fade, setFade] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (typeof pageSubtitle === "string") {
      return;
    }
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentIndex((p) => (p + 1) % pageSubtitle.length);
        setFade(true);
      }, 500);
    }, 3500);

    return () => clearInterval(interval);
  }, [pageSubtitle, pageSubtitle.length]);

  return (
    <div className="h-screen grid grid-cols-1 lg:grid-cols-2 bg-white overflow-hidden">
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="relative hidden lg:flex flex-col justify-between overflow-hidden z-1 h-screen sticky top-0"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(10,20,34,0.55), rgba(10,20,34,0.55)), url(${hero})`,
            filter: "contrast(1.02) saturate(0.95)",
          }}
          aria-hidden="true"
        />

        <header className="relative z-10 p-10">
          <div className="flex items-center gap-4">
            <div
              className="w-20 h-20 flex items-center justify-center rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105 rounded-full"
              style={{
                boxShadow: "0 6px 20px rgba(0,0,0,0.45)",
              }}
            >
              <img
                src={logo}
                alt="TVCIL"
                className="w-full h-full object-contain transition-shadow duration-200"
                style={{
                  // logo glow on hover via CSS variable
                  boxShadow: "0 0 0 rgba(0,0,0,0)",
                }}
              />
            </div>

            <div>
              <h3 className="text-2xl font-semibold leading-tight text-primary">
                TVCIL
              </h3>
              <p className="text-sm text-white/90">Real Estate Made Simple</p>
            </div>
          </div>
        </header>

        <main className="relative z-10 p-10 max-w-lg">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-white leading-tight">
            Where premium properties meet trusted advice
          </h1>
          <p className="text-md text-white/90 mb-8">
            Discover curated listings, trusted agents, and investment
            opportunities tailored for discerning buyers.
          </p>

          <blockquote className="pl-4 border-l-4 border-white/30 text-white/90 italic">
            “Building Trust, One Home at a Time.”
          </blockquote>
        </main>

        <footer className="relative z-10 p-10 text-sm text-white/80">
          <div className="flex items-center gap-2 mb-4">
            <FiHome />
            <span>
              Premium listings · Verified agents · Secure transactions
            </span>
          </div>
          <div className="text-xs text-white/60">
            © {new Date().getFullYear()} TVCIL Real Estate. All rights reserved.
          </div>
        </footer>

        <div
          aria-hidden="true"
          className="absolute right-0 top-12 bottom-12 w-1"
          style={{
            background:
              "linear-gradient(180deg, rgba(250,204,21,0.0), rgba(250,204,21,0.75), rgba(250,204,21,0.0))",
            filter: "blur(6px)",
            opacity: 0.9,
          }}
        />
      </motion.div>

      {/* Right - Auth Card */}
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.5 }}
          key={pathname}
          className="flex justify-center bg-gray-50 w-full h-screen overflow-y-auto"
        >
          <div className="w-full p-6 md:p-12">
            {/* Title area (prop-driven) */}
            <div className="mb-6">
              <img
                src={logo}
                alt="TVCIL"
                className="w-24 mb-4 transition-all duration-300 hover:drop-shadow-[0_10px_20px_rgba(250,204,21,0.2)] rounded-full lg:hidden block"
              />

              <motion.div
                key={pathname}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
              >
                {pageTitle ? (
                  <h2 className="text-2xl font-semibold text-gray-800">
                    {pageTitle}
                  </h2>
                ) : (
                  <h2 className="text-2xl font-semibold text-gray-800">
                    Welcome
                  </h2>
                )}

                {pageSubtitle && (
                  <p
                    className={`text-sm text-gray-500 mt-1 max-w-md transition-opacity duration-500 ${
                      fade ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    {pageSubtitle[currentIndex]}
                  </p>
                )}
              </motion.div>
            </div>

            {/* Clean white card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100">
              {/* Social Buttons */}
              <div className="flex flex-col gap-3 mb-5">
                <button
                  type="button"
                  className="flex-1 flex items-center justify-center gap-3 p-3 rounded-lg border border-gray-200 hover:shadow-sm transition"
                  onClick={() => {
                    /* hookup social login handler */
                  }}
                >
                  <FcGoogle size={20} />
                  <span className="text-sm font-medium">
                    Continue with Google
                  </span>
                </button>

                <button
                  type="button"
                  className="flex-1 flex items-center justify-center gap-3 p-3 rounded-lg border border-gray-200 hover:shadow-sm transition"
                  onClick={() => {
                    /* hookup social login handler */
                  }}
                >
                  <FaFacebookF size={16} className="text-[#1877F2]" />
                  <span className="text-sm font-medium">
                    Continue with Facebook
                  </span>
                </button>
              </div>

              {/* Divider */}
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px bg-gray-200 flex-1" />
                <div className="text-xs text-gray-400">or</div>
                <div className="h-px bg-gray-200 flex-1" />
              </div>

              {/* Outlet renders Login/Register forms */}
              <div>
                <Outlet context={{ changeHeader: handleHeaderChange }} />
              </div>
            </div>

            {/* Footer Links under card */}
            <div className="mt-6 text-center text-sm text-gray-500">
              <nav className="flex items-center justify-center gap-4 mb-3">
                <a href="/terms" className="hover:text-gray-700">
                  Terms
                </a>
                <span className="text-gray-300">·</span>
                <a href="/privacy" className="hover:text-gray-700">
                  Privacy
                </a>
                <span className="text-gray-300">·</span>
                <a href="/help" className="hover:text-gray-700">
                  Help
                </a>
              </nav>

              <div className="text-xs text-gray-400 pb-2">
                By continuing you agree to TVCIL’s Terms and Privacy Policy.
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default AuthLayout;
