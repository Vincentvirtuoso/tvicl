const ThirdStep = ({ handleChange, errors, formData }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Pricing Details</h2>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Price (NGN) *
        </label>
        <input
          type="number"
          name="priceAmount"
          value={formData.priceAmount}
          onChange={handleChange}
          min="0"
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent ${
            errors.priceAmount ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="e.g., 5000000"
        />
        {errors.priceAmount && (
          <p className="text-red-500 text-sm mt-1">{errors.priceAmount}</p>
        )}
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          name="negotiable"
          checked={formData.negotiable}
          onChange={handleChange}
          className="w-5 h-5 text-yellow-600 border-gray-300 rounded focus:ring-yellow-500"
        />
        <label className="ml-3 text-sm font-medium text-gray-700">
          Price is negotiable
        </label>
      </div>

      {formData.listingType === "For Sale" && (
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Transaction Type *
          </label>
          <select
            name="transactionType"
            value={formData.transactionType}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent ${
              errors.transactionType ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select transaction type</option>
            <option value="Off Plan">Off Plan</option>
            <option value="Outright">Outright</option>
            <option value="Installments">Installments</option>
            <option value="Mortgage">Mortgage</option>
            <option value="Rent to Own">Rent to Own</option>
          </select>
          {errors.transactionType && (
            <p className="text-red-500 text-sm mt-1">
              {errors.transactionType}
            </p>
          )}
        </div>
      )}

      {formData.listingType === "For Rent" && (
        <div className="space-y-6 border-t pt-6">
          <h3 className="text-lg font-semibold text-gray-800">
            Rental Details
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Rent Frequency
              </label>
              <select
                name="rentFrequency"
                value={formData.rentFrequency}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              >
                <option value="Monthly">Monthly</option>
                <option value="Quarterly">Quarterly</option>
                <option value="Yearly">Yearly</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Security Deposit (NGN)
              </label>
              <input
                type="number"
                name="depositAmount"
                value={formData.depositAmount}
                onChange={handleChange}
                min="0"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Lease Duration (Months)
              </label>
              <input
                type="number"
                name="leaseDurationMonths"
                value={formData.leaseDurationMonths}
                onChange={handleChange}
                min="0"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Service Charge (NGN)
              </label>
              <input
                type="number"
                name="serviceChargeAmount"
                value={formData.serviceChargeAmount}
                onChange={handleChange}
                min="0"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Service Charge Frequency
              </label>
              <select
                name="serviceChargeFrequency"
                value={formData.serviceChargeFrequency}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              >
                <option value="Monthly">Monthly</option>
                <option value="Quarterly">Quarterly</option>
                <option value="Yearly">Yearly</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Agency Fee (%)
              </label>
              <input
                type="number"
                name="agencyFeePercent"
                value={formData.agencyFeePercent}
                onChange={handleChange}
                min="0"
                max="100"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                placeholder="e.g., 10"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Caution Fee (NGN)
              </label>
              <input
                type="number"
                name="cautionFee"
                value={formData.cautionFee}
                onChange={handleChange}
                min="0"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex items-center mt-4">
            <input
              type="checkbox"
              name="petsAllowed"
              checked={formData.petsAllowed}
              onChange={handleChange}
              className="w-5 h-5 text-yellow-600 border-gray-300 rounded focus:ring-yellow-500"
            />
            <label className="ml-3 text-sm font-medium text-gray-700">
              Pets Allowed
            </label>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Preferred Tenants
            </label>
            <select
              name="preferredTenants"
              value={formData.preferredTenants}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            >
              <option value="Anyone">Anyone</option>
              <option value="Family">Family</option>
              <option value="Bachelor">Bachelor</option>
              <option value="Corporate">Corporate</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThirdStep;
