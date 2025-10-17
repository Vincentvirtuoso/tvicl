import React from "react";
import { motion } from "framer-motion";

const InfoCard = ({
  icon: Icon, // React component or image URL
  label = "",
  value = "",
  direction = "row", // 'row' | 'column'
  align = "start", // 'start' | 'center' | 'end'
  bordered = false,
  size = "md", // 'sm' | 'md' | 'lg'
  color = "secondary",
  bg = "white",
  shadow = false,
  onClick,
  hoverable = false,
  className = "",
}) => {
  const sizeClasses = {
    sm: "text-sm p-2 gap-2",
    md: "text-base p-3 gap-3",
    lg: "text-lg p-4 gap-4",
  };

  const colorClasses = {
    primary: "text-primary",
    secondary: "text-secondary",
    accent: "text-accent",
    dark: "text-gray-800",
    light: "text-gray-500",
  };

  return (
    <motion.div
      onClick={onClick}
      whileHover={hoverable ? { scale: 1.03 } : {}}
      whileTap={hoverable ? { scale: 0.98 } : {}}
      className={`flex ${direction === "column" ? "flex-col" : "flex-row"} 
        items-${align} justify-${align}
        rounded-xl ${shadow ? "shadow-md" : ""} 
        ${bordered ? "border border-gray-200" : ""} 
        bg-${bg} ${
        sizeClasses[size]
      } cursor-pointer transition-all duration-300 ${className}`}
    >
      {/* Icon / Image */}
      {Icon &&
        (typeof Icon === "string" ? (
          <img
            src={Icon}
            alt={label}
            className={`w-8 h-8 object-contain ${colorClasses[color]}`}
          />
        ) : (
          <Icon className={`w-6 h-6 ${colorClasses[color]}`} />
        ))}

      {/* Text Section */}
      <div
        className={`flex flex-col ${
          align === "center" ? "text-center" : "text-left"
        }`}
      >
        {label && (
          <p className={`text-gray-500 capitalize leading-tight`}>{label}</p>
        )}
        <p
          className={`font-semibold text-gray-900 ${
            size === "lg" ? "text-2xl" : size === "md" ? "text-xl" : "text-base"
          }`}
        >
          {value}
        </p>
      </div>
    </motion.div>
  );
};

export default InfoCard;
