"use client";

import {
  Plus,
  Search,
  Users,
  UserCheck,
  UserX,
  MoreHorizontal,
} from "lucide-react";

import Link from "next/link";

const employees = [
  {
    id: 1,
    name: "Aarav Patel",
    email: "aarav@peoplepay360.com",
    department: "Engineering",
    role: "Software Developer",
    status: "Active",
    salary: "₹65,000",
  },
  {
    id: 2,
    name: "Priya Shah",
    email: "priya@peoplepay360.com",
    department: "Human Resources",
    role: "HR Manager",
    status: "Active",
    salary: "₹72,000",
  },
  {
    id: 3,
    name: "Rahul Mehta",
    email: "rahul@peoplepay360.com",
    department: "Finance",
    role: "Accountant",
    status: "Active",
    salary: "₹58,000",
  },
  {
    id: 4,
    name: "Neha Desai",
    email: "neha@peoplepay360.com",
    department: "Marketing",
    role: "Marketing Executive",
    status: "On Leave",
    salary: "₹48,000",
  },
];

export default function EmployeesPage() {
  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div>
          <p className="text-sm font-medium text-indigo-600">
            People Management
          </p>

          <h1 className="mt-1 text-3xl font-bold text-slate-900">
            Employees
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Manage employee profiles, departments, contracts and salary
            information.
          </p>
        </div>
        <Link
  href="/employees/new"
  className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700">
<Plus size={18} />
  Add Employee
</Link>
</div>

      

      {/* Statistics */}
      <div className="grid gap-4 sm:grid-cols-3">

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <Users size={21} />
            </div>

            <div>
              <p className="text-sm text-slate-500">Total Employees</p>
              <p className="text-2xl font-bold text-slate-900">0</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <UserCheck size={21} />
            </div>

            <div>
              <p className="text-sm text-slate-500">Active Employees</p>
              <p className="text-2xl font-bold text-slate-900">0</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-50 text-rose-600">
              <UserX size={21} />
            </div>

            <div>
              <p className="text-sm text-slate-500">Inactive / Leave</p>
              <p className="text-2xl font-bold text-slate-900">0</p>
            </div>
          </div>
        </div>

      </div>

      {/* Employee Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        {/* Toolbar */}
        <div className="flex flex-col gap-4 border-b border-slate-200 p-5 md:flex-row md:items-center md:justify-between">

          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Employee Directory
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              View and manage all employees.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">

            {/* Search */}
            <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 sm:w-64">
              <Search size={17} className="text-slate-400" />

              <input
                type="text"
                placeholder="Search employees..."
                className="ml-2 w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
              />
            </div>

            {/* Department Filter */}
            <select className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-600 outline-none focus:border-indigo-500">
              <option>All Departments</option>
              <option>Engineering</option>
              <option>Human Resources</option>
              <option>Finance</option>
              <option>Marketing</option>
            </select>

          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px]">

            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Employee
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Department
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Role
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Salary
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Status
                </th>

                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {employees.map((employee) => (
                <tr
                  key={employee.id}
                  className="group border-b border-slate-100 transition-colors hover:bg-slate-50"
                >

                  {/* Employee */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">

                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 font-semibold text-indigo-600">
                        {employee.name.charAt(0)}
                      </div>

                      <div>
                        <p className="font-semibold text-slate-900">
                          {employee.name}
                        </p>

                        <p className="text-xs text-slate-500">
                          {employee.email}
                        </p>
                      </div>

                    </div>
                  </td>

                  {/* Department */}
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {employee.department}
                  </td>

                  {/* Role */}
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {employee.role}
                  </td>

                  {/* Salary */}
                  <td className="px-6 py-4 text-sm font-semibold text-slate-800">
                    {employee.salary}
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        employee.status === "Active"
                          ? "bg-emerald-50 text-emerald-600"
                          : "bg-amber-50 text-amber-600"
                      }`}
                    >
                      {employee.status}
                    </span>
                  </td>

                  {/* Action */}
                  <td className="px-6 py-4 text-right">
                    <button className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700">
                      <MoreHorizontal size={19} />
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4">
          <p className="text-sm text-slate-500">
            Showing <span className="font-semibold text-slate-700">4</span>{" "}
            employees
          </p>

          <button className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50">
            View All
          </button>
        </div>

      </div>
    </div>
  );
}