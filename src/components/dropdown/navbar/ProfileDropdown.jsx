import React from "react";
import { Loader } from "../../common/Loader";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ActionButton from "../../others/ActionButton";
import Divider from "../../common/Divider";

const ProfileDropdown = ({
  user,
  loadingAuth,
  actions,
  loginMock,
  logoutMock,
}) => {
  const navigate = useNavigate();
  return (
    <motion.div
      key="profile"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ type: "spring", stiffness: 120, damping: 22 }}
      className="w-80 bg-white rounded-lg shadow-lg p-4 z-40 relative text-gray-600"
    >
      {loadingAuth ? (
        <div className="flex items-center justify-center py-6">
          <Loader variant="spinner" size={36} label="" />
        </div>
      ) : user ? (
        <div className="flex flex-col gap-3">
          {/* User Info */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-sm font-medium text-gray-600">
              {user.name
                ?.split(" ")
                .map((s) => s[0])
                .slice(0, 2)
                .join("")}
            </div>
            <div>
              <div className="font-semibold">{user.name}</div>
              <div className="text-xs text-gray-500">{user.email}</div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col gap-2 pt-4 border-t border-gray-500/20">
            <button
              onClick={() => navigate("/account")}
              className="text-left text-sm"
            >
              My profile
            </button>
            <button
              onClick={() => navigate("/account/settings")}
              className="text-left text-sm"
            >
              Account settings
            </button>
            <button
              onClick={() => navigate("/property/wishlist")}
              className="text-left text-sm"
            >
              Saved properties
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col items-center gap-2 pt-4 border-t border-gray-500/20">
            {actions.map((a, i) => (
              <ActionButton key={i} {...a} />
            ))}
          </div>

          <Divider margin="my-2" width="w-full" />

          {/* Logout */}
          <button
            onClick={logoutMock}
            className="w-full py-2 rounded-md bg-rose-500 text-white text-sm"
          >
            Sign out
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <div className="text-sm">You are not signed in</div>
          <div className="flex gap-2">
            <button
              onClick={loginMock}
              className="flex-1 py-2 rounded-md bg-[#25aff3] text-black text-sm"
            >
              Sign in (mock)
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="flex-1 py-2 rounded-md border border-gray-200 text-sm"
            >
              Sign up
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ProfileDropdown;
