import React from "react";
import { motion } from "framer-motion";
import { FiSearch } from "react-icons/fi";

const EmptyState = ({
  title = "No Results Found",
  message = "We couldn’t find what you’re looking for. Try adjusting your filters or search again.",
  icon = <FiSearch />,
  actionLabel,
  onAction,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center text-center py-20 px-6"
    >
      <div className="flex items-center justify-center w-20 h-20 rounded-full bg-blue-50 text-brand text-4xl mb-6">
        {icon}
      </div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">{title}</h2>
      <p className="text-gray-500 max-w-md mb-6 leading-relaxed">{message}</p>

      {actionLabel && onAction && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={onAction}
          className="bg-brand text-white px-5 py-2.5 rounded-full font-medium shadow-sm hover:bg-brand/90 transition"
        >
          {actionLabel}
        </motion.button>
      )}
    </motion.div>
  );
};

export default EmptyState;
