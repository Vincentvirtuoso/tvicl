import { motion } from "framer-motion";
import { FiLoader } from "react-icons/fi";
import { useRoleSwitch } from "../../hooks/useRoleSwitch";

const ActionButton = ({ label, icon, color, role, bg, user, ...props }) => {
  const { switchRole, isUpdating } = useRoleSwitch(user);

  const isLoading = isUpdating;

  return (
    <motion.button
      whileHover={!isLoading ? { scale: 1.03, y: -2 } : {}}
      whileTap={!isLoading ? { scale: 0.97 } : {}}
      disabled={isLoading}
      className={`flex items-center gap-2 w-[240px] justify-center py-2 px-4 border text-sm border-gray-200 rounded-xl shadow-sm font-medium text-gray-700 bg-white transition-all duration-150 ${
        isLoading ? "opacity-70 cursor-not-allowed" : "hover:shadow-md"
      } ${bg}`}
      onClick={() => switchRole(role)}
      {...props}
    >
      {isLoading ? (
        <>
          <FiLoader className="animate-spin text-gray-500 text-lg" />
          <span>Processing...</span>
        </>
      ) : (
        <>
          <span className={color}>{icon}</span>
          {label}
        </>
      )}
    </motion.button>
  );
};

export default ActionButton;
