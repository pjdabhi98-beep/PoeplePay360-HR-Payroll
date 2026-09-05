
"use client";

import { useState } from "react";
import {
  Plus,
  Search,
  FileText,
  CheckCircle2,
  Clock3,
  XCircle,
  CalendarDays,
  IndianRupee,
  Users,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";

type Contract = {
  id: number;
  name: string;
  employee_id: string;
  employee: string;
  start_date: string;
  end_date: string;
  wage: number;
  salary_structure_id: string;
  state: string;
};

const contracts: Contract[] = [];

export default function ContractsPage() {
  const [search, setSearch] = useState("");
  const [stateFilter, setStateFilter] = useState("All States");

  const runningContracts = contracts.filter(
    (contract) => contract.state === "Running"
  ).length;

  const draftContracts = contracts.filter(
    (contract) => contract.state === "Draft"
  ).length;

  const expiredContracts = contracts.filter(
    (contract) => contract.state === "Expired"
  ).length;

  const filteredContracts = contracts.filter((contract) => {
    const searchValue = search.toLowerCase();

    const matchesSearch =
      contract.employee.toLowerCase().includes(searchValue) ||
      contract.employee_id.toLowerCase().includes(searchValue) ||
      contract.name.toLowerCase().includes(searchValue);

    const matchesState =
      stateFilter === "All States" || contract.state === stateFilter;

    return matchesSearch && matchesState;
  });

  const getStateStyle = (state: string) => {
    switch (state) {
      case "Running":
        return {
          badge: "bg-blue-50 text-blue-700 border border-blue-100",
          dot: "bg-blue-600",
        };

      case "Draft":
        return {
          badge: "bg-amber-50 text-amber-700 border border-amber-100",
          dot: "bg-amber-500",
        };

      case "Expired":
        return {
          badge: "bg-slate-100 text-slate-600 border border-slate-200",
          dot: "bg-slate-500",
        };

      case "Cancelled":
        return {
          badge: "bg-rose-50 text-rose-700 border border-rose-100",
          dot: "bg-rose-500",
        };

      default:
        return {
          badge: "bg-slate-100 text-slate-600",
          dot: "bg-slate-400",
        };
    }
  };

  return (
    <div className="min-h-full space-y-6 pb-8">
      {/* HEADER */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900 p-6 text-white shadow-xl shadow-slate-200 sm:p-8">
        <div className="absolute -right-16 -top-20 h-56 w-56 rounded-full bg-blue-600/20" />
        <div className="absolute -bottom-24 right-24 h-48 w-48 rounded-full bg-blue-500/10" />
        <div className="absolute right-1/3 top-0 h-32 w-32 rounded-full bg-white/5" />

        <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2 text-sm font-medium text-slate-300">
              <FileText size={17} />
              Employee Management
            </div>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Contracts
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
              Manage employee contracts, salary information, employment
              periods and contract status from one place.
            </p>
          </div>

          <Link
            href="/contracts/new"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-900/20 transition duration-200 hover:-translate-y-0.5 hover:bg-blue-700 sm:w-auto"
          >
            <Plus size={19} />
            Create Contract
          </Link>
        </div>
      </div>

      {/* STATISTICS */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {/* Total */}
        <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition group-hover:scale-105">
              <FileText size={22} />
            </div>

            <ArrowUpRight
              size={18}
              className="text-slate-300 transition group-hover:text-blue-600"
            />
          </div>

          <p className="mt-5 text-sm font-medium text-slate-500">
            Total Contracts
          </p>

          <p className="mt-1 text-3xl font-bold text-slate-900">
            {contracts.length}
          </p>

          <p className="mt-2 text-xs text-slate-400">
            All employee contracts
          </p>
        </div>

        {/* Running */}
        <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition group-hover:scale-105">
              <CheckCircle2 size={22} />
            </div>

            <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">
              Active
            </span>
          </div>

          <p className="mt-5 text-sm font-medium text-slate-500">
            Running Contracts
          </p>

          <p className="mt-1 text-3xl font-bold text-slate-900">
            {runningContracts}
          </p>

          <p className="mt-2 text-xs text-slate-400">
            Currently active contracts
          </p>
        </div>

        {/* Draft */}
        <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-600 transition group-hover:scale-105">
              <Clock3 size={22} />
            </div>

            <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700">
              Pending
            </span>
          </div>

          <p className="mt-5 text-sm font-medium text-slate-500">
            Draft Contracts
          </p>

          <p className="mt-1 text-3xl font-bold text-slate-900">
            {draftContracts}
          </p>

          <p className="mt-2 text-xs text-slate-400">
            Waiting for activation
          </p>
        </div>

        {/* Expired */}
        <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition group-hover:scale-105">
              <XCircle size={22} />
            </div>

            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
              Closed
            </span>
          </div>

          <p className="mt-5 text-sm font-medium text-slate-500">
            Expired Contracts
          </p>

          <p className="mt-1 text-3xl font-bold text-slate-900">
            {expiredContracts}
          </p>

          <p className="mt-2 text-xs text-slate-400">
            Contracts past end date
          </p>
        </div>
      </div>

      {/* MAIN CARD */}
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        {/* TOOLBAR */}
        <div className="border-b border-slate-100 p-5 sm:p-6">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-slate-900">
                  Contract Directory
                </h2>

                <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">
                  {filteredContracts.length}
                </span>
              </div>

              <p className="mt-1 text-sm text-slate-500">
                View employee contracts, salary, period and salary structure.
              </p>
            </div>

            <div className="flex w-full flex-col gap-3 sm:flex-row xl:w-auto">
              <div className="flex h-11 w-full items-center rounded-xl border border-slate-200 bg-slate-50 px-3 transition focus-within:border-blue-400 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-50 sm:w-72">
                <Search size={18} className="shrink-0 text-slate-400" />

                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search employee..."
                  className="ml-2 w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                />
              </div>

              <select
                value={stateFilter}
                onChange={(e) => setStateFilter(e.target.value)}
                className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-medium text-slate-600 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50 sm:w-44"
              >
                <option>All States</option>
                <option>Running</option>
                <option>Draft</option>
                <option>Expired</option>
                <option>Cancelled</option>
              </select>
            </div>
          </div>
        </div>

        {/* DESKTOP TABLE */}
        <div className="hidden overflow-x-auto lg:block">
          <table className="w-full min-w-[1100px]">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/80">
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                  Employee
                </th>

                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                  Contract
                </th>

                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                  Contract Period
                </th>

                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                  Wage
                </th>

                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                  Salary Structure
                </th>

                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                  State
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredContracts.map((contract) => {
                const stateStyle = getStateStyle(contract.state);

                return (
                  <tr
                    key={contract.id}
                    className="group border-b border-slate-100 transition hover:bg-blue-50/30"
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white shadow-sm">
                          {contract.employee.charAt(0)}
                        </div>

                        <div>
                          <p className="font-semibold text-slate-900">
                            {contract.employee}
                          </p>

                          <p className="mt-0.5 text-xs text-slate-500">
                            {contract.employee_id}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <FileText size={16} className="text-blue-600" />

                        <span className="text-sm font-semibold text-slate-700">
                          {contract.name}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                          <CalendarDays
                            size={15}
                            className="text-blue-600"
                          />
                          {contract.start_date}
                        </div>

                        <div className="pl-5 text-xs text-slate-400">
                          to {contract.end_date}
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex items-center gap-1 text-sm font-bold text-slate-900">
                        <IndianRupee size={14} />
                        {contract.wage.toLocaleString("en-IN")}
                      </div>

                      <p className="mt-1 text-xs text-slate-400">
                        Monthly wage
                      </p>
                    </td>

                    <td className="px-6 py-5">
                      <span className="inline-flex rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600">
                        {contract.salary_structure_id}
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold ${stateStyle.badge}`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${stateStyle.dot}`}
                        />

                        {contract.state}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* MOBILE CARDS */}
        <div className="divide-y divide-slate-100 lg:hidden">
          {filteredContracts.map((contract) => {
            const stateStyle = getStateStyle(contract.state);

            return (
              <div
                key={contract.id}
                className="p-5 transition hover:bg-slate-50 sm:p-6"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white">
                      {contract.employee.charAt(0)}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate font-semibold text-slate-900">
                        {contract.employee}
                      </p>

                      <p className="truncate text-xs text-slate-500">
                        {contract.employee_id}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-bold ${stateStyle.badge}`}
                  >
                    {contract.state}
                  </span>
                </div>

                <div className="mt-5 space-y-3">
                  <div className="rounded-xl bg-slate-50 p-3">
                    <p className="text-xs text-slate-400">Contract</p>

                    <div className="mt-1 flex items-center gap-2">
                      <FileText size={15} className="text-blue-600" />

                      <p className="text-sm font-semibold text-slate-700">
                        {contract.name}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-xl bg-slate-50 p-3">
                      <p className="text-xs text-slate-400">
                        Monthly Wage
                      </p>

                      <p className="mt-1 flex items-center text-sm font-bold text-slate-900">
                        <IndianRupee size={13} />
                        {contract.wage.toLocaleString("en-IN")}
                      </p>
                    </div>

                    <div className="rounded-xl bg-slate-50 p-3">
                      <p className="text-xs text-slate-400">
                        Salary Structure
                      </p>

                      <p className="mt-1 truncate text-sm font-semibold text-slate-700">
                        {contract.salary_structure_id}
                      </p>
                    </div>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-3">
                    <p className="text-xs text-slate-400">
                      Contract Period
                    </p>

                    <div className="mt-1 flex flex-wrap items-center gap-2 text-sm font-medium text-slate-700">
                      <CalendarDays
                        size={15}
                        className="text-blue-600"
                      />

                      {contract.start_date}

                      <span className="text-slate-400">→</span>

                      {contract.end_date}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* EMPTY STATE */}
        {filteredContracts.length === 0 && (
          <div className="px-6 py-16 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400">
              <FileText size={24} />
            </div>

            <h3 className="mt-4 text-base font-bold text-slate-900">
              No contracts found
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Try changing your search or state filter.
            </p>
          </div>
        )}

        {/* FOOTER */}
        <div className="flex flex-col gap-3 border-t border-slate-100 bg-slate-50/50 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Users size={16} />

            Showing

            <span className="font-bold text-slate-700">
              {filteredContracts.length}
            </span>

            contracts
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="h-2 w-2 rounded-full bg-blue-600" />
            Contract data from Odoo
          </div>
        </div>
      </div>
    </div>
  );
}

