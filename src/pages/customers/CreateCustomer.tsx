/** @format */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CUSTOMERS } from "../../config/paths";
import { ArrowLeft, Upload } from "lucide-react";
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
import { Switch } from "../../components/ui/switch";
import { Textarea } from "../../components/ui/textarea";
import { CustomerService } from "../../services/customersService";
import { CreateCustomerRequest } from "../../types/requests";

export function CreateCustomer() {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(true);
  const { t } = useTranslation();

  // form state (minimal fields used for create)
  const [companyName, setCompanyName] = useState("");
  const [domain, setDomain] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [address, setAddress] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [alternateEmail, setAlternateEmail] = useState("");
  const [servicePackage, setServicePackage] = useState<
    "trial" | "professional" | "enterprise" | string
  >("trial");
  const [userLimit, setUserLimit] = useState<number | "">("");
  const [storageLimit, setStorageLimit] = useState<number | "">("");
  const [databaseLimit, setDatabaseLimit] = useState<number | "">("");

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const payload: CreateCustomerRequest = {
        companyName,
        domain,
        customerId: customerId || undefined,
        address,
        contactName,
        contactEmail,
        phone: phone || undefined,
        alternateEmail: alternateEmail || undefined,
        servicePackage,
        userLimit: userLimit === "" ? undefined : Number(userLimit),
        storageLimit: storageLimit === "" ? undefined : Number(storageLimit),
        databaseLimit: databaseLimit === "" ? undefined : Number(databaseLimit),
        isActive,
      };
      const result = await CustomerService.Create(payload);
      console.log("Customer created", result);

      // lazy import to avoid circular issues
      // const svc = await import("../../services/customersService");
      // await svc.createCustomer(payload);
      // navigate(CUSTOMERS);
    } catch (err) {
      console.error("Create customer failed", err);
      // TODO: show toast/error to user
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => navigate(CUSTOMERS)}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          {t("common.back")}
        </Button>
        <div>
          <h1 className="text-gray-900">{t("customers.create.title")}</h1>
          <p className="text-gray-600 mt-1">
            {t("customers.create.description")}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Business Information */}
            <Card className="border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle>
                  {t("customers.create.business_info.title")}
                </CardTitle>
                <CardDescription>
                  {t("customers.create.business_info.description")}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 space-y-2">
                    <Label htmlFor="companyName">
                      {t("customers.create.form.company_name")} *
                    </Label>
                    <Input
                      id="companyName"
                      name="companyName"
                      value={companyName}
                      onChange={(ev) => setCompanyName(ev.target.value)}
                      placeholder={t(
                        "customers.create.form.company_placeholder"
                      )}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="domain">
                      {t("customers.create.form.domain")} *
                    </Label>
                    <Input
                      id="domain"
                      name="domain"
                      value={domain}
                      onChange={(ev) => setDomain(ev.target.value)}
                      placeholder={t(
                        "customers.create.form.domain_placeholder"
                      )}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="customerId">
                      {t("customers.create.form.customer_id")}
                    </Label>
                    <Input
                      id="customerId"
                      name="customerId"
                      value={customerId}
                      // placeholder={t("customers.create.form.auto_generated")}
                      placeholder={"apzon"}
                      onChange={(ev) => setCustomerId(ev.target.value)}
                      // disabled
                    />
                  </div>

                  <div className="col-span-2 space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Textarea
                      id="address"
                      name="address"
                      value={address}
                      onChange={(ev) => setAddress(ev.target.value)}
                      placeholder="123 Business Street, San Francisco, CA"
                      rows={3}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle>{t("customers.create.contact.title")}</CardTitle>
                <CardDescription>
                  {t("customers.create.contact.description")}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contactName">
                      {t("customers.create.form.contact_name")} *
                    </Label>
                    <Input
                      id="contactName"
                      name="contactName"
                      value={contactName}
                      onChange={(ev) => setContactName(ev.target.value)}
                      placeholder={t(
                        "customers.create.form.contact_name_placeholder"
                      )}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contactEmail">
                      {t("customers.create.form.email")} *
                    </Label>
                    <Input
                      id="contactEmail"
                      name="contactEmail"
                      type="email"
                      value={contactEmail}
                      onChange={(ev) => setContactEmail(ev.target.value)}
                      placeholder={t("customers.create.form.email_placeholder")}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={phone}
                      onChange={(ev) => setPhone(ev.target.value)}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="alternateEmail">Alternate Email</Label>
                    <Input
                      id="alternateEmail"
                      name="alternateEmail"
                      type="email"
                      value={alternateEmail}
                      onChange={(ev) => setAlternateEmail(ev.target.value)}
                      placeholder="support@acme.com"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Service Configuration */}
            <Card className="border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle>{t("customers.create.service.title")}</CardTitle>
                <CardDescription>
                  {t("customers.create.service.description")}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="servicePackage">
                      {t("customers.create.form.service_package")} *
                    </Label>
                    <Select
                      value={servicePackage}
                      onValueChange={(v: string) => setServicePackage(v)}
                    >
                      <SelectTrigger id="servicePackage">
                        <SelectValue
                          placeholder={t(
                            "customers.create.form.select_package"
                          )}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="trial">
                          {t("customers.create.form.packages.trial")}
                        </SelectItem>
                        <SelectItem value="professional">
                          {t("customers.create.form.packages.professional")}
                        </SelectItem>
                        <SelectItem value="enterprise">
                          {t("customers.create.form.packages.enterprise")}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="userLimit">User Limit</Label>
                    <Input
                      id="userLimit"
                      name="userLimit"
                      type="number"
                      value={userLimit}
                      onChange={(ev) =>
                        setUserLimit(
                          ev.target.value === "" ? "" : Number(ev.target.value)
                        )
                      }
                      placeholder="100"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="storageLimit">Storage Limit (GB)</Label>
                    <Input
                      id="storageLimit"
                      name="storageLimit"
                      type="number"
                      value={storageLimit}
                      onChange={(ev) =>
                        setStorageLimit(
                          ev.target.value === "" ? "" : Number(ev.target.value)
                        )
                      }
                      placeholder="500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="databaseLimit">Database Limit</Label>
                    <Input
                      id="databaseLimit"
                      name="databaseLimit"
                      type="number"
                      value={databaseLimit}
                      onChange={(ev) =>
                        setDatabaseLimit(
                          ev.target.value === "" ? "" : Number(ev.target.value)
                        )
                      }
                      placeholder="5"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Logo Upload */}
            <Card className="border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle>{t("customers.create.logo.title")}</CardTitle>
                <CardDescription>
                  {t("customers.create.logo.description")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors cursor-pointer">
                    <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-600 text-sm mb-2">
                      {t("customers.create.logo.click_upload")}
                    </p>
                    <p className="text-gray-500 text-xs">
                      {t("customers.create.logo.hints")}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Status */}
            <Card className="border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle>{t("customers.create.status.title")}</CardTitle>
                <CardDescription>
                  {t("customers.create.status.description")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-900">
                      {t("customers.create.status.active_label")}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {t("customers.create.status.enable_desc")}
                    </p>
                  </div>
                  <Switch checked={isActive} onCheckedChange={setIsActive} />
                </div>
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">
                    {t("customers.create.status.current_status")}:{" "}
                    <span
                      className={`${isActive ? "text-green-600" : "text-gray-600"}`}
                    >
                      {isActive
                        ? t("customers.create.status.active")
                        : t("customers.create.status.inactive")}
                    </span>
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card className="border-gray-200 shadow-sm">
              <CardContent className="p-4 space-y-3">
                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  {t("customers.create.actions.create")}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => navigate(CUSTOMERS)}
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
