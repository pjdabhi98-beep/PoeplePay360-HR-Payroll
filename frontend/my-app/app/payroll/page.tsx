"use client";

import Link from "next/link";
import {
  Plus,
  Search,
  WalletCards,
  Clock3,
  CheckCircle2,
  IndianRupee,
  CalendarDays,
  Users,
  ArrowUpRight,
} from "lucide-react";

const payruns = [
  {
    id: 1,
    period: "August 2026",
    structure: "Monthly Salary",
    employees: 248,
    amount: "₹42,80,000",
    created: "01 Aug 2026",
    status: "Paid",
  },
  {
    id: 2,
    period: "July 2026",
    structure: "Monthly Salary",
    employees: 245,
    amount: "₹41,95,000",
    created: "01 Jul 2026",
    status: "Paid",
  },
  {
    id: 3,
    period: "September 2026",
    structure: "Monthly Salary",
    employees: 248,
    amount: "₹43,20,000",
    created: "01 Sep 2026",
    status: "Processing",
  },
  {
    id: 4,
    period: "October 2026",
    structure: "Monthly Salary",
    employees: 248,
    amount: "₹43,50,000",
    created: "01 Oct 2026",
    status: "Draft",
  },
];

export default function PayrollPage() {
  const paidCount = payruns.filter(
    (payrun) => payrun.status === "Paid"
  ).length;

  const processingCount = payruns.filter(
    (payrun) => payrun.status === "Processing"
  ).length;

  const draftCount = payruns.filter(
    (payrun) => payrun.status === "Draft"
  ).length;

  return (
    <div className="min-h-full space-y-6 pb-8">
      {/* Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-indigo-600 to-violet-700 p-6 text-white shadow-xl shadow-indigo-100 sm:p-8">
        <div className="absolute -right-16 -top-20 h-56 w-56 rounded-full bg-white/10" />
        <div className="absolute -bottom-24 right-24 h-48 w-48 rounded-full bg-white/5" />

        <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2 text-sm font-medium text-indigo-100">
              <WalletCards size={17} />
              Payroll Management
            </div>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Payroll
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-indigo-100 sm:text-base">
              Manage payruns, salary processing, employee payroll and payment
              status from one place.
            </p>
          </div>

          <Link
            href="/payroll/new"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-indigo-700 shadow-lg transition duration-200 hover:-translate-y-0.5 hover:bg-indigo-50 sm:w-auto"
          >
            <Plus size={19} />
            Create Payrun
          </Link>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {/* Total Payruns */}
        <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <WalletCards size={22} />
            </div>

            <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-600">
              All
            </span>
          </div>

          <p className="mt-5 text-sm font-medium text-slate-500">
            Total Payruns
          </p>

          <p className="mt-1 text-3xl font-bold text-slate-900">
            {payruns.length}
          </p>

          <p className="mt-2 text-xs text-slate-400">
            Payroll periods created
          </p>
        </div>

        {/* Paid */}
        <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <CheckCircle2 size={22} />
            </div>

            <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-600">
              Completed
            </span>
          </div>

          <p className="mt-5 text-sm font-medium text-slate-500">
            Paid Payruns
          </p>

          <p className="mt-1 text-3xl font-bold text-slate-900">
            {paidCount}
          </p>

          <p className="mt-2 text-xs text-slate-400">
            Successfully completed
          </p>
        </div>

        {/* Processing */}
        <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
              <Clock3 size={22} />
            </div>

            <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-600">
              In Progress
            </span>
          </div>

          <p className="mt-5 text-sm font-medium text-slate-500">
            Processing
          </p>

          <p className="mt-1 text-3xl font-bold text-slate-900">
            {processingCount}
          </p>

          <p className="mt-2 text-xs text-slate-400">
            Payroll being processed
          </p>
        </div>

        {/* Draft */}
        <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
              <CalendarDays size={22} />
            </div>

            <span className="rounded-full bg-violet-50 px-2.5 py-1 text-xs font-semibold text-violet-600">
              Pending
            </span>
          </div>

          <p className="mt-5 text-sm font-medium text-slate-500">
            Draft Payruns
          </p>

          <p className="mt-1 text-3xl font-bold text-slate-900">
            {draftCount}
          </p>

          <p className="mt-2 text-xs text-slate-400">
            Awaiting processing
          </p>
        </div>
      </div>

      {/* Payroll Overview */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Payroll Amount */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Current Payroll
              </p>

              <h2 className="mt-2 text-3xl font-bold text-slate-900">
                ₹43.20L
              </h2>

              <div className="mt-3 inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-600">
                <ArrowUpRight size={14} />
                8.4%
              </div>
            </div>

            <div className="rounded-xl bg-indigo-50 p-3 text-indigo-600">
              <IndianRupee size={22} />
            </div>
          </div>

          <div className="mt-6 h-2 overflow-hidden rounded-full bg-slate-100">
            <div className="h-full w-[78%] rounded-full bg-indigo-600" />
          </div>

          <p className="mt-3 text-xs text-slate-400">
            78% of payroll processing completed
          </p>
        </div>

        {/* Employees */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Employees in Payroll
              </p>

              <h2 className="mt-2 text-3xl font-bold text-slate-900">
                248
              </h2>

              <p className="mt-2 text-xs text-slate-400">
                Employees included in current payrun
              </p>
            </div>

            <div className="rounded-xl bg-violet-50 p-3 text-violet-600">
              <Users size={22} />
            </div>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
              <div className="h-full w-[94%] rounded-full bg-violet-500" />
            </div>

            <span className="text-xs font-bold text-slate-600">94%</span>
          </div>
        </div>

        {/* Payroll Status */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-slate-500">
            Processing Status
          </p>

          <h2 className="mt-2 text-3xl font-bold text-slate-900">
            On Track
          </h2>

          <div className="mt-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
              <CheckCircle2 size={20} />
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-700">
                Payroll processing
              </p>

              <p className="text-xs text-slate-400">
                No critical issues detected
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Payrun Table */}
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 p-5 sm:p-6">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-slate-900">
                  Payruns
                </h2>

                <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-600">
                  {payruns.length}
                </span>
              </div>

              <p className="mt-1 text-sm text-slate-500">
                View and manage payroll processing periods.
              </p>
            </div>

            <div className="flex h-11 w-full items-center rounded-xl border border-slate-200 bg-slate-50 px-3 transition focus-within:border-indigo-400 focus-within:bg-white focus-within:ring-4 focus-within:ring-indigo-50 xl:w-72">
              <Search size={18} className="shrink-0 text-slate-400" />

              <input
                type="text"
                placeholder="Search payrun..."
                className="ml-2 w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
              />
            </div>
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden overflow-x-auto lg:block">
          <table className="w-full min-w-[1000px]">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/80">
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                  Payroll Period
                </th>

                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                  Salary Structure
                </th>

                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                  Employees
                </th>

                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                  Amount
                </th>

                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {payruns.map((payrun) => (
                <tr
                  key={payrun.id}
                  className="border-b border-slate-100 transition hover:bg-indigo-50/30"
                >
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="rounded-xl bg-indigo-50 p-2.5 text-indigo-600">
                        <CalendarDays size={18} />
                      </div>

                      <div>
                        <p className="font-semibold text-slate-900">
                          {payrun.period}
                        </p>

                        <p className="mt-0.5 text-xs text-slate-400">
                          Created {payrun.created}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-5">
                    <span className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600">
                      {payrun.structure}
                    </span>
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                      <Users size={16} className="text-indigo-500" />
                      {payrun.employees}
                    </div>
                  </td>

                  <td className="px-6 py-5">
                    <p className="font-bold text-slate-900">
                      {payrun.amount}
                    </p>
                  </td>

                  <td className="px-6 py-5">
                    <span
                      className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold ${
                        payrun.status === "Paid"
                          ? "bg-emerald-50 text-emerald-600"
                          : payrun.status === "Processing"
                            ? "bg-amber-50 text-amber-600"
                            : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          payrun.status === "Paid"
                            ? "bg-emerald-500"
                            : payrun.status === "Processing"
                              ? "bg-amber-500"
                              : "bg-slate-400"
                        }`}
                      />

                      {payrun.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="divide-y divide-slate-100 lg:hidden">
          {payruns.map((payrun) => (
            <div
              key={payrun.id}
              className="p-5 transition hover:bg-slate-50 sm:p-6"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-bold text-slate-900">
                    {payrun.period}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    {payrun.structure}
                  </p>
                </div>

                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-bold ${
                    payrun.status === "Paid"
                      ? "bg-emerald-50 text-emerald-600"
                      : payrun.status === "Processing"
                        ? "bg-amber-50 text-amber-600"
                        : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {payrun.status}
                </span>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-slate-50 p-3">
                  <p className="text-xs text-slate-400">Employees</p>

                  <p className="mt-1 font-bold text-slate-800">
                    {payrun.employees}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-3">
                  <p className="text-xs text-slate-400">Payroll Amount</p>

                  <p className="mt-1 font-bold text-slate-800">
                    {payrun.amount}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="border-t border-slate-100 bg-slate-50/50 px-5 py-4 sm:px-6">
          <p className="text-sm text-slate-500">
            Showing{" "}
            <span className="font-bold text-slate-700">
              {payruns.length}
            </span>{" "}
            payruns
          </p>
        </div>
      </div>
    </div>
  );
}