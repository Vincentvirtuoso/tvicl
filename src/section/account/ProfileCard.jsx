import { FaUserCheck, FaUserTimes, FaHandHoldingUsd } from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";
import { IoBriefcaseOutline } from "react-icons/io5";

const ProfileCardCompact = ({ profile, openRoleModal }) => {
  // Role configuration for badge colors, labels, and icons
  const roleConfig = {
    buyer: {
      badge: "border border-green-500/50 text-green-500",
      label: "Buyer",
      icon: <FaHandHoldingUsd />,
    },
    seller: {
      badge: "border border-purple-500/50 text-purple-500",
      label: "Seller",
      icon: <FaHandHoldingUsd />,
    },
    agent: {
      badge: "border border-blue-500/50 text-blue-500",
      label: "Agent",
      icon: <IoBriefcaseOutline />,
    },
    admin: {
      badge: "border border-red-600/50 text-red-600",
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
          <FiChevronDown className='ml-2' />
        </span>
      </div>

      {/* User Info */}
      <div className="mt-1 text-sm text-gray-700 space-y-1">
        <p>
          {profile.email}
        </p>
        <p className="flex items-center gap-2">
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
        <div className="mt-3">
          {profile.roles.includes("admin") ? null : (
            <div className="flex flex-col gap-2">
              <p className="text-xs italic text-gray-500">
                Want to expand your account? You can become an Agent, or register as an Estate.
              </p>
              <div className="flex flex-wrap gap-2">
                {!profile.roles.includes("agent") && (
                  <button
                    onClick={() => openRoleModal("agent")}
                    className="px-3 py-1.5 rounded-md bg-secondary text-white text-sm hover:bg-secondary/80"
                  >
                    Become Agent
                  </button>
                )}
                {!profile.roles.includes("estate") && (
                  <button
                    onClick={() => openRoleModal("estate")}
                    className="px-3 py-1.5 rounded-md bg-emerald-600 text-white text-sm hover:bg-emerald-500"
                  >
                    Register Estate
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default ProfileCardCompact;
