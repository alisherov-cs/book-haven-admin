import type { TCategory } from "@/features/category/types";

export type TProduct = {
  id: number;
  name: string;
  categories: TCategory[];
};
