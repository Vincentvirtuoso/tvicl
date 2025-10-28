import React from "react";
import { motion } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";

const Hero = ({
  title,
  subtitle,
  image = "/images/hero.jpeg",
  showScrollIndicator = true,
  ctaButton = null,
  height = "50vh",
}) => {
  const scrollToContent = () => {
    window.scrollBy({
      top: window.innerHeight * 0.5,
      behavior: "smooth",
    });
  };

  return (
    <section
      className="relative flex items-center justify-center text-center px-6 overflow-hidden"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: height,
        minHeight: "400px",
      }}
    >
      {/* Animated Overlay with Gradient */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70 backdrop-blur-[2px]"
      />

      {/* Animated Floating Particles Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-white max-w-4xl mx-auto">
        {/* Title Animation */}
        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 leading-tight"
          style={{
            textShadow: "0 4px 20px rgba(0,0,0,0.5)",
          }}
        >
          {title}
        </motion.h1>

        {/* Subtitle Animation */}
        {subtitle && (
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="text-lg md:text-xl lg:text-2xl text-gray-100 mb-8 leading-relaxed max-w-2xl mx-auto"
            style={{
              textShadow: "0 2px 10px rgba(0,0,0,0.5)",
            }}
          >
            {subtitle}
          </motion.p>
        )}

        {/* CTA Button */}
        {ctaButton && (
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          >
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 40px rgba(255,255,255,0.2)",
              }}
              whileTap={{ scale: 0.95 }}
              onClick={ctaButton.onClick}
              className="px-8 py-4 bg-white text-gray-900 font-semibold rounded-full text-lg shadow-xl hover:bg-gray-100 transition-colors"
            >
              {ctaButton.text}
            </motion.button>
          </motion.div>
        )}
      </div>

      {/* Scroll Indicator */}
      {showScrollIndicator && (
        <motion.button
          onClick={scrollToContent}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 1,
            repeat: Infinity,
            repeatType: "reverse",
            repeatDelay: 0.5,
          }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 text-white/80 hover:text-white transition-colors cursor-pointer bg-transparent border-none"
          aria-label="Scroll down"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <FaChevronDown className="text-3xl drop-shadow-lg" />
          </motion.div>
        </motion.button>
      )}

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
    </section>
  );
};

export default Hero;
