import { useEffect, useState } from "react";
import type { Book } from "../../../../types/boook";
import { api } from "../../../../helper/api";
import { toast } from "sonner";

export const BookListBooksTable = ({ bookListId }: { bookListId: number }) => {
  const [books, setBooks] = useState<Book[]>([]);

  const fetchBooks = () => {
    api
      .get(`/booklists/${bookListId}`)
      .then((res) => {
        setBooks(res.data.books);
      })
      .catch(() => toast.error("Failed to fetch books"));
  };

  useEffect(() => {
    fetchBooks();
  }, [bookListId]);

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead>
          <tr>
            <th className="px-4 py-3">Cover</th>
            <th className="px-6 py-3">Title</th>
            <th className="px-6 py-3">Author</th>
          </tr>
        </thead>
        <tbody>
          {books.length === 0 && (
            <tr>
              <td colSpan={2} className="px-6 py-4 text-center text-gray-500">
                This list is empty
              </td>
            </tr>
          )}

          {books.map((book) => (
            <tr key={book.id}>
              <td className="p-4">
                <img
                  src={book.cover_image || "/default-cover.jpg"}
                  alt={book.title}
                  className="w-14 h-auto rounded"
                />
              </td>
              <td className="px-6 py-4">{book.title}</td>
              <td className="px-6 py-4">{book.author}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
