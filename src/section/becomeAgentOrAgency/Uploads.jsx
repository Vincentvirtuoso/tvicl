import { FiUpload, FiX } from "react-icons/fi";
import { LuFilePlus2 } from "react-icons/lu";

export const UploadImage = ({
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

export const UploadMultiple = ({
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
        <LuFilePlus2 className="text-4xl text-gray-400 mx-auto mb-3" />
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
