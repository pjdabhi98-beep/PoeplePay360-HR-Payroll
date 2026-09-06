"use client";

import { Bell, Search, UserCircle } from "lucide-react";

export default function Navbar() {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-30">
      
      {/* Search */}
      <div className="flex items-center w-80 bg-gray-100 rounded-xl px-4 py-2">
        <Search size={18} className="text-gray-500" />
        <input
          type="text"
          placeholder="Search employees, payroll..."
          className="bg-transparent outline-none ml-3 w-full text-sm"
        />
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-5">
        
        <button className="relative text-gray-600 hover:text-gray-900">
          <Bell size={21} />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        <div className="flex items-center gap-3">
          <UserCircle size={36} className="text-gray-500" />

          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-gray-800">
              Admin
            </p>
            <p className="text-xs text-gray-500">
              HR Manager
            </p>
          </div>
        </div>

      </div>
    </header>
  );
}