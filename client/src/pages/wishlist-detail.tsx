import { client } from "@/lib/api-client";
import type { Wishlist } from "@/lib/types/wishlist";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

export function WishlistDetail() {
  const params = useParams();

  const [wishlist, setWishlist] = useState<Wishlist[]>([]);
  useEffect(() => {
    async function getWishlists() {
      const { data } = await client.request<Wishlist[]>(
        `/wishlists/${params.id}?extend=items,user`,
      );
      if (data) {
        setWishlist(data);
      }
    }
    getWishlists();
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4">
      <pre>{JSON.stringify(wishlist, null, 4)}</pre>
    </div>
  );
}
