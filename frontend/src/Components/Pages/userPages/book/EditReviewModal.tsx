import { useState } from "react";
import {
  Button,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  TextInput,
  Checkbox,
} from "flowbite-react";
import { api } from "../../../../helper/api";
import { toast } from "sonner";
import { showErrors } from "../../../../helper/helper";

interface Props {
  bookId: number;
  fetchBooks: () => void;
  onClose: () => void;
}

export const EditReviewModal = ({ bookId, fetchBooks, onClose }: Props) => {
  const [isRead, setIsRead] = useState(false);
  const [rating, setRating] = useState<number | "">("");
  const [comment, setComment] = useState("");

  function handleSave() {
    const body = {
      isRead,
      rating: isRead && rating ? Number(rating) : null,
      comment: isRead && comment ? comment : "",
    };
    api
      .request({
        url: `review/book/${bookId}`,
        method: "post",
        data: body,
      })
      .then(() => {
        fetchBooks();
        toast.success("Review updated successfuly");
        onClose();
      })
      .catch((error) => showErrors(error));
  }

  return (
    <>
      <Modal show={true} size="md" onClose={onClose} popup>
        <ModalHeader>Add Review</ModalHeader>

        <ModalBody>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Checkbox
                id="isRead"
                checked={isRead}
                onChange={(e) => setIsRead(e.target.checked)}
              />
              <Label htmlFor="isRead">I have read this book</Label>
            </div>

            {isRead && (
              <>
                <div>
                  <Label htmlFor="rating">Rating (1-10)</Label>
                  <TextInput
                    id="rating"
                    type="number"
                    min={1}
                    max={10}
                    value={rating}
                    onChange={(e) =>
                      setRating(e.target.value ? Number(e.target.value) : "")
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="comment">Comment</Label>
                  <TextInput
                    id="comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </div>
              </>
            )}

            <Button onClick={handleSave} className="w-full">
              Save Review
            </Button>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};
