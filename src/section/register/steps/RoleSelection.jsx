import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiCheck, FiChevronRight, FiUser } from "react-icons/fi";
import { MdBusiness } from "react-icons/md";

const RoleSelection = ({ variants, role, setRole, setStep }) => {
  const roles = [
    { id: "buyer", title: "Buyer", desc: "Browse & buy properties" },
    { id: "agent", title: "Agent", desc: "List properties & manage clients" },
    { id: "agency", title: "Agency", desc: "Manage agents & listings" },
  ];

  return (
    <motion.div
      key="role"
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.4 }}
    >
      <h3 className="text-lg font-semibold mb-3">Create an account</h3>
      <p className="text-sm text-gray-500 mb-6">
        Choose the account type that best describes you.
      </p>

      <div className="flex flex-wrap gap-4">
        {roles.map((t) => (
          <motion.button
            key={t.id}
            type="button"
            layout
            whileTap={{ scale: 0.98 }}
            onClick={() => setRole(t.id)}
            className={`group border rounded-xl p-4 text-left shadow-sm transition flex-1 min-w-[180px]
              ${
                role === t.id
                  ? "border-primary bg-primary/5 shadow-primary/20"
                  : "border-gray-200 hover:shadow-md"
              }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-md bg-gray-100 flex items-center justify-center text-xl">
                  {t.id === "agency" ? <MdBusiness /> : <FiUser />}
                </div>
                <div>
                  <div className="font-medium">{t.title}</div>
                  <div className="text-xs text-gray-500">{t.desc}</div>
                </div>
              </div>
              <AnimatePresence>
                {role === t.id && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                  >
                    <FiCheck className="text-primary" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.button>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-end">
        <motion.button
          whileTap={{ scale: 0.97 }}
          whileHover={{ scale: 1.01 }}
          onClick={() => setStep(1)}
          disabled={!role}
          className={`flex items-center gap-2 px-5 py-2 rounded-md font-medium transition text-sm md:text-base
            ${
              role
                ? "bg-primary"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
        >
          Continue <FiChevronRight />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default RoleSelection;
