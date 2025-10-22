const StepIndicator = ({ step, steps }) => (
  <div className="flex items-center gap-3 mb-4 py-2 justify-center">
    {steps.map((s, i) => (
      <div key={s} className="flex items-center gap-2">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
            i <= step
              ? "bg-primary text-secondary"
              : "bg-gray-200 text-gray-500"
          }`}
        >
          {i + 1}
        </div>

        {i < steps.length - 1 && <div className="w-6 h-px bg-gray-200" />}
      </div>
    ))}
  </div>
);

export default StepIndicator;
