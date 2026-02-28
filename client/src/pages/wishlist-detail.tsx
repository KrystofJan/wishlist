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

type Item = {
  id: number;
  name: string;
  description: string;
  link: string;
  photoLink: string;
};

type User = {
  id: string;
  name: string;
  email: string;
  image: string | null;
};

type WishlistDetail = {
  id: number;
  name: string;
  description: string;
  items?: Item[];
  user?: User;
};

export function WishlistDetail() {
  const params = useParams();
  const [wishlist, setWishlist] = useState<WishlistDetail | null>(null);

  useEffect(() => {
    async function getWishlist() {
      const { data } = await client.request<WishlistDetail>(
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

      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-3xl font-bold tracking-tight">
              {wishlist.name}
            </h1>
            <p className="text-muted-foreground mt-2 text-lg">
              {wishlist.description}
            </p>
          </div>

          {/* Owner info */}
          {wishlist.user && (
            <div className="flex items-center gap-3 rounded-lg bg-muted/50 px-4 py-3">
              <img
                src={
                  wishlist.user.image ??
                  `https://avatar.vercel.sh/${wishlist.user.email}`
                }
                alt={wishlist.user.name}
                className="size-10 rounded-full"
              />
              <div>
                <p className="text-sm font-medium">{wishlist.user.name}</p>
                <p className="text-muted-foreground text-xs">Wishlist owner</p>
              </div>
            </div>
          )}
        </div>

        {/* Stats bar */}
        <div className="mt-6 flex items-center gap-6 border-b pb-6">
          <div>
            <p className="text-2xl font-semibold">
              {wishlist.items?.length ?? 0}
            </p>
            <p className="text-muted-foreground text-sm">Items</p>
          </div>
          <div className="h-8 w-px bg-border" />
          <Button variant="outline" size="sm">
            Share wishlist
          </Button>
          <Button size="sm">Add item</Button>
        </div>
      </div>

      {/* Items Grid */}
      {!wishlist.items || wishlist.items.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-16">
          <span className="mb-4 text-4xl">📦</span>
          <p className="text-muted-foreground mb-4">
            No items in this wishlist yet
          </p>
          <Button>Add your first item</Button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {wishlist.items.map((item) => (
            <Card key={item.id} className="overflow-hidden pt-0">
              {/* Item image */}
              <div className="aspect-square overflow-hidden bg-muted">
                <img
                  src={item.photoLink}
                  alt={item.name}
                  className="size-full object-cover transition-transform hover:scale-105"
                />
              </div>

              <CardHeader className="pb-2">
                <CardTitle className="line-clamp-1 text-base">
                  {item.name}
                </CardTitle>
                <CardDescription className="line-clamp-2">
                  {item.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-0">
                <Button asChild variant="outline" className="w-full">
                  <a href={item.link} target="_blank" rel="noopener noreferrer">
                    View product ↗
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
