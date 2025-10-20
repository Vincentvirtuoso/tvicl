import { motion } from "framer-motion";
import Divider from "../../common/Divider";

const NotificationPanel = () => {
  return (
    <motion.div
      key="notif"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ type: "spring", stiffness: 120, damping: 22 }}
      className="w-72 bg-neutral-900 dark:bg-white shadow-lg rounded-lg p-3 z-40 relative"
    >
      <div className="text-sm dark:text-gray-900 text-gray-200">
        You have 4 new notifications
      </div>
      <Divider margin="my-2" />
      <div className="flex flex-col gap-4 text-gray-900">
        <button className="text-left text-sm">
          New message from the Admin
        </button>
        <button className="text-left text-sm">
          Payment for Skyline property will be due tomorrow
        </button>
        <button className="text-left text-sm">
          Property inquiry: Here's the feedback
        </button>
        <button className="text-left text-sm">
          An agent sent a request to join your estate
        </button>
      </div>
    </motion.div>
  );
};

export default NotificationPanel;
