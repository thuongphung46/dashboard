import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, XCircle, Clock, Play } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Checkbox } from '../../components/ui/checkbox';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { StatusBadge } from '../../components/StatusBadge';
import { Progress } from '../../components/ui/progress';

const customers = [
  { id: 'CUST-001', name: 'Acme Corporation', currentVersion: 'v4.2.1', selected: false },
  { id: 'CUST-002', name: 'TechStart Inc', currentVersion: 'v4.1.5', selected: false },
  { id: 'CUST-003', name: 'DataFlow Ltd', currentVersion: 'v4.0.8', selected: false },
  { id: 'CUST-004', name: 'CloudSync Inc', currentVersion: 'v4.2.1', selected: false },
  { id: 'CUST-005', name: 'Innovate Co', currentVersion: 'v4.2.0', selected: false },
  { id: 'CUST-006', name: 'SecureNet Systems', currentVersion: 'v3.9.2', selected: false },
];

const versions = [
  { value: 'v4.2.1', label: 'v4.2.1 (Latest)', type: 'Latest' },
  { value: 'v4.2.0', label: 'v4.2.0', type: 'Stable' },
  { value: 'v4.1.5', label: 'v4.1.5', type: 'Stable' },
];

type DeploymentStatus = 'pending' | 'updating' | 'completed' | 'failed';

interface DeploymentProgress {
  customerId: string;
  customerName: string;
  status: DeploymentStatus;
  progress: number;
}

export function UpdateVersion() {
  const navigate = useNavigate();
  const [selectedCustomers, setSelectedCustomers] = useState<string[]>([]);
  const [selectedVersion, setSelectedVersion] = useState('');
  const [isDeploying, setIsDeploying] = useState(false);
  const [deploymentProgress, setDeploymentProgress] = useState<DeploymentProgress[]>([]);

  const toggleCustomer = (customerId: string) => {
    setSelectedCustomers(prev =>
      prev.includes(customerId)
        ? prev.filter(id => id !== customerId)
        : [...prev, customerId]
    );
  };

  const selectAll = () => {
    if (selectedCustomers.length === customers.length) {
      setSelectedCustomers([]);
    } else {
      setSelectedCustomers(customers.map(c => c.id));
    }
  };

  const handleDeploy = () => {
    if (!selectedVersion || selectedCustomers.length === 0) return;
    
    setIsDeploying(true);
    const progress = selectedCustomers.map(id => ({
      customerId: id,
      customerName: customers.find(c => c.id === id)?.name || '',
      status: 'pending' as DeploymentStatus,
      progress: 0,
    }));
    setDeploymentProgress(progress);

    // Simulate deployment progress
    progress.forEach((item, index) => {
      setTimeout(() => {
        setDeploymentProgress(prev =>
          prev.map(p =>
            p.customerId === item.customerId
              ? { ...p, status: 'updating', progress: 50 }
              : p
          )
        );

        setTimeout(() => {
          setDeploymentProgress(prev =>
            prev.map(p =>
              p.customerId === item.customerId
                ? { ...p, status: 'completed', progress: 100 }
                : p
            )
          );
        }, 2000);
      }, index * 1000);
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/version')}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <div>
          <h1 className="text-gray-900">Update Version</h1>
          <p className="text-gray-600 mt-1">Deploy new version to selected customers</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Selection Panel */}
        <div className="lg:col-span-2 space-y-6">
          {/* Version Selection */}
          <Card className="border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle>Select Version</CardTitle>
              <CardDescription>Choose the version to deploy</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="version">Target Version</Label>
                <Select value={selectedVersion} onValueChange={setSelectedVersion}>
                  <SelectTrigger id="version">
                    <SelectValue placeholder="Select version to deploy" />
                  </SelectTrigger>
                  <SelectContent>
                    {versions.map((version) => (
                      <SelectItem key={version.value} value={version.value}>
                        {version.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Customer Selection */}
          <Card className="border-gray-200 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Select Customers</CardTitle>
                  <CardDescription>Choose which customers to update</CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={selectAll}>
                  {selectedCustomers.length === customers.length ? 'Deselect All' : 'Select All'}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {customers.map((customer) => (
                  <div
                    key={customer.id}
                    className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Checkbox
                        id={customer.id}
                        checked={selectedCustomers.includes(customer.id)}
                        onCheckedChange={() => toggleCustomer(customer.id)}
                      />
                      <div>
                        <Label htmlFor={customer.id} className="cursor-pointer">
                          {customer.name}
                        </Label>
                        <p className="text-gray-500 text-sm">{customer.id}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-600 text-sm">Current: {customer.currentVersion}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Deployment Progress */}
          {isDeploying && deploymentProgress.length > 0 && (
            <Card className="border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle>Deployment Progress</CardTitle>
                <CardDescription>Version update status for each customer</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {deploymentProgress.map((item) => (
                    <div key={item.customerId} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {item.status === 'pending' && <Clock className="w-4 h-4 text-gray-400" />}
                          {item.status === 'updating' && <Play className="w-4 h-4 text-blue-600" />}
                          {item.status === 'completed' && <CheckCircle className="w-4 h-4 text-green-600" />}
                          {item.status === 'failed' && <XCircle className="w-4 h-4 text-red-600" />}
                          <div>
                            <p className="text-gray-900">{item.customerName}</p>
                            <p className="text-gray-500 text-sm">{item.customerId}</p>
                          </div>
                        </div>
                        <StatusBadge status={item.status} />
                      </div>
                      <Progress value={item.progress} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Summary Panel */}
        <div className="space-y-6">
          <Card className="border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle>Deployment Summary</CardTitle>
              <CardDescription>Review before deploying</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-600 text-sm">Target Version</p>
                <p className="text-gray-900 mt-1">
                  {selectedVersion || 'Not selected'}
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-600 text-sm">Selected Customers</p>
                <p className="text-gray-900 mt-1">
                  {selectedCustomers.length} customer{selectedCustomers.length !== 1 ? 's' : ''}
                </p>
              </div>
              {selectedCustomers.length > 0 && (
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-blue-900 text-sm">
                    The deployment process will update the selected customers to version {selectedVersion}.
                    This may take several minutes depending on the number of customers.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="border-gray-200 shadow-sm">
            <CardContent className="p-4 space-y-3">
              <Button
                onClick={handleDeploy}
                disabled={!selectedVersion || selectedCustomers.length === 0 || isDeploying}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                <Play className="w-4 h-4 mr-2" />
                {isDeploying ? 'Deploying...' : 'Deploy Updates'}
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => navigate('/version')}
                disabled={isDeploying}
              >
                Cancel
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
