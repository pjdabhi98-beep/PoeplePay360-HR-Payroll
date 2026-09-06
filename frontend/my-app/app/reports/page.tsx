"use client";

import {
  Users,
  CalendarCheck,
  CalendarDays,
  WalletCards,
  TrendingUp,
  Download,
  FileText,
  ArrowUpRight,
  Clock3,
  CircleDollarSign,
  Search,
  RefreshCw,
} from "lucide-react";

import { useEffect, useMemo, useState } from "react";


// ============================================================
// TYPES
// ============================================================

type Employee = {
  id: number;
  name: string;
  employee_code?: string;
  department?: string;
  job_position?: string;
  status?: string;
  email?: string;
};

type Attendance = {
  id: number;
  employee_id?: number | [number, string];
  employee?: string;
  department?: string;
  check_in?: string;
  check_out?: string;
  worked_hours?: number;
  state?: string;
  status?: string;
};

type TimeOff = {
  id: number;
  employee_id?: number;
  employee?: string;
  time_off_type_id?: number;
  leaveType?: string;
  start_date?: string;
  end_date?: string;
  days?: number;
  reason?: string;
  state?: string;
};

type Contract = {
  id: number;
  employee_id?: number | [number, string];
  employee?: string;
  contract_type?: string;
  start_date?: string;
  end_date?: string;
  state?: string;
  status?: string;
  wage?: number;
};

type Payslip = {
  id: number;
  name?: string;
  employee_id?: number | [number, string];
  employee?: string;
  date_from?: string;
  date_to?: string;
  gross_salary?: number;
  grossSalary?: number;
  total_deduction?: number;
  totalDeduction?: number;
  net_salary?: number;
  netSalary?: number;
  state?: string;
  status?: string;
};


// ============================================================
// API HELPER
// ============================================================

