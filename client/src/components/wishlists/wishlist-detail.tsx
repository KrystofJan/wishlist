import type { User } from "@/lib/types/user";
import type { Wishlist } from "@/lib/types/wishlist";
import { Button } from "../ui/button";
import type { Item } from "@/lib/types/item";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Link } from "react-router";

type WishlistOwnerInfoProps = {
  user: User;
};

export function WishlistOwnerInfo({ user }: WishlistOwnerInfoProps) {
  return (
    <div className="flex items-center gap-3 rounded-lg bg-muted/50 px-4 py-3">
      <img
        src={user.image ?? `https://avatar.vercel.sh/${user.email}`}
        alt={user.name}
        className="size-10 rounded-full"
      />
      <div>
        <p className="text-sm font-medium">{user.name}</p>
        <p className="text-muted-foreground text-xs">Wishlist owner</p>
      </div>
    </div>
  );
}

type WishlistHeaderProps = {
  wishlist: Wishlist;
};

export function WishlistHeader({ wishlist }: WishlistHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h1 className="text-3xl font-bold tracking-tight">{wishlist.name}</h1>
          <p className="text-muted-foreground mt-2 text-lg">
            {wishlist.description}
          </p>
        </div>

        {/* Owner info */}
        {wishlist.user && <WishlistOwnerInfo user={wishlist.user} />}
      </div>

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
        <Button size="sm" asChild>
          <Link to={"/items/create"}>Add item</Link>
        </Button>
      </div>
    </div>
  );
}

type WishlistItemlistProps = {
  items?: Item[];
};

export function WishlistItemList({ items }: WishlistItemlistProps) {
  if (!items || items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-16">
        <span className="mb-4 text-4xl">📦</span>
        <p className="text-muted-foreground mb-4">
          No items in this wishlist yet
        </p>
        <Button>Add your first item</Button>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <Card key={item.id} className="overflow-hidden pt-0">
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
  );
}
