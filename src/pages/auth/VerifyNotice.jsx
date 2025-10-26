// src/pages/auth/VerifyNotice.jsx
import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
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
  const timerRef = useRef(null);
  const isResending = !!loading?.resendVerification;

  // Preserve the same logic you provided, only UI/messages changed
  const handleResend = async () => {
    if (!email) return;

    try {
      const res = await resendVerificationEmail(email);
      addToast(res?.message || "A new verification link has been sent to your email.", "success");

      // start 60s cooldown
      setCooldown(60);
      timerRef.current = setInterval(() => {
        setCooldown((sec) => {
          if (sec <= 1) {
            clearInterval(timerRef.current);
            timerRef.current = null;
            return 0;
          }
          return sec - 1;
        });
      }, 1000);
    } catch (err) {
      addToast(
        err?.response?.data?.message || "Failed to resend verification email. Try again later.",
        "error"
      );
    }
  };

  // clear on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
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
            alt="tvicl logo"
            className="h-12 w-auto object-contain"
          />
        </div>

        <div className="bg-white shadow-2xl rounded-2xl p-8 sm:p-10 border border-yellow-100">
          {/* Header Icon */}
          <div className="flex justify-center mb-4">
            <div className="bg-yellow-50 p-4 rounded-full shadow-sm">
              <FiMail className="text-yellow-400 text-3xl" />
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-semibold text-gray-800 mb-3 text-center">
            Verify your email to finish setup
          </h2>

          {/* Friendly, detailed explanation (Warm + Supportive) */}
          <div className="text-gray-600 text-sm leading-relaxed mb-6 text-center">
            {email ? (
              <>
                <p>
                  Almost there — we’ve sent a secure verification link to{" "}
                  <strong className="text-gray-800">{email}</strong>.
                </p>

                <p className="mt-2">
                  Open the email and click the link to activate your account. The link is valid for a limited time,
                  so please verify as soon as you can.
                </p>
              </>
            ) : (
              <p className="text-red-500">
                We couldn't detect your email address. Please return to registration and try again.
              </p>
            )}
          </div>

          {!email && <div className="mb-4">
            <div className="space-y-3">
              <div className="h-3 bg-gray-100 rounded w-5/6 mx-auto animate-pulse" />
              <div className="h-3 bg-gray-100 rounded w-4/6 mx-auto animate-pulse" />
            </div>
          </div>}

          {/* Resend Button */}
          {email && (
            <div>
              <motion.button
                onClick={handleResend}
                disabled={cooldown > 0 || isResending}
                whileHover={cooldown === 0 ? { scale: 1.02, y: -2, boxShadow: "0 12px 24px rgba(250, 204, 21, 0.12)" } : {}}
                whileTap={{ scale: 0.995 }}
                transition={{ type: "spring", stiffness: 300 }}
                className={`w-full py-3 rounded-full flex justify-center items-center gap-3 font-medium transition ${
                  cooldown > 0 || isResending
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-yellow-400 hover:bg-yellow-500 text-white shadow-md"
                }`}
              >
                {isResending && (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                )}
                <span>
                  {cooldown > 0 ? `Resend available in ${cooldown}s` : "Didn’t get it? Resend email"}
                </span>
                <FiRefreshCw size={18} className={cooldown > 0 ? "text-gray-500" : "text-white"} />
              </motion.button>
            </div>
          )}

          {/* Small helper text */}
          <p className="text-sm text-gray-500 mt-4 text-center">
            If you don’t see the email, check your spam, promotions tab, or other inbox folders.
          </p>

          {/* Troubleshooting tips */}
          <div className="mt-6 bg-yellow-50 border border-yellow-100 rounded-lg p-4 text-sm text-gray-700">
            <h4 className="font-medium text-gray-800 mb-2">Troubleshooting tips</h4>
            <ul className="list-disc list-inside space-y-1">
              <li>Check your spam, junk, or Promotions tab — sometimes messages land there.</li>
              <li>Search your inbox for emails from <strong>no-reply@tvicl.com</strong> or <strong>support@tvicl.app</strong>.</li>
              <li>Confirm you signed up with the correct email address.</li>
              <li>If you still don't see it, try clicking <strong>Resend email</strong> above.</li>
            </ul>
          </div>

          {/* Back to Login */}
          <div className="mt-6 text-sm">
            <button
              onClick={() => navigate("/auth", { state: { action: "login" } })}
              className="flex items-center justify-center w-full gap-2 text-yellow-600 hover:text-yellow-700 hover:underline"
            >
              <FiArrowLeft size={16} /> Back to Login
            </button>
          </div>
        </div>

        {/* small footer / support */}
        <div className="text-center mt-4 text-sm text-gray-500">
          <p>
            Need extra help? Reach out to{" "}
            <a href="mailto:support@tvicl.app" className="text-yellow-600 underline">
              support@tvicl.app
            </a>
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default VerifyNotice;
