import type { User } from "./user";
import type { Book } from "./boook";

export interface Review {
  id: number;
  isRead: boolean;
  rating: number | null;
  comment: string | null;

  user?: User;
  book?: Book;

  userId?: number;
  bookId?: number;
}
