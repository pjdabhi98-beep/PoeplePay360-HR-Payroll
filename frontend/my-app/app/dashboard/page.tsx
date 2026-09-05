import {
  Users,
  UserCheck,
  Clock3,
  WalletCards,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
} from "lucide-react";

const stats = [
  {
    title: "Total Employees",
    value: "248",
    change: "+12.5%",
    description: "vs last month",
    icon: Users,
    trend: "up",
  },
  {
    title: "Present Today",
    value: "221",
    change: "89.1%",
    description: "attendance rate",
    icon: UserCheck,
    trend: "up",
  },
  {
    title: "Pending Leaves",
    value: "18",
    change: "-4.2%",
    description: "vs last month",
    icon: Clock3,
    trend: "down",
  },
  {
    title: "Monthly Payroll",
    value: "₹42.8L",
    change: "+8.4%",
    description: "vs last month",
    icon: WalletCards,
    trend: "up",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-medium text-indigo-600">
            Overview
          </p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
            HR & Payroll Dashboard
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Monitor your workforce, attendance and payroll in one place.
          </p>
        </div>

        <button className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition-all hover:bg-indigo-700 hover:shadow-indigo-600/30">
          View Reports
          <ArrowUpRight size={17} />
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Decorative background */}
              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-indigo-50 transition-transform duration-300 group-hover:scale-150" />

              <div className="relative">
                {/* Top row */}
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                    <Icon size={21} />
                  </div>

                  <span
                    className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${
                      stat.trend === "up"
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-rose-50 text-rose-600"
                    }`}
                  >
                    {stat.trend === "up" ? (
                      <TrendingUp size={13} />
                    ) : (
                      <TrendingDown size={13} />
                    )}

                    {stat.change}
                  </span>
                </div>

                {/* Value */}
                <div className="mt-6">
                  <p className="text-sm font-medium text-slate-500">
                    {stat.title}
                  </p>

                  <h2 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
                    {stat.value}
                  </h2>

                  <p className="mt-2 text-xs text-slate-400">
                    {stat.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Temporary dashboard sections */}
      <div className="grid gap-5 lg:grid-cols-2">

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">
            Attendance Overview
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Attendance analytics will appear here.
          </p>

          <div className="mt-6 flex h-48 items-center justify-center rounded-xl bg-slate-50">
            <p className="text-sm text-slate-400">
              Chart coming next
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">
            Payroll Overview
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Payroll analytics will appear here.
          </p>

          <div className="mt-6 flex h-48 items-center justify-center rounded-xl bg-slate-50">
            <p className="text-sm text-slate-400">
              Chart coming next
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}