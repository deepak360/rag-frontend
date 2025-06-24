'use client';

import Link from "next/link";
import { getNavigationItems } from "@/utils/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Sidebar() {
  const { user } = useAuth();
  const navItems = getNavigationItems(!!user?.is_superuser);

  return (
    <aside className="hidden md:block w-64 bg-white border-r border-gray-200 min-h-screen p-4">
      <nav className="space-y-2">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="flex items-center gap-2 p-2 rounded-lg text-gray-700 hover:bg-gray-100">
                <item.icon className="w-5 h-5" size={18} />
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
