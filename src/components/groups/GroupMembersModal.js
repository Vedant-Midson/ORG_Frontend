export default function GroupMembersModal({
  group,
  members,
  loading,
  onClose,
}) {
  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
      <div className="bg-[#111827] border border-white/10 rounded-xl w-full max-w-3xl">
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/10 flex justify-between">
          <h2 className="text-lg font-semibold">
            Group {group.code} – Members
          </h2>
          <button onClick={onClose}>✕</button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {loading ? (
            <p className="text-center text-gray-400">Loading members...</p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="text-gray-400 border-b border-white/10">
                  <th className="py-3 text-left">Ticket</th>
                  <th className="py-3 text-left">MIN</th>
                  <th className="py-3 text-left">Name</th>
                  <th className="py-3 text-left">Mobile No.</th>
                </tr>
              </thead>
              <tbody>
                {members.map((m, i) => (
                  <tr key={i} className="border-b border-white/5">
                    <td className="py-3">{m.ticket_number}</td>
                    <td className="py-3">{m.member_id}</td>
                    <td className="py-3">{m.member_name}</td>
                    <td className="py-3">{m.mobile}</td>
                  </tr>
                ))}
                {members.length === 0 && (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-gray-500">
                      No members in this group
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>

        {/* Footer */}
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
