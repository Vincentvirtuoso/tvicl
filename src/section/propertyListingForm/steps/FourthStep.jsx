import { memo } from "react";

const FourthStep = ({ handleChange, errors, formData }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Property Details
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Furnishing Status *
          </label>
          <select
            name="furnishingStatus"
            value={formData.furnishingStatus}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 ${
              errors.furnishingStatus ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select</option>
            <option value="Furnished">Furnished</option>
            <option value="Semi-Furnished">Semi-Furnished</option>
            <option value="Unfurnished">Unfurnished</option>
          </select>
          {errors.furnishingStatus && (
            <p className="text-red-500 text-sm mt-1">
              {errors.furnishingStatus}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Property Condition *
          </label>
          <select
            name="propertyCondition"
            value={formData.propertyCondition}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 ${
              errors.propertyCondition ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select</option>
            <option value="Newly Built">Newly Built</option>
            <option value="Renovated">Renovated</option>
            <option value="Needs Renovation">Needs Renovation</option>
          </select>
          {errors.propertyCondition && (
            <p className="text-red-500 text-sm mt-1">
              {errors.propertyCondition}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Possession Status *
          </label>
          <select
            name="possessionStatus"
            value={formData.possessionStatus}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 ${
              errors.possessionStatus ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select</option>
            <option value="Ready to Move">Ready to Move</option>
            <option value="Under Construction">Under Construction</option>
            <option value="Vacant">Vacant</option>
          </select>
          {errors.possessionStatus && (
            <p className="text-red-500 text-sm mt-1">
              {errors.possessionStatus}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Available From
          </label>
          <input
            type="date"
            name="availableFrom"
            value={formData.availableFrom}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Year Built
          </label>
          <input
            type="number"
            name="yearBuilt"
            value={formData.yearBuilt}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
            placeholder="e.g., 2018"
          />
        </div>
      </div>
    </div>
  );
};

export default memo(FourthStep);
