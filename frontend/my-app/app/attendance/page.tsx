"use client";

import {
  Search,
  Clock3,
  Users,
  CheckCircle2,
  AlertCircle,
  CalendarDays,
  Timer,
  UserCheck,
} from "lucide-react";

const attendanceRecords = [
  {
    id: 1,
    employee: "Aarav Patel",
    department: "Engineering",
    date: "05 Sep 2026",
    checkIn: "09:02 AM",
    checkOut: "06:04 PM",
    workedHours: "8h 02m",
    status: "Present",
  },
  {
    id: 2,
    employee: "Priya Shah",
    department: "Human Resources",
    date: "05 Sep 2026",
    checkIn: "08:55 AM",
    checkOut: "05:58 PM",
    workedHours: "8h 03m",
    status: "Present",
  },
  {
    id: 3,
    employee: "Rahul Mehta",
    department: "Finance",
    date: "05 Sep 2026",
    checkIn: "09:18 AM",
    checkOut: "06:10 PM",
    workedHours: "7h 52m",
    status: "Late",
  },
  {
    id: 4,
    employee: "Neha Desai",
    department: "Marketing",
    date: "05 Sep 2026",
    checkIn: "—",
    checkOut: "—",
    workedHours: "—",
    status: "Absent",
  },
  {
    id: 5,
    employee: "Riya Mehta",
    department: "Sales",
    date: "05 Sep 2026",
    checkIn: "09:00 AM",
    checkOut: "06:00 PM",
    workedHours: "8h 00m",
    status: "Present",
  },
];

