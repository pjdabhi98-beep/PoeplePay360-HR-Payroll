
"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  CalendarDays,
  FileText,
  Send,
  User,
  Info,
} from "lucide-react";

export default function NewTimeOffPage() {
  const [formData, setFormData] = useState({
    employeeId: "",
    timeOffTypeId: "",
    startDate: "",
    endDate: "",
    reason: "",
    state: "draft",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("New Time Off Request:", formData);

    alert("Leave request submitted successfully!");
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
            href="/time-off"
            className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-slate-300 transition hover:text-white"
          >
            <ArrowLeft size={17} />
            Back to Time Off
          </Link>

          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-blue-600 p-3">
              <CalendarDays size={26} />
            </div>

            <div>
              <h1 className="text-2xl font-bold sm:text-3xl">
                New Leave Request
              </h1>

              <p className="mt-1 text-sm text-slate-300">
                Submit a leave request for approval.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Request Flow */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* Step 1 */}
        <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
              1
            </div>

            <div>
              <p className="font-bold text-blue-900">
                Request Details
              </p>

              <p className="text-sm text-blue-600">
                Select employee and leave type
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
                Leave Period
              </p>

              <p className="text-sm text-slate-500">
                Select start and end dates
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
                Approval
              </p>

              <p className="text-sm text-slate-500">
                Request goes through approval
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Employee Information */}
        <div className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-7">
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-xl bg-blue-50 p-2.5 text-blue-600">
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
            <label
              htmlFor="employeeId"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Employee
            </label>

            <select
              id="employeeId"
              name="employeeId"
              value={formData.employeeId}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
            >
              <option value="" disabled>
                Select employee
              </option>

              <option value="1">Aarav Patel</option>
              <option value="2">Priya Shah</option>
              <option value="3">Rahul Mehta</option>
              <option value="4">Neha Desai</option>
              <option value="5">Riya Mehta</option>
            </select>
          </div>
        </div>

        {/* Leave Details */}
        <div className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-7">
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-xl bg-blue-50 p-2.5 text-blue-600">
              <CalendarDays size={20} />
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Leave Details
              </h2>

              <p className="text-sm text-slate-500">
                Select the leave type and requested period.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {/* Time Off Type */}
            <div className="md:col-span-2">
              <label
                htmlFor="timeOffTypeId"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Leave Type
              </label>

              <select
                id="timeOffTypeId"
                name="timeOffTypeId"
                value={formData.timeOffTypeId}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
              >
                <option value="" disabled>
                  Select leave type
                </option>

                <option value="1">Paid Time Off</option>
                <option value="2">Sick Leave</option>
                <option value="3">Casual Leave</option>
                <option value="4">Unpaid Leave</option>
              </select>

              <p className="mt-2 text-xs text-slate-400">
                Leave types are managed through the Time Off Type configuration.
              </p>
            </div>

            {/* Start Date */}
            <div>
              <label
                htmlFor="startDate"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Start Date
              </label>

              <input
                id="startDate"
                name="startDate"
                type="date"
                value={formData.startDate}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
              />

              <p className="mt-2 text-xs text-slate-400">
                First day of the leave request.
              </p>
            </div>

            {/* End Date */}
            <div>
              <label
                htmlFor="endDate"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                End Date
              </label>

              <input
                id="endDate"
                name="endDate"
                type="date"
                value={formData.endDate}
                onChange={handleChange}
                min={formData.startDate || undefined}
                required
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
              />

              <p className="mt-2 text-xs text-slate-400">
                Last day of the leave request.
              </p>
            </div>
          </div>
        </div>

        {/* Computed Duration Information */}
        <div className="rounded-3xl border border-blue-100 bg-blue-50 p-5 sm:p-6">
          <div className="flex items-start gap-4">
            <div className="rounded-xl bg-blue-600 p-2.5 text-white">
              <Info size={20} />
            </div>

            <div>
              <h3 className="font-bold text-blue-900">
                Leave Duration
              </h3>

              <p className="mt-1 text-sm leading-6 text-blue-700">
                The number of leave days is calculated automatically from
                the selected start and end dates. You do not need to enter
                the duration manually.
              </p>
            </div>
          </div>
        </div>

        {/* Reason */}
        <div className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-7">
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-xl bg-blue-50 p-2.5 text-blue-600">
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
            id="reason"
            name="reason"
            rows={5}
            value={formData.reason}
            onChange={handleChange}
            placeholder="Enter the reason for your leave..."
            className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
          />
        </div>

        {/* Request Status */}
        <div className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-700">
                Request Status
              </p>

              <p className="mt-1 text-sm text-slate-500">
                New leave requests are created in Draft state.
              </p>
            </div>

            <span className="inline-flex w-fit rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold capitalize text-slate-700">
              {formData.state}
            </span>
          </div>
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
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100"
          >
            <Send size={18} />
            Submit Request
          </button>
        </div>
      </form>
    </div>
  );
}

