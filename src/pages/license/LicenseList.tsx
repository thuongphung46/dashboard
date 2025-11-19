import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Filter, MoreVertical, Eye, Edit, RefreshCw, Copy } from 'lucide-react';
import { PageHeader } from '../../components/PageHeader';
import { StatusBadge } from '../../components/StatusBadge';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Card, CardContent } from '../../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../../components/ui/dropdown-menu';

const licenses = [
  {
    id: 'LIC-001',
    customerId: 'CUST-001',
    customerName: 'Acme Corporation',
    licenseKey: 'PYXS-ACME-2024-X9K2-M5P7',
    startDate: '2024-01-15',
    expirationDate: '2025-01-14',
    status: 'active' as const,
    modules: ['Core', 'Analytics', 'API', 'Reports'],
    userLimit: 100,
    storageLimit: '500 GB',
  },
  {
    id: 'LIC-002',
    customerId: 'CUST-002',
    customerName: 'TechStart Inc',
    licenseKey: 'PYXS-TECH-2024-B4N8-Q1W3',
    startDate: '2024-02-20',
    expirationDate: '2024-08-19',
    status: 'trial' as const,
    modules: ['Core', 'Analytics'],
    userLimit: 50,
    storageLimit: '100 GB',
  },
  {
    id: 'LIC-003',
    customerId: 'CUST-003',
    customerName: 'DataFlow Ltd',
    licenseKey: 'PYXS-DATA-2023-C7H5-R8T2',
    startDate: '2023-11-10',
    expirationDate: '2024-05-10',
    status: 'expired' as const,
    modules: ['Core'],
    userLimit: 25,
    storageLimit: '50 GB',
  },
  {
    id: 'LIC-004',
    customerId: 'CUST-004',
    customerName: 'CloudSync Inc',
    licenseKey: 'PYXS-CLOD-2024-F3J9-L6K4',
    startDate: '2024-03-05',
    expirationDate: '2025-03-04',
    status: 'active' as const,
    modules: ['Core', 'Analytics', 'API', 'Reports', 'Advanced'],
    userLimit: 150,
    storageLimit: '1 TB',
  },
  {
    id: 'LIC-005',
    customerId: 'CUST-005',
    customerName: 'Innovate Co',
    licenseKey: 'PYXS-INNO-2024-V2D6-S9A1',
    startDate: '2024-04-12',
    expirationDate: '2025-04-11',
    status: 'active' as const,
    modules: ['Core', 'Analytics', 'API'],
    userLimit: 75,
    storageLimit: '250 GB',
  },
];

export function LicenseList() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredLicenses = licenses.filter((license) => {
    const matchesSearch = license.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         license.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         license.licenseKey.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || license.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const copyLicenseKey = (key: string) => {
    navigator.clipboard.writeText(key);
  };

  const getDaysUntilExpiration = (expirationDate: string) => {
    const expDate = new Date(expirationDate);
    const today = new Date();
    const diffTime = expDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="License Management"
        description="Manage customer licenses and subscriptions"
        action={{
          label: 'Create License',
          onClick: () => navigate('/licenses/new'),
          icon: <Plus className="w-4 h-4 mr-2" />,
        }}
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-gray-200 shadow-sm">
          <CardContent className="p-6">
            <p className="text-gray-600 text-sm">Total Licenses</p>
            <p className="text-gray-900 mt-1">{licenses.length}</p>
          </CardContent>
        </Card>
        <Card className="border-gray-200 shadow-sm">
          <CardContent className="p-6">
            <p className="text-gray-600 text-sm">Active</p>
            <p className="text-gray-900 mt-1">{licenses.filter(l => l.status === 'active').length}</p>
          </CardContent>
        </Card>
        <Card className="border-gray-200 shadow-sm">
          <CardContent className="p-6">
            <p className="text-gray-600 text-sm">Trial</p>
            <p className="text-gray-900 mt-1">{licenses.filter(l => l.status === 'trial').length}</p>
          </CardContent>
        </Card>
        <Card className="border-gray-200 shadow-sm">
          <CardContent className="p-6">
            <p className="text-gray-600 text-sm">Expired</p>
            <p className="text-gray-900 mt-1">{licenses.filter(l => l.status === 'expired').length}</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="border-gray-200 shadow-sm">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search by customer, license key, or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="trial">Trial</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* License Table */}
      <Card className="border-gray-200 shadow-sm">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>License Key</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>Expiration</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Modules</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLicenses.map((license) => {
                  const daysLeft = getDaysUntilExpiration(license.expirationDate);
                  return (
                    <TableRow key={license.id}>
                      <TableCell>
                        <div>
                          <p className="text-gray-900">{license.customerName}</p>
                          <p className="text-gray-500 text-sm">{license.customerId}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <code className="text-gray-700 text-sm bg-gray-100 px-2 py-1 rounded">
                            {license.licenseKey}
                          </code>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyLicenseKey(license.licenseKey)}
                          >
                            <Copy className="w-3 h-3" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-600">{license.startDate}</TableCell>
                      <TableCell>
                        <div>
                          <p className="text-gray-900">{license.expirationDate}</p>
                          {license.status === 'active' && daysLeft <= 30 && (
                            <p className="text-orange-600 text-xs mt-1">
                              {daysLeft} days remaining
                            </p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={license.status} />
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {license.modules.slice(0, 2).map((module) => (
                            <span key={module} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                              {module}
                            </span>
                          ))}
                          {license.modules.length > 2 && (
                            <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                              +{license.modules.length - 2}
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => navigate(`/licenses/${license.id}`)}>
                              <Eye className="w-4 h-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="w-4 h-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <RefreshCw className="w-4 h-4 mr-2" />
                              Renew
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
