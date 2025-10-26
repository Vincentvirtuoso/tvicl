import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FiCheck,
  FiUpload,
  FiUser,
  FiMapPin,
  FiPhone,
  FiGlobe,
  FiFileText,
} from "react-icons/fi";
import { MdOutlineAddHomeWork } from "react-icons/md";
import { IoBriefcaseOutline } from "react-icons/io5";
import { useAuth } from "../hooks/useAuth";
import { useToast } from "../context/ToastManager";

const roles = [
  {
    value: "agent",
    label: "Agent",
    icon: <IoBriefcaseOutline className="text-2xl" />,
  },
  {
    value: "estate",
    label: "Estate",
    icon: <MdOutlineAddHomeWork className="text-2xl" />,
  },
];

const specializationsOptions = [
  "residential",
  "commercial",
  "rental",
  "luxury",
];

export default function BecomeAgentOrAgency() {
  const { addProfile, loading, user } = useAuth();
  const { addToast } = useToast();

  const [selectedRole, setSelectedRole] = useState(null);
  const [form, setForm] = useState({
    // Common fields
    fullName: user.fullName || "",
    phone: user.phone || "",
    address: "",

    // Agent fields
    licenseNumber: "",
    agencyName: "",
    yearsOfExperience: "",
    specializations: [],
    profilePhoto: null,
    verificationDocuments: [],

    // Estate fields
    estateName: "",
    contactEmail: "",
    registrationNumber: "",
    website: "",
    estateLogo: null,
    registrationDocuments: [],
  });

  // Previews
  const [preview, setPreview] = useState({
    profilePhoto: null,
    estateLogo: null,
    verificationDocuments: [],
    registrationDocuments: [],
  });

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
  };

  const handleFilePick =
    (name, multiple = false) =>
    (e) => {
      const files = multiple ? Array.from(e.target.files) : e.target.files[0];
      setForm((prev) => ({ ...prev, [name]: files }));

      // Previews
      if (!multiple && files && files.type.startsWith("image/")) {
        setPreview((prev) => ({ ...prev, [name]: URL.createObjectURL(files) }));
      }
      if (multiple) {
        const previews = files
          .filter((f) => f.type.startsWith("image/"))
          .map((f) => URL.createObjectURL(f));
        setPreview((prev) => ({ ...prev, [name]: previews }));
      }
    };

  const handleSubmit = async () => {
    if (!selectedRole) return addToast("Please select a role", "error");

    try {
      const formData = new FormData();

      // Common fields
      formData.append("fullName", form.fullName);
      formData.append("phone", form.phone);
      formData.append("address", form.address);
      formData.append("role", selectedRole);

      if (selectedRole === "agent") {
        formData.append("licenseNumber", form.licenseNumber);
        formData.append("agencyName", form.agencyName);
        formData.append("yearsOfExperience", form.yearsOfExperience || 0);
        form.specializations.forEach((spec) =>
          formData.append("specializations[]", spec)
        );
        if (form.profilePhoto)
          formData.append("profilePhoto", form.profilePhoto);
        form.verificationDocuments.forEach((doc) =>
          formData.append("verificationDocuments[]", doc)
        );
      }

      if (selectedRole === "estate") {
        formData.append("estateName", form.estateName);
        formData.append("contactEmail", form.contactEmail);
        formData.append("phone", form.phone);
        formData.append("registrationNumber", form.registrationNumber);
        formData.append("website", form.website);
        if (form.estateLogo) formData.append("estateLogo", form.estateLogo);
        form.registrationDocuments.forEach((doc) =>
          formData.append("registrationDocuments[]", doc)
        );
      }

      await addProfile(formData, true);
      addToast(
        `${
          selectedRole === "agent" ? "Agent" : "Estate"
        } account created successfully`,
        "success"
      );
    } catch (err) {
      addToast(err.message || "Failed to update role", "error");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <motion.div
        className="px-6 py-24 max-w-5xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Role Selection */}
        <motion.div
          className="flex justify-center gap-6 mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {roles.map((r) => (
            <button
              key={r.value}
              onClick={() => setSelectedRole(r.value)}
              className={`flex flex-col items-center gap-2 p-6 rounded-xl border-2 transition-all ${
                selectedRole === r.value
                  ? "border-primary bg-primary/10 shadow-md"
                  : "border-gray-200 hover:border-primary"
              }`}
            >
              {r.icon}
              <span className="font-semibold">{r.label}</span>
              {selectedRole === r.value && (
                <FiCheck className="text-green-600 mt-1" />
              )}
            </button>
          ))}
        </motion.div>

        {/* Form */}
        <motion.div
          className="bg-white p-8 rounded-xl shadow-md space-y-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {/* Common Fields */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              <label className="font-medium mb-1 flex items-center gap-2">
                <FiUser /> Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-primary/80"
              />
            </div>

            <div className="flex flex-col">
              <label className="font-medium mb-1 flex items-center gap-2">
                <FiPhone /> Phone
              </label>
              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-primary/80"
              />
            </div>

            <div className="flex flex-col">
              <label className="font-medium mb-1 flex items-center gap-2">
                <FiMapPin /> Address
              </label>
              <input
                type="text"
                name="address"
                value={form.address}
                onChange={handleChange}
                className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-primary/80"
              />
            </div>
          </div>

          {/* Agent Form */}
          {selectedRole === "agent" && (
            <div className="flex flex-col gap-4">
              <div className="flex flex-col">
                <label className="font-medium mb-1">License Number</label>
                <input
                  type="text"
                  name="licenseNumber"
                  value={form.licenseNumber}
                  onChange={handleChange}
                  className="border border-gray-300 px-3 py-2 rounded-md"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-medium mb-1">Agency Name</label>
                <input
                  type="text"
                  name="agencyName"
                  value={form.agencyName}
                  onChange={handleChange}
                  className="border border-gray-300 px-3 py-2 rounded-md"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-medium mb-1">Years of Experience</label>
                <input
                  type="number"
                  name="yearsOfExperience"
                  value={form.yearsOfExperience}
                  onChange={handleChange}
                  className="border border-gray-300 px-3 py-2 rounded-md"
                />
              </div>

              <div className="flex flex-col">
                <span className="font-medium mb-1">Specializations</span>
                <div className="flex flex-wrap gap-2">
                  {specializationsOptions.map((spec) => (
                    <label key={spec} className="flex items-center gap-1">
                      <input
                        type="checkbox"
                        name="specializations"
                        value={spec}
                        checked={form.specializations.includes(spec)}
                        onChange={handleChange}
                      />
                      <span>{spec}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Profile Photo Upload */}
              <div className="flex flex-col">
                <label className="font-medium mb-1">Profile Photo</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFilePick("profilePhoto")}
                />
                {preview.profilePhoto && (
                  <img
                    src={preview.profilePhoto}
                    alt="Preview"
                    className="w-32 h-32 object-cover mt-2 rounded-md"
                  />
                )}
              </div>

              {/* Verification Documents */}
              <div className="flex flex-col">
                <label className="font-medium mb-1">
                  Verification Documents
                </label>
                <input
                  type="file"
                  accept="image/*,application/pdf"
                  multiple
                  onChange={handleFilePick("verificationDocuments", true)}
                />
                {preview.verificationDocuments.length > 0 &&
                  preview.verificationDocuments.map((p, i) => (
                    <img
                      key={i}
                      src={p}
                      className="w-24 h-24 object-cover mt-2 rounded-md"
                    />
                  ))}
              </div>
            </div>
          )}

          {/* Estate Form */}
          {selectedRole === "estate" && (
            <div className="flex flex-col gap-4">
              <div className="flex flex-col">
                <label className="font-medium mb-1">Estate Name</label>
                <input
                  type="text"
                  name="estateName"
                  value={form.estateName}
                  onChange={handleChange}
                  className="border border-gray-300 px-3 py-2 rounded-md"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-medium mb-1">Contact Email</label>
                <input
                  type="email"
                  name="contactEmail"
                  value={form.contactEmail}
                  onChange={handleChange}
                  className="border border-gray-300 px-3 py-2 rounded-md"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-medium mb-1">Registration Number</label>
                <input
                  type="text"
                  name="registrationNumber"
                  value={form.registrationNumber}
                  onChange={handleChange}
                  className="border border-gray-300 px-3 py-2 rounded-md"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-medium mb-1">Website</label>
                <input
                  type="text"
                  name="website"
                  value={form.website}
                  onChange={handleChange}
                  className="border border-gray-300 px-3 py-2 rounded-md"
                />
              </div>

              {/* Estate Logo */}
              <div className="flex flex-col">
                <label className="font-medium mb-1">Estate Logo</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFilePick("estateLogo")}
                />
                {preview.estateLogo && (
                  <img
                    src={preview.estateLogo}
                    className="w-32 h-32 object-cover mt-2 rounded-md"
                  />
                )}
              </div>

              {/* Registration Documents */}
              <div className="flex flex-col">
                <label className="font-medium mb-1">
                  Registration Documents
                </label>
                <input
                  type="file"
                  accept="image/*,application/pdf"
                  multiple
                  onChange={handleFilePick("registrationDocuments", true)}
                />
                {preview.registrationDocuments.length > 0 &&
                  preview.registrationDocuments.map((p, i) => (
                    <img
                      key={i}
                      src={p}
                      className="w-24 h-24 object-cover mt-2 rounded-md"
                    />
                  ))}
              </div>
            </div>
          )}

          <button
            onClick={handleSubmit}
            className="mt-4 w-full py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition"
          >
            {loading.addProfile ? "Submitting..." : "Create Account"}
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
