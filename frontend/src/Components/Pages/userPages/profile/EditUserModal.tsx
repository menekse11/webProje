import {
  Button,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  TextInput,
} from "flowbite-react";
import { useState } from "react";
import { toast } from "sonner";
import { api } from "../../../../helper/api";
import type { User } from "../../../../types/user";
import { showErrors } from "../../../../helper/helper";
import { FaEdit } from "react-icons/fa";

interface Props {
  user: User;
  fetchUser: () => void;
}

export const EditUserModal = ({ fetchUser, user }: Props) => {
  const [show, setShow] = useState(false);

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);

  function handleSave() {
    let body = { firstName, lastName, username, email };

    api
      .request({
        url: "users/" + user.id,
        method: "patch",
        data: body,
      })
      .then(() => {
        fetchUser();
        toast.success("User updated successfuly");
        setShow(false);
      })
      .catch((error) => showErrors(error));
  }
  function getButton() {
    return (
      <Button size="xs" color="dark" onClick={() => setShow(true)}>
        <FaEdit /> Update
      </Button>
    );
  }

  return (
    <>
      <div className="flex">{getButton()}</div>
      <Modal show={show} size="md" onClose={() => setShow(false)} popup>
        <ModalHeader>{`Edit User: ${user.username}`}</ModalHeader>
        <ModalBody>
          <div className="space-y-4">
            <div>
              <Label htmlFor="firstName">First Name</Label>
              <TextInput
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <TextInput
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="username">Username</Label>
              <TextInput
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <TextInput
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="flex justify-end">
              <Button color="dark" onClick={handleSave}>
                Save
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};
