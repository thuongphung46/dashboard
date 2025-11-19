import { useState } from 'react';
import { Save, Mail, Bell, Shield, Database, Globe, Clock } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Switch } from '../components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Textarea } from '../components/ui/textarea';

export function SystemSettings() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [autoBackup, setAutoBackup] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  const handleSave = () => {
    // Handle save settings
    console.log('Settings saved');
  };

  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="System Settings"
        description="Configure system-wide settings and preferences"
      />

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList>
          <TabsTrigger value="general">
            <Globe className="w-4 h-4 mr-2" />
            General
          </TabsTrigger>
          <TabsTrigger value="email">
            <Mail className="w-4 h-4 mr-2" />
            Email
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="w-4 h-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security">
            <Shield className="w-4 h-4 mr-2" />
            Security
          </TabsTrigger>
          <TabsTrigger value="backup">
            <Database className="w-4 h-4 mr-2" />
            Backup
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-6">
          <Card className="border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Basic system configuration</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="systemName">System Name</Label>
                  <Input id="systemName" defaultValue="Pyxis Admin" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="systemUrl">System URL</Label>
                  <Input id="systemUrl" defaultValue="https://admin.pyxis.com" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select defaultValue="utc">
                    <SelectTrigger id="timezone">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="utc">UTC (GMT+0)</SelectItem>
                      <SelectItem value="est">Eastern Time (GMT-5)</SelectItem>
                      <SelectItem value="pst">Pacific Time (GMT-8)</SelectItem>
                      <SelectItem value="cet">Central European Time (GMT+1)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="language">Default Language</Label>
                  <Select defaultValue="en">
                    <SelectTrigger id="language">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="supportEmail">Support Email</Label>
                <Input id="supportEmail" type="email" defaultValue="support@pyxis.com" />
              </div>

              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <p className="text-gray-900">Maintenance Mode</p>
                  <p className="text-gray-600 text-sm">Temporarily disable system access</p>
                </div>
                <Switch checked={maintenanceMode} onCheckedChange={setMaintenanceMode} />
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle>Session Settings</CardTitle>
              <CardDescription>Configure user session parameters</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                  <Input id="sessionTimeout" type="number" defaultValue="30" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxSessions">Max Concurrent Sessions</Label>
                  <Input id="maxSessions" type="number" defaultValue="3" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Email Settings */}
        <TabsContent value="email" className="space-y-6">
          <Card className="border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle>SMTP Configuration</CardTitle>
              <CardDescription>Configure email server settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="smtpHost">SMTP Host</Label>
                  <Input id="smtpHost" placeholder="smtp.example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtpPort">SMTP Port</Label>
                  <Input id="smtpPort" type="number" placeholder="587" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="smtpUser">SMTP Username</Label>
                  <Input id="smtpUser" placeholder="user@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtpPassword">SMTP Password</Label>
                  <Input id="smtpPassword" type="password" placeholder="••••••••" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="fromEmail">From Email Address</Label>
                <Input id="fromEmail" type="email" defaultValue="noreply@pyxis.com" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fromName">From Name</Label>
                <Input id="fromName" defaultValue="Pyxis Admin" />
              </div>

              <Button variant="outline">
                <Mail className="w-4 h-4 mr-2" />
                Send Test Email
              </Button>
            </CardContent>
          </Card>

          <Card className="border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle>Email Templates</CardTitle>
              <CardDescription>Customize email notification templates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="welcomeTemplate">Welcome Email Template</Label>
                <Textarea 
                  id="welcomeTemplate" 
                  rows={4}
                  defaultValue="Welcome to Pyxis Admin! Your account has been created successfully."
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications" className="space-y-6">
          <Card className="border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Configure system notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <p className="text-gray-900">Email Notifications</p>
                  <p className="text-gray-600 text-sm">Receive notifications via email</p>
                </div>
                <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
              </div>

              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <p className="text-gray-900">Push Notifications</p>
                  <p className="text-gray-600 text-sm">Receive browser push notifications</p>
                </div>
                <Switch checked={pushNotifications} onCheckedChange={setPushNotifications} />
              </div>

              <div className="space-y-3 pt-4 border-t">
                <p className="text-gray-900">Notification Events</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <input type="checkbox" id="notifyCustomer" defaultChecked className="rounded" />
                    <Label htmlFor="notifyCustomer">New customer registration</Label>
                  </div>
                  <div className="flex items-center gap-3">
                    <input type="checkbox" id="notifyLicense" defaultChecked className="rounded" />
                    <Label htmlFor="notifyLicense">License expiration warnings</Label>
                  </div>
                  <div className="flex items-center gap-3">
                    <input type="checkbox" id="notifyBackup" defaultChecked className="rounded" />
                    <Label htmlFor="notifyBackup">Backup completion</Label>
                  </div>
                  <div className="flex items-center gap-3">
                    <input type="checkbox" id="notifyFailure" defaultChecked className="rounded" />
                    <Label htmlFor="notifyFailure">System failures</Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security" className="space-y-6">
          <Card className="border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle>Security Configuration</CardTitle>
              <CardDescription>Manage security and access control</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <p className="text-gray-900">Two-Factor Authentication</p>
                  <p className="text-gray-600 text-sm">Require 2FA for admin users</p>
                </div>
                <Switch checked={twoFactorAuth} onCheckedChange={setTwoFactorAuth} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="passwordMinLength">Minimum Password Length</Label>
                  <Input id="passwordMinLength" type="number" defaultValue="8" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="passwordExpiry">Password Expiry (days)</Label>
                  <Input id="passwordExpiry" type="number" defaultValue="90" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="ipWhitelist">IP Whitelist</Label>
                <Textarea 
                  id="ipWhitelist" 
                  rows={3}
                  placeholder="Enter IP addresses (one per line)"
                />
                <p className="text-xs text-gray-500">Leave empty to allow all IPs</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="loginAttempts">Max Login Attempts</Label>
                <Input id="loginAttempts" type="number" defaultValue="5" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Backup Settings */}
        <TabsContent value="backup" className="space-y-6">
          <Card className="border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle>Backup Configuration</CardTitle>
              <CardDescription>Configure automated backup settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <p className="text-gray-900">Automatic Backups</p>
                  <p className="text-gray-600 text-sm">Enable scheduled database backups</p>
                </div>
                <Switch checked={autoBackup} onCheckedChange={setAutoBackup} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="backupFrequency">Backup Frequency</Label>
                  <Select defaultValue="daily">
                    <SelectTrigger id="backupFrequency">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hourly">Hourly</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="backupTime">Backup Time</Label>
                  <Input id="backupTime" type="time" defaultValue="02:00" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="backupRetention">Retention Period (days)</Label>
                <Input id="backupRetention" type="number" defaultValue="30" />
                <p className="text-xs text-gray-500">Backups older than this will be deleted</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="backupLocation">Backup Storage Location</Label>
                <Input id="backupLocation" defaultValue="s3://pyxis-backups/" />
              </div>

              <Button variant="outline">
                <Database className="w-4 h-4 mr-2" />
                Run Backup Now
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Save Button */}
      <Card className="border-gray-200 shadow-sm">
        <CardContent className="p-4 flex items-center justify-between">
          <p className="text-gray-600 text-sm">
            Changes will be applied immediately after saving
          </p>
          <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
            <Save className="w-4 h-4 mr-2" />
            Save Settings
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
