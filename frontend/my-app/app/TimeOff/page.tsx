"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Search,
  CalendarDays,
  Clock3,
  CheckCircle2,
  Users,
  Plane,
  FileText,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";

type LeaveRecord = {
  id: number;
  employee_id: number | null;
  employee: string;
  time_off_type_id: number | null;
  leaveType: string;
  start_date: string;
  end_date: string;
  days: number;
  reason: string;
  state: string;
};

export default function TimeOffPage() {
  const [leaveRecords, setLeaveRecords] = useState<LeaveRecord[]>([]);

  const [search, setSearch] = useState("");
  const [stateFilter, setStateFilter] = useState("All States");
  const [typeFilter, setTypeFilter] = useState("All Types");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // --------------------------------------------------
  // FETCH TIME OFF DATA
  // --------------------------------------------------

  useEffect(() => {
const fetchTimeOff = async () => {
try {
setLoading(true);
setError("");

  const response = await fetch("/api/Timeoff", {
    method: "GET",
    cache: "no-store",
    headers: {
      Accept: "application/json",
    },
  });

  const text = await response.text();

  let result;

  try {
    result = JSON.parse(text);
  } catch {
    console.error(
      "Time Off API returned non-JSON:",
      text
    );

    throw new Error(
      `Time Off API returned invalid response (${response.status})`
    );
  }

  console.log("Time Off API Response:", result);

  if (!response.ok) {
    throw new Error(
      result?.error ||
      result?.message ||
      `Time Off API failed with status ${response.status}`
    );
  }

  if (!result.success) {
    throw new Error(
      result?.error ||
      result?.message ||
      "Failed to load time off requests"
    );
  }

  setLeaveRecords(
    Array.isArray(result.data)
      ? result.data
      : []
  );

} catch (err) {
  console.error(
    "Time Off fetch error:",
    err
  );

  setError(
    err instanceof Error
      ? err.message
      : "Failed to load time off requests"
  );

  setLeaveRecords([]);

} finally {
  setLoading(false);
}

};

fetchTimeOff();
}, []);
  // --------------------------------------------------
  // DYNAMIC TIME OFF TYPES
  // --------------------------------------------------

  const leaveTypes = useMemo(() => {
    const types = leaveRecords
      .map((leave) => leave.leaveType)
      .filter(
        (type) =>
          type &&
          type !== "—" &&
          type.trim() !== ""
      );

    return Array.from(new Set(types));
  }, [leaveRecords]);

  // --------------------------------------------------
  // FILTER DATA
  // --------------------------------------------------

  const filteredRecords = useMemo(() => {
    return leaveRecords.filter((leave) => {
      const searchText = search
        .toLowerCase()
        .trim();

      const matchesSearch =
        !searchText ||
        leave.employee
          .toLowerCase()
          .includes(searchText) ||
        String(leave.employee_id ?? "")
          .toLowerCase()
          .includes(searchText) ||
        leave.leaveType
          .toLowerCase()
          .includes(searchText) ||
        String(leave.time_off_type_id ?? "")
          .toLowerCase()
          .includes(searchText) ||
        leave.reason
          .toLowerCase()
          .includes(searchText);

      const matchesState =
        stateFilter === "All States" ||
        leave.state === stateFilter;

      const matchesType =
        typeFilter === "All Types" ||
        leave.leaveType === typeFilter;

      return (
        matchesSearch &&
        matchesState &&
        matchesType
      );
    });
  }, [
    leaveRecords,
    search,
    stateFilter,
    typeFilter,
  ]);

  // --------------------------------------------------
  // STATS
  // --------------------------------------------------

  const totalRequests = leaveRecords.length;

  const approvedRequests =
    leaveRecords.filter(
      (leave) =>
        leave.state.toLowerCase() ===
        "approved"
    ).length;

  const submittedRequests =
    leaveRecords.filter(
      (leave) =>
        leave.state.toLowerCase() ===
        "submitted"
    ).length;

  const approvedDays = leaveRecords
    .filter(
      (leave) =>
        leave.state.toLowerCase() ===
        "approved"
    )
    .reduce(
      (total, leave) =>
        total + Number(leave.days || 0),
      0
    );

  // --------------------------------------------------
  // STATE STYLING
  // --------------------------------------------------

  const getStateStyle = (state: string) => {
    switch (state.toLowerCase()) {
      case "approved":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";

      case "submitted":
        return "bg-blue-50 text-blue-700 border-blue-200";

      case "draft":
        return "bg-gray-50 text-gray-700 border-gray-200";

      case "rejected":
        return "bg-red-50 text-red-700 border-red-200";

      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  // --------------------------------------------------
  // FORMAT DATE
  // --------------------------------------------------

  const formatDate = (date: string) => {
    if (!date) {
      return "—";
    }

    const parsedDate = new Date(date);

    if (
      Number.isNaN(parsedDate.getTime())
    ) {
      return date;
    }

    return parsedDate.toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  // --------------------------------------------------
  // PAGE
  // --------------------------------------------------

  return (
    <div className="min-h-screen bg-gray-50">

      {/* HEADER */}
      <div className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-6 py-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <p className="text-sm font-medium text-indigo-600">
                Employee Leave Management
              </p>

              <h1 className="mt-1 text-2xl font-bold tracking-tight text-gray-900">
                Time Off
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Manage employee leave requests and approvals.
              </p>
            </div>

            <Link
              href="/TimeOff/new"
              className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
            >
              + New Leave Request
            </Link>

          </div>
        </div>
      </div>

      {/* MAIN */}
      <main className="mx-auto max-w-7xl px-6 py-8">

        {/* STATS */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

          {/* TOTAL */}
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm font-medium text-gray-500">
                  Leave Requests
                </p>

                <p className="mt-2 text-2xl font-bold text-gray-900">
                  {totalRequests}
                </p>
              </div>

              <div className="rounded-lg bg-indigo-50 p-3">
                <FileText className="h-5 w-5 text-indigo-600" />
              </div>

            </div>
          </div>

          {/* APPROVED */}
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm font-medium text-gray-500">
                  Approved Requests
                </p>

                <p className="mt-2 text-2xl font-bold text-gray-900">
                  {approvedRequests}
                </p>
              </div>

              <div className="rounded-lg bg-emerald-50 p-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
              </div>

            </div>
          </div>

          {/* SUBMITTED */}
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm font-medium text-gray-500">
                  Submitted Requests
                </p>

                <p className="mt-2 text-2xl font-bold text-gray-900">
                  {submittedRequests}
                </p>
              </div>

              <div className="rounded-lg bg-blue-50 p-3">
                <Clock3 className="h-5 w-5 text-blue-600" />
              </div>

            </div>
          </div>

          {/* APPROVED DAYS */}
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm font-medium text-gray-500">
                  Approved Days
                </p>

                <p className="mt-2 text-2xl font-bold text-gray-900">
                  {approvedDays}
                </p>
              </div>

              <div className="rounded-lg bg-purple-50 p-3">
                <CalendarDays className="h-5 w-5 text-purple-600" />
              </div>

            </div>
          </div>

        </div>

        {/* TOOLBAR */}
        <div className="mt-8 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">

          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

            {/* SEARCH */}
            <div className="relative w-full lg:max-w-md">

              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search employee, leave type..."
                className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />

            </div>

            {/* FILTERS */}
            <div className="flex flex-col gap-3 sm:flex-row">

              <select
                value={stateFilter}
                onChange={(e) =>
                  setStateFilter(e.target.value)
                }
                className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-700 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              >
                <option value="All States">
                  All States
                </option>

                <option value="Draft">
                  Draft
                </option>

                <option value="Submitted">
                  Submitted
                </option>

                <option value="Approved">
                  Approved
                </option>

                <option value="Rejected">
                  Rejected
                </option>
              </select>

              <select
                value={typeFilter}
                onChange={(e) =>
                  setTypeFilter(e.target.value)
                }
                className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-700 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              >
                <option value="All Types">
                  All Types
                </option>

                {leaveTypes.map((type) => (
                  <option
                    key={type}
                    value={type}
                  >
                    {type}
                  </option>
                ))}
              </select>

            </div>

          </div>
        </div>

        {/* ERROR */}
        {error && (
          <div className="mt-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4">

            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />

            <div>
              <p className="font-semibold text-red-800">
                Failed to load Time Off data
              </p>

              <p className="mt-1 text-sm text-red-700">
                {error}
              </p>
            </div>

          </div>
        )}

        {/* LOADING */}
        {loading && (
          <div className="mt-6 rounded-xl border border-gray-200 bg-white p-12 text-center shadow-sm">

            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-indigo-600" />

            <p className="mt-4 text-sm text-gray-500">
              Loading leave requests from Odoo...
            </p>

          </div>
        )}

        {/* DESKTOP TABLE */}
        {!loading && (
          <div className="mt-6 hidden overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm lg:block">

            <div className="overflow-x-auto">

              <table className="w-full text-left">

                <thead className="border-b border-gray-200 bg-gray-50">

                  <tr>
                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Employee
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Time Off Type
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Leave Period
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Days
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Reason
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      State
                    </th>
                  </tr>

                </thead>

                <tbody className="divide-y divide-gray-100">

                  {filteredRecords.map(
                    (leave) => (
                      <tr
                        key={leave.id}
                        className="transition hover:bg-gray-50"
                      >

                        {/* EMPLOYEE */}
                        <td className="px-6 py-4">

                          <div className="flex items-center gap-3">

                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-50">
                              <Users className="h-4 w-4 text-indigo-600" />
                            </div>

                            <div>
                              <p className="font-medium text-gray-900">
                                {leave.employee}
                              </p>

                              <p className="text-xs text-gray-500">
                                Employee ID:{" "}
                                {leave.employee_id ?? "—"}
                              </p>
                            </div>

                          </div>

                        </td>

                        {/* TYPE */}
                        <td className="px-6 py-4">

                          <div className="flex items-center gap-2">

                            <Plane className="h-4 w-4 text-gray-400" />

                            <span className="text-sm font-medium text-gray-700">
                              {leave.leaveType}
                            </span>

                          </div>

                        </td>

                        {/* PERIOD */}
                        <td className="px-6 py-4">

                          <div className="flex items-center gap-2">

                            <CalendarDays className="h-4 w-4 text-gray-400" />

                            <div>
                              <p className="text-sm text-gray-900">
                                {formatDate(
                                  leave.start_date
                                )}
                              </p>

                              <p className="text-xs text-gray-500">
                                to{" "}
                                {formatDate(
                                  leave.end_date
                                )}
                              </p>
                            </div>

                          </div>

                        </td>

                        {/* DAYS */}
                        <td className="px-6 py-4">
                          <span className="font-semibold text-gray-900">
                            {leave.days}
                          </span>
                        </td>

                        {/* REASON */}
                        <td className="max-w-xs px-6 py-4">

                          <p className="truncate text-sm text-gray-600">
                            {leave.reason || "—"}
                          </p>

                        </td>

                        {/* STATE */}
                        <td className="px-6 py-4">

                          <span
                            className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${getStateStyle(
                              leave.state
                            )}`}
                          >
                            {leave.state || "—"}
                          </span>

                        </td>

                      </tr>
                    )
                  )}

                </tbody>

              </table>

              {/* EMPTY */}
              {filteredRecords.length === 0 && (
                <div className="px-6 py-16 text-center">

                  <CalendarDays className="mx-auto h-10 w-10 text-gray-300" />

                  <h3 className="mt-4 text-sm font-semibold text-gray-900">
                    No leave requests found
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    {leaveRecords.length === 0
                      ? "There are no time off requests in Odoo yet."
                      : "Try changing your search or filters."}
                  </p>

                </div>
              )}

            </div>
          </div>
        )}

        {/* MOBILE CARDS */}
        {!loading && (
          <div className="mt-6 space-y-4 lg:hidden">

            {filteredRecords.map(
              (leave) => (
                <div
                  key={leave.id}
                  className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
                >

                  {/* TOP */}
                  <div className="flex items-start justify-between gap-4">

                    <div className="flex items-center gap-3">

                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-50">
                        <Users className="h-5 w-5 text-indigo-600" />
                      </div>

                      <div>

                        <p className="font-semibold text-gray-900">
                          {leave.employee}
                        </p>

                        <p className="text-xs text-gray-500">
                          Employee ID:{" "}
                          {leave.employee_id ?? "—"}
                        </p>

                      </div>

                    </div>

                    <span
                      className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${getStateStyle(
                        leave.state
                      )}`}
                    >
                      {leave.state || "—"}
                    </span>

                  </div>

                  {/* DETAILS */}
                  <div className="mt-5 grid grid-cols-2 gap-4">

                    <div>
                      <p className="text-xs font-medium text-gray-500">
                        Time Off Type
                      </p>

                      <p className="mt-1 text-sm font-medium text-gray-900">
                        {leave.leaveType}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-medium text-gray-500">
                        Days
                      </p>

                      <p className="mt-1 text-sm font-semibold text-gray-900">
                        {leave.days}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-medium text-gray-500">
                        Start Date
                      </p>

                      <p className="mt-1 text-sm text-gray-900">
                        {formatDate(
                          leave.start_date
                        )}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-medium text-gray-500">
                        End Date
                      </p>

                      <p className="mt-1 text-sm text-gray-900">
                        {formatDate(
                          leave.end_date
                        )}
                      </p>
                    </div>

                  </div>

                  {/* REASON */}
                  <div className="mt-5 border-t border-gray-100 pt-4">

                    <p className="text-xs font-medium text-gray-500">
                      Reason
                    </p>

                    <p className="mt-1 text-sm text-gray-700">
                      {leave.reason || "—"}
                    </p>

                  </div>

                </div>
              )
            )}

            {/* MOBILE EMPTY */}
            {filteredRecords.length === 0 && (
              <div className="rounded-xl border border-gray-200 bg-white px-6 py-16 text-center shadow-sm">

                <CalendarDays className="mx-auto h-10 w-10 text-gray-300" />

                <h3 className="mt-4 text-sm font-semibold text-gray-900">
                  No leave requests found
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  {leaveRecords.length === 0
                    ? "There are no time off requests in Odoo yet."
                    : "Try changing your search or filters."}
                </p>

              </div>
            )}

          </div>
        )}

      </main>
    </div>
  );
}