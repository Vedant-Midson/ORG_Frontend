export default function Select({ label, options = [], ...props }) {
  return (
    <div className="space-y-1">
      <label className="text-xs text-gray-400">{label}</label>

      <select
        {...props}
        className="
          w-full bg-[#0B1220] border border-white/10
          rounded-lg px-4 py-2 text-sm
          focus:outline-none focus:border-blue-500
        "
      >
        <option value="">Select</option>

        {options.map((opt) => {
          // ✅ support both string & object
          if (typeof opt === "string") {
            return (
              <option key={opt} value={opt}>
                {opt}
              </option>
            );
          }

          return (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          );
        })}
      </select>
    </div>
  );
}
