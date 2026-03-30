import type { Wishlist } from "@/lib/types/wishlist";
import { client } from "@/lib/api-client";
import { useEffect, useState } from "react";
import { WishlistCard } from "@/components/wishlists/wishlist-card";
import { Button } from "@/components/ui/button";
import { WishlistFilters } from "@/components/wishlists/wishlist-filters";

export function Wishlists() {
  const [wishlists, setWishlists] = useState<Wishlist[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getWishlists() {
      const { data } = await client.request<Wishlist[]>("/wishlists");
      if (data) {
        setWishlists(data);
      }
      setLoading(false);
    }
    getWishlists();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto flex h-64 max-w-5xl items-center justify-center px-4">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Wishlists</h1>
          <p className="text-muted-foreground mt-1">
            Manage and organize your wishlists
          </p>
        </div>
        <Button>Create wishlist</Button>
      </div>

      <WishlistFilters />

      {/* Wishlists Grid */}
      {wishlists.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-16">
          <span className="mb-4 text-4xl">📝</span>
          <p className="text-muted-foreground mb-4">
            You don{"'"}t have any wishlists yet
          </p>
          <Button>Create your first wishlist</Button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {wishlists.map((wishlist) => (
            <WishlistCard wishlist={wishlist} key={wishlist.id} />
          ))}
        </div>
      )}
    </div>
  );
}
