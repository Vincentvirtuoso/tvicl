import { useEffect, useState, useCallback } from "react";

const PASSWORD_REGEX = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;

export const useRegisterForm = () => {
  // Step state
  const [step, setStep] = useState(0);
  const [role, setRole] = useState("buyer");

  const steps =
    role === "buyer"
      ? ["Role", "Personal", "Security", "Review"]
      : ["Role", "Personal", "Agency", "Security", "Review"];

  const DUMMY_AGENCIES = [
    {
      id: "AG001",
      name: "Premier Properties",
      rc: "RC-1001",
      address: "Victoria Island",
    },
    { id: "AG002", name: "GoldNest Realty", rc: "RC-1002", address: "Lekki" },
    { id: "AG003", name: "Urban Keys", rc: "RC-1003", address: "Ikoyi" },
  ];

  // Form data state
  const [data, setData] = useState({
    fullName: "",
    email: "",
    phone: "",
    licenseId: "",
    experienceYears: "",
    agencyName: "",
    agencyAddress: "",
    rcNumber: "",
    joinMode: "code",
    agencyCode: "",
    agencyQuery: "",
    agencySearchResults: DUMMY_AGENCIES,
    password: "",
    confirmPassword: "",
    agreeTos: false,
  });

  const [errors, setErrors] = useState({});

  const updateField = (key, value) => {
    setData((prev) => ({ ...prev, [key]: value }));

    // Clear error for this field immediately when corrected
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };

      // Field-level validation rules
      if (key === "fullName" && value.trim()) delete newErrors.fullName;
      if (key === "email" && /^\S+@\S+\.\S+$/.test(value))
        delete newErrors.email;
      if (key === "phone" && /^\+?\d{9,15}$/.test(value))
        delete newErrors.phone;
      if (key === "agencyCode" && value.trim()) delete newErrors.agencyCode;
      if (key === "agencyQuery" && value.trim()) delete newErrors.agencyQuery;
      if (key === "agencyName" && value.trim()) delete newErrors.agencyName;
      if (key === "agencyAddress" && value.trim())
        delete newErrors.agencyAddress;
      if (key === "rcNumber" && value.trim()) delete newErrors.rcNumber;
      if (key === "licenseId" && value.trim()) delete newErrors.licenseId;

      // Password fields
      if (key === "password" && PASSWORD_REGEX.test(value))
        delete newErrors.password;
      if (key === "confirmPassword" && value === data.password)
        delete newErrors.confirmPassword;
      if (key === "agreeTos" && value) delete newErrors.tos;

      return newErrors;
    });
  };

  // Validation logic for each step
  const validateStep = useCallback(
    (currStep = step) => {
      const e = {};

      if (currStep === 1) {
        if (!data.fullName.trim()) e.fullName = "Full name is required";
        if (!/^\S+@\S+\.\S+$/.test(data.email))
          e.email = "Valid email required";
        if (!/^\+?\d{9,15}$/.test(data.phone))
          e.phone = "Valid phone number required";
      }

      if (currStep === 2 && role !== "buyer") {
        if (role === "agent") {
          if (data.joinMode === "code" && !data.agencyCode.trim())
            e.agencyCode = "Agency code is required";
          if (data.joinMode === "create" && !data.agencyName.trim())
            e.agencyName = "Agency name is required";
          if (!data.licenseId.trim()) e.licenseId = "License ID is required";
        }
        if (role === "agency") {
          if (!data.agencyName.trim()) e.agencyName = "Agency name is required";
          if (!data.agencyAddress.trim())
            e.agencyAddress = "Agency address required";
          if (!data.rcNumber.trim()) e.rcNumber = "RC Number required";
        }
      }

      if (
        (role === "buyer" && currStep === 2) ||
        (!role === "buyer" && currStep === 3)
      ) {
        // Password validation
        if (!PASSWORD_REGEX.test(data.password))
          e.password =
            "Password must have 8+ characters, a number, and a symbol";
        if (data.password !== data.confirmPassword)
          e.confirmPassword = "Passwords do not match";
        if (!data.agreeTos) e.tos = "You must accept Terms";
      }

      setErrors(e);
      return Object.keys(e).length === 0;
    },
    [step, role, data]
  );

  const next = () => {
    if (!validateStep(step)) return;

    // Skip agency step for buyers
    if (role === "buyer" && step === 1) return setStep(2);
    // if (role === "buyer" && step === 2) return setStep(3);

    setStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const back = () => {
    setStep((prev) => Math.max(prev - 1, 0));
  };

  useEffect(() => {
    validateStep(step);
  }, [data]);

  return {
    step,
    steps,
    role,
    setRole,
    setStep,
    data,
    updateField,
    next,
    back,
    errors,
  };
};
