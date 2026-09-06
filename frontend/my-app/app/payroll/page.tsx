"use client";

import { useEffect, useMemo, useState } from "react";

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
  TrendingUp,
  WalletCards,
  AlertCircle,
} from "lucide-react";

type Payrun = {
  id: number;
  name: string;
  date_start: string;
  date_end: string;
  state: string;
  payslip_count: number;
};

export default function PayrollPage() {
  const [payruns, setPayruns] = useState<Payrun[]>([]);
  const [search, setSearch] = useState("");
  const [stateFilter, setStateFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // --------------------------------
  // Fetch payroll data
  // --------------------------------
  useEffect(() => {
    async function loadPayruns() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("/api/payroll", {
          method: "GET",
          cache: "no-store",
        });

        const result = await response.json();

        console.log("Payroll API Response:", result);

        if (!response.ok || !result.success) {
          throw new Error(
            result.error || "Failed to load payroll data"
          );
        }

        setPayruns(result.data || []);
      } catch (err) {
        console.error("Payroll fetch error:", err);

        setError(
          err instanceof Error
            ? err.message
            : "Failed to load payroll data"
        );
      } finally {
        setLoading(false);
      }
    }

    loadPayruns();
  }, []);

  // --------------------------------
  // Format state
  // --------------------------------
  const formatState = (state: string) => {
    switch (state) {
      case "draft":
        return "Draft";

      case "processing":
        return "Processing";

      case "done":
        return "Done";

      case "cancelled":
        return "Cancelled";

      default:
        return state;
    }
  };

  // --------------------------------
  // State style
  // --------------------------------
  const getStateStyle = (state: string) => {
    switch (state) {
      case "done":
        return "bg-green-50 text-green-700 border-green-200";

      case "processing":
        return "bg-blue-50 text-blue-700 border-blue-200";

      case "draft":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";

      case "cancelled":
        return "bg-red-50 text-red-700 border-red-200";

      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  // --------------------------------
  // State icon
  // --------------------------------
  const getStateIcon = (state: string) => {
    switch (state) {
      case "done":
        return <CheckCircle2 size={15} />;

      case "processing":
        return <Clock3 size={15} />;

      case "draft":
        return <FileText size={15} />;

      case "cancelled":
        return <AlertCircle size={15} />;

      default:
        return <FileText size={15} />;
    }
  };

  // --------------------------------
  // Format date
  // --------------------------------
  const formatDate = (date: string) => {
    if (!date) return "—";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return date;
    }

    return parsedDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // --------------------------------
  // Filter payruns
  // --------------------------------
  const filteredPayruns = useMemo(() => {
    return payruns.filter((payrun) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        payrun.name.toLowerCase().includes(searchText);

      const matchesState =
        stateFilter === "All" ||
        payrun.state === stateFilter;

      return matchesSearch && matchesState;
    });
  }, [payruns, search, stateFilter]);

  // --------------------------------
  // Payroll statistics
  // --------------------------------
  const totalPayruns = payruns.length;

  const completedPayruns = payruns.filter(
    (payrun) => payrun.state === "done"
  ).length;

  const processingPayruns = payruns.filter(
    (payrun) => payrun.state === "processing"
  ).length;

  const draftPayruns = payruns.filter(
    (payrun) => payrun.state === "draft"
  ).length;

  const totalPayslips = payruns.reduce(
    (total, payrun) =>
      total + Number(payrun.payslip_count || 0),
    0
  );

  // --------------------------------
  // Loading
  // --------------------------------
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="mx-auto max-w-7xl">
          <div className="flex min-h-[400px] items-center justify-center">
            <div className="text-center">
              <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-indigo-600" />

              <p className="text-sm text-gray-500">
                Loading payroll data...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --------------------------------
  // Main UI
  // --------------------------------
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="mx-auto max-w-7xl space-y-6">

        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Payroll
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Manage payroll runs and payslips
            </p>
          </div>

          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-700"
          >
            <FileText size={17} />
            Create Payrun
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
            <AlertCircle
              size={20}
              className="mt-0.5 shrink-0"
            />

            <div>
              <p className="font-medium">
                Failed to load payroll data
              </p>

              <p className="mt-1 text-sm">
                {error}
              </p>
            </div>
          </div>
        )}

        {/* Statistics */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

          {/* Total Payruns */}
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Total Payruns
                </p>

                <p className="mt-2 text-2xl font-bold text-gray-900">
                  {totalPayruns}
                </p>
              </div>

              <div className="rounded-lg bg-indigo-50 p-3 text-indigo-600">
                <WalletCards size={22} />
              </div>
            </div>

            <div className="mt-4 flex items-center gap-1 text-xs text-gray-500">
              <TrendingUp size={14} />
              All payroll runs
            </div>
          </div>

          {/* Completed */}
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Completed
                </p>

                <p className="mt-2 text-2xl font-bold text-gray-900">
                  {completedPayruns}
                </p>
              </div>

              <div className="rounded-lg bg-green-50 p-3 text-green-600">
                <CheckCircle2 size={22} />
              </div>
            </div>

            <div className="mt-4 text-xs text-gray-500">
              Completed payroll runs
            </div>
          </div>

          {/* Processing */}
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Processing
                </p>

                <p className="mt-2 text-2xl font-bold text-gray-900">
                  {processingPayruns}
                </p>
              </div>

              <div className="rounded-lg bg-blue-50 p-3 text-blue-600">
                <Clock3 size={22} />
              </div>
            </div>

            <div className="mt-4 text-xs text-gray-500">
              Currently processing
            </div>
          </div>

          {/* Draft */}
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Draft
                </p>

                <p className="mt-2 text-2xl font-bold text-gray-900">
                  {draftPayruns}
                </p>
              </div>

              <div className="rounded-lg bg-yellow-50 p-3 text-yellow-600">
                <FileText size={22} />
              </div>
            </div>

            <div className="mt-4 text-xs text-gray-500">
              Payroll runs awaiting processing
            </div>
          </div>
        </div>

        {/* Payroll Overview */}
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-200 p-5">
            <h2 className="text-lg font-semibold text-gray-900">
              Payroll Overview
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Summary based on current payroll runs
            </p>
          </div>

          <div className="grid grid-cols-1 divide-y divide-gray-200 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">

            {/* Payslips */}
            <div className="p-5">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-indigo-50 p-2.5 text-indigo-600">
                  <FileText size={20} />
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Total Payslips
                  </p>

                  <p className="mt-1 text-xl font-bold text-gray-900">
                    {totalPayslips}
                  </p>
                </div>
              </div>
            </div>

            {/* Payruns */}
            <div className="p-5">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-green-50 p-2.5 text-green-600">
                  <CalendarDays size={20} />
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Payruns
                  </p>

                  <p className="mt-1 text-xl font-bold text-gray-900">
                    {totalPayruns}
                  </p>
                </div>
              </div>
            </div>

            {/* Completed */}
            <div className="p-5">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-blue-50 p-2.5 text-blue-600">
                  <CheckCircle2 size={20} />
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Completed
                  </p>

                  <p className="mt-1 text-xl font-bold text-gray-900">
                    {completedPayruns}
                  </p>
                </div>
              </div>
            </div>

            {/* Completion Rate */}
            <div className="p-5">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-purple-50 p-2.5 text-purple-600">
                  <TrendingUp size={20} />
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Completion Rate
                  </p>

                  <p className="mt-1 text-xl font-bold text-gray-900">
                    {totalPayruns > 0
                      ? Math.round(
                          (completedPayruns /
                            totalPayruns) *
                            100
                        )
                      : 0}
                    %
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Payrun List */}
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm">

          {/* List Header */}
          <div className="border-b border-gray-200 p-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Payroll Runs
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  View and manage payroll processing
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">

                {/* Search */}
                <div className="relative">
                  <Search
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="text"
                    value={search}
                    onChange={(e) =>
                      setSearch(e.target.value)
                    }
                    placeholder="Search payrun..."
                    className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-9 pr-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 sm:w-64"
                  />
                </div>

                {/* State Filter */}
                <select
                  value={stateFilter}
                  onChange={(e) =>
                    setStateFilter(e.target.value)
                  }
                  className="rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                >
                  <option value="All">
                    All States
                  </option>

                  <option value="draft">
                    Draft
                  </option>

                  <option value="processing">
                    Processing
                  </option>

                  <option value="done">
                    Done
                  </option>

                  <option value="cancelled">
                    Cancelled
                  </option>
                </select>
              </div>
            </div>
          </div>

          {/* Desktop Table */}
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50 text-left">
                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Payrun
                  </th>

                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Period
                  </th>

                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Payslips
                  </th>

                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Status
                  </th>

                  <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {filteredPayruns.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-5 py-12 text-center"
                    >
                      <div className="flex flex-col items-center">
                        <FileText
                          size={40}
                          className="text-gray-300"
                        />

                        <p className="mt-3 text-sm font-medium text-gray-700">
                          No payroll runs found
                        </p>

                        <p className="mt-1 text-xs text-gray-500">
                          Try changing your search or filter.
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredPayruns.map((payrun) => (
                    <tr
                      key={payrun.id}
                      className="transition hover:bg-gray-50"
                    >
                      {/* Payrun */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="rounded-lg bg-indigo-50 p-2.5 text-indigo-600">
                            <WalletCards size={18} />
                          </div>

                          <div>
                            <p className="font-medium text-gray-900">
                              {payrun.name}
                            </p>

                            <p className="mt-1 text-xs text-gray-500">
                              ID #{payrun.id}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Period */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2 text-sm text-gray-700">
                          <CalendarDays
                            size={15}
                            className="text-gray-400"
                          />

                          <span>
                            {formatDate(
                              payrun.date_start
                            )}{" "}
                            -{" "}
                            {formatDate(
                              payrun.date_end
                            )}
                          </span>
                        </div>
                      </td>

                      {/* Payslips */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <Users
                            size={16}
                            className="text-gray-400"
                          />

                          <span className="text-sm font-medium text-gray-700">
                            {payrun.payslip_count || 0}
                          </span>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${getStateStyle(
                            payrun.state
                          )}`}
                        >
                          {getStateIcon(payrun.state)}

                          {formatState(payrun.state)}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4">
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            title="Download"
                            className="rounded-lg border border-gray-200 p-2 text-gray-500 transition hover:bg-gray-50 hover:text-gray-700"
                          >
                            <Download size={16} />
                          </button>

                          <button
                            type="button"
                            title="Send email"
                            className="rounded-lg border border-gray-200 p-2 text-gray-500 transition hover:bg-gray-50 hover:text-gray-700"
                          >
                            <Mail size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="divide-y divide-gray-100 md:hidden">
            {filteredPayruns.length === 0 ? (
              <div className="px-5 py-12 text-center">
                <FileText
                  size={40}
                  className="mx-auto text-gray-300"
                />

                <p className="mt-3 text-sm font-medium text-gray-700">
                  No payroll runs found
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  Try changing your search or filter.
                </p>
              </div>
            ) : (
              filteredPayruns.map((payrun) => (
                <div
                  key={payrun.id}
                  className="p-5"
                >
                  {/* Top */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-indigo-50 p-2.5 text-indigo-600">
                        <WalletCards size={18} />
                      </div>

                      <div>
                        <p className="font-medium text-gray-900">
                          {payrun.name}
                        </p>

                        <p className="mt-1 text-xs text-gray-500">
                          ID #{payrun.id}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${getStateStyle(
                        payrun.state
                      )}`}
                    >
                      {getStateIcon(payrun.state)}

                      {formatState(payrun.state)}
                    </span>
                  </div>

                  {/* Details */}
                  <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">

                    <div className="rounded-lg bg-gray-50 p-3">
                      <div className="flex items-center gap-2">
                        <CalendarDays
                          size={16}
                          className="text-gray-400"
                        />

                        <p className="text-xs text-gray-500">
                          Period
                        </p>
                      </div>

                      <p className="mt-1 text-sm font-medium text-gray-800">
                        {formatDate(
                          payrun.date_start
                        )}{" "}
                        -{" "}
                        {formatDate(
                          payrun.date_end
                        )}
                      </p>
                    </div>

                    <div className="rounded-lg bg-gray-50 p-3">
                      <div className="flex items-center gap-2">
                        <Users
                          size={16}
                          className="text-gray-400"
                        />

                        <p className="text-xs text-gray-500">
                          Payslips
                        </p>
                      </div>

                      <p className="mt-1 text-sm font-medium text-gray-800">
                        {payrun.payslip_count || 0}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-4 flex gap-2">
                    <button
                      type="button"
                      className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-600 transition hover:bg-gray-50"
                    >
                      <Download size={15} />
                      Download
                    </button>

                    <button
                      type="button"
                      className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-600 transition hover:bg-gray-50"
                    >
                      <Mail size={15} />
                      Email
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 px-5 py-4">
            <p className="text-sm text-gray-500">
              Showing{" "}
              <span className="font-medium text-gray-700">
                {filteredPayruns.length}
              </span>{" "}
              of{" "}
              <span className="font-medium text-gray-700">
                {payruns.length}
              </span>{" "}
              payroll runs
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}