import InstallmentProgress from "../ui/InstallmentProgress";
import StatusBadge from "../ui/StatusBadge";

export default function GroupsTable({ groups = [], search = "", onView }) {
  const safeGroups = Array.isArray(groups) ? groups : [];

  const filtered = safeGroups.filter(
    (g) =>
      g.code?.toLowerCase().includes(search.toLowerCase()) ||
      String(g.value).includes(search),
  );

  return (
    <div className="bg-[#111827] border border-white/10 rounded-xl overflow-hidden">
      <table className="w-full text-sm">
        {/* ✅ TABLE HEADER */}
        <thead>
          <tr className="border-b border-white/10 text-gray-400">
            <th className="px-6 py-4 text-left">Group</th>
            <th className="px-6 py-4 text-left">Value</th>
            <th className="px-6 py-4 text-left">Installment</th>
            <th className="px-6 py-4 text-left">PNP</th>
            <th className="px-6 py-4 text-left">Treasury</th>
            <th className="px-6 py-4 text-left">Status</th>
            <th className="px-6 py-4 text-right">Action</th>
          </tr>
        </thead>

        {/* ✅ TABLE BODY */}
        <tbody>
          {filtered.map((group) => (
            <tr
              key={group.code}
              className="border-b border-white/5 hover:bg-white/5 transition"
            >
              <td className="px-6 py-4 font-medium">
                {group.code}
                <div className="text-xs text-gray-500">
                  Started {group.startDate}
                </div>
              </td>

              <td className="px-6 py-4">{group.value}</td>

              <td className="px-6 py-4">
                <InstallmentProgress value={group.installment_done} />
              </td>

              <td className="px-6 py-4">{group.pnp}</td>

              <td className="px-6 py-4">{group.treasury}</td>

              <td className="px-6 py-4">
                <StatusBadge status={group.status} />
              </td>

              <td className="px-6 py-4 text-right">
                <button
                  onClick={() => onView(group)}
                  className="text-blue-400 hover:text-blue-300"
                >
                  View
                </button>
              </td>
            </tr>
          ))}

          {filtered.length === 0 && (
            <tr>
              <td colSpan={7} className="px-6 py-10 text-center text-gray-500">
                No groups found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
