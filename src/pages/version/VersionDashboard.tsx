/** @format */

import { useNavigate } from "react-router-dom";
import {
  GitBranch,
  Upload,
  FileText,
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";
import { PageHeader } from "../../components/PageHeader";
import { StatusBadge } from "../../components/StatusBadge";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { Progress } from "../../components/ui/progress";
import { useTranslation } from "react-i18next";

const currentVersions = [
  {
    customerId: "CUST-001",
    customerName: "Acme Corporation",
    version: "v4.2.1",
    status: "completed" as const,
    updatedDate: "2024-06-15",
  },
  {
    customerId: "CUST-002",
    customerName: "TechStart Inc",
    version: "v4.1.5",
    status: "pending" as const,
    updatedDate: "2024-05-20",
  },
  {
    customerId: "CUST-003",
    customerName: "DataFlow Ltd",
    version: "v4.0.8",
    status: "completed" as const,
    updatedDate: "2024-04-10",
  },
  {
    customerId: "CUST-004",
    customerName: "CloudSync Inc",
    version: "v4.2.1",
    status: "completed" as const,
    updatedDate: "2024-06-16",
  },
  {
    customerId: "CUST-005",
    customerName: "Innovate Co",
    version: "v4.2.0",
    status: "completed" as const,
    updatedDate: "2024-06-01",
  },
  {
    customerId: "CUST-006",
    customerName: "SecureNet Systems",
    version: "v3.9.2",
    status: "failed" as const,
    updatedDate: "2024-03-15",
  },
];

const recentReleases = [
  {
    version: "v4.2.1",
    releaseDate: "2024-06-16",
    type: "Patch",
    description: "Security fixes and performance improvements",
    deployed: 2,
    total: 6,
  },
  {
    version: "v4.2.0",
    releaseDate: "2024-06-01",
    type: "Minor",
    description: "New dashboard widgets and API enhancements",
    deployed: 3,
    total: 6,
  },
  {
    version: "v4.1.5",
    releaseDate: "2024-05-15",
    type: "Patch",
    description: "Bug fixes and stability improvements",
    deployed: 4,
    total: 6,
  },
];

export function VersionDashboard() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const stats = {
    latestVersion: "v4.2.1",
    upToDate: currentVersions.filter((v) => v.version === "v4.2.1").length,
    pendingUpdates: currentVersions.filter((v) => v.status === "pending")
      .length,
    failedUpdates: currentVersions.filter((v) => v.status === "failed").length,
  };

  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title={t("version.title")}
        description={t("version.description")}
        action={{
          label: t("version.update"),
          onClick: () => navigate("/version/update"),
          icon: <Upload className="w-4 h-4 mr-2" />,
        }}
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-gray-200 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">
                  {t("version.latest_version")}
                </p>
                <p className="text-gray-900 mt-1">{stats.latestVersion}</p>
              </div>
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                <GitBranch className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">
                  {t("version.up_to_date")}
                </p>
                <p className="text-gray-900 mt-1">
                  {stats.upToDate} / {currentVersions.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">
                  {t("version.pending_updates")}
                </p>
                <p className="text-gray-900 mt-1">{stats.pendingUpdates}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">
                  {t("version.failed_updates")}
                </p>
                <p className="text-gray-900 mt-1">{stats.failedUpdates}</p>
              </div>
              <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Releases */}
      <Card className="border-gray-200 shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{t("version.recent_releases")}</CardTitle>
              <CardDescription>{t("version.description")}</CardDescription>
            </div>
            <Button
              variant="outline"
              onClick={() => navigate("/version/releases")}
            >
              <FileText className="w-4 h-4 mr-2" />
              {t("version.view_all_releases")}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentReleases.map((release) => (
              <div
                key={release.version}
                className="p-4 border border-gray-200 rounded-lg"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-3">
                      <p className="text-gray-900">{release.version}</p>
                      <StatusBadge
                        status={
                          release.type === "Major"
                            ? "warning"
                            : release.type === "Minor"
                              ? "active"
                              : "inactive"
                        }
                        label={release.type}
                      />
                    </div>
                    <p className="text-gray-600 text-sm mt-1">
                      {release.description}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-600 text-sm flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {release.releaseDate}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">
                        {t("version.deployment_progress")}
                      </span>
                      <span className="text-gray-900">
                        {release.deployed} / {release.total}{" "}
                        {t("version.customers")}
                      </span>
                    </div>
                    <Progress
                      value={(release.deployed / release.total) * 100}
                    />
                  </div>
                  <Button variant="outline" size="sm">
                    {t("version.deploy")}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Customer Version Status */}
      <Card className="border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle>{t("version.customer_version_status")}</CardTitle>
          <CardDescription>
            {t("version.current_version")} for each customer
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Customer ID</TableHead>
                <TableHead>{t("version.current_version")}</TableHead>
                <TableHead>{t("version.update_status")}</TableHead>
                <TableHead>{t("version.last_updated")}</TableHead>
                <TableHead className="text-right">
                  {t("common.actions")}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentVersions.map((customer) => (
                <TableRow key={customer.customerId}>
                  <TableCell className="text-gray-900">
                    {customer.customerName}
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {customer.customerId}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-900">{customer.version}</span>
                      {customer.version === stats.latestVersion && (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={customer.status} />
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {customer.updatedDate}
                  </TableCell>
                  <TableCell className="text-right">
                    {customer.version !== stats.latestVersion && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate("/version/update")}
                      >
                        Update
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
