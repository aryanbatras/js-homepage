import './monaco-config';
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// Handle GitHub Pages SPA routing
const redirect = sessionStorage.getItem('redirect');
if (redirect && redirect !== '/') {
    sessionStorage.removeItem('redirect');
    window.history.replaceState(null, null, redirect);
}

createRoot(document.getElementById("root")).render(<App />);
