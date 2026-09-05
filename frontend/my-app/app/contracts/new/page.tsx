"use client";

import Link from "next/link";
import {
  ArrowLeft,
  FileText,
  User,
  BriefcaseBusiness,
  CalendarDays,
  IndianRupee,
  Save,
  X,
  Clock3,
} from "lucide-react";

export default function NewContractPage() {
  return (
    <div className="min-h-full space-y-6 pb-10">
      {/* Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-indigo-600 to-violet-700 p-6 text-white shadow-xl shadow-indigo-100 sm:p-8">
        <div className="absolute -right-16 -top-20 h-56 w-56 rounded-full bg-white/10" />
        <div className="absolute -bottom-24 right-24 h-48 w-48 rounded-full bg-white/5" />

        <div className="relative z-10">
          <Link
            href="/contracts"
            className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-indigo-100 transition hover:text-white"
          >
            <ArrowLeft size={17} />
            Back to Contracts
          </Link>

          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm">
              <FileText size={28} />
            </div>

            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Create Contract
              </h1>

              <p className="mt-1 text-sm text-indigo-100 sm:text-base">
                Create a new employee contract and define salary information.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <form className="space-y-6">
        {/* Employee Information */}
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 bg-slate-50/70 px-6 py-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <User size={20} />
              </div>

              <div>
                <h2 className="font-bold text-slate-900">
                  Employee Information
                </h2>
                <p className="text-sm text-slate-500">
                  Select the employee for this contract.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 p-6 md:grid-cols-2">
            {/* Employee */}
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Employee <span className="text-rose-500">*</span>
              </label>

              <select
                required
                className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-50"
              >
                <option value="">Select Employee</option>
                <option value="1">Aarav Patel</option>
                <option value="2">Priya Shah</option>
                <option value="3">Rahul Mehta</option>
                <option value="4">Neha Desai</option>
              </select>
            </div>

            {/* Job Position */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Job Position
              </label>

              <div className="relative">
                <BriefcaseBusiness
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  placeholder="e.g. Software Developer"
                  className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-50"
                />
              </div>
            </div>

            {/* Employment Type */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Employment Type <span className="text-rose-500">*</span>
              </label>

              <select
                required
                className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-50"
              >
                <option value="">Select Type</option>
                <option value="full_time">Full Time</option>
                <option value="part_time">Part Time</option>
                <option value="contract">Contract</option>
                <option value="intern">Intern</option>
              </select>
            </div>
          </div>
        </div>

        {/* Contract Period */}
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 bg-slate-50/70 px-6 py-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <CalendarDays size={20} />
              </div>

              <div>
                <h2 className="font-bold text-slate-900">
                  Contract Period
                </h2>

                <p className="text-sm text-slate-500">
                  Define when the contract starts and ends.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 p-6 md:grid-cols-2">
            {/* Start Date */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Start Date <span className="text-rose-500">*</span>
              </label>

              <div className="relative">
                <CalendarDays
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="date"
                  required
                  className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-50"
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
                  className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-50"
                />
              </div>

              <p className="mt-2 text-xs text-slate-400">
                Leave empty if the contract has no fixed end date.
              </p>
            </div>

            {/* Status */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Contract Status
              </label>

              <div className="relative">
                <Clock3
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <select className="h-12 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-50">
                  <option value="draft">Draft</option>
                  <option value="running">Running</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Salary Information */}
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 bg-slate-50/70 px-6 py-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                <IndianRupee size={20} />
              </div>

              <div>
                <h2 className="font-bold text-slate-900">
                  Salary Information
                </h2>

                <p className="text-sm text-slate-500">
                  Define the salary that will be used by payroll.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 p-6 md:grid-cols-2">
            {/* Monthly Salary */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Monthly Salary <span className="text-rose-500">*</span>
              </label>

              <div className="relative">
                <IndianRupee
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="number"
                  min="0"
                  required
                  placeholder="65000"
                  className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-50"
                />
              </div>
            </div>

            {/* Salary Structure */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Salary Structure <span className="text-rose-500">*</span>
              </label>

              <select
                required
                className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-50"
              >
                <option value="">Select Salary Structure</option>
                <option value="monthly">Monthly Salary Structure</option>
                <option value="executive">Executive Salary Structure</option>
                <option value="contractor">Contractor Salary Structure</option>
              </select>
            </div>

            {/* Wage Type */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Wage Type
              </label>

              <select className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-50">
                <option value="monthly">Monthly</option>
                <option value="hourly">Hourly</option>
                <option value="daily">Daily</option>
              </select>
            </div>

            {/* Working Schedule */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Working Schedule
              </label>

              <select className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-50">
                <option value="">Select Working Schedule</option>
                <option value="standard">
                  Standard 40 Hours / Week
                </option>
                <option value="flexible">Flexible Schedule</option>
                <option value="part_time">Part Time Schedule</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notes */}
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="p-6">
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Contract Notes
            </label>

            <textarea
              rows={4}
              placeholder="Add any additional contract information..."
              className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-50"
            />
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Link
            href="/contracts"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50"
          >
            <X size={18} />
            Cancel
          </Link>

          <button
            type="submit"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-7 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition duration-200 hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-xl"
          >
            <Save size={18} />
            Save Contract
          </button>
        </div>
      </form>
    </div>
  );
}