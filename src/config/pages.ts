/**
 * Central pages / menu configuration
 * Each entry contains: key, path, labelKey (i18n), titleKey (i18n for page title),
 * icon (lucide-react component), auth (boolean), group (string)
 *
 * @format
 */

import {
  LayoutDashboard,
  Users,
  Database,
  GitBranch,
  Key,
  Activity,
  Settings,
  LogIn,
} from "lucide-react";
import {
  DASHBOARD,
  CUSTOMERS,
  DATABASE as DATABASE_PATH,
  VERSION,
  LICENSES,
  ACTIVITY_LOGS,
  SETTINGS as SETTINGS_PATH,
  LOGIN as LOGIN_PATH,
} from "./paths";
import type { ComponentType, SVGProps } from "react";

export type IconComp = ComponentType<SVGProps<SVGSVGElement>>;

export interface PageItem {
  key: string;
  path: string;
  labelKey: string; // i18n key for menu label
  titleKey?: string; // i18n key for page title (fallback to labelKey)
  icon?: IconComp;
  auth?: boolean; // true = requires auth, false = public
  group?: string; // grouping for menus
}

export const pages: PageItem[] = [
  {
    key: "dashboard",
    path: DASHBOARD,
    labelKey: "menu.dashboard",
    titleKey: "dashboard.title",
    icon: LayoutDashboard,
    auth: true,
    group: "main",
  },
  {
    key: "customers",
    path: CUSTOMERS,
    labelKey: "menu.customers",
    titleKey: "customers.title",
    icon: Users,
    auth: true,
    group: "management",
  },
  {
    key: "database",
    path: DATABASE_PATH,
    labelKey: "menu.database",
    titleKey: "database.title",
    icon: Database,
    auth: true,
    group: "management",
  },
  {
    key: "version",
    path: VERSION,
    labelKey: "menu.version",
    titleKey: "version.title",
    icon: GitBranch,
    auth: true,
    group: "ops",
  },
  {
    key: "licenses",
    path: LICENSES,
    labelKey: "menu.licenses",
    titleKey: "license.title",
    icon: Key,
    auth: true,
    group: "management",
  },
  {
    key: "activity-logs",
    path: ACTIVITY_LOGS,
    labelKey: "menu.activity_logs",
    titleKey: "activity.title",
    icon: Activity,
    auth: true,
    group: "ops",
  },
  {
    key: "settings",
    path: SETTINGS_PATH,
    labelKey: "menu.system_settings",
    titleKey: "system.title",
    icon: Settings,
    auth: true,
    group: "admin",
  },
  {
    key: "login",
    path: LOGIN_PATH,
    labelKey: "login.title",
    titleKey: "login.title",
    icon: LogIn,
    auth: false,
    group: "auth",
  },
];

export default pages;
