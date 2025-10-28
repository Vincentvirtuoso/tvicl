import React, { useState } from "react";
import {
  LuChevronRight,
  LuChevronLeft,
  LuHouse as Home,
  LuMapPin,
  LuDollarSign,
  LuFileText,
  LuCheck as Check,
} from "react-icons/lu";

import { FaNairaSign } from "react-icons/fa6";
import FirstStep from "../section/propertyListingForm/steps/FirstStep";
import SecondStep from "../section/propertyListingForm/steps/SecondStep";
import { useEffect } from "react";
import { useRef } from "react";
import ThirdStep from "../section/propertyListingForm/steps/ThirdStep";
import FourthStep from "../section/propertyListingForm/steps/FourthStep";
import FifthStep from "../section/propertyListingForm/steps/FifthStep";
import SixthStep from "../section/propertyListingForm/steps/SixthStep";
import ReviewStep from "../section/propertyListingForm/steps/ReviewStep";
import NavigationButtons from "../section/propertyListingForm/NavigationButtons";
import { fields, steps } from "../assets/propertyListingForm";
import MediaUploadStep from "../section/propertyListingForm/MediaUploadStep";

const PropertyListingForm = () => {
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState(fields);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validateStep = (currentStep) => {
    const newErrors = {};

    if (currentStep === 1) {
      if (!formData.title.trim()) newErrors.title = "Title is required";
      if (!formData.description.trim())
        newErrors.description = "Description is required";
      if (!formData.propertyType)
        newErrors.propertyType = "Property type is required";
      if (!formData.listingType)
        newErrors.listingType = "Listing type is required";

      const requiresFlatType = [
        "Flat/Apartment",
        "Serviced Apartment",
        "Block of Flats",
      ];
      if (
        requiresFlatType.includes(formData.propertyType) &&
        !formData.flatType
      ) {
        newErrors.flatType = "Flat type is required for this property type";
      }
    }

    if (currentStep === 2) {
      if (!formData.area.trim()) newErrors.area = "Area is required";
      if (!formData.city.trim()) newErrors.city = "City is required";
      if (!formData.state) newErrors.state = "State is required";
    }

    if (currentStep === 3) {
      if (!formData.priceAmount || formData.priceAmount <= 0) {
        newErrors.priceAmount = "Valid price is required";
      }
      if (formData.listingType === "For Sale" && !formData.transactionType) {
        newErrors.transactionType =
          "Transaction type is required for sale listings";
      }
      if (formData.listingType === "For Rent" && !formData.rentFrequency) {
        newErrors.rentFrequency = "Rent frequency is required";
      }
    }

    if (currentStep === 4) {
      if (!formData.furnishingStatus)
        newErrors.furnishingStatus = "Furnishing status is required";
      if (!formData.propertyCondition)
        newErrors.propertyCondition = "Property condition is required";
      if (!formData.possessionStatus)
        newErrors.possessionStatus = "Possession status is required";
    }

    if (currentStep === 6) {
      if (!formData.contactName.trim())
        newErrors.contactName = "Contact name is required";
      if (!formData.contactPhone.trim())
        newErrors.contactPhone = "Contact phone is required";
      if (!formData.contactEmail.trim())
        newErrors.contactEmail = "Contact email is required";
      if (!formData.contactRole)
        newErrors.contactRole = "Contact role is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep(step)) {
      console.log("Form submitted:", formData);
      alert("Property listing submitted successfully! Check console for data.");
    }
  };

  const divRef = useRef(null);

  useEffect(() => {
    if (divRef.current && step > 1) {
      divRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [step, errors]);

  return (
    <div className="min-h-screen" ref={divRef}>
      <div className="max-w-5xl mx-auto w-full">
        {/* Progress Steps */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-start justify-between relative w-full py-4 px-2">
            {steps.map((s, idx) => {
              const isActive = step >= s.num;
              const isCompleted = step > s.num;

              return (
                <div
                  key={s.num}
                  className="flex flex-col items-center flex-1 z-1"
                >
                  {/* Circle */}
                  <div
                    className={`flex items-center justify-center w-9 h-9 rounded-full border-2 transition-all duration-300
            ${
              isActive
                ? "bg-yellow-600 border-yellow-600 text-white shadow-md"
                : "bg-white border-gray-300 text-gray-500"
            }`}
                  >
                    <s.icon className="w-4 h-4" />
                  </div>

                  {/* Label */}
                  <span
                    className={`mt-2 text-xs font-semibold text-center transition-colors duration-300
            ${isActive ? "text-yellow-700" : "text-gray-500"}`}
                  >
                    {s.title}
                  </span>
                </div>
              );
            })}

            {/* active progress line overlay */}
          </div>
        </div>

        {/* Form Content */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-lg p-8"
        >
          {/* Step 1: Basic Info */}
          {step === 1 && (
            <FirstStep
              formData={formData}
              handleChange={handleChange}
              errors={errors}
            />
          )}

          {/* Step 2: Location */}
          {step === 2 && (
            <SecondStep
              formData={formData}
              handleChange={handleChange}
              errors={errors}
            />
          )}

          {/* Step 3: Pricing */}
          {step === 3 && (
            <ThirdStep
              handleChange={handleChange}
              errors={errors}
              formData={formData}
            />
          )}

          {/* Step 4: Details */}
          {step === 4 && (
            <FourthStep
              handleChange={handleChange}
              errors={errors}
              formData={formData}
            />
          )}

          {/* Step 5: Features */}
          {step === 5 && (
            <MediaUploadStep
              formData={formData}
              setFormData={setFormData}
              errors={errors}
              setErrors={setErrors}
            />
          )}

          {/* Step 6: Features */}
          {step === 6 && (
            <FifthStep
              handleChange={handleChange}
              formData={formData}
              setFormData={setFormData}
            />
          )}

          {/* Step 7: Contact */}
          {step === 7 && (
            <SixthStep
              formData={formData}
              handleChange={handleChange}
              errors={errors}
            />
          )}

          {/* Step 8: Review */}
          {step === 8 && <ReviewStep />}

          {/* Navigation Buttons */}
          <NavigationButtons
            setStep={setStep}
            step={step}
            validateStep={validateStep}
          />
        </form>
      </div>
    </div>
  );
};

export default PropertyListingForm;
