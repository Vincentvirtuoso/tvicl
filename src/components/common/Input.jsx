export default function Input({ label, name, value, editable, onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      {editable ? (
        <input
          name={name}
          value={value}
          onChange={onChange}
          className="w-full border border-secondary/30 rounded-lg px-3 py-2 text-[15px]"
        />
      ) : (
        <div className="w-full py-2 text-gray-700">{value}</div>
      )}
    </div>
  );
}
