import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiCheck, FiX, FiAlertCircle } from "react-icons/fi";
import { MdOutlineAddHomeWork } from "react-icons/md";
import { IoBriefcaseOutline } from "react-icons/io5";
import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";
import AgentSection from "../section/becomeAgentOrAgency/AgentSection";
import CommonFields from "../section/becomeAgentOrAgency/CommonFields";
import EstateSection from "../section/becomeAgentOrAgency/EstateSection";

const roles = [
  {
    value: "agent",
    label: "Real Estate Agent",
    icon: <IoBriefcaseOutline className="text-3xl" />,
    description: "Individual property professionals",
  },
  {
    value: "estate",
    label: "Estate Agency",
    icon: <MdOutlineAddHomeWork className="text-3xl" />,
    description: "Property management companies",
  },
];

const specializationsOptions = [
  { value: "residential", label: "Residential" },
  { value: "commercial", label: "Commercial" },
  { value: "rental", label: "Rental" },
  { value: "luxury", label: "Luxury" },
];

export default function BecomeAgentOrAgency() {
  const { state } = useLocation();

  const [selectedRole, setSelectedRole] = useState(state?.role || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const { addProfile, user, updateRole } = useAuth();

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    address: "",
    licenseNumber: "",
    agencyName: "",
    yearsOfExperience: "",
    specializations: [],
    profilePhoto: null,
    verificationDocuments: [],
    estateName: "",
    contactEmail: "",
    registrationNumber: "",
    website: "",
    estateLogo: null,
    registrationDocuments: [],
  });

  const [preview, setPreview] = useState({
    profilePhoto: null,
    estateLogo: null,
    verificationDocuments: [],
    registrationDocuments: [],
  });

  // handle text/checkbox inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "specializations") {
      const updatedSpecs = checked
        ? [...form.specializations, value]
        : form.specializations.filter((s) => s !== value);
      setForm((prev) => ({ ...prev, specializations: updatedSpecs }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }

    setError(null);
  };

  // handle file uploads
  const handleFilePick =
    (name, multiple = false) =>
    (e) => {
      const files = multiple ? Array.from(e.target.files) : e.target.files[0];
      setForm((prev) => ({ ...prev, [name]: files }));

      if (!multiple && files && files.type.startsWith("image/")) {
        setPreview((prev) => ({ ...prev, [name]: URL.createObjectURL(files) }));
      }

      if (multiple) {
        const previews = files
          .filter((f) => f.type.startsWith("image/"))
          .map((f) => URL.createObjectURL(f));
        setPreview((prev) => ({ ...prev, [name]: previews }));
      }

      setError(null);
    };

  // remove files or images
  const removeFile = (field, index = null) => {
    if (index !== null) {
      const newFiles = Array.from(form[field]).filter((_, i) => i !== index);
      const newPreviews = preview[field].filter((_, i) => i !== index);
      setForm((prev) => ({ ...prev, [field]: newFiles }));
      setPreview((prev) => ({ ...prev, [field]: newPreviews }));
    } else {
      setForm((prev) => ({ ...prev, [field]: null }));
      setPreview((prev) => ({ ...prev, [field]: null }));
    }
  };

  // validate fields before submit
  const validateForm = () => {
    // Validation logic with messages
    if (!form.fullName.trim())
      return { field: "fullName", message: "Full name is required" };
    if (!form.phone.trim())
      return { field: "phone", message: "Phone number is required" };
    if (!form.address.trim())
      return { field: "address", message: "Address is required" };

    if (selectedRole === "agent") {
      if (!form.licenseNumber.trim())
        return {
          field: "licenseNumber",
          message: "License number is required",
        };
      if (!form.agencyName.trim())
        return { field: "agencyName", message: "Agency name is required" };
      if (!form.yearsOfExperience)
        return {
          field: "yearsOfExperience",
          message: "Years of experience is required",
        };
      if (form.specializations.length === 0)
        return {
          field: "specializations",
          message: "Please select at least one specialization",
        };
    }

    if (selectedRole === "estate") {
      if (!form.estateName.trim())
        return { field: "estateName", message: "Estate name is required" };
      if (!form.contactEmail.trim())
        return { field: "contactEmail", message: "Contact email is required" };
      if (!form.registrationNumber.trim())
        return {
          field: "registrationNumber",
          message: "Registration number is required",
        };

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(form.contactEmail))
        return {
          field: "contactEmail",
          message: "Please enter a valid email address",
        };
    }

    return null; // all good
  };

  // handle submission
  const handleSubmit = async () => {
    setError(null);
    setSuccess(false);

    if (!selectedRole) return setError("Please select a role");

    const validationError = validateForm();

    if (validationError) {
      const element = document.querySelector(
        `[name="${validationError.field}"]`
      );
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
        element.focus({ preventScroll: true });
      }

      // Show the detailed message in the UI (toast, alert, or inline)
      console.error(validationError.message);
      return setError(validationError.message);
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("role", selectedRole);
      const profileData = {};

      if (selectedRole === "agent") {
        profileData.licenseNumber = form.licenseNumber;
        profileData.agencyName = form.agencyName;
        profileData.yearsOfExperience = parseInt(form.yearsOfExperience) || 0;
        profileData.specializations = form.specializations;
        profileData.phone = form.phone;
        profileData.address = form.address;

        if (form.profilePhoto)
          formData.append("profilePhoto", form.profilePhoto);
        if (form.verificationDocuments?.length > 0)
          form.verificationDocuments.forEach((doc) =>
            formData.append("verificationDocuments", doc)
          );
      }

      if (selectedRole === "estate") {
        profileData.estateName = form.estateName;
        profileData.contactEmail = form.contactEmail;
        profileData.phone = form.phone;
        profileData.address = form.address;
        profileData.registrationNumber = form.registrationNumber;
        profileData.website = form.website;

        if (form.estateLogo) formData.append("estateLogo", form.estateLogo);
        if (form.registrationDocuments?.length > 0)
          form.registrationDocuments.forEach((doc) =>
            formData.append("registrationDocuments", doc)
          );
      }

      formData.append("profileData", JSON.stringify(profileData));

      const response = await addProfile({
        role: selectedRole,
        profileData: formData,
      });

      await updateRole({ role: user.activeRole, makeActive: selectedRole });

      setSuccess(true);
      setTimeout(
        () => (window.location.href = `/${selectedRole}/dashboard`),
        2000
      );
    } catch (err) {
      console.error("Profile creation error:", err);
      setError(err.message || "Failed to create profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 5000); // 5 seconds
      return () => clearTimeout(timer);
    }
  }, [error]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [selectedRole]);

  if (user?.roles?.some((r) => selectedRole?.includes(r))) {
    return <Navigate to={`/${selectedRole}/dashboard`} replace />;
  }

  return (
    <div className="min-h-screen mt-20">
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        {/* SUCCESS MESSAGE */}
        <AnimatePresence>
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3 text-green-800"
            >
              <FiCheck className="text-2xl text-green-600" />
              <div>
                <p className="font-semibold">Profile Created Successfully!</p>
                <p className="text-sm">Redirecting to dashboard...</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ERROR MESSAGE */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed right-4 top-20 mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-800 shadow-lg z-50"
            >
              <FiAlertCircle className="text-2xl text-red-600" />
              <div className="flex-1">
                <p className="font-semibold">Error</p>
                <p className="text-sm">{error}</p>
              </div>
              <button
                onClick={() => setError(null)}
                className="text-red-600 hover:text-red-800 transition-colors"
              >
                ✕
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* HERO */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Join TVICL Today
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Connect with clients, showcase properties, and grow your real estate
            business on Nigeria's leading platform.
          </p>
        </motion.div>

        {/* ROLE SELECTION */}
        {!selectedRole && (
          <motion.div
            className="grid md:grid-cols-2 gap-6 mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {roles.map((role) => (
              <motion.button
                key={role.value}
                onClick={() => setSelectedRole(role.value)}
                className="group bg-white p-8 rounded-2xl border-2 border-gray-200 hover:border-yellow-500 hover:shadow-xl transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex flex-col items-center text-center gap-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-2xl flex items-center justify-center text-yellow-600 group-hover:from-yellow-600 group-hover:to-orange-600 group-hover:text-white transition-all">
                    {role.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {role.label}
                    </h3>
                    <p className="text-gray-600">{role.description}</p>
                  </div>
                </div>
              </motion.button>
            ))}
          </motion.div>
        )}

        {/* ROLE FORM */}
        <AnimatePresence mode="wait">
          {selectedRole && (
            <motion.div
              className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {/* FORM HEADER */}
              <div className="bg-gradient-to-r from-yellow-600 to-orange-600 px-8 py-6 text-white flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    {roles.find((r) => r.value === selectedRole)?.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">
                      {selectedRole === "agent"
                        ? "Agent Registration"
                        : "Estate Agency Registration"}
                    </h3>
                    <p className="text-yellow-100 text-sm">
                      Complete your professional profile
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedRole(null)}
                  className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-colors"
                  disabled={loading}
                >
                  <FiX className="text-xl" />
                </button>
              </div>

              <div className="p-8 space-y-8">
                {/* COMMON FIELDS */}
                <CommonFields
                  form={form}
                  loading={loading}
                  handleChange={handleChange}
                />

                {/* AGENT SECTION */}
                {selectedRole === "agent" && (
                  <AgentSection
                    form={form}
                    preview={preview}
                    loading={loading}
                    handleChange={handleChange}
                    handleFilePick={handleFilePick}
                    removeFile={removeFile}
                    specializationsOptions={specializationsOptions}
                  />
                )}

                {/* ESTATE SECTION */}
                {selectedRole === "estate" && (
                  <EstateSection
                    form={form}
                    preview={preview}
                    loading={loading}
                    handleChange={handleChange}
                    handleFilePick={handleFilePick}
                    removeFile={removeFile}
                  />
                )}

                {/* SUBMIT BUTTON */}
                <div className="pt-6 border-t border-gray-200">
                  <button
                    onClick={handleSubmit}
                    disabled={loading || success}
                    className="w-full py-4 bg-gradient-to-r from-yellow-600 to-orange-600 text-white rounded-xl font-semibold text-lg hover:from-yellow-700 hover:to-orange-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg
                          className="animate-spin h-5 w-5"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Creating Account...
                      </span>
                    ) : success ? (
                      <span className="flex items-center justify-center gap-2">
                        <FiCheck className="text-xl" />
                        Account Created!
                      </span>
                    ) : (
                      "Create Account"
                    )}
                  </button>
                  <p className="text-center text-sm text-gray-500 mt-4">
                    By creating an account, you agree to our Terms of Service
                    and Privacy Policy.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
