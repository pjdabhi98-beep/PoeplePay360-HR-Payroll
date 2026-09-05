"use client";

import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  Users,
  WalletCards,
  CheckCircle2,
} from "lucide-react";

export default function NewPayrunPage() {
  return (
    <div className="min-h-full space-y-6 pb-8">
      {/* Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-indigo-600 to-violet-700 p-6 text-white shadow-xl shadow-indigo-100 sm:p-8">
        <div className="absolute -right-16 -top-20 h-56 w-56 rounded-full bg-white/10" />
        <div className="absolute -bottom-24 right-24 h-48 w-48 rounded-full bg-white/5" />

        <div className="relative z-10">
          <Link
            href="/payroll"
            className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-indigo-100 transition hover:text-white"
          >
            <ArrowLeft size={17} />
            Back to Payroll
          </Link>

          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-white/15 p-3">
              <WalletCards size={26} />
            </div>

            <div>
              <h1 className="text-2xl font-bold sm:text-3xl">
                Create Payrun
              </h1>

              <p className="mt-1 text-sm text-indigo-100">
                Configure the payroll period and select employees.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Steps */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-indigo-200 bg-indigo-50 p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 font-bold text-white">
              1
            </div>

            <div>
              <p className="font-bold text-indigo-900">
                Payroll Configuration
              </p>

              <p className="text-sm text-indigo-600">
                Set period and salary structure
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 font-bold text-slate-500">
              2
            </div>

            <div>
              <p className="font-bold text-slate-800">
                Employee Selection
              </p>

              <p className="text-sm text-slate-500">
                Select employees for this payrun
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Payroll Configuration */}
      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
        <div className="mb-6 flex items-center gap-3">
          <div className="rounded-xl bg-indigo-50 p-2.5 text-indigo-600">
            <CalendarDays size={20} />
          </div>

          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Payroll Configuration
            </h2>

            <p className="text-sm text-slate-500">
              Select the payroll period and salary structure.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {/* Payroll Period */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Payroll Period
            </label>

            <input
              type="month"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
            />

            <p className="mt-2 text-xs text-slate-400">
              Example: September 2026
            </p>
          </div>

          {/* Salary Structure */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Salary Structure
            </label>

            <select
              defaultValue=""
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
            >
              <option value="" disabled>
                Select salary structure
              </option>

              <option value="monthly">
                Monthly Salary
              </option>

              <option value="contract">
                Contract Employee
              </option>

              <option value="intern">
                Intern Salary
              </option>
            </select>

            <p className="mt-2 text-xs text-slate-400">
              Salary rules will be applied during computation.
            </p>
          </div>
        </div>
      </div>

      {/* Employee Selection */}
      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-violet-50 p-2.5 text-violet-600">
              <Users size={20} />
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Employee Selection
              </h2>

              <p className="text-sm text-slate-500">
                Choose employees to include in this payrun.
              </p>
            </div>
          </div>

          <span className="hidden rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-bold text-indigo-600 sm:block">
            248 Eligible
          </span>
        </div>

        <div className="space-y-3">
          {/* Employee 1 */}
          <label className="flex cursor-pointer items-center gap-4 rounded-2xl border border-slate-200 p-4 transition hover:border-indigo-300 hover:bg-indigo-50/30">
            <input
              type="checkbox"
              defaultChecked
              className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
            />

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-sm font-bold text-white">
              A
            </div>

            <div className="flex-1">
              <p className="font-semibold text-slate-900">
                Aarav Patel
              </p>

              <p className="text-xs text-slate-500">
                Engineering • Software Developer
              </p>
            </div>

            <p className="hidden font-bold text-slate-700 sm:block">
              ₹65,000
            </p>
          </label>

          {/* Employee 2 */}
          <label className="flex cursor-pointer items-center gap-4 rounded-2xl border border-slate-200 p-4 transition hover:border-indigo-300 hover:bg-indigo-50/30">
            <input
              type="checkbox"
              defaultChecked
              className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
            />

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-sm font-bold text-white">
              P
            </div>

            <div className="flex-1">
              <p className="font-semibold text-slate-900">
                Priya Shah
              </p>

              <p className="text-xs text-slate-500">
                Human Resources • HR Manager
              </p>
            </div>

            <p className="hidden font-bold text-slate-700 sm:block">
              ₹72,000
            </p>
          </label>

          {/* Employee 3 */}
          <label className="flex cursor-pointer items-center gap-4 rounded-2xl border border-slate-200 p-4 transition hover:border-indigo-300 hover:bg-indigo-50/30">
            <input
              type="checkbox"
              defaultChecked
              className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
            />

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-sm font-bold text-white">
              R
            </div>

            <div className="flex-1">
              <p className="font-semibold text-slate-900">
                Rahul Mehta
              </p>

              <p className="text-xs text-slate-500">
                Finance • Accountant
              </p>
            </div>

            <p className="hidden font-bold text-slate-700 sm:block">
              ₹58,000
            </p>
          </label>

          {/* Employee 4 */}
          <label className="flex cursor-pointer items-center gap-4 rounded-2xl border border-slate-200 p-4 transition hover:border-indigo-300 hover:bg-indigo-50/30">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
            />

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-sm font-bold text-white">
              N
            </div>

            <div className="flex-1">
              <p className="font-semibold text-slate-900">
                Neha Desai
              </p>

              <p className="text-xs text-slate-500">
                Marketing • Marketing Executive
              </p>
            </div>

            <p className="hidden font-bold text-slate-700 sm:block">
              ₹48,000
            </p>
          </label>
        </div>
      </div>

      {/* Summary */}
      <div className="rounded-3xl border border-indigo-100 bg-indigo-50 p-5 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-indigo-700">
              Payrun Summary
            </p>

            <p className="mt-1 text-sm text-indigo-600">
              3 employees selected for this payroll period.
            </p>
          </div>

          <div className="text-left sm:text-right">
            <p className="text-xs text-indigo-500">
              Estimated Payroll
            </p>

            <p className="text-2xl font-bold text-indigo-900">
              ₹1,95,000
            </p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Link
          href="/payroll"
          className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          Cancel
        </Link>

        <button
          type="button"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition hover:-translate-y-0.5 hover:bg-indigo-700"
        >
          <CheckCircle2 size={18} />
          Create Payrun
        </button>
      </div>
    </div>
  );
}