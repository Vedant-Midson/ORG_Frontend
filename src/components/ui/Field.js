export default function Field({ label, ...props }) {
  return (
    <div className="space-y-1">
      <label className="text-sm text-gray-400">{label}</label>
      <input
        {...props}
        className="
          w-full bg-[#0f172a] border border-white/10
          rounded-lg px-4 py-3 text-sm
          placeholder-gray-500
          focus:outline-none focus:border-blue-500
        "
      />
    </div>
  );
}
