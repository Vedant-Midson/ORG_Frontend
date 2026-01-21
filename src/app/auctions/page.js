"use client";

import { useState } from "react";

export default function AuctionsPage() {
  const [bidAmount, setBidAmount] = useState("");

  const group = {
    code: "10C1",
    installment: "11 / 15",
    groupValue: "₹30,00,000",
    monthlyContribution: "₹2,00,000",
    auctionDate: "10 Feb 2026",
    reserveBid: "₹3,90,000",
  };

  const previousAuctions = [
    {
      installment: "10 / 15",
      winner: "Rakesh Kapoor",
      bid: "₹3,60,000",
      type: "Normal",
      date: "10 Jan 2026",
    },
    {
      installment: "9 / 15",
      winner: "Manoj Batra",
      bid: "₹3,80,000",
      type: "PNP",
      date: "10 Dec 2025",
    },
  ];

  return (
    <div className="space-y-10">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-semibold">Auction</h1>
        <p className="text-sm text-gray-400 mt-1">
          Monthly auction and bid management
        </p>
      </div>

      {/* GROUP SNAPSHOT */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        <InfoCard title="Group" value={group.code} />
        <InfoCard title="Installment" value={group.installment} />
        <InfoCard title="Group Value" value={group.groupValue} />
        <InfoCard title="Auction Date" value={group.auctionDate} />
      </div>

      {/* CURRENT AUCTION */}
      <div className="bg-[#111827] border border-white/10 rounded-xl">

        <SectionHeader title="Current Auction" />

        <div className="p-6 grid grid-cols-1 xl:grid-cols-3 gap-8">

          {/* Auction Info */}
          <div className="space-y-4">
            <DetailRow label="Monthly Contribution" value={group.monthlyContribution} />
            <DetailRow label="Reserve Bid" value={group.reserveBid} />
            <DetailRow label="Eligible Members" value="14" />
            <DetailRow label="Auction Status" value="Open" highlight />
          </div>

          {/* Bid Entry */}
          <div className="bg-[#0B1220] border border-white/10 rounded-xl p-6">
            <h3 className="text-sm font-medium text-gray-300 mb-4">
              Enter Bid Amount
            </h3>

            <input
              type="number"
              placeholder="Enter bid amount"
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
              className="
                w-full bg-[#111827] border border-white/10
                rounded-lg px-4 py-3 text-sm
                placeholder-gray-500 focus:outline-none
                focus:border-blue-500
              "
            />

            <p className="text-xs text-gray-400 mt-2">
              Bid must be greater than reserve amount
            </p>

            <div className="flex gap-3 mt-6">
              <button className="flex-1 bg-gradient-to-r from-blue-600 to-orange-500 py-3 rounded-lg font-medium hover:opacity-90">
                Submit Bid
              </button>
              <button className="flex-1 bg-white/5 border border-white/10 py-3 rounded-lg text-gray-300 hover:bg-white/10">
                Mark as PNP
              </button>
            </div>
          </div>

          {/* Calculations */}
          <div className="space-y-4">
            <CalculationRow label="Winning Amount" value="₹26,10,000" />
            <CalculationRow label="Total Discount" value="₹3,90,000" />
            <CalculationRow label="Per Member Discount" value="₹27,857" />
            <CalculationRow label="Company Finance" value="No" />
          </div>

        </div>

      </div>

      {/* AUCTION HISTORY */}
      <div className="bg-[#111827] border border-white/10 rounded-xl">

        <SectionHeader title="Auction History" />

        <div className="p-6 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-gray-400">
                <th className="text-left py-3">Installment</th>
                <th className="text-left py-3">Winner</th>
                <th className="text-left py-3">Bid Amount</th>
                <th className="text-left py-3">Type</th>
                <th className="text-left py-3">Date</th>
              </tr>
            </thead>

            <tbody>
              {previousAuctions.map((a, i) => (
                <tr key={i} className="border-b border-white/5">
                  <td className="py-3">{a.installment}</td>
                  <td className="py-3">{a.winner}</td>
                  <td className="py-3">{a.bid}</td>
                  <td className="py-3">
                    <TypeBadge type={a.type} />
                  </td>
                  <td className="py-3">{a.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

function InfoCard({ title, value }) {
  return (
    <div className="bg-[#111827] border border-white/10 rounded-xl p-5">
      <p className="text-sm text-gray-400">{title}</p>
      <p className="text-xl font-semibold mt-1">{value}</p>
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

function DetailRow({ label, value, highlight }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-gray-400">{label}</span>
      <span className={highlight ? "text-green-400 font-medium" : ""}>
        {value}
      </span>
    </div>
  );
}

function CalculationRow({ label, value }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-gray-400">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

function TypeBadge({ type }) {
  const style =
    type === "PNP"
      ? "bg-orange-500/15 text-orange-400"
      : "bg-green-500/15 text-green-400";

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${style}`}>
      {type}
    </span>
  );
}
