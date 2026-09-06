"use client";

import { useEffect, useState } from "react";

import {
  Users,
  UserCheck,
  Clock3,
  WalletCards,
  TrendingUp,
  ArrowUpRight,
  RefreshCw,
} from "lucide-react";

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

type DashboardData = {
  total_employees: number;
  present_today: number;
  pending_leaves: number;
  attendance_rate: number;
  monthly_payroll: number;
  month: string;
};

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData>({
    total_employees: 0,
    present_today: 0,
    pending_leaves: 0,
    attendance_rate: 0,
    monthly_payroll: 0,
    month: "Current Month",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/dashboard", {
        method: "GET",
        cache: "no-store",
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch dashboard data");
      }

      const result = await response.json();

      console.log("Dashboard API:", result);

      const dashboard = result.data ?? result;

      setData({
        total_employees: Number(dashboard.total_employees ?? 0),
        present_today: Number(dashboard.present_today ?? 0),
        pending_leaves: Number(dashboard.pending_leaves ?? 0),
        attendance_rate: Number(dashboard.attendance_rate ?? 0),
        monthly_payroll: Number(dashboard.monthly_payroll ?? 0),
        month: dashboard.month ?? "Current Month",
      });
    } catch (error) {
      console.error("Dashboard error:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Unable to load dashboard"
      );
    } finally {
      // Important: stop loading after API response
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const attendanceRate = Math.min(
    Math.max(data.attendance_rate, 0),
    100
  );

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-semibold text-indigo-700">
            Overview
          </p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-950">
            HR & Payroll Dashboard
          </h1>

          <p className="mt-2 text-sm text-slate-700">
            Monitor your workforce, attendance and payroll in one place.
          </p>
        </div>

        <button
          onClick={fetchDashboard}
          disabled={loading}
          className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition-all hover:bg-indigo-700 hover:shadow-indigo-600/30 disabled:cursor-not-allowed disabled:opacity-70"
        >
          <RefreshCw
            size={17}
            className={loading ? "animate-spin" : ""}
          />

          {loading ? "Loading..." : "Refresh"}

          {!loading && <ArrowUpRight size={17} />}
        </button>
      </div>

      {/* ERROR */}
      {error && (
        <div className="rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm font-semibold text-red-800">
          {error}
        </div>
      )}

      {/* KPI CARDS */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

        {/* TOTAL EMPLOYEES */}
        <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
          <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-indigo-50 transition-transform duration-300 group-hover:scale-150" />

          <div className="relative">
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-700">
                <Users size={21} />
              </div>

              <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                <TrendingUp size={13} />
                —
              </span>
            </div>

            <div className="mt-6">
              <p className="text-sm font-semibold text-slate-700">
                Total Employees
              </p>

              <h2 className="mt-1 text-3xl font-bold tracking-tight text-slate-950">
                {loading ? "..." : data.total_employees}
              </h2>

              <p className="mt-2 text-xs font-medium text-slate-600">
                current employees
              </p>
            </div>
          </div>
        </div>

        {/* PRESENT TODAY */}
        <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
          <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-indigo-50 transition-transform duration-300 group-hover:scale-150" />

          <div className="relative">
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-700">
                <UserCheck size={21} />
              </div>

              <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                <TrendingUp size={13} />

                {loading ? "..." : `${attendanceRate}%`}
              </span>
            </div>

            <div className="mt-6">
              <p className="text-sm font-semibold text-slate-700">
                Present Today
              </p>

              <h2 className="mt-1 text-3xl font-bold tracking-tight text-slate-950">
                {loading ? "..." : data.present_today}
              </h2>

              <p className="mt-2 text-xs font-medium text-slate-600">
                attendance rate
              </p>
            </div>
          </div>
        </div>

        {/* PENDING LEAVES */}
        <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
          <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-indigo-50 transition-transform duration-300 group-hover:scale-150" />

          <div className="relative">
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-700">
                <Clock3 size={21} />
              </div>

              <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                <TrendingUp size={13} />
                —
              </span>
            </div>

            <div className="mt-6">
              <p className="text-sm font-semibold text-slate-700">
                Pending Leaves
              </p>

              <h2 className="mt-1 text-3xl font-bold tracking-tight text-slate-950">
                {loading ? "..." : data.pending_leaves}
              </h2>

              <p className="mt-2 text-xs font-medium text-slate-600">
                pending requests
              </p>
            </div>
          </div>
        </div>

        {/* MONTHLY PAYROLL */}
        <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
          <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-indigo-50 transition-transform duration-300 group-hover:scale-150" />

          <div className="relative">
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-700">
                <WalletCards size={21} />
              </div>

              <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                <TrendingUp size={13} />
                —
              </span>
            </div>

            <div className="mt-6">
              <p className="text-sm font-semibold text-slate-700">
                Monthly Payroll
              </p>

              <h2 className="mt-1 text-3xl font-bold tracking-tight text-slate-950">
                {loading
                  ? "..."
                  : formatCurrency(data.monthly_payroll)}
              </h2>

              <p className="mt-2 text-xs font-medium text-slate-600">
                {data.month}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ATTENDANCE + PAYROLL */}
      <div className="grid gap-5 lg:grid-cols-2">

        {/* ATTENDANCE OVERVIEW */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-950">
            Attendance Overview
          </h2>

          <p className="mt-2 text-sm text-slate-700">
            Live attendance for today.
          </p>

          <div className="mt-6 rounded-xl bg-slate-50 p-6">
            <p className="text-sm font-semibold text-slate-700">
              Attendance rate
            </p>

            <p className="mt-2 text-4xl font-bold text-slate-950">
              {loading ? "..." : `${attendanceRate}%`}
            </p>

            <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-indigo-600 transition-all duration-700"
                style={{
                  width: `${attendanceRate}%`,
                }}
              />
            </div>

            <p className="mt-3 text-sm font-semibold text-slate-700">
              {loading
                ? "Loading attendance..."
                : `${data.present_today} employees present today`}
            </p>
          </div>
        </div>

        {/* PAYROLL OVERVIEW */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-950">
            Payroll Overview
          </h2>

          <p className="mt-2 text-sm text-slate-700">
            Computed and paid payslips for {data.month}.
          </p>

          <div className="mt-6 rounded-xl bg-slate-50 p-6">
            <p className="text-sm font-semibold text-slate-700">
              Payroll total
            </p>

            <p className="mt-2 text-4xl font-bold text-slate-950">
              {loading
                ? "..."
                : formatCurrency(data.monthly_payroll)}
            </p>

            <p className="mt-2 text-xs font-semibold text-slate-600">
              Monthly payroll
            </p>
          </div>
        </div>
      </div>

      {/* QUICK ACTION */}
      <div className="rounded-2xl bg-indigo-600 p-6 shadow-lg">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <h2 className="text-xl font-bold text-white">
              HR Reports
            </h2>

            <p className="mt-1 text-sm text-indigo-100">
              View employee, attendance, leave and payroll reports.
            </p>
          </div>

          <button className="flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-indigo-700 transition hover:bg-indigo-50">
            View Reports
            <ArrowUpRight size={17} />
          </button>

        </div>
      </div>

    </div>
  );
}