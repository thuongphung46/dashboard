/** @format */

import { useParams, useNavigate } from "react-router-dom";
import { DATABASE } from "../../config/paths";
import {
  ArrowLeft,
  Database,
  Server,
  HardDrive,
  Activity,
  Download,
  Play,
  Copy,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { StatusBadge } from "../../components/StatusBadge";
import { Progress } from "../../components/ui/progress";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const databaseInfo = {
  id: "DB-001",
  name: "acme_production",
  customerId: "CUST-001",
  customerName: "Acme Corporation",
  size: "124.5 GB",
  status: "active" as const,
  version: "PostgreSQL 15.2",
  createdDate: "2024-01-15",
  host: "db-primary-01.pyxis.cloud",
  port: "5432",
  maxConnections: 100,
  currentConnections: 45,
  lastBackup: "2024-06-19 02:00:00",
};

const connectionString = `postgresql://username:password@${databaseInfo.host}:${databaseInfo.port}/${databaseInfo.name}`;

const storageData = [
  { month: "Jan", size: 85 },
  { month: "Feb", size: 92 },
  { month: "Mar", size: 98 },
  { month: "Apr", size: 107 },
  { month: "May", size: 115 },
  { month: "Jun", size: 124.5 },
];

const schemaInfo = [
  { name: "users", type: "Table", rows: 45230, size: "12.4 GB" },
  { name: "transactions", type: "Table", rows: 892456, size: "78.2 GB" },
  { name: "products", type: "Table", rows: 5678, size: "2.1 GB" },
  { name: "orders", type: "Table", rows: 234567, size: "18.9 GB" },
  { name: "user_sessions", type: "Table", rows: 156789, size: "8.4 GB" },
];

const backupHistory = [
  {
    id: 1,
    timestamp: "2024-06-19 02:00:00",
    size: "124.5 GB",
    status: "completed",
  },
  {
    id: 2,
    timestamp: "2024-06-18 02:00:00",
    size: "123.8 GB",
    status: "completed",
  },
  {
    id: 3,
    timestamp: "2024-06-17 02:00:00",
    size: "122.9 GB",
    status: "completed",
  },
  {
    id: 4,
    timestamp: "2024-06-16 02:00:00",
    size: "121.5 GB",
    status: "completed",
  },
];

export function DatabaseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { t } = useTranslation();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate(DATABASE)}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t("common.back")}
          </Button>
          <div>
            <h1 className="text-gray-900">{databaseInfo.name}</h1>
            <p className="text-gray-600 mt-1">
              {t("database.detail.id", { id: databaseInfo.id })}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Play className="w-4 h-4 mr-2" />
            {t("common.test_connection")}
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            {t("database.detail.backup_now")}
          </Button>
        </div>
      </div>

      {/* Database Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-gray-200 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">
                  {t("database.detail.db_size")}
                </p>
                <p className="text-gray-900 mt-1">{databaseInfo.size}</p>
              </div>
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                <HardDrive className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">
                  {t("common.connections")}
                </p>
                <p className="text-gray-900 mt-1">
                  {databaseInfo.currentConnections} /{" "}
                  {databaseInfo.maxConnections}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                <Activity className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <Progress
              value={
                (databaseInfo.currentConnections /
                  databaseInfo.maxConnections) *
                100
              }
              className="mt-3"
            />
          </CardContent>
        </Card>

        <Card className="border-gray-200 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">
                  {t("database.detail.status")}
                </p>
                <div className="mt-2">
                  <StatusBadge status={databaseInfo.status} />
                </div>
              </div>
              <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
                <Server className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">
                  {t("database.detail.version")}
                </p>
                <p className="text-gray-900 mt-1 text-sm">
                  {databaseInfo.version}
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center">
                <Database className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Connection & Schema Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Connection Information */}
        <Card className="border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle>{t("database.detail.connection.title")}</CardTitle>
            <CardDescription>
              {t("database.detail.connection.description")}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>{t("database.detail.connection.host")}</Label>
              <div className="flex gap-2">
                <Input value={databaseInfo.host} readOnly />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(databaseInfo.host)}
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label>{t("database.detail.connection.port")}</Label>
              <Input value={databaseInfo.port} readOnly />
            </div>
            <div className="space-y-2">
              <Label>{t("database.detail.connection.db_name")}</Label>
              <Input value={databaseInfo.name} readOnly />
            </div>
            <div className="space-y-2">
              <Label>{t("database.detail.connection.connection_string")}</Label>
              <div className="flex gap-2">
                <Input value={connectionString} readOnly type="password" />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(connectionString)}
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-4 border-t">
              <div>
                <p className="text-gray-600 text-sm">{t("common.customer")}</p>
                <p className="text-gray-900 mt-1">
                  {databaseInfo.customerName}
                </p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">
                  {t("common.created_date")}
                </p>
                <p className="text-gray-900 mt-1">{databaseInfo.createdDate}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Schema Preview */}
        <Card className="border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle>{t("database.detail.schema.title")}</CardTitle>
            <CardDescription>
              {t("database.detail.schema.description")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {schemaInfo.map((schema) => (
                <div
                  key={schema.name}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="text-gray-900">{schema.name}</p>
                    <p className="text-gray-500 text-sm">
                      {schema.rows.toLocaleString()} {t("common.rows")}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-900 text-sm">{schema.size}</p>
                    <p className="text-gray-500 text-xs">{schema.type}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Storage Usage Chart */}
      <Card className="border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle>{t("database.detail.storage_trend.title")}</CardTitle>
          <CardDescription>
            {t("database.detail.storage_trend.description")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={storageData}>
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
                dataKey="size"
                stroke="#2563EB"
                fill="#DBEAFE"
                name={t("database.detail.storage_trend.size_label")}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Backup History */}
      <Card className="border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle>{t("database.detail.backup.title")}</CardTitle>
          <CardDescription>
            {t("database.detail.backup.description")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {backupHistory.map((backup) => (
              <div
                key={backup.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                    <Download className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-gray-900">{backup.timestamp}</p>
                    <p className="text-gray-500 text-sm">
                      {t("database.detail.backup.size_label")}: {backup.size}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <StatusBadge status="completed" />
                  <Button variant="outline" size="sm">
                    {t("common.restore")}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
