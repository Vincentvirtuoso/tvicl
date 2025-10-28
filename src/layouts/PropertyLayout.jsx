import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Hero from "../components/layout/Hero";

const PropertyLayout = () => {
  const location = useLocation();

  // Hero configuration based on route
  const getHeroTitle = () => {
    if (location.pathname.includes("details")) return "Property Details";
    if (location.pathname.includes("compare")) return "Compare Properties";
    if (location.pathname.includes("wishlist")) return "Your Saved Listings";
    return "Explore Our Properties";
  };

  const getHeroSubtitle = () => {
    if (location.pathname.includes("details"))
      return "Discover every detail about this beautiful home.";
    if (location.pathname.includes("compare"))
      return "Analyze your favorite properties side by side.";
    if (location.pathname.includes("wishlist"))
      return "View and manage your saved properties.";
    return "Find your dream property from our curated listings.";
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Hero Section */}
      <Hero title={getHeroTitle()} subtitle={getHeroSubtitle()} />

      {/* Content Wrapper */}
      <motion.main
        className="flex-1 w-full max-w-7xl mx-auto px-5 md:px-10 py-7"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <Outlet />
      </motion.main>
    </div>
  );
};

export default PropertyLayout;
