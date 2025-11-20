/** @format */

import {
  Users,
  Database,
  GitBranch,
  Key,
  TrendingUp,
  Activity,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const kpiData = [
  {
    title: "Total Customers",
    value: "248",
    change: "+12.5%",
    trend: "up",
    icon: Users,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    title: "Active Databases",
    value: "342",
    change: "+8.2%",
    trend: "up",
    icon: Database,
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    title: "Current Version",
    value: "v4.2.1",
    change: "Released 3d ago",
    trend: "neutral",
    icon: GitBranch,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
  {
    title: "Active Licenses",
    value: "189",
    change: "+5.3%",
    trend: "up",
    icon: Key,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
  },
];

const customerGrowthData = [
  { month: "Jan", customers: 145, databases: 198 },
  { month: "Feb", customers: 162, databases: 221 },
  { month: "Mar", customers: 178, databases: 245 },
  { month: "Apr", customers: 195, databases: 276 },
  { month: "May", customers: 218, databases: 302 },
  { month: "Jun", customers: 248, databases: 342 },
];

const licenseDistributionData = [
  { name: "Enterprise", value: 89, color: "#2563EB" },
  { name: "Professional", value: 65, color: "#10B981" },
  { name: "Trial", value: 35, color: "#F59E0B" },
];

const recentActivity = [
  {
    id: 1,
    action: "New customer registered",
    customer: "Acme Corp",
    time: "5 minutes ago",
    type: "customer",
  },
  {
    id: 2,
    action: "Database backup completed",
    customer: "TechStart Inc",
    time: "15 minutes ago",
    type: "database",
  },
  {
    id: 3,
    action: "License renewed",
    customer: "DataFlow Ltd",
    time: "1 hour ago",
    type: "license",
  },
  {
    id: 4,
    action: "Version updated",
    customer: "CloudSync Inc",
    time: "2 hours ago",
    type: "version",
  },
  {
    id: 5,
    action: "New user added",
    customer: "Innovate Co",
    time: "3 hours ago",
    type: "customer",
  },
];

const systemHealthData = [
  { time: "00:00", cpu: 45, memory: 62, disk: 58 },
  { time: "04:00", cpu: 38, memory: 58, disk: 59 },
  { time: "08:00", cpu: 72, memory: 75, disk: 61 },
  { time: "12:00", cpu: 85, memory: 82, disk: 63 },
  { time: "16:00", cpu: 78, memory: 79, disk: 65 },
  { time: "20:00", cpu: 52, memory: 65, disk: 66 },
];

export function Dashboard() {
  const { t } = useTranslation();

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-gray-900">{t("dashboard.title")}</h1>
        <p className="text-gray-600 mt-1">{t("dashboard.welcome")}</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <Card
              key={kpi.title}
              className="border-gray-200 shadow-sm hover:shadow-md transition-shadow"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">
                      {t(
                        `dashboard.kpi.${kpi.title.replace(/ /g, "_").toLowerCase()}`
                      ) || kpi.title}
                    </p>
                    <p className="text-gray-900 mt-2">{kpi.value}</p>
                    <div className="flex items-center gap-1 mt-2">
                      {kpi.trend === "up" && (
                        <TrendingUp className="w-4 h-4 text-green-600" />
                      )}
                      <span
                        className={`text-sm ${kpi.trend === "up" ? "text-green-600" : "text-gray-500"}`}
                      >
                        {kpi.change}
                      </span>
                    </div>
                  </div>
                  <div
                    className={`w-12 h-12 ${kpi.bgColor} rounded-lg flex items-center justify-center`}
                  >
                    <Icon className={`w-6 h-6 ${kpi.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Customer Growth Chart */}
        <Card className="border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle>
              {t("dashboard.charts.customer_database_growth")}
            </CardTitle>
            <CardDescription>
              {t("dashboard.charts.monthly_growth")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={customerGrowthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="month" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #E5E7EB",
                    borderRadius: "8px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="customers"
                  stackId="1"
                  stroke="#2563EB"
                  fill="#DBEAFE"
                  name="Customers"
                />
                <Area
                  type="monotone"
                  dataKey="databases"
                  stackId="2"
                  stroke="#10B981"
                  fill="#D1FAE5"
                  name="Databases"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* License Distribution */}
        <Card className="border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle>{t("dashboard.charts.license_distribution")}</CardTitle>
            <CardDescription>
              {t("dashboard.charts.license_distribution_desc")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <ResponsiveContainer width="50%" height={200}>
                <PieChart>
                  <Pie
                    data={licenseDistributionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {licenseDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-3">
                {licenseDistributionData.map((item) => (
                  <div key={item.name} className="flex items-center gap-3">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <div>
                      <p className="text-gray-900">{item.name}</p>
                      <p className="text-gray-600 text-sm">
                        {item.value} licenses
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Health & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* System Health */}
        <Card className="lg:col-span-2 border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle>{t("dashboard.charts.system_health")}</CardTitle>
            <CardDescription>
              {t("dashboard.charts.system_health_desc")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={systemHealthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="time" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #E5E7EB",
                    borderRadius: "8px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="cpu"
                  stroke="#2563EB"
                  strokeWidth={2}
                  name="CPU %"
                />
                <Line
                  type="monotone"
                  dataKey="memory"
                  stroke="#10B981"
                  strokeWidth={2}
                  name="Memory %"
                />
                <Line
                  type="monotone"
                  dataKey="disk"
                  stroke="#F59E0B"
                  strokeWidth={2}
                  name="Disk %"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle>{t("dashboard.charts.recent_activity")}</CardTitle>
            <CardDescription>
              {t("dashboard.charts.recent_activity_desc")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center">
                    <Activity className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-900 text-sm">{activity.action}</p>
                    <p className="text-gray-600 text-sm">{activity.customer}</p>
                    <p className="text-gray-500 text-xs mt-1">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
