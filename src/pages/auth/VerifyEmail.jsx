// src/pages/auth/VerifyEmail.jsx
import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  FiCheckCircle,
  FiXCircle,
  FiLoader,
  FiRefreshCcw,
} from "react-icons/fi";
import { motion } from "framer-motion";
import { useAuth } from "../../hooks/useAuth";

const VerifyEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const { verifyEmail } = useAuth();

  // --- Existing logic kept exactly as requested ---
  const [status, setStatus] = useState("verifying"); // verifying | success | failed | already
  const [message, setMessage] = useState("");

  const handleVerify = useCallback(async () => {
    setStatus("verifying");
    try {
      const res = await verifyEmail(token);
      if (res.alreadyVerified) {
        setStatus("already");
        setMessage(res.message || "Your email is already verified.");
      } else {
        setStatus("success");
        setMessage(res.message || "Your email has been successfully verified!");
      }
    } catch (err) {
      setStatus("failed");
      setMessage(
        err.response?.data?.message ||
          "This verification link is invalid or has expired."
      );
    }
  }, [token, verifyEmail]);

  useEffect(() => {
    handleVerify();
  },[])

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-b from-yellow-50 via-white to-yellow-50 px-4"
    >
      <div className="w-full max-w-md">
        {/* Logo centered above card */}
        <div className="flex justify-center mb-6">
          <img
            src="/images/logo.png"
            alt="Vigilo logo"
            className="h-12 w-auto object-contain"
          />
        </div>

        <div className="bg-white shadow-2xl rounded-2xl p-8 sm:p-10 border border-yellow-100">
          {/* Loading / Verifying */}
          {status === "verifying" && (
            <div className="text-center">
              <div className="mx-auto mb-6 flex items-center justify-center h-16 w-16 rounded-full bg-yellow-50">
                <FiLoader className="animate-spin text-yellow-400" size={36} />
              </div>

              {/* Skeleton card */}
              <div className="space-y-4 animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6 mx-auto"></div>
                <div className="h-10 bg-gray-200 rounded w-full mt-6"></div>
              </div>

              <p className="text-gray-500 mt-4">
                Verifying your email — this should only take a second.
              </p>
            </div>
          )}

          {/* Success */}
          {status === "success" && (
            <div className="text-center">
              <div className="mx-auto mb-4 flex items-center justify-center h-16 w-16 rounded-full bg-yellow-50">
                <FiCheckCircle className="text-yellow-400" size={40} />
              </div>

              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                Email Verified
              </h2>
              <p className="text-gray-600 mb-6">{message}</p>

              <motion.button
                whileHover={{ y: -3, boxShadow: "0 12px 24px rgba(250, 204, 21, 0.12)" }}
                transition={{ type: "spring", stiffness: 300 }}
                onClick={() => navigate("/auth", { state: { action: "login" } })}
                className="w-full rounded-full bg-yellow-400 hover:bg-yellow-500 text-white py-3 font-medium transition-all"
              >
                Proceed to Login
              </motion.button>
            </div>
          )}

          {/* Already Verified */}
          {status === "already" && (
            <div className="text-center">
              <div className="mx-auto mb-4 flex items-center justify-center h-16 w-16 rounded-full bg-yellow-50">
                <FiCheckCircle className="text-yellow-400" size={40} />
              </div>

              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                Already Verified
              </h2>
              <p className="text-gray-600 mb-6">{message}</p>

              <motion.button
                whileHover={{ y: -3, boxShadow: "0 12px 24px rgba(250, 204, 21, 0.12)" }}
                transition={{ type: "spring", stiffness: 300 }}
                onClick={() => navigate("/auth", { state: { action: "login" } })}
                className="w-full rounded-full bg-yellow-400 hover:bg-yellow-500 text-white py-3 font-medium transition-all"
              >
                Go to Login
              </motion.button>
            </div>
          )}

          {/* Failed */}
          {status === "failed" && (
            <div className="text-center">
              <div className="mx-auto mb-4 flex items-center justify-center h-16 w-16 rounded-full bg-red-50">
                <FiXCircle className="text-red-500" size={40} />
              </div>

              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                Verification Failed
              </h2>
              <p className="text-gray-600 mb-6">{message}</p>

              <Link
                to="/auth"
                className="block w-full rounded-full bg-yellow-400 hover:bg-yellow-500 text-white py-3 font-medium transition-all"
              >
                Go Back
              </Link>

              <motion.button
                onClick={handleVerify}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.18 }}
                className="mt-3 w-full border border-gray-200 hover:bg-gray-50 py-3 rounded-full transition inline-flex justify-center items-center text-gray-700"
              >
                <FiRefreshCcw className="mr-2" /> Try Again
              </motion.button>
            </div>
          )}
        </div>

        {/* small footer / helper text */}
        <div className="text-center mt-4 text-sm text-gray-500">
          <p>
            Need help? Reach out to <a href="mailto:support@tvicl.app" className="text-yellow-600 underline">support@tvicl.app</a>
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default VerifyEmail;
