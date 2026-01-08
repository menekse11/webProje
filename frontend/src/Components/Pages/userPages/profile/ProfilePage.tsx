import { useEffect, useState } from "react";
import { api } from "../../../../helper/api.ts";
import { toast } from "sonner";
import { Card } from "flowbite-react";
import { EditUserModal } from "./EditUserModal.tsx";

export const ProfilePage = () => {
  const [user, setUser] = useState<any>(null);

  const fetchUser = () => {
    api
      .get("/users/me")
      .then((res) => {
        setUser(res.data);
      })
      .catch(() => toast.error("Failed to fetch user"));
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6 p-6 bg-gray-100 rounded shadow text-center">
        <h1 className="text-2xl font-bold">Hoşgeldiniz!</h1>
        <p className="text-lg mt-2">
          {user.firstName} {user.lastName}
        </p>
      </div>

      <hr className="border-t-2 border-gray-300 my-6" />

      <div className="space-y-6">
        <Card>
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Personel Info
          </h5>{" "}
          <p className="font-normal text-gray-700 dark:text-gray-400">
            <strong>First Name:</strong> {user.firstName}
          </p>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            <strong>Last Name:</strong> {user.lastName}
          </p>
        </Card>

        <Card>
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Account Info
          </h5>{" "}
          <p className="font-normal text-gray-700 dark:text-gray-400">
            <strong>Username:</strong> {user.username}
          </p>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            <strong>Email:</strong> {user.email}
          </p>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            <strong>Role:</strong> {user.role}
          </p>
          <div className="flex mt-4 gap-2">
            <EditUserModal user={user} fetchUser={fetchUser} />
          </div>
        </Card>
      </div>
    </div>
  );
};
