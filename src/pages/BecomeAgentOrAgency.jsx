import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FiCheck,
  FiUpload,
  FiUser,
  FiMapPin,
  FiPhone,
  FiGlobe,
  FiFileText,
} from "react-icons/fi";
import { MdOutlineAddHomeWork } from "react-icons/md";
import { IoBriefcaseOutline } from "react-icons/io5";
import { useAuth } from "../hooks/useAuth";
import { useToast } from "../context/ToastManager";

const roles = [
  {
    value: "agent",
    label: "Agent",
    icon: <IoBriefcaseOutline className="text-2xl" />,
  },
  {
    value: "estate",
    label: "Estate",
    icon: <MdOutlineAddHomeWork className="text-2xl" />,
  },
];

export default function BecomeAgentOrAgency() {
  const { updateProfile, loading, user } = useAuth();
  const { addToast } = useToast();

  const [selectedRole, setSelectedRole] = useState(null);
  const [form, setForm] = useState({
    fullName: user.fullName || "",
    phone: user.phone || "",
    estateName: "",
    companyName: "",
    address: "",
    website: "",
    registrationNumber: "",
    estateLogo: null,
    verificationDoc: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFilePick = (name) => (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setForm((prev) => ({ ...prev, [name]: file }));
  };

  const handleSubmit = async () => {
    if (!selectedRole) return addToast("Please select a role", "error");

    try {
      const formData = new FormData();

      // Common fields
      formData.append("fullName", form.fullName);
      formData.append("phone", form.phone);

      if (form.verificationDoc) {
        formData.append("verificationDoc", form.verificationDoc);
      }

      // Role-specific fields
      if (selectedRole === "agent") {
        formData.append("companyName", form.companyName);
        formData.append("address", form.address);
      } else if (selectedRole === "estate") {
        formData.append("estateName", form.estateName);
        formData.append("address", form.address);
        formData.append("website", form.website);
        formData.append("registrationNumber", form.registrationNumber);
        if (form.estateLogo) {
          formData.append("estateLogo", form.estateLogo);
        }
      }

      // Send role info
      formData.append("role", selectedRole);

      await updateProfile(formData, true); // true indicates formData is being sent
      addToast(
        `${
          selectedRole === "agent" ? "Agent" : "Estate"
        } account created successfully`,
        "success"
      );
    } catch (err) {
      addToast(err.message || "Failed to update role", "error");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <motion.div
        className="px-6 py-24 max-w-5xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Hero Section */}
        <motion.div
          className="flex flex-col md:flex-row items-center gap-8 mb-12"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold mb-4">
              Become an Agent or Register Your Estate
            </h1>
            <p className="text-gray-600 mb-6">
              Unlock advanced features like property listings, client
              management, estate promotion, and more. Fill out the form to get
              started.
            </p>
          </div>
          <div className="flex-1">
            <img
              src="/images/hero.jpeg"
              alt="Hero Illustration"
              className="w-full max-w-lg mx-auto"
            />
          </div>
        </motion.div>

        {/* Role Selection */}
        <motion.div
          className="flex justify-center gap-6 mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {roles.map((r) => (
            <button
              key={r.value}
              onClick={() => setSelectedRole(r.value)}
              className={`flex flex-col items-center gap-2 p-6 rounded-xl border-2 transition-all ${
                selectedRole === r.value
                  ? "border-primary bg-primary/10 shadow-md"
                  : "border-gray-200 hover:border-primary"
              }`}
            >
              {r.icon}
              <span className="font-semibold">{r.label}</span>
              {selectedRole === r.value && (
                <FiCheck className="text-green-600 mt-1" />
              )}
            </button>
          ))}
        </motion.div>

        {/* Form */}
        <motion.div
          className="bg-white p-8 rounded-xl shadow-md space-y-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex flex-col gap-4">
            {selectedRole === "estate" && (
              <>
                <div className="flex flex-col">
                  <label className="font-medium mb-1 flex items-center gap-2">
                    <MdOutlineAddHomeWork /> Estate Name
                  </label>
                  <input
                    type="text"
                    name="estateName"
                    value={form.estateName}
                    onChange={handleChange}
                    className="border border-gray-500/30 px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-primary/80"
                    placeholder="Your Estate Name"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="font-medium mb-1 flex items-center gap-2">
                    <FiFileText /> Registration Number
                  </label>
                  <input
                    type="text"
                    name="registrationNumber"
                    value={form.registrationNumber}
                    onChange={handleChange}
                    className="border border-gray-500/30 px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-primary/80"
                    placeholder="RC Number / Registration ID"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="font-medium mb-1 flex items-center gap-2">
                    <FiGlobe /> Website
                  </label>
                  <input
                    type="text"
                    name="website"
                    value={form.website}
                    onChange={handleChange}
                    className="border border-gray-500/30 px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-primary/80"
                    placeholder="https://www.estate.com"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="font-medium mb-1 flex items-center gap-2">
                    <FiUpload /> Estate Logo
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFilePick("estateLogo")}
                    className="border border-gray-500/30 px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-primary/80"
                  />
                  {form.estateLogo && (
                    <span className="text-sm text-gray-500 mt-1">
                      Selected: {form.estateLogo.name}
                    </span>
                  )}
                </div>
              </>
            )}

            {/* Common Fields */}
            <div className="flex flex-col">
              <label className="font-medium mb-1 flex items-center gap-2">
                <FiUser /> Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                className="border border-gray-500/30 px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-primary/80"
                placeholder="John Doe"
              />
            </div>

            <div className="flex flex-col">
              <label className="font-medium mb-1 flex items-center gap-2">
                <FiPhone /> Phone
              </label>
              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="border border-gray-500/30 px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-primary/80"
                placeholder="+234 801 234 5678"
              />
            </div>

            <div className="flex flex-col">
              <label className="font-medium mb-1 flex items-center gap-2">
                <FiMapPin /> Address
              </label>
              <input
                type="text"
                name="address"
                value={form.address}
                onChange={handleChange}
                className="border border-gray-500/30 px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-primary/80"
                placeholder="Estate Address or Company Location"
              />
            </div>

            <div className="flex flex-col">
              <label className="font-medium mb-1 flex items-center gap-2">
                <FiUpload /> Verification Document (Optional)
              </label>
              <input
                type="file"
                accept="image/*,application/pdf"
                onChange={handleFilePick("verificationDoc")}
                className="border border-gray-500/30 px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-primary/80"
              />
              {form.verificationDoc && (
                <span className="text-sm text-gray-500 mt-1">
                  Selected: {form.verificationDoc.name}
                </span>
              )}
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="mt-4 w-full py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition"
          >
            {loading.updateProfile ? "Submitting..." : "Create Account"}
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
