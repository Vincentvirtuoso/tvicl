import React from "react";
import { motion } from "framer-motion";

const Divider = ({
  align = "left", // "left" | "center" | "right"
  color = "bg-primary",
  width = "w-24",
  height = "h-1",
  rounded = true,
  margin = "my-4",
  gradient = false,
  animate = true,
}) => {
  const baseClasses = `
    ${width} 
    ${height} 
    ${rounded ? "rounded-full" : ""} 
    ${margin}
    ${align === "center" ? "mx-auto" : align === "right" ? "ml-auto" : ""}
    ${gradient ? "bg-gradient-to-r from-primary to-blue-400" : color}
  `;

  const MotionDiv = animate ? motion.div : "div";

  return (
    <MotionDiv
      initial={{ opacity: 0, scaleX: 0 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
      className={baseClasses.trim()}
    />
  );
};

export default Divider;
