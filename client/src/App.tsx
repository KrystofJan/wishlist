import "./App.css";
import { NavBar } from "./components/navigation";
import { AuthProvider } from "./lib/providers/auth/auth.provider";
import { Router } from "./router";

export default function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <NavBar />
        </Router>
      </AuthProvider>
    </>
  );
}
