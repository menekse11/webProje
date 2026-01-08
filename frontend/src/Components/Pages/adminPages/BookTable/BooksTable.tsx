import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  TextInput,
} from "flowbite-react";
import { useEffect, useState } from "react";
import { api } from "../../../../helper/api";
import { toast } from "sonner";
import { showErrors } from "../../../../helper/helper";
import { EditBookModal } from "./EditBookModal";
import type { Book } from "../../../../types/boook";

export function BooksTable() {
  const [books, setBooks] = useState<Book[]>([]);
  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState<Book | null>(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [coverImage, setCoverImage] = useState("");
  function fetchBooks() {
    api
      .get("books")
      .then((res) => setBooks(res.data))
      .catch(showErrors);
  }

  useEffect(() => {
    fetchBooks();
  }, []);

  function handleCreate() {
    const body = { title, author, cover_image: coverImage || null };
    api
      .post("books", body)
      .then(() => {
        toast.success("Book created successfully");
        fetchBooks();
        setCreateOpen(false);
        setTitle("");
        setAuthor("");
        setCoverImage("");
      })
      .catch(showErrors);
  }
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Books Panel</h2>
        <Button size="sm" color="purple" onClick={() => setCreateOpen(true)}>
          Create Book
        </Button>
      </div>

      <div className="relative overflow-x-auto shadow-md rounded-lg">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="text-sm bg-gray-100 border-b">
            <tr>
              <th className="px-6 py-3">Cover</th>
              <th className="px-6 py-3">Title</th>
              <th className="px-6 py-3">Author</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {books.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                  No books found
                </td>
              </tr>
            )}
            {books.map((book) => (
              <tr key={book.id} className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-4">
                  {book.cover_image ? (
                    <img
                      src={book.cover_image}
                      alt={book.title}
                      className="h-12 w-12 object-cover rounded"
                    />
                  ) : (
                    "No cover"
                  )}
                </td>
                <td className="px-6 py-4">{book.title}</td>
                <td className="px-6 py-4">{book.author}</td>
                <td className="px-6 py-4">
                  <Button
                    size="xs"
                    color="blue"
                    onClick={() => setEditOpen(book)}
                  >
                    Edit
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal show={createOpen} size="md" onClose={() => setCreateOpen(false)}>
        <ModalHeader>Create New Book</ModalHeader>
        <ModalBody className="space-y-3">
          <TextInput
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextInput
            placeholder="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <TextInput
            placeholder="Cover Image URL (optional)"
            value={coverImage}
            onChange={(e) => setCoverImage(e.target.value)}
          />
        </ModalBody>
        <ModalFooter>
          <Button color="gray" onClick={() => setCreateOpen(false)}>
            Cancel
          </Button>
          <Button color="purple" onClick={handleCreate}>
            Save
          </Button>
        </ModalFooter>
      </Modal>

      {editOpen && (
        <EditBookModal
          book={editOpen}
          fetchBooks={fetchBooks}
          onClose={() => setEditOpen(null)}
        />
      )}
    </>
  );
}
