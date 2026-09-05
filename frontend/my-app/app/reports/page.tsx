
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
  Clock3,
  CircleDollarSign,
} from "lucide-react";

const reportCards = [
  {
    title: "Employee Report",
    description:
      "View employee details, departments, job positions and employment status.",
    value: "248",
    label: "Total Employees",
    icon: Users,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    title: "Attendance Report",
    description:
      "Review check-in, check-out, worked hours and attendance exceptions.",
    value: "89.1%",
    label: "Attendance Rate",
    icon: CalendarCheck,
    iconBg: "bg-slate-100",
    iconColor: "text-slate-700",
  },
  {
    title: "Time Off Report",
    description:
      "Track leave types, requests, approval status and leave days.",
    value: "18",
    label: "Pending Requests",
    icon: CalendarDays,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
  },
  {
    title: "Payroll Report",
    description:
      "Review payruns, payslips, gross salary, deductions and net salary.",
    value: "₹42.8L",
    label: "Payroll Overview",
    icon: WalletCards,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
  },
];

const monthlyPayroll = [
  { month: "May", amount: "₹40.2L", width: "72%" },
  { month: "Jun", amount: "₹41.1L", width: "78%" },
  { month: "Jul", amount: "₹41.9L", width: "84%" },
  { month: "Aug", amount: "₹42.8L", width: "90%" },
];

export default function ReportsPage() {
  return (
    <div className="min-h-full space-y-6 pb-8">

      {/* Header */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900 p-6 text-white sm:p-8">
        <div className="absolute -right-16 -top-20 h-56 w-56 rounded-full bg-blue-600/20" />
        <div className="absolute -bottom-24 right-24 h-48 w-48 rounded-full bg-blue-500/10" />

        <div className="relative z-10 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2 text-sm font-medium text-blue-300">
              <FileText size={17} />
              Analytics & Reports
            </div>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Reports
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
              Get an overview of employees, attendance, time off and payroll
              information from your PeoplePay360 system.
            </p>
          </div>

          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-blue-700"
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
              className="group rounded-3xl border border-slate-200 bg-white p-6 transition duration-200 hover:-translate-y-1 hover:border-blue-200"
            >
              <div className="flex items-start justify-between">
                <div
                  className={`rounded-2xl p-3 ${report.iconBg} ${report.iconColor}`}
                >
                  <Icon size={24} />
                </div>

                <ArrowUpRight
                  size={20}
                  className="text-slate-300 transition group-hover:text-blue-600"
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
                  className="rounded-xl bg-slate-50 px-4 py-2 text-sm font-semibold text-blue-600 transition hover:bg-blue-50"
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

        {/* Payroll Trend */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 xl:col-span-2">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Payroll Trend
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Monthly payroll overview based on payslip data.
              </p>
            </div>

            <div className="flex w-fit items-center gap-2 rounded-xl bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-600">
              <TrendingUp size={17} />
              Payroll Overview
            </div>
          </div>

          <div className="mt-8 space-y-5">
            {monthlyPayroll.map((item) => (
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
                    className="h-full rounded-full bg-blue-600 transition-all duration-500"
                    style={{
                      width: item.width,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Summary */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6">
          <h2 className="text-xl font-bold text-slate-900">
            Quick Summary
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Current HR and payroll statistics.
          </p>

          <div className="mt-6 space-y-4">

            {/* Employees */}
            <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-blue-50 p-2 text-blue-600">
                  <Users size={18} />
                </div>

                <span className="text-sm text-slate-500">
                  Active Employees
                </span>
              </div>

              <span className="font-bold text-slate-900">
                231
              </span>
            </div>

            {/* Attendance */}
            <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-slate-100 p-2 text-slate-700">
                  <Clock3 size={18} />
                </div>

                <span className="text-sm text-slate-500">
                  Attendance Rate
                </span>
              </div>

              <span className="font-bold text-slate-900">
                89.1%
              </span>
            </div>

            {/* Time Off */}
            <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-amber-50 p-2 text-amber-600">
                  <CalendarDays size={18} />
                </div>

                <span className="text-sm text-slate-500">
                  Pending Leaves
                </span>
              </div>

              <span className="font-bold text-amber-600">
                18
              </span>
            </div>

            {/* Payroll */}
            <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-blue-50 p-2 text-blue-600">
                  <CircleDollarSign size={18} />
                </div>

                <span className="text-sm text-slate-500">
                  Monthly Payroll
                </span>
              </div>

              <span className="font-bold text-blue-600">
                ₹42.8L
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Report Information */}
      <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4 text-sm text-blue-700">
        <div className="flex items-start gap-2 font-semibold">
          <FileText size={17} className="mt-0.5 shrink-0" />

          <span>
            Reports can be connected to live Odoo data to generate employee,
            attendance, time off, payroll and payslip reports.
          </span>
        </div>
      </div>
    </div>
  );
}

