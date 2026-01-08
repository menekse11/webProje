import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  TextInput,
} from "flowbite-react";
import type { BookList } from "../../../../types/bookList";
import { useEffect, useState } from "react";
import { api } from "../../../../helper/api";
import { BookListBooksTable } from "./ViewListBooksTable";
import { toast } from "sonner";
import { showErrors } from "../../../../helper/helper";
import { EditBookListModal } from "./EditBookListModule";

export function BookListTable() {
  const [bookList, setBookList] = useState<BookList[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedBookListId, setSelectedBookListId] = useState<number | null>(
    null
  );
  const [createOpen, setCreateOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [editOpen, setEditOpen] = useState<number | null>(null);

  function fetchBookList() {
    api.get("booklists").then((res) => setBookList(res.data));
  }

  useEffect(() => {
    fetchBookList();
  }, []);

  function handleSave() {
    const body = {
      title,
      books: [],
    };
    api
      .request({
        url: `booklists`,
        method: "post",
        data: body,
      })
      .then(() => {
        fetchBookList();
        toast.success("Review updated successfuly");
        setCreateOpen(false);
      })
      .catch((error) => showErrors(error));
  }

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">My Book Lists</h2>

        <Button size="sm" color="purple" onClick={() => setCreateOpen(true)}>
          Create
        </Button>
      </div>
      <div className="relative overflow-x-auto shadow-md rounded-lg">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="text-sm bg-gray-100 border-b">
            <tr>
              <th className="px-6 py-3">ID</th>
              <th className="px-6 py-3">Title</th>
              <th className="px-6 py-3">Vİew Books</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {bookList.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                  No book lists found
                </td>
              </tr>
            )}
            {bookList.map((list) => (
              <tr key={list.id} className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-semibold">{list.id}</td>
                <td className="px-6 py-4 font-semibold">{list.title}</td>
                <td className="px-6 py-4">
                  <Button
                    size="xs"
                    color="green"
                    onClick={() => {
                      setSelectedBookListId(list.id);
                      setOpen(true);
                    }}
                  >
                    View Books
                  </Button>
                </td>
                <td className="px-6 py-4">
                  <Button
                    size="xs"
                    color="blue"
                    onClick={() => setEditOpen(list.id)}
                  >
                    Edit Book List
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal show={open} size="6xl" onClose={() => setOpen(false)}>
        <ModalHeader>Books in List</ModalHeader>

        <ModalHeader>
          {selectedBookListId && (
            <BookListBooksTable bookListId={selectedBookListId} />
          )}
        </ModalHeader>

        <ModalFooter>
          <Button color="gray" onClick={() => setOpen(false)}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
      <Modal show={createOpen} size="sm" onClose={() => setCreateOpen(false)}>
        <ModalHeader>Create New Book List</ModalHeader>
        <ModalBody>
          <TextInput
            placeholder="Enter book list title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </ModalBody>
        <ModalFooter>
          <Button color="gray" onClick={() => setCreateOpen(false)}>
            Cancel
          </Button>
          <Button color="purple" onClick={handleSave}>
            Save
          </Button>
        </ModalFooter>
      </Modal>
      {editOpen && (
        <EditBookListModal
          show={!!editOpen}
          bookListId={editOpen}
          onClose={() => setEditOpen(null)}
          onUpdated={fetchBookList}
        />
      )}
    </>
  );
}
