import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Checkbox,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  TextInput,
} from "flowbite-react";
import { api } from "../../../../helper/api";
import { toast } from "sonner";
import type { Review } from "../../../../types/review";
import { HiOutlineExclamationCircle } from "react-icons/hi";

interface Props {
  bookId: number;
  onClose: () => void;
}

export const ViewReviewModal = ({ bookId, onClose }: Props) => {
  const [review, setReview] = useState<Review | null>(null);
  const [showDelete, setShowDelete] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [isRead, setIsRead] = useState(false);
  const [rating, setRating] = useState<number | "">("");
  const [comment, setComment] = useState("");

  const FetchReview = () => {
    api
      .get(`/review/book/${bookId}`)
      .then((res) => {
        setReview(res.data);
        setIsRead(true);
        setRating(res.data.rating ?? "");
        setComment(res.data.comment ?? "");
      })
      .catch(() => toast.error("Failed to fetch user"));
  };

  useEffect(() => {
    FetchReview();
  }, [bookId]);

  function handleDelete() {
    if (!review) return;

    api
      .request({
        url: "review/" + review.id,
        method: "delete",
      })
      .then(() => {
        setReview(null);
        setShowDelete(false);
        onClose();
        toast.success("review deleted successfuly");
      })
      .catch(() => toast.error("Something went wrong"));
  }

  function handleSave() {
    const body = {
      isRead,
      rating: isRead && rating ? Number(rating) : null,
      comment: isRead && comment ? comment : "",
    };

    if (!review) return;

    api
      .request({
        url: "review/" + review.id,
        method: "patch",
        data: body,
      })
      .then(() => {
        setShowUpdate(false);
        FetchReview();
        toast.success("review deleted successfuly");
      })
      .catch(() => toast.error("Something went wrong"));
  }

  return (
    <>
      <Modal show={true} size="md" onClose={onClose} popup>
        <ModalHeader>Review: </ModalHeader>
        <ModalBody>
          <div className="space-y-6">
            <Card>
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Your Review
              </h5>{" "}
              <p className="font-normal text-gray-700 dark:text-gray-400">
                <strong>COMMENT:</strong>
                {review?.comment}
              </p>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                <strong>RATE:</strong>
                {review?.rating}/10
              </p>
            </Card>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button color="dark" onClick={() => setShowUpdate(true)}>
              Update
            </Button>

            <Button color="red" onClick={() => setShowDelete(true)}>
              Delete
            </Button>

            <Button color="gray" onClick={onClose}>
              Close
            </Button>
          </div>
        </ModalBody>
      </Modal>
      {showDelete && (
        <Modal show={showDelete} onClose={() => setShowDelete(false)} popup>
          <ModalHeader />
          <ModalBody>
            <div className="text-center">
              <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Are you sure you want to delete this review?
              </h3>
              <div className="flex justify-center gap-4">
                <Button color="red" onClick={handleDelete}>
                  Yes, I'm sure
                </Button>
                <Button
                  color="alternative"
                  onClick={() => setShowDelete(false)}
                >
                  No, cancel
                </Button>
              </div>
            </div>
          </ModalBody>
        </Modal>
      )}

      {showUpdate && (
        <Modal show={true} onClose={() => setShowUpdate(false)} popup>
          <ModalHeader />
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

              <Button color="dark" onClick={handleSave}>
                Save
              </Button>
            </div>
          </ModalBody>
        </Modal>
      )}
    </>
  );
};
