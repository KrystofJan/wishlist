import { authClient } from "./auth-client";

interface ApiResponse<T = unknown> {
  data?: T;
  error?: string;
  status: number;
}
const API_URL = import.meta.env.VITE_BACKEND_URL;

class ApiClient {
  private baseUrl: string;
  private token: string | null;

  constructor(baseUrl: string = API_URL) {
    this.baseUrl = baseUrl;
    this.token = null;
  }

  private isTokenValid() {
    if (!this.token) {
      return false;
    }

    // removing the dependency so this wont work
    // const jwt = jwtDecode(this.token);
    // if (!jwt.exp) {
    //   return false;
    // }
    return true;
  }

  private async getToken() {
    if (this.isTokenValid()) {
      return this.token;
    }

    const token = (await authClient.token()).data?.token || null;
    this.token = token;
    return this.token;
  }

  async request<T = unknown>(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<ApiResponse<T>> {
    try {
      const token = await this.getToken();

      if (!token) {
        return {
          error: "No authentication token available. Please sign in.",
          status: 401,
        };
      }

      // Send request
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          ...options.headers,
        },
      });

      const body = await response.json();

      if (!response.ok) {
        return {
          error:
            body.message ||
            `API Error: ${response.status} ${response.statusText}`,
          status: response.status,
        };
      }

      return {
        data: body,
        status: response.status,
      };
    } catch (error) {
      return {
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
        status: 0,
      };
    }
  }
}

export const client = new ApiClient();
