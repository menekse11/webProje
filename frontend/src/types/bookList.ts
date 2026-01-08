import type { Book } from "./boook";

export interface BookList {
  id: number;
  title: string;
  books: Book[];

  userId?: number;
}
