"use client";

export default function TreasuryPage() {
  const summary = {
    totalTreasury: "₹18,40,000",
    pnpBalance: "₹4,80,000",
    financeGiven: "₹8,40,000",
    netAvailable: "₹5,20,000",
  };

  const groupTreasury = [
    {
      group: "10C1",
      treasury: "₹3,40,000",
      pnp: "₹1,20,000",
      financeOut: "₹2,00,000",
      status: "Healthy",
    },
    {
      group: "12B2",
      treasury: "₹2,10,000",
      pnp: "₹80,000",
      financeOut: "₹1,30,000",
      status: "Healthy",
    },
    {
      group: "15A1",
      treasury: "₹0",
      pnp: "₹0",
      financeOut: "₹0",
      status: "Closed",
    },
  ];

  const recentMovements = [
    {
      date: "10 Feb 2026",
      voucher: "VP-10218",
      narration: "PNP settlement – Group 10C1",
      debit: "₹30,000",
      credit: "-",
    },
    {
      date: "10 Feb 2026",
      voucher: "VF-10111",
      narration: "Finance given to bidder – Group 12B2",
      debit: "₹80,000",
      credit: "-",
    },
    {
      date: "12 Feb 2026",
      voucher: "VR-10245",
      narration: "Finance recovery – Group 12B2",
      debit: "-",
      credit: "₹45,000",
    },
  ];

  return (
    <div className="space-y-10">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-semibold">Treasury</h1>
        <p className="text-sm text-gray-400 mt-1">
          Internal fund management & liquidity overview
        </p>
      </div>

      {/* TREASURY SUMMARY */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Summary title="Total Treasury" value={summary.totalTreasury} />
        <Summary title="PNP Balance" value={summary.pnpBalance} />
        <Summary title="Finance Given" value={summary.financeGiven} />
        <Summary
          title="Net Available"
          value={summary.netAvailable}
          highlight
        />
      </div>

      {/* GROUP-WISE TREASURY */}
      <div className="bg-[#111827] border border-white/10 rounded-xl overflow-hidden">

        <SectionHeader title="Group-wise Treasury Position" />

        <div className="p-6 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-gray-400">
                <th className="text-left py-3">Group</th>
                <th className="text-right py-3">Treasury</th>
                <th className="text-right py-3">PNP</th>
                <th className="text-right py-3">Finance Out</th>
                <th className="text-left py-3">Status</th>
              </tr>
            </thead>

            <tbody>
              {groupTreasury.map((g, i) => (
                <tr key={i} className="border-b border-white/5">
                  <td className="py-3 font-medium">{g.group}</td>
                  <td className="py-3 text-right">{g.treasury}</td>
                  <td className="py-3 text-right">{g.pnp}</td>
                  <td className="py-3 text-right">{g.financeOut}</td>
                  <td className="py-3">
                    <StatusBadge status={g.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

      {/* RECENT TREASURY MOVEMENTS */}
      <div className="bg-[#111827] border border-white/10 rounded-xl overflow-hidden">

        <SectionHeader title="Recent Treasury Movements" />

        <div className="p-6 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-gray-400">
                <th className="text-left py-3">Date</th>
                <th className="text-left py-3">Voucher</th>
                <th className="text-left py-3">Narration</th>
                <th className="text-right py-3">Debit</th>
                <th className="text-right py-3">Credit</th>
              </tr>
            </thead>

            <tbody>
              {recentMovements.map((m, i) => (
                <tr key={i} className="border-b border-white/5">
                  <td className="py-3">{m.date}</td>
                  <td className="py-3 text-blue-400">{m.voucher}</td>
                  <td className="py-3 text-gray-300">{m.narration}</td>
                  <td className="py-3 text-right text-red-400">{m.debit}</td>
                  <td className="py-3 text-right text-green-400">{m.credit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
}

/* ---------------- SMALL COMPONENTS ---------------- */

function Summary({ title, value, highlight }) {
  return (
    <div
      className={`
        bg-[#111827] border border-white/10 rounded-lg p-4
        ${highlight ? "bg-gradient-to-br from-blue-600/20 to-orange-500/20" : ""}
      `}
    >
      <p className="text-sm text-gray-400">{title}</p>
      <p className="text-2xl font-semibold mt-1">{value}</p>
    </div>
  );
}

function SectionHeader({ title }) {
  return (
    <div className="px-6 py-4 border-b border-white/10">
      <h2 className="text-sm font-medium text-gray-300 tracking-wide">
        {title}
      </h2>
    </div>
  );
}

function StatusBadge({ status }) {
  const styles =
    status === "Healthy"
      ? "bg-green-500/15 text-green-400"
      : "bg-gray-500/20 text-gray-400";

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles}`}>
      {status}
    </span>
  );
}
