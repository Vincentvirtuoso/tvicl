import React from "react";
import { motion } from "framer-motion";
import { FiHome, FiMapPin, FiArrowLeft } from "react-icons/fi";
import { Link } from "react-router-dom";
import { LuMapPinOff } from "react-icons/lu";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-slate-300">
      {/* Floating Background Graphic */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 0.12, scale: 1 }}
        transition={{ duration: 1.2 }}
        className="absolute top-0 left-0 w-full h-full flex items-center justify-center"
      >
        <LuMapPinOff className="text-[20rem] text-brand/20" />
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 text-center max-w-lg"
      >
        <h1 className="text-[6rem] sm:text-[8rem] font-extrabold text-brand leading-none mb-2">
          404
        </h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Oops! Page Not Found
        </h2>
        <p className="text-gray-500 leading-relaxed mb-8">
          The page you’re looking for might have been moved, deleted, or may not
          exist. Don’t worry — your next dream property is just a click away.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-primary px-6 py-2.5 rounded-full font-medium shadow hover:bg-primary/80 transition"
          >
            <FiHome className="text-lg" />
            Back to Home
          </Link>

          <Link
            to="/property/list"
            className="inline-flex items-center gap-2 border border-secondary text-secondary px-6 py-2.5 rounded-full font-medium hover:bg-secondary hover:text-white transition"
          >
            <FiMapPin className="text-lg" />
            Explore Properties
          </Link>
        </div>
      </motion.div>

      {/* Animated Illustration */}
      {/* <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.7 }}
        className="mt-16 relative z-10 w-full max-w-md"
      >
        <img
          src="https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1000&q=80"
          alt="Modern home with lights at dusk"
          className="w-full object-cover"
        />
      </motion.div> */}

      {/* Back Link */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-10 text-gray-500 flex items-center gap-2 cursor-pointer hover:text-gray-700 transition z-1"
        onClick={() => window.history.back()}
      >
        <FiArrowLeft />
        Go Back
      </motion.div>
    </div>
  );
};

export default NotFound;
