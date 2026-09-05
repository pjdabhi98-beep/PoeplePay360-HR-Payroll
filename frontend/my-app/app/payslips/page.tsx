"use client";

import {
  Search,
  FileText,
  CheckCircle2,
  Clock3,
  IndianRupee,
  Download,
  Mail,
  CalendarDays,
  Users,
} from "lucide-react";

const payslips = [
  {
    id: 1,
    employee: "Aarav Patel",
    period: "August 2026",
    basic: "₹50,000",
    allowances: "₹15,000",
    deductions: "₹5,000",
    gross: "₹65,000",
    net: "₹60,000",
    status: "Validated",
  },
  {
    id: 2,
    employee: "Priya Shah",
    period: "August 2026",
    basic: "₹55,000",
    allowances: "₹17,000",
    deductions: "₹6,000",
    gross: "₹72,000",
    net: "₹66,000",
    status: "Paid",
  },
  {
    id: 3,
    employee: "Rahul Mehta",
    period: "August 2026",
    basic: "₹45,000",
    allowances: "₹13,000",
    deductions: "₹5,000",
    gross: "₹58,000",
    net: "₹53,000",
    status: "Paid",
  },
  {
    id: 4,
    employee: "Neha Desai",
    period: "August 2026",
    basic: "₹38,000",
    allowances: "₹10,000",
    deductions: "₹4,000",
    gross: "₹48,000",
    net: "₹44,000",
    status: "Validated",
  },
];

