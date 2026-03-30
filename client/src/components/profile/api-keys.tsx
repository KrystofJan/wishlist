import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { authClient } from "@/lib/auth-client";
import { useAuth } from "@/lib/hooks/useAuth";
import { useEffect, useState } from "react";
import { ApiKeyModal } from "./api-key-modal";

type ApiKey = {
  metadata: Record<string, any> | null;
  permissions: {
    [key: string]: string[];
  } | null;
  id: string;
  configId: string;
  name: string | null;
  start: string | null;
  prefix: string | null;
  referenceId: string;
  refillInterval: number | null;
  refillAmount: number | null;
  lastRefillAt: Date | null;
  enabled: boolean;
  rateLimitEnabled: boolean;
  rateLimitTimeWindow: number | null;
  rateLimitMax: number | null;
  requestCount: number;
  remaining: number | null;
  lastRequest: Date | null;
  expiresAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

export function ApiKeyCard() {
  const [keys, setKeys] = useState<ApiKey[]>([]);
  const { isAuthenticated } = useAuth();

  async function getKeys() {
    const { data, error } = await authClient.apiKey.list();
    if (!error) {
      setKeys(data.apiKeys);
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      getKeys();
    }
  }, [isAuthenticated]);

  async function deleteKey(keyId: string) {
    const { error } = await authClient.apiKey.delete({
      keyId,
    });
    if (error) {
      // TODO: Show toast
    }
    setKeys(keys.filter((key) => key.id !== keyId));
  }

  return (
    <Card className="w-6/12">
      <CardHeader>
        <CardTitle>API KEYS</CardTitle>
        <CardDescription>Manage your API KEYS here</CardDescription>
      </CardHeader>
      <CardContent className="block">
        <ApiKeyModal refreshKeyCallback={getKeys} />
        <div className="grid grid-cols-2 p-8 gap-2">
          {keys.map((key: ApiKey) => {
            async function deleteThisKey() {
              await deleteKey(key.id);
            }
            return (
              <>
                <span>{key.name}</span>
                <Button onClick={deleteThisKey}>Delete</Button>
              </>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
