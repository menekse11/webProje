import { useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "flowbite-react";
import type { Book } from "../../../../types/boook";
import { api } from "../../../../helper/api";
import { toast } from "sonner";
import { showErrors } from "../../../../helper/helper";

interface Props {
  show: boolean;
  onClose: () => void;
  bookListId: number;
  onUpdated: () => void;
}

export function EditBookListModal({
  show,
  onClose,
  bookListId,
  onUpdated,
}: Props) {
  const [booksInList, setBooksInList] = useState<Book[]>([]);
  const [allBooks, setAllBooks] = useState<Book[]>([]);
  const [selectedBookId, setSelectedBookId] = useState<number | null>(null);

  useEffect(() => {
    if (!bookListId) return;

    api
      .get(`booklists/${bookListId}`)
      .then((res) => setBooksInList(res.data.books));
    api.get(`books`).then((res) => setAllBooks(res.data));
  }, [bookListId]);

  function handleAddBook() {
    if (!selectedBookId) return;

    api
      .post(`booklists/${bookListId}/books/${selectedBookId}`)
      .then(() => {
        toast.success("Book added successfully");
        refreshBooks();
      })
      .catch(showErrors);
  }

  function handleRemoveBook(bookId: number) {
    api
      .delete(`booklists/${bookListId}/books/${bookId}`)
      .then(() => {
        toast.success("Book removed successfully");
        refreshBooks();
      })
      .catch(showErrors);
  }

  function handleDeleteList() {
    if (!confirm("Are you sure you want to delete this book list?")) return;

    api
      .delete(`booklists/${bookListId}`)
      .then(() => {
        toast.success("Book list deleted");
        onUpdated();
        onClose();
      })
      .catch(showErrors);
  }

  function refreshBooks() {
    api
      .get(`booklists/${bookListId}`)
      .then((res) => setBooksInList(res.data.books));
  }

  return (
    <Modal show={show} size="4xl" onClose={onClose}>
      <ModalHeader>Edit Book List</ModalHeader>
      <ModalBody>
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Add Book</h3>
          <select
            className="w-full p-2 border rounded"
            value={selectedBookId ?? ""}
            onChange={(e) => setSelectedBookId(Number(e.target.value))}
          >
            <option value="">Select a book</option>
            {allBooks.map((book) => (
              <option key={book.id} value={book.id}>
                {book.title}
              </option>
            ))}
          </select>
          <Button
            className="mt-2"
            onClick={handleAddBook}
            disabled={!selectedBookId}
          >
            Add Book
          </Button>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Books in List</h3>
          <ul>
            {booksInList.map((book) => (
              <li
                key={book.id}
                className="flex justify-between items-center mb-1"
              >
                <span>{book.title}</span>
                <Button
                  size="xs"
                  color="red"
                  onClick={() => handleRemoveBook(book.id)}
                >
                  Remove
                </Button>
              </li>
            ))}
            {booksInList.length === 0 && (
              <p className="text-gray-500">No books in this list</p>
            )}
          </ul>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="red" onClick={handleDeleteList}>
          Delete List
        </Button>
        <Button color="gray" onClick={onClose}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
}
