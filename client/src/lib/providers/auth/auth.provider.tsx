import { useCallback, useEffect, useState, type ReactNode } from "react";
import { authClient } from "@/lib/auth-client";
import {
  AuthContext,
  type AuthContextType,
  type UserInfo,
} from "@/lib/contexts";
import { getClientAuth } from "@/lib/auth-client-checks";
import { client } from "@/lib/api-client";

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<UserInfo | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function checkAuth() {
      try {
        const { user, token, isAuthenticated, error } = await getClientAuth();
        setLoading(false);
        setUser(user);
        setToken(token);
        setIsAuthenticated(isAuthenticated);
        setError(error);
      } catch (err) {
        setLoading(false);
        setIsAuthenticated(false);
        setError(err as Error);
      }
    }
    checkAuth();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    await authClient.signIn.email(
      {
        email,
        password,
        callbackURL: "/",
      },
      {
        onSuccess: async (_ctx) => {
          const { user, token } = await getClientAuth();
          setLoading(false);
          setUser(user);
          setToken(token);
          setError(null);
          setIsAuthenticated(true);
        },
        onRequest: (_ctx) => {
          setLoading(true);
          setUser(null);
          setToken(null);
          setError(null);
          setIsAuthenticated(false);
        },
        onError: (ctx) => {
          setLoading(false);
          setError(ctx.error);
          setIsAuthenticated(false);
        },
      },
    );
  }, []);

  const logout = useCallback(async () => {
    await authClient.signOut();
    setLoading(true);
    setUser(null);
    setToken(null);
    setError(null);
    setIsAuthenticated(false);
    client.expireToken();
  }, []);

  return (
    <AuthContext.Provider
      value={
        {
          loading,
          user,
          token,
          error,
          isAuthenticated,
          logout,
          login,
        } as AuthContextType
      }
    >
      {children}
    </AuthContext.Provider>
  );
}
