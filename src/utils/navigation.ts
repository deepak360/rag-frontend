// utils/navigation.ts
import {
  LayoutDashboard,
  Users,
  Settings,
  User,
  Upload,
  HelpCircleIcon
} from "lucide-react";

export const getNavigationItems = (isAdmin: boolean) => {
  if (isAdmin) {
    return [
      { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
      { name: "Manage Users", href: "/admin/users", icon: Users },
      { name: "Settings", href: "/admin/settings", icon: Settings },
    ];
  }

  return [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Upload Document", href: "/upload", icon: Upload },
    { name: "Q&A", href: "/qa", icon: HelpCircleIcon },
    { name: "Profile", href: "/profile", icon: User },
  ];
};
