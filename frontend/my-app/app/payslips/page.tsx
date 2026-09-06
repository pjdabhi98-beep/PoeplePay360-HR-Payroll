"use client";

import { useEffect, useState } from "react";
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
  AlertCircle,
} from "lucide-react";

type Payslip = {
  id: number;
  name: string;
  employee: string;
  employee_id?: number | null;
  contract: string;
  payrun: string;
  dateFrom: string;
  dateTo: string;
  grossSalary: number;
  totalDeduction: number;
  netSalary: number;
  state: string;
  lines: {
    name: string;
    code: string;
    type: string;
    amount: number;
  }[];
};

export default function PayslipsPage() {
  const [payslips, setPayslips] = useState<Payslip[]>([]);
  const [search, setSearch] = useState("");
  const [stateFilter, setStateFilter] = useState("All");
  const [periodFilter, setPeriodFilter] = useState("August 2026");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // --------------------------------
  // Fetch payslips
  // --------------------------------

  useEffect(() => {
    async function fetchPayslips() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("/api/payslips", {
          method: "GET",
          cache: "no-store",
        });

        const result = await response.json();

        console.log("Payslips API Response:", result);

        if (!response.ok || !result.success) {
          throw new Error(
            result.error || "Failed to load payslips"
          );
        }

        setPayslips(result.data || []);

      } catch (err) {
        console.error("Payslips fetch error:", err);

        setError(
          err instanceof Error
            ? err.message
            : "Failed to load payslips"
        );

      } finally {
        setLoading(false);
      }
    }

    fetchPayslips();
  }, []);

  // --------------------------------
  // Currency formatter
  // --------------------------------

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount || 0);
  };

  // --------------------------------
  // Date formatter
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
  // State style
  // --------------------------------

  const getStateStyle = (state: string) => {
    switch (state) {
      case "Paid":
        return "bg-emerald-50 text-emerald-700";

      case "Computed":
        return "bg-blue-50 text-blue-700";

      case "Draft":
        return "bg-slate-100 text-slate-600";

      case "Cancelled":
        return "bg-rose-50 text-rose-700";

      default:
        return "bg-slate-100 text-slate-600";
    }
  };

  // --------------------------------
  // Statistics
  // --------------------------------

  const paidCount = payslips.filter(
    (payslip) => payslip.state === "Paid"
  ).length;

  const computedCount = payslips.filter(
    (payslip) => payslip.state === "Computed"
  ).length;

  const totalNetSalary = payslips.reduce(
    (total, payslip) =>
      total + Number(payslip.netSalary || 0),
    0
  );

  // --------------------------------
  // Period filter
  // --------------------------------

  const matchesPeriod = (payslip: Payslip) => {
    if (periodFilter === "All") {
      return true;
    }

    const date = new Date(payslip.dateFrom);

    if (Number.isNaN(date.getTime())) {
      return true;
    }

    const year = date.getFullYear();
    const month = date.getMonth();

    if (periodFilter === "August 2026") {
      return year === 2026 && month === 7;
    }

    if (periodFilter === "July 2026") {
      return year === 2026 && month === 6;
    }

    if (periodFilter === "June 2026") {
      return year === 2026 && month === 5;
    }

    return true;
  };

  // --------------------------------
  // Search + filters
  // --------------------------------

  const filteredPayslips = payslips.filter((payslip) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      payslip.employee
        .toLowerCase()
        .includes(searchText) ||
      payslip.name
        .toLowerCase()
        .includes(searchText) ||
      payslip.contract
        .toLowerCase()
        .includes(searchText) ||
      payslip.payrun
        .toLowerCase()
        .includes(searchText);

    const matchesState =
      stateFilter === "All" ||
      payslip.state === stateFilter;

    return (
      matchesSearch &&
      matchesState &&
      matchesPeriod(payslip)
    );
  });

  // --------------------------------
  // Loading
  // --------------------------------

  if (loading) {
    return (
      <div className="min-h-full bg-slate-50 p-6">
        <div className="flex min-h-[500px] items-center justify-center">
          <div className="text-center">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

            <p className="mt-4 text-sm text-slate-500">
              Loading payslips...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full space-y-6 bg-slate-50 pb-8">

      {/* Header */}
      <div className="rounded-3xl border border-slate-200 bg-slate-900 p-6 text-white sm:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2 text-sm font-medium text-blue-300">
              <FileText size={17} />
              Payroll Management
            </div>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Payslips
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
              View generated payslips, salary rule calculations,
              deductions, net salary and payment status.
            </p>
          </div>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-start gap-3 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-rose-700">
          <AlertCircle
            size={20}
            className="mt-0.5 shrink-0"
          />

          <div>
            <p className="font-semibold">
              Failed to load payslips
            </p>

            <p className="mt-1 text-sm">
              {error}
            </p>
          </div>
        </div>
      )}

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

        {/* Total */}
        <div className="group rounded-2xl border border-slate-200 bg-white p-5 transition duration-200 hover:-translate-y-1 hover:border-blue-200">
          <div className="flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <FileText size={21} />
            </div>

            <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-600">
              All
            </span>
          </div>

          <p className="mt-5 text-sm font-medium text-slate-500">
            Total Payslips
          </p>

          <p className="mt-1 text-3xl font-bold text-slate-900">
            {payslips.length}
          </p>

          <p className="mt-2 text-xs text-slate-400">
            Generated from payruns
          </p>
        </div>

        {/* Paid */}
        <div className="group rounded-2xl border border-slate-200 bg-white p-5 transition duration-200 hover:-translate-y-1 hover:border-blue-200">
          <div className="flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <CheckCircle2 size={21} />
            </div>

            <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
              Paid
            </span>
          </div>

          <p className="mt-5 text-sm font-medium text-slate-500">
            Paid Payslips
          </p>

          <p className="mt-1 text-3xl font-bold text-slate-900">
            {paidCount}
          </p>

          <p className="mt-2 text-xs text-slate-400">
            Payment completed
          </p>
        </div>

        {/* Computed */}
        <div className="group rounded-2xl border border-slate-200 bg-white p-5 transition duration-200 hover:-translate-y-1 hover:border-blue-200">
          <div className="flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Clock3 size={21} />
            </div>

            <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">
              Computed
            </span>
          </div>

          <p className="mt-5 text-sm font-medium text-slate-500">
            Computed Payslips
          </p>

          <p className="mt-1 text-3xl font-bold text-slate-900">
            {computedCount}
          </p>

          <p className="mt-2 text-xs text-slate-400">
            Awaiting payment
          </p>
        </div>

        {/* Net Salary */}
        <div className="group rounded-2xl border border-slate-200 bg-white p-5 transition duration-200 hover:-translate-y-1 hover:border-blue-200">
          <div className="flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
              <IndianRupee size={21} />
            </div>

            <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">
              Net
            </span>
          </div>

          <p className="mt-5 text-sm font-medium text-slate-500">
            Total Net Salary
          </p>

          <p className="mt-1 text-3xl font-bold text-slate-900">
            {formatCurrency(totalNetSalary)}
          </p>

          <p className="mt-2 text-xs text-slate-400">
            Employee net salary
          </p>
        </div>
      </div>

      {/* Payslip Directory */}
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white">

        {/* Directory Header */}
        <div className="border-b border-slate-100 p-5 sm:p-6">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-slate-900">
                  Payslip Directory
                </h2>

                <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-600">
                  {filteredPayslips.length}
                </span>
              </div>

              <p className="mt-1 text-sm text-slate-500">
                Payslips generated from salary structure and salary rules.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">

              {/* Search */}
              <div className="flex h-11 w-full items-center rounded-xl border border-slate-200 bg-slate-50 px-3 transition focus-within:border-blue-400 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-50 sm:w-72">
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
                  placeholder="Search employee or payslip..."
                  className="ml-2 w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                />
              </div>

              {/* Period */}
              <select
                value={periodFilter}
                onChange={(e) =>
                  setPeriodFilter(e.target.value)
                }
                className="h-11 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-medium text-slate-600 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50"
              >
                <option value="August 2026">
                  August 2026
                </option>

                <option value="July 2026">
                  July 2026
                </option>

                <option value="June 2026">
                  June 2026
                </option>

                <option value="All">
                  All Periods
                </option>
              </select>

              {/* State */}
              <select
                value={stateFilter}
                onChange={(e) =>
                  setStateFilter(e.target.value)
                }
                className="h-11 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-medium text-slate-600 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50"
              >
                <option value="All">
                  All States
                </option>

                <option value="Draft">
                  Draft
                </option>

                <option value="Computed">
                  Computed
                </option>

                <option value="Paid">
                  Paid
                </option>

                <option value="Cancelled">
                  Cancelled
                </option>
              </select>
            </div>
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden overflow-x-auto lg:block">
          <table className="w-full min-w-[1200px]">

            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/80">

                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                  Employee
                </th>

                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                  Payslip
                </th>

                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                  Period
                </th>

                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                  Gross
                </th>

                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                  Deductions
                </th>

                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                  Net Salary
                </th>

                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                  State
                </th>

                <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-slate-500">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">

              {filteredPayslips.map((payslip) => (
                <tr
                  key={payslip.id}
                  className="transition hover:bg-blue-50/30"
                >

                  {/* Employee */}
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">

                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 font-bold text-blue-700">
                        {payslip.employee.charAt(0)}
                      </div>

                      <div>
                        <p className="font-semibold text-slate-900">
                          {payslip.employee}
                        </p>

                        <p className="text-xs text-slate-400">
                          Employee ID #{payslip.employee_id ?? payslip.id}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Payslip */}
                  <td className="px-6 py-5">
                    <div>
                      <p className="font-semibold text-slate-800">
                        {payslip.name}
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        {payslip.payrun}
                      </p>
                    </div>
                  </td>

                  {/* Period */}
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2 text-sm text-slate-600">

                      <CalendarDays
                        size={15}
                        className="text-blue-500"
                      />

                      <div>
                        <p>
                          {formatDate(payslip.dateFrom)}
                        </p>

                        <p className="text-xs text-slate-400">
                          to {formatDate(payslip.dateTo)}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Gross */}
                  <td className="px-6 py-5">
                    <span className="font-semibold text-slate-800">
                      {formatCurrency(
                        payslip.grossSalary
                      )}
                    </span>
                  </td>

                  {/* Deduction */}
                  <td className="px-6 py-5">
                    <span className="font-semibold text-rose-600">
                      -{formatCurrency(
                        payslip.totalDeduction
                      )}
                    </span>
                  </td>

                  {/* Net */}
                  <td className="px-6 py-5">
                    <span className="font-bold text-slate-900">
                      {formatCurrency(
                        payslip.netSalary
                      )}
                    </span>
                  </td>

                  {/* State */}
                  <td className="px-6 py-5">
                    <span
                      className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold ${getStateStyle(
                        payslip.state
                      )}`}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-current" />

                      {payslip.state}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-5">
                    <div className="flex justify-end gap-2">

                      <button
                        type="button"
                        title="Download PDF"
                        className="rounded-lg border border-slate-200 p-2 text-slate-500 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                      >
                        <Download size={17} />
                      </button>

                      <button
                        type="button"
                        title="Send Payslip"
                        className="rounded-lg border border-slate-200 p-2 text-slate-500 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
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

        {/* Mobile */}
        <div className="space-y-4 p-4 lg:hidden">

          {filteredPayslips.map((payslip) => (
            <div
              key={payslip.id}
              className="rounded-2xl border border-slate-200 p-4 transition hover:border-blue-200"
            >

              <div className="flex items-start justify-between gap-3">

                <div className="flex items-center gap-3">

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 font-bold text-blue-700">
                    {payslip.employee.charAt(0)}
                  </div>

                  <div>
                    <p className="font-bold text-slate-900">
                      {payslip.employee}
                    </p>

                    <p className="text-xs text-slate-500">
                      {payslip.name}
                    </p>
                  </div>

                </div>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold ${getStateStyle(
                    payslip.state
                  )}`}
                >
                  {payslip.state}
                </span>

              </div>

              <div className="mt-4 rounded-xl bg-slate-50 p-3">

                <div className="flex items-center gap-2 text-sm text-slate-600">

                  <CalendarDays
                    size={15}
                    className="text-blue-500"
                  />

                  {formatDate(payslip.dateFrom)}
                  {" → "}
                  {formatDate(payslip.dateTo)}

                </div>

                <p className="mt-2 text-xs text-slate-400">
                  Payrun: {payslip.payrun}
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Contract: {payslip.contract}
                </p>

              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">

                <div className="rounded-xl bg-slate-50 p-3">
                  <p className="text-xs text-slate-400">
                    Gross Salary
                  </p>

                  <p className="mt-1 font-semibold text-slate-800">
                    {formatCurrency(
                      payslip.grossSalary
                    )}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-3">
                  <p className="text-xs text-slate-400">
                    Deductions
                  </p>

                  <p className="mt-1 font-semibold text-rose-600">
                    -{formatCurrency(
                      payslip.totalDeduction
                    )}
                  </p>
                </div>

                <div className="col-span-2 rounded-xl bg-blue-50 p-3">

                  <p className="text-xs text-blue-500">
                    Net Salary
                  </p>

                  <p className="mt-1 text-xl font-bold text-blue-700">
                    {formatCurrency(
                      payslip.netSalary
                    )}
                  </p>

                </div>

              </div>

              <div className="mt-4 flex gap-2">

                <button
                  type="button"
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 py-2.5 text-sm font-semibold text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                >
                  <Download size={16} />
                  PDF
                </button>

                <button
                  type="button"
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  <Mail size={16} />
                  Send
                </button>

              </div>

            </div>
          ))}

        </div>

        {/* Empty */}
        {filteredPayslips.length === 0 && (
          <div className="px-6 py-14 text-center">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
              <Search size={24} />
            </div>

            <h3 className="mt-4 text-base font-bold text-slate-900">
              No payslips found
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Try changing your search, period or state filter.
            </p>

          </div>
        )}

        {/* Footer */}
        <div className="flex flex-col gap-2 border-t border-slate-100 bg-slate-50/50 px-6 py-4 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex items-center gap-2">
            <Users size={16} />
            {filteredPayslips.length} payslips displayed
          </div>

          <p>
            Payslips are calculated from the employee&apos;s
            contract, salary structure and salary rules.
          </p>

        </div>
      </div>
    </div>
  );
}