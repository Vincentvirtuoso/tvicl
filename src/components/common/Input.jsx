export default function Input({
  label,
  name,
  value,
  editable = true,
  onChange,
  loading,
  required,
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}{" "}
      </label>
      {editable ? (
        <input
          name={name}
          value={value}
          onChange={onChange}
          placeholder={`Enter ${label.toLowerCase()}`}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
          disabled={loading}
        />
      ) : (
        <div className="w-full py-2 text-gray-700">{value}</div>
      )}
    </div>
  );
}
