import React, { useState } from "react";
import { motion } from "framer-motion";
import PasswordStrength from "../PasswordStrength";
import { Link } from "react-router-dom";

const Password = ({
  variants,
  password,
  onChange,
  errors,
  agreeTos,
  confirmPassword,
  back,
  next,
}) => {
  const [showPassword, setShowPassword] = useState();
  return (
    <motion.div
      key="security"
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
    >
      <h3 className="text-lg font-semibold mb-3">Account Security</h3>
      <p className="text-sm text-gray-500 mb-4">
        Choose a strong password and accept the terms.
      </p>

      <div className="space-y-4">
        <label className="text-sm block">
          Password
          <div className="flex items-center border border-gray-200 rounded-lg mt-2 overflow-hidden">
            <input
              value={password}
              onChange={(e) => onChange("password", e.target.value)}
              type={showPassword ? "text" : "password"}
              className="w-full p-3 text-sm bg-transparent outline-none"
              placeholder="Create a secure password"
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="px-3 text-sm text-gray-600"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          {errors.password && (
            <div className="text-xs text-red-500 mt-1">{errors.password}</div>
          )}
          <PasswordStrength pw={password} />
        </label>

        <label className="text-sm block">
          Confirm password
          <input
            value={confirmPassword}
            onChange={(e) => onChange("confirmPassword", e.target.value)}
            type="password"
            className="w-full mt-2 p-3 border border-gray-200 rounded-lg text-sm"
            placeholder="Repeat your password"
          />
          {errors.confirmPassword && (
            <div className="text-xs text-red-500 mt-1">
              {errors.confirmPassword}
            </div>
          )}
        </label>

        <label className="flex items-center gap-2 text-sm">
          <input
            checked={agreeTos}
            onChange={(e) => onChange("agreeTos", e.target.checked)}
            type="checkbox"
          />
          <span>
            I agree to TVCIL’s{" "}
            <Link to="/terms" className="underline">
              Terms
            </Link>{" "}
            and{" "}
            <Link to="/privacy" className="underline">
              Privacy Policy
            </Link>
            .
          </span>
        </label>
        {errors.tos && (
          <div className="text-xs text-red-500 mt-1">{errors.tos}</div>
        )}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <button
          onClick={back}
          className="px-4 py-2 rounded-md text-sm bg-gray-500/10"
        >
          Back
        </button>
        <button
          onClick={() => next()}
          className="px-4 py-2 rounded-md bg-primary text-secondary font-semibold text-sm"
        >
          Continue
        </button>
      </div>
    </motion.div>
  );
};

export default Password;
