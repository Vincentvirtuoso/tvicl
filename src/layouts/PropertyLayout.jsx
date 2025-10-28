import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Hero from "../components/layout/Hero";

const PropertyLayout = () => {
  const location = useLocation();

  // Dynamic hero title based on route
  const getHeroTitle = () => {
    if (location.pathname.includes("details")) return "Property Details";
    if (location.pathname.includes("compare")) return "Compare Properties";
    if (location.pathname.includes("wishlist")) return "Your Saved Listings";
    if (location.pathname.includes("add")) return "Add a New Property";
    if (location.pathname.includes("sell")) return "Sell Your Property";
    if (location.pathname.includes("agents")) return "Meet Our Agents";
    if (location.pathname.includes("admin")) return "Admin Dashboard";
    if (location.pathname.includes("dashboard")) return "Your Dashboard";
    if (location.pathname.includes("contact")) return "Get in Touch";
    if (location.pathname.includes("about")) return "About Our Platform";
    if (location.pathname.includes("login")) return "Welcome Back";
    if (location.pathname.includes("register")) return "Join Our Community";
    if (location.pathname.includes("faq")) return "Frequently Asked Questions";
    return "Explore Our Properties";
  };

  // Dynamic hero subtitle based on route
  const getHeroSubtitle = () => {
    if (location.pathname.includes("details"))
      return "Discover every detail, feature, and neighborhood insight about this beautiful home.";
    if (location.pathname.includes("compare"))
      return "Compare prices, features, and amenities to find the perfect match.";
    if (location.pathname.includes("wishlist"))
      return "View, manage, and revisit your saved properties anytime.";
    if (location.pathname.includes("add"))
      return "List your property with ease — complete the details and reach thousands of buyers.";
    if (location.pathname.includes("sell"))
      return "Turn your property into opportunity. Start selling with confidence.";
    if (location.pathname.includes("agents"))
      return "Connect with trusted real estate experts ready to guide your next move.";
    if (location.pathname.includes("admin"))
      return "Manage listings, users, and platform operations efficiently.";
    if (location.pathname.includes("dashboard"))
      return "Access insights, monitor your listings, and track your performance.";
    if (location.pathname.includes("contact"))
      return "We’re here to help. Reach out for inquiries, support, or partnerships.";
    if (location.pathname.includes("about"))
      return "Learn more about our mission, values, and the team behind the platform.";
    if (location.pathname.includes("login"))
      return "Sign in to access your personalized dashboard and property tools.";
    if (location.pathname.includes("register"))
      return "Create your account and start your property journey today.";
    if (location.pathname.includes("faq"))
      return "Got questions? We’ve got answers to help you navigate the platform.";
    return "Find your dream home from our collection of curated listings.";
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
