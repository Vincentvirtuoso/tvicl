import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {} from "react-icons/fi";
import { RiUserShared2Line, RiUserSharedLine } from "react-icons/ri";
import { FaUsersBetweenLines } from "react-icons/fa6";
import { LuRepeat } from "react-icons/lu";

const RoleSwitchNotice = ({
  title,
  message,
  actionLabel = "Switch Role",
  redirectTo = "/dashboard",
}) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 text-center shadow-sm"
    >
      <div className="flex flex-col items-center gap-3">
        <LuRepeat className="text-4xl text-yellow-600" />
        <h2 className="text-lg font-semibold text-yellow-700">{title}</h2>
        <p className="text-yellow-600 max-w-2xl mx-auto">{message}</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate(redirectTo)}
          className="mt-4 px-6 py-2 bg-yellow-600 text-white rounded-lg font-medium shadow-md hover:bg-yellow-700 transition-colors"
        >
          {actionLabel}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default RoleSwitchNotice;
