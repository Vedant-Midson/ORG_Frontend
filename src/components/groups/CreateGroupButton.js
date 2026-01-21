import Link from "next/link";

export default function CreateGroupButton() {
  return (
    <Link href="/groups/create">
      <button
        className="
          bg-gradient-to-r from-blue-600 to-orange-500
          px-5 py-2 rounded-lg text-sm font-medium
          hover:opacity-90 transition
        "
      >
        + Create Group
      </button>
    </Link>
  );
}
