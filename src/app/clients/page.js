"use client";

import { useState } from "react";
import Link from "next/link";

import StatusBadge from "@/components/ui/StatusBadge";
import { useClients } from "@/hooks/useClient";
import ClientViewModal from "@/components/clients/ClientViewModal";

export default function ClientsPage() {
  const [search, setSearch] = useState("");
  const { clients, loading } = useClients();

  const [selectedClient, setSelectedClient] = useState(null);

  /* ---------------- FILTER ---------------- */
  const normalizedSearch = search.trim().toLowerCase();

  const filtered = Array.isArray(clients)
    ? clients.filter((c) => {
        if (!normalizedSearch) return true;

        return (
          c.full_name.toLowerCase().includes(normalizedSearch) ||
          c.min_number.includes(normalizedSearch)
        );
      })
    : [];
  console.log(">>>>>>>>>>>>>>>>>>>>>>", clients);
  /* ---------------- DATE FORMAT ---------------- */
  function formatDate(dateStr) {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Clients</h1>
          <p className="text-sm text-gray-400 mt-1">
            All registered members across chit groups
          </p>
        </div>

        <Link href="/clients/create">
          <button
            className="
              bg-gradient-to-r from-blue-600 to-orange-500
              px-5 py-2 rounded-lg text-sm font-medium
              hover:opacity-90 transition
            "
          >
            + Add Client
          </button>
        </Link>
      </div>

      {/* SEARCH + STATS */}
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
          <p className="text-2xl font-semibold mt-1">{clients.length}</p>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-[#111827] border border-white/10 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10 text-gray-400">
              <th className="px-6 py-4 text-left">MIN</th>
              <th className="px-6 py-4 text-left">Client Name</th>
              <th className="px-6 py-4 text-left">Mobile</th>
              <th className="px-6 py-4 text-left">Groups</th>
              <th className="px-6 py-4 text-left">Joined On</th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {loading && (
              <tr>
                <td
                  colSpan={7}
                  className="px-6 py-10 text-center text-gray-500"
                >
                  Loading clients...
                </td>
              </tr>
            )}

            {!loading &&
              filtered.map((client) => (
                <tr
                  key={client.min}
                  className="border-b border-white/5 hover:bg-white/5 transition"
                >
                  <td className="px-6 py-4 font-medium">{client.min_number}</td>
                  <td className="px-6 py-4">{client.full_name}</td>
                  <td className="px-6 py-4 text-gray-300">{client.mobile}</td>
                  <td className="px-6 py-4">
                    {Array.isArray(client.groups) &&
                    client.groups.length > 0 ? (
                      <div className="flex flex-wrap gap-2 items-center">
                        {client.groups.slice(0, 2).map((g) => (
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

                        {client.groups.length > 2 && (
                          <span
                            title={client.groups
                              .map((g) => g.group_code)
                              .join(", ")}
                            className="
            px-2 py-1 text-xs rounded-md
            bg-white/10 text-gray-400
            border border-white/10
            cursor-help
          "
                          >
                            +{client.groups.length - 2} more
                          </span>
                        )}
                      </div>
                    ) : (
                      <span className="text-gray-500 text-xs">—</span>
                    )}
                  </td>

                  <td className="px-6 py-4 text-gray-400">
                    {formatDate(client.created_at)}
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={client.status} />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => setSelectedClient(client)}
                      className="text-blue-400 hover:text-blue-300 text-sm"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}

            {!loading && filtered.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="px-6 py-10 text-center text-gray-500"
                >
                  No clients found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {selectedClient && (
        <ClientViewModal
          client={selectedClient}
          onClose={() => setSelectedClient(null)}
        />
      )}
    </div>
  );
}
