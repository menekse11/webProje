import { useEffect, useState } from "react";
import { Button, Modal } from "flowbite-react";
import type { Book } from "../../../../types/boook";
import { api } from "../../../../helper/api";
import { toast } from "sonner";
import { EditReviewModal } from "./EditReviewModal";
import { ViewReviewModal } from "./ViewReviewModal";

export const BookTable = () => {
  const [books, setBooks] = useState<Book[]>([]);

  const [editBookId, setEditBookId] = useState<number | null>(null);
  const [viewBook, setViewBook] = useState<Book | null>(null);

  const fetchBooks = () => {
    api
      .get("/books")
      .then((res) => {
        setBooks(res.data);
      })
      .catch(() => toast.error("Failed to fetch books"));
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="relative overflow-x-auto shadow-md rounded-lg">
      <table className="w-full text-sm text-left text-gray-700">
        <thead className="text-sm bg-gray-100 border-b">
          <tr>
            <th className="px-4 py-3">Cover</th>
            <th className="px-6 py-3">Title</th>
            <th className="px-6 py-3">Author</th>
            <th className="px-6 py-3">Review</th>
            <th className="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id} className="bg-white border-b hover:bg-gray-50">
              <td className="p-4">
                <img
                  src={book.cover_image || "/default-cover.jpg"}
                  alt={book.title}
                  className="w-16 md:w-24 rounded"
                />{" "}
              </td>
              <td className="px-6 py-4 font-semibold">{book.title}</td>
              <td className="px-6 py-4">{book.author}</td>
              <td className="px-6 py-4">
                <Button
                  size="xs"
                  color="green"
                  onClick={async () => {
                    const res = await api.get(`/review/book/${book.id}`);
                    if (res.data) {
                      setViewBook(book);
                    } else {
                      alert("Bu kitap için henüz bir yorumunuz yok!");
                    }
                  }}
                >
                  View Review
                </Button>
              </td>
              <td className="px-6 py-4">
                <Button
                  size="xs"
                  color="blue"
                  onClick={async () => {
                    try {
                      const res = await api.get(`/review/book/${book.id}`);
                      if (res.data) {
                        alert("Zaten bu kitap için bir yorumunuz var");
                      } else {
                        setEditBookId(book.id);
                      }
                    } catch {
                      toast.error("Bir hata oluştu!");
                    }
                  }}
                >
                  Create Review
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editBookId && (
        <EditReviewModal
          bookId={editBookId}
          fetchBooks={fetchBooks}
          onClose={() => setEditBookId(null)}
        />
      )}
      {viewBook && (
        <ViewReviewModal
          bookId={viewBook.id}
          onClose={() => setViewBook(null)}
        />
      )}
    </div>
  );
};
