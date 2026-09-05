
"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Plus,
  Search,
  WalletCards,
  Clock3,
  CheckCircle2,
  IndianRupee,
  CalendarDays,
  Users,
  FileText,
  AlertTriangle,
} from "lucide-react";

type Payrun = {
  id: number;
  name: string;
  dateStart: string;
  dateEnd: string;
  state: string;
  payslips: number;
};

const payruns: Payrun[] = [];

export default function PayrollPage() {
  const [search, setSearch] = useState("");
  const [stateFilter, setStateFilter] = useState("All");

  const doneCount = payruns.filter(
    (payrun) => payrun.state === "Done"
  ).length;

  const processingCount = payruns.filter(
    (payrun) => payrun.state === "Processing"
  ).length;

  const draftCount = payruns.filter(
    (payrun) => payrun.state === "Draft"
  ).length;

  const filteredPayruns = payruns.filter((payrun) => {
    const matchesSearch =
      payrun.name.toLowerCase().includes(search.toLowerCase()) ||
      payrun.dateStart.toLowerCase().includes(search.toLowerCase()) ||
      payrun.dateEnd.toLowerCase().includes(search.toLowerCase());

    const matchesState =
      stateFilter === "All" || payrun.state === stateFilter;

    return matchesSearch && matchesState;
  });

  const getStateStyle = (state: string) => {
    switch (state) {
      case "Done":
        return "bg-emerald-50 text-emerald-700";
      case "Processing":
        return "bg-amber-50 text-amber-700";
      case "Draft":
        return "bg-blue-50 text-blue-700";
      case "Cancelled":
        return "bg-rose-50 text-rose-700";
      default:
        return "bg-slate-100 text-slate-600";
    }
  };

  return (
    <div className="min-h-full space-y-6 bg-slate-50 pb-8">

      {/* Header */}
      <div className="rounded-3xl border border-slate-200 bg-slate-900 p-6 text-white sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2 text-sm font-medium text-blue-300">
              <WalletCards size={17} />
              Payroll Management
            </div>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Payroll
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
              Create and process payruns, generate payslips and track payroll
              status for employees.
            </p>
          </div>

          <Link
            href="/payroll/new"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700 sm:w-auto"
          >
            <Plus size={19} />
            Create Payrun
          </Link>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

        {/* Total Payruns */}
        <div className="group rounded-2xl border border-slate-200 bg-white p-5 transition duration-200 hover:-translate-y-1 hover:border-blue-200">
          <div className="flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <WalletCards size={22} />
            </div>

            <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-600">
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

        {/* Done */}
        <div className="group rounded-2xl border border-slate-200 bg-white p-5 transition duration-200 hover:-translate-y-1 hover:border-blue-200">
          <div className="flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <CheckCircle2 size={22} />
            </div>

            <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
              Completed
            </span>
          </div>

          <p className="mt-5 text-sm font-medium text-slate-500">
            Completed Payruns
          </p>

          <p className="mt-1 text-3xl font-bold text-slate-900">
            {doneCount}
          </p>

          <p className="mt-2 text-xs text-slate-400">
            Successfully completed
          </p>
        </div>

        {/* Processing */}
        <div className="group rounded-2xl border border-slate-200 bg-white p-5 transition duration-200 hover:-translate-y-1 hover:border-blue-200">
          <div className="flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
              <Clock3 size={22} />
            </div>

            <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700">
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
        <div className="group rounded-2xl border border-slate-200 bg-white p-5 transition duration-200 hover:-translate-y-1 hover:border-blue-200">
          <div className="flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
              <CalendarDays size={22} />
            </div>

            <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">
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

        {/* Total Payroll */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 transition hover:border-blue-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Total Payroll
              </p>

              <h2 className="mt-2 text-3xl font-bold text-slate-900">
                ₹43.20L
              </h2>

              <p className="mt-2 text-xs text-slate-400">
                Current payroll period
              </p>
            </div>

            <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
              <IndianRupee size={22} />
            </div>
          </div>

          <div className="mt-6">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-slate-500">
                Payroll progress
              </span>

              <span className="font-bold text-slate-700">
                78%
              </span>
            </div>

            <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
              <div className="h-full w-[78%] rounded-full bg-blue-600" />
            </div>
          </div>
        </div>

        {/* Employees */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 transition hover:border-blue-200">
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

            <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
              <Users size={22} />
            </div>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
              <div className="h-full w-[94%] rounded-full bg-blue-600" />
            </div>

            <span className="text-xs font-bold text-slate-600">
              94%
            </span>
          </div>
        </div>

        {/* Payroll Alerts */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 transition hover:border-blue-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Payroll Alerts
              </p>

              <h2 className="mt-2 text-3xl font-bold text-slate-900">
                2
              </h2>

              <p className="mt-2 text-xs text-slate-400">
                Items requiring payroll review
              </p>
            </div>

            <div className="rounded-xl bg-amber-50 p-3 text-amber-600">
              <AlertTriangle size={22} />
            </div>
          </div>

          <div className="mt-5 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-50 text-amber-600">
              <AlertTriangle size={18} />
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-700">
                Review before validation
              </p>

              <p className="text-xs text-slate-400">
                Check employee payroll information
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Payruns */}
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white">

        {/* Header */}
        <div className="border-b border-slate-100 p-5 sm:p-6">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-slate-900">
                  Payruns
                </h2>

                <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-600">
                  {filteredPayruns.length}
                </span>
              </div>

              <p className="mt-1 text-sm text-slate-500">
                Manage payroll periods and payrun processing.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">

              {/* Search */}
              <div className="flex h-11 w-full items-center rounded-xl border border-slate-200 bg-slate-50 px-3 transition focus-within:border-blue-400 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-50 sm:w-72">
                <Search size={18} className="shrink-0 text-slate-400" />

                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search payrun..."
                  className="ml-2 w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                />
              </div>

              {/* State Filter */}
              <select
                value={stateFilter}
                onChange={(e) => setStateFilter(e.target.value)}
                className="h-11 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-medium text-slate-600 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50"
              >
                <option value="All">All States</option>
                <option value="Draft">Draft</option>
                <option value="Processing">Processing</option>
                <option value="Done">Done</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden overflow-x-auto lg:block">
          <table className="w-full min-w-[950px]">

            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/80">
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                  Payrun
                </th>

                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                  Period Start
                </th>

                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                  Period End
                </th>

                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                  Payslips
                </th>

                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                  State
                </th>

                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredPayruns.map((payrun) => (
                <tr
                  key={payrun.id}
                  className="border-b border-slate-100 transition hover:bg-blue-50/30"
                >
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="rounded-xl bg-blue-50 p-2.5 text-blue-600">
                        <FileText size={18} />
                      </div>

                      <div>
                        <p className="font-semibold text-slate-900">
                          {payrun.name}
                        </p>

                        <p className="mt-0.5 text-xs text-slate-400">
                          Payroll processing
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-5 text-sm font-medium text-slate-700">
                    {payrun.dateStart}
                  </td>

                  <td className="px-6 py-5 text-sm font-medium text-slate-700">
                    {payrun.dateEnd}
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                      <FileText size={16} className="text-blue-500" />
                      {payrun.payslips}
                    </div>
                  </td>

                  <td className="px-6 py-5">
                    <span
                      className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold ${getStateStyle(
                        payrun.state
                      )}`}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-current" />
                      {payrun.state}
                    </span>
                  </td>

                  <td className="px-6 py-5">
                    <button className="inline-flex items-center rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="divide-y divide-slate-100 lg:hidden">
          {filteredPayruns.map((payrun) => (
            <div
              key={payrun.id}
              className="p-5 transition hover:bg-blue-50/20 sm:p-6"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="rounded-lg bg-blue-50 p-2 text-blue-600">
                      <FileText size={16} />
                    </div>

                    <p className="font-bold text-slate-900">
                      {payrun.name}
                    </p>
                  </div>

                  <p className="mt-2 text-xs text-slate-500">
                    {payrun.dateStart} → {payrun.dateEnd}
                  </p>
                </div>

                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-bold ${getStateStyle(
                    payrun.state
                  )}`}
                >
                  {payrun.state}
                </span>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-slate-50 p-3">
                  <p className="text-xs text-slate-400">
                    Payslips
                  </p>

                  <p className="mt-1 font-bold text-slate-800">
                    {payrun.payslips}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-3">
                  <p className="text-xs text-slate-400">
                    Period
                  </p>

                  <p className="mt-1 font-bold text-slate-800">
                    {payrun.dateStart}
                  </p>
                </div>
              </div>

              <button className="mt-4 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600">
                View Payrun
              </button>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredPayruns.length === 0 && (
          <div className="px-6 py-14 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
              <Search size={24} />
            </div>

            <h3 className="mt-4 text-base font-bold text-slate-900">
              No payruns found
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Try changing your search or state filter.
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="border-t border-slate-100 bg-slate-50/50 px-5 py-4 sm:px-6">
          <p className="text-sm text-slate-500">
            Showing{" "}
            <span className="font-bold text-slate-700">
              {filteredPayruns.length}
            </span>{" "}
            payruns
          </p>
        </div>
      </div>
    </div>
  );
}

