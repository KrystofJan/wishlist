import type { Wishlist } from "@/lib/types/wishlist";
import { client } from "@/lib/api-client";
import { useEffect, useState } from "react";
import { WishlistCard } from "@/components/wishlist-card";

export function Wishlists() {
  const [wishlists, setWishlists] = useState<Wishlist[]>([]);
  useEffect(() => {
    async function getWishlists() {
      const { data } = await client.request<Wishlist[]>("/wishlists");
      if (data) {
        setWishlists(data);
      }
    }
    getWishlists();
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4">
      {wishlists.map((wishlist) => {
        return <WishlistCard wishlist={wishlist} key={wishlist.id} />;
      })}
    </div>
  );
}
