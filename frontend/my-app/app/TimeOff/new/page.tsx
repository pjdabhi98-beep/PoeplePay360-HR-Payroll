"use client";

import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  FileText,
  Send,
  User,
} from "lucide-react";

export default function NewTimeOffPage() {
  return (
    <div className="min-h-full space-y-6 pb-8">
      {/* Header */}
      <div className="rounded-3xl bg-gradient-to-br from-indigo-600 via-indigo-600 to-violet-700 p-6 text-white shadow-xl shadow-indigo-100 sm:p-8">
        <Link
          href="/time-off"
          className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-indigo-100 transition hover:text-white"
        >
          <ArrowLeft size={17} />
          Back to Time Off
        </Link>

        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-white/15 p-3">
            <CalendarDays size={26} />
          </div>

          <div>
            <h1 className="text-2xl font-bold sm:text-3xl">
              New Leave Request
            </h1>
            <p className="mt-1 text-sm text-indigo-100">
              Submit a leave request for approval.
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form className="space-y-6">
        {/* Employee Information */}
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-xl bg-indigo-50 p-2.5 text-indigo-600">
              <User size={20} />
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Employee Information
              </h2>
              <p className="text-sm text-slate-500">
                Select the employee requesting leave.
              </p>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Employee
            </label>

            <select
              name="employee"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
              defaultValue=""
            >
              <option value="" disabled>
                Select employee
              </option>
              <option value="aarav">Aarav Patel</option>
              <option value="priya">Priya Shah</option>
              <option value="rahul">Rahul Mehta</option>
              <option value="neha">Neha Desai</option>
              <option value="riya">Riya Mehta</option>
            </select>
          </div>
        </div>

        {/* Leave Details */}
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-xl bg-violet-50 p-2.5 text-violet-600">
              <CalendarDays size={20} />
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Leave Details
              </h2>
              <p className="text-sm text-slate-500">
                Enter the leave type and requested dates.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {/* Leave Type */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Leave Type
              </label>

              <select
                name="leaveType"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                defaultValue=""
              >
                <option value="" disabled>
                  Select leave type
                </option>
                <option value="paid">Paid Time Off</option>
                <option value="sick">Sick Leave</option>
                <option value="casual">Casual Leave</option>
                <option value="unpaid">Unpaid Leave</option>
              </select>
            </div>

            {/* Start Date */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Start Date
              </label>

              <input
                type="date"
                name="startDate"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
              />
            </div>

            {/* End Date */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                End Date
              </label>

              <input
                type="date"
                name="endDate"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
              />
            </div>

            {/* Duration */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Duration
              </label>

              <input
                type="number"
                name="duration"
                min="1"
                placeholder="Number of days"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
              />
            </div>
          </div>
        </div>

        {/* Reason */}
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-xl bg-emerald-50 p-2.5 text-emerald-600">
              <FileText size={20} />
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Request Reason
              </h2>
              <p className="text-sm text-slate-500">
                Provide a short explanation for the leave.
              </p>
            </div>
          </div>

          <textarea
            name="reason"
            rows={5}
            placeholder="Enter the reason for your leave..."
            className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
          />
        </div>

        {/* Actions */}
        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Link
            href="/time-off"
            className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Cancel
          </Link>

          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition hover:-translate-y-0.5 hover:bg-indigo-700"
          >
            <Send size={18} />
            Submit Request
          </button>
        </div>
      </form>
    </div>
  );
}