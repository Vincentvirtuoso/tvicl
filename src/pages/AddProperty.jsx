// src/pages/AddProperty.jsx
import React from "react";
import {
  FiCheckCircle,
  FiHome,
  FiSearch,
  FiShield,
  FiUsers,
} from "react-icons/fi";
import { FaHeadset } from "react-icons/fa";
import { motion } from "framer-motion";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import PropertyListingForm from "./PropertyListingForm";
import FAQ from "../section/addProperty/FAQ";
import RoleSwitchNotice from "../components/common/RoleSwitchNotice";

const AddProperty = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Role checks
  const allowedRoles = ["agent", "estate"];
  const canListHomes = allowedRoles.includes(user?.activeRole);
  const isBuyer = user?.activeRole === "buyer";
  const canSwitchRoles =
    isBuyer && user?.roles?.some((role) => allowedRoles.includes(role));

  // 🏡 If user is agent or estate → show listing form
  if (canListHomes) {
    return <PropertyListingForm />;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-20">
      {canSwitchRoles && (
        <RoleSwitchNotice
          title="You’re currently in Buyer Mode"
          message="You already have an agent or estate role. 
    Please switch to the appropriate mode to start listing properties."
          actionLabel="Switch to Agent/Estate Mode"
          redirectTo="/dashboard"
        />
      )}

      {/* 🏠 Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-6"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">
          Sell Your Home at the Best Price, Safely
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Reduce fraud and connect with verified agents who have a proven track
          record in your area — with full control and transparency.
        </p>

        <ul className="flex flex-col md:flex-row justify-center gap-8 mt-6">
          {[
            "Local agents with proven condo or HDB sales",
            "Only trusted, vetted agents",
            "Transparent, secure process",
          ].map((text, i) => (
            <li
              key={i}
              className="flex items-center gap-2 text-green-600 font-medium"
            >
              <FiCheckCircle className="text-2xl" /> {text}
            </li>
          ))}
        </ul>
      </motion.section>

      {/* ⚙️ How It Works */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="space-y-10"
      >
        <h2 className="text-3xl font-bold text-gray-800 text-center">
          How It Works
        </h2>
        <ul className="grid sm:grid-cols-2 gap-8 justify-center">
          {[
            {
              icon: <FiHome className="text-4xl text-yellow-500 mb-4" />,
              title: "Share Your Selling Goals",
              desc: "Tell us about your home and what matters most to you.",
            },
            {
              icon: <FiSearch className="text-4xl text-yellow-500 mb-4" />,
              title: "Browse Trusted Agents",
              desc: "We match you with top local agents with proven results.",
            },
          ].map((item, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: i === 0 ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center text-center"
            >
              {item.icon}
              <b className="text-xl mb-2">{item.title}</b>
              <p className="text-gray-600">{item.desc}</p>
            </motion.li>
          ))}
        </ul>

        {!canSwitchRoles && (
          <div className="flex justify-center mt-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/become-agent-or-agency")}
              className="px-8 py-3 bg-yellow-500 text-white rounded-xl font-semibold shadow-lg hover:bg-yellow-600 transition-colors"
            >
              Let’s Get Started
            </motion.button>
          </div>
        )}
      </motion.section>

      {/* 💼 Why Choose Us */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="space-y-10"
      >
        <h2 className="text-3xl font-bold text-gray-800 text-center">
          Your Home is in Good Hands
        </h2>
        <p className="text-gray-600 text-center max-w-2xl mx-auto">
          Enjoy a safe, transparent, and professional home-selling experience.
        </p>

        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: <FiUsers className="text-4xl text-yellow-500 mb-4" />,
              title: "Verified Agents",
              desc: "Every agent is rigorously vetted for professionalism.",
            },
            {
              icon: <FiShield className="text-4xl text-yellow-500 mb-4" />,
              title: "Transparent Process",
              desc: "Stay informed at every step through our clear communication tools.",
            },
            {
              icon: <FaHeadset className="text-4xl text-yellow-500 mb-4" />,
              title: "Dedicated Support",
              desc: "Our support team assists you throughout your journey.",
            },
          ].map((item, i) => (
            <li
              key={i}
              className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center text-center"
            >
              {item.icon}
              <b className="text-xl mb-2">{item.title}</b>
              <p className="text-gray-600">{item.desc}</p>
            </li>
          ))}
        </ul>
      </motion.section>

      {/* ❓FAQ Section */}
      <FAQ />
    </div>
  );
};

export default AddProperty;
