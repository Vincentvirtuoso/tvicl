import { useMemo } from "react";

const PasswordStrength = ({ pw }) => {
  const score = useMemo(() => {
    let s = 0;
    if (pw.length >= 8) s++;
    if (/[0-9]/.test(pw)) s++;
    if (/[!@#$%^&*]/.test(pw)) s++;
    return s;
  }, [pw]);

  const labels = ["Weak", "Fair", "Strong"];
  const widths = ["w-1/3", "w-2/3", "w-full"];

  return (
    <div className="mt-2">
      <div className="h-2 bg-gray-200 rounded overflow-hidden">
        <div
          aria-hidden
          className={`h-full ${score > 0 ? widths[score - 1] : "w-0"} rounded ${
            score === 1
              ? "bg-red-400"
              : score === 2
              ? "bg-primary"
              : "bg-emerald-400"
          }`}
        />
      </div>
      <div className="text-xs mt-1.5 text-gray-500">
        {score > 0 ? labels[score - 1] : "Too short"}
      </div>
    </div>
  );
};

export default PasswordStrength;
