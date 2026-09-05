
"use client";

import {
  Plus,
  Search,
  FileText,
  CheckCircle2,
  Clock3,
  XCircle,
  CalendarDays,
  IndianRupee,
  Users,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";

const contracts = [
  {
    id: 1,
    employee: "Aarav Patel",
    role: "Software Developer",
    type: "Full Time",
    startDate: "01 Jan 2026",
    endDate: "31 Dec 2026",
    salary: "₹65,000",
    status: "Running",
  },
  {
    id: 2,
    employee: "Priya Shah",
    role: "HR Manager",
    type: "Full Time",
    startDate: "15 Feb 2026",
    endDate: "14 Feb 2027",
    salary: "₹72,000",
    status: "Running",
  },
  {
    id: 3,
    employee: "Rahul Mehta",
    role: "Accountant",
    type: "Full Time",
    startDate: "01 Mar 2026",
    endDate: "28 Feb 2027",
    salary: "₹58,000",
    status: "Running",
  },
  {
    id: 4,
    employee: "Neha Desai",
    role: "Marketing Executive",
    type: "Contract",
    startDate: "01 Apr 2026",
    endDate: "30 Sep 2026",
    salary: "₹48,000",
    status: "Draft",
  },
];

export default function ContractsPage() {
  const runningContracts = contracts.filter(
    (contract) => contract.status === "Running"
  ).length;

  const draftContracts = contracts.filter(
    (contract) => contract.status === "Draft"
  ).length;

  const expiredContracts = contracts.filter(
    (contract) => contract.status === "Expired"
  ).length;

  return (
    <div className="min-h-full space-y-6 pb-8">
      {/* ================= HEADER ================= */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-indigo-600 to-violet-700 p-6 text-white shadow-xl shadow-indigo-100 sm:p-8">
        {/* Decorative circles */}
        <div className="absolute -right-16 -top-20 h-56 w-56 rounded-full bg-white/10" />
        <div className="absolute -bottom-24 right-24 h-48 w-48 rounded-full bg-white/5" />

        <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2 text-sm font-medium text-indigo-100">
              <FileText size={17} />
              Employee Management
            </div>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Contracts
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-indigo-100 sm:text-base">
              Manage employee contracts, salary details, employment periods
              and contract status from one place.
            </p>
          </div>

          <Link
            href="/contracts/new"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-indigo-700 shadow-lg transition duration-200 hover:-translate-y-0.5 hover:bg-indigo-50 sm:w-auto"
          >
            <Plus size={19} />
            Create Contract
          </Link>
        </div>
      </div>

      {/* ================= STATISTICS ================= */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {/* Total */}
        <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 transition group-hover:scale-105">
              <FileText size={22} />
            </div>

            <ArrowUpRight
              size={18}
              className="text-slate-300 transition group-hover:text-indigo-500"
            />
          </div>

          <p className="mt-5 text-sm font-medium text-slate-500">
            Total Contracts
          </p>

          <p className="mt-1 text-3xl font-bold text-slate-900">
            {contracts.length}
          </p>

          <p className="mt-2 text-xs text-slate-400">
            All employee contracts
          </p>
        </div>

        {/* Running */}
        <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 transition group-hover:scale-105">
              <CheckCircle2 size={22} />
            </div>

            <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-600">
              Active
            </span>
          </div>

          <p className="mt-5 text-sm font-medium text-slate-500">
            Running Contracts
          </p>

          <p className="mt-1 text-3xl font-bold text-slate-900">
            {runningContracts}
          </p>

          <p className="mt-2 text-xs text-slate-400">
            Currently active contracts
          </p>
        </div>

        {/* Draft */}
        <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-600 transition group-hover:scale-105">
              <Clock3 size={22} />
            </div>

            <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-600">
              Pending
            </span>
          </div>

          <p className="mt-5 text-sm font-medium text-slate-500">
            Draft Contracts
          </p>

          <p className="mt-1 text-3xl font-bold text-slate-900">
            {draftContracts}
          </p>

          <p className="mt-2 text-xs text-slate-400">
            Waiting for activation
          </p>
        </div>

        {/* Expired */}
        <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-50 text-rose-600 transition group-hover:scale-105">
              <XCircle size={22} />
            </div>

            <span className="rounded-full bg-rose-50 px-2.5 py-1 text-xs font-semibold text-rose-600">
              Closed
            </span>
          </div>

          <p className="mt-5 text-sm font-medium text-slate-500">
            Expired Contracts
          </p>

          <p className="mt-1 text-3xl font-bold text-slate-900">
            {expiredContracts}
          </p>

          <p className="mt-2 text-xs text-slate-400">
            Contracts past end date
          </p>
        </div>
      </div>

      {/* ================= MAIN TABLE CARD ================= */}
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        {/* Toolbar */}
        <div className="border-b border-slate-100 p-5 sm:p-6">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-slate-900">
                  Contract Directory
                </h2>

                <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-600">
                  {contracts.length}
                </span>
              </div>

              <p className="mt-1 text-sm text-slate-500">
                View salary, employment period and contract status.
              </p>
            </div>

            {/* Search + Filter */}
            <div className="flex w-full flex-col gap-3 sm:flex-row xl:w-auto">
              <div className="flex h-11 w-full items-center rounded-xl border border-slate-200 bg-slate-50 px-3 transition focus-within:border-indigo-400 focus-within:bg-white focus-within:ring-4 focus-within:ring-indigo-50 sm:w-72">
                <Search size={18} className="shrink-0 text-slate-400" />

                <input
                  type="text"
                  placeholder="Search employee..."
                  className="ml-2 w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                />
              </div>

              <select className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-medium text-slate-600 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-50 sm:w-40">
                <option>All Status</option>
                <option>Running</option>
                <option>Draft</option>
                <option>Expired</option>
              </select>
            </div>
          </div>
        </div>

        {/* ================= DESKTOP TABLE ================= */}
        <div className="hidden overflow-x-auto lg:block">
          <table className="w-full min-w-[1050px]">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/80">
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                  Employee
                </th>

                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                  Type
                </th>

                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                  Contract Period
                </th>

                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                  Salary
                </th>

                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {contracts.map((contract) => (
                <tr
                  key={contract.id}
                  className="group border-b border-slate-100 transition hover:bg-indigo-50/30"
                >
                  {/* Employee */}
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-sm font-bold text-white shadow-sm">
                        {contract.employee.charAt(0)}
                      </div>

                      <div>
                        <p className="font-semibold text-slate-900">
                          {contract.employee}
                        </p>

                        <p className="mt-0.5 text-xs text-slate-500">
                          {contract.role}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Type */}
                  <td className="px-6 py-5">
                    <span className="inline-flex rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600">
                      {contract.type}
                    </span>
                  </td>

                  {/* Period */}
                  <td className="px-6 py-5">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                        <CalendarDays
                          size={15}
                          className="text-indigo-500"
                        />
                        {contract.startDate}
                      </div>

                      <div className="pl-5 text-xs text-slate-400">
                        to {contract.endDate}
                      </div>
                    </div>
                  </td>

                  {/* Salary */}
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-1 text-sm font-bold text-slate-800">
                      <IndianRupee size={14} />
                      {contract.salary.replace("₹", "")}
                    </div>

                    <p className="mt-1 text-xs text-slate-400">
                      Monthly salary
                    </p>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-5">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold ${
                        contract.status === "Running"
                          ? "bg-emerald-50 text-emerald-600"
                          : contract.status === "Draft"
                            ? "bg-amber-50 text-amber-600"
                            : "bg-rose-50 text-rose-600"
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          contract.status === "Running"
                            ? "bg-emerald-500"
                            : contract.status === "Draft"
                              ? "bg-amber-500"
                              : "bg-rose-500"
                        }`}
                      />

                      {contract.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ================= MOBILE CARDS ================= */}
        <div className="divide-y divide-slate-100 lg:hidden">
          {contracts.map((contract) => (
            <div
              key={contract.id}
              className="p-5 transition hover:bg-slate-50 sm:p-6"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-sm font-bold text-white">
                    {contract.employee.charAt(0)}
                  </div>

                  <div className="min-w-0">
                    <p className="truncate font-semibold text-slate-900">
                      {contract.employee}
                    </p>

                    <p className="truncate text-xs text-slate-500">
                      {contract.role}
                    </p>
                  </div>
                </div>

                <span
                  className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-bold ${
                    contract.status === "Running"
                      ? "bg-emerald-50 text-emerald-600"
                      : contract.status === "Draft"
                        ? "bg-amber-50 text-amber-600"
                        : "bg-rose-50 text-rose-600"
                  }`}
                >
                  {contract.status}
                </span>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-slate-50 p-3">
                  <p className="text-xs text-slate-400">Contract Type</p>
                  <p className="mt-1 text-sm font-semibold text-slate-700">
                    {contract.type}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-3">
                  <p className="text-xs text-slate-400">Monthly Salary</p>
                  <p className="mt-1 text-sm font-bold text-slate-800">
                    {contract.salary}
                  </p>
                </div>

                <div className="col-span-2 rounded-xl bg-slate-50 p-3">
                  <p className="text-xs text-slate-400">Contract Period</p>

                  <div className="mt-1 flex flex-wrap items-center gap-2 text-sm font-medium text-slate-700">
                    <CalendarDays size={15} className="text-indigo-500" />
                    {contract.startDate}
                    <span className="text-slate-400">→</span>
                    {contract.endDate}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex flex-col gap-3 border-t border-slate-100 bg-slate-50/50 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Users size={16} />

            Showing
            <span className="font-bold text-slate-700">
              {contracts.length}
            </span>
            contracts
          </div>

          <button className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600 sm:w-auto">
            View All Contracts
          </button>
        </div>
      </div>
    </div>
  );
}

