import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Dashboard from "./pages/dashboard";
import GitHubLogin from "./components/auth/GitHubLogin";
import AuthCallback from "./components/auth/AuthCallback";
import Homepage from "./pages/homepage";
function ProtectedRoute({ children }) {
  const { user, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>;
  return user ? children : <Navigate to="/login" />;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/homepage" element={<Homepage />} />
      <Route path="/login" element={<GitHubLogin />} />
      <Route path="/auth/github/callback" element={<AuthCallback />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

function App() {
  const isDev = import.meta.env.DEV;
  const pathname = window.location.pathname;
  const basename = pathname.startsWith('/js-homepage') ? '/js-homepage' : '';
  
  return (
    <AuthProvider>
      <Router basename={basename}>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