async function fetchApi<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(
      `API request failed: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
}


// ============================================================
// HELPERS
// ============================================================

function extractData<T>(response: any): T[] {
  if (Array.isArray(response)) {
    return response;
  }

  if (Array.isArray(response?.data)) {
    return response.data;
  }

  if (Array.isArray(response?.result)) {
    return response.result;
  }

  return [];
}


function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value || 0);
}


function formatDate(date?: string) {
  if (!date) return "—";

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return date;
  }

  return parsed.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}


function normalizeDate(date?: string) {
  if (!date) return null;

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return null;
  }

  parsed.setHours(0, 0, 0, 0);

  return parsed;
}


function isDateInRange(
  date?: string,
  start?: Date,
  end?: Date
) {
  const parsed = normalizeDate(date);

  if (!parsed || !start || !end) {
    return false;
  }

  return parsed >= start && parsed <= end;
}


function overlapsDateRange(
  itemStart?: string,
  itemEnd?: string,
  rangeStart?: Date,
  rangeEnd?: Date
) {
  const start = normalizeDate(itemStart);
  const end = normalizeDate(itemEnd || itemStart);

  if (!start || !end || !rangeStart || !rangeEnd) {
    return false;
  }

  return start <= rangeEnd && end >= rangeStart;
}


function getEmployeeName(
  employeeId?: number | [number, string],
  fallback?: string
) {
  if (fallback) {
    return fallback;
  }

  if (Array.isArray(employeeId)) {
    return employeeId[1] || "—";
  }

  return "—";
}


function getEmployeeId(
  employeeId?: number | [number, string]
) {
  if (Array.isArray(employeeId)) {
    return employeeId[0];
  }

  return employeeId;
}


// ============================================================
// PAGE
// ============================================================

export default function ReportsPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [attendance, setAttendance] = useState<Attendance[]>([]);
  const [timeOff, setTimeOff] = useState<TimeOff[]>([]);
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [payslips, setPayslips] = useState<Payslip[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [period, setPeriod] = useState<
    "week" | "month" | "threeMonths" | "year" | "custom"
  >("month");

  const [customStart, setCustomStart] = useState("");
  const [customEnd, setCustomEnd] = useState("");

  const [search, setSearch] = useState("");

  const [selectedReport, setSelectedReport] =
    useState("timeoff");


  // ==========================================================
  // DATE RANGE
  // ==========================================================

  const dateRange = useMemo(() => {
    const today = new Date();

    today.setHours(23, 59, 59, 999);

    let start = new Date(today);

    if (period === "week") {
      start = new Date(today);
      start.setDate(today.getDate() - 6);
      start.setHours(0, 0, 0, 0);
    }

    if (period === "month") {
      start = new Date(
        today.getFullYear(),
        today.getMonth(),
        1
      );
      start.setHours(0, 0, 0, 0);
    }

    if (period === "threeMonths") {
      start = new Date(
        today.getFullYear(),
        today.getMonth() - 2,
        1
      );
      start.setHours(0, 0, 0, 0);
    }

    if (period === "year") {
      start = new Date(
        today.getFullYear(),
        0,
        1
      );
      start.setHours(0, 0, 0, 0);
    }

    if (period === "custom") {
      if (customStart) {
        const custom = new Date(customStart);
        custom.setHours(0, 0, 0, 0);
        start = custom;
      }

      if (customEnd) {
        const custom = new Date(customEnd);
        custom.setHours(23, 59, 59, 999);
        return {
          start,
          end: custom,
        };
      }
    }

    return {
      start,
      end: today,
    };
  }, [period, customStart, customEnd]);


  // ==========================================================
  // LOAD REPORT DATA
  // ==========================================================

  async function loadReports() {
    try {
      setLoading(true);
      setError("");

      console.log("Loading reports...");

      const [
        employeeResponse,
        attendanceResponse,
        timeOffResponse,
        contractResponse,
        payslipResponse,
      ] = await Promise.all([
        fetchApi<any>("/api/employees"),
        fetchApi<any>("/api/attendance"),
        fetchApi<any>("/api/Timeoff"),
        fetchApi<any>("/api/contracts"),
        fetchApi<any>("/api/payslips").catch(() => ({
          data: [],
        })),
      ]);

      const employeeData =
        extractData<Employee>(employeeResponse);

      const attendanceData =
        extractData<Attendance>(attendanceResponse);

      const timeOffData =
        extractData<TimeOff>(timeOffResponse);

      const contractData =
        extractData<Contract>(contractResponse);

      const payslipData =
        extractData<Payslip>(payslipResponse);

      setEmployees(employeeData);
      setAttendance(attendanceData);
      setTimeOff(timeOffData);
      setContracts(contractData);
      setPayslips(payslipData);

      console.log("Reports loaded:", {
        employees: employeeData.length,
        attendance: attendanceData.length,
        timeOff: timeOffData.length,
        contracts: contractData.length,
        payslips: payslipData.length,
      });
    } catch (err) {
      console.error("Reports API error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Unable to load reports"
      );
    } finally {
      setLoading(false);
    }
  }


  useEffect(() => {
    loadReports();
  }, []);


  // ==========================================================
  // FILTERED TIME OFF
  // ==========================================================

  const approvedTimeOff = useMemo(() => {
    return timeOff.filter((item) => {
      const state =
        item.state?.toLowerCase() || "";

      if (state !== "approved") {
        return false;
      }

      return overlapsDateRange(
        item.start_date,
        item.end_date,
        dateRange.start,
        dateRange.end
      );
    });
  }, [timeOff, dateRange]);


  const pendingTimeOff = useMemo(() => {
    return timeOff.filter((item) => {
      const state =
        item.state?.toLowerCase() || "";

      if (state !== "submitted") {
        return false;
      }

      return isDateInRange(
        item.start_date,
        dateRange.start,
        dateRange.end
      );
    });
  }, [timeOff, dateRange]);


  // ==========================================================
  // ATTENDANCE
  // ==========================================================

  const filteredAttendance = useMemo(() => {
    return attendance.filter((record) => {
      const date =
        record.check_in || record.check_out;

      return isDateInRange(
        date,
        dateRange.start,
        dateRange.end
      );
    });
  }, [attendance, dateRange]);


  const presentAttendance = useMemo(() => {
    return filteredAttendance.filter((record) => {
      const state =
        record.status?.toLowerCase() ||
        record.state?.toLowerCase() ||
        "";

      return [
        "present",
        "checked_in",
        "checked_out",
        "normal",
      ].includes(state);
    });
  }, [filteredAttendance]);


  // ==========================================================
  // CONTRACTS
  // ==========================================================

  const activeContracts = useMemo(() => {
    return contracts.filter((contract) => {
      const state =
        contract.state?.toLowerCase() ||
        contract.status?.toLowerCase() ||
        "";

      if (
        state === "active" ||
        state === "running"
      ) {
        return true;
      }

      return overlapsDateRange(
        contract.start_date,
        contract.end_date,
        dateRange.start,
        dateRange.end
      );
    });
  }, [contracts, dateRange]);


  // ==========================================================
  // PAYROLL
  // ==========================================================

  const filteredPayslips = useMemo(() => {
    return payslips.filter((payslip) => {
      const state =
        payslip.state?.toLowerCase() ||
        payslip.status?.toLowerCase() ||
        "";

      if (state === "cancelled") {
        return false;
      }

      return overlapsDateRange(
        payslip.date_from,
        payslip.date_to,
        dateRange.start,
        dateRange.end
      );
    });
  }, [payslips, dateRange]);


  const totalPayroll = useMemo(() => {
    return filteredPayslips.reduce(
      (total, payslip) => {
        const net =
          Number(payslip.net_salary) ||
          Number(payslip.netSalary) ||
          0;

        return total + net;
      },
      0
    );
  }, [filteredPayslips]);


  // ==========================================================
  // TIME OFF DAYS
  // ==========================================================

  const approvedDays = useMemo(() => {
    return approvedTimeOff.reduce(
      (total, item) =>
        total + Number(item.days || 0),
      0
    );
  }, [approvedTimeOff]);


  const pendingDays = useMemo(() => {
    return pendingTimeOff.reduce(
      (total, item) =>
        total + Number(item.days || 0),
      0
    );
  }, [pendingTimeOff]);


  // ==========================================================
  // EMPLOYEE SEARCH
  // ==========================================================

  const filteredEmployees = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return employees;
    }

    return employees.filter((employee) => {
      return (
        employee.name
          ?.toLowerCase()
          .includes(query) ||
        employee.employee_code
          ?.toLowerCase()
          .includes(query) ||
        employee.department
          ?.toLowerCase()
          .includes(query) ||
        employee.job_position
          ?.toLowerCase()
          .includes(query) ||
        employee.email
          ?.toLowerCase()
          .includes(query)
      );
    });
  }, [employees, search]);


  // ==========================================================
  // EXPORT TIME OFF CSV
  // ==========================================================

  function exportTimeOffCSV() {
    const headers = [
      "Employee",
      "Leave Type",
      "Start Date",
      "End Date",
      "Days",
      "Reason",
      "Status",
    ];

    const rows = approvedTimeOff.map((item) => [
      item.employee || "—",
      item.leaveType || "—",
      item.start_date || "—",
      item.end_date || "—",
      item.days || 0,
      item.reason || "—",
      item.state || "—",
    ]);

    const csv = [
      headers,
      ...rows,
    ]
      .map((row) =>
        row
          .map((value) =>
            `"${String(value).replaceAll('"', '""')}"`
          )
          .join(",")
      )
      .join("\n");

    const blob = new Blob(
      [csv],
      {
        type: "text/csv;charset=utf-8;",
      }
    );

    const url =
      URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;
    link.download =
      "approved-time-off-report.csv";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  }


  // ==========================================================
  // REPORT CARDS
  // ==========================================================

  const reportCards = [
    {
      id: "employees",
      title: "Employee Report",
      description:
        "View employee details, departments and positions.",
      icon: Users,
      value: employees.length,
    },
    {
      id: "attendance",
      title: "Attendance Report",
      description:
        "View employee attendance and working hours.",
      icon: CalendarCheck,
      value: presentAttendance.length,
    },
    {
      id: "timeoff",
      title: "Time Off Report",
      description:
        "View approved and pending time off requests.",
      icon: CalendarDays,
      value: approvedTimeOff.length,
    },
    {
      id: "contracts",
      title: "Contract Report",
      description:
        "View active employee contracts.",
      icon: FileText,
      value: activeContracts.length,
    },
    {
      id: "payroll",
      title: "Payroll Report",
      description:
        "View payroll and net salary information.",
      icon: WalletCards,
      value: formatCurrency(totalPayroll),
    },
  ];


  // ==========================================================
  // LOADING
  // ==========================================================

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="mx-auto max-w-7xl">
          <div className="flex min-h-[500px] items-center justify-center">
            <div className="text-center">
              <RefreshCw className="mx-auto mb-4 h-10 w-10 animate-spin text-gray-500" />

              <p className="text-lg font-medium text-gray-700">
                Loading reports...
              </p>

              <p className="mt-1 text-sm text-gray-500">
                Fetching data from PeoplePay360
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }


  // ==========================================================
  // PAGE
  // ==========================================================

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl">

        {/* HEADER */}

        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Reports
            </h1>

            <p className="mt-1 text-gray-600">
              View and analyze your HR and payroll data.
            </p>
          </div>

          <button
            onClick={loadReports}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </button>

        </div>


        {/* ERROR */}

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 rounded-full bg-red-100 p-1.5">
                <ArrowUpRight className="h-4 w-4 text-red-600" />
              </div>

              <div>
                <p className="font-semibold text-red-800">
                  Unable to load reports
                </p>

                <p className="mt-1 text-sm text-red-700">
                  {error}
                </p>
              </div>
            </div>
          </div>
        )}


        {/* PERIOD FILTER */}

        <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">

            <div>
              <p className="mb-2 text-sm font-semibold text-gray-700">
                Report Period
              </p>

              <div className="flex flex-wrap gap-2">

                {[
                  ["week", "This Week"],
                  ["month", "This Month"],
                  ["threeMonths", "3 Months"],
                  ["year", "This Year"],
                  ["custom", "Custom"],
                ].map(([value, label]) => (
                  <button
                    key={value}
                    onClick={() =>
                      setPeriod(
                        value as
                          | "week"
                          | "month"
                          | "threeMonths"
                          | "year"
                          | "custom"
                      )
                    }
                    className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                      period === value
                        ? "bg-gray-900 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {label}
                  </button>
                ))}

              </div>
            </div>


            {period === "custom" && (
              <div className="flex flex-col gap-3 sm:flex-row">

                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-500">
                    Start Date
                  </label>

                  <input
                    type="date"
                    value={customStart}
                    onChange={(e) =>
                      setCustomStart(e.target.value)
                    }
                    className="rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-400"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-500">
                    End Date
                  </label>

                  <input
                    type="date"
                    value={customEnd}
                    onChange={(e) =>
                      setCustomEnd(e.target.value)
                    }
                    className="rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-400"
                  />
                </div>

              </div>
            )}

          </div>

          <p className="mt-4 text-sm text-gray-500">
            {formatDate(
              dateRange.start.toISOString()
            )}{" "}
            —{" "}
            {formatDate(
              dateRange.end.toISOString()
            )}
          </p>

        </div>


        {/* REPORT CARDS */}

        <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">

          {reportCards.map((card) => {
            const Icon = card.icon;

            return (
              <button
                key={card.id}
                onClick={() =>
                  setSelectedReport(card.id)
                }
                className={`rounded-2xl border bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
                  selectedReport === card.id
                    ? "border-gray-900 ring-1 ring-gray-900"
                    : "border-gray-200"
                }`}
              >

                <div className="mb-4 flex items-center justify-between">

                  <div className="rounded-xl bg-gray-100 p-2.5">
                    <Icon className="h-5 w-5 text-gray-700" />
                  </div>

                  <ArrowUpRight className="h-4 w-4 text-gray-400" />

                </div>

                <p className="text-2xl font-bold text-gray-900">
                  {card.value}
                </p>

                <h3 className="mt-1 font-semibold text-gray-900">
                  {card.title}
                </h3>

                <p className="mt-1 text-xs leading-5 text-gray-500">
                  {card.description}
                </p>

              </button>
            );
          })}

        </div>


        {/* SUMMARY */}

        <div className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-gray-100 p-2.5">
                <Users className="h-5 w-5 text-gray-700" />
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Total Employees
                </p>

                <p className="text-2xl font-bold text-gray-900">
                  {employees.length}
                </p>
              </div>
            </div>
          </div>


          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-gray-100 p-2.5">
                <Clock3 className="h-5 w-5 text-gray-700" />
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Attendance Records
                </p>

                <p className="text-2xl font-bold text-gray-900">
                  {filteredAttendance.length}
                </p>
              </div>
            </div>
          </div>


          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-gray-100 p-2.5">
                <CalendarDays className="h-5 w-5 text-gray-700" />
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Approved Leave Days
                </p>

                <p className="text-2xl font-bold text-gray-900">
                  {approvedDays}
                </p>
              </div>
            </div>
          </div>


          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-gray-100 p-2.5">
                <CircleDollarSign className="h-5 w-5 text-gray-700" />
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Net Payroll
                </p>

                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(totalPayroll)}
                </p>
              </div>
            </div>
          </div>

        </div>


        {/* ====================================================
            TIME OFF REPORT
        ==================================================== */}

        {selectedReport === "timeoff" && (
          <div className="space-y-6">

            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Time Off Report
                </h2>

                <p className="text-sm text-gray-500">
                  Approved and pending time off requests.
                </p>
              </div>

              <button
                onClick={exportTimeOffCSV}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
              >
                <Download className="h-4 w-4" />
                Export CSV
              </button>

            </div>


            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">

              <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <p className="text-sm text-gray-500">
                  Approved Requests
                </p>

                <p className="mt-2 text-3xl font-bold text-gray-900">
                  {approvedTimeOff.length}
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  {approvedDays} total days
                </p>
              </div>


              <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <p className="text-sm text-gray-500">
                  Pending Requests
                </p>

                <p className="mt-2 text-3xl font-bold text-gray-900">
                  {pendingTimeOff.length}
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  {pendingDays} requested days
                </p>
              </div>


              <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <p className="text-sm text-gray-500">
                  Total Requests
                </p>

                <p className="mt-2 text-3xl font-bold text-gray-900">
                  {timeOff.length}
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  All time off records
                </p>
              </div>

            </div>


            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

              <div className="overflow-x-auto">

                <table className="w-full min-w-[850px]">

                  <thead className="border-b border-gray-200 bg-gray-50">

                    <tr>

                      <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Employee
                      </th>

                      <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Leave Type
                      </th>

                      <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Start
                      </th>

                      <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                        End
                      </th>

                      <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Days
                      </th>

                      <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Status
                      </th>

                    </tr>

                  </thead>


                  <tbody className="divide-y divide-gray-100">

                    {approvedTimeOff.length === 0 ? (
                      <tr>
                        <td
                          colSpan={6}
                          className="px-5 py-12 text-center text-sm text-gray-500"
                        >
                          No approved time off found for this period.
                        </td>
                      </tr>
                    ) : (
                      approvedTimeOff.map((item) => (
                        <tr
                          key={item.id}
                          className="hover:bg-gray-50"
                        >

                          <td className="px-5 py-4">

                            <p className="font-medium text-gray-900">
                              {item.employee || "—"}
                            </p>

                            {item.reason && (
                              <p className="mt-1 max-w-[250px] truncate text-xs text-gray-500">
                                {item.reason}
                              </p>
                            )}

                          </td>

                          <td className="px-5 py-4 text-sm text-gray-700">
                            {item.leaveType || "—"}
                          </td>

                          <td className="px-5 py-4 text-sm text-gray-700">
                            {formatDate(item.start_date)}
                          </td>

                          <td className="px-5 py-4 text-sm text-gray-700">
                            {formatDate(item.end_date)}
                          </td>

                          <td className="px-5 py-4 text-sm font-semibold text-gray-900">
                            {item.days || 0}
                          </td>

                          <td className="px-5 py-4">

                            <span className="inline-flex rounded-full bg-gray-100 px-3 py-1 text-xs font-medium capitalize text-gray-700">
                              {item.state || "approved"}
                            </span>

                          </td>

                        </tr>
                      ))
                    )}

                  </tbody>

                </table>

              </div>

            </div>

          </div>
        )}


        {/* ====================================================
            EMPLOYEE REPORT
        ==================================================== */}

        {selectedReport === "employees" && (
          <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">

            <div className="border-b border-gray-200 p-5">

              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Employee Report
                  </h2>

                  <p className="text-sm text-gray-500">
                    Employee information and organization details.
                  </p>
                </div>


                <div className="relative">

                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                  <input
                    type="text"
                    placeholder="Search employees..."
                    value={search}
                    onChange={(e) =>
                      setSearch(e.target.value)
                    }
                    className="w-full rounded-xl border border-gray-200 py-2.5 pl-9 pr-4 text-sm outline-none focus:border-gray-400 md:w-72"
                  />

                </div>

              </div>

            </div>


            <div className="overflow-x-auto">

              <table className="w-full min-w-[800px]">

                <thead className="border-b border-gray-200 bg-gray-50">

                  <tr>

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Employee
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Code
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Department
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Position
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Status
                    </th>

                  </tr>

                </thead>


                <tbody className="divide-y divide-gray-100">

                  {filteredEmployees.length === 0 ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-5 py-12 text-center text-sm text-gray-500"
                      >
                        No employees found.
                      </td>
                    </tr>
                  ) : (
                    filteredEmployees.map((employee) => (
                      <tr
                        key={employee.id}
                        className="hover:bg-gray-50"
                      >

                        <td className="px-5 py-4">

                          <div className="flex items-center gap-3">

                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-sm font-bold text-gray-700">
                              {employee.name
                                ?.charAt(0)
                                ?.toUpperCase() || "E"}
                            </div>

                            <div>
                              <p className="font-medium text-gray-900">
                                {employee.name}
                              </p>

                              {employee.email && (
                                <p className="text-xs text-gray-500">
                                  {employee.email}
                                </p>
                              )}
                            </div>

                          </div>

                        </td>

                        <td className="px-5 py-4 text-sm text-gray-700">
                          {employee.employee_code || "—"}
                        </td>

                        <td className="px-5 py-4 text-sm text-gray-700">
                          {employee.department || "—"}
                        </td>

                        <td className="px-5 py-4 text-sm text-gray-700">
                          {employee.job_position || "—"}
                        </td>

                        <td className="px-5 py-4">

                          <span className="inline-flex rounded-full bg-gray-100 px-3 py-1 text-xs font-medium capitalize text-gray-700">
                            {employee.status || "active"}
                          </span>

                        </td>

                      </tr>
                    ))
                  )}

                </tbody>

              </table>

            </div>

          </div>
        )}


        {/* ====================================================
            ATTENDANCE REPORT
        ==================================================== */}

        {selectedReport === "attendance" && (
          <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">

            <div className="border-b border-gray-200 p-5">

              <h2 className="text-xl font-bold text-gray-900">
                Attendance Report
              </h2>

              <p className="text-sm text-gray-500">
                Attendance records for the selected period.
              </p>

            </div>


            <div className="grid grid-cols-1 gap-5 p-5 md:grid-cols-3">

              <div className="rounded-xl bg-gray-50 p-4">
                <p className="text-sm text-gray-500">
                  Total Records
                </p>

                <p className="mt-1 text-2xl font-bold text-gray-900">
                  {filteredAttendance.length}
                </p>
              </div>

              <div className="rounded-xl bg-gray-50 p-4">
                <p className="text-sm text-gray-500">
                  Present
                </p>

                <p className="mt-1 text-2xl font-bold text-gray-900">
                  {presentAttendance.length}
                </p>
              </div>

              <div className="rounded-xl bg-gray-50 p-4">
                <p className="text-sm text-gray-500">
                  Total Hours
                </p>

                <p className="mt-1 text-2xl font-bold text-gray-900">
                  {filteredAttendance.reduce(
                    (sum, item) =>
                      sum +
                      Number(item.worked_hours || 0),
                    0
                  ).toFixed(1)}
                </p>
              </div>

            </div>


            <div className="overflow-x-auto">

              <table className="w-full min-w-[800px]">

                <thead className="border-y border-gray-200 bg-gray-50">

                  <tr>

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Employee
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Check In
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Check Out
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Worked Hours
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      State
                    </th>

                  </tr>

                </thead>


                <tbody className="divide-y divide-gray-100">

                  {filteredAttendance.length === 0 ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-5 py-12 text-center text-sm text-gray-500"
                      >
                        No attendance records found.
                      </td>
                    </tr>
                  ) : (
                    filteredAttendance.map((record) => (
                      <tr
                        key={record.id}
                        className="hover:bg-gray-50"
                      >

                        <td className="px-5 py-4 text-sm font-medium text-gray-900">
                          {getEmployeeName(
                            record.employee_id,
                            record.employee
                          )}
                        </td>

                        <td className="px-5 py-4 text-sm text-gray-700">
                          {formatDate(record.check_in)}
                        </td>

                        <td className="px-5 py-4 text-sm text-gray-700">
                          {formatDate(record.check_out)}
                        </td>

                        <td className="px-5 py-4 text-sm font-semibold text-gray-900">
                          {Number(
                            record.worked_hours || 0
                          ).toFixed(1)}{" "}
                          hrs
                        </td>

                        <td className="px-5 py-4">

                          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium capitalize text-gray-700">
                            {record.state ||
                              record.status ||
                              "normal"}
                          </span>

                        </td>

                      </tr>
                    ))
                  )}

                </tbody>

              </table>

            </div>

          </div>
        )}


        {/* ====================================================
            CONTRACT REPORT
        ==================================================== */}

        {selectedReport === "contracts" && (
          <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">

            <div className="border-b border-gray-200 p-5">

              <h2 className="text-xl font-bold text-gray-900">
                Contract Report
              </h2>

              <p className="text-sm text-gray-500">
                Active and relevant employee contracts.
              </p>

            </div>


            <div className="overflow-x-auto">

              <table className="w-full min-w-[850px]">

                <thead className="border-b border-gray-200 bg-gray-50">

                  <tr>

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Employee
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Contract Type
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Start Date
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      End Date
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Wage
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Status
                    </th>

                  </tr>

                </thead>


                <tbody className="divide-y divide-gray-100">

                  {activeContracts.length === 0 ? (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-5 py-12 text-center text-sm text-gray-500"
                      >
                        No contracts found.
                      </td>
                    </tr>
                  ) : (
                    activeContracts.map((contract) => (
                      <tr
                        key={contract.id}
                        className="hover:bg-gray-50"
                      >

                        <td className="px-5 py-4 text-sm font-medium text-gray-900">
                          {getEmployeeName(
                            contract.employee_id,
                            contract.employee
                          )}
                        </td>

                        <td className="px-5 py-4 text-sm text-gray-700">
                          {contract.contract_type || "—"}
                        </td>

                        <td className="px-5 py-4 text-sm text-gray-700">
                          {formatDate(contract.start_date)}
                        </td>

                        <td className="px-5 py-4 text-sm text-gray-700">
                          {formatDate(contract.end_date)}
                        </td>

                        <td className="px-5 py-4 text-sm font-semibold text-gray-900">
                          {contract.wage
                            ? formatCurrency(
                                Number(contract.wage)
                              )
                            : "—"}
                        </td>

                        <td className="px-5 py-4">

                          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium capitalize text-gray-700">
                            {contract.state ||
                              contract.status ||
                              "active"}
                          </span>

                        </td>

                      </tr>
                    ))
                  )}

                </tbody>

              </table>

            </div>

          </div>
        )}


        {/* ====================================================
            PAYROLL REPORT
        ==================================================== */}

        {selectedReport === "payroll" && (
          <div className="space-y-6">

            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">

              <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

                <div className="flex items-center gap-3">

                  <div className="rounded-xl bg-gray-100 p-2.5">
                    <WalletCards className="h-5 w-5 text-gray-700" />
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">
                      Total Payroll
                    </p>

                    <p className="text-2xl font-bold text-gray-900">
                      {formatCurrency(totalPayroll)}
                    </p>
                  </div>

                </div>

              </div>


              <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

                <div className="flex items-center gap-3">

                  <div className="rounded-xl bg-gray-100 p-2.5">
                    <FileText className="h-5 w-5 text-gray-700" />
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">
                      Payslips
                    </p>

                    <p className="text-2xl font-bold text-gray-900">
                      {filteredPayslips.length}
                    </p>
                  </div>

                </div>

              </div>


              <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

                <div className="flex items-center gap-3">

                  <div className="rounded-xl bg-gray-100 p-2.5">
                    <TrendingUp className="h-5 w-5 text-gray-700" />
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">
                      Average Net Salary
                    </p>

                    <p className="text-2xl font-bold text-gray-900">

                      {formatCurrency(
                        filteredPayslips.length
                          ? totalPayroll /
                              filteredPayslips.length
                          : 0
                      )}

                    </p>
                  </div>

                </div>

              </div>

            </div>


            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

              <div className="border-b border-gray-200 p-5">

                <h2 className="text-xl font-bold text-gray-900">
                  Payroll Report
                </h2>

                <p className="text-sm text-gray-500">
                  Payslip information for the selected period.
                </p>

              </div>


              <div className="overflow-x-auto">

                <table className="w-full min-w-[900px]">

                  <thead className="border-b border-gray-200 bg-gray-50">

                    <tr>

                      <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Payslip
                      </th>

                      <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Employee
                      </th>

                      <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Period
                      </th>

                      <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Gross
                      </th>

                      <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Deduction
                      </th>

                      <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Net Salary
                      </th>

                      <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Status
                      </th>

                    </tr>

                  </thead>


                  <tbody className="divide-y divide-gray-100">

                    {filteredPayslips.length === 0 ? (
                      <tr>
                        <td
                          colSpan={7}
                          className="px-5 py-12 text-center text-sm text-gray-500"
                        >
                          No payslips found for this period.
                        </td>
                      </tr>
                    ) : (
                      filteredPayslips.map((payslip) => {

                        const gross =
                          Number(
                            payslip.gross_salary
                          ) ||
                          Number(
                            payslip.grossSalary
                          ) ||
                          0;

                        const deduction =
                          Number(
                            payslip.total_deduction
                          ) ||
                          Number(
                            payslip.totalDeduction
                          ) ||
                          0;

                        const net =
                          Number(
                            payslip.net_salary
                          ) ||
                          Number(
                            payslip.netSalary
                          ) ||
                          0;

                        return (
                          <tr
                            key={payslip.id}
                            className="hover:bg-gray-50"
                          >

                            <td className="px-5 py-4 text-sm font-medium text-gray-900">
                              {payslip.name || "—"}
                            </td>

                            <td className="px-5 py-4 text-sm text-gray-700">
                              {getEmployeeName(
                                payslip.employee_id,
                                payslip.employee
                              )}
                            </td>

                            <td className="px-5 py-4 text-sm text-gray-700">
                              {formatDate(
                                payslip.date_from
                              )}{" "}
                              -{" "}
                              {formatDate(
                                payslip.date_to
                              )}
                            </td>

                            <td className="px-5 py-4 text-sm text-gray-700">
                              {formatCurrency(gross)}
                            </td>

                            <td className="px-5 py-4 text-sm text-gray-700">
                              {formatCurrency(deduction)}
                            </td>

                            <td className="px-5 py-4 text-sm font-semibold text-gray-900">
                              {formatCurrency(net)}
                            </td>

                            <td className="px-5 py-4">

                              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium capitalize text-gray-700">
                                {payslip.state ||
                                  payslip.status ||
                                  "draft"}
                              </span>

                            </td>

                          </tr>
                        );
                      })
                    )}

                  </tbody>

                </table>

              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}