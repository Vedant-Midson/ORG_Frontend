export default function Dashboard() {
  return (
    <div className="space-y-10">

      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-semibold">
          Dashboard
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          System-wide overview of operations and funds
        </p>
      </div>

      {/* KPI GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6">
        <Kpi title="Active Groups" value="12" />
        <Kpi title="Total Clients" value="248" />
        <Kpi title="Monthly Collection" value="₹18,40,000" />
        <Kpi title="PNP Balance" value="₹4,80,000" />
        <Kpi title="Treasury Balance" value="₹12,30,000" />
      </div>

      {/* FINANCIAL OVERVIEW */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        <HighlightCard
          title="Today's Collection"
          value="₹1,25,000"
          subtitle="Across 3 groups"
          accent="green"
        />

        <HighlightCard
          title="Outstanding Amount"
          value="₹6,80,000"
          subtitle="Pending from members"
          accent="orange"
        />

        <HighlightCard
          title="Net Position (Month)"
          value="₹11,60,000"
          subtitle="After payouts"
          accent="blue"
        />

      </div>

      {/* OPERATIONAL DATA */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        {/* Upcoming Auctions */}
        <Card title="Upcoming Auctions">
          <Table
            headers={["Group", "Auction Date", "Installment", "Status"]}
            rows={[
              ["10C1", "10 Feb 2026", "11 / 15", "Scheduled"],
              ["12B2", "12 Feb 2026", "7 / 15", "Scheduled"],
              ["15A1", "15 Feb 2026", "3 / 15", "Scheduled"],
            ]}
          />
        </Card>

        {/* Recent Collections */}
        <Card title="Recent Collections">
          <Table
            headers={["Date", "Group", "Amount", "Mode"]}
            rows={[
              ["Today", "10C1", "₹45,000", "Cash"],
              ["Today", "12B2", "₹80,000", "Bank"],
              ["Yesterday", "15A1", "₹60,000", "UPI"],
            ]}
          />
        </Card>

      </div>

      {/* PENDING ACTIONS */}
      <Card title="Pending Settlements">
        <Table
          headers={["Member", "Group", "Type", "Amount"]}
          rows={[
            ["Rakesh Kapoor", "10C1", "PNP Refund", "₹30,000"],
            ["Manoj Batra", "12B2", "Finance Recovery", "₹45,000"],
          ]}
        />
      </Card>

    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

function Kpi({ title, value }) {
  return (
    <div className="bg-[#111827] border border-white/10 rounded-xl p-5">
      <p className="text-sm text-gray-400">{title}</p>
      <p className="text-2xl font-semibold mt-2">{value}</p>
    </div>
  );
}

function HighlightCard({ title, value, subtitle, accent }) {
  const colors = {
    green: "from-green-600/20 to-green-500/5",
    orange: "from-orange-500/20 to-orange-400/5",
    blue: "from-blue-600/20 to-blue-500/5",
  };

  return (
    <div className={`bg-gradient-to-br ${colors[accent]} border border-white/10 rounded-xl p-6`}>
      <p className="text-sm text-gray-300">{title}</p>
      <p className="text-3xl font-semibold mt-3">{value}</p>
      <p className="text-xs text-gray-400 mt-1">{subtitle}</p>
    </div>
  );
}

function Card({ title, children }) {
  return (
    <div className="bg-[#111827] border border-white/10 rounded-xl">
      <div className="px-6 py-4 border-b border-white/10">
        <h2 className="text-sm font-medium text-gray-300 tracking-wide">
          {title}
        </h2>
      </div>
      <div className="p-6">
        {children}
      </div>
    </div>
  );
}

function Table({ headers, rows }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-gray-400 border-b border-white/10">
            {headers.map((h) => (
              <th key={h} className="text-left py-2 font-medium">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-white/5 last:border-0">
              {row.map((cell, j) => (
                <td key={j} className="py-2 text-gray-300">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
