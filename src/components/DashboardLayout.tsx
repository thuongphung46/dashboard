/** @format */

import { ReactNode, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Database,
  GitBranch,
  Key,
  Activity,
  Settings,
  Menu,
  X,
  Bell,
  Search,
  ChevronDown,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useAuth } from "../contexts/AuthContext";
import { DASHBOARD, LOGIN } from "../config/paths";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./ui/dropdown-menu";

interface DashboardLayoutProps {
  children: ReactNode;
}

import pages from "../config/pages";

// Build menu items from central pages config. We only include pages that
// are intended for authenticated users in the sidebar (auth !== false).
const menuItems = (t: (s: string) => string) =>
  pages
    .filter((p) => p.auth !== false)
    .map((p) => ({ icon: p.icon, label: t(p.labelKey), path: p.path }));

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { t } = useTranslation();

  const isActive = (path: string) => {
    if (path === DASHBOARD) return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  const navigate = useNavigate();
  const { user, logout } = useAuth();

  return (
    <div className="flex h-full bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 
        transform transition-transform duration-200 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white">P</span>
              </div>
              <span className="tracking-tight">{t("app.name")}</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 overflow-y-auto">
            <ul className="space-y-1">
              {menuItems(t).map((item) => {
                const Icon = item.icon as any;
                const active = isActive(item.path);

                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      onClick={() => setSidebarOpen(false)}
                      className={`
                        flex items-center gap-3 px-3 py-2 rounded-lg transition-colors
                        ${
                          active
                            ? "bg-blue-50 text-blue-700"
                            : "text-gray-700 hover:bg-gray-100"
                        }
                      `}
                    >
                      {Icon ? (
                        <Icon className="w-5 h-5 flex-shrink-0" />
                      ) : (
                        <span className="w-5 h-5" />
                      )}
                      <span>{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden min-h-0">
        {/* Top Navigation */}
        <header className="sticky top-0 z-30 h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
          <div className="flex items-center gap-4 flex-1">
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </Button>

            <div className="relative max-w-md w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder={t("search.placeholder")}
                className="pl-10 bg-gray-50 border-gray-200"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </Button>

            <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-3 focus:outline-none">
                    <Avatar>
                      <AvatarImage
                        src={
                          user
                            ? `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`
                            : "https://api.dicebear.com/7.x/avataaars/svg?seed=admin"
                        }
                      />
                      <AvatarFallback>
                        {user ? user.name.slice(0, 2).toUpperCase() : "AD"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="hidden md:block text-left">
                      <p className="text-gray-900">
                        {user?.name ?? t("user.default_name")}
                      </p>
                      <p className="text-gray-500 text-sm">
                        {user?.email ?? "admin@pyxis.com"}
                      </p>
                    </div>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent sideOffset={8} className="w-48">
                  <DropdownMenuItem
                    onSelect={() => {
                      logout();
                      navigate(LOGIN);
                    }}
                  >
                    {t("user.logout")}
                  </DropdownMenuItem>

                  <div className="px-3 py-2">
                    <div className="text-xs text-gray-500 mb-1">
                      {t("system.default_language")}
                    </div>
                    <LanguageSwitcher />
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto min-h-0">{children}</main>
      </div>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
