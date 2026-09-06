"use client";

import { useEffect, useState } from "react";

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

type AttendanceRecord = {
  id: number;
  employee_id: number;
  employee: string;
  department: string;
  check_in: string;
  check_out: string;
  worked_hours: string;
  state: string;
};

export default function AttendancePage() {
  const [attendanceRecords, setAttendanceRecords] = useState<
    AttendanceRecord[]
  >([]);

  const [search, setSearch] = useState("");
  const [stateFilter, setStateFilter] = useState("All State");
  const [dateFilter, setDateFilter] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ================= FETCH ATTENDANCE =================

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("/api/attendance", {
          method: "GET",
          cache: "no-store",
        });

        const result = await response.json();

        console.log("Attendance API Response:", result);

        if (!response.ok || !result.success) {
          throw new Error(
            result.error ||
              result.detail ||
              "Failed to fetch attendance"
          );
        }

        const records = result.data || [];

        // Convert Odoo data into frontend format
        const formattedRecords: AttendanceRecord[] =
          records.map((record: any) => ({
            id: record.id,

            employee_id: Array.isArray(record.employee_id)
              ? record.employee_id[0]
              : 0,

            employee: Array.isArray(record.employee_id)
              ? record.employee_id[1]
              : "Unknown Employee",

            department: "—",

            check_in: record.check_in || "—",

            check_out: record.check_out || "—",

            worked_hours:
              record.worked_hours !== false &&
              record.worked_hours !== null &&
              record.worked_hours !== undefined
                ? `${Number(record.worked_hours).toFixed(2)} hrs`
                : "—",

            state:
              record.state
                ?.toString()
                .toLowerCase() === "normal"
                ? "Normal"
                : "Exception",
          }));

        setAttendanceRecords(formattedRecords);

      } catch (err) {
        console.error(
          "Attendance fetch error:",
          err
        );

        setError(
          err instanceof Error
            ? err.message
            : "Failed to load attendance"
        );

      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, []);

  // ================= DATE FORMAT =================

  const formatDate = (dateTime: string) => {
    if (!dateTime || dateTime === "—") {
      return "—";
    }

    const date = new Date(
      dateTime.replace(" ", "T")
    );

    if (isNaN(date.getTime())) {
      return dateTime;
    }

    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // ================= TIME FORMAT =================

  const formatTime = (dateTime: string) => {
    if (!dateTime || dateTime === "—") {
      return "—";
    }

    const date = new Date(
      dateTime.replace(" ", "T")
    );

    if (isNaN(date.getTime())) {
      return dateTime;
    }

    return date.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  // ================= FILTER =================

  const filteredRecords = attendanceRecords.filter(
    (record) => {
      const searchText =
        search.toLowerCase().trim();

      const matchesSearch =
        record.employee
          .toLowerCase()
          .includes(searchText) ||
        record.department
          .toLowerCase()
          .includes(searchText);

      const matchesState =
        stateFilter === "All State" ||
        record.state === stateFilter;

      const matchesDate =
        !dateFilter ||
        record.check_in.startsWith(dateFilter);

      return (
        matchesSearch &&
        matchesState &&
        matchesDate
      );
    }
  );

  // ================= STATISTICS =================

  const totalRecords = filteredRecords.length;

  const normalCount = filteredRecords.filter(
    (record) => record.state === "Normal"
  ).length;

  const exceptionCount = filteredRecords.filter(
    (record) => record.state === "Exception"
  ).length;

  const completedCount = filteredRecords.filter(
    (record) =>
      record.check_out !== "—" &&
      record.check_out
  ).length;

  return (
    <div className="min-h-full space-y-6 pb-8">

      {/* ================= HEADER ================= */}

      <div className="relative overflow-hidden rounded-2xl bg-slate-900 p-6 text-white shadow-lg sm:p-8">

        <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-blue-600/20 blur-3xl" />

        <div className="absolute -bottom-24 right-40 h-56 w-56 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="relative z-10">

          <div className="mb-3 flex items-center gap-2">

            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600">
              <Clock3 size={18} />
            </div>

            <p className="text-sm font-medium text-slate-300">
              Workforce Management
            </p>

          </div>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Attendance
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
            Monitor employee check-ins, check-outs, automatically calculated
            worked hours and attendance exceptions.
          </p>

        </div>
      </div>

      {/* ================= STATISTICS ================= */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

        {/* Total */}

        <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-md">

          <div className="flex items-center justify-between">

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Users size={22} />
            </div>

            <CalendarDays
              size={18}
              className="text-slate-300"
            />

          </div>

          <p className="mt-5 text-sm font-medium text-slate-500">
            Total Records
          </p>

          <p className="mt-1 text-3xl font-bold text-slate-900">
            {loading ? "..." : totalRecords}
          </p>

          <p className="mt-2 text-xs text-slate-400">
            Attendance records
          </p>

        </div>

        {/* Normal */}

        <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <UserCheck size={22} />
            </div>

            <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
              Normal
            </span>

          </div>

          <p className="mt-5 text-sm font-medium text-slate-500">
            Normal
          </p>

          <p className="mt-1 text-3xl font-bold text-slate-900">
            {loading ? "..." : normalCount}
          </p>

          <p className="mt-2 text-xs text-slate-400">
            Normal attendance records
          </p>

        </div>

        {/* Exceptions */}

        <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
              <AlertCircle size={22} />
            </div>

            <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700">
              Review
            </span>

          </div>

          <p className="mt-5 text-sm font-medium text-slate-500">
            Exceptions
          </p>

          <p className="mt-1 text-3xl font-bold text-slate-900">
            {loading ? "..." : exceptionCount}
          </p>

          <p className="mt-2 text-xs text-slate-400">
            Records requiring attention
          </p>

        </div>

        {/* Completed */}

        <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
              <CheckCircle2 size={22} />
            </div>

            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
              Completed
            </span>

          </div>

          <p className="mt-5 text-sm font-medium text-slate-500">
            Checked Out
          </p>

          <p className="mt-1 text-3xl font-bold text-slate-900">
            {loading ? "..." : completedCount}
          </p>

          <p className="mt-2 text-xs text-slate-400">
            Records with check-out
          </p>

        </div>

      </div>

      {/* ================= ERROR ================= */}

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">

          <p className="font-semibold">
            Failed to load attendance
          </p>

          <p className="mt-1">
            {error}
          </p>

        </div>
      )}

      {/* ================= ATTENDANCE RECORDS ================= */}

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        {/* Toolbar */}

        <div className="border-b border-slate-200 p-5 sm:p-6">

          <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">

            <div>

              <div className="flex items-center gap-2">

                <Clock3
                  size={19}
                  className="text-blue-600"
                />

                <h2 className="text-xl font-bold text-slate-900">
                  Attendance Records
                </h2>

                <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">
                  {filteredRecords.length}
                </span>

              </div>

              <p className="mt-1 text-sm text-slate-500">
                Employee check-in, check-out and automatically calculated
                working hours.
              </p>

            </div>

            {/* Filters */}

            <div className="flex w-full flex-col gap-3 sm:flex-row xl:w-auto">

              {/* Search */}

              <div className="flex h-11 w-full items-center rounded-lg border border-slate-200 bg-slate-50 px-3 sm:w-72">

                <Search
                  size={18}
                  className="shrink-0 text-slate-400"
                />

                <input
                  type="text"
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  placeholder="Search employee..."
                  className="ml-2 w-full bg-transparent text-sm outline-none"
                />

              </div>

              {/* Date */}

              <input
                type="date"
                value={dateFilter}
                onChange={(e) =>
                  setDateFilter(e.target.value)
                }
                className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm font-medium text-slate-600 sm:w-40"
              />

              {/* State */}

              <select
                value={stateFilter}
                onChange={(e) =>
                  setStateFilter(e.target.value)
                }
                className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 text-sm font-medium text-slate-600 sm:w-36"
              >

                <option>All State</option>
                <option>Normal</option>
                <option>Exception</option>

              </select>

            </div>

          </div>

        </div>

        {/* ================= LOADING ================= */}

        {loading && (
          <div className="px-6 py-16 text-center">

            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

            <p className="mt-4 text-sm text-slate-500">
              Loading attendance from Odoo...
            </p>

          </div>
        )}

        {/* ================= DESKTOP TABLE ================= */}

        {!loading && (
          <div className="hidden overflow-x-auto lg:block">

            <table className="w-full min-w-[950px]">

              <thead>

                <tr className="border-b border-slate-200 bg-slate-50">

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
                    State
                  </th>

                </tr>

              </thead>

              <tbody>

                {filteredRecords.map((record) => (

                  <tr
                    key={record.id}
                    className="group border-b border-slate-100 transition hover:bg-blue-50/30"
                  >

                    {/* Employee */}

                    <td className="px-6 py-5">

                      <div className="flex items-center gap-3">

                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-sm font-bold text-slate-700">
                          {record.employee.charAt(0).toUpperCase()}
                        </div>

                        <div>

                          <p className="font-semibold text-slate-900">
                            {record.employee}
                          </p>

                          <p className="mt-0.5 text-xs text-slate-500">
                            {record.department}
                          </p>

                          <p className="mt-0.5 text-[11px] font-medium text-blue-600">
                            Employee ID: {record.employee_id}
                          </p>

                        </div>

                      </div>

                    </td>

                    {/* Date */}

                    <td className="px-6 py-5">

                      <div className="flex items-center gap-2 text-sm font-medium text-slate-700">

                        <CalendarDays
                          size={16}
                          className="text-blue-500"
                        />

                        {formatDate(record.check_in)}

                      </div>

                    </td>

                    {/* Check In */}

                    <td className="px-6 py-5">

                      <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">

                        <Clock3
                          size={16}
                          className="text-blue-500"
                        />

                        {formatTime(record.check_in)}

                      </div>

                    </td>

                    {/* Check Out */}

                    <td className="px-6 py-5">

                      <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">

                        <Clock3
                          size={16}
                          className="text-slate-400"
                        />

                        {formatTime(record.check_out)}

                      </div>

                    </td>

                    {/* Worked Hours */}

                    <td className="px-6 py-5">

                      <div className="inline-flex items-center gap-2 rounded-lg bg-blue-50 px-3 py-1.5 text-sm font-bold text-blue-700">

                        <Timer size={15} />

                        {record.worked_hours}

                      </div>

                      <p className="mt-1 text-[11px] text-slate-400">
                        Computed
                      </p>

                    </td>

                    {/* State */}

                    <td className="px-6 py-5">

                      <span
                        className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold ${
                          record.state === "Normal"
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-amber-50 text-amber-700"
                        }`}
                      >

                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            record.state === "Normal"
                              ? "bg-emerald-500"
                              : "bg-amber-500"
                          }`}
                        />

                        {record.state}

                      </span>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>
        )}

        {/* ================= MOBILE ================= */}

        {!loading && (
          <div className="divide-y divide-slate-100 lg:hidden">

            {filteredRecords.map((record) => (

              <div
                key={record.id}
                className="p-5 sm:p-6"
              >

                <div className="flex items-start justify-between gap-3">

                  <div className="flex min-w-0 items-center gap-3">

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-sm font-bold text-slate-700">
                      {record.employee.charAt(0).toUpperCase()}
                    </div>

                    <div className="min-w-0">

                      <p className="truncate font-semibold text-slate-900">
                        {record.employee}
                      </p>

                      <p className="truncate text-xs text-slate-500">
                        {record.department}
                      </p>

                      <p className="text-[11px] font-medium text-blue-600">
                        Employee ID: {record.employee_id}
                      </p>

                    </div>

                  </div>

                  <span
                    className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-bold ${
                      record.state === "Normal"
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-amber-50 text-amber-700"
                    }`}
                  >
                    {record.state}
                  </span>

                </div>

                <div className="mt-5 grid grid-cols-2 gap-3">

                  <div className="rounded-xl bg-slate-50 p-3">

                    <p className="text-xs text-slate-400">
                      Check In
                    </p>

                    <p className="mt-1 flex items-center gap-1.5 text-sm font-semibold text-slate-700">

                      <Clock3
                        size={14}
                        className="text-blue-500"
                      />

                      {formatTime(record.check_in)}

                    </p>

                  </div>

                  <div className="rounded-xl bg-slate-50 p-3">

                    <p className="text-xs text-slate-400">
                      Check Out
                    </p>

                    <p className="mt-1 flex items-center gap-1.5 text-sm font-semibold text-slate-700">

                      <Clock3
                        size={14}
                        className="text-slate-400"
                      />

                      {formatTime(record.check_out)}

                    </p>

                  </div>

                  <div className="rounded-xl bg-blue-50 p-3">

                    <p className="text-xs text-blue-600">
                      Worked Hours
                    </p>

                    <p className="mt-1 flex items-center gap-1.5 text-sm font-bold text-blue-700">

                      <Timer size={14} />

                      {record.worked_hours}

                    </p>

                  </div>

                  <div className="rounded-xl bg-slate-50 p-3">

                    <p className="text-xs text-slate-400">
                      Date
                    </p>

                    <p className="mt-1 flex items-center gap-1.5 text-sm font-semibold text-slate-700">

                      <CalendarDays size={14} />

                      {formatDate(record.check_in)}

                    </p>

                  </div>

                </div>

              </div>

            ))}

          </div>
        )}

        {/* ================= EMPTY STATE ================= */}

        {!loading &&
          filteredRecords.length === 0 && (

            <div className="px-6 py-16 text-center">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                <Clock3 size={24} />
              </div>

              <h3 className="mt-4 font-semibold text-slate-900">
                No attendance records found
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Try changing your search or filters.
              </p>

            </div>
          )}

        {/* ================= FOOTER ================= */}

        <div className="flex flex-col gap-3 border-t border-slate-200 bg-slate-50/50 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">

          <div className="flex items-center gap-2 text-sm text-slate-500">

            <Clock3 size={16} />

            Showing

            <span className="font-bold text-slate-700">
              {filteredRecords.length}
            </span>

            attendance records

          </div>

          <div className="text-xs text-slate-400">
            Worked hours are automatically calculated from check-in and
            check-out.
          </div>

        </div>

      </div>

    </div>
  );
}