"use client";

import { useState } from "react";
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
Receipt,
} from "lucide-react";

type Payslip = {
id: number;
name: string;
employee: string;
contract: string;
payrun: string;
dateFrom: string;
dateTo: string;
grossSalary: string;
totalDeduction: string;
netSalary: string;
state: string;
lines: {
name: string;
code: string;
type: string;
amount: string;
}[];
};

const payslips: Payslip[] = [];

export default function PayslipsPage() {
const [search, setSearch] = useState("");
const [stateFilter, setStateFilter] = useState("All");
const [periodFilter, setPeriodFilter] = useState("All");



const paidCount = payslips.filter(
(payslip) => payslip.state === "Paid"
).length;

const computedCount = payslips.filter(
(payslip) => payslip.state === "Computed"
).length;

const totalNetSalary = payslips.reduce(
(total, payslip) =>
total + Number(payslip.netSalary.replace(/[₹,]/g, "")),
0
);



const filteredPayslips = payslips.filter((payslip) => {
const searchText = search.toLowerCase();


const matchesSearch =
  payslip.employee.toLowerCase().includes(searchText) ||
  payslip.name.toLowerCase().includes(searchText) ||
  payslip.contract.toLowerCase().includes(searchText) ||
  payslip.payrun.toLowerCase().includes(searchText);

const matchesState =
  stateFilter === "All" ||
  payslip.state === stateFilter;

const matchesPeriod =
  periodFilter === "All" ||
  payslip.dateFrom.includes(periodFilter);

return matchesSearch && matchesState && matchesPeriod;

});

// ================= STATE COLORS =================

const getStateStyle = (state: string) => {
switch (state) {
case "Paid":
return "bg-emerald-50 text-emerald-700 border border-emerald-100";


  case "Computed":
    return "bg-blue-50 text-blue-700 border border-blue-100";

  case "Draft":
    return "bg-slate-100 text-slate-600 border border-slate-200";

  case "Cancelled":
    return "bg-rose-50 text-rose-700 border border-rose-100";

  default:
    return "bg-slate-100 text-slate-600 border border-slate-200";
}


};

return ( <div className="min-h-full space-y-6 pb-8">


 

  <div className="relative overflow-hidden rounded-2xl bg-slate-900 p-6 text-white sm:p-8">

    {/* Decorative background */}

    <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-blue-600/20 blur-3xl" />

    <div className="absolute -bottom-24 right-40 h-56 w-56 rounded-full bg-blue-500/10 blur-3xl" />

    <div className="relative flex flex-col justify-between gap-6 lg:flex-row lg:items-center">

      <div>

        {/* Small heading */}

        <div className="mb-3 flex items-center gap-2">

          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600">
            <FileText size={18} />
          </div>

          <p className="text-sm font-medium text-slate-300">
            Payroll Management
          </p>

        </div>

        {/* Main title */}

        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Payslips
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
          View employee payslips, salary details, deductions,
          net salary and payment status.
        </p>

      </div>

      {/* Header information */}

      <div className="flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-800/70 px-4 py-3">

        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600/20 text-blue-400">
          <Receipt size={20} />
        </div>

        <div>
          <p className="text-xs text-slate-400">
            Payslip Records
          </p>

          <p className="text-lg font-bold text-white">
            {payslips.length}
          </p>
        </div>

      </div>

    </div>
  </div>



  <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

    {/* Total Payslips */}

    <div className="group rounded-2xl border border-slate-200 bg-white p-5 transition duration-200 hover:-translate-y-1 hover:border-blue-200">

      <div className="flex items-center justify-between">

        <div>
          <p className="text-sm font-medium text-slate-500">
            Total Payslips
          </p>

          <p className="mt-2 text-3xl font-bold text-slate-900">
            {payslips.length}
          </p>

          <p className="mt-1 text-xs text-slate-400">
            All generated payslips
          </p>
        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-100">
          <FileText size={22} />
        </div>

      </div>

    </div>

    {/* Paid */}

    <div className="group rounded-2xl border border-slate-200 bg-white p-5 transition duration-200 hover:-translate-y-1 hover:border-emerald-200">

      <div className="flex items-center justify-between">

        <div>
          <p className="text-sm font-medium text-slate-500">
            Paid
          </p>

          <p className="mt-2 text-3xl font-bold text-slate-900">
            {paidCount}
          </p>

          <p className="mt-1 text-xs text-slate-400">
            Successfully paid
          </p>
        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 transition group-hover:bg-emerald-100">
          <CheckCircle2 size={22} />
        </div>

      </div>

    </div>

    {/* Computed */}

    <div className="group rounded-2xl border border-slate-200 bg-white p-5 transition duration-200 hover:-translate-y-1 hover:border-blue-200">

      <div className="flex items-center justify-between">

        <div>
          <p className="text-sm font-medium text-slate-500">
            Computed
          </p>

          <p className="mt-2 text-3xl font-bold text-slate-900">
            {computedCount}
          </p>

          <p className="mt-1 text-xs text-slate-400">
            Ready for payment
          </p>
        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-100">
          <Clock3 size={22} />
        </div>

      </div>

    </div>

    {/* Total Net Salary */}

    <div className="group rounded-2xl border border-slate-200 bg-white p-5 transition duration-200 hover:-translate-y-1 hover:border-slate-300">

      <div className="flex items-center justify-between">

        <div>
          <p className="text-sm font-medium text-slate-500">
            Total Net Salary
          </p>

          <p className="mt-2 text-3xl font-bold text-slate-900">
            ₹{totalNetSalary.toLocaleString("en-IN")}
          </p>

          <p className="mt-1 text-xs text-slate-400">
            Across all payslips
          </p>
        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition group-hover:bg-slate-200">
          <IndianRupee size={22} />
        </div>

      </div>

    </div>

  </div>

  {/* ================= PAYSLIP DIRECTORY ================= */}

  <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">

    {/* Toolbar */}

    <div className="border-b border-slate-200 p-5">

      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">

        <div>

          <div className="flex items-center gap-2">

            <FileText
              size={19}
              className="text-blue-600"
            />

            <h2 className="text-lg font-bold text-slate-900">
              Payslip Records
            </h2>

          </div>

          <p className="mt-1 text-sm text-slate-500">
            View salary details and payment information for employees.
          </p>

        </div>

        <div className="flex flex-col gap-3 sm:flex-row">

          {/* Search */}

          <div className="flex items-center rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 transition focus-within:border-blue-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-50 sm:w-80">

            <Search
              size={17}
              className="text-slate-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search payslip, employee..."
              className="ml-2 w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
            />

          </div>

          {/* State */}

          <select
            value={stateFilter}
            onChange={(e) => setStateFilter(e.target.value)}
            className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-600 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50"
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

          {/* Period */}

          <select
            value={periodFilter}
            onChange={(e) => setPeriodFilter(e.target.value)}
            className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-600 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50"
          >
            <option value="All">
              All Periods
            </option>
          </select>

        </div>

      </div>

    </div>

    {/* ================= DESKTOP TABLE ================= */}

    <div className="hidden overflow-x-auto lg:block">

      <table className="w-full min-w-[1200px]">

        <thead>

          <tr className="border-b border-slate-200 bg-slate-50">

            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              Payslip
            </th>

            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              Employee
            </th>

            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              Payrun
            </th>

            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              Period
            </th>

            <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
              Gross
            </th>

            <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
              Deduction
            </th>

            <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
              Net Salary
            </th>

            <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
              State
            </th>

            <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {filteredPayslips.length > 0 ? (

            filteredPayslips.map((payslip) => (

              <tr
                key={payslip.id}
                className="group border-b border-slate-100 transition-colors hover:bg-blue-50/40"
              >

                {/* Payslip */}

                <td className="px-6 py-4">

                  <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-100">

                      <FileText size={17} />

                    </div>

                    <div>

                      <p className="font-semibold text-slate-900">
                        {payslip.name}
                      </p>

                      <p className="mt-1 text-xs text-blue-600">
                        {payslip.contract}
                      </p>

                    </div>

                  </div>

                </td>

                {/* Employee */}

                <td className="px-6 py-4">

                  <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 font-semibold text-slate-600 transition group-hover:bg-blue-100 group-hover:text-blue-700">

                      {payslip.employee.charAt(0)}

                    </div>

                    <span className="text-sm font-medium text-slate-700">
                      {payslip.employee}
                    </span>

                  </div>

                </td>

                {/* Payrun */}

                <td className="px-6 py-4">

                  <span className="inline-flex items-center rounded-lg bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-600">
                    {payslip.payrun}
                  </span>

                </td>

                {/* Period */}

                <td className="px-6 py-4">

                  <div className="flex items-center gap-2 text-sm text-slate-600">

                    <CalendarDays
                      size={15}
                      className="text-slate-400"
                    />

                    <span>
                      {payslip.dateFrom} - {payslip.dateTo}
                    </span>

                  </div>

                </td>

                {/* Gross */}

                <td className="px-6 py-4 text-right text-sm font-medium text-slate-700">
                  {payslip.grossSalary}
                </td>

                {/* Deduction */}

                <td className="px-6 py-4 text-right text-sm font-medium text-rose-600">
                  {payslip.totalDeduction}
                </td>

                {/* Net */}

                <td className="px-6 py-4 text-right text-sm font-bold text-slate-900">
                  {payslip.netSalary}
                </td>

                {/* State */}

                <td className="px-6 py-4 text-center">

                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold ${getStateStyle(
                      payslip.state
                    )}`}
                  >

                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        payslip.state === "Paid"
                          ? "bg-emerald-500"
                          : payslip.state === "Computed"
                          ? "bg-blue-500"
                          : payslip.state === "Cancelled"
                          ? "bg-rose-500"
                          : "bg-slate-400"
                      }`}
                    />

                    {payslip.state}

                  </span>

                </td>

                {/* Actions */}

                <td className="px-6 py-4">

                  <div className="flex justify-end gap-2">

                    <button
                      type="button"
                      title="Download Payslip"
                      className="rounded-lg border border-slate-200 p-2 text-slate-500 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                    >
                      <Download size={16} />
                    </button>

                    <button
                      type="button"
                      title="Send Payslip"
                      className="rounded-lg border border-slate-200 p-2 text-slate-500 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                    >
                      <Mail size={16} />
                    </button>

                  </div>

                </td>

              </tr>

            ))

          ) : (

            <tr>

              <td
                colSpan={9}
                className="px-6 py-16 text-center"
              >

                <div className="mx-auto flex max-w-md flex-col items-center">

                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-500">
                    <FileText size={28} />
                  </div>

                  <h3 className="mt-5 text-base font-semibold text-slate-900">
                    No payslips available
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Payslips will appear here once they are generated
                    from the payroll process.
                  </p>

                </div>

              </td>

            </tr>

          )}

        </tbody>

      </table>

    </div>

    {/* ================= MOBILE / TABLET ================= */}

    <div className="divide-y divide-slate-100 lg:hidden">

      {filteredPayslips.length > 0 ? (

        filteredPayslips.map((payslip) => (

          <div
            key={payslip.id}
            className="p-5 transition hover:bg-blue-50/30"
          >

            {/* Top */}

            <div className="flex items-start justify-between gap-4">

              <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 font-bold text-blue-600">
                  <FileText size={18} />
                </div>

                <div>

                  <p className="font-semibold text-slate-900">
                    {payslip.name}
                  </p>

                  <p className="text-xs font-medium text-blue-600">
                    {payslip.contract}
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

            {/* Employee */}

            <div className="mt-4 flex items-center gap-3">

              <Users
                size={16}
                className="text-blue-600"
              />

              <span className="text-sm font-medium text-slate-700">
                {payslip.employee}
              </span>

            </div>

            {/* Period */}

            <div className="mt-3 flex items-center gap-3">

              <CalendarDays
                size={16}
                className="text-slate-400"
              />

              <span className="text-sm text-slate-600">
                {payslip.dateFrom} - {payslip.dateTo}
              </span>

            </div>

            {/* Salary Details */}

            <div className="mt-4 grid grid-cols-3 gap-3 border-t border-slate-100 pt-3">

              <div className="rounded-xl bg-slate-50 p-3">

                <p className="text-xs text-slate-400">
                  Gross
                </p>

                <p className="mt-1 text-sm font-semibold text-slate-700">
                  {payslip.grossSalary}
                </p>

              </div>

              <div className="rounded-xl bg-rose-50 p-3">

                <p className="text-xs text-rose-500">
                  Deduction
                </p>

                <p className="mt-1 text-sm font-bold text-rose-600">
                  {payslip.totalDeduction}
                </p>

              </div>

              <div className="rounded-xl bg-blue-50 p-3">

                <p className="text-xs text-blue-600">
                  Net
                </p>

                <p className="mt-1 text-sm font-bold text-blue-700">
                  {payslip.netSalary}
                </p>

              </div>

            </div>

            {/* Actions */}

            <div className="mt-4 flex gap-2 border-t border-slate-100 pt-3">

              <button
                type="button"
                className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
              >
                <Download size={16} />
                Download
              </button>

              <button
                type="button"
                className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
              >
                <Mail size={16} />
                Send
              </button>

            </div>

          </div>

        ))

      ) : (

        <div className="px-5 py-12 text-center">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-500">
            <FileText size={28} />
          </div>

          <h3 className="mt-5 text-base font-semibold text-slate-900">
            No payslips available
          </h3>

          <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
            Payslips will appear here once they are generated
            from the payroll process.
          </p>

        </div>

      )}

    </div>

    {/* ================= FOOTER ================= */}

    <div className="flex flex-col gap-3 border-t border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">

      <p className="text-sm text-slate-500">

        Showing{" "}

        <span className="font-semibold text-slate-700">
          {filteredPayslips.length}
        </span>{" "}

        of{" "}

        <span className="font-semibold text-slate-700">
          {payslips.length}
        </span>{" "}

        payslips

      </p>

      <div className="flex items-center gap-2 text-xs text-slate-400">

        <span className="h-2 w-2 rounded-full bg-blue-500" />

        Payroll management

      </div>

    </div>

  </div>

</div>
);
}
