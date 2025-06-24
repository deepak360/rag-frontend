'use client';

import { useAuth } from "@/context/AuthContext";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";

export default function Navbar() {
  const { logout, user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const avatarUrl = `https://api.dicebear.com/6.x/initials/svg?seed=${user?.email || "U"}`;

  return (
    <nav className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 shadow-sm z-10 flex justify-between items-center">
      <h1 className="text-xl font-semibold text-gray-800">My Dashboard</h1>

      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="flex items-center gap-2 focus:outline-none"
        >
          <div className="relative w-8 h-8 rounded-full overflow-hidden">
            <Image
              src={avatarUrl}
              alt="avatar"
              fill
              className="object-cover rounded-full"
              unoptimized
            />
          </div>
          <span className="hidden sm:block text-sm font-medium text-gray-700">{user?.email}</span>
          <svg
            className="w-4 h-4 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {menuOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-20">
            <div className="px-4 py-2 text-sm text-gray-700">{user?.email}</div>
            <hr className="border-gray-100" />
            <button
              onClick={logout}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
