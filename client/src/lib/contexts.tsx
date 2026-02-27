import { createContext } from "react";

export type UserInfo = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  emailVerified: boolean;
  name: string;
  image?: string | null | undefined;
};

export type AuthContextType =
  | {
      // user is authenticated and loaded
      loading: false;
      isAuthenticated: true;
      user: UserInfo;
      token: string;
      error: null;
      login: (email: string, password: string) => Promise<void>;
      logout: () => Promise<void>;
    }
  | {
      // user is not authenticated and nothing is loading
      loading: false;
      isAuthenticated: false;
      user: null;
      token: null;
      error: null;
      login: (email: string, password: string) => Promise<void>;
      logout: () => Promise<void>;
    }
  | {
      // user is not authenticated, but is loading
      loading: true;
      isAuthenticated: false;
      user: null;
      token: null;
      error: null;
      login: (email: string, password: string) => Promise<void>;
      logout: () => Promise<void>;
    }
  | {
      // user is not authenticated, not loading and there has been an auth error
      loading: false;
      isAuthenticated: false;
      user: null;
      token: null;
      error: Error;
      login: (email: string, password: string) => Promise<void>;
      logout: () => Promise<void>;
    };

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);
