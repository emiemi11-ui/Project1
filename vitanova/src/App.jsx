import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './hooks/useAuth';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import PersonnelPage from './pages/PersonnelPage';
import PersonnelDetail from './pages/PersonnelDetail';
import AppointmentsPage from './pages/AppointmentsPage';
import ProgramsPage from './pages/ProgramsPage';
import UsersPage from './pages/UsersPage';
import ReadinessPage from './pages/ReadinessPage';
import MyDataPage from './pages/MyDataPage';

function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="text-[#00d4ff] text-sm font-mono tracking-wider animate-pulse">
          INITIALIZING...
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}

function PublicRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="text-[#00d4ff] text-sm font-mono tracking-wider animate-pulse">
          INITIALIZING...
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

function DashboardIndex() {
  const { user } = useAuth();
  return (
    <div className="flex items-center justify-center h-full min-h-[60vh]">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-200 mb-2">
          Welcome, {user?.name}
        </h2>
        <p className="text-sm text-gray-500 font-mono">
          Select a section from the sidebar to begin.
        </p>
      </div>
    </div>
  );
}

function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardIndex />} />
        <Route path="personnel" element={<PersonnelPage />} />
        <Route path="personnel/:id" element={<PersonnelDetail />} />
        <Route path="appointments" element={<AppointmentsPage />} />
        <Route path="programs" element={<ProgramsPage />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="readiness" element={<ReadinessPage />} />
        <Route path="my-data" element={<MyDataPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
