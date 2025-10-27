import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiCheck,
  FiUpload,
  FiUser,
  FiPhone,
  FiFileText,
  FiX,
  FiImage,
  FiAlertCircle,
  FiBriefcase,
} from "react-icons/fi";
import { MdOutlineAddHomeWork } from "react-icons/md";
import { IoBriefcaseOutline } from "react-icons/io5";
import { useEffect } from "react";

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
  const [selectedRole, setSelectedRole] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

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
    if (!form.fullName.trim()) return "Full name is required";
    if (!form.phone.trim()) return "Phone number is required";
    if (!form.address.trim()) return "Address is required";

    if (selectedRole === "agent") {
      if (!form.licenseNumber.trim()) return "License number is required";
      if (!form.agencyName.trim()) return "Agency name is required";
      if (!form.yearsOfExperience) return "Years of experience is required";
      if (form.specializations.length === 0)
        return "Please select at least one specialization";
    }

    if (selectedRole === "estate") {
      if (!form.estateName.trim()) return "Estate name is required";
      if (!form.contactEmail.trim()) return "Contact email is required";
      if (!form.registrationNumber.trim())
        return "Registration number is required";

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(form.contactEmail))
        return "Please enter a valid email address";
    }

    return null;
  };

  // handle submission
  const handleSubmit = async () => {
    setError(null);
    setSuccess(false);

    if (!selectedRole) return setError("Please select a role");

    const validationError = validateForm();
    if (validationError) return setError(validationError);

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

      const response = await fetch("/api/users/add-profile", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to create profile");

      setSuccess(true);
      setTimeout(() => (window.location.href = "/dashboard"), 2000);
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
            Join Tvcil Today
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

/* ------------ SUBCOMPONENTS ------------ */

const CommonFields = ({ form, handleChange, loading }) => (
  <section className="space-y-6">
    <h4 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
      <FiUser className="text-yellow-600" /> Basic Information
    </h4>
    <div className="grid md:grid-cols-2 gap-6">
      <Input
        name="fullName"
        label="Full Name"
        required
        value={form.fullName}
        onChange={handleChange}
        loading={loading}
      />
      <Input
        name="phone"
        label="Phone Number"
        required
        value={form.phone}
        onChange={handleChange}
        loading={loading}
      />
    </div>
    <Input
      name="address"
      label="Address"
      required
      value={form.address}
      onChange={handleChange}
      loading={loading}
    />
  </section>
);

const Input = ({ name, label, required, value, onChange, loading }) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium text-gray-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      name={name}
      value={value}
      onChange={onChange}
      placeholder={`Enter ${label.toLowerCase()}`}
      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
      disabled={loading}
    />
  </div>
);

/* ------------ AGENT SECTION ------------ */
const AgentSection = ({
  form,
  preview,
  loading,
  handleChange,
  handleFilePick,
  removeFile,
}) => (
  <>
    {/* Professional Details */}
    <section className="space-y-6">
      <h4 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
        <FiBriefcase className="text-yellow-600" />
        Professional Details
      </h4>
      <div className="grid md:grid-cols-2 gap-6">
        <Input
          name="licenseNumber"
          label="License Number"
          required
          value={form.licenseNumber}
          onChange={handleChange}
          loading={loading}
        />
        <Input
          name="agencyName"
          label="Agency Name"
          required
          value={form.agencyName}
          onChange={handleChange}
          loading={loading}
        />
        <Input
          name="yearsOfExperience"
          label="Years of Experience"
          required
          value={form.yearsOfExperience}
          onChange={handleChange}
          loading={loading}
        />
      </div>

      {/* Specializations */}
      <div>
        <p className="text-sm font-medium text-gray-700 mb-2">
          Specializations <span className="text-red-500">*</span>
        </p>
        <div className="flex flex-wrap gap-3">
          {specializationsOptions.map((spec) => (
            <label
              key={spec.value}
              className="flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg hover:bg-yellow-50 transition-colors cursor-pointer"
            >
              <input
                type="checkbox"
                name="specializations"
                value={spec.value}
                checked={form.specializations.includes(spec.value)}
                onChange={handleChange}
                disabled={loading}
              />
              <span className="text-gray-700 text-sm">{spec.label}</span>
            </label>
          ))}
        </div>
      </div>
    </section>

    {/* Profile Photo Upload */}
    <UploadImage
      label="Profile Photo"
      icon={<FiImage className="text-yellow-600" />}
      fileName="profilePhoto"
      preview={preview.profilePhoto}
      handleFilePick={handleFilePick}
      removeFile={removeFile}
      loading={loading}
    />

    {/* Verification Documents */}
    <UploadMultiple
      label="Verification Documents"
      icon={<FiFileText className="text-yellow-600" />}
      fileName="verificationDocuments"
      previews={preview.verificationDocuments}
      handleFilePick={handleFilePick}
      removeFile={removeFile}
      loading={loading}
    />
  </>
);

/* ------------ ESTATE SECTION ------------ */
const EstateSection = ({
  form,
  preview,
  loading,
  handleChange,
  handleFilePick,
  removeFile,
}) => (
  <>
    {/* Estate Details */}
    <section className="space-y-6">
      <h4 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
        <FiBriefcase className="text-yellow-600" />
        Estate Details
      </h4>
      <div className="grid md:grid-cols-2 gap-6">
        <Input
          name="estateName"
          label="Estate Name"
          required
          value={form.estateName}
          onChange={handleChange}
          loading={loading}
        />
        <Input
          name="contactEmail"
          label="Contact Email"
          required
          value={form.contactEmail}
          onChange={handleChange}
          loading={loading}
        />
        <Input
          name="registrationNumber"
          label="Registration Number"
          required
          value={form.registrationNumber}
          onChange={handleChange}
          loading={loading}
        />
        <Input
          name="website"
          label="Website"
          value={form.website}
          onChange={handleChange}
          loading={loading}
        />
      </div>
    </section>

    {/* Logo Upload */}
    <UploadImage
      label="Company Logo"
      icon={<FiImage className="text-yellow-600" />}
      fileName="estateLogo"
      preview={preview.estateLogo}
      handleFilePick={handleFilePick}
      removeFile={removeFile}
      loading={loading}
    />

    {/* Registration Documents */}
    <UploadMultiple
      label="Registration Documents"
      icon={<FiFileText className="text-yellow-600" />}
      fileName="registrationDocuments"
      previews={preview.registrationDocuments}
      handleFilePick={handleFilePick}
      removeFile={removeFile}
      loading={loading}
    />
  </>
);

/* ------------ UPLOAD COMPONENTS ------------ */
const UploadImage = ({
  label,
  icon,
  fileName,
  preview,
  handleFilePick,
  removeFile,
  loading,
}) => (
  <section className="space-y-6 mb-8">
    <h4 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
      {icon}
      {label}
    </h4>
    <div className="space-y-4">
      {!preview ? (
        <label className="block">
          <input
            type="file"
            accept="image/*"
            onChange={handleFilePick(fileName)}
            className="hidden"
            disabled={loading}
          />
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-yellow-500 hover:bg-yellow-50 transition-all cursor-pointer group">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-yellow-100 transition-colors">
              <FiUpload className="text-3xl text-gray-400 group-hover:text-yellow-600 transition-colors" />
            </div>
            <p className="text-gray-700 font-medium mb-1">Click to upload</p>
            <p className="text-sm text-gray-500">PNG, JPG, SVG up to 10MB</p>
          </div>
        </label>
      ) : (
        <div className="relative group">
          <img
            src={preview}
            alt={`${label} preview`}
            className="w-full h-64 object-contain bg-gray-50 rounded-xl border-2 border-gray-200"
          />
          {!loading && (
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center gap-4">
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFilePick(fileName)}
                  className="hidden"
                />
                <div className="px-4 py-2 bg-white rounded-lg font-medium text-sm hover:bg-gray-100 transition-colors">
                  Change
                </div>
              </label>
              <button
                onClick={() => removeFile(fileName)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg font-medium text-sm hover:bg-red-600 transition-colors"
              >
                Remove
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  </section>
);

const UploadMultiple = ({
  label,
  icon,
  fileName,
  previews,
  handleFilePick,
  removeFile,
  loading,
}) => (
  <section className="space-y-6">
    <h4 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
      {icon}
      {label}
    </h4>
    <label className="block">
      <input
        type="file"
        accept="image/*,application/pdf"
        multiple
        onChange={handleFilePick(fileName, true)}
        className="hidden"
        disabled={loading}
      />
      <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-yellow-500 hover:bg-yellow-50 transition-all cursor-pointer">
        <FiUpload className="text-4xl text-gray-400 mx-auto mb-3" />
        <p className="text-gray-700 font-medium mb-1">
          Upload {label.toLowerCase()}
        </p>
        <p className="text-sm text-gray-500">Multiple files allowed</p>
      </div>
    </label>
    {previews?.length > 0 && (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {previews.map((src, i) => (
          <div key={i} className="relative group">
            <img
              src={src}
              alt={`${label} ${i + 1}`}
              className="w-full h-32 object-cover rounded-lg border-2 border-gray-200"
            />
            {!loading && (
              <button
                onClick={() => removeFile(fileName, i)}
                className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
              >
                <FiX />
              </button>
            )}
          </div>
        ))}
      </div>
    )}
  </section>
);
