import React, { useState } from "react";
import { useLocation, Link,useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../../hooks/useAuth";
import { useToast } from "../../context/ToastManager";
import { FiMail, FiRefreshCw, FiArrowLeft } from "react-icons/fi";

const VerifyNotice = () => {
  const { resendVerificationEmail, loading } = useAuth();
  const { addToast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  const [cooldown, setCooldown] = useState(0);

  const handleResend = async () => {
    if (!email) return;

    try {
      const res = await resendVerificationEmail(email);
      addToast(res.message || "A new verification link has been sent to your email.", "success");

      setCooldown(60);
      const timer = setInterval(() => {
        setCooldown((sec) => {
          if (sec <= 1) {
            clearInterval(timer);
            return 0;
          }
          return sec - 1;
        });
      }, 1000);
    } catch (err) {
      addToast(
        err.response?.data?.message || "Failed to resend verification email. Try again later.",
        "error"
      );
    }
  };

  return (
    <div className="flex justify-center items-center bg-gray-50 p-4 h-screen">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="max-w-md w-full bg-white shadow-lg rounded-2xl p-8 text-center border border-gray-100"
      >
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="bg-yellow-100 p-4 rounded-full shadow-sm">
            <FiMail className="text-yellow-600 text-3xl" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Check your email
        </h2>

        {/* Description */}
        {email ? (
          <p className="text-gray-600 mb-6">
            We sent a verification link to <strong>{email}</strong>.  
            Click the link in your inbox to activate your account.
          </p>
        ) : (
          <p className="text-red-500 mb-6">
            We couldn't retrieve your email. Please go back and create an account again.
          </p>
        )}

        {/* Resend Button */}
        {email && (
          <button
            onClick={handleResend}
            disabled={cooldown > 0 || loading?.resendVerification}
            className={`w-full py-3 rounded-lg flex justify-center items-center gap-2 font-medium transition ${
              cooldown > 0
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-yellow-600 hover:bg-yellow-700 text-white shadow-md hover:shadow-lg"
            }`}
          >
            {loading?.resendVerification && (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            )}
            {cooldown > 0 ? `Resend available in ${cooldown}s` : "Resend verification email"}
            <FiRefreshCw size={18} />
          </button>
        )}

        {/* Help Section */}
        <p className="text-sm text-gray-500 mt-4">
          Didn’t receive it? Check your spam folder or promotions tab.
        </p>

        {/* Back to Login */}
        <div className="mt-6 text-sm">
          <button               
          onClick={() => navigate("/auth", { state: { action: "login" } })}
            className="flex items-center justify-center w-full gap-2 text-yellow-600 hover:text-yellow-700 hover:underline"
          >
            <FiArrowLeft size={16} /> Back to Login
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default VerifyNotice;
