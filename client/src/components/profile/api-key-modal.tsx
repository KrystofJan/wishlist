import * as z from "zod/v3";
import {
  Dialog,
  DialogClose,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useRef, useState, type JSX } from "react";
import { DialogContent, DialogHeader } from "../ui/dialog";
import { Button } from "../ui/button";
import { useAuth } from "@/lib/hooks/useAuth";
import { authClient } from "@/lib/auth-client";
import { AUTH_CONSTANTS } from "@/constants/auth-constants";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { ExpirationDurationDropdown } from "./expiration-duration-dropdown";
import { Field, FieldLabel } from "../ui/field";
import { TimeDuration } from "@/constants/time-duration";
import { CheckIcon, Copy, CopyIcon } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "../ui/input-group";
import { toast } from "sonner";

type ApiKeyModalProps = { refreshKeyCallback: () => Promise<void> };

const expirationUnit = [
  "seconds",
  "minutes",
  "hours",
  "days",
  "weeks",
] as const;

export function ApiKeyModal({ refreshKeyCallback }: ApiKeyModalProps) {
  const { isAuthenticated } = useAuth();
  const [key, setKey] = useState<string>();
  const [copied, setCopied] = useState(false);

  const schema = z.object({
    name: z.string().min(4).max(25),
    expire: z.coerce.number(),
    expireUnit: z.enum(expirationUnit),
  });

  type Schema = z.infer<typeof schema>;
  const form = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      expire: 4,
      expireUnit: "weeks",
    },
  });

  async function createKey(name: string, expiresIn: number) {
    if (isAuthenticated) {
      const { data, error } = await authClient.apiKey.create({
        name,
        expiresIn,
        prefix: AUTH_CONSTANTS.API_KEY_CONSTANTS.Prefix,
      });

      if (error) {
        // TODO: TOAST
        toast.error(
          <>
            <div className="font-bold">Error occured creating API KEY</div>
            <p>{error.message}</p>
          </>,
          { position: "bottom-left" },
        );
        return;
      }

      setKey(data.key);
    }
  }

  async function onSubmit(data: Schema) {
    const expireIn =
      data.expire *
      (() => {
        // NOTE: Deviding by 1k because my unit uses miliseconds and api seconds
        switch (data.expireUnit) {
          case "seconds":
            return TimeDuration.Second / 1_000;
          case "minutes":
            return TimeDuration.Minute / 1_000;
          case "hours":
            return TimeDuration.Hour / 1_000;
          case "days":
            return TimeDuration.Day / 1_000;
          case "weeks":
            return TimeDuration.Week / 1_000;
          default:
            return TimeDuration.Hour / 1_000;
        }
      })();
    await createKey(data.name, expireIn);
    await refreshKeyCallback();
  }

  const handleCopy = () => {
    if (key) {
      navigator.clipboard.writeText(key);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="flex"
          onClick={() => {
            form.reset();
            setKey(undefined);
          }}
        >
          GENERATE API KEY
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Create Api Key</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Key name</FormLabel>
                  <FormControl>
                    <Input placeholder="test-api-key" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-4">
              <FormField
                control={form.control}
                name="expire"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expire in</FormLabel>
                    <FormControl>
                      <Input placeholder="4" type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="expireUnit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expire unit</FormLabel>
                    <FormControl>
                      <ExpirationDurationDropdown
                        options={expirationUnit}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button className="flex ml-auto" type="submit" disabled={!!key}>
              Create API key
            </Button>
          </form>
        </Form>

        <Field>
          <FieldLabel htmlFor="key">Your API KEY:</FieldLabel>
          <div className="flex">
            <InputGroup className="w-full max-w-sm bg-background">
              <InputGroupInput placeholder={key} readOnly />
              <InputGroupAddon align="inline-end">
                <InputGroupButton
                  aria-label="Copy"
                  onClick={handleCopy}
                  size="icon-xs"
                >
                  {copied ? <CheckIcon /> : <CopyIcon />}
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
          </div>
        </Field>
      </DialogContent>
    </Dialog>
  );
}
