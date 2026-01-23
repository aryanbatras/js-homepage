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
import Section1 from "./pages/homepage/section1";
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
      <Route path="*" element={<Navigate to="/" />} />
      <Route path="/test" element={<div>Testing 1..2..3</div>} />
      <Route path="/test2" element={<Section1 />} />
    </Routes>
  );
}

function App() {
    return (
    <AuthProvider>
      <Router 
      // basename="/js-homepage/"
      basename={import.meta.env.BASE_URL}
      >
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
