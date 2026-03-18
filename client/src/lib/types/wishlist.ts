import * as z from "zod/v3";
import type { Item } from "./item";

export const wishlistSchema = z.object({
  name: z.string(),
  description: z.string().min(5).max(255),
});

export type WishlistSchema = {
  id: number;
  name: string;
  description: string;
};

export type Wishlist = {
  id: number;
  name: string;
  description: string;
  items?: Item[];
  user?: User;
};
