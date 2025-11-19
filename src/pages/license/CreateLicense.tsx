import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, RefreshCw } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Checkbox } from '../../components/ui/checkbox';

const availableModules = [
  { id: 'core', name: 'Core Platform', description: 'Base system functionality', required: true },
  { id: 'analytics', name: 'Analytics Dashboard', description: 'Advanced analytics and reporting', required: false },
  { id: 'api', name: 'API Access', description: 'REST API integration', required: false },
  { id: 'reports', name: 'Custom Reports', description: 'Custom report builder', required: false },
  { id: 'security', name: 'Advanced Security', description: 'Enhanced security features', required: false },
  { id: 'sso', name: 'SSO Integration', description: 'Single sign-on support', required: false },
];

export function CreateLicense() {
  const navigate = useNavigate();
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('');
  const [licenseKey, setLicenseKey] = useState('');
  const [selectedModules, setSelectedModules] = useState<string[]>(['core']);

  const generateLicenseKey = () => {
    const segments = [
      'PYXS',
      Math.random().toString(36).substring(2, 6).toUpperCase(),
      new Date().getFullYear().toString(),
      Math.random().toString(36).substring(2, 6).toUpperCase(),
      Math.random().toString(36).substring(2, 6).toUpperCase(),
    ];
    setLicenseKey(segments.join('-'));
  };

  const toggleModule = (moduleId: string) => {
    if (moduleId === 'core') return; // Core is required
    setSelectedModules(prev =>
      prev.includes(moduleId)
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle license creation
    navigate('/licenses');
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/licenses')}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <div>
          <h1 className="text-gray-900">Create New License</h1>
          <p className="text-gray-600 mt-1">Generate a new license for a customer</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Customer Selection */}
            <Card className="border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle>Customer Information</CardTitle>
                <CardDescription>Select the customer for this license</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="customer">Customer *</Label>
                  <Select value={selectedCustomer} onValueChange={setSelectedCustomer} required>
                    <SelectTrigger id="customer">
                      <SelectValue placeholder="Select a customer" />
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
                <CardTitle>License Configuration</CardTitle>
                <CardDescription>Set license parameters and limits</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="licenseKey">License Key</Label>
                  <div className="flex gap-2">
                    <Input
                      id="licenseKey"
                      value={licenseKey}
                      onChange={(e) => setLicenseKey(e.target.value)}
                      placeholder="Click generate to create a license key"
                      className="font-mono"
                    />
                    <Button type="button" variant="outline" onClick={generateLicenseKey}>
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Generate
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="plan">Plan Type *</Label>
                    <Select value={selectedPlan} onValueChange={setSelectedPlan} required>
                      <SelectTrigger id="plan">
                        <SelectValue placeholder="Select plan" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="trial">Trial (30 days)</SelectItem>
                        <SelectItem value="professional">Professional</SelectItem>
                        <SelectItem value="enterprise">Enterprise</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration (months)</Label>
                    <Input id="duration" type="number" placeholder="12" defaultValue="12" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Start Date *</Label>
                    <Input id="startDate" type="date" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="expirationDate">Expiration Date *</Label>
                    <Input id="expirationDate" type="date" required />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Resource Limits */}
            <Card className="border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle>Resource Limits</CardTitle>
                <CardDescription>Set user and storage limitations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="userLimit">User Limit *</Label>
                    <Input id="userLimit" type="number" placeholder="100" required />
                    <p className="text-xs text-gray-500">Maximum number of users</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="storageLimit">Storage Limit (GB) *</Label>
                    <Input id="storageLimit" type="number" placeholder="500" required />
                    <p className="text-xs text-gray-500">Maximum storage in GB</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Module Selection */}
            <Card className="border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle>Module Selection</CardTitle>
                <CardDescription>Choose which modules to enable</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {availableModules.map((module) => (
                    <div
                      key={module.id}
                      className={`p-4 border rounded-lg ${
                        selectedModules.includes(module.id)
                          ? 'border-blue-200 bg-blue-50'
                          : 'border-gray-200'
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
                          <Label htmlFor={module.id} className="cursor-pointer flex items-center gap-2">
                            {module.name}
                            {module.required && (
                              <span className="text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded">
                                Required
                              </span>
                            )}
                          </Label>
                          <p className="text-sm text-gray-600 mt-1">{module.description}</p>
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
                <CardTitle>License Summary</CardTitle>
                <CardDescription>Review before creating</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-gray-600 text-sm">Customer</p>
                  <p className="text-gray-900 mt-1">
                    {selectedCustomer || 'Not selected'}
                  </p>
                </div>

                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-gray-600 text-sm">Plan Type</p>
                  <p className="text-gray-900 mt-1 capitalize">
                    {selectedPlan || 'Not selected'}
                  </p>
                </div>

                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-gray-600 text-sm">Selected Modules</p>
                  <p className="text-gray-900 mt-1">
                    {selectedModules.length} module{selectedModules.length !== 1 ? 's' : ''}
                  </p>
                </div>

                {licenseKey && (
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-blue-900 text-sm">License Key</p>
                    <code className="text-blue-900 text-xs mt-1 block">
                      {licenseKey}
                    </code>
                  </div>
                )}

                <div className="pt-4 border-t">
                  <p className="text-xs text-gray-500">
                    The license will be created immediately and the customer will receive a confirmation email.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-200 shadow-sm">
              <CardContent className="p-4 space-y-3">
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                  Create License
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => navigate('/licenses')}
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
