import { useEffect, useState } from "react";
import { client } from "../lib/api-client";
import { useAuth } from "@/lib/hooks/useAuth";
import type { Wishlist } from "@/lib/types/wishlist";

type Item = {
  id: string;
  name: string;
  description: string;
  link: string;
  photoLink: string;
};

type Category = {
  name: string;
};

function Home() {
  const [wishlists, setWishlists] = useState<Wishlist[] | null>(null);

  const { token, user, isAuthenticated } = useAuth();

  useEffect(() => {
    async function getItems() {
      const { data } = await client.request<Wishlist[]>("/wishlists");
      if (data) {
        setWishlists(data);
      }
    }
    getItems();
  }, [isAuthenticated]);

  useEffect(() => {
    async function getCategories() {
      const { data } = await client.request<Category[]>("/categories");
      if (data) {
        setCategory(data);
      }
    }
    getCategories();
  }, [isAuthenticated]);

  return (
    <>
      <pre className="rounded-2xl bg-black p-4 w-fit max-w-lg">
        {isAuthenticated &&
          JSON.stringify({ user, token, valid: true }, null, 2)}
      </pre>

      <pre className="rounded-2xl bg-black p-4 w-fit max-w-lg">
        {isAuthenticated && JSON.stringify(wishlists, null, 2)}
      </pre>
    </>
  );
}

export default Home;
