import { authClient } from "../lib/auth-client";
import { useState } from "react";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const _result = await authClient.signUp.email(
      {
        email,
        password,
        name,
        callbackURL: "/",
      },
      {
        onRequest: (ctx) => {
          //show loading
          setLoading(true);
        },
        onError: (ctx) => {
          // display the error message
          setLoading(false);
          setError(ctx.error.message);
        },
      },
    );
  };

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

      <input
        placeholder="name"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />

      <input
        placeholder="first name"
        value={firstName}
        onChange={(event) => setFirstName(event.target.value)}
      />

      <input
        placeholder="last name"
        value={lastName}
        onChange={(event) => setLastName(event.target.value)}
      />

      {error}
      {loading}

      <button type="submit">Sign up</button>
    </form>
  );
}
