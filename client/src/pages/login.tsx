import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/lib/hooks/useAuth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, logout, isAuthenticated, error, loading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };

  if (isAuthenticated) {
    return (
      <div>
        The user is already authenticated
        <Button
          onClick={async () => {
            await logout();
          }}
        >
          Log out
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-row gap-4 max-w-max">
        <Input
          placeholder="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="mb-4"
        />

        <Input
          placeholder="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="mb-4"
        />
      </div>

      {error && error.message}
      {loading}

      <Button type="submit">Sign up</Button>
    </form>
  );
}
