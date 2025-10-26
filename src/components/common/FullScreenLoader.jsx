import React from "react";
import { motion } from "framer-motion";

const FullScreenLoader = () => {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center">
      {/* Spinner */}
      <motion.div
        className="w-16 h-16 border-4 border-t-yellow-500 border-gray-300 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      />
      <p className="mt-4 text-gray-600 text-lg">Loading, please wait...</p>
    </div>
  );
};

export default FullScreenLoader;
