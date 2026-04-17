import { useForm } from "react-hook-form";
import { Separator } from "../ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import * as z from "zod/v3";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { type Category } from "@/lib/types/category";
import { useAuth } from "@/lib/hooks/useAuth";
import { client } from "@/lib/api-client";
import type { User } from "@/lib/types/user";
import { ComboboxMultiple } from "../ui/multi-combobox";
import { useSearchParams } from "react-router";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";

type WishlistFiltersProps = React.HtmlHTMLAttributes<HTMLElement>;

export function WishlistFilters({ ...props }: WishlistFiltersProps) {
  const { isAuthenticated } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
    async function getCategories() {
      const res = await client.request<Category[]>(`/categories`);
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
    defaultValues: {
      categories: searchParams.getAll("categories")?.map(Number) || [],
      users: searchParams.getAll("users") || [],
    },
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
        categories: data.categories,
      };
    }
    setSearchParams(params);
  }

  return (
    <Drawer direction="right" modal={false}>
      <DrawerTrigger asChild>
        <Button variant="link" className="capitalize ml-auto">
          Filters
        </Button>
      </DrawerTrigger>
      <DrawerContent className="data-[vaul-drawer-direction=bottom]:max-h-[50vh] data-[vaul-drawer-direction=top]:max-h-[50vh]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DrawerHeader>
              <DrawerTitle>Filter through wishlists</DrawerTitle>
              <DrawerDescription>
                In this section you will be able to filter through wishlists by
                numerous parameters
              </DrawerDescription>
            </DrawerHeader>

            <div className="p-4 gap-4 flex flex-col">
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
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="users"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Users</FormLabel>
                    <FormControl>
                      <ComboboxMultiple
                        items={users.map((user) => ({
                          label: user.name,
                          value: user.id,
                        }))}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DrawerFooter>
              <DrawerClose asChild>
                <Button type="submit" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? "Filtering..." : "Filter"}
                </Button>
              </DrawerClose>
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </form>
        </Form>
      </DrawerContent>
    </Drawer>
    // <Separator className="mb-4" />
  );
}
