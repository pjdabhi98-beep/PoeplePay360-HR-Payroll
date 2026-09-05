"use client";

import { useState } from "react";
import {
  ArrowLeft,
  UserPlus,
  User,
  Mail,
  Phone,
  Building2,
  Briefcase,
  CalendarDays,
  IndianRupee,
  CreditCard,
  Save,
} from "lucide-react";
import Link from "next/link";

export default function NewEmployeePage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    role: "",
    joiningDate: "",
    employmentType: "",
    salary: "",
    bankAccount: "",
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
    <div className="min-h-screen bg-slate-50 p-6">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <Link
            href="/employees"
            className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900"
          >
            <ArrowLeft size={17} />
            Back to Employees
          </Link>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Add New Employee
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Create a new employee profile and add employment information.
          </p>
        </div>

        <div className="hidden rounded-2xl bg-indigo-50 p-4 sm:block">
          <UserPlus className="text-indigo-600" size={30} />
        </div>
      </div>

      {/* Form Card */}
      <form onSubmit={handleSubmit}>
        <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          
          {/* Form Header */}
          <div className="border-b border-slate-100 bg-gradient-to-r from-indigo-50 to-white px-6 py-5">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-indigo-600 p-2.5 text-white">
                <User size={20} />
              </div>

              <div>
                <h2 className="font-semibold text-slate-900">
                  Employee Information
                </h2>
                <p className="text-sm text-slate-500">
                  Enter the employee's basic and employment details.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-8 p-6">
            
            {/* Personal Information */}
            <section>
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                Personal Information
              </h3>

              <div className="grid gap-5 md:grid-cols-2">
                
                {/* Name */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Full Name
                  </label>

                  <div className="relative">
                    <User
                      size={18}
                      className="absolute left-3 top-3.5 text-slate-400"
                    />

                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter full name"
                      required
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Work Email
                  </label>

                  <div className="relative">
                    <Mail
                      size={18}
                      className="absolute left-3 top-3.5 text-slate-400"
                    />

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="employee@company.com"
                      required
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Phone Number
                  </label>

                  <div className="relative">
                    <Phone
                      size={18}
                      className="absolute left-3 top-3.5 text-slate-400"
                    />

                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                    />
                  </div>
                </div>

                {/* Joining Date */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Joining Date
                  </label>

                  <div className="relative">
                    <CalendarDays
                      size={18}
                      className="absolute left-3 top-3.5 text-slate-400"
                    />

                    <input
                      type="date"
                      name="joiningDate"
                      value={formData.joiningDate}
                      onChange={handleChange}
                      required
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Employment Information */}
            <section className="border-t border-slate-100 pt-8">
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                Employment Information
              </h3>

              <div className="grid gap-5 md:grid-cols-2">
                
                {/* Department */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Department
                  </label>

                  <div className="relative">
                    <Building2
                      size={18}
                      className="absolute left-3 top-3.5 text-slate-400"
                    />

                    <select
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                      required
                      className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                    >
                      <option value="">Select department</option>
                      <option value="Engineering">Engineering</option>
                      <option value="Human Resources">Human Resources</option>
                      <option value="Finance">Finance</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Operations">Operations</option>
                    </select>
                  </div>
                </div>

                {/* Job Position */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Job Position
                  </label>

                  <div className="relative">
                    <Briefcase
                      size={18}
                      className="absolute left-3 top-3.5 text-slate-400"
                    />

                    <input
                      type="text"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      placeholder="e.g. Software Developer"
                      required
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                    />
                  </div>
                </div>

                {/* Employment Type */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Employment Type
                  </label>

                  <select
                    name="employmentType"
                    value={formData.employmentType}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                  >
                    <option value="">Select employment type</option>
                    <option value="Full Time">Full Time</option>
                    <option value="Part Time">Part Time</option>
                    <option value="Contract">Contract</option>
                    <option value="Intern">Intern</option>
                  </select>
                </div>

                {/* Salary */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Monthly Salary
                  </label>

                  <div className="relative">
                    <IndianRupee
                      size={18}
                      className="absolute left-3 top-3.5 text-slate-400"
                    />

                    <input
                      type="number"
                      name="salary"
                      value={formData.salary}
                      onChange={handleChange}
                      placeholder="65000"
                      required
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Payroll Information */}
            <section className="border-t border-slate-100 pt-8">
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                Payroll Information
              </h3>

              <div className="max-w-xl">
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Bank Account Number
                </label>

                <div className="relative">
                  <CreditCard
                    size={18}
                    className="absolute left-3 top-3.5 text-slate-400"
                  />

                  <input
                    type="text"
                    name="bankAccount"
                    value={formData.bankAccount}
                    onChange={handleChange}
                    placeholder="Enter bank account number"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                  />
                </div>

                <p className="mt-2 text-xs text-slate-400">
                  Bank information will be used for payroll processing.
                </p>
              </div>
            </section>
          </div>

          {/* Footer */}
          <div className="flex flex-col-reverse gap-3 border-t border-slate-100 bg-slate-50 px-6 py-5 sm:flex-row sm:justify-end">
            <Link
              href="/employees"
              className="rounded-xl border border-slate-200 bg-white px-6 py-3 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Cancel
            </Link>

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700 hover:shadow-xl"
            >
              <Save size={18} />
              Save Employee
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}