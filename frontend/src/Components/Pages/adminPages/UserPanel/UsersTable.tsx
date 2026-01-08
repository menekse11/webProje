import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  TextInput,
  Select,
} from "flowbite-react";
import { useEffect, useState } from "react";
import { api } from "../../../../helper/api";
import { toast } from "sonner";
import { showErrors } from "../../../../helper/helper";
import { EditUserModal } from "./EditUserModal";
import type { User } from "../../../../types/user";

export function UsersTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState<number | null>(null);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  function fetchUsers() {
    api.get("users").then((res) => setUsers(res.data));
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  function handleCreate() {
    const body = { firstName, lastName, username, email, password, role };
    api
      .post("auth/register", body)
      .then(() => {
        toast.success("User created successfully");
        fetchUsers();
        setCreateOpen(false);

        setFirstName("");
        setLastName("");
        setUsername("");
        setEmail("");
        setPassword("");
        setRole("user");
      })
      .catch(showErrors);
  }
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Users Panel</h2>
        <Button size="sm" color="purple" onClick={() => setCreateOpen(true)}>
          Create User
        </Button>
      </div>

      <div className="relative overflow-x-auto shadow-md rounded-lg">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="text-sm bg-gray-100 border-b">
            <tr>
              <th className="px-6 py-3">ID</th>
              <th className="px-6 py-3">First Name</th>
              <th className="px-6 py-3">Last Name</th>
              <th className="px-6 py-3">Username</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Role</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 && (
              <tr>
                <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                  No users found
                </td>
              </tr>
            )}
            {users.map((user) => (
              <tr key={user.id} className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-semibold">{user.id}</td>
                <td className="px-6 py-4">{user.firstName}</td>
                <td className="px-6 py-4">{user.lastName}</td>
                <td className="px-6 py-4">{user.username}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">{user.role}</td>
                <td className="px-6 py-4">
                  <Button
                    size="xs"
                    color="blue"
                    onClick={() => setEditOpen(user.id)}
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
        <ModalHeader>Create New User</ModalHeader>
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
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextInput
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </Select>
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
        <EditUserModal
          user={users.find((u) => u.id === editOpen)!}
          fetchUser={fetchUsers}
          show={!!editOpen}
          onClose={() => setEditOpen(null)}
        />
      )}
    </>
  );
}
