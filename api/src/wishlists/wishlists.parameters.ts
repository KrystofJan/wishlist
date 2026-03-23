export type WishlistFindIncludeParameters = {
  includeUser: boolean;
  includeItems: boolean;
};

export type WishlistFindMultipleParameters = {
  categories: number[];
  users: string[];
} & WishlistFindIncludeParameters;
