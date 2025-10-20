export default function TextArea({ label, name, value, editable, onChange }) {
  return (
    <div className="md:col-span-2">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      {editable ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          rows={4}
          className="w-full border border-secondary/30 text-[15px] rounded-lg px-3 py-2 resize-none"
        />
      ) : (
        <div className="w-full rounded-lg py-2 text-gray-700">{value}</div>
      )}
    </div>
  );
}
