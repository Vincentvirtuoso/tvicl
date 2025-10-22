import React from "react";
import { motion } from "framer-motion";

const ReviewStep = ({
  variants,
  review,
  role,
  submitRegistration,
  submitting,
  back,
}) => {
  return (
    <motion.div
      key="review"
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
    >
      <h3 className="text-lg font-semibold mb-3">Review</h3>
      <p className="text-sm text-gray-500 mb-4">
        Make sure everything looks right before submitting.
      </p>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <div className="text-gray-600">Account type</div>
          <div className="font-medium capitalize">{role}</div>
        </div>
        <div className="flex justify-between">
          <div className="text-gray-600">Full name</div>
          <div className="font-medium">{review.fullName}</div>
        </div>
        <div className="flex justify-between">
          <div className="text-gray-600">Email</div>
          <div className="font-medium">{review.email}</div>
        </div>
        <div className="flex justify-between">
          <div className="text-gray-600">Phone</div>
          <div className="font-medium">{review.phone}</div>
        </div>

        {role === "agent" && (
          <>
            <div className="flex justify-between">
              <div className="text-gray-600">License ID</div>
              <div className="font-medium">{review.licenseId || "-"}</div>
            </div>
            <div className="flex justify-between">
              <div className="text-gray-600">Agency</div>
              <div className="font-medium">{review.agencyName || "N/A"}</div>
            </div>
          </>
        )}

        {role === "agency" && (
          <>
            <div className="flex justify-between">
              <div className="text-gray-600">Agency</div>
              <div className="font-medium">{review.agencyName}</div>
            </div>
            <div className="flex justify-between">
              <div className="text-gray-600">RC Number</div>
              <div className="font-medium">{review.rcNumber}</div>
            </div>
          </>
        )}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <button
          onClick={back}
          className="bg-gray-500/10 px-4 py-2 rounded-md text-sm"
        >
          Back
        </button>

        <button
          onClick={submitRegistration}
          disabled={submitting}
          className={`px-4 py-2 rounded-md font-semibold text-sm ${
            submitting
              ? "bg-gray-300 text-gray-600"
              : "bg-primary text-secondary"
          }`}
        >
          {submitting ? "Submitting..." : "Create account"}
        </button>
      </div>
    </motion.div>
  );
};

export default ReviewStep;
