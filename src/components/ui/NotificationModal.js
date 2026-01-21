"use client";

export default function NotificationModal({
  open,
  type = "success", // success | error | info
  title,
  message,
  onClose,
}) {
  if (!open) return null;

  const styles = {
    success: "border-green-500/30 text-green-400",
    error: "border-red-500/30 text-red-400",
    info: "border-blue-500/30 text-blue-400",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div
        className="
          bg-[#0B1220] border border-white/10
          rounded-xl w-full max-w-sm
          p-6 shadow-xl
          animate-fadeIn
        "
      >
        {/* HEADER */}
        <div className="flex justify-between items-start">
          <h3 className={`text-sm font-semibold ${styles[type]}`}>
            {title}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-300"
          >
            ✕
          </button>
        </div>

        {/* BODY */}
        <p className="text-sm text-gray-400 mt-3">
          {message}
        </p>

        {/* ACTION */}
        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="
              px-4 py-1.5 text-sm rounded-lg
              bg-white/5 hover:bg-white/10
              transition
            "
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}
