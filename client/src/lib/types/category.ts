import * as z from "zod/v3";

export const categorySchema = z.object({
  name: z.string(),
});

export type CategoryProps = z.infer<typeof categorySchema>;

export type Category = {
  id: number;
  name: string;
};
