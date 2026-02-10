import { jwtClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

const AUTH_CLIENT = import.meta.env.VITE_BACKEND_URL;

export const authClient = createAuthClient({
  baseURL: AUTH_CLIENT,
  plugins: [jwtClient()],
});
