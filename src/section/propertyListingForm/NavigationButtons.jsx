import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

const NavigationButtons = ({ step, validateStep, setStep }) => {
  const nextStep = () => {
    if (validateStep(step)) {
      setStep((prev) => Math.min(prev + 1, 7));
    }
  };

  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  return (
    <div className="flex justify-between mt-10">
      {step > 1 ? (
        <button
          type="button"
          onClick={prevStep}
          className="flex items-center px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
        >
          <LuChevronLeft className="w-5 h-5 mr-2" /> Back
        </button>
      ) : (
        <div />
      )}
      {step < 7 && (
        <button
          type="button"
          onClick={nextStep}
          className="flex items-center px-6 py-3 bg-yellow-600 text-white rounded-lg font-semibold hover:bg-yellow-700 transition-colors"
        >
          Next <LuChevronRight className="w-5 h-5 ml-2" />
        </button>
      )}
    </div>
  );
};

export default NavigationButtons;
