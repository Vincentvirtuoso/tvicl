import { memo } from "react";
import { FaStar } from "react-icons/fa";
import { FiUpload } from "react-icons/fi";
import { LuCamera, LuCircleCheck, LuFileText, LuX } from "react-icons/lu";

const FileUpload = ({
  icon,
  label,
  required = false,
  removeFile,
  description = "",
  maxFiles = 1,
  minFiles = 1,
  progress,
  accept = "image/*",
  allowCaption = false,
  name,
  id,
  preview = [],
  errors = {},
  uploadPlaceholder = "Click on the upload button to upload",
  handleCaptionChange = null,
  handleFilesChange,
  loading = false,
  isCoverable = false,
  onSetPrimary = null,
}) => {
  const isMultiple = maxFiles > 1;

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <span className="text-2xl">{icon}</span>
            {label}
            {required && (
              <span className="text-xs bg-red-400/20 text-red-600 border-red-600 px-2 py-1 rounded">
                Required
              </span>
            )}
          </h3>
          {description && (
            <p className="text-sm text-gray-600 mt-1">{description}</p>
          )}
          {minFiles > 0 && (
            <p className="text-xs text-gray-500 mt-1">
              Minimum {minFiles} {minFiles === 1 ? "file" : "files"} required
            </p>
          )}
        </div>

        {progress === "complete" && (
          <div className="flex items-center gap-2 text-green-600">
            <LuCircleCheck size={20} />
            <span className="text-sm font-medium">Complete</span>
          </div>
        )}
      </div>

      {/* Upload Button */}
      <label
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer transition-colors
          ${
            loading
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-yellow-500 text-white hover:bg-yellow-600"
          }`}
      >
        {accept.includes("image") ? <LuCamera /> : <LuFileText />}
        <span>
          {preview.length === 0
            ? "Upload"
            : `Add More ${isMultiple ? "Files" : ""}`}
        </span>
        <input
          type="file"
          multiple={isMultiple}
          accept={accept}
          onChange={(e) => handleFilesChange(name, e)}
          className="hidden"
          disabled={loading}
        />
      </label>

      {errors[name] && (
        <p className="text-red-500 text-sm mt-2">{errors[name]}</p>
      )}

      {/* Preview Grid */}
      {preview.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
          {preview.map((file, idx) => (
            <div
              key={idx}
              className="relative border-2 border-gray-200 rounded-lg overflow-hidden hover:border-yellow-400 transition-colors group"
            >
              {/* Image/File preview */}
              {accept.includes("image") ? (
                <img
                  src={file.url}
                  alt={`${label} ${idx + 1}`}
                  className="w-full h-40 object-cover"
                />
              ) : (
                <div className="w-full h-40 flex items-center justify-center bg-gray-100 text-gray-500">
                  {file.name || `File ${idx + 1}`}
                </div>
              )}

              {/* Remove button */}
              <button
                type="button"
                onClick={() => removeFile(name, idx)}
                className="absolute top-2 right-2 text-white bg-red-600 rounded-full p-2 hover:bg-red-700 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                title="Remove"
              >
                <LuX size={14} />
              </button>

              {/* Cover/Primary selection */}
              {isCoverable && onSetPrimary && (
                <button
                  type="button"
                  onClick={() => onSetPrimary(name, idx)}
                  className={`absolute top-2 left-2 p-2 rounded-full shadow-lg transition-colors ${
                    file.isPrimary ? "bg-yellow-500 text-white" : "bg-gray-200"
                  }`}
                  title="Set as cover"
                >
                  <FaStar size={14} />
                </button>
              )}

              {/* Caption input */}
              {allowCaption && handleCaptionChange && (
                <div className="p-2 bg-white">
                  <input
                    type="text"
                    placeholder="Add caption (optional)"
                    value={file.caption || ""}
                    onChange={(e) =>
                      handleCaptionChange(name, idx, e.target.value)
                    }
                    className="w-full text-xs p-2 border border-gray-200 rounded focus:border-yellow-400 focus:outline-none"
                  />
                </div>
              )}

              {/* File index */}
              <div className="absolute bottom-2 left-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded">
                {idx + 1}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty state */}
      {preview.length === 0 && (
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-yellow-500 hover:bg-yellow-50 transition-all cursor-pointer group mt-4">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-yellow-100 transition-colors">
            <FiUpload className="text-3xl text-gray-400 group-hover:text-yellow-600 transition-colors" />
          </div>
          <p className="text-gray-700 font-medium mb-1">{uploadPlaceholder}</p>
        </div>
      )}
    </div>
  );
};

export default memo(FileUpload);
