import React from "react";
import { motion } from "framer-motion";
import { FiSearch } from "react-icons/fi";

const AgentStep = ({
  variants,
  role,
  joinMode,
  agencyAddress,
  agencyCode,
  errors,
  agencyQuery,
  agencySearchResults,
  licenseId,
  agencyName,
  experienceYears,
  rcNumber,
  back,
  next,
  onChange,
}) => {
  return (
    <motion.div
      key="agency"
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
    >
      <h3 className="text-lg font-semibold mb-3">
        {role === "agent"
          ? "Agency Options & Agent Info"
          : "Agency Information"}
      </h3>
      <p className="text-sm text-gray-500 mb-4">
        {role === "agent"
          ? "Join an agency or create a new one. Provide license details."
          : "Enter your agency details."}
      </p>

      <div className="space-y-4">
        {role === "agent" && (
          <>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="joinMode"
                  checked={joinMode === "code"}
                  onChange={() => onChange("joinMode", "code")}
                />
                <span className="text-sm">Join by Agency Code</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="joinMode"
                  checked={joinMode === "search"}
                  onChange={() => onChange("joinMode", "search")}
                />
                <span className="text-sm">Search Agency</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="joinMode"
                  checked={joinMode === "create"}
                  onChange={() => onChange("joinMode", "create")}
                />
                <span className="text-sm">Create New Agency</span>
              </label>
            </div>

            {joinMode === "code" && (
              <div>
                <label className="text-sm">Agency Code</label>
                <input
                  value={agencyCode}
                  onChange={(e) => onChange("agencyCode", e.target.value)}
                  className="w-full mt-2 p-3 border border-gray-200 rounded-lg text-sm"
                  placeholder="e.g. AG001"
                />
                {errors.agencyCode && (
                  <div className="text-xs text-red-500 mt-1">
                    {errors.agencyCode}
                  </div>
                )}
              </div>
            )}

            {joinMode === "search" && (
              <div>
                <label className="text-sm">Search agency</label>
                <div className="flex gap-2 mt-2">
                  <div className="flex-1 relative">
                    <input
                      value={agencyQuery}
                      onChange={(e) => onChange("agencyQuery", e.target.value)}
                      className="w-full p-3 border border-gray-200 rounded-lg text-sm pr-10"
                      placeholder="Search by name or code"
                    />
                    <FiSearch className="absolute right-3 top-3 text-gray-400" />
                  </div>
                </div>
                <div className="mt-3 grid gap-2">
                  {agencySearchResults.map((a, index) => (
                    <label
                      key={a.id}
                      // type="label"
                      className="text-left p-3 border rounded-lg hover:bg-gray-50"
                    >
                      <input
                        type="radio"
                        onChange={() => {
                          onChange("agencyCode", a.id);
                          onChange("agencyName", a.name);
                          onChange("licenseId", a.id);
                          onChange("experienceYears", index + 2);
                        }}
                        checked={agencyName === a.name && agencyCode === a.id}
                      />
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">{a.name}</div>
                          <div className="text-xs text-gray-500">
                            {a.address} · {a.id}
                          </div>
                        </div>
                        <div className="text-xs text-gray-400">{a.id}</div>
                      </div>
                    </label>
                  ))}
                </div>
                {errors.agencyQuery && (
                  <div className="text-xs text-red-500 mt-1">
                    {errors.agencyQuery}
                  </div>
                )}
              </div>
            )}

            {joinMode === "create" && (
              <>
                <label className="text-sm">Agency Name</label>
                <input
                  value={agencyName}
                  onChange={(e) => onChange("agencyName", e.target.value)}
                  className="w-full mt-2 p-3 border border-gray-200 rounded-lg text-sm"
                  placeholder="Your agency name"
                />
                {errors.agencyName && (
                  <div className="text-xs text-red-500 mt-1">
                    {errors.agencyName}
                  </div>
                )}

                <label className="text-sm mt-3">Agency Address</label>
                <input
                  value={agencyAddress}
                  onChange={(e) => onChange("agencyAddress", e.target.value)}
                  className="w-full mt-2 p-3 border border-gray-200 rounded-lg text-sm"
                  placeholder="Agency address"
                />
              </>
            )}

            <label className="text-sm mt-3">License / Reg ID</label>
            <input
              value={licenseId}
              onChange={(e) => onChange("licenseId", e.target.value)}
              className="w-full mt-2 p-3 border border-gray-200 rounded-lg text-sm"
              placeholder="e.g. LIC-123456"
            />
            {errors.licenseId && (
              <div className="text-xs text-red-500 mt-1">
                {errors.licenseId}
              </div>
            )}

            <label className="text-sm mt-3">
              Years of experience (optional)
            </label>
            <input
              value={experienceYears}
              onChange={(e) => onChange("experienceYears", e.target.value)}
              className="w-full mt-2 p-3 border border-gray-200 rounded-lg text-sm"
              placeholder="e.g. 3"
            />
          </>
        )}

        {role === "agency" && (
          <>
            <label className="text-sm">Agency Legal / Business Name</label>
            <input
              value={agencyName}
              onChange={(e) => onChange("agencyName", e.target.value)}
              className="w-full mt-2 p-3 border border-gray-200 rounded-lg text-sm"
              placeholder="Business name"
            />
            {errors.agencyName && (
              <div className="text-xs text-red-500 mt-1">
                {errors.agencyName}
              </div>
            )}

            <label className="text-sm mt-3">Agency Address</label>
            <input
              value={agencyAddress}
              onChange={(e) => onChange("agencyAddress", e.target.value)}
              className="w-full mt-2 p-3 border border-gray-200 rounded-lg text-sm"
              placeholder="Office address"
            />
            {errors.agencyAddress && (
              <div className="text-xs text-red-500 mt-1">
                {errors.agencyAddress}
              </div>
            )}

            <label className="text-sm mt-3">RC / Corporate Reg. Number</label>
            <input
              value={rcNumber}
              onChange={(e) => onChange("rcNumber", e.target.value)}
              className="w-full mt-2 p-3 border border-gray-200 rounded-lg text-sm"
              placeholder="e.g. RC-2000"
            />
            {errors.rcNumber && (
              <div className="text-xs text-red-500 mt-1">{errors.rcNumber}</div>
            )}
          </>
        )}

        {role === "buyer" && (
          <div className="text-sm text-gray-500">
            No agency details required for buyers.
          </div>
        )}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <button onClick={back} className="px-4 py-2 rounded-md text-sm">
          Back
        </button>
        <button
          onClick={next}
          className="px-4 py-2 rounded-md bg-primary text-secondary font-semibold"
        >
          Continue
        </button>
      </div>
    </motion.div>
  );
};

export default AgentStep;
