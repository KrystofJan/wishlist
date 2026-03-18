import "./App.css";
import { NavBar } from "./components/navigation";
import { Toaster } from "./components/ui/sonner";
import { AuthProvider } from "./lib/providers/auth/auth.provider";
import { Router } from "./router";

export default function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <NavBar />
          <Toaster />
        </Router>
      </AuthProvider>
    </>
  );
}
