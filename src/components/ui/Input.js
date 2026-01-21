export default function Input({ label, ...props }) {
  return (
    <div className="space-y-1">
      <label className="text-xs text-gray-400">{label}</label>
      <input
        {...props}
        className="
          w-full bg-[#0B1220] border border-white/10
          rounded-lg px-4 py-2 text-sm
          focus:outline-none focus:border-blue-500
        "
      />
    </div>
  );
}
