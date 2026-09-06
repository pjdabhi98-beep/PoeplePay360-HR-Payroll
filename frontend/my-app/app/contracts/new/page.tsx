
"use client";

import Link from "next/link";
import {
  ArrowLeft,
  FileText,
  User,
  CalendarDays,
  IndianRupee,
  Save,
  X,
  Clock3,
  BriefcaseBusiness,
} from "lucide-react";

export default function NewContractPage() {
  return (
    <div className="min-h-full space-y-6 pb-10">

      {/* Header */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900 p-6 text-white sm:p-8">
        {/* Decorative circles */}
        <div className="absolute -right-16 -top-20 h-56 w-56 rounded-full bg-blue-600/20" />
        <div className="absolute -bottom-24 right-24 h-48 w-48 rounded-full bg-blue-500/10" />

        <div className="relative z-10">

          {/* Back Button */}
          <Link
            href="/contracts"
            className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-slate-300 transition hover:text-white"
          >
            <ArrowLeft size={17} />
            Back to Contracts
          </Link>

          {/* Title */}
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600/20 text-blue-300">
              <FileText size={28} />
            </div>

            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Create Contract
              </h1>

              <p className="mt-1 text-sm text-slate-300 sm:text-base">
                Create a contract for an employee and define salary details.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <form className="space-y-6">

        {/* Contract Information */}
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white">

          {/* Section Header */}
          <div className="border-b border-slate-100 bg-slate-50/70 px-6 py-5">
            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <BriefcaseBusiness size={20} />
              </div>

              <div>
                <h2 className="font-bold text-slate-900">
                  Contract Information
                </h2>

                <p className="text-sm text-slate-500">
                  Enter the basic information for this employee contract.
                </p>
              </div>
            </div>
          </div>

          {/* Fields */}
          <div className="grid grid-cols-1 gap-5 p-6 md:grid-cols-2">

            {/* Contract Name */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Contract Name{" "}
                <span className="text-rose-500">*</span>
              </label>

              <div className="relative">
                <FileText
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  required
                  placeholder="e.g. Aarav Patel - Employment Contract"
                  className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50"
                />
              </div>
            </div>

            {/* Employee */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Employee{" "}
                <span className="text-rose-500">*</span>
              </label>

              <div className="relative">
                <User
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <select
                  required
                  className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50"
                >
                  <option value="">Select Employee</option>
                  <option value="1">Aarav Patel</option>
                  <option value="2">Priya Shah</option>
                  <option value="3">Rahul Mehta</option>
                  <option value="4">Neha Desai</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Contract Period */}
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white">

          {/* Section Header */}
          <div className="border-b border-slate-100 bg-slate-50/70 px-6 py-5">
            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <CalendarDays size={20} />
              </div>

              <div>
                <h2 className="font-bold text-slate-900">
                  Contract Period
                </h2>

                <p className="text-sm text-slate-500">
                  Define the start and end dates of the contract.
                </p>
              </div>
            </div>
          </div>

          {/* Date Fields */}
          <div className="grid grid-cols-1 gap-5 p-6 md:grid-cols-2">

            {/* Start Date */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Start Date{" "}
                <span className="text-rose-500">*</span>
              </label>

              <div className="relative">
                <CalendarDays
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="date"
                  required
                  className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50"
                />
              </div>
            </div>

            {/* End Date */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                End Date
              </label>

              <div className="relative">
                <CalendarDays
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="date"
                  className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50"
                />
              </div>

              <p className="mt-2 text-xs text-slate-400">
                Optional. Leave empty if the contract has no fixed end date.
              </p>
            </div>
          </div>
        </div>

        {/* Salary Information */}
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white">

          {/* Section Header */}
          <div className="border-b border-slate-100 bg-slate-50/70 px-6 py-5">
            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <IndianRupee size={20} />
              </div>

              <div>
                <h2 className="font-bold text-slate-900">
                  Salary Information
                </h2>

                <p className="text-sm text-slate-500">
                  Define the wage and salary structure used by payroll.
                </p>
              </div>
            </div>
          </div>

          {/* Salary Fields */}
          <div className="grid grid-cols-1 gap-5 p-6 md:grid-cols-2">

            {/* Wage */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Wage{" "}
                <span className="text-rose-500">*</span>
              </label>

              <div className="relative">
                <IndianRupee
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="number"
                  min="0"
                  step="0.01"
                  required
                  placeholder="65000"
                  className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50"
                />
              </div>

              <p className="mt-2 text-xs text-slate-400">
                Enter the wage amount associated with this contract.
              </p>
            </div>

            {/* Salary Structure */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Salary Structure{" "}
                <span className="text-rose-500">*</span>
              </label>

              <div className="relative">
                <FileText
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <select
                  required
                  className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50"
                >
                  <option value="">Select Salary Structure</option>
                  <option value="1">Monthly Salary Structure</option>
                  <option value="2">Executive Salary Structure</option>
                  <option value="3">Contractor Salary Structure</option>
                </select>
              </div>

              <p className="mt-2 text-xs text-slate-400">
                Salary rules from this structure will be used to calculate
                payslips.
              </p>
            </div>
          </div>
        </div>

        {/* Contract State */}
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white">

          {/* Section Header */}
          <div className="border-b border-slate-100 bg-slate-50/70 px-6 py-5">
            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                <Clock3 size={20} />
              </div>

              <div>
                <h2 className="font-bold text-slate-900">
                  Contract Status
                </h2>

                <p className="text-sm text-slate-500">
                  Set the current state of the contract.
                </p>
              </div>
            </div>
          </div>

          <div className="p-6">

            <label className="mb-2 block text-sm font-semibold text-slate-700">
              State
            </label>

            <div className="relative max-w-md">
              <Clock3
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <select
                defaultValue="draft"
                className="h-12 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50"
              >
                <option value="draft">Draft</option>
                <option value="running">Running</option>
                <option value="expired">Expired</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <p className="mt-2 text-xs text-slate-400">
              Contract state is used to determine whether the contract is
              active for payroll processing.
            </p>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

          {/* Cancel */}
          <Link
            href="/contracts"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50"
          >
            <X size={18} />
            Cancel
          </Link>

          {/* Save */}
          <button
            type="submit"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 px-7 text-sm font-bold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-blue-700"
          >
            <Save size={18} />
            Save Contract
          </button>
        </div>
      </form>
    </div>
  );
}
