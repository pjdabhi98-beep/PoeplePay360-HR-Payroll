"use client";

import {
  Search,
  CalendarDays,
  Clock3,
  CheckCircle2,
  XCircle,
  Users,
  Plane,
} from "lucide-react";
import Link from "next/link";
const leaveRecords = [
  {
    id: 1,
    employee: "Neha Desai",
    department: "Marketing",
    leaveType: "Paid Time Off",
    startDate: "08 Sep 2026",
    endDate: "10 Sep 2026",
    days: 3,
    status: "Approved",
  },
  {
    id: 2,
    employee: "Rahul Mehta",
    department: "Finance",
    leaveType: "Sick Leave",
    startDate: "07 Sep 2026",
    endDate: "07 Sep 2026",
    days: 1,
    status: "Pending",
  },
  {
    id: 3,
    employee: "Aarav Patel",
    department: "Engineering",
    leaveType: "Casual Leave",
    startDate: "15 Sep 2026",
    endDate: "16 Sep 2026",
    days: 2,
    status: "Approved",
  },
  {
    id: 4,
    employee: "Priya Shah",
    department: "Human Resources",
    leaveType: "Paid Time Off",
    startDate: "20 Sep 2026",
    endDate: "22 Sep 2026",
    days: 3,
    status: "Pending",
  },
  {
    id: 5,
    employee: "Riya Mehta",
    department: "Sales",
    leaveType: "Casual Leave",
    startDate: "03 Sep 2026",
    endDate: "04 Sep 2026",
    days: 2,
    status: "Refused",
  },
];

