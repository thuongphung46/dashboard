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
import {
  DASHBOARD,
  CUSTOMERS,
  DATABASE,
  VERSION,
  LICENSES,
  ACTIVITY_LOGS,
  SETTINGS,
  LOGIN,
} from "./config/paths";
import PageMeta from "./components/PageMeta";

function RequireAuth({ children }: { children: JSX.Element }) {
  const { user } = useAuth();
  if (!user) return <Navigate to={LOGIN} replace />;
  return children;
}

export default function App() {
  return (
    <Router>
      <PageMeta />
      <AuthProvider>
        <Routes>
          <Route path={LOGIN} element={<Login />} />

          <Route
            path="/*"
            element={
              <RequireAuth>
                <DashboardLayout>
                  <Routes>
                    <Route
                      path="/"
                      element={<Navigate to={DASHBOARD} replace />}
                    />
                    <Route path={DASHBOARD} element={<Dashboard />} />

                    {/* Customer Management */}
                    <Route path={CUSTOMERS} element={<CustomerList />} />
                    <Route
                      path={`${CUSTOMERS}/:id`}
                      element={<CustomerDetail />}
                    />
                    <Route
                      path={`${CUSTOMERS}/new`}
                      element={<CreateCustomer />}
                    />

                    {/* Database Management */}
                    <Route path={DATABASE} element={<DatabaseOverview />} />
                    <Route
                      path={`${DATABASE}/:id`}
                      element={<DatabaseDetail />}
                    />

                    {/* Version Control */}
                    <Route path={VERSION} element={<VersionDashboard />} />
                    <Route
                      path={`${VERSION}/update`}
                      element={<UpdateVersion />}
                    />
                    <Route
                      path={`${VERSION}/releases`}
                      element={<ReleaseNotes />}
                    />

                    {/* License Management */}
                    <Route path={LICENSES} element={<LicenseList />} />
                    <Route
                      path={`${LICENSES}/:id`}
                      element={<LicenseDetail />}
                    />
                    <Route
                      path={`${LICENSES}/new`}
                      element={<CreateLicense />}
                    />

                    {/* Other */}
                    <Route path={ACTIVITY_LOGS} element={<ActivityLogs />} />
                    <Route path={SETTINGS} element={<SystemSettings />} />
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
