import * as z from "zod/v3";

const httpUrlRegex =
  /^https?:\/\/([a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}.*$/;

export const itemSchema = z.object({
  id: z.number().nullish(),
  name: z.string(),
  description: z.string().min(5).max(255),
  link: z.string().regex(httpUrlRegex),
  photoLink: z.string().regex(httpUrlRegex).nullish(),
  categories: z.array(z.number()).nullish(),
});

export type ItemSchema = z.infer<typeof itemSchema>;

export type Item = {
  id: number;
  name: string;
  description: string;
  link: string;
  photoLink: string;
};
