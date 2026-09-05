
"use client";

import { useState } from "react";
import {
  Search,
  CalendarDays,
  Clock3,
  CheckCircle2,
  XCircle,
  Users,
  Plane,
  FileText,
} from "lucide-react";
import Link from "next/link";

type LeaveRecord = {
  id: number;
  employee_id: string;
  employee: string;
  time_off_type_id: string;
  leaveType: string;
  start_date: string;
  end_date: string;
  days: number;
  reason: string;
  state: string;
};

const leaveRecords: LeaveRecord[] = [];

export default function TimeOffPage() {
  const [search, setSearch] = useState("");
  const [stateFilter, setStateFilter] = useState("All States");
  const [typeFilter, setTypeFilter] = useState("All Types");

  const approvedCount = leaveRecords.filter(
    (leave) => leave.state === "Approved"
  ).length;

  const submittedCount = leaveRecords.filter(
    (leave) => leave.state === "Submitted"
  ).length;

  const rejectedCount = leaveRecords.filter(
    (leave) => leave.state === "Rejected"
  ).length;

  const approvedDays = leaveRecords
    .filter((leave) => leave.state === "Approved")
    .reduce((total, leave) => total + leave.days, 0);

  const filteredLeaves = leaveRecords.filter((leave) => {
    const searchValue = search.toLowerCase();

    const matchesSearch =
      leave.employee.toLowerCase().includes(searchValue) ||
      leave.employee_id.toLowerCase().includes(searchValue) ||
      leave.time_off_type_id.toLowerCase().includes(searchValue);

    const matchesState =
      stateFilter === "All States" || leave.state === stateFilter;

    const matchesType =
      typeFilter === "All Types" || leave.leaveType === typeFilter;

    return matchesSearch && matchesState && matchesType;
  });

  const getStateStyle = (state: string) => {
    switch (state) {
      case "Approved":
        return {
          badge: "bg-blue-50 text-blue-700 border border-blue-100",
          dot: "bg-blue-600",
        };

      case "Submitted":
        return {
          badge: "bg-amber-50 text-amber-700 border border-amber-100",
          dot: "bg-amber-500",
        };

      case "Rejected":
        return {
          badge: "bg-rose-50 text-rose-700 border border-rose-100",
          dot: "bg-rose-500",
        };

      case "Draft":
        return {
          badge: "bg-slate-100 text-slate-600 border border-slate-200",
          dot: "bg-slate-500",
        };

      default:
        return {
          badge: "bg-slate-100 text-slate-600 border border-slate-200",
          dot: "bg-slate-400",
        };
    }
  };

  return (
    <div className="min-h-full space-y-6 pb-8">
      {/* ================= HEADER ================= */}

      <div className="relative overflow-hidden rounded-3xl bg-slate-900 p-6 text-white shadow-xl shadow-slate-200 sm:p-8">
        <div className="absolute -right-16 -top-20 h-56 w-56 rounded-full bg-blue-600/20" />
        <div className="absolute -bottom-24 right-24 h-48 w-48 rounded-full bg-blue-500/10" />
        <div className="absolute right-1/3 top-0 h-32 w-32 rounded-full bg-white/5" />

        <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2 text-sm font-medium text-slate-300">
              <Plane size={17} />
              Employee Leave Management
            </div>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Time Off
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
              Manage time off requests, leave types, allocations, balances
              and employee leave approvals.
            </p>
          </div>

          <Link
            href="/TimeOff/new"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-900/20 transition hover:-translate-y-0.5 hover:bg-blue-700 sm:w-auto"
          >
            + New Leave Request
          </Link>
        </div>
      </div>

      {/* ================= STATISTICS ================= */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {/* Total Requests */}

        <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition group-hover:scale-105">
              <CalendarDays size={22} />
            </div>

            <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">
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
            Total time off requests
          </p>
        </div>

        {/* Approved */}

        <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition group-hover:scale-105">
              <CheckCircle2 size={22} />
            </div>

            <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">
              Approved
            </span>
          </div>

          <p className="mt-5 text-sm font-medium text-slate-500">
            Approved Requests
          </p>

          <p className="mt-1 text-3xl font-bold text-slate-900">
            {approvedCount}
          </p>

          <p className="mt-2 text-xs text-slate-400">
            Approved leave requests
          </p>
        </div>

        {/* Submitted */}

        <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-600 transition group-hover:scale-105">
              <Clock3 size={22} />
            </div>

            <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700">
              Action Needed
            </span>
          </div>

          <p className="mt-5 text-sm font-medium text-slate-500">
            Submitted Requests
          </p>

          <p className="mt-1 text-3xl font-bold text-slate-900">
            {submittedCount}
          </p>

          <p className="mt-2 text-xs text-slate-400">
            Waiting for approval
          </p>
        </div>

        {/* Approved Days */}

        <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition group-hover:scale-105">
              <Users size={22} />
            </div>

            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
              Days
            </span>
          </div>

          <p className="mt-5 text-sm font-medium text-slate-500">
            Approved Days
          </p>

          <p className="mt-1 text-3xl font-bold text-slate-900">
            {approvedDays}
          </p>

          <p className="mt-2 text-xs text-slate-400">
            Total approved leave days
          </p>
        </div>
      </div>

      {/* ================= LEAVE REQUESTS ================= */}

      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        {/* TOOLBAR */}

        <div className="border-b border-slate-100 p-5 sm:p-6">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-slate-900">
                  Leave Requests
                </h2>

                <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">
                  {filteredLeaves.length}
                </span>
              </div>

              <p className="mt-1 text-sm text-slate-500">
                Review employee requests, leave type, duration and approval
                state.
              </p>
            </div>

            {/* SEARCH + FILTERS */}

            <div className="flex w-full flex-col gap-3 sm:flex-row xl:w-auto">
              <div className="flex h-11 w-full items-center rounded-xl border border-slate-200 bg-slate-50 px-3 transition focus-within:border-blue-400 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-50 sm:w-72">
                <Search size={18} className="shrink-0 text-slate-400" />

                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search employee..."
                  className="ml-2 w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                />
              </div>

              <select
                value={stateFilter}
                onChange={(e) => setStateFilter(e.target.value)}
                className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-medium text-slate-600 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50 sm:w-40"
              >
                <option>All States</option>
                <option>Draft</option>
                <option>Submitted</option>
                <option>Approved</option>
                <option>Rejected</option>
              </select>

              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-medium text-slate-600 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50 sm:w-40"
              >
                <option>All Types</option>
                <option>Paid Time Off</option>
                <option>Sick Leave</option>
                <option>Casual Leave</option>
              </select>
            </div>
          </div>
        </div>

        {/* ================= DESKTOP TABLE ================= */}

        <div className="hidden overflow-x-auto lg:block">
          <table className="w-full min-w-[1150px]">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/80">
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                  Employee
                </th>

                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                  Time Off Type
                </th>

                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                  Leave Period
                </th>

                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                  Days
                </th>

                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                  Reason
                </th>

                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                  State
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredLeaves.map((leave) => {
                const stateStyle = getStateStyle(leave.state);

                return (
                  <tr
                    key={leave.id}
                    className="group border-b border-slate-100 transition hover:bg-blue-50/30"
                  >
                    {/* Employee */}

                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white shadow-sm">
                          {leave.employee.charAt(0)}
                        </div>

                        <div>
                          <p className="font-semibold text-slate-900">
                            {leave.employee}
                          </p>

                          <p className="mt-0.5 text-xs text-slate-500">
                            {leave.employee_id}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Time Off Type */}

                    <td className="px-6 py-5">
                      <div>
                        <span className="inline-flex rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600">
                          {leave.leaveType}
                        </span>

                        <p className="mt-1 text-xs text-slate-400">
                          Code: {leave.time_off_type_id}
                        </p>
                      </div>
                    </td>

                    {/* Period */}

                    <td className="px-6 py-5">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                          <CalendarDays
                            size={15}
                            className="text-blue-600"
                          />
                          {leave.start_date}
                        </div>

                        <p className="pl-5 text-xs text-slate-400">
                          to {leave.end_date}
                        </p>
                      </div>
                    </td>

                    {/* Days */}

                    <td className="px-6 py-5">
                      <span className="font-bold text-slate-900">
                        {leave.days}{" "}
                        <span className="text-xs font-normal text-slate-400">
                          {leave.days === 1 ? "day" : "days"}
                        </span>
                      </span>
                    </td>

                    {/* Reason */}

                    <td className="max-w-[220px] px-6 py-5">
                      <div className="flex items-start gap-2">
                        <FileText
                          size={15}
                          className="mt-0.5 shrink-0 text-slate-400"
                        />

                        <p className="text-sm text-slate-600">
                          {leave.reason}
                        </p>
                      </div>
                    </td>

                    {/* State */}

                    <td className="px-6 py-5">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold ${stateStyle.badge}`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${stateStyle.dot}`}
                        />

                        {leave.state}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* ================= MOBILE CARDS ================= */}

        <div className="divide-y divide-slate-100 lg:hidden">
          {filteredLeaves.map((leave) => {
            const stateStyle = getStateStyle(leave.state);

            return (
              <div
                key={leave.id}
                className="p-5 transition hover:bg-slate-50 sm:p-6"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white">
                      {leave.employee.charAt(0)}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate font-semibold text-slate-900">
                        {leave.employee}
                      </p>

                      <p className="truncate text-xs text-slate-500">
                        {leave.employee_id}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-bold ${stateStyle.badge}`}
                  >
                    {leave.state}
                  </span>
                </div>

                <div className="mt-5 space-y-3">
                  {/* Type */}

                  <div className="rounded-xl bg-slate-50 p-3">
                    <p className="text-xs text-slate-400">
                      Time Off Type
                    </p>

                    <p className="mt-1 text-sm font-semibold text-slate-700">
                      {leave.leaveType}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      Code: {leave.time_off_type_id}
                    </p>
                  </div>

                  {/* Dates */}

                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-xl bg-slate-50 p-3">
                      <p className="text-xs text-slate-400">
                        Start Date
                      </p>

                      <p className="mt-1 text-sm font-semibold text-slate-700">
                        {leave.start_date}
                      </p>
                    </div>

                    <div className="rounded-xl bg-slate-50 p-3">
                      <p className="text-xs text-slate-400">
                        End Date
                      </p>

                      <p className="mt-1 text-sm font-semibold text-slate-700">
                        {leave.end_date}
                      </p>
                    </div>
                  </div>

                  {/* Days */}

                  <div className="rounded-xl bg-slate-50 p-3">
                    <p className="text-xs text-slate-400">
                      Leave Duration
                    </p>

                    <p className="mt-1 text-sm font-bold text-slate-900">
                      {leave.days}{" "}
                      {leave.days === 1 ? "day" : "days"}
                    </p>
                  </div>

                  {/* Reason */}

                  <div className="rounded-xl bg-slate-50 p-3">
                    <p className="text-xs text-slate-400">
                      Reason
                    </p>

                    <p className="mt-1 text-sm text-slate-600">
                      {leave.reason}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ================= EMPTY STATE ================= */}

        {filteredLeaves.length === 0 && (
          <div className="px-6 py-16 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400">
              <CalendarDays size={24} />
            </div>

            <h3 className="mt-4 text-base font-bold text-slate-900">
              No leave requests found
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Try changing your search or filters.
            </p>
          </div>
        )}

        {/* ================= FOOTER ================= */}

        <div className="flex flex-col gap-3 border-t border-slate-100 bg-slate-50/50 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Users size={16} />

            Showing

            <span className="font-bold text-slate-700">
              {filteredLeaves.length}
            </span>

            leave requests
          </div>

          <div className="text-xs text-slate-400">
            Approved leave updates the employee leave balance
          </div>
        </div>
      </div>
    </div>
  );
}
