import { authClient } from "../lib/auth-client";
import { useState, type FC } from "react";

type LoginProps = {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Login({
  isAuthenticated,
  setIsAuthenticated,
}: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(false);
    setError("");

    const _result = await authClient.signIn.email(
      {
        email,
        password,
        callbackURL: "/",
      },
      {
        onSuccess: (_ctx) => {
          setIsAuthenticated(true);
        },
        onRequest: (ctx) => {
          setLoading(true);
        },
        onError: (ctx) => {
          setError(ctx.error.message);
        },
      },
    );
  };

  if (isAuthenticated) {
    return (
      <div>
        The user is already authenticated
        <button
          onClick={async () => {
            await authClient.signOut();
          }}
        >
          Log out
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />

      <input
        placeholder="password"
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />

      {error}
      {loading}

      <button type="submit">Sign up</button>
    </form>
  );
}
