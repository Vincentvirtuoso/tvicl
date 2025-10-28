import { memo } from "react";

const SixthStep = ({ formData, errors, handleChange }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Contact Details</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Contact Name *
          </label>
          <input
            type="text"
            name="contactName"
            value={formData.contactName}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 ${
              errors.contactName ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.contactName && (
            <p className="text-red-500 text-sm mt-1">{errors.contactName}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Contact Phone *
          </label>
          <input
            type="text"
            name="contactPhone"
            value={formData.contactPhone}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 ${
              errors.contactPhone ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="+2348012345678"
          />
          {errors.contactPhone && (
            <p className="text-red-500 text-sm mt-1">{errors.contactPhone}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Contact Email *
          </label>
          <input
            type="email"
            name="contactEmail"
            value={formData.contactEmail}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 ${
              errors.contactEmail ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="you@example.com"
          />
          {errors.contactEmail && (
            <p className="text-red-500 text-sm mt-1">{errors.contactEmail}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Role *
          </label>
          <select
            name="contactRole"
            value={formData.contactRole}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 ${
              errors.contactRole ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select Role</option>
            <option value="Owner">Owner</option>
            <option value="Agent">Agent</option>
            <option value="Developer">Developer</option>
          </select>
          {errors.contactRole && (
            <p className="text-red-500 text-sm mt-1">{errors.contactRole}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(SixthStep);
