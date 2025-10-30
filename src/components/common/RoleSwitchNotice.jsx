import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { LuRepeat } from "react-icons/lu";
import { RiUserSharedLine } from "react-icons/ri";
import { FaUserTie, FaUser } from "react-icons/fa";
import { useRoleSwitch } from "../../hooks/useRoleSwitch";

const RoleSwitchNotice = ({
  title,
  message,
  actionLabel = "Switch Role",
  user,
}) => {
  const navigate = useNavigate();
  const { switchRole } = useRoleSwitch(user);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRoleSelect = async (role) => {
    setLoading(true);
    await switchRole(role);
    setLoading(false);
    setShowModal(false);
  };

  return (
    <>
      {/* Notice Banner */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 text-center shadow-sm"
      >
        <div className="flex flex-col items-center gap-3">
          <LuRepeat className="text-4xl text-yellow-600" />
          <h2 className="text-lg font-semibold text-yellow-700">{title}</h2>
          <p className="text-yellow-600 max-w-2xl mx-auto">{message}</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowModal(true)}
            className="mt-4 px-6 py-2 bg-yellow-600 text-white rounded-lg font-medium shadow-md hover:bg-yellow-700 transition-colors"
          >
            {actionLabel}
          </motion.button>
        </div>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 w-full max-w-md shadow-lg"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">
                Select a Role
              </h3>
              <p className="text-gray-500 text-sm text-center mb-6">
                Choose which role you want to switch to.
              </p>

              <div className="flex flex-col gap-3">
                {user?.roles?.map((role) => (
                  <motion.button
                    key={role}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    disabled={loading}
                    onClick={() => handleRoleSelect(role)}
                    className={`flex items-center justify-center gap-2 py-3 rounded-lg border font-medium transition-colors ${
                      loading
                        ? "bg-gray-100 text-gray-400"
                        : "hover:bg-yellow-50 text-yellow-700 border-yellow-200"
                    }`}
                  >
                    {role === "buyer" && <FaUser />}
                    {role === "agent" && <RiUserSharedLine />}
                    {role === "agency" && <FaUserTie />}
                    {loading
                      ? "Switching..."
                      : role.charAt(0).toUpperCase() + role.slice(1)}
                  </motion.button>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowModal(false)}
                className="mt-6 w-full py-2 text-gray-600 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default RoleSwitchNotice;
