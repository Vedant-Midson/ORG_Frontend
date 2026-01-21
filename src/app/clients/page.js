"use client";

import { useState } from "react";

export default function ClientsPage() {
  const [search, setSearch] = useState("");

  const clients = [
    {
      min: "198",
      name: "Rakesh Kapoor",
      mobile: "98XXXXXX12",
      groups: "10C1",
      status: "Active",
    },
    {
      min: "158",
      name: "Manoj Batra",
      mobile: "97XXXXXX45",
      groups: "10C1",
      status: "Active",
    },
    {
      min: "144",
      name: "Kapil Arora",
      mobile: "99XXXXXX88",
      groups: "12B2",
      status: "Inactive",
    },
  ];

  const filtered = clients.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.min.includes(search)
  );

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Clients</h1>
          <p className="text-sm text-gray-400 mt-1">
            All registered members across chit groups
          </p>
        </div>

        <button className="
          bg-gradient-to-r from-blue-600 to-orange-500
          px-5 py-2 rounded-lg text-sm font-medium
          hover:opacity-90 transition
        ">
          + Add Client
        </button>
      </div>

      {/* Search & Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <input
          type="text"
          placeholder="Search by name or MIN number"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            col-span-2 bg-[#111827] border border-white/10
            rounded-lg px-4 py-3 text-sm
            placeholder-gray-500 focus:outline-none
            focus:border-blue-500
          "
        />

        <div className="bg-[#111827] border border-white/10 rounded-lg p-4">
          <p className="text-sm text-gray-400">Total Clients</p>
          <p className="text-2xl font-semibold mt-1">248</p>
        </div>

      </div>

      {/* Clients Table */}
      <div className="bg-[#111827] border border-white/10 rounded-xl overflow-hidden">

        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10 text-gray-400">
              <th className="px-6 py-4 text-left font-medium">MIN</th>
              <th className="px-6 py-4 text-left font-medium">Client Name</th>
              <th className="px-6 py-4 text-left font-medium">Mobile</th>
              <th className="px-6 py-4 text-left font-medium">Groups</th>
              <th className="px-6 py-4 text-left font-medium">Status</th>
              <th className="px-6 py-4 text-right font-medium">Action</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((client) => (
              <tr
                key={client.min}
                className="border-b border-white/5 hover:bg-white/5 transition"
              >
                <td className="px-6 py-4 font-medium">
                  {client.min}
                </td>

                <td className="px-6 py-4">
                  {client.name}
                </td>

                <td className="px-6 py-4 text-gray-300">
                  {client.mobile}
                </td>

                <td className="px-6 py-4">
                  {client.groups}
                </td>

                <td className="px-6 py-4">
                  <StatusBadge status={client.status} />
                </td>

                <td className="px-6 py-4 text-right">
                  <button className="text-blue-400 hover:text-blue-300 text-sm">
                    View
                  </button>
                </td>
              </tr>
            ))}

            {filtered.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-10 text-center text-gray-500"
                >
                  No clients found
                </td>
              </tr>
            )}
          </tbody>
        </table>

      </div>

    </div>
  );
}

/* ---------------- SMALL COMPONENTS ---------------- */

function StatusBadge({ status }) {
  const styles =
    status === "Active"
      ? "bg-green-500/15 text-green-400"
      : "bg-red-500/15 text-red-400";

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium ${styles}`}
    >
      {status}
    </span>
  );
}
