/** @format */

import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Copy,
  RefreshCw,
  Edit,
  Calendar,
  Users,
  HardDrive,
  Package,
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
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Progress } from "../../components/ui/progress";
import { Checkbox } from "../../components/ui/checkbox";

const licenseData = {
  id: "LIC-001",
  customerId: "CUST-001",
  customerName: "Acme Corporation",
  licenseKey: "PYXS-ACME-2024-X9K2-M5P7",
  startDate: "2024-01-15",
  expirationDate: "2025-01-14",
  status: "active" as const,
  plan: "Enterprise",
  userLimit: 100,
  currentUsers: 45,
  storageLimit: 500,
  currentStorage: 312,
  modules: [
    {
      name: "Core Platform",
      enabled: true,
      description: "Base system functionality",
    },
    {
      name: "Analytics Dashboard",
      enabled: true,
      description: "Advanced analytics and reporting",
    },
    { name: "API Access", enabled: true, description: "REST API integration" },
    {
      name: "Custom Reports",
      enabled: true,
      description: "Custom report builder",
    },
    {
      name: "Advanced Security",
      enabled: false,
      description: "Enhanced security features",
    },
    {
      name: "SSO Integration",
      enabled: false,
      description: "Single sign-on support",
    },
  ],
};

const licenseHistory = [
  {
    id: 1,
    action: "License Created",
    date: "2024-01-15 10:30:00",
    user: "admin@pyxis.com",
  },
  {
    id: 2,
    action: "Module Activated: Analytics",
    date: "2024-01-20 14:15:00",
    user: "admin@pyxis.com",
  },
  {
    id: 3,
    action: "Module Activated: API Access",
    date: "2024-02-05 09:45:00",
    user: "admin@pyxis.com",
  },
  {
    id: 4,
    action: "User Limit Increased",
    date: "2024-03-10 11:20:00",
    user: "admin@pyxis.com",
  },
];

export function LicenseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const copyLicenseKey = () => {
    navigator.clipboard.writeText(licenseData.licenseKey);
  };

  const getDaysRemaining = () => {
    const expDate = new Date(licenseData.expirationDate);
    const today = new Date();
    const diffTime = expDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const daysRemaining = getDaysRemaining();

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/licenses")}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t("license.detail.back")}
          </Button>
          <div>
            <h1 className="text-gray-900">{licenseData.customerName}</h1>
            <p className="text-gray-600 mt-1">
              {t("license.detail.id", { id: licenseData.id })}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Edit className="w-4 h-4 mr-2" />
            {t("license.detail.edit")}
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <RefreshCw className="w-4 h-4 mr-2" />
            {t("license.detail.renew")}
          </Button>
        </div>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-gray-200 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">{t("common.status")}</p>
                <div className="mt-2">
                  <StatusBadge status={licenseData.status} />
                </div>
              </div>
              <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">
                  {t("license.detail.days_remaining")}
                </p>
                <p className="text-gray-900 mt-1">
                  {daysRemaining} {t("license.detail.days")}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">
                  {t("license.detail.users")}
                </p>
                <p className="text-gray-900 mt-1">
                  {licenseData.currentUsers} / {licenseData.userLimit}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">
                  {t("license.detail.storage")}
                </p>
                <p className="text-gray-900 mt-1">
                  {licenseData.currentStorage} / {licenseData.storageLimit} GB
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center">
                <HardDrive className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* License Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle>{t("license.detail.info.title")}</CardTitle>
            <CardDescription>
              {t("license.detail.info.description")}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>{t("license.detail.info.license_key")}</Label>
              <div className="flex gap-2">
                <Input
                  value={licenseData.licenseKey}
                  readOnly
                  className="font-mono"
                />
                <Button variant="outline" size="sm" onClick={copyLicenseKey}>
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>{t("license.detail.info.start_date")}</Label>
                <Input value={licenseData.startDate} readOnly />
              </div>
              <div className="space-y-2">
                <Label>{t("license.detail.info.expiration_date")}</Label>
                <Input value={licenseData.expirationDate} readOnly />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>{t("license.detail.info.plan_type")}</Label>
                <Input value={licenseData.plan} readOnly />
              </div>
              <div className="space-y-2">
                <Label>{t("license.detail.info.customer_id")}</Label>
                <Input value={licenseData.customerId} readOnly />
              </div>
            </div>

            {daysRemaining <= 30 && licenseData.status === "active" && (
              <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                <p className="text-orange-900 text-sm">
                  {t("license.detail.expires_soon", { days: daysRemaining })}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle>{t("license.detail.usage.title")}</CardTitle>
            <CardDescription>
              {t("license.detail.usage.description")}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <Label>{t("license.detail.usage.user_accounts")}</Label>
                <span className="text-sm text-gray-600">
                  {licenseData.currentUsers} / {licenseData.userLimit}
                </span>
              </div>
              <Progress
                value={(licenseData.currentUsers / licenseData.userLimit) * 100}
              />
              <p className="text-xs text-gray-500 mt-1">
                {licenseData.userLimit - licenseData.currentUsers} users
                available
              </p>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <Label>{t("license.detail.usage.storage_usage")}</Label>
                <span className="text-sm text-gray-600">
                  {licenseData.currentStorage} / {licenseData.storageLimit} GB
                </span>
              </div>
              <Progress
                value={
                  (licenseData.currentStorage / licenseData.storageLimit) * 100
                }
              />
              <p className="text-xs text-gray-500 mt-1">
                {licenseData.storageLimit - licenseData.currentStorage} GB
                available
              </p>
            </div>

            <div className="pt-4 border-t">
              <p className="text-sm text-gray-600 mb-3">
                {t("license.detail.usage.active_modules")}
              </p>
              <div className="flex flex-wrap gap-2">
                {licenseData.modules
                  .filter((m) => m.enabled)
                  .map((module) => (
                    <span
                      key={module.name}
                      className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full"
                    >
                      {module.name}
                    </span>
                  ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Module Activation */}
      <Card className="border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle>{t("license.detail.modules.title")}</CardTitle>
          <CardDescription>
            {t("license.detail.modules.description")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {licenseData.modules.map((module) => (
              <div
                key={module.name}
                className={`p-4 border rounded-lg ${
                  module.enabled
                    ? "border-green-200 bg-green-50"
                    : "border-gray-200"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <Checkbox
                      id={module.name}
                      checked={module.enabled}
                      className="mt-1"
                    />
                    <div>
                      <Label htmlFor={module.name} className="cursor-pointer">
                        {module.name}
                      </Label>
                      <p className="text-sm text-gray-600 mt-1">
                        {module.description}
                      </p>
                    </div>
                  </div>
                  {module.enabled && (
                    <StatusBadge
                      status="active"
                      label={t("license.detail.enabled")}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* License History */}
      <Card className="border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle>{t("license.detail.history.title")}</CardTitle>
          <CardDescription>
            {t("license.detail.history.description")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {licenseHistory.map((entry) => (
              <div
                key={entry.id}
                className="flex items-start gap-4 p-3 border border-gray-200 rounded-lg"
              >
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-gray-900">{entry.action}</p>
                  <p className="text-gray-600 text-sm mt-1">{entry.date}</p>
                </div>
                <p className="text-gray-500 text-sm">{entry.user}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
