/** @format */

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Plus,
  Search,
  Filter,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
} from "lucide-react";
import { PageHeader } from "../../components/PageHeader";
import { useTranslation } from "react-i18next";
import { StatusBadge } from "../../components/StatusBadge";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Card, CardContent } from "../../components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { CustomerService } from "../../services/customersService";
import { ICustomer } from "../../types/requests";

// Local state will hold server-provided customers

export function CustomerList() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [customers, setCustomers] = useState<ICustomer[]>([]);

  const filteredCustomers = customers?.filter((customer) => {
    const matchesSearch =
      customer.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (customer.customerId ?? "")
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      customer.contactName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ||
      customer.isActive === (statusFilter === "active");

    return matchesSearch && matchesStatus;
  });
  const fetchCustomers = async () => {
    const data = await CustomerService.Get();
    setCustomers(data);
  };
  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title={t("customers.title")}
        description={t("customers.description")}
        action={{
          label: t("customers.add_customer"),
          onClick: () => navigate("/customers/new"),
          icon: <Plus className="w-4 h-4 mr-2" />,
        }}
      />

      {/* Filters */}
      <Card className="border-gray-200 shadow-sm">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder={t("customers.search_placeholder")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue
                  placeholder={t("customers.filter_status_placeholder")}
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("customers.all_status")}</SelectItem>
                <SelectItem value="active">{t("customers.active")}</SelectItem>
                <SelectItem value="inactive">
                  {t("customers.inactive")}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Customer Table */}
      <Card className="border-gray-200 shadow-sm">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("customers.table.name")}</TableHead>
                  <TableHead>{t("customers.table.id")}</TableHead>
                  <TableHead>{t("customers.table.contact")}</TableHead>
                  <TableHead>{t("customers.table.users")}</TableHead>
                  <TableHead>{t("common.status")}</TableHead>
                  <TableHead>{t("customers.table.created")}</TableHead>
                  <TableHead className="text-right">
                    {t("common.actions")}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.map((i) => (
                  <TableRow key={i.customerId}>
                    <TableCell>
                      <div>
                        <p className="text-gray-900">{i.companyName}</p>
                        <p className="text-gray-500 text-sm">{i.domain}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-600">
                      <Link
                        to={`/customers/${i.id}`}
                        className="text-blue-600 hover:underline"
                      >
                        {i.customerId}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-gray-900 text-sm">
                          {i.contactEmail}
                        </p>
                        <p className="text-gray-500 text-sm">{i.phone}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-600">
                      {i.contactName}
                    </TableCell>
                    <TableCell>
                      <StatusBadge
                        status={i.isActive ? "active" : "inactive"}
                      />
                    </TableCell>
                    <TableCell className="text-gray-600">
                      {i.createdDate}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => navigate(`/customers/${i.id}/edit`)}
                          title={t("common.edit")}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>

                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600"
                          onClick={async () => {
                            if (confirm(t("common.confirm_delete")) && i.id) {
                              await CustomerService.Delete(i.id);
                              setCustomers((prev) =>
                                prev.filter((customer) => customer.id !== i.id)
                              );
                            }
                          }}
                          title={t("common.delete")}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Summary */}
      <div className="flex items-center justify-between text-sm text-gray-600">
        <p>
          {t("customers.table.showing", {
            count: filteredCustomers.length,
            total: customers.length,
          })}
        </p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled>
            {t("customers.table.previous")}
          </Button>
          <Button variant="outline" size="sm">
            {t("customers.table.next")}
          </Button>
        </div>
      </div>
    </div>
  );
}
