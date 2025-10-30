import { motion } from "framer-motion";
import { HiOutlineMail, HiOutlinePhone } from "react-icons/hi";
import { LuHourglass, LuSquareCheck, LuTriangleAlert } from "react-icons/lu";
import { getInitials } from "../../utils/helper";

const normalizeUrl = (raw) => {
  if (!raw) return "";
  let trimmed = raw.trim();

  trimmed = trimmed.replace(/^https?:\/\//i, "");
  if (trimmed.includes("www.")) trimmed = trimmed.replace("www.", "");

  return `https://${trimmed}`;
};

const DashboardHeader = ({
  user,
  role,
  agent,
  estate,
  agentLoading,
  estateLoading,
}) => {
  const loading = agentLoading || estateLoading;

  const isAgent = role === "agent";
  const profile = isAgent ? agent : estate;

  const name = isAgent
    ? profile?.agencyName || "Your agency"
    : profile?.estateName || "Your estate";

  const verified = profile?.verified;
  const hasSubmittedDocs = isAgent
    ? (profile?.verificationDocuments?.length || 0) > 0
    : (profile?.registrationDocuments?.length || 0) > 0;

  const lastLogin = profile?.lastLogin
    ? new Date(profile.lastLogin).toLocaleString()
    : null;

  // avatar sources
  const avatarSrc = isAgent ? profile?.profilePhoto : profile?.estateLogo;
  const initials = getInitials(user?.fullName || "");

  // rating safe formatting
  const rating =
    typeof agent?.ratings === "number" ? agent.ratings.toFixed(1) : "0.0";
  const reviewsCount = agent?.reviewsCount || 0;
  const listingsCount = (agent?.propertiesListed || []).length || 0;

  // verification JSX
  let verificationStatus;
  if (verified) {
    verificationStatus = (
      <p className="text-green-600 text-xs italic mt-1 font-medium">
        <LuSquareCheck className="inline-flex mr-1" />
        Verified Profile — your documents have been approved.
      </p>
    );
  } else if (hasSubmittedDocs) {
    verificationStatus = (
      <p className="text-yellow-600 text-xs italic mt-1 font-medium">
        <LuHourglass className="inline-flex mr-1" />
        Verification Pending — your documents are under review.
      </p>
    );
  } else {
    verificationStatus = (
      <p className="text-red-500 text-xs italic mt-1 font-medium">
        <LuTriangleAlert className="inline-flex mr-1" />
        Not Verified — please upload your documents to start verification.
      </p>
    );
  }

  const website = estate?.website ? normalizeUrl(estate.website) : "";

  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8 bg-white shadow-sm rounded-2xl p-6 border border-gray-100"
    >
      {loading ? (
        /* skeleton including avatar block */
        <div className="flex items-center gap-6 animate-pulse">
          <div className="h-14 w-14 rounded-full bg-gray-200" />
          <div className="flex-1 space-y-3">
            <div className="h-6 bg-gray-200 rounded w-1/3" />
            <div className="h-4 bg-gray-200 rounded w-2/5" />
            <div className="h-3 bg-gray-200 rounded w-1/4" />
          </div>
          <div className="w-36">
            <div className="h-6 bg-gray-200 rounded w-full" />
          </div>
        </div>
      ) : (
        <div className="flex items-start justify-between flex-wrap gap-6">
          {/* LEFT: avatar + main details */}
          <div className="flex items-start gap-4">
            {/* Avatar */}
            <div className="flex-shrink-0">
              {avatarSrc ? (
                <img
                  src={avatarSrc}
                  alt={`${name} logo`}
                  className="h-29 w-20 rounded-2xl object-cover border border-gray-100"
                />
              ) : (
                <div className="h-29 w-20 rounded-2xl bg-gray-100 flex items-center justify-center text-lg font-semibold text-gray-700 border border-gray-100">
                  {initials}
                </div>
              )}
            </div>

            <div>
              <h2 className="text-gray-800 text-xl font-semibold flex items-center gap-2">
                <span>
                  Welcome back,&nbsp;
                  <span className="font-bold text-gray-900">
                    {user.fullName}
                  </span>
                </span>
              </h2>

              <p className="text-gray-600 mt-1 text-sm">
                Managing {isAgent ? "agency" : "estate"}:{" "}
                <span className="font-medium text-gray-800">{name}</span>
              </p>

              {verificationStatus}

              {lastLogin && (
                <p className="text-gray-500 text-xs mt-1">
                  Last login: {lastLogin}
                </p>
              )}

              {/* role-specific summary */}
              {isAgent ? (
                <div className="mt-3 text-sm text-gray-600 space-y-1">
                  <p>
                    🧠 Experience:{" "}
                    <span className="font-medium text-gray-800">
                      {agent?.yearsOfExperience || 0} years
                    </span>
                  </p>

                  <p>
                    <span className="flex items-center gap-2">
                      <span className="text-yellow-600 font-medium">
                        ⭐ {rating}
                      </span>
                      <span className="text-gray-500">
                        ({reviewsCount} reviews)
                      </span>
                    </span>
                  </p>

                  <p>
                    🏘️ Listings:{" "}
                    <span className="font-medium text-gray-800">
                      {listingsCount}
                    </span>{" "}
                    active properties
                  </p>
                </div>
              ) : (
                <div className="mt-3 text-sm text-gray-600 space-y-1">
                  <p className="line-clamp-1 ">
                    🌐 Website:{" "}
                    {website ? (
                      <a
                        href={website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {estate.website}
                      </a>
                    ) : (
                      <span className="text-gray-500">Not provided</span>
                    )}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-gray-600">
                    {estate?.contactEmail && (
                      <span className="flex items-center gap-1 text-sm">
                        <HiOutlineMail /> {estate.contactEmail}
                      </span>
                    )}
                    {estate?.phone && (
                      <span className="flex items-center gap-1 text-sm">
                        <HiOutlinePhone /> {estate.phone}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: metric badge */}
          <div className="text-left">
            <p className="text-gray-500 text-sm mb-1">
              Overview of your {role} metrics
            </p>
            <span
              className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
                isAgent
                  ? "bg-blue-100 text-blue-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {isAgent ? "Agent Dashboard" : "Estate Dashboard"}
            </span>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default DashboardHeader;
