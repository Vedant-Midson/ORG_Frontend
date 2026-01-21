export default function InstallmentProgress({ value }) {
  const total = 15;
  const percent = Math.round((value / total) * 100);

  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs text-gray-400">
        <span>{value}</span>
        <span>{percent}%</span>
      </div>
      <div className="h-2 bg-white/10 rounded-full">
        <div
          className="h-full bg-gradient-to-r from-blue-600 to-orange-500"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
