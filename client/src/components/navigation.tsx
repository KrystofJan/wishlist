import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { useAuth } from "@/lib/hooks/useAuth";
import { Link } from "react-router";

export function NavBar() {
  const { isAuthenticated } = useAuth();
  return (
    <div className="flex flex-row justify-between items-center p-4 bg-black">
      <Link to="/">
        <h1 className="text-2xl font-bold text-primary">Wishlist app</h1>
      </Link>
      <NavigationMenu className="text-foreground max-w-full h-16">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link to="/">Home</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link to="/login">Login</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          {!isAuthenticated && (
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link to="/signup">Signup</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          )}
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link to="/wishlists">Wishlists</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
