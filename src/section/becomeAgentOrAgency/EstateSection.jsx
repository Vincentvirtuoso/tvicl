import { FiBriefcase, FiFileText, FiImage } from "react-icons/fi";
import { UploadImage, UploadMultiple } from "./Uploads";
import Input from "../../components/common/Input";
import { MdOutlineSquareFoot } from "react-icons/md";

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
        <MdOutlineSquareFoot className="text-yellow-600" />
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

export default EstateSection;
