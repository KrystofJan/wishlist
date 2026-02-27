import type { ReactNode } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/home";
import Login from "./pages/login";
import SignUp from "./pages/signup";
import { Wishlists } from "./pages/wishlists";
import { WishlistDetail } from "./pages/wishlist-detail";

type RouterProps = {
  children: ReactNode;
};

export function Router({ children }: RouterProps) {
  return (
    <BrowserRouter>
      {children}
      <div id="content" className="p-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/wishlists" element={<Wishlists />} />
          <Route path="/wishlists/:id" element={<WishlistDetail />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
