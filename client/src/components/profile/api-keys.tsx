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
import { Separator } from "../ui/separator";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Trash } from "lucide-react";
import { toast } from "sonner";

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

  return (
    <Card className="container mx-auto max-w-5xl px-4 mt-8">
      <CardHeader>
        <div className="flex justify-between">
          <div>
            <CardTitle>API KEYS</CardTitle>
            <CardDescription>Manage your API KEYS here</CardDescription>
          </div>
          <ApiKeyModal refreshKeyCallback={getKeys} />
        </div>
        <Separator className="my-4" />
      </CardHeader>
      <CardContent className="block">
        <ApiKeyTable keys={keys} setKeys={setKeys} />
      </CardContent>
    </Card>
  );
}

type ApiKeyTableProps = {
  keys: ApiKey[];
  setKeys: (k: ApiKey[]) => void;
};

export function ApiKeyTable({ keys, setKeys }: ApiKeyTableProps) {
  async function deleteKey(keyId: string) {
    const { error } = await authClient.apiKey.delete({
      keyId,
    });
    if (error) {
      // TODO: Show toast
      toast.error(
        <>
          <div className="font-bold">Error occured deleting an API KEY</div>
          <p>{error.message}</p>
        </>,
        { position: "bottom-left" },
      );
      return;
    }
    setKeys(keys.filter((key) => key.id !== keyId));
  }
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Key Name</TableHead>
          <TableHead className="w-[100px]">Expires in</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {keys.map((key: ApiKey) => (
          <TableRow key={key.id}>
            <TableCell className="font-medium">{key.name}</TableCell>
            <TableCell>{key.expiresAt?.toString()}</TableCell>
            <TableCell className="text-right">
              <Button
                asChild
                onClick={async () => await deleteKey(key.id)}
                className="p-0 text-destructive cursor-pointer"
                size="icon-xs"
                variant="ghost"
              >
                <Trash />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={2}>Total</TableCell>
          <TableCell className="text-right">{keys.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