export default function TimeOffPage() {
  const approvedCount = leaveRecords.filter(
    (leave) => leave.status === "Approved"
  ).length;

  const pendingCount = leaveRecords.filter(
    (leave) => leave.status === "Pending"
  ).length;

  const refusedCount = leaveRecords.filter(
    (leave) => leave.status === "Refused"
  ).length;

  const totalDays = leaveRecords
    .filter((leave) => leave.status === "Approved")
    .reduce((total, leave) => total + leave.days, 0);

  return (
    <div className="min-h-full space-y-6 pb-8">
      {/* Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-indigo-600 to-violet-700 p-6 text-white shadow-xl shadow-indigo-100 sm:p-8">
        <div className="absolute -right-16 -top-20 h-56 w-56 rounded-full bg-white/10" />
        <div className="absolute -bottom-24 right-24 h-48 w-48 rounded-full bg-white/5" />

        <div className="relative z-10">
          <div className="mb-3 flex items-center gap-2 text-sm font-medium text-indigo-100">
            <Plane size={17} />
            Employee Leave Management
          </div>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Time Off
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-indigo-100 sm:text-base">
            Manage employee leave requests, approvals, leave types and time
            off balances.
          </p>
        </div>
        <Link
  href="/TimeOff/new"
  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-indigo-700 shadow-lg transition hover:-translate-y-0.5 hover:bg-indigo-50"
>
  + New Leave Request
</Link>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {/* Total Requests */}
        <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <CalendarDays size={22} />
            </div>

            <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-600">
              All
            </span>
          </div>

          <p className="mt-5 text-sm font-medium text-slate-500">
            Leave Requests
          </p>

          <p className="mt-1 text-3xl font-bold text-slate-900">
            {leaveRecords.length}
          </p>

          <p className="mt-2 text-xs text-slate-400">
            Total leave requests
          </p>
        </div>

        {/* Approved */}
        <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <CheckCircle2 size={22} />
            </div>

            <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-600">
              Approved
            </span>
          </div>

          <p className="mt-5 text-sm font-medium text-slate-500">
            Approved
          </p>

          <p className="mt-1 text-3xl font-bold text-slate-900">
            {approvedCount}
          </p>

          <p className="mt-2 text-xs text-slate-400">
            Approved leave requests
          </p>
        </div>

        {/* Pending */}
        <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
              <Clock3 size={22} />
            </div>

            <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-600">
              Action Needed
            </span>
          </div>

          <p className="mt-5 text-sm font-medium text-slate-500">
            Pending
          </p>

          <p className="mt-1 text-3xl font-bold text-slate-900">
            {pendingCount}
          </p>

          <p className="mt-2 text-xs text-slate-400">
            Waiting for approval
          </p>
        </div>

        {/* Approved Days */}
        <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
              <Users size={22} />
            </div>

            <span className="rounded-full bg-violet-50 px-2.5 py-1 text-xs font-semibold text-violet-600">
              Days
            </span>
          </div>

          <p className="mt-5 text-sm font-medium text-slate-500">
            Approved Days
          </p>

          <p className="mt-1 text-3xl font-bold text-slate-900">
            {totalDays}
          </p>

          <p className="mt-2 text-xs text-slate-400">
            Total approved leave days
          </p>
        </div>
      </div>

      {/* Leave Requests */}
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        {/* Top Section */}
        <div className="border-b border-slate-100 p-5 sm:p-6">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-slate-900">
                  Leave Requests
                </h2>

                <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-600">
                  {leaveRecords.length}
                </span>
              </div>

              <p className="mt-1 text-sm text-slate-500">
                Review employee leave requests and their approval status.
              </p>
            </div>

            {/* Search + Filters */}
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
                <option>Approved</option>
                <option>Pending</option>
                <option>Refused</option>
              </select>

              <select className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-medium text-slate-600 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-50 sm:w-40">
                <option>All Types</option>
                <option>Paid Time Off</option>
                <option>Sick Leave</option>
                <option>Casual Leave</option>
              </select>
            </div>
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden overflow-x-auto lg:block">
          <table className="w-full min-w-[1100px]">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/80">
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                  Employee
                </th>

                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                  Leave Type
                </th>

                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                  Leave Period
                </th>

                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                  Days
                </th>

                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {leaveRecords.map((leave) => (
                <tr
                  key={leave.id}
                  className="group border-b border-slate-100 transition hover:bg-indigo-50/30"
                >
                  {/* Employee */}
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-sm font-bold text-white shadow-sm">
                        {leave.employee.charAt(0)}
                      </div>

                      <div>
                        <p className="font-semibold text-slate-900">
                          {leave.employee}
                        </p>

                        <p className="mt-0.5 text-xs text-slate-500">
                          {leave.department}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Leave Type */}
                  <td className="px-6 py-5">
                    <span className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600">
                      {leave.leaveType}
                    </span>
                  </td>

                  {/* Period */}
                  <td className="px-6 py-5">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                        <CalendarDays
                          size={15}
                          className="text-indigo-500"
                        />
                        {leave.startDate}
                      </div>

                      <p className="pl-5 text-xs text-slate-400">
                        to {leave.endDate}
                      </p>
                    </div>
                  </td>

                  {/* Days */}
                  <td className="px-6 py-5">
                    <span className="font-bold text-slate-800">
                      {leave.days}{" "}
                      <span className="text-xs font-normal text-slate-400">
                        {leave.days === 1 ? "day" : "days"}
                      </span>
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-5">
                    <span
                      className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold ${
                        leave.status === "Approved"
                          ? "bg-emerald-50 text-emerald-600"
                          : leave.status === "Pending"
                            ? "bg-amber-50 text-amber-600"
                            : "bg-rose-50 text-rose-600"
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          leave.status === "Approved"
                            ? "bg-emerald-500"
                            : leave.status === "Pending"
                              ? "bg-amber-500"
                              : "bg-rose-500"
                        }`}
                      />

                      {leave.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="divide-y divide-slate-100 lg:hidden">
          {leaveRecords.map((leave) => (
            <div
              key={leave.id}
              className="p-5 transition hover:bg-slate-50 sm:p-6"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-sm font-bold text-white">
                    {leave.employee.charAt(0)}
                  </div>

                  <div className="min-w-0">
                    <p className="truncate font-semibold text-slate-900">
                      {leave.employee}
                    </p>

                    <p className="truncate text-xs text-slate-500">
                      {leave.department}
                    </p>
                  </div>
                </div>

                <span
                  className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-bold ${
                    leave.status === "Approved"
                      ? "bg-emerald-50 text-emerald-600"
                      : leave.status === "Pending"
                        ? "bg-amber-50 text-amber-600"
                        : "bg-rose-50 text-rose-600"
                  }`}
                >
                  {leave.status}
                </span>
              </div>

              <div className="mt-5 space-y-3">
                <div className="rounded-xl bg-slate-50 p-3">
                  <p className="text-xs text-slate-400">
                    Leave Type
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-700">
                    {leave.leaveType}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-slate-50 p-3">
                    <p className="text-xs text-slate-400">
                      Start Date
                    </p>

                    <p className="mt-1 text-sm font-semibold text-slate-700">
                      {leave.startDate}
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-3">
                    <p className="text-xs text-slate-400">
                      End Date
                    </p>

                    <p className="mt-1 text-sm font-semibold text-slate-700">
                      {leave.endDate}
                    </p>
                  </div>
                </div>

                <div className="rounded-xl bg-slate-50 p-3">
                  <p className="text-xs text-slate-400">
                    Leave Duration
                  </p>

                  <p className="mt-1 text-sm font-bold text-slate-800">
                    {leave.days}{" "}
                    {leave.days === 1 ? "day" : "days"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex flex-col gap-3 border-t border-slate-100 bg-slate-50/50 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <CalendarDays size={16} />

            Showing

            <span className="font-bold text-slate-700">
              {leaveRecords.length}
            </span>

            leave requests
          </div>

          <div className="text-xs text-slate-400">
            Approved leave affects employee leave balance
          </div>
        </div>
      </div>
    </div>
  );
}