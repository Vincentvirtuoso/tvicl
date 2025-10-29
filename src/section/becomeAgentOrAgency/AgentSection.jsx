import { FiBriefcase, FiFileText, FiImage } from "react-icons/fi";
import Input from "../../components/common/Input";
import { UploadImage, UploadMultiple } from "./Uploads";

const AgentSection = ({
  form,
  preview,
  loading,
  handleChange,
  handleFilePick,
  removeFile,
  specializationsOptions = [],
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

export default AgentSection;
