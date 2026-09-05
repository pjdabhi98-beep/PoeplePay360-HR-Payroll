
"use client";

import {
  Plus,
  Search,
  Users,
  UserCheck,
  UserX,
  FileText,
  Receipt,
  BriefcaseBusiness,
  CalendarDays,
  ChevronRight,
} from "lucide-react";

import Link from "next/link";
import { useState } from "react";

type Employee = {
  id: number;
  employee_code: string;
  name: string;
  department: string;
  manager: string;
  job_position: string;
  schedule: string;
  status: string;
  contract_count: number;
  payslip_count: number;
};

const employees: Employee[] = [];

export default function EmployeesPage() {
  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] =
    useState("All Departments");
  const [statusFilter, setStatusFilter] = useState("All Status");

  const totalEmployees = employees.length;

  const activeEmployees = employees.filter(
    (employee) => employee.status === "Active"
  ).length;

  const inactiveEmployees = employees.filter(
    (employee) => employee.status === "Inactive"
  ).length;

  const filteredEmployees = employees.filter((employee) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      employee.name.toLowerCase().includes(searchText) ||
      employee.employee_code.toLowerCase().includes(searchText) ||
      employee.job_position.toLowerCase().includes(searchText);

    const matchesDepartment =
      departmentFilter === "All Departments" ||
      employee.department === departmentFilter;

    const matchesStatus =
      statusFilter === "All Status" ||
      employee.status === statusFilter;

    return matchesSearch && matchesDepartment && matchesStatus;
  });

  return (
    <div className="min-h-full space-y-6 pb-8">

      {/* ================= HEADER ================= */}
      <div className="relative overflow-hidden rounded-2xl bg-slate-900 p-6 text-white shadow-lg sm:p-8">

        {/* Decorative background */}
        <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="absolute -bottom-24 right-40 h-56 w-56 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="relative flex flex-col justify-between gap-6 lg:flex-row lg:items-center">

          <div>
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600">
                <Users size={18} />
              </div>

              <p className="text-sm font-medium text-slate-300">
                HR Management
              </p>
            </div>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Employees
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
              Manage employee profiles, departments, working schedules,
              contracts and payroll information.
            </p>
          </div>

          <Link
            href="/employees/new"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-md transition duration-200 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-lg"
          >
            <Plus size={18} />
            Add Employee
          </Link>
        </div>
      </div>

      {/* ================= STATISTICS ================= */}
      <div className="grid gap-4 sm:grid-cols-3">

        {/* Total */}
        <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-md">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm font-medium text-slate-500">
                Total Employees
              </p>

              <p className="mt-2 text-3xl font-bold text-slate-900">
                {totalEmployees}
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Employee records
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-100">
              <Users size={22} />
            </div>
          </div>
        </div>

        {/* Active */}
        <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-md">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm font-medium text-slate-500">
                Active Employees
              </p>

              <p className="mt-2 text-3xl font-bold text-slate-900">
                {activeEmployees}
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Currently employed
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 transition group-hover:bg-emerald-100">
              <UserCheck size={22} />
            </div>
          </div>
        </div>

        {/* Inactive */}
        <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-slate-300 hover:shadow-md">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm font-medium text-slate-500">
                Inactive Employees
              </p>

              <p className="mt-2 text-3xl font-bold text-slate-900">
                {inactiveEmployees}
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Currently inactive
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition group-hover:bg-slate-200">
              <UserX size={22} />
            </div>
          </div>
        </div>
      </div>

      {/* ================= EMPLOYEE DIRECTORY ================= */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        {/* Toolbar */}
        <div className="border-b border-slate-200 p-5">

          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">

            <div>
              <div className="flex items-center gap-2">

                <BriefcaseBusiness
                  size={19}
                  className="text-blue-600"
                />

                <h2 className="text-lg font-bold text-slate-900">
                  Employee Directory
                </h2>
              </div>

              <p className="mt-1 text-sm text-slate-500">
                View employees and their HR & payroll relationships.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">

              {/* Search */}
              <div className="flex items-center rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 transition focus-within:border-blue-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-50 sm:w-72">

                <Search
                  size={17}
                  className="text-slate-400"
                />

                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search employee..."
                  className="ml-2 w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
                />
              </div>

              {/* Department */}
              <select
                value={departmentFilter}
                onChange={(e) =>
                  setDepartmentFilter(e.target.value)
                }
                className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-600 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50"
              >
                <option>All Departments</option>
                <option>Engineering</option>
                <option>Human Resources</option>
                <option>Finance</option>
                <option>Marketing</option>
              </select>

              {/* Status */}
              <select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(e.target.value)
                }
                className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-600 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50"
              >
                <option>All Status</option>
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
          </div>
        </div>

        {/* ================= DESKTOP TABLE ================= */}
        <div className="hidden overflow-x-auto lg:block">

          <table className="w-full min-w-[1100px]">

            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Employee
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Department
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Job Position
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Schedule
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Contracts
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Payslips
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Status
                </th>

                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                  View
                </th>

              </tr>
            </thead>

            <tbody>

              {filteredEmployees.map((employee) => (

                <tr
                  key={employee.id}
                  className="group border-b border-slate-100 transition-colors hover:bg-blue-50/40"
                >

                  {/* Employee */}
                  <td className="px-6 py-4">

                    <div className="flex items-center gap-3">

                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 font-bold text-slate-700 transition group-hover:bg-blue-100 group-hover:text-blue-700">
                        {employee.name.charAt(0)}
                      </div>

                      <div>
                        <p className="font-semibold text-slate-900">
                          {employee.name}
                        </p>

                        <p className="mt-0.5 text-xs font-medium text-blue-600">
                          {employee.employee_code}
                        </p>
                      </div>

                    </div>

                  </td>

                  {/* Department */}
                  <td className="px-6 py-4">

                    <p className="text-sm font-medium text-slate-700">
                      {employee.department}
                    </p>

                    <p className="mt-0.5 text-xs text-slate-400">
                      Manager: {employee.manager}
                    </p>

                  </td>

                  {/* Job Position */}
                  <td className="px-6 py-4">

                    <div className="flex items-center gap-2 text-sm text-slate-600">

                      <BriefcaseBusiness
                        size={15}
                        className="text-slate-400"
                      />

                      {employee.job_position}

                    </div>

                  </td>

                  {/* Schedule */}
                  <td className="px-6 py-4">

                    <div className="flex items-center gap-2 text-sm text-slate-600">

                      <CalendarDays
                        size={15}
                        className="text-slate-400"
                      />

                      {employee.schedule}

                    </div>

                  </td>

                  {/* Contracts */}
                  <td className="px-6 py-4">

                    <div className="inline-flex items-center gap-2 rounded-lg bg-blue-50 px-3 py-1.5 text-sm font-semibold text-blue-700">

                      <FileText size={15} />

                      {employee.contract_count}

                    </div>

                  </td>

                  {/* Payslips */}
                  <td className="px-6 py-4">

                    <div className="inline-flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-1.5 text-sm font-semibold text-slate-700">

                      <Receipt size={15} />

                      {employee.payslip_count}

                    </div>

                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">

                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold ${
                        employee.status === "Active"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >

                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          employee.status === "Active"
                            ? "bg-emerald-500"
                            : "bg-slate-400"
                        }`}
                      />

                      {employee.status}

                    </span>

                  </td>

                  {/* View */}
                  <td className="px-6 py-4 text-right">

                    <Link
                      href={`/employees/${employee.id}`}
                      className="inline-flex items-center gap-1 rounded-lg p-2 text-slate-400 transition hover:bg-blue-100 hover:text-blue-700"
                    >
                      <ChevronRight size={19} />
                    </Link>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

        {/* ================= MOBILE / TABLET ================= */}
        <div className="divide-y divide-slate-100 lg:hidden">

          {filteredEmployees.map((employee) => (

            <div
              key={employee.id}
              className="p-5 transition hover:bg-blue-50/30"
            >

              <div className="flex items-start justify-between gap-4">

                <div className="flex items-center gap-3">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 font-bold text-slate-700">
                    {employee.name.charAt(0)}
                  </div>

                  <div>

                    <p className="font-semibold text-slate-900">
                      {employee.name}
                    </p>

                    <p className="text-xs font-medium text-blue-600">
                      {employee.employee_code}
                    </p>

                  </div>

                </div>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold ${
                    employee.status === "Active"
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {employee.status}
                </span>

              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">

                <div className="rounded-xl bg-slate-50 p-3">
                  <p className="text-xs text-slate-400">
                    Department
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-700">
                    {employee.department}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-3">
                  <p className="text-xs text-slate-400">
                    Job Position
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-700">
                    {employee.job_position}
                  </p>
                </div>

                <div className="rounded-xl bg-blue-50 p-3">
                  <p className="text-xs text-blue-600">
                    Contracts
                  </p>

                  <p className="mt-1 flex items-center gap-1.5 text-sm font-bold text-blue-700">
                    <FileText size={14} />
                    {employee.contract_count}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-100 p-3">
                  <p className="text-xs text-slate-500">
                    Payslips
                  </p>

                  <p className="mt-1 flex items-center gap-1.5 text-sm font-bold text-slate-700">
                    <Receipt size={14} />
                    {employee.payslip_count}
                  </p>
                </div>

              </div>

              <div className="mt-4 flex items-center justify-between">

                <div className="text-xs text-slate-400">
                  Schedule:{" "}
                  <span className="font-medium text-slate-600">
                    {employee.schedule}
                  </span>
                </div>

                <Link
                  href={`/employees/${employee.id}`}
                  className="inline-flex items-center gap-1 rounded-lg bg-blue-50 px-3 py-2 text-xs font-bold text-blue-700 transition hover:bg-blue-100"
                >
                  View
                  <ChevronRight size={14} />
                </Link>

              </div>

            </div>

          ))}

        </div>

        {/* Empty State */}
        {filteredEmployees.length === 0 && (
          <div className="px-6 py-16 text-center">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
              <Users size={24} />
            </div>

            <h3 className="mt-4 font-semibold text-slate-900">
              No employees found
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Try changing your search or filters.
            </p>

          </div>
        )}

        {/* Footer */}
        <div className="flex flex-col gap-3 border-t border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">

          <p className="text-sm text-slate-500">
            Showing{" "}
            <span className="font-semibold text-slate-700">
              {filteredEmployees.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-slate-700">
              {employees.length}
            </span>{" "}
            employees
          </p>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="h-2 w-2 rounded-full bg-blue-500" />
            Employee management
          </div>

        </div>

      </div>
    </div>
  );
}

