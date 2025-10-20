import { motion } from "framer-motion";

const ActionButton = ({ label, icon, color, bg }) => (
  <motion.button
    whileHover={{ scale: 1.03, y: -2 }}
    whileTap={{ scale: 0.97 }}
    className={`flex items-center gap-2 w-[240px] justify-center py-2 px-4 border text-sm border-gray-200 rounded-xl shadow-sm font-medium text-gray-700 bg-white ${bg}`}
  >
    {" "}
    <span className={color}>{icon}</span> {label}{" "}
  </motion.button>
);

export default ActionButton;
