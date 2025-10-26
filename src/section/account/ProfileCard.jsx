import { FaUserCheck, FaUserTimes, FaHandHoldingUsd } from "react-icons/fa";
import { IoBriefcaseOutline } from "react-icons/io5";

const ProfileCardCompact = ({ profile, openRoleModal }) => {
  // Role configuration for badge colors, labels, and icons
  const roleConfig = {
    buyer: {
      badge: "bg-green-500 text-white",
      label: "Buyer",
      icon: <FaHandHoldingUsd />,
    },
    seller: {
      badge: "bg-purple-500 text-white",
      label: "Seller",
      icon: <FaHandHoldingUsd />,
    },
    agent: {
      badge: "bg-blue-500 text-white",
      label: "Agent",
      icon: <IoBriefcaseOutline />,
    },
    admin: {
      badge: "bg-red-600 text-white",
      label: "Admin",
      icon: <FaUserCheck />,
    },
  };

  // Determine active role (fallback to first role if activeRole not set)
  const activeRole =
    profile.activeRole?.toLowerCase() || profile.roles?.[0]?.toLowerCase() || "buyer";

  const config = roleConfig[activeRole] || roleConfig.buyer;

  return (
    <div className="flex flex-col justify-center w-full">
      {/* Name + Active Role Badge */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800 truncate">
          {profile.fullName}
        </h2>

        <span
          onClick={activeRole !== "admin" ? openRoleModal : undefined}
          className={`px-2 py-1 text-xs rounded-full font-medium cursor-pointer flex items-center gap-1 ${config.badge}`}
        >
          {config.icon}
          {config.label}
        </span>
      </div>

      {/* User Info */}
      <div className="mt-2 text-sm text-gray-700 space-y-1">
        <p>
          <strong>Email:</strong> {profile.email}
        </p>
        <p>
          <strong>Phone:</strong> {profile.phone || "N/A"}
        </p>
        <p className="flex items-center gap-2">
          <strong>Status:</strong>{" "}
          {profile.verified ? (
            <span className="flex items-center gap-1 text-green-600">
              <FaUserCheck /> Verified
            </span>
          ) : (
            <span className="flex items-center gap-1 text-red-500">
              <FaUserTimes /> Not Verified
            </span>
          )}
        </p>

        {/* All roles badges */}
        <div className="flex flex-wrap gap-1 mt-1">
          {profile.roles?.map((role) => {
            const lower = role.toLowerCase();
            const roleStyle = roleConfig[lower] || roleConfig.buyer;
            const isActive = lower === activeRole;

            return (
              <span
                key={role}
                className={`px-2 py-1 text-xs rounded-full font-medium flex items-center gap-1 ${
                  isActive
                    ? `border-2 border-yellow-400 ${roleStyle.badge}`
                    : roleStyle.badge.replace("text-white", "text-gray-100")
                }`}
              >
                {roleStyle.icon}
                {roleStyle.label}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProfileCardCompact;
