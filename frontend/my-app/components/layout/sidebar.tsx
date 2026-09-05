"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  FileText,
  Clock3,
  CalendarDays,
  WalletCards,
  ReceiptText,
  BarChart3,
  BriefcaseBusiness,
  ChevronRight,
} from "lucide-react";

const menuItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Employees",
    href: "/employees",
    icon: Users,
  },
  {
    name: "Contracts",
    href: "/contracts",
    icon: FileText,
  },
  {
    name: "Attendance",
    href: "/attendance",
    icon: Clock3,
  },
  {
    name: "Time Off",
    href: "/TimeOff",
    icon: CalendarDays,
  },
  {
    name: "Payroll",
    href: "/payroll",
    icon: WalletCards,
  },
  {
    name: "Payslips",
    href: "/payslips",
    icon: ReceiptText,
  },
  {
    name: "Reports",
    href: "/reports",
    icon: BarChart3,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col bg-slate-950 text-white shadow-2xl">
      
      {/* Logo */}
      <div className="flex h-20 items-center border-b border-slate-800 px-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 shadow-lg shadow-indigo-600/30">
          <BriefcaseBusiness size={22} />
        </div>

        <div className="ml-3">
          <h1 className="text-lg font-bold tracking-tight">
            PeoplePay<span className="text-indigo-400">360</span>
          </h1>
          <p className="text-[11px] text-slate-400">
            HR & Payroll Platform
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-4 py-6">
        <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
          Main Menu
        </p>

        <div className="space-y-1.5">
          {menuItems.map((item) => {
            const Icon = item.icon;

            const isActive =
              pathname === item.href ||
              pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group flex items-center rounded-xl px-3 py-3 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <Icon
                  size={19}
                  className={`mr-3 transition-transform duration-200 group-hover:scale-110 ${
                    isActive
                      ? "text-white"
                      : "text-slate-500 group-hover:text-indigo-400"
                  }`}
                />

                <span className="flex-1">{item.name}</span>

                {isActive && (
                  <ChevronRight size={16} className="text-indigo-200" />
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Bottom Profile Card */}
      <div className="border-t border-slate-800 p-4">
        <div className="flex items-center rounded-xl bg-slate-900 p-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500 font-semibold">
            A
          </div>

          <div className="ml-3 min-w-0">
            <p className="truncate text-sm font-semibold text-white">
              Admin
            </p>
            <p className="truncate text-xs text-slate-400">
              HR Manager
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}