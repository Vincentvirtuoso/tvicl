import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiCheckCircle,
  FiInfo,
  FiAlertCircle,
  FiXCircle,
} from "react-icons/fi";

const toastVariants = {
  success: {
    icon: <FiCheckCircle className="text-green-500" />,
    bg: "bg-green-50 border-green-400 text-green-700",
  },
  error: {
    icon: <FiXCircle className="text-red-500" />,
    bg: "bg-red-50 border-red-400 text-red-700",
  },
  warning: {
    icon: <FiAlertCircle className="text-yellow-500" />,
    bg: "bg-yellow-50 border-yellow-400 text-yellow-800",
  },
  info: {
    icon: <FiInfo className="text-blue-500" />,
    bg: "bg-blue-50 border-blue-400 text-blue-700",
  },
};

const Toast = ({ message, type = "info", onClose, duration = 2000 }) => {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => onClose?.(), duration);
    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  if (!message) return null;

  const { icon, bg } = toastVariants[type] || toastVariants.info;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className={`flex items-center gap-3 px-4 py-2 rounded-lg shadow-md border ${bg} backdrop-blur-sm`}
    >
      {icon}
      <p className="font-medium text-sm">{message}</p>
    </motion.div>
  );
};

export default Toast;
