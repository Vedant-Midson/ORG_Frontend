export default function StatusBadge({ status }) {
  const styles =
    status === "Active" || status === "ACTIVE"
      ? "bg-green-500/15 text-green-400"
      : "bg-gray-500/20 text-gray-400";

  return (
    <span className={`px-3 py-1 rounded-full text-xs ${styles}`}>{status}</span>
  );
}
