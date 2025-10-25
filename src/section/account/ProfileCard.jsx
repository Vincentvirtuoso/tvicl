import { FaHandHoldingUsd } from "react-icons/fa";
import { FiHome, FiMapPin } from "react-icons/fi";
import { IoBriefcaseOutline } from "react-icons/io5";
import { LuBadgeDollarSign } from "react-icons/lu";
import { MdOutlineAddHomeWork } from "react-icons/md";

const ProfileCardCompact = ({ profile, openRoleModal }) => {
  const modeConfig = {
    agent: {
      bg: "bg-blue-50",
      badge: "bg-blue-400 text-white",
      icon: <IoBriefcaseOutline />,
      label: "Agent",
    },
    estate: {
      bg: "bg-yellow-50",
      badge: "bg-yellow-400 text-black",
      icon: <MdOutlineAddHomeWork />,
      label: "Estate",
    },
    user: {
      bg: "bg-green-50",
      badge: "bg-green-400 text-white",
      icon: <FaHandHoldingUsd />,
      label: "User",
    },
  };

  const config = modeConfig[profile.role?.toLowerCase()] || modeConfig.user;

  // Fields per mode
  const fields = {
    agent: [
      { label: "ID", value: profile.agentId || "N/A" },
      { label: "Properties", value: profile.propertiesManaged || 0 },
      {
        label: "Total Sales",
        value: `\u20A6${profile.totalSales?.toLocaleString() || 0}`,
      },
      { label: "Email", value: profile.email || "N/A" },
    ],
    estate: [
      {
        label: "Location",
        value: profile.location || "Unknown",
        icon: <FiMapPin />,
      },
      { label: "Size", value: `${profile.size || "N/A"} acres` },
      { label: "Listings", value: profile.listings || 0, icon: <FiHome /> },
      {
        label: "Avg Price",
        value: `\u20A6${profile.avgPrice?.toLocaleString() || 0}`,
        icon: <LuBadgeDollarSign />,
      },
      {
        label: "Agents",
        value: profile.manager || 0,
        icon: <IoBriefcaseOutline />,
      },
    ],
    user: [
      { label: "Favorites", value: profile.favorites?.length || 0 },
      { label: "Member Since", value: profile.joinedDate || "N/A" },
      { label: "Location", value: profile.location || "Unknown" },
      { label: "Recent Views", value: profile.recentViews?.length || 0 },
      { label: "Active Requests", value: profile.activeRequests || 0 },
    ],
  };

  return (
    <div className={`flex flex-col justify-center w-full`}>
      {/* Name + Badge */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-700 truncate">
          {profile.fullName}
        </h2>
        <span
          onClick={openRoleModal}
          className={`px-2 py-1 text-xs rounded-full font-medium cursor-pointer ${config.badge} flex items-center gap-2`}
        >
          {config.icon}
          {profile.modeTitle || config.label}
        </span>
      </div>

      {/* Mode-specific info */}
      <div className="mt-2 flex flex-wrap gap-3 text-sm text-gray-700 items-center">
        {fields[profile.mode?.toLowerCase() || "user"].map((f, i) => (
          <div key={i} className="flex items-center gap-1">
            {f.icon && f.icon}
            <span className="font-medium">{f.label}:</span>{" "}
            <span className="line-clamp-1">{f.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileCardCompact;
