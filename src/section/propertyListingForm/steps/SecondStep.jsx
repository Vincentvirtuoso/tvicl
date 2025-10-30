import { nigerianStates } from "../../../assets/propertyListingForm";

const SecondStep = ({ formData, handleChange, errors }) => {
  const addressField = formData.address;
  const locationField = formData.location;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Property Location
      </h2>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Street Address
        </label>
        <input
          type="text"
          name="address.street"
          value={addressField.street}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
          placeholder="e.g., 123 Admiralty Way"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Area *
          </label>
          <input
            type="text"
            name="address.area"
            value={addressField.area}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent ${
              errors.area ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="e.g., Lekki Phase 1, Ikeja GRA"
          />
          {errors.area && (
            <p className="text-red-500 text-sm mt-1">{errors.area}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            City *
          </label>
          <input
            type="text"
            name="address.city"
            value={addressField.city}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent ${
              errors.city ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="e.g., Lagos, Abuja"
          />
          {errors.city && (
            <p className="text-red-500 text-sm mt-1">{errors.city}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            State *
          </label>
          <select
            name="address.state"
            value={addressField.state}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent ${
              errors.state ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select state</option>
            {nigerianStates.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
          {errors.state && (
            <p className="text-red-500 text-sm mt-1">{errors.state}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            LGA (Local Government Area)
          </label>
          <input
            type="text"
            name="address.lga"
            value={addressField.lga}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            placeholder="e.g., Eti-Osa"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Postal Code
          </label>
          <input
            type="text"
            name="address.postalCode"
            value={addressField.postalCode}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            placeholder="e.g., 101245"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Landmark
          </label>
          <input
            type="text"
            name="address.landmark"
            value={addressField.landmark}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            placeholder="e.g., Near Shoprite Mall"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Latitude (optional)
          </label>
          <input
            type="number"
            name="location.coordinates[0]"
            value={locationField.coordinates}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            placeholder="e.g., 6.4541"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Longitude (optional)
          </label>
          <input
            type="text"
            name="longitude"
            value={locationField.longitude}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            placeholder="e.g., 3.3947"
          />
        </div>
      </div>
    </div>
  );
};

export default SecondStep;
