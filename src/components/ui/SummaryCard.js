export default function SummaryCard({ title, value }) {
  return (
    <div className="bg-[#111827] border border-white/10 rounded-lg p-4">
      <p className="text-sm text-gray-400">{title}</p>
      <p className="text-2xl font-semibold mt-1">{value}</p>
    </div>
  );
}
