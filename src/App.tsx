/** @format */

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { DashboardLayout } from "./components/DashboardLayout";
import { Dashboard } from "./pages/Dashboard";
import { CustomerList } from "./pages/customers/CustomerList";
import { CustomerDetail } from "./pages/customers/CustomerDetail";
import { CreateCustomer } from "./pages/customers/CreateCustomer";
import { DatabaseOverview } from "./pages/database/DatabaseOverview";
import { DatabaseDetail } from "./pages/database/DatabaseDetail";
import { VersionDashboard } from "./pages/version/VersionDashboard";
import { UpdateVersion } from "./pages/version/UpdateVersion";
import { ReleaseNotes } from "./pages/version/ReleaseNotes";
import { LicenseList } from "./pages/license/LicenseList";
import { LicenseDetail } from "./pages/license/LicenseDetail";
import { CreateLicense } from "./pages/license/CreateLicense";
import { ActivityLogs } from "./pages/ActivityLogs";
import { SystemSettings } from "./pages/SystemSettings";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { Login } from "./pages/Login";
import { JSX } from "react";

function RequireAuth({ children }: { children: JSX.Element }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route
            path="/*"
            element={
              <RequireAuth>
                <DashboardLayout>
                  <Routes>
                    <Route
                      path="/"
                      element={<Navigate to="/dashboard" replace />}
                    />
                    <Route path="/dashboard" element={<Dashboard />} />

                    {/* Customer Management */}
                    <Route path="/customers" element={<CustomerList />} />
                    <Route path="/customers/:id" element={<CustomerDetail />} />
                    <Route path="/customers/new" element={<CreateCustomer />} />

                    {/* Database Management */}
                    <Route path="/database" element={<DatabaseOverview />} />
                    <Route path="/database/:id" element={<DatabaseDetail />} />

                    {/* Version Control */}
                    <Route path="/version" element={<VersionDashboard />} />
                    <Route path="/version/update" element={<UpdateVersion />} />
                    <Route
                      path="/version/releases"
                      element={<ReleaseNotes />}
                    />

                    {/* License Management */}
                    <Route path="/licenses" element={<LicenseList />} />
                    <Route path="/licenses/:id" element={<LicenseDetail />} />
                    <Route path="/licenses/new" element={<CreateLicense />} />

                    {/* Other */}
                    <Route path="/activity-logs" element={<ActivityLogs />} />
                    <Route path="/settings" element={<SystemSettings />} />
                  </Routes>
                </DashboardLayout>
              </RequireAuth>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}
