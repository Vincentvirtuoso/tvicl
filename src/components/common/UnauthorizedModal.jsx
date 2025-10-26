import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiAlertCircle } from "react-icons/fi";

const UnauthorizedModal = ({ countdown = 5 }) => {
  const navigate = useNavigate();
  const [timer, setTimer] = useState(countdown);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!visible) return;

    if (timer <= 0) {
      setVisible(false);
      setTimeout(() => {
        navigate("/auth", { state: { from: "unauthorized", action: "login" }, replace: true });
      }, 300); 
      return;
    }

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer, navigate, visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/40 flex justify-center items-center z-60"
        >
          <motion.div
            key="modal"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-2xl max-w-md w-[90vw] p-8 text-center"
          >
            <FiAlertCircle className="text-red-500 text-6xl mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Session Expired / Unauthorized</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Your current session is invalid or has expired. This can happen if:
            </p>
            <ul className="text-gray-600 text-left mb-6 list-disc list-inside space-y-1">
              <li>Your login session has timed out.</li>
              <li>Your authentication token is invalid.</li>
              <li>You tried to access a restricted page.</li>
            </ul>
            <p className="text-gray-700 font-semibold">
              You will be automatically redirected to the login page in{" "}
              <span className="text-red-500">{timer}</span> seconds.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default UnauthorizedModal;
