"use client";

import { useState } from "react";

export default function LedgersPage() {
  const [ledgerType, setLedgerType] = useState("Client");

  const ledger = {
    name: "Rakesh Kapoor",
    openingBalance: "₹0",
    entries: [
      {
        date: "10 Jan 2026",
        voucher: "VR-10231",
        narration: "Monthly installment – Group 10C1",
        debit: "-",
        credit: "₹9,000",
        balance: "₹9,000 Cr",
      },
      {
        date: "10 Feb 2026",
        voucher: "VP-10218",
        narration: "PNP Settlement",
        debit: "₹30,000",
        credit: "-",
        balance: "₹21,000 Dr",
      },
      {
        date: "10 Feb 2026",
        voucher: "VR-10245",
        narration: "Monthly installment – Group 10C1",
        debit: "-",
        credit: "₹9,000",
        balance: "₹12,000 Dr",
      },
    ],
  };

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Ledger</h1>
          <p className="text-sm text-gray-400 mt-1">
            Detailed account statement (read-only)
          </p>
        </div>

        <select
          value={ledgerType}
          onChange={(e) => setLedgerType(e.target.value)}
          className="
            bg-[#111827] border border-white/10
            rounded-lg px-4 py-2 text-sm
            focus:outline-none
          "
        >
          <option>Client</option>
          <option>Group</option>
          <option>Treasury</option>
        </select>
      </div>

      {/* LEDGER SUMMARY */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <Summary title="Ledger Name" value={ledger.name} />
        <Summary title="Opening Balance" value={ledger.openingBalance} />
        <Summary title="Closing Balance" value="₹12,000 Dr" />

      </div>

      {/* LEDGER TABLE */}
      <div className="bg-[#111827] border border-white/10 rounded-xl overflow-hidden">

        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10 text-gray-400">
              <th className="px-6 py-4 text-left">Date</th>
              <th className="px-6 py-4 text-left">Voucher</th>
              <th className="px-6 py-4 text-left">Narration</th>
              <th className="px-6 py-4 text-right">Debit</th>
              <th className="px-6 py-4 text-right">Credit</th>
              <th className="px-6 py-4 text-right">Balance</th>
            </tr>
          </thead>

          <tbody>
            {/* Opening Balance Row */}
            <tr className="border-b border-white/5 bg-white/5">
              <td className="px-6 py-4 font-medium" colSpan={5}>
                Opening Balance
              </td>
              <td className="px-6 py-4 text-right font-medium">
                {ledger.openingBalance}
              </td>
            </tr>

            {ledger.entries.map((e, i) => (
              <tr
                key={i}
                className="border-b border-white/5 hover:bg-white/5 transition"
              >
                <td className="px-6 py-4">{e.date}</td>
                <td className="px-6 py-4 text-blue-400">
                  {e.voucher}
                </td>
                <td className="px-6 py-4 text-gray-300">
                  {e.narration}
                </td>
                <td className="px-6 py-4 text-right text-red-400">
                  {e.debit}
                </td>
                <td className="px-6 py-4 text-right text-green-400">
                  {e.credit}
                </td>
                <td className="px-6 py-4 text-right font-medium">
                  {e.balance}
                </td>
              </tr>
            ))}

            {/* Closing Balance */}
            <tr className="bg-white/5">
              <td className="px-6 py-4 font-semibold" colSpan={5}>
                Closing Balance
              </td>
              <td className="px-6 py-4 text-right font-semibold">
                ₹12,000 Dr
              </td>
            </tr>

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
