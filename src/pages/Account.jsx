import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiUser,
  FiMail,
  FiHome,
  FiHeart,
  FiBell,
  FiSettings,
  FiEdit2,
  FiLogOut,
} from "react-icons/fi";

import avatar from "/images/logo.png"; // or dynamic user.photo
import Hero from "../components/layout/Hero";

const tabs = [
  { id: "profile", label: "Profile", icon: <FiUser /> },
  { id: "favorites", label: "Saved Properties", icon: <FiHeart /> },
  { id: "notifications", label: "Notifications", icon: <FiBell /> },
  { id: "settings", label: "Settings", icon: <FiSettings /> },
];

const AccountPage = ({ user }) => {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 mb-10">
      <Hero
        title="My Profile"
        subtitle="Manage your account and saved properties"
        height="h-[350px]"
        overlay="bg-gradient-to-r from-black/80 to-black/40"
      >
        <div className="mt-6 flex items-center justify-center gap-4">
          <img
            src={user?.photo || avatar}
            alt={user?.name || "User"}
            className="w-28 h-28 rounded-full border-4 border-white shadow-lg object-cover"
          />
          <div className="text-left">
            <h2 className="text-2xl font-semibold">
              {user?.name || "Guest User"}
            </h2>
            <p className="text-gray-300 flex items-center gap-2">
              <FiMail /> {user?.email || "No email available"}
            </p>
          </div>
        </div>
      </Hero>

      {/* Tabs */}
      <div className="max-w-6xl mx-auto px-4 mt-10">
        <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2 rounded-full border transition-all ${
                activeTab === tab.id
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-white hover:bg-blue-50 border-gray-200 text-gray-600"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === "profile" && (
              <div className="bg-white rounded-xl shadow p-6">
                <h2 className="text-xl font-semibold mb-4">
                  Personal Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-500">Full Name</label>
                    <input
                      type="text"
                      value={user?.name || ""}
                      readOnly
                      className="w-full border rounded-md px-3 py-2 mt-1 bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Email</label>
                    <input
                      type="email"
                      value={user?.email || ""}
                      readOnly
                      className="w-full border rounded-md px-3 py-2 mt-1 bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Phone</label>
                    <input
                      type="text"
                      value={user?.phone || "+234 812 345 6789"}
                      readOnly
                      className="w-full border rounded-md px-3 py-2 mt-1 bg-gray-50"
                    />
                  </div>
                </div>

                <button className="mt-6 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md transition">
                  <FiEdit2 /> Edit Profile
                </button>
              </div>
            )}

            {/* {activeTab === "favorites" && (
              <div>
                <h2 className="text-xl font-semibold mb-4">
                  Your Saved Properties
                </h2>
                <FavoriteListInline
                  favorites={favccorites}
                  handleToggleFavorite={(item) =>
                    console.log("Remove favorite:", item)
                  }
                />
              </div>
            )} */}

            {activeTab === "notifications" && (
              <div className="bg-white rounded-xl shadow p-6">
                <h2 className="text-xl font-semibold mb-4">
                  Notifications Center
                </h2>
                <p className="text-gray-600">
                  You have no new notifications at the moment 📭
                </p>
              </div>
            )}

            {activeTab === "settings" && (
              <div className="bg-white rounded-xl shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span>Email Notifications</span>
                    <input
                      type="checkbox"
                      className="scale-125 accent-blue-600"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Dark Mode</span>
                    <input
                      type="checkbox"
                      className="scale-125 accent-blue-600"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Two-Factor Authentication</span>
                    <input
                      type="checkbox"
                      className="scale-125 accent-blue-600"
                    />
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AccountPage;
