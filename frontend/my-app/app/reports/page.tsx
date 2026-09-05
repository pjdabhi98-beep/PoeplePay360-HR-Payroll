"use client";

import {
  Users,
  CalendarCheck,
  CalendarDays,
  WalletCards,
  TrendingUp,
  Download,
  FileText,
  ArrowUpRight,
} from "lucide-react";

const reportCards = [
  {
    title: "Employee Report",
    description: "View employee count, departments and employment status.",
    value: "248",
    label: "Total Employees",
    icon: Users,
    iconBg: "bg-indigo-50",
    iconColor: "text-indigo-600",
  },
  {
    title: "Attendance Report",
    description: "Monitor attendance, absences, late arrivals and worked hours.",
    value: "89.1%",
    label: "Attendance Rate",
    icon: CalendarCheck,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
  {
    title: "Time Off Report",
    description: "Track leave requests, approvals and employee leave usage.",
    value: "18",
    label: "Pending Requests",
    icon: CalendarDays,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
  },
  {
    title: "Payroll Report",
    description: "Review payroll totals, deductions and employee net salary.",
    value: "₹42.8L",
    label: "August Payroll",
    icon: WalletCards,
    iconBg: "bg-violet-50",
    iconColor: "text-violet-600",
  },
];

const monthlyPayroll = [
  { month: "May", amount: "₹40.2L" },
  { month: "Jun", amount: "₹41.1L" },
  { month: "Jul", amount: "₹41.9L" },
  { month: "Aug", amount: "₹42.8L" },
];

export default function ReportsPage() {
  return (
    <div className="min-h-full space-y-6 pb-8">
      {/* Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-indigo-600 to-violet-700 p-6 text-white shadow-xl shadow-indigo-100 sm:p-8">
        <div className="absolute -right-16 -top-20 h-56 w-56 rounded-full bg-white/10" />
        <div className="absolute -bottom-24 right-24 h-48 w-48 rounded-full bg-white/5" />

        <div className="relative z-10 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2 text-sm font-medium text-indigo-100">
              <FileText size={17} />
              Analytics & Reports
            </div>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Reports
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-indigo-100 sm:text-base">
              Get a quick overview of HR, attendance, time off and payroll
              information.
            </p>
          </div>

          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-indigo-700 shadow-lg transition hover:-translate-y-0.5 hover:bg-indigo-50"
          >
            <Download size={18} />
            Export Report
          </button>
        </div>
      </div>

      {/* Report Cards */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {reportCards.map((report) => {
          const Icon = report.icon;

          return (
            <div
              key={report.title}
              className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex items-start justify-between">
                <div
                  className={`rounded-2xl p-3 ${report.iconBg} ${report.iconColor}`}
                >
                  <Icon size={24} />
                </div>

                <ArrowUpRight
                  size={20}
                  className="text-slate-300 transition group-hover:text-indigo-500"
                />
              </div>

              <div className="mt-6">
                <h2 className="text-lg font-bold text-slate-900">
                  {report.title}
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {report.description}
                </p>
              </div>

              <div className="mt-6 flex items-end justify-between border-t border-slate-100 pt-5">
                <div>
                  <p className="text-2xl font-bold text-slate-900">
                    {report.value}
                  </p>

                  <p className="mt-1 text-xs font-medium text-slate-400">
                    {report.label}
                  </p>
                </div>

                <button
                  type="button"
                  className="rounded-xl bg-slate-50 px-4 py-2 text-sm font-semibold text-indigo-600 transition hover:bg-indigo-50"
                >
                  View Report
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Payroll Overview */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm xl:col-span-2">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Payroll Trend
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Monthly payroll overview
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-xl bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-600">
              <TrendingUp size={17} />
              +6.4%
            </div>
          </div>

          <div className="mt-8 space-y-5">
            {monthlyPayroll.map((item, index) => (
              <div key={item.month}>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-semibold text-slate-600">
                    {item.month} 2026
                  </span>

                  <span className="font-bold text-slate-900">
                    {item.amount}
                  </span>
                </div>

                <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-600"
                    style={{
                      width: `${70 + index * 8}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Summary */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">
            Quick Summary
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Current HR statistics
          </p>

          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-4">
              <span className="text-sm text-slate-500">
                Active Employees
              </span>

              <span className="font-bold text-slate-900">
                231
              </span>
            </div>

            <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-4">
              <span className="text-sm text-slate-500">
                Present Today
              </span>

              <span className="font-bold text-emerald-600">
                221
              </span>
            </div>

            <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-4">
              <span className="text-sm text-slate-500">
                Pending Leaves
              </span>

              <span className="font-bold text-amber-600">
                18
              </span>
            </div>

            <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-4">
              <span className="text-sm text-slate-500">
                Monthly Payroll
              </span>

              <span className="font-bold text-indigo-600">
                ₹42.8L
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-4 text-sm text-indigo-700">
        <div className="flex items-center gap-2 font-semibold">
          <FileText size={17} />
          Reports are designed to use live HR and payroll data from Odoo.
        </div>
      </div>
    </div>
  );
}