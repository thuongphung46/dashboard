import { useState } from 'react';
import { Search, Filter, Download, Calendar, User, Database, Key, Settings, GitBranch } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { StatusBadge } from '../components/StatusBadge';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent } from '../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';

const activityLogs = [
  {
    id: 1,
    timestamp: '2024-06-19 14:30:25',
    type: 'customer',
    action: 'Customer Created',
    user: 'admin@pyxis.com',
    resource: 'Acme Corporation',
    status: 'success' as const,
    ipAddress: '192.168.1.100',
    details: 'New customer account created',
  },
  {
    id: 2,
    timestamp: '2024-06-19 13:45:12',
    type: 'database',
    action: 'Database Backup',
    user: 'system',
    resource: 'acme_production',
    status: 'success' as const,
    ipAddress: '10.0.0.1',
    details: 'Automated backup completed',
  },
  {
    id: 3,
    timestamp: '2024-06-19 12:15:33',
    type: 'license',
    action: 'License Renewed',
    user: 'admin@pyxis.com',
    resource: 'LIC-001',
    status: 'success' as const,
    ipAddress: '192.168.1.100',
    details: 'License extended for 12 months',
  },
  {
    id: 4,
    timestamp: '2024-06-19 11:20:45',
    type: 'version',
    action: 'Version Update',
    user: 'admin@pyxis.com',
    resource: 'CloudSync Inc',
    status: 'completed' as const,
    ipAddress: '192.168.1.100',
    details: 'Updated to version v4.2.1',
  },
  {
    id: 5,
    timestamp: '2024-06-19 10:05:18',
    type: 'user',
    action: 'User Login',
    user: 'john.doe@acme.com',
    resource: 'Dashboard',
    status: 'success' as const,
    ipAddress: '203.45.67.89',
    details: 'Successful login',
  },
  {
    id: 6,
    timestamp: '2024-06-19 09:30:00',
    type: 'database',
    action: 'Database Connection Test',
    user: 'admin@pyxis.com',
    resource: 'techstart_main',
    status: 'success' as const,
    ipAddress: '192.168.1.100',
    details: 'Connection test successful',
  },
  {
    id: 7,
    timestamp: '2024-06-19 08:45:22',
    type: 'settings',
    action: 'Settings Updated',
    user: 'admin@pyxis.com',
    resource: 'System Configuration',
    status: 'success' as const,
    ipAddress: '192.168.1.100',
    details: 'Email settings modified',
  },
  {
    id: 8,
    timestamp: '2024-06-19 07:12:55',
    type: 'user',
    action: 'Failed Login Attempt',
    user: 'unknown@test.com',
    resource: 'Dashboard',
    status: 'failed' as const,
    ipAddress: '45.67.89.123',
    details: 'Invalid credentials',
  },
  {
    id: 9,
    timestamp: '2024-06-18 16:30:10',
    type: 'license',
    action: 'Module Activated',
    user: 'admin@pyxis.com',
    resource: 'LIC-004',
    status: 'success' as const,
    ipAddress: '192.168.1.100',
    details: 'Analytics module enabled',
  },
  {
    id: 10,
    timestamp: '2024-06-18 15:20:44',
    type: 'customer',
    action: 'Customer Updated',
    user: 'admin@pyxis.com',
    resource: 'TechStart Inc',
    status: 'success' as const,
    ipAddress: '192.168.1.100',
    details: 'Contact information updated',
  },
];

const getActivityIcon = (type: string) => {
  switch (type) {
    case 'customer': return User;
    case 'database': return Database;
    case 'license': return Key;
    case 'version': return GitBranch;
    case 'settings': return Settings;
    default: return User;
  }
};

export function ActivityLogs() {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredLogs = activityLogs.filter((log) => {
    const matchesSearch = log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         log.resource.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'all' || log.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || log.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="Activity Logs"
        description="Monitor system activities and user actions"
        action={{
          label: 'Export Logs',
          onClick: () => {},
          icon: <Download className="w-4 h-4 mr-2" />,
        }}
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-gray-200 shadow-sm">
          <CardContent className="p-6">
            <p className="text-gray-600 text-sm">Total Activities</p>
            <p className="text-gray-900 mt-1">{activityLogs.length}</p>
          </CardContent>
        </Card>
        <Card className="border-gray-200 shadow-sm">
          <CardContent className="p-6">
            <p className="text-gray-600 text-sm">Successful</p>
            <p className="text-gray-900 mt-1">
              {activityLogs.filter(l => l.status === 'success' || l.status === 'completed').length}
            </p>
          </CardContent>
        </Card>
        <Card className="border-gray-200 shadow-sm">
          <CardContent className="p-6">
            <p className="text-gray-600 text-sm">Failed</p>
            <p className="text-gray-900 mt-1">
              {activityLogs.filter(l => l.status === 'failed').length}
            </p>
          </CardContent>
        </Card>
        <Card className="border-gray-200 shadow-sm">
          <CardContent className="p-6">
            <p className="text-gray-600 text-sm">Today</p>
            <p className="text-gray-900 mt-1">
              {activityLogs.filter(l => l.timestamp.startsWith('2024-06-19')).length}
            </p>
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
                placeholder="Search by action, user, or resource..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="customer">Customer</SelectItem>
                <SelectItem value="database">Database</SelectItem>
                <SelectItem value="license">License</SelectItem>
                <SelectItem value="version">Version</SelectItem>
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="settings">Settings</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="success">Success</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Activity Table */}
      <Card className="border-gray-200 shadow-sm">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Resource</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>IP Address</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.map((log) => {
                  const Icon = getActivityIcon(log.type);
                  return (
                    <TableRow key={log.id}>
                      <TableCell className="text-gray-600 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          {log.timestamp}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                            <Icon className="w-4 h-4 text-blue-600" />
                          </div>
                          <span className="text-gray-900 capitalize">{log.type}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="text-gray-900">{log.action}</p>
                          <p className="text-gray-500 text-sm">{log.details}</p>
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-600">{log.user}</TableCell>
                      <TableCell className="text-gray-900">{log.resource}</TableCell>
                      <TableCell>
                        <StatusBadge status={log.status} />
                      </TableCell>
                      <TableCell className="text-gray-600 text-sm font-mono">
                        {log.ipAddress}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Pagination */}
      <div className="flex items-center justify-between text-sm text-gray-600">
        <p>Showing {filteredLogs.length} of {activityLogs.length} activities</p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled>Previous</Button>
          <Button variant="outline" size="sm">Next</Button>
        </div>
      </div>
    </div>
  );
}
