import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Item } from "@/lib/types/item";
import { Link } from "react-router";

type ItemCardProps = {
  item: Item;
};

export function ItemCard({ item }: ItemCardProps) {
  return (
    <Link to={`/items/${item.id}`} className="rounded-2xl">
      <Card className="relative mx-auto w-full pt-0 hover:scale-101 transition-all">
        <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
        <img
          src={item.photoLink}
          alt="Event cover"
          className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40"
        />
        <CardHeader>
          <CardTitle>{item.name}</CardTitle>
          <CardDescription>{item.description}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}
