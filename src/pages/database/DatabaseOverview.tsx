/** @format */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Search,
  Database as DatabaseIcon,
  RefreshCw,
  Download,
  Play,
  MoreVertical,
  Eye,
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { Label } from "../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { Progress } from "../../components/ui/progress";

const databases = [
  {
    id: "DB-001",
    name: "acme_production",
    customerId: "CUST-001",
    customerName: "Acme Corporation",
    size: "124.5 GB",
    status: "active" as const,
    lastBackup: "2024-06-19 02:00:00",
    version: "PostgreSQL 15.2",
    connections: 45,
  },
  {
    id: "DB-002",
    name: "techstart_main",
    customerId: "CUST-002",
    customerName: "TechStart Inc",
    size: "78.2 GB",
    status: "active" as const,
    lastBackup: "2024-06-19 02:15:00",
    version: "PostgreSQL 15.2",
    connections: 28,
  },
  {
    id: "DB-003",
    name: "dataflow_archive",
    customerId: "CUST-003",
    customerName: "DataFlow Ltd",
    size: "256.8 GB",
    status: "inactive" as const,
    lastBackup: "2024-06-18 02:00:00",
    version: "PostgreSQL 14.8",
    connections: 0,
  },
  {
    id: "DB-004",
    name: "cloudsync_prod",
    customerId: "CUST-004",
    customerName: "CloudSync Inc",
    size: "189.4 GB",
    status: "active" as const,
    lastBackup: "2024-06-19 02:30:00",
    version: "PostgreSQL 15.2",
    connections: 67,
  },
  {
    id: "DB-005",
    name: "innovate_db",
    customerId: "CUST-005",
    customerName: "Innovate Co",
    size: "45.7 GB",
    status: "active" as const,
    lastBackup: "2024-06-19 02:45:00",
    version: "PostgreSQL 15.2",
    connections: 34,
  },
];

export function DatabaseOverview() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState("");

  const filteredDatabases = databases.filter(
    (db) =>
      db.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      db.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      db.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateDatabase = () => {
    // Handle database creation
    setCreateDialogOpen(false);
  };

  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title={t("database.title")}
        description={t("database.description")}
        action={{
          label: t("database.create_database"),
          onClick: () => setCreateDialogOpen(true),
          icon: <Plus className="w-4 h-4 mr-2" />,
        }}
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-gray-200 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">
                  {t("database.stats.total_databases")}
                </p>
                <p className="text-gray-900 mt-1">{databases.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                <DatabaseIcon className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">
                  {t("database.stats.active_databases")}
                </p>
                <p className="text-gray-900 mt-1">
                  {databases.filter((db) => db.status === "active").length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                <DatabaseIcon className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">
                  {t("database.stats.total_size")}
                </p>
                <p className="text-gray-900 mt-1">694.6 GB</p>
              </div>
              <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
                <DatabaseIcon className="w-6 h-6 text-purple-600" />
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
                <p className="text-gray-900 mt-1">174</p>
              </div>
              <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center">
                <DatabaseIcon className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card className="border-gray-200 shadow-sm">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder={t("database.search_placeholder")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Database Table */}
      <Card className="border-gray-200 shadow-sm">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("database.table.db_name")}</TableHead>
                  <TableHead>{t("common.customer")}</TableHead>
                  <TableHead>{t("database.table.size")}</TableHead>
                  <TableHead>{t("common.status")}</TableHead>
                  <TableHead>{t("database.table.last_backup")}</TableHead>
                  <TableHead>{t("common.connections")}</TableHead>
                  <TableHead className="text-right">
                    {t("common.actions")}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDatabases.map((db) => (
                  <TableRow key={db.id}>
                    <TableCell>
                      <div>
                        <p className="text-gray-900">{db.name}</p>
                        <p className="text-gray-500 text-sm">{db.id}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-gray-900">{db.customerName}</p>
                        <p className="text-gray-500 text-sm">{db.customerId}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-600">{db.size}</TableCell>
                    <TableCell>
                      <StatusBadge status={db.status} />
                    </TableCell>
                    <TableCell className="text-gray-600 text-sm">
                      {db.lastBackup}
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <p className="text-gray-900 text-sm">
                          {db.connections}
                        </p>
                        <Progress
                          value={(db.connections / 100) * 100}
                          className="h-1"
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          title={t("common.test_connection")}
                        >
                          <Play className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          title={t("common.backup") || "Backup"}
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => navigate(`/database/${db.id}`)}
                            >
                              <Eye className="w-4 h-4 mr-2" />
                              {t("common.view_details")}
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <RefreshCw className="w-4 h-4 mr-2" />
                              {t("database.table.restore_backup")}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Create Database Dialog */}
      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("database.table.create_new_database")}</DialogTitle>
            <DialogDescription>
              {t("database.table.select_customer")}{" "}
              {t("database.table.choose_customer")}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="customer">
                {t("database.table.select_customer")} *
              </Label>
              <Select
                value={selectedCustomer}
                onValueChange={setSelectedCustomer}
              >
                <SelectTrigger id="customer">
                  <SelectValue
                    placeholder={t("database.table.choose_customer")}
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
            <div className="space-y-2">
              <Label htmlFor="dbName">{t("database.table.db_name")}</Label>
              <Input
                id="dbName"
                placeholder={t("database.table.auto_generated")}
                disabled
              />
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-900">
                {t("database.table.create_new_database")} -{" "}
                {t("database.table.auto_generated")}
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setCreateDialogOpen(false)}
            >
              {t("common.cancel")}
            </Button>
            <Button
              onClick={handleCreateDatabase}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {t("database.table.create")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
