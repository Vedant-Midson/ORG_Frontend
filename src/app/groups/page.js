"use client";

import { useState,useEffect } from "react";
import Link from "next/link";

const API_BASE = "http://127.0.0.1:8000";

async function getGroups() {
  const res = await fetch(`${API_BASE}/groups/`);
  return res.json();
}

async function getGroupMembers(groupId) {
  const res = await fetch(`${API_BASE}/memberships/group/${groupId}`);
  return res.json();
}


export default function GroupsPage() {
  const [groups, setGroups] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [groupMembers, setGroupMembers] = useState([]);
  const [loadingMembers, setLoadingMembers] = useState(false);

 useEffect(() => {
  getGroups().then((data) => {
    const normalized = data.map((g) => ({
      id: g.id,
      code: g.group_code,
      value: g.group_value,
      totalMembers: g.total_members,
      duration: g.duration_months,
      monthlyAmount: g.monthly_amount,
      startDate: g.start_date,
      status: g.status || "Active",
      installment_done: g.installments_done || 2,
      pnp:g.pnp || 0,
      treasury:g.treasury || 0,
      
    }));
    console.log("Fetched groups:", normalized);
    setGroups(normalized);
  });
}, []);


 const filtered = groups.filter((g) => {
  const code = g.code ?? "";
  const value = g.value ?? "";

  return (
    code.toLowerCase().includes(search.toLowerCase()) ||
    String(value).includes(search)
  );
});


  async function openGroup(group) {
    setSelectedGroup(group);
    setLoadingMembers(true);
    const members = await getGroupMembers(group.id);
    console.log("Fetched members for group", group.code, members);
    setGroupMembers(members);
    setLoadingMembers(false);
  }

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Groups</h1>
          <p className="text-sm text-gray-400 mt-1">
            Detailed view of all chit fund groups
          </p>
        </div>
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
      </div>

      {/* SEARCH + SUMMARY */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

        <input
          type="text"
          placeholder="Search by group code or value"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            md:col-span-2 bg-[#111827] border border-white/10
            rounded-lg px-4 py-3 text-sm
            placeholder-gray-500 focus:outline-none
            focus:border-blue-500
          "
        />

        <SummaryCard title="Active Groups" value="12" />
        <SummaryCard title="Completed Groups" value="5" />

      </div>

      {/* GROUPS TABLE */}
      <div className="bg-[#111827] border border-white/10 rounded-xl overflow-hidden">

        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10 text-gray-400">
              <th className="px-6 py-4 text-left">Group</th>
              <th className="px-6 py-4 text-left">Value</th>
              <th className="px-6 py-4 text-left">Installment</th>
              <th className="px-6 py-4 text-left">Next Auction</th>
              <th className="px-6 py-4 text-left">PNP</th>
              <th className="px-6 py-4 text-left">Treasury</th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>

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

                <td className="px-6 py-4">{group.nextAuction}</td>

                <td className="px-6 py-4">{group.pnp}</td>

                <td className="px-6 py-4">{group.treasury}</td>

                <td className="px-6 py-4">
                  <StatusBadge status={group.status} />
                </td>

                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => openGroup(group)}
                    className="text-blue-400 hover:text-blue-300"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}

            {filtered.length === 0 && (
              <tr>
                <td
                  colSpan={8}
                  className="px-6 py-10 text-center text-gray-500"
                >
                  No groups found
                </td>
              </tr>
            )}
          </tbody>
        </table>

      </div>
        {selectedGroup && (
        <GroupMembersModal
          group={selectedGroup}
          members={groupMembers}
          loading={loadingMembers}
          onClose={() => setSelectedGroup(null)}
        />
      )}

    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

function SummaryCard({ title, value }) {
  return (
    <div className="bg-[#111827] border border-white/10 rounded-lg p-4">
      <p className="text-sm text-gray-400">{title}</p>
      <p className="text-2xl font-semibold mt-1">{value}</p>
    </div>
  );
}

function StatusBadge({ status }) {
  const styles =
    status === "Active" || status === "ACTIVE"
      ? "bg-green-500/15 text-green-400"
      : "bg-gray-500/20 text-gray-400";

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles}`}>
      {status}
    </span>
  );
}

function InstallmentProgress({ value }) {
  const total = 15;
  const current=value
  const percent = Math.round((current / total) * 100);

  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs text-gray-400">
        <span>{value}</span>
        <span>{percent}%</span>
      </div>
      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-600 to-orange-500"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
function GroupMembersModal({ group, members, loading, onClose }) {
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
                    <td className="py-3">
                      {m.mobile}
                    </td>
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