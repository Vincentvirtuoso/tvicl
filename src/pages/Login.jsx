// src/pages/auth/Login.jsx
import React, { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { FiMail, FiLock } from "react-icons/fi";
import { motion } from "framer-motion";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { changeHeader } = useOutletContext();
  useEffect(() => {
    changeHeader({
      pageTitle: "Welcome Back",
      pageSubtitle: [
        "Access your saved properties instantly",
        "Continue your real estate journey with ease",
        "Pick up where you left off anytime",
        "Manage your property interests in one dashboard",
        "Chat securely with agents or clients",
        "View your recent searches and alerts",
        "Edit and organize your personal account settings",
        "Track your activity and recent interactions",
        "Explore recommended listings based on your activity",
        "View new property updates in your area",
        "Stay connected with verified real estate professionals",
        "Track your communication history",
        "Monitor your recent inquiries and responses",
        "Receive property updates in real time",
        "Enjoy a seamless buying, selling, or renting experience",
        "Access exclusive real estate insights",
        "Manage your notifications and alert preferences",
        "View personalized recommendations",
        "Your trusted real estate hub awaits",
        "Let’s get you back to what matters",
      ],
    });
  }, []);
  return (
    <div>
      <form className="space-y-5">
        {/* Email */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            Email Address
          </label>
          <div className="flex items-center border border-gray-300 rounded-lg px-3">
            <FiMail className="text-gray-400" />
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full p-3 outline-none text-sm bg-transparent"
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            Password
          </label>
          <div className="flex items-center border border-gray-300 rounded-lg px-3">
            <FiLock className="text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="********"
              className="w-full p-3 outline-none text-sm bg-transparent"
            />
            <button
              type="button"
              className="text-xs text-gray-500 hover:text-gray-700"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        {/* Remember + Forgot */}
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="accent-yellow-400" />
            <span className="text-gray-600">Remember me</span>
          </label>
          <Link
            to="/forgot-password"
            className="text-gray-600 hover:text-gray-800 hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        {/* Submit Button */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          className="w-full bg-[var(--color-primary)] text-gray-800 font-semibold p-3 rounded-lg hover:bg-yellow-400 transition"
        >
          Sign In
        </motion.button>
      </form>

      {/* Footer */}
      <p className="text-sm text-center text-gray-600 mt-6">
        Don’t have an account?{" "}
        <Link
          to="/auth/sign-up"
          className="text-[var(--color-secondary)] hover:underline font-medium"
        >
          Create Account
        </Link>
      </p>
    </div>
  );
};

export default Login;
