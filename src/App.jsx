import React from "react";
import {
  HashRouter as Router,
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
  const isGitHubPages = window.location.hostname === 'aryanbatras.github.io';
  const shouldUseBasename = !isDev && isGitHubPages;
  
  return (
    <AuthProvider>
      <Router basename={shouldUseBasename ? "/js-homepage" : ""}>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
