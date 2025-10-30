import React, { useState, useEffect, useRef } from "react";
import FirstStep from "../section/propertyListingForm/steps/FirstStep";
import SecondStep from "../section/propertyListingForm/steps/SecondStep";
import ThirdStep from "../section/propertyListingForm/steps/ThirdStep";
import FourthStep from "../section/propertyListingForm/steps/FourthStep";
import FifthStep from "../section/propertyListingForm/steps/FifthStep";
import SixthStep from "../section/propertyListingForm/steps/SixthStep";
import ReviewStep from "../section/propertyListingForm/steps/ReviewStep";
import NavigationButtons from "../section/propertyListingForm/NavigationButtons";
import MediaUploadStep from "../section/propertyListingForm/MediaUploadStep";
import {
  fields,
  generateMediaCategories,
  steps,
} from "../assets/propertyListingForm";
import { usePropertyAPI } from "../hooks/useProperty";
import { useToast } from "../context/ToastManager";

const PropertyListingForm = () => {
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState(fields);

  const { createProperty, isLoading } = usePropertyAPI();
  const { addToast } = useToast();
  const divRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData((prev) => {
      const updated = { ...prev };
      const keys = name.replace(/\]/g, "").split(/\.|\[/); // supports dot + bracket syntax
      let current = updated;

      // Traverse nested structure
      for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i];
        if (!current[key]) current[key] = {};
        current = current[key];
      }

      // Assign value
      current[keys[keys.length - 1]] = newValue;

      return updated;
    });

    // Clear error if user edits that field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  /** ✅ Validate per step */
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

    // ✅ Step 5: Media Validation
    if (currentStep === 5) {
      const categories = generateMediaCategories(formData);
      const media = formData.mediaByCategory || {};

      categories.forEach((cat) => {
        const images = media[cat.id] || [];
        const min = cat.minImages || 0;

        if (cat.required && images.length < min) {
          newErrors[cat.id] = `At least ${min} ${
            min === 1 ? "photo" : "photos"
          } required for ${cat.label}`;
        }
      });

      if (!media.cover || media.cover.length === 0) {
        newErrors.cover = "Please upload a cover photo";
      }
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

  /** 🚀 Submit to backend via hook */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateStep(step)) return;

    try {
      const res = await createProperty(formData);

      addToast("Property listing created successfully!", "success");
      console.log("Created property:", res.data);

      // Optionally reset form
      setFormData(fields);
      setStep(1);
    } catch (err) {
      console.error(err);
      addToast(
        err.response?.data?.message || "Failed to create property.",
        "error"
      );
    }
  };

  /** 🔄 Scroll to top when step changes */
  useEffect(() => {
    if (divRef.current && step > 1) {
      divRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [step, errors]);

  return (
    <div className="min-h-screen" ref={divRef}>
      <div className="max-w-5xl mx-auto w-full">
        {/* Steps indicator */}
        <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
          <div className="flex items-start justify-between gap-1 relative w-full py-4 px-2 flex-wrap">
            {steps.map((s) => {
              const isActive = step >= s.num;
              return (
                <div
                  key={s.num}
                  className="flex flex-col items-center flex-1 z-1"
                >
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
                  <span
                    className={`mt-2 text-xs font-semibold text-center whitespace-nowrap transition-colors duration-300
              ${isActive ? "text-yellow-700" : "text-gray-500"}`}
                  >
                    {s.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-lg p-8"
        >
          {step === 1 && (
            <FirstStep
              formData={formData}
              handleChange={handleChange}
              errors={errors}
            />
          )}
          {step === 2 && (
            <SecondStep
              formData={formData}
              handleChange={handleChange}
              errors={errors}
            />
          )}
          {step === 3 && (
            <ThirdStep
              formData={formData}
              handleChange={handleChange}
              errors={errors}
            />
          )}
          {step === 4 && (
            <FourthStep
              formData={formData}
              handleChange={handleChange}
              errors={errors}
            />
          )}
          {step === 5 && (
            <MediaUploadStep
              formData={formData}
              setFormData={setFormData}
              errors={errors}
              setErrors={setErrors}
            />
          )}
          {step === 6 && (
            <FifthStep
              formData={formData}
              handleChange={handleChange}
              setFormData={setFormData}
            />
          )}
          {step === 7 && (
            <SixthStep
              formData={formData}
              handleChange={handleChange}
              errors={errors}
            />
          )}
          {step === 8 && <ReviewStep formData={formData} />}

          <NavigationButtons
            setStep={setStep}
            step={step}
            validateStep={validateStep}
            isLoading={isLoading("createProperty")} // 🧠 using loading map
          />
        </form>
      </div>
    </div>
  );
};

export default PropertyListingForm;
