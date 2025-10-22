import React from "react";
import { motion } from "framer-motion";

const PersonalInfo = ({
  variants,
  fullName,
  errors,
  email,
  phone,
  onChange,
  next,
  back,
}) => {
  return (
    <motion.div
      key="personal"
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
    >
      <h3 className="text-lg font-semibold mb-3">Personal Information</h3>
      <p className="text-sm text-gray-500 mb-4">Tell us about yourself.</p>

      <div className="space-y-4">
        <label className="text-sm">
          Full name
          <input
            value={fullName}
            onChange={(e) => onChange("fullName", e.target.value)}
            className="w-full mt-2 p-3 border border-gray-200 rounded-lg text-sm"
            placeholder="John Doe"
          />
          {errors.fullName && (
            <div className="text-xs text-red-500 mt-1">{errors.fullName}</div>
          )}
        </label>

        <label className="text-sm">
          Email
          <input
            value={email}
            onChange={(e) => onChange("email", e.target.value)}
            className="w-full mt-2 p-3 border border-gray-200 rounded-lg text-sm"
            placeholder="you@domain.com"
          />
          {errors.email && (
            <div className="text-xs text-red-500 mt-1">{errors.email}</div>
          )}
        </label>

        <label className="text-sm">
          Phone
          <input
            value={phone}
            onChange={(e) => onChange("phone", e.target.value)}
            className="w-full mt-2 p-3 border border-gray-200 rounded-lg text-sm"
            placeholder="+234 801 234 5678"
          />
          {errors.phone && (
            <div className="text-xs text-red-500 mt-1">{errors.phone}</div>
          )}
        </label>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <button
          onClick={back}
          className="px-4 py-2 rounded-md text-sm bg-gray-500/10"
        >
          Back
        </button>
        <button
          onClick={next}
          className="px-4 py-2 rounded-md bg-primary text-secondary font-semibold text-sm"
        >
          Continue
        </button>
      </div>
    </motion.div>
  );
};

export default PersonalInfo;
