
"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  CalendarDays,
  WalletCards,
  CheckCircle2,
  Info,
  FileText,
} from "lucide-react";

export default function NewPayrunPage() {
  const [formData, setFormData] = useState({
    name: "",
    dateStart: "",
    dateEnd: "",
    state: "draft",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("New Payrun:", formData);

    alert("Payrun created successfully!");
  };

  return (
    <div className="min-h-full space-y-6 pb-8">
      {/* Header */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900 p-6 text-white sm:p-8">
        {/* Decorative shapes */}
        <div className="absolute -right-16 -top-20 h-56 w-56 rounded-full bg-blue-600/20" />
        <div className="absolute -bottom-24 right-24 h-48 w-48 rounded-full bg-blue-500/10" />

        <div className="relative z-10">
          <Link
            href="/payroll"
            className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-slate-300 transition hover:text-white"
          >
            <ArrowLeft size={17} />
            Back to Payroll
          </Link>

          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-blue-600 p-3">
              <WalletCards size={26} />
            </div>

            <div>
              <h1 className="text-2xl font-bold sm:text-3xl">
                Create Payrun
              </h1>

              <p className="mt-1 text-sm text-slate-300">
                Create a payroll run for a specific date range.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Payrun Flow */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* Step 1 */}
        <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
              1
            </div>

            <div>
              <p className="font-bold text-blue-900">
                Create Payrun
              </p>
              <p className="text-sm text-blue-600">
                Set payroll period
              </p>
            </div>
          </div>
        </div>

        {/* Step 2 */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 font-bold text-slate-500">
              2
            </div>

            <div>
              <p className="font-bold text-slate-800">
                Process Payrun
              </p>
              <p className="text-sm text-slate-500">
                Generate employee payslips
              </p>
            </div>
          </div>
        </div>

        {/* Step 3 */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 font-bold text-slate-500">
              3
            </div>

            <div>
              <p className="font-bold text-slate-800">
                Complete Payroll
              </p>
              <p className="text-sm text-slate-500">
                Review generated payslips
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Payrun Information */}
        <div className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-7">
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-xl bg-blue-50 p-2.5 text-blue-600">
              <CalendarDays size={20} />
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Payrun Information
              </h2>

              <p className="text-sm text-slate-500">
                Enter the details for this payroll run.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {/* Payrun Name */}
            <div className="md:col-span-2">
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Payrun Name
              </label>

              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Example: September 2026 Payroll"
                required
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
              />

              <p className="mt-2 text-xs text-slate-400">
                Give this payroll run a clear and meaningful name.
              </p>
            </div>

            {/* Start Date */}
            <div>
              <label
                htmlFor="dateStart"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Start Date
              </label>

              <input
                id="dateStart"
                name="dateStart"
                type="date"
                value={formData.dateStart}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
              />

              <p className="mt-2 text-xs text-slate-400">
                First day included in this payroll period.
              </p>
            </div>

            {/* End Date */}
            <div>
              <label
                htmlFor="dateEnd"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                End Date
              </label>

              <input
                id="dateEnd"
                name="dateEnd"
                type="date"
                value={formData.dateEnd}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
              />

              <p className="mt-2 text-xs text-slate-400">
                Last day included in this payroll period.
              </p>
            </div>

            {/* State */}
            <div>
              <label
                htmlFor="state"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                State
              </label>

              <select
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
              >
                <option value="draft">Draft</option>
                <option value="processing">Processing</option>
                <option value="done">Done</option>
                <option value="cancelled">Cancelled</option>
              </select>

              <p className="mt-2 text-xs text-slate-400">
                New payruns normally start in Draft state.
              </p>
            </div>
          </div>
        </div>

        {/* Payroll Processing Information */}
        <div className="rounded-3xl border border-blue-100 bg-blue-50 p-5 sm:p-6">
          <div className="flex items-start gap-4">
            <div className="rounded-xl bg-blue-600 p-2.5 text-white">
              <Info size={20} />
            </div>

            <div>
              <h3 className="font-bold text-blue-900">
                How employee payslips are generated
              </h3>

              <p className="mt-1 text-sm leading-6 text-blue-700">
                When this payrun is processed, the system automatically
                finds employees who have a running contract and creates
                their payslips for this payroll period.
              </p>
            </div>
          </div>
        </div>

        {/* What Happens Next */}
        <div className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-7">
          <div className="mb-5 flex items-center gap-3">
            <div className="rounded-xl bg-slate-100 p-2.5 text-slate-700">
              <FileText size={20} />
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-900">
                What happens next?
              </h2>

              <p className="text-sm text-slate-500">
                Payroll processing follows the configured salary rules.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-bold text-slate-900">
                01. Find Employees
              </p>

              <p className="mt-1 text-xs leading-5 text-slate-500">
                Employees with running contracts are included.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-bold text-slate-900">
                02. Compute
              </p>

              <p className="mt-1 text-xs leading-5 text-slate-500">
                Salary structures and salary rules calculate the payslip.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-bold text-slate-900">
                03. Review
              </p>

              <p className="mt-1 text-xs leading-5 text-slate-500">
                Generated payslips can be reviewed before completion.
              </p>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="rounded-3xl border border-blue-100 bg-blue-50 p-5 sm:p-6">
          <div className="flex items-center gap-4">
            <div className="rounded-2xl bg-white p-3 text-blue-600">
              <WalletCards size={22} />
            </div>

            <div>
              <p className="text-sm font-semibold text-blue-700">
                Payrun Status
              </p>

              <p className="mt-1 text-sm text-blue-600">
                This payrun will be created as a Draft and can be processed
                after creation.
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
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100"
          >
            <CheckCircle2 size={18} />
            Create Payrun
          </button>
        </div>
      </form>
    </div>
  );
}

