"use client";

import { useState } from "react";

export default function VouchersPage() {
  const [filter, setFilter] = useState("All");

  const vouchers = [
    {
      no: "VR-10231",
      date: "10 Feb 2026",
      type: "Receipt",
      group: "10C1",
      party: "Rakesh Kapoor",
      debit: "-",
      credit: "₹45,000",
      status: "Posted",
    },
    {
      no: "VP-10218",
      date: "10 Feb 2026",
      type: "Payment",
      group: "10C1",
      party: "PNP Settlement",
      debit: "₹30,000",
      credit: "-",
      status: "Posted",
    },
    {
      no: "VF-10111",
      date: "10 Jan 2026",
      type: "Finance",
      group: "12B2",
      party: "Company Finance",
      debit: "₹80,000",
      credit: "-",
      status: "Posted",
    },
    {
      no: "VP-10098",
      date: "10 Dec 2025",
      type: "Prizing",
      group: "15A1",
      party: "Manoj Batra",
      debit: "₹9,60,000",
      credit: "-",
      status: "Posted",
    },
  ];

  const filtered =
    filter === "All"
      ? vouchers
      : vouchers.filter((v) => v.type === filter);

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Voucher History</h1>
          <p className="text-sm text-gray-400 mt-1">
            All accounting vouchers (read-only)
          </p>
        </div>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="
            bg-[#111827] border border-white/10
            rounded-lg px-4 py-2 text-sm
            focus:outline-none
          "
        >
          <option>All</option>
          <option>Receipt</option>
          <option>Payment</option>
          <option>Prizing</option>
          <option>PNP</option>
          <option>Finance</option>
        </select>
      </div>

      {/* SUMMARY BAR */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Summary title="Total Vouchers" value="1,284" />
        <Summary title="Receipts" value="₹48.6L" />
        <Summary title="Payments" value="₹42.1L" />
        <Summary title="Finance Used" value="₹8.4L" />
      </div>

      {/* VOUCHER TABLE */}
      <div className="bg-[#111827] border border-white/10 rounded-xl overflow-hidden">

        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10 text-gray-400">
              <th className="px-6 py-4 text-left">Voucher No</th>
              <th className="px-6 py-4 text-left">Date</th>
              <th className="px-6 py-4 text-left">Type</th>
              <th className="px-6 py-4 text-left">Group</th>
              <th className="px-6 py-4 text-left">Party</th>
              <th className="px-6 py-4 text-right">Debit</th>
              <th className="px-6 py-4 text-right">Credit</th>
              <th className="px-6 py-4 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((v) => (
              <tr
                key={v.no}
                className="border-b border-white/5 hover:bg-white/5 transition"
              >
                <td className="px-6 py-4 font-medium text-blue-400">
                  {v.no}
                </td>
                <td className="px-6 py-4">{v.date}</td>
                <td className="px-6 py-4">
                  <TypeBadge type={v.type} />
                </td>
                <td className="px-6 py-4">{v.group}</td>
                <td className="px-6 py-4 text-gray-300">
                  {v.party}
                </td>
                <td className="px-6 py-4 text-right text-red-400">
                  {v.debit}
                </td>
                <td className="px-6 py-4 text-right text-green-400">
                  {v.credit}
                </td>
                <td className="px-6 py-4">
                  <StatusBadge status={v.status} />
                </td>
              </tr>
            ))}

            {filtered.length === 0 && (
              <tr>
                <td
                  colSpan={8}
                  className="px-6 py-10 text-center text-gray-500"
                >
                  No vouchers found
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

function Summary({ title, value }) {
  return (
    <div className="bg-[#111827] border border-white/10 rounded-lg p-4">
      <p className="text-sm text-gray-400">{title}</p>
      <p className="text-xl font-semibold mt-1">{value}</p>
    </div>
  );
}

function TypeBadge({ type }) {
  const styles = {
    Receipt: "bg-green-500/15 text-green-400",
    Payment: "bg-red-500/15 text-red-400",
    Prizing: "bg-blue-500/15 text-blue-400",
    Finance: "bg-orange-500/15 text-orange-400",
    PNP: "bg-yellow-500/15 text-yellow-400",
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles[type]}`}>
      {type}
    </span>
  );
}

function StatusBadge({ status }) {
  return (
    <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-500/15 text-green-400">
      {status}
    </span>
  );
}
