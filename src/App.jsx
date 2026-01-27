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
import Pricing from "./pages/pricing";
import About from "./pages/about";
import Contact from "./pages/contact";
import Section1 from "./pages/homepage/section1";
// import TestFirebase from "./components/discussion/TestFirebase";
function ProtectedRoute({ children }) {
  const { user, isLoading } = useAuth();

  console.log('🔍 ProtectedRoute rendering - user:', !!user, 'isLoading:', isLoading);
  
  if (isLoading) {
    console.log('🔍 ProtectedRoute - showing loading');
    return <div>Loading...</div>;
  }
  
  if (!user) {
    console.log('🔍 ProtectedRoute - no user, redirecting to login');
    return <Navigate to="/login" />;
  }
  
  console.log('🔍 ProtectedRoute - user authenticated, rendering children');
  return children;
}

function AppRoutes() {
  console.log('🔍 AppRoutes rendering, current path:', window.location.pathname);
  
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/homepage" element={<Homepage />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
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
      {/* <Route path="/test-firebase" element={<TestFirebase />} /> */}
      {/* <Route path="/test" element={<div>Testing 1..2..3</div>} />
      <Route path="/test2" element={<Section1 />} /> */}
      <Route path="*" element={<Navigate to="/" />} />
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
