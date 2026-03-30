import { useForm } from "react-hook-form";
import { Separator } from "../ui/separator";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import * as z from "zod/v3";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { type Category } from "@/lib/types/category";
import { useAuth } from "@/lib/hooks/useAuth";
import { client } from "@/lib/api-client";
import type { User } from "@/lib/types/user";
import { ComboboxMultiple } from "../ui/multi-combobox";
import { useSearchParams } from "react-router";

/*
 * We want to be able to filter through the following attributes
 * - Users (which user is the creator of the whishlist)
 * - Categories (search through the whishlist items and see if the items have selected category)
 */
export function WishlistFilters() {
  const { isAuthenticated } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [categories, setCategories] = useState<Category[]>([]);
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

  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    async function getUsers() {
      const res = await client.request<User[]>("/users");
      if (res.status !== 200 && !res.data) {
        throw new Error("Could not find the categories");
      }
      if (res.data) {
        setUsers(res.data);
      }
    }
    if (isAuthenticated) {
      getUsers();
    }
  }, [isAuthenticated]);

  const filterSchema = z.object({
    categories: z.array(z.number()).optional(),
    users: z.array(z.string()).optional(),
  });

  type FilterSchema = z.infer<typeof filterSchema>;
  const form = useForm<FilterSchema>({
    resolver: zodResolver(filterSchema),
  });

  function onSubmit(data: FilterSchema) {
    let params = {};
    if (data.users) {
      params = {
        users: data.users,
      };
    }
    if (data.categories) {
      params = {
        ...params,
        categories: `${data.categories.join("\,")}`,
      };
    }

    setSearchParams(params);
  }

  return (
    <div className="py-8 flex flex-col">
      <div>
        <h2 className="font-bold">Filter through wishlists</h2>
        <p>
          In this section you will be able to filter through wishlists by
          numerous parameters
        </p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-2"
        >
          <FormField
            control={form.control}
            name="categories"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categories</FormLabel>
                <FormControl>
                  <ComboboxMultiple
                    items={categories.map((category) => ({
                      label: category.name,
                      value: category.id,
                    }))}
                    {...field}
                  />
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
            name="users"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categories</FormLabel>
                <FormControl>
                  <ComboboxMultiple
                    items={users.map((user) => ({
                      label: user.name,
                      value: user.id,
                    }))}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Give your item a clear and descriptive name
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="flex-1"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Creating..." : "Create Item"}
          </Button>
        </form>
      </Form>
      <Separator className="mt-4" />
    </div>
  );
}
