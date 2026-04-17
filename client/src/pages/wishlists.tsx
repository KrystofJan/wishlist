import type { Wishlist } from "@/lib/types/wishlist";
import { client } from "@/lib/api-client";
import { useEffect, useState } from "react";
import { WishlistCard } from "@/components/wishlists/wishlist-card";
import { Button } from "@/components/ui/button";
import { WishlistFilters } from "@/components/wishlists/wishlist-filters";
import { useSearchParams } from "react-router";
import { Separator } from "@/components/ui/separator";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Search } from "lucide-react";
import { useSearch } from "@/lib/hooks/useFuseSearch";

export function Wishlists() {
  const [wishlists, setWishlists] = useState<Wishlist[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, _] = useSearchParams();
  const [search, setSearch] = useState("");

  const searchedWishlists = useSearch<Wishlist>({
    data: wishlists,
    search,
    keys: ["name", "description"],
  });

  useEffect(() => {
    async function getWishlists() {
      const { data } = await client.request<Wishlist[]>(
        `/wishlists?${searchParams.toString()}`,
      );
      if (data) {
        setWishlists(data);
      }
      setLoading(false);
    }
    getWishlists();
  }, [searchParams]);

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

      <div className="flex">
        <InputGroup className="w-full bg-background">
          <InputGroupInput
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <InputGroupAddon align="inline-end">
            <InputGroupButton aria-label="Copy" size="icon-xs" disabled>
              <Search />
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
        <WishlistFilters className="ml-auto flex col-span-1" />
      </div>

      <Separator className="my-4" />

      {/* Wishlists Grid */}
      {searchedWishlists.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-16">
          <span className="mb-4 text-4xl">📝</span>
          <p className="text-muted-foreground mb-4">
            You don{"'"}t have any wishlists yet
          </p>
          <Button>Create your first wishlist</Button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {searchedWishlists.map((wishlist) => (
            <WishlistCard wishlist={wishlist} key={wishlist.id} />
          ))}
        </div>
      )}
    </div>
  );
}
