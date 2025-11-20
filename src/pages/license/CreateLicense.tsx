/** @format */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, RefreshCw } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Checkbox } from "../../components/ui/checkbox";

const availableModules = [
  {
    id: "core",
    name: "Core Platform",
    description: "Base system functionality",
    required: true,
  },
  {
    id: "analytics",
    name: "Analytics Dashboard",
    description: "Advanced analytics and reporting",
    required: false,
  },
  {
    id: "api",
    name: "API Access",
    description: "REST API integration",
    required: false,
  },
  {
    id: "reports",
    name: "Custom Reports",
    description: "Custom report builder",
    required: false,
  },
  {
    id: "security",
    name: "Advanced Security",
    description: "Enhanced security features",
    required: false,
  },
  {
    id: "sso",
    name: "SSO Integration",
    description: "Single sign-on support",
    required: false,
  },
];

export function CreateLicense() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("");
  const [licenseKey, setLicenseKey] = useState("");
  const [selectedModules, setSelectedModules] = useState<string[]>(["core"]);

  const generateLicenseKey = () => {
    const segments = [
      "PYXS",
      Math.random().toString(36).substring(2, 6).toUpperCase(),
      new Date().getFullYear().toString(),
      Math.random().toString(36).substring(2, 6).toUpperCase(),
      Math.random().toString(36).substring(2, 6).toUpperCase(),
    ];
    setLicenseKey(segments.join("-"));
  };

  const toggleModule = (moduleId: string) => {
    if (moduleId === "core") return; // Core is required
    setSelectedModules((prev) =>
      prev.includes(moduleId)
        ? prev.filter((id) => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle license creation
    navigate("/licenses");
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => navigate("/licenses")}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          {t("common.back")}
        </Button>
        <div>
          <h1 className="text-gray-900">{t("license.create.title")}</h1>
          <p className="text-gray-600 mt-1">
            {t("license.create.description")}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Customer Selection */}
            <Card className="border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle>{t("license.create.customer.title")}</CardTitle>
                <CardDescription>
                  {t("license.create.customer.description")}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="customer">
                    {t("license.create.customer.label")} *
                  </Label>
                  <Select
                    value={selectedCustomer}
                    onValueChange={setSelectedCustomer}
                    required
                  >
                    <SelectTrigger id="customer">
                      <SelectValue
                        placeholder={t("license.create.customer.placeholder")}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CUST-001">Acme Corporation</SelectItem>
                      <SelectItem value="CUST-002">TechStart Inc</SelectItem>
                      <SelectItem value="CUST-004">CloudSync Inc</SelectItem>
                      <SelectItem value="CUST-005">Innovate Co</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* License Configuration */}
            <Card className="border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle>{t("license.create.configuration.title")}</CardTitle>
                <CardDescription>
                  {t("license.create.configuration.description")}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="licenseKey">{t("common.license_key")}</Label>
                  <div className="flex gap-2">
                    <Input
                      id="licenseKey"
                      value={licenseKey}
                      onChange={(e) => setLicenseKey(e.target.value)}
                      placeholder={t(
                        "license.create.configuration.license_placeholder"
                      )}
                      className="font-mono"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={generateLicenseKey}
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      {t("license.create.configuration.generate")}
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="plan">
                      {t("license.create.configuration.plan_type")} *
                    </Label>
                    <Select
                      value={selectedPlan}
                      onValueChange={setSelectedPlan}
                      required
                    >
                      <SelectTrigger id="plan">
                        <SelectValue
                          placeholder={t(
                            "license.create.configuration.select_plan"
                          )}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="trial">
                          {t("license.create.configuration.plans.trial")}
                        </SelectItem>
                        <SelectItem value="professional">
                          {t("license.create.configuration.plans.professional")}
                        </SelectItem>
                        <SelectItem value="enterprise">
                          {t("license.create.configuration.plans.enterprise")}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="duration">
                      {t("license.create.configuration.duration")}
                    </Label>
                    <Input
                      id="duration"
                      type="number"
                      placeholder={t(
                        "license.create.configuration.duration_placeholder"
                      )}
                      defaultValue="12"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">
                      {t("common.start_date")} *
                    </Label>
                    <Input id="startDate" type="date" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="expirationDate">
                      {t("common.expiration_date")} *
                    </Label>
                    <Input id="expirationDate" type="date" required />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Resource Limits */}
            <Card className="border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle>{t("license.create.limits.title")}</CardTitle>
                <CardDescription>
                  {t("license.create.limits.description")}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="userLimit">
                      {t("license.create.limits.user_limit")} *
                    </Label>
                    <Input
                      id="userLimit"
                      type="number"
                      placeholder={t(
                        "license.create.limits.user_limit_placeholder"
                      )}
                      required
                    />
                    <p className="text-xs text-gray-500">
                      {t("license.create.limits.user_limit_help")}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="storageLimit">
                      {t("license.create.limits.storage_limit")} *
                    </Label>
                    <Input
                      id="storageLimit"
                      type="number"
                      placeholder={t(
                        "license.create.limits.storage_limit_placeholder"
                      )}
                      required
                    />
                    <p className="text-xs text-gray-500">
                      {t("license.create.limits.storage_limit_help")}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Module Selection */}
            <Card className="border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle>{t("license.create.modules.title")}</CardTitle>
                <CardDescription>
                  {t("license.create.modules.description")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {availableModules.map((module) => (
                    <div
                      key={module.id}
                      className={`p-4 border rounded-lg ${
                        selectedModules.includes(module.id)
                          ? "border-blue-200 bg-blue-50"
                          : "border-gray-200"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <Checkbox
                          id={module.id}
                          checked={selectedModules.includes(module.id)}
                          onCheckedChange={() => toggleModule(module.id)}
                          disabled={module.required}
                          className="mt-1"
                        />
                        <div className="flex-1">
                          <Label
                            htmlFor={module.id}
                            className="cursor-pointer flex items-center gap-2"
                          >
                            {module.name}
                            {module.required && (
                              <span className="text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded">
                                {t("license.create.modules.required")}
                              </span>
                            )}
                          </Label>
                          <p className="text-sm text-gray-600 mt-1">
                            {module.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Summary Sidebar */}
          <div className="space-y-6">
            <Card className="border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle>{t("license.create.summary.title")}</CardTitle>
                <CardDescription>
                  {t("license.create.summary.description")}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-gray-600 text-sm">
                    {t("common.customer")}
                  </p>
                  <p className="text-gray-900 mt-1">
                    {selectedCustomer ||
                      t("license.create.summary.not_selected")}
                  </p>
                </div>

                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-gray-600 text-sm">
                    {t("license.create.summary.plan_type")}
                  </p>
                  <p className="text-gray-900 mt-1 capitalize">
                    {selectedPlan || t("license.create.summary.not_selected")}
                  </p>
                </div>

                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-gray-600 text-sm">
                    {t("license.create.summary.selected_modules")}
                  </p>
                  <p className="text-gray-900 mt-1">
                    {selectedModules.length}{" "}
                    {t("license.create.summary.module_label", {
                      count: selectedModules.length,
                    })}
                  </p>
                </div>

                {licenseKey && (
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-blue-900 text-sm">
                      {t("common.license_key")}
                    </p>
                    <code className="text-blue-900 text-xs mt-1 block">
                      {licenseKey}
                    </code>
                  </div>
                )}

                <div className="pt-4 border-t">
                  <p className="text-xs text-gray-500">
                    {t("license.create.summary.notice")}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-200 shadow-sm">
              <CardContent className="p-4 space-y-3">
                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  {t("license.create.actions.create")}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => navigate("/licenses")}
                >
                  {t("common.cancel")}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
}
