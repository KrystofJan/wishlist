import Fuse from "fuse.js";
import { useMemo } from "react";

type SearchProps<T> = {
  search: string;
  data: T[];
  keys: Array<keyof T>;
  // isCaseSensitive: boolean;
  // includeScore: false,
  // ignoreDiacritics: false,
  // shouldSort: true,
  // includeMatches: false,
  // findAllMatches: false,
  // minMatchCharLength: 1,
  // location: 0,
  // threshold: 0.6,
  // distance: 100,
  // useExtendedSearch: false,
  // ignoreLocation: false,
  // ignoreFieldNorm: false,
  // fieldNormWeight: 1,
};

export function useSearch<T>({ search, data = [], keys }: SearchProps<T>): T[] {
  const fuse = useMemo(
    () =>
      new Fuse(data, {
        keys: keys as string[],
      }),
    [data, keys],
  );
  return useMemo(
    () => fuse.search(search).map(({ item }) => item),
    [fuse, search],
  );
}
