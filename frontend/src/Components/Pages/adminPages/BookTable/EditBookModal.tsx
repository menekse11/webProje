import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  TextInput,
} from "flowbite-react";
import { useState } from "react";
import { api } from "../../../../helper/api";
import { toast } from "sonner";
import { showErrors } from "../../../../helper/helper";
import type { Book } from "../../../../types/boook";

interface Props {
  book: Book;
  fetchBooks: () => void;
  onClose: () => void;
}

export function EditBookModal({ book, fetchBooks, onClose }: Props) {
  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);
  const [cover_image, setCoverImage] = useState(book.cover_image || "");

  function handleUpdate() {
    const body = { title, author, cover_image: cover_image || null };
    api
      .patch(`books/${book.id}`, body)
      .then(() => {
        toast.success("Book updated successfully");
        fetchBooks();
        onClose();
      })
      .catch(showErrors);
  }

  function handleDelete() {
    api
      .delete(`books/${book.id}`)
      .then(() => {
        toast.success("Book deleted successfully");
        fetchBooks();
        onClose();
      })
      .catch(showErrors);
  }

  return (
    <Modal show={true} size="md" onClose={onClose} popup>
      <ModalHeader>Edit Book</ModalHeader>
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
          placeholder="Cover Image URL"
          value={cover_image}
          onChange={(e) => setCoverImage(e.target.value)}
        />
      </ModalBody>
      <ModalFooter>
        <Button color="red" onClick={handleDelete}>
          Delete
        </Button>
        <Button color="gray" onClick={onClose}>
          Cancel
        </Button>
        <Button color="purple" onClick={handleUpdate}>
          Update
        </Button>
      </ModalFooter>
    </Modal>
  );
}
