import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, Globe, Calendar, Users, Edit, Trash2, Activity } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { StatusBadge } from '../../components/StatusBadge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';

const customerData = {
  id: 'CUST-001',
  name: 'Acme Corporation',
  domain: 'acme.com',
  logo: 'https://api.dicebear.com/7.x/initials/svg?seed=AC',
  contact: 'john.doe@acme.com',
  phone: '+1 (555) 123-4567',
  status: 'active' as const,
  createdDate: '2024-01-15',
  address: '123 Business Street, San Francisco, CA 94102',
  servicePackage: 'Enterprise',
  userLimit: 100,
  storageLimit: '500 GB',
};

const users = [
  { id: 1, name: 'John Doe', email: 'john.doe@acme.com', role: 'Admin', lastActive: '2 hours ago' },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@acme.com', role: 'User', lastActive: '5 hours ago' },
  { id: 3, name: 'Bob Johnson', email: 'bob.johnson@acme.com', role: 'User', lastActive: '1 day ago' },
  { id: 4, name: 'Alice Williams', email: 'alice.w@acme.com', role: 'Manager', lastActive: '3 hours ago' },
];

const activityLogs = [
  { id: 1, action: 'User login', user: 'john.doe@acme.com', timestamp: '2024-06-19 14:30:25', status: 'success' },
  { id: 2, action: 'Database backup', user: 'system', timestamp: '2024-06-19 12:00:00', status: 'success' },
  { id: 3, action: 'License renewal', user: 'admin@pyxis.com', timestamp: '2024-06-18 09:15:42', status: 'success' },
  { id: 4, action: 'User added', user: 'john.doe@acme.com', timestamp: '2024-06-17 16:45:10', status: 'success' },
  { id: 5, action: 'Failed login attempt', user: 'unknown@acme.com', timestamp: '2024-06-17 11:22:33', status: 'failed' },
];

export function CustomerDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/customers')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-gray-900">{customerData.name}</h1>
            <p className="text-gray-600 mt-1">Customer ID: {customerData.id}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </Button>
          <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>

      {/* Business Info Card */}
      <Card className="border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle>Business Information</CardTitle>
          <CardDescription>Customer details and account information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src={customerData.logo} />
                <AvatarFallback>AC</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-gray-900 mb-4">{customerData.name}</p>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Mail className="w-4 h-4" />
                    <span className="text-sm">{customerData.contact}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone className="w-4 h-4" />
                    <span className="text-sm">{customerData.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Globe className="w-4 h-4" />
                    <span className="text-sm">{customerData.domain}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">Created: {customerData.createdDate}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Status</span>
                <StatusBadge status={customerData.status} />
              </div>
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Service Package</span>
                <span className="text-gray-900">{customerData.servicePackage}</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <span className="text-gray-600">User Limit</span>
                <span className="text-gray-900">{users.length} / {customerData.userLimit}</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Storage Limit</span>
                <span className="text-gray-900">{customerData.storageLimit}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs for Users and Activity */}
      <Tabs defaultValue="users" className="space-y-4">
        <TabsList>
          <TabsTrigger value="users">
            <Users className="w-4 h-4 mr-2" />
            Users ({users.length})
          </TabsTrigger>
          <TabsTrigger value="activity">
            <Activity className="w-4 h-4 mr-2" />
            Activity Logs
          </TabsTrigger>
        </TabsList>

        <TabsContent value="users">
          <Card className="border-gray-200 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>User Management</CardTitle>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  Add User
                </Button>
              </div>
              <CardDescription>Manage users for this customer account</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Last Active</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`} />
                            <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <span className="text-gray-900">{user.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-600">{user.email}</TableCell>
                      <TableCell>
                        <StatusBadge 
                          status={user.role === 'Admin' ? 'active' : 'inactive'} 
                          label={user.role}
                        />
                      </TableCell>
                      <TableCell className="text-gray-600">{user.lastActive}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity">
          <Card className="border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle>Activity Logs</CardTitle>
              <CardDescription>Recent activity for this customer account</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Action</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activityLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="text-gray-900">{log.action}</TableCell>
                      <TableCell className="text-gray-600">{log.user}</TableCell>
                      <TableCell className="text-gray-600">{log.timestamp}</TableCell>
                      <TableCell>
                        <StatusBadge 
                          status={log.status === 'success' ? 'success' : 'failed'} 
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
