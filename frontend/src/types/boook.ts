import type { Review } from "./review";

export interface Book {
  id: number;
  title: string;
  author: string;
  cover_image?: string | null;

  reviews?: Review[];
}
