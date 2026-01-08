import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  TextInput,
  Select,
} from "flowbite-react";
import { useState } from "react";
import { api } from "../../../../helper/api";
import { toast } from "sonner";
import { showErrors } from "../../../../helper/helper";
import type { User } from "../../../../types/user";

interface Props {
  user: User;
  fetchUser: () => void;
  show: boolean;
  onClose: () => void;
}

export function EditUserModal({ fetchUser, user, show, onClose }: Props) {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [role, setRole] = useState(user.role);
  function handleUpdate() {
    const body = { firstName, lastName, username, email, role };

    api
      .patch(`users/${user.id}`, body)
      .then(() => {
        fetchUser();
        toast.success("User updated successfully");
        onClose();
      })
      .catch(showErrors);
  }

  function handleDelete() {
    api
      .delete(`users/${user.id}`)
      .then(() => {
        toast.success("User deleted successfully");
        fetchUser();
        onClose();
      })
      .catch(showErrors);
  }

  if (!user) return null;

  return (
    <Modal show={show} size="md" onClose={onClose} popup>
      <ModalHeader>Edit User</ModalHeader>
      <ModalBody className="space-y-3">
        <TextInput
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <TextInput
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <TextInput
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextInput
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </Select>
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
