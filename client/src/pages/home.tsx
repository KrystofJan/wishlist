import { useEffect, useState } from "react";
import { Link } from "react-router";
import { client } from "../lib/api-client";
import { useAuth } from "@/lib/hooks/useAuth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Wishlist } from "@/lib/types/wishlist";

function Home() {
  const [wishlists, setWishlists] = useState<Wishlist[] | null>(null);
  const { user, isAuthenticated, loading } = useAuth();

  useEffect(() => {
    async function getWishlists() {
      const { data } = await client.request<Wishlist[]>(
        `/users/${user?.id}/wishlists`,
      );
      if (data) {
        setWishlists(data);
      }
    }
    if (isAuthenticated && user?.id) {
      getWishlists();
    }
  }, [isAuthenticated, user?.id]);

  if (loading) {
    return (
      <div className="container mx-auto flex h-64 max-w-5xl items-center justify-center px-4">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8">
      {/* Hero Section */}
      <section className="mb-12">
        <div className="flex flex-col items-center text-center">
          <span className="mb-4 text-6xl">🎁</span>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Welcome to Wishlist
          </h1>
          <p className="text-muted-foreground mt-4 max-w-2xl text-lg">
            Create and share wishlists with friends and family. Never receive an
            unwanted gift again.
          </p>

          {!isAuthenticated ? (
            <div className="mt-8 flex gap-4">
              <Button size="lg" asChild>
                <Link to="/signup">Get Started</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/login">Log in</Link>
              </Button>
            </div>
          ) : (
            <div className="mt-8 flex gap-4">
              <Button size="lg" asChild>
                <Link
                  to={{
                    pathname: "/wishlists",
                    search: `?users=${user.id}`,
                  }}
                >
                  View My Wishlists
                </Link>
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* User Welcome Section (when authenticated) */}
      {isAuthenticated && (
        <section className="mb-12">
          <div className="flex items-center gap-4 rounded-lg border bg-muted/30 p-6">
            <img
              src={user.image ?? `https://avatar.vercel.sh/${user.email}`}
              alt={user.name}
              className="size-16 rounded-full"
            />
            <div>
              <h2 className="text-xl font-semibold">
                Welcome back, {user.name}!
              </h2>
              <p className="text-muted-foreground">
                You have {wishlists?.length ?? 0} wishlist
                {wishlists?.length !== 1 ? "s" : ""}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Recent Wishlists (when authenticated) */}
      {isAuthenticated && wishlists && wishlists.length > 0 && (
        <section>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight">
              Recent Wishlists
            </h2>
            <Button variant="outline" size="sm" asChild>
              <Link to="/wishlists">View all</Link>
            </Button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {wishlists.slice(0, 3).map((wishlist) => (
              <Link to={`/wishlists/${wishlist.id}`} key={wishlist.id}>
                <Card className="transition-all hover:shadow-md hover:border-primary/50">
                  <CardHeader>
                    <CardTitle className="line-clamp-1">
                      {wishlist.name}
                    </CardTitle>
                    <CardDescription className="line-clamp-2">
                      {wishlist.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Features Section (when not authenticated) */}
      {!isAuthenticated && (
        <section>
          <h2 className="mb-6 text-center text-2xl font-bold tracking-tight">
            Why use Wishlist?
          </h2>
          <div className="grid gap-6 sm:grid-cols-3">
            <Card>
              <CardHeader>
                <div className="mb-2 text-3xl">📝</div>
                <CardTitle>Create Lists</CardTitle>
                <CardDescription>
                  Easily create wishlists for any occasion - birthdays,
                  holidays, or just because.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <div className="mb-2 text-3xl">🔗</div>
                <CardTitle>Share Easily</CardTitle>
                <CardDescription>
                  Share your wishlists with friends and family with a simple
                  link.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <div className="mb-2 text-3xl">🎯</div>
                <CardTitle>Perfect Gifts</CardTitle>
                <CardDescription>
                  Help others find the perfect gift by adding items you actually
                  want.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>
      )}
    </div>
  );
}

export default Home;
