import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Wishlist } from "@/lib/types/wishlist";
import { Link } from "react-router";

type WishlistCardProps = {
  wishlist: Wishlist;
};

export function WishlistCard({ wishlist }: WishlistCardProps) {
  return (
    <Link to={`/wishlists/${wishlist.id}`} className="rounded-2xl">
      <Card className="relative mx-auto w-full pt-0 hover:scale-101 transition-all">
        <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
        <img
          src="https://avatar.vercel.sh/shadcn1"
          alt="Event cover"
          className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40"
        />
        <CardHeader>
          <CardAction>aaa</CardAction>
          <CardTitle>{wishlist.name}</CardTitle>
          <CardDescription>{wishlist.description}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}
