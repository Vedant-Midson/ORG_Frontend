"use client";

import StatusBadge from "@/components/ui/StatusBadge";

export default function ClientViewModal({ client, onClose }) {
  if (!client) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
      <div className="bg-[#111827] border border-white/10 rounded-xl w-full max-w-2xl">

        {/* HEADER */}
        <div className="px-6 py-4 border-b border-white/10 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Client Details</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            ✕
          </button>
        </div>

        {/* CONTENT */}
        <div className="p-6 space-y-6 text-sm">

          {/* BASIC INFO */}
          <div className="grid grid-cols-2 gap-4">
            <Info label="MIN Number" value={client.min_number} />
            <Info label="Full Name" value={client.full_name} />
            <Info label="Mobile" value={client.mobile} />
            <Info label="Collector" value={client.collector_name || "-"} />
            <Info label="Reference Code" value={client.reference_code || "-"} />
            <Info
              label="Status"
              value={<StatusBadge status={client.status} />}
            />
          </div>

          {/* GROUPS */}
          <div>
            <p className="text-gray-400 mb-2">Groups</p>
            {client.groups?.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {client.groups.map((g) => (
                  <span
                    key={g.id}
                    className="
                      px-2 py-1 text-xs rounded-md
                      bg-white/5 text-gray-300
                      border border-white/10
                    "
                  >
                    {g.group_code}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-xs">Not assigned to any group</p>
            )}
          </div>

          {/* CREATED DATE */}
          <div>
            <p className="text-gray-400">Joined On</p>
            <p>
              {new Date(client.created_at).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </p>
          </div>
        </div>

        {/* FOOTER */}
        <div className="px-6 py-4 border-t border-white/10 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

/* -------- SMALL HELPER -------- */
function Info({ label, value }) {
  return (
    <div>
      <p className="text-gray-400">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
}
