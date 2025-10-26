// src/pages/AccessDenied.jsx
import React from "react";
import { Link } from "react-router-dom";
import { FiLock } from "react-icons/fi";
import { motion } from "framer-motion";

const AccessDenied = () => {
  return (
    <div className="min-h-screen flex justify-center items-center px-4">
      {/* Card Container */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white shadow-2xl rounded-xl max-w-lg w-full p-10 text-center relative overflow-hidden border border-yellow-100"
      >
        {/* Floating Lock Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 150, damping: 12 }}
          className="flex justify-center mb-6"
        >
          <FiLock className="text-red-500 text-6xl" />
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-extrabold text-gray-800 mb-4"
        >
          403 - Access Denied
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-gray-600 mb-6 text-lg leading-relaxed"
        >
          Oops! You don’t have permission to access this page. This could be because:
        </motion.p>

        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-gray-700 text-left mb-6 space-y-2 max-w-md mx-auto"
        >
          <li>• Your account is not verified yet.</li>
          <li>• Your user role does not have access.</li>
          <li>• You tried to access a restricted area.</li>
        </motion.ul>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex justify-center gap-4 flex-wrap"
        >
          <Link
            to="/"
            className="px-6 py-3 bg-yellow-500 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-600 transition-all duration-300"
          >
            Go Back Home
          </Link>
          <Link
            to="/auth"
            className="px-6 py-3 bg-gray-200 text-gray-800 font-semibold rounded-lg shadow-md hover:bg-gray-300 transition-all duration-300"
          >
            Login / Verify Account
          </Link>
        </motion.div>

        {/* Decorative Floating Shadows */}
        <motion.div
          className="absolute top-[-50px] left-[-50px] w-40 h-40 bg-red-100 rounded-full filter blur-3xl opacity-30"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-[-50px] right-[-50px] w-40 h-40 bg-yellow-100 rounded-full filter blur-3xl opacity-30"
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
        />
      </motion.div>
    </div>
  );
};

export default AccessDenied;
