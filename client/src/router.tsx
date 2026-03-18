import type { ReactNode } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/home";
import Login from "./pages/login";
import SignUp from "./pages/signup";
import { Wishlists } from "./pages/wishlists";
import { WishlistDetail } from "./pages/wishlist-detail";
import { UnderConstruction } from "./pages/under-construction";
import { CreateItem } from "./pages/create-item";
import { Items } from "./pages/items";

type RouterProps = {
  children: ReactNode;
};

export function Router({ children }: RouterProps) {
  return (
    <BrowserRouter>
      {children}
      <main className="min-h-[calc(100vh-4rem)]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/wishlists">
            <Route index element={<Wishlists />} />
            <Route path="/wishlists/:id" element={<WishlistDetail />} />
          </Route>
          <Route path="/items">
            <Route index element={<Items />} />
            <Route path="create" element={<CreateItem />} />
            <Route path="/items/:id" element={<UnderConstruction />} />
          </Route>
        </Routes>
      </main>
    </BrowserRouter>
  );
}
