import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Search, Filter, MoreVertical, Eye, Edit, Trash2 } from 'lucide-react';
import { PageHeader } from '../../components/PageHeader';
import { StatusBadge } from '../../components/StatusBadge';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Card, CardContent } from '../../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../../components/ui/dropdown-menu';

const customers = [
  {
    id: 'CUST-001',
    name: 'Acme Corporation',
    contact: 'john.doe@acme.com',
    phone: '+1 (555) 123-4567',
    status: 'active' as const,
    createdDate: '2024-01-15',
    userCount: 45,
    domain: 'acme.com',
  },
  {
    id: 'CUST-002',
    name: 'TechStart Inc',
    contact: 'sarah@techstart.io',
    phone: '+1 (555) 234-5678',
    status: 'active' as const,
    createdDate: '2024-02-20',
    userCount: 28,
    domain: 'techstart.io',
  },
  {
    id: 'CUST-003',
    name: 'DataFlow Ltd',
    contact: 'contact@dataflow.co',
    phone: '+1 (555) 345-6789',
    status: 'inactive' as const,
    createdDate: '2023-11-10',
    userCount: 12,
    domain: 'dataflow.co',
  },
  {
    id: 'CUST-004',
    name: 'CloudSync Inc',
    contact: 'admin@cloudsync.net',
    phone: '+1 (555) 456-7890',
    status: 'active' as const,
    createdDate: '2024-03-05',
    userCount: 67,
    domain: 'cloudsync.net',
  },
  {
    id: 'CUST-005',
    name: 'Innovate Co',
    contact: 'team@innovate.com',
    phone: '+1 (555) 567-8901',
    status: 'active' as const,
    createdDate: '2024-04-12',
    userCount: 34,
    domain: 'innovate.com',
  },
  {
    id: 'CUST-006',
    name: 'SecureNet Systems',
    contact: 'info@securenet.com',
    phone: '+1 (555) 678-9012',
    status: 'inactive' as const,
    createdDate: '2023-09-28',
    userCount: 8,
    domain: 'securenet.com',
  },
];

export function CustomerList() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch = customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         customer.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         customer.contact.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || customer.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="Customer Management"
        description="Manage your customer accounts and information"
        action={{
          label: 'Add Customer',
          onClick: () => navigate('/customers/new'),
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
                placeholder="Search by name, ID, or email..."
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
                <SelectItem value="inactive">Inactive</SelectItem>
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
                  <TableHead>Customer Name</TableHead>
                  <TableHead>Customer ID</TableHead>
                  <TableHead>Contact Info</TableHead>
                  <TableHead>Users</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell>
                      <div>
                        <p className="text-gray-900">{customer.name}</p>
                        <p className="text-gray-500 text-sm">{customer.domain}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-600">{customer.id}</TableCell>
                    <TableCell>
                      <div>
                        <p className="text-gray-900 text-sm">{customer.contact}</p>
                        <p className="text-gray-500 text-sm">{customer.phone}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-600">{customer.userCount}</TableCell>
                    <TableCell>
                      <StatusBadge status={customer.status} />
                    </TableCell>
                    <TableCell className="text-gray-600">{customer.createdDate}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => navigate(`/customers/${customer.id}`)}>
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
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
        <p>Showing {filteredCustomers.length} of {customers.length} customers</p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled>Previous</Button>
          <Button variant="outline" size="sm">Next</Button>
        </div>
      </div>
    </div>
  );
}
