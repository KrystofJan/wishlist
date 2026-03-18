import type { Item } from "@/lib/types/item";
import { client } from "@/lib/api-client";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { WishlistCard } from "@/components/wishlists/wishlist-card";
import { Button } from "@/components/ui/button";
import { ItemCard } from "@/components/items/item-card";

export function Items() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getItems() {
      const { data } = await client.request<Item[]>("/items");
      if (data) {
        setItems(data);
      }
      setLoading(false);
    }
    getItems();
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
          <h1 className="text-3xl font-bold tracking-tight">Items</h1>
          <p className="text-muted-foreground mt-1">
            Manage and organize items
          </p>
        </div>
        <Button asChild>
          <Link to="/items/create">Create Item</Link>
        </Button>
      </div>

      {/* Wishlists Grid */}
      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-16">
          <span className="mb-4 text-4xl">📝</span>
          <p className="text-muted-foreground mb-4">
            You don{"'"}t have any wishlists yet
          </p>
          <Button>Create your first wishlist</Button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <ItemCard item={item} key={item.id} />
          ))}
        </div>
      )}
    </div>
  );
}
