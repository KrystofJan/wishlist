import { client } from "@/lib/api-client";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Wishlist } from "@/lib/types/wishlist";
import {
  WishlistHeader,
  WishlistItemList,
} from "@/components/wishlists/wishlist-detail";

export function WishlistDetail() {
  const params = useParams();
  const [wishlist, setWishlist] = useState<Wishlist | null>(null);

  useEffect(() => {
    async function getWishlist() {
      const { data } = await client.request<Wishlist>(
        `/wishlists/${params.id}?extend=items,user`,
      );
      if (data) {
        setWishlist(data);
      }
    }
    getWishlist();
  }, [params.id]);

  if (!wishlist) {
    return (
      <div className="flex items-center justify-center h-64">Loading...</div>
    );
  }

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8">
      {/* Back navigation */}
      <Link
        to="/wishlists"
        className="text-muted-foreground hover:text-foreground mb-6 inline-flex items-center gap-2 text-sm"
      >
        ← Back to wishlists
      </Link>

      <WishlistHeader wishlist={wishlist} />
      <WishlistItemList items={wishlist.items} />
    </div>
  );
}