export default function PayslipsPage() {
  const totalPayslips = payslips.length;

  const paidPayslips = payslips.filter(
    (payslip) => payslip.status === "Paid"
  ).length;

  const validatedPayslips = payslips.filter(
    (payslip) => payslip.status === "Validated"
  ).length;

  const totalNetSalary = payslips.reduce(
    (total, payslip) =>
      total + Number(payslip.net.replace(/[₹,]/g, "")),
    0
  );

  return (
    <div className="min-h-full space-y-6 pb-8">
      {/* Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-indigo-600 to-violet-700 p-6 text-white shadow-xl shadow-indigo-100 sm:p-8">
        <div className="absolute -right-16 -top-20 h-56 w-56 rounded-full bg-white/10" />
        <div className="absolute -bottom-24 right-24 h-48 w-48 rounded-full bg-white/5" />

        <div className="relative z-10">
          <div className="mb-3 flex items-center gap-2 text-sm font-medium text-indigo-100">
            <FileText size={17} />
            Payroll Management
          </div>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Payslips
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-indigo-100 sm:text-base">
            View employee salary breakdowns, net salary, payment status and
            generate payslip documents.
          </p>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
          <div className="flex items-center justify-between">
            <div className="rounded-xl bg-indigo-50 p-3 text-indigo-600">
              <FileText size={21} />
            </div>

            <span className="text-xs font-semibold text-slate-400">
              Total
            </span>
          </div>

          <p className="mt-5 text-3xl font-bold text-slate-900">
            {totalPayslips}
          </p>

          <p className="mt-1 text-sm text-slate-500">
            Payslips generated
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
          <div className="flex items-center justify-between">
            <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600">
              <CheckCircle2 size={21} />
            </div>

            <span className="text-xs font-semibold text-emerald-600">
              Completed
            </span>
          </div>

          <p className="mt-5 text-3xl font-bold text-slate-900">
            {paidPayslips}
          </p>

          <p className="mt-1 text-sm text-slate-500">
            Paid payslips
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
          <div className="flex items-center justify-between">
            <div className="rounded-xl bg-amber-50 p-3 text-amber-600">
              <Clock3 size={21} />
            </div>

            <span className="text-xs font-semibold text-amber-600">
              Processing
            </span>
          </div>

          <p className="mt-5 text-3xl font-bold text-slate-900">
            {validatedPayslips}
          </p>

          <p className="mt-1 text-sm text-slate-500">
            Awaiting payment
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
          <div className="flex items-center justify-between">
            <div className="rounded-xl bg-violet-50 p-3 text-violet-600">
              <IndianRupee size={21} />
            </div>

            <span className="text-xs font-semibold text-violet-600">
              Net Payroll
            </span>
          </div>

          <p className="mt-5 text-3xl font-bold text-slate-900">
            ₹{(totalNetSalary / 100000).toFixed(2)}L
          </p>

          <p className="mt-1 text-sm text-slate-500">
            Employee net salary
          </p>
        </div>
      </div>

      {/* Payslip Directory */}
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 p-5 sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Payslip Directory
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Salary breakdown for each employee
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              {/* Search */}
              <div className="relative">
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  placeholder="Search employee..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100 sm:w-64"
                />
              </div>

              {/* Period */}
              <select className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-medium text-slate-700 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100">
                <option>August 2026</option>
                <option>July 2026</option>
                <option>June 2026</option>
              </select>
            </div>
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden overflow-x-auto lg:block">
          <table className="w-full min-w-[1050px]">
            <thead className="bg-slate-50">
              <tr className="text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                <th className="px-6 py-4">Employee</th>
                <th className="px-6 py-4">Period</th>
                <th className="px-6 py-4">Basic</th>
                <th className="px-6 py-4">Allowances</th>
                <th className="px-6 py-4">Deductions</th>
                <th className="px-6 py-4">Gross</th>
                <th className="px-6 py-4">Net Salary</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {payslips.map((payslip) => (
                <tr
                  key={payslip.id}
                  className="transition hover:bg-slate-50/80"
                >
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 font-bold text-indigo-700">
                        {payslip.employee.charAt(0)}
                      </div>

                      <div>
                        <p className="font-semibold text-slate-900">
                          {payslip.employee}
                        </p>

                        <p className="text-xs text-slate-400">
                          Employee #{payslip.id.toString().padStart(3, "0")}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <CalendarDays size={15} />
                      {payslip.period}
                    </div>
                  </td>

                  <td className="px-6 py-5 text-sm font-medium text-slate-700">
                    {payslip.basic}
                  </td>

                  <td className="px-6 py-5 text-sm font-medium text-emerald-600">
                    +{payslip.allowances}
                  </td>

                  <td className="px-6 py-5 text-sm font-medium text-rose-600">
                    -{payslip.deductions}
                  </td>

                  <td className="px-6 py-5 text-sm font-semibold text-slate-800">
                    {payslip.gross}
                  </td>

                  <td className="px-6 py-5">
                    <span className="font-bold text-slate-900">
                      {payslip.net}
                    </span>
                  </td>

                  <td className="px-6 py-5">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${
                        payslip.status === "Paid"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {payslip.status}
                    </span>
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        className="rounded-lg border border-slate-200 p-2 text-slate-500 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
                        title="Download PDF"
                      >
                        <Download size={17} />
                      </button>

                      <button
                        type="button"
                        className="rounded-lg border border-slate-200 p-2 text-slate-500 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
                        title="Send Payslip"
                      >
                        <Mail size={17} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="space-y-4 p-4 lg:hidden">
          {payslips.map((payslip) => (
            <div
              key={payslip.id}
              className="rounded-2xl border border-slate-200 p-4 transition hover:border-indigo-200 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-100 font-bold text-indigo-700">
                    {payslip.employee.charAt(0)}
                  </div>

                  <div>
                    <p className="font-bold text-slate-900">
                      {payslip.employee}
                    </p>

                    <p className="text-xs text-slate-500">
                      {payslip.period}
                    </p>
                  </div>
                </div>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold ${
                    payslip.status === "Paid"
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {payslip.status}
                </span>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-slate-50 p-3">
                  <p className="text-xs text-slate-400">Basic</p>
                  <p className="mt-1 font-semibold text-slate-800">
                    {payslip.basic}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-3">
                  <p className="text-xs text-slate-400">Allowances</p>
                  <p className="mt-1 font-semibold text-emerald-600">
                    +{payslip.allowances}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-3">
                  <p className="text-xs text-slate-400">Deductions</p>
                  <p className="mt-1 font-semibold text-rose-600">
                    -{payslip.deductions}
                  </p>
                </div>

                <div className="rounded-xl bg-indigo-50 p-3">
                  <p className="text-xs text-indigo-500">Net Salary</p>
                  <p className="mt-1 font-bold text-indigo-700">
                    {payslip.net}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <button
                  type="button"
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                >
                  <Download size={16} />
                  PDF
                </button>

                <button
                  type="button"
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-indigo-600 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
                >
                  <Mail size={16} />
                  Send
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex flex-col gap-2 border-t border-slate-100 px-6 py-4 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <Users size={16} />
            {payslips.length} payslips displayed
          </div>

          <p>
            Payslips are generated from validated payroll calculations.
          </p>
        </div>
      </div>
    </div>
  );
}