import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Switch } from '../../components/ui/switch';
import { Textarea } from '../../components/ui/textarea';

export function CreateCustomer() {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    navigate('/customers');
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
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
          <h1 className="text-gray-900">Create New Customer</h1>
          <p className="text-gray-600 mt-1">Add a new customer account to the system</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Business Information */}
            <Card className="border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle>Business Information</CardTitle>
                <CardDescription>Enter the customer's business details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 space-y-2">
                    <Label htmlFor="companyName">Company Name *</Label>
                    <Input id="companyName" placeholder="Acme Corporation" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="domain">Domain *</Label>
                    <Input id="domain" placeholder="acme.com" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="customerId">Customer ID</Label>
                    <Input id="customerId" placeholder="Auto-generated" disabled />
                  </div>

                  <div className="col-span-2 space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Textarea id="address" placeholder="123 Business Street, San Francisco, CA" rows={3} />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>Primary contact details for this customer</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contactName">Contact Name *</Label>
                    <Input id="contactName" placeholder="John Doe" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contactEmail">Email *</Label>
                    <Input id="contactEmail" type="email" placeholder="john@acme.com" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" placeholder="+1 (555) 123-4567" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="alternateEmail">Alternate Email</Label>
                    <Input id="alternateEmail" type="email" placeholder="support@acme.com" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Service Configuration */}
            <Card className="border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle>Service Configuration</CardTitle>
                <CardDescription>Configure service settings and limits</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="servicePackage">Service Package *</Label>
                    <Select required>
                      <SelectTrigger id="servicePackage">
                        <SelectValue placeholder="Select package" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="trial">Trial</SelectItem>
                        <SelectItem value="professional">Professional</SelectItem>
                        <SelectItem value="enterprise">Enterprise</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="userLimit">User Limit</Label>
                    <Input id="userLimit" type="number" placeholder="100" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="storageLimit">Storage Limit (GB)</Label>
                    <Input id="storageLimit" type="number" placeholder="500" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="databaseLimit">Database Limit</Label>
                    <Input id="databaseLimit" type="number" placeholder="5" />
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
                <CardTitle>Company Logo</CardTitle>
                <CardDescription>Upload customer's logo</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors cursor-pointer">
                    <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-600 text-sm mb-2">Click to upload or drag and drop</p>
                    <p className="text-gray-500 text-xs">PNG, JPG up to 2MB</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Status */}
            <Card className="border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle>Account Status</CardTitle>
                <CardDescription>Set the initial account status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-900">Active Status</p>
                    <p className="text-gray-600 text-sm">Enable customer account</p>
                  </div>
                  <Switch checked={isActive} onCheckedChange={setIsActive} />
                </div>
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">
                    Current status: <span className={`${isActive ? 'text-green-600' : 'text-gray-600'}`}>
                      {isActive ? 'Active' : 'Inactive'}
                    </span>
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card className="border-gray-200 shadow-sm">
              <CardContent className="p-4 space-y-3">
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                  Create Customer
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigate('/customers')}
                >
                  Cancel
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
}
