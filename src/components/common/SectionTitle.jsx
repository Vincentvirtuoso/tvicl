import React from "react";
import { motion } from "framer-motion";
// import PropTypes from "prop-types";

const SectionTitle = ({
  title,
  subtitle,
  align = "center",
  color = "white",
  size = "lg",
  showLine = false,
  className = "",
}) => {
  const textColors = {
    primary: "text-primary",
    white: "text-white",
    dark: "text-gray-900",
  };

  const sizes = {
    sm: "text-xl md:text-3xl",
    md: "text-2xl md:text-4xl",
    lg: "text-4xl md:text-6xl",
    xl: "text-5xl md:text-8xl",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`w-full mb-8 text-${align} ${className}`}
    >
      <h2
        className={`font-bold ${sizes[size]} ${
          textColors[color] || color
        } leading-snug`}
      >
        {typeof title === "string" ? title : <>{title}</>}
      </h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className={`text-base md:text-lg ${
            color === "white"
              ? "text-gray-200"
              : color === "primary"
              ? "text-secondary"
              : "text-gray-500"
          } mt-4 max-w-2xl mx-auto`}
        >
          {subtitle}
        </motion.p>
      )}

      {showLine && (
        <div
          className={`mt-3 h-1 w-16 bg-primary rounded-full ${
            align === "center" ? "mx-auto" : ""
          }`}
        />
      )}
    </motion.div>
  );
};

// SectionTitle.propTypes = {
//   title: PropTypes.string.isRequired,
//   subtitle: PropTypes.string,
//   align: PropTypes.oneOf(["left", "center", "right"]),
//   color: PropTypes.string,
//   size: PropTypes.oneOf(["sm", "md", "lg", "xl"]),
//   showLine: PropTypes.bool,
//   className: PropTypes.string,
// };

export default SectionTitle;
