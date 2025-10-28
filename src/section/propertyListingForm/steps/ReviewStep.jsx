const ReviewStep = () => {
  return (
    <div className="space-y-6 text-center">
      <Check className="w-16 h-16 text-yellow-600 mx-auto mb-4" />
      <h2 className="text-2xl font-bold text-gray-800">Review & Submit</h2>
      <p className="text-gray-600 mb-4">
        Please review your property details before submission. Once confirmed,
        click below to finalize.
      </p>
      <button
        type="submit"
        className="px-8 py-3 bg-yellow-600 text-white rounded-lg font-semibold hover:bg-yellow-700 transition-colors"
      >
        Submit Property Listing
      </button>
    </div>
  );
};

export default ReviewStep;
