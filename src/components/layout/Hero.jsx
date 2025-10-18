import React from "react";
import { motion } from "framer-motion";

const Hero = ({
  image = "/images/hero.jpeg",
  title,
  subtitle,
  height = "h-[280px]",
  overlay = "bg-black/50",
  children,
}) => {
  return (
    <section
      className={`relative ${height} flex items-center justify-center text-white overflow-hidden`}
    >
      {/* Background Image */}
      <motion.img
        src={image}
        alt="Hero Background"
        className="absolute inset-0 w-full h-full object-cover"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5 }}
      />

      {/* Overlay */}
      <div className={`absolute inset-0 ${overlay}`} />

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        {title && <h1 className="text-3xl md:text-4xl font-bold">{title}</h1>}
        {subtitle && <p className="text-gray-200 mt-2">{subtitle}</p>}
        {children}
      </div>
    </section>
  );
};

export default Hero;