export default function AttendancePage() {
  const presentCount = attendanceRecords.filter(
    (record) => record.status === "Present"
  ).length;

  const lateCount = attendanceRecords.filter(
    (record) => record.status === "Late"
  ).length;

  const absentCount = attendanceRecords.filter(
    (record) => record.status === "Absent"
  ).length;

  return (
    <div className="min-h-full space-y-6 pb-8">

      {/* Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-indigo-600 to-violet-700 p-6 text-white shadow-xl shadow-indigo-100 sm:p-8">
        <div className="absolute -right-16 -top-20 h-56 w-56 rounded-full bg-white/10" />
        <div className="absolute -bottom-24 right-24 h-48 w-48 rounded-full bg-white/5" />

        <div className="relative z-10">
          <div className="mb-3 flex items-center gap-2 text-sm font-medium text-indigo-100">
            <Clock3 size={17} />
            Daily Workforce Tracking
          </div>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Attendance
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-indigo-100 sm:text-base">
            Monitor employee check-ins, check-outs, worked hours and daily
            attendance status.
          </p>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

        {/* Total */}
        <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <Users size={22} />
            </div>

            <CalendarDays
              size={18}
              className="text-slate-300 group-hover:text-indigo-500"
            />
          </div>

          <p className="mt-5 text-sm font-medium text-slate-500">
            Total Employees
          </p>

          <p className="mt-1 text-3xl font-bold text-slate-900">
            {attendanceRecords.length}
          </p>

          <p className="mt-2 text-xs text-slate-400">
            Attendance records today
          </p>
        </div>

        {/* Present */}
        <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <UserCheck size={22} />
            </div>

            <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-600">
              On Time
            </span>
          </div>

          <p className="mt-5 text-sm font-medium text-slate-500">
            Present
          </p>

          <p className="mt-1 text-3xl font-bold text-slate-900">
            {presentCount}
          </p>

          <p className="mt-2 text-xs text-slate-400">
            Employees checked in
          </p>
        </div>

        {/* Late */}
        <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
              <AlertCircle size={22} />
            </div>

            <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-600">
              Attention
            </span>
          </div>

          <p className="mt-5 text-sm font-medium text-slate-500">
            Late Arrivals
          </p>

          <p className="mt-1 text-3xl font-bold text-slate-900">
            {lateCount}
          </p>

          <p className="mt-2 text-xs text-slate-400">
            Employees arrived late
          </p>
        </div>

        {/* Absent */}
        <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-50 text-rose-600">
              <CheckCircle2 size={22} />
            </div>

            <span className="rounded-full bg-rose-50 px-2.5 py-1 text-xs font-semibold text-rose-600">
              Follow Up
            </span>
          </div>

          <p className="mt-5 text-sm font-medium text-slate-500">
            Absent
          </p>

          <p className="mt-1 text-3xl font-bold text-slate-900">
            {absentCount}
          </p>

          <p className="mt-2 text-xs text-slate-400">
            No attendance recorded
          </p>
        </div>
      </div>

      {/* Attendance Table */}
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

        {/* Table Header */}
        <div className="border-b border-slate-100 p-5 sm:p-6">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-slate-900">
                  Attendance Records
                </h2>

                <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-600">
                  {attendanceRecords.length}
                </span>
              </div>

              <p className="mt-1 text-sm text-slate-500">
                Daily employee attendance and working hours.
              </p>
            </div>

            {/* Search + Filters */}
            <div className="flex w-full flex-col gap-3 sm:flex-row xl:w-auto">

              {/* Search */}
              <div className="flex h-11 w-full items-center rounded-xl border border-slate-200 bg-slate-50 px-3 transition focus-within:border-indigo-400 focus-within:bg-white focus-within:ring-4 focus-within:ring-indigo-50 sm:w-72">
                <Search size={18} className="shrink-0 text-slate-400" />

                <input
                  type="text"
                  placeholder="Search employee..."
                  className="ml-2 w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                />
              </div>

              {/* Date */}
              <input
                type="date"
                className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-medium text-slate-600 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-50 sm:w-44"
              />

              {/* Status */}
              <select
                className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-medium text-slate-600 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-50 sm:w-36"
              >
                <option>All Status</option>
                <option>Present</option>
                <option>Late</option>
                <option>Absent</option>
              </select>
            </div>
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden overflow-x-auto lg:block">
          <table className="w-full min-w-[1000px]">

            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/80">
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                  Employee
                </th>

                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                  Date
                </th>

                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                  Check In
                </th>

                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                  Check Out
                </th>

                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                  Worked Hours
                </th>

                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {attendanceRecords.map((record) => (
                <tr
                  key={record.id}
                  className="group border-b border-slate-100 transition hover:bg-indigo-50/30"
                >
                  {/* Employee */}
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">

                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-sm font-bold text-white shadow-sm">
                        {record.employee.charAt(0)}
                      </div>

                      <div>
                        <p className="font-semibold text-slate-900">
                          {record.employee}
                        </p>

                        <p className="mt-0.5 text-xs text-slate-500">
                          {record.department}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Date */}
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                      <CalendarDays
                        size={16}
                        className="text-indigo-500"
                      />
                      {record.date}
                    </div>
                  </td>

                  {/* Check In */}
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                      <Clock3
                        size={16}
                        className="text-emerald-500"
                      />
                      {record.checkIn}
                    </div>
                  </td>

                  {/* Check Out */}
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                      <Clock3
                        size={16}
                        className="text-rose-400"
                      />
                      {record.checkOut}
                    </div>
                  </td>

                  {/* Worked Hours */}
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2 text-sm font-bold text-slate-800">
                      <Timer
                        size={16}
                        className="text-indigo-500"
                      />
                      {record.workedHours}
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-5">
                    <span
                      className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold ${
                        record.status === "Present"
                          ? "bg-emerald-50 text-emerald-600"
                          : record.status === "Late"
                            ? "bg-amber-50 text-amber-600"
                            : "bg-rose-50 text-rose-600"
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          record.status === "Present"
                            ? "bg-emerald-500"
                            : record.status === "Late"
                              ? "bg-amber-500"
                              : "bg-rose-500"
                        }`}
                      />

                      {record.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="divide-y divide-slate-100 lg:hidden">
          {attendanceRecords.map((record) => (
            <div
              key={record.id}
              className="p-5 transition hover:bg-slate-50 sm:p-6"
            >
              <div className="flex items-start justify-between gap-3">

                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-sm font-bold text-white">
                    {record.employee.charAt(0)}
                  </div>

                  <div className="min-w-0">
                    <p className="truncate font-semibold text-slate-900">
                      {record.employee}
                    </p>

                    <p className="truncate text-xs text-slate-500">
                      {record.department}
                    </p>
                  </div>
                </div>

                <span
                  className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-bold ${
                    record.status === "Present"
                      ? "bg-emerald-50 text-emerald-600"
                      : record.status === "Late"
                        ? "bg-amber-50 text-amber-600"
                        : "bg-rose-50 text-rose-600"
                  }`}
                >
                  {record.status}
                </span>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">

                <div className="rounded-xl bg-slate-50 p-3">
                  <p className="text-xs text-slate-400">
                    Check In
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-700">
                    {record.checkIn}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-3">
                  <p className="text-xs text-slate-400">
                    Check Out
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-700">
                    {record.checkOut}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-3">
                  <p className="text-xs text-slate-400">
                    Worked Hours
                  </p>

                  <p className="mt-1 text-sm font-bold text-slate-800">
                    {record.workedHours}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-3">
                  <p className="text-xs text-slate-400">
                    Date
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-700">
                    {record.date}
                  </p>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex flex-col gap-3 border-t border-slate-100 bg-slate-50/50 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">

          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Clock3 size={16} />

            Showing

            <span className="font-bold text-slate-700">
              {attendanceRecords.length}
            </span>

            attendance records
          </div>

          <div className="text-xs text-slate-400">
            Attendance is generated from employee check-in/out
          </div>
        </div>
      </div>
    </div>
  );
}