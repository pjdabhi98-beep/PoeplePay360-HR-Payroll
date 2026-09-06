
"use client";

import { useState } from "react";
import Link from "next/link";

import {
  ArrowLeft,
  UserPlus,
  User,
  Building2,
  BriefcaseBusiness,
  CalendarClock,
  Hash,
  Save,
  X,
  UserRoundCheck,
} from "lucide-react";

export default function NewEmployeePage() {
  const [formData, setFormData] = useState({
    name: "",
    employeeCode: "",
    department: "",
    manager: "",
    jobPosition: "",
    schedule: "",
    status: "active",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("New Employee:", formData);

    alert("Employee added successfully!");
  };

  return (
    <div className="min-h-full space-y-6 bg-slate-50 pb-10">

      {/* Header */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900 p-6 text-white sm:p-8">

        {/* Decorative shapes */}
        <div className="absolute -right-16 -top-20 h-56 w-56 rounded-full bg-blue-600/20" />
        <div className="absolute -bottom-24 right-24 h-48 w-48 rounded-full bg-blue-500/10" />

        <div className="relative z-10">

          {/* Back */}
          <Link
            href="/employees"
            className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-slate-300 transition hover:text-white"
          >
            <ArrowLeft size={17} />
            Back to Employees
          </Link>

          {/* Title */}
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600/20 text-blue-300">
              <UserPlus size={28} />
            </div>

            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Add New Employee
              </h1>

              <p className="mt-1 text-sm text-slate-300 sm:text-base">
                Create an employee profile and assign their workplace details.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Basic Information */}
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white">

          {/* Section Header */}
          <div className="border-b border-slate-100 bg-slate-50/70 px-6 py-5">
            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <User size={20} />
              </div>

              <div>
                <h2 className="font-bold text-slate-900">
                  Employee Information
                </h2>

                <p className="text-sm text-slate-500">
                  Enter the employee&apos;s basic information.
                </p>
              </div>
            </div>
          </div>

          {/* Fields */}
          <div className="grid grid-cols-1 gap-5 p-6 md:grid-cols-2">

            {/* Employee Name */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Employee Name{" "}
                <span className="text-rose-500">*</span>
              </label>

              <div className="relative">
                <User
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter employee name"
                  className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50"
                />
              </div>
            </div>

            {/* Employee Code */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Employee Code{" "}
                <span className="text-rose-500">*</span>
              </label>

              <div className="relative">
                <Hash
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  name="employeeCode"
                  value={formData.employeeCode}
                  onChange={handleChange}
                  required
                  placeholder="e.g. EMP001"
                  className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50"
                />
              </div>

              <p className="mt-2 text-xs text-slate-400">
                Employee code should be unique.
              </p>
            </div>
          </div>
        </div>

        {/* Employment Information */}
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white">

          {/* Section Header */}
          <div className="border-b border-slate-100 bg-slate-50/70 px-6 py-5">
            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <BriefcaseBusiness size={20} />
              </div>

              <div>
                <h2 className="font-bold text-slate-900">
                  Employment Information
                </h2>

                <p className="text-sm text-slate-500">
                  Assign department, position and reporting manager.
                </p>
              </div>
            </div>
          </div>

          {/* Fields */}
          <div className="grid grid-cols-1 gap-5 p-6 md:grid-cols-2">

            {/* Department */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Department
              </label>

              <div className="relative">
                <Building2
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  placeholder="e.g. Engineering"
                  className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50"
                />
              </div>
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
                  name="jobPosition"
                  value={formData.jobPosition}
                  onChange={handleChange}
                  placeholder="e.g. Software Developer"
                  className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50"
                />
              </div>
            </div>

            {/* Manager */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Manager
              </label>

              <div className="relative">
                <UserRoundCheck
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <select
                  name="manager"
                  value={formData.manager}
                  onChange={handleChange}
                  className="h-12 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50"
                >
                  <option value="">Select Manager</option>
                  <option value="1">Aarav Patel</option>
                  <option value="2">Priya Shah</option>
                  <option value="3">Rahul Mehta</option>
                  <option value="4">Neha Desai</option>
                </select>
              </div>

              <p className="mt-2 text-xs text-slate-400">
                Manager is another employee in the organization.
              </p>
            </div>

            {/* Working Schedule */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Working Schedule
              </label>

              <div className="relative">
                <CalendarClock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <select
                  name="schedule"
                  value={formData.schedule}
                  onChange={handleChange}
                  className="h-12 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50"
                >
                  <option value="">Select Working Schedule</option>
                  <option value="1">Regular - Monday to Friday</option>
                  <option value="2">Regular - Monday to Saturday</option>
                  <option value="3">Shift Schedule</option>
                </select>
              </div>

              <p className="mt-2 text-xs text-slate-400">
                Schedule is linked to the Working Schedule model.
              </p>
            </div>
          </div>
        </div>

        {/* Employee Status */}
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white">

          {/* Section Header */}
          <div className="border-b border-slate-100 bg-slate-50/70 px-6 py-5">
            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                <UserRoundCheck size={20} />
              </div>

              <div>
                <h2 className="font-bold text-slate-900">
                  Employee Status
                </h2>

                <p className="text-sm text-slate-500">
                  Set whether the employee is currently active.
                </p>
              </div>
            </div>
          </div>

          <div className="p-6">

            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Status
            </label>

            <div className="relative max-w-md">
              <UserRoundCheck
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="h-12 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            <p className="mt-2 text-xs text-slate-400">
              Only active employees should normally participate in current HR
              operations.
            </p>
          </div>
        </div>

        {/* Information Box */}
        <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4">
          <div className="flex items-start gap-3">
            <User
              size={18}
              className="mt-0.5 shrink-0 text-blue-600"
            />

            <div>
              <p className="text-sm font-semibold text-blue-800">
                Employee information
              </p>

              <p className="mt-1 text-xs leading-5 text-blue-700">
                Contracts, attendance, time-off requests and payslips are
                linked to the employee automatically through their respective
                Odoo relationships.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

          {/* Cancel */}
          <Link
            href="/employees"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:bg-slate-100"
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
            Save Employee
          </button>
        </div>
      </form>
    </div>
  );
}
