// src/pages/AddProperty.jsx
import React from "react";
import { FiCheckCircle, FiHome, FiSearch, FiShield, FiUsers, } from "react-icons/fi";
import { FaHeadset } from "react-icons/fa";
import { motion } from "framer-motion";
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from "react-router-dom";

const AddProperty = () => {

  const { user } = useAuth()
  const navigate = useNavigate()

  const allowedRoles = ['agent', 'estate']
  const canListHomes = user.roles?.some(u=> allowedRoles.includes(u))

  if (canListHomes) {
    return (
      <div>
        <h2>Add your home here</h2>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-20">
      {/* Hero Section */}
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
          We reduce fraud from untrusted agents and estates, giving you full control. 
          Connect with verified agents who have a proven track record in your area.
        </p>

        <ul className="flex flex-col md:flex-row justify-center gap-8 mt-6">
          <li className="flex items-center gap-2 text-green-500 font-medium">
            <FiCheckCircle className="text-2xl" /> Local agents with proven condo or HDB sales
          </li>
          <li className="flex items-center gap-2 text-green-500 font-medium">
            <FiCheckCircle className="text-2xl" /> Only trusted, vetted agents
          </li>
          <li className="flex items-center gap-2 text-green-500 font-medium">
            <FiCheckCircle className="text-2xl" /> Transparent, secure process
          </li>
        </ul>
      </motion.section>

      {/* How It Works */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="space-y-10"
      >
        <h2 className="text-3xl font-bold text-gray-800 text-center">How It Works</h2>
        <ul className="grid sm:grid-cols-2 gap-8 justify-center">
          <motion.li
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white shadow-lg rounded-xl p-6 flex-1 flex flex-col items-center text-center"
          >
            <FiHome className="text-4xl text-yellow-500 mb-4" />
            <b className="text-xl mb-2">Share Your Selling Goals</b>
            <p className="text-gray-600">Tell us about your home and what matters most to you.</p>
          </motion.li>

          <motion.li
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white shadow-lg rounded-xl p-6 flex-1 flex flex-col items-center text-center"
          >
            <FiSearch className="text-4xl text-yellow-500 mb-4" />
            <b className="text-xl mb-2">Browse Trusted Agents</b>
            <p className="text-gray-600">
              We match you with top local agents who have a history of successful sales in your area.
            </p>
          </motion.li>
        </ul>

        <div className="flex justify-center mt-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={()=> navigate('/become-agent-or-agency')}
            className="px-8 py-3 bg-yellow-500 text-white rounded-xl font-semibold shadow-lg hover:bg-yellow-600 transition-colors"
          >
            Let’s Get Started
          </motion.button>
        </div>
      </motion.section>

      {/* Why Choose Us */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="space-y-10"
      >
        <h2 className="text-3xl font-bold text-gray-800 text-center">Your Home is in Good Hands</h2>
        <p className="text-gray-600 text-center max-w-2xl mx-auto">
          We ensure your home selling experience is safe, transparent, and professional.
        </p>
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <li className="bg-white shadow-lg rounded-xl p-6 flex-1 flex flex-col items-center text-center">
            <FiUsers className="text-4xl text-yellow-500 mb-4" />
            <b className="text-xl mb-2">Verified Agents</b>
            <p className="text-gray-600">
              All agents are vetted through rigorous verification for professionalism.
            </p>
          </li>
          <li className="bg-white shadow-lg rounded-xl p-6 flex-1 flex flex-col items-center text-center">
            <FiShield className="text-4xl text-yellow-500 mb-4" />
            <b className="text-xl mb-2">Transparent Process</b>
            <p className="text-gray-600">
              Stay informed at every step with our transparent communication tools.
            </p>
          </li>
          <li className="bg-white shadow-lg rounded-xl p-6 flex-1 flex flex-col items-center text-center">
            <FaHeadset className="text-4xl text-yellow-500 mb-4" />
            <b className="text-xl mb-2">Dedicated Support</b>
            <p className="text-gray-600">
              Our support team assists you throughout the selling journey.
            </p>
          </li>
        </ul>
      </motion.section>

      {/* FAQ */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="space-y-10"
      >
        <h2 className="text-3xl font-bold text-gray-800 text-center">Frequently Asked Questions</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <b className="text-xl">About Selling</b>
            <ul className="list-disc list-inside text-gray-600">
              <li>Am I eligible to sell my property?</li>
              <li>How do I list my property?</li>
            </ul>
          </div>
          <div className="space-y-4">
            <b className="text-xl">About Agents</b>
            <ul className="list-disc list-inside text-gray-600">
              <li>How are agents verified?</li>
              <li>What if I am not satisfied with an agent?</li>
            </ul>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default AddProperty;
