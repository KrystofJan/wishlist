import type { Item, ItemSchema } from "@/lib/types/item";
import { itemSchema } from "@/lib/types/item";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ImageIcon, LinkIcon, PackageIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/hooks/useAuth";
import { client, HTTPMethod } from "@/lib/api-client";
import type { Category } from "@/lib/types/category";
import { ComboboxMultiple } from "@/components/ui/multi-combobox";
import { toast } from "sonner";

// TODO: Fix prop passthrough error
export function CreateItemForm() {
  const form = useForm<ItemSchema>({
    resolver: zodResolver(itemSchema),
    defaultValues: {
      name: "",
      description: "",
      link: "",
      photoLink: "",
      categories: [],
    },
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const [items, setItems] = useState<Item[]>([]);

  async function onSubmit(data: ItemSchema) {
    const res = await client.request<Item>("/items", {
      method: HTTPMethod.POST,
      body: JSON.stringify(data),
    });
    if (res.status !== 201 && !res.data) {
      throw new Error("Could not create item");
    }
    toast.success(`Created Item ${res.data?.id}`, { position: "bottom-left" });
  }

  const { isAuthenticated } = useAuth();

  useEffect(() => {
    async function getCategories() {
      const res = await client.request<Category[]>("/categories");
      if (res.status !== 200 && !res.data) {
        throw new Error("Could not find the categories");
      }
      if (res.data) {
        setCategories(res.data);
      }
    }
    if (isAuthenticated) {
      getCategories();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    async function getItems() {
      const res = await client.request<Item[]>("/items");
      if (res.status !== 200 && !res.data) {
        throw new Error("Could not find the categories");
      }
      if (res.data) {
        setItems(res.data);
      }
    }
    if (isAuthenticated) {
      getItems();
    }
  }, [isAuthenticated]);

  return (
    <Card className="mx-auto w-full max-w-2xl">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="flex size-12 items-center justify-center rounded-lg bg-primary/10">
            <PackageIcon className="size-6 text-primary" />
          </div>
          <div>
            <CardTitle className="text-2xl">Add New Item</CardTitle>
            <CardDescription>
              Create a new wishlist item with all the details
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Item Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., MacBook Pro 16-inch" {...field} />
                  </FormControl>
                  <FormDescription>
                    Give your item a clear and descriptive name
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe the item, why you want it, or any specific details..."
                      className="min-h-[120px] resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Provide a detailed description (5-255 characters)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Link</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <LinkIcon className="text-muted-foreground absolute left-3 top-1/2 size-4 -translate-y-1/2" />
                      <Input
                        type="url"
                        placeholder="https://example.com/product"
                        className="pl-10"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormDescription>
                    Add a link where this item can be found or purchased
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="photoLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Photo URL</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <ImageIcon className="text-muted-foreground absolute left-3 top-1/2 size-4 -translate-y-1/2" />
                      <Input
                        type="url"
                        placeholder="https://example.com/image.jpg"
                        className="pl-10"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormDescription>
                    Provide a valid HTTP/HTTPS URL for the item{"'"}s image
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="categories"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categories</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <ComboboxMultiple
                        items={categories.map((category) => ({
                          label: category.name,
                          value: category.id,
                        }))}
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormDescription>Select necessary categories</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-3 pt-4">
              <Button
                type="submit"
                className="flex-1"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? "Creating..." : "Create Item"}
              </Button>
              <Button
                type="submit"
                variant="outline"
                onClick={() => form.reset()}
                disabled={form.formState.isSubmitting}
              >
                Reset
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
