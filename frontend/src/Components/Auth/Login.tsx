import { Button, Label, Modal, ModalBody, TextInput } from "flowbite-react";
import { useState } from "react";
import { api } from "../../helper/api";
import Cookies from "universal-cookie";
import { useLoggedInUsersContext } from "./LoggedInUserContext";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const cookies = new Cookies();
  const { setLoggedInUser } = useLoggedInUsersContext();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleLogin() {
    api
      .request({
        url: "auth/login",
        method: "post",
        data: { username, password },
      })
      .then((res) => {
        cookies.set("loggedInUser", JSON.stringify(res.data), {
          expires: new Date(Date.now() + 1000 * 60 * 60), // 1 saat
        });

        setLoggedInUser(res.data);

        if (res.data.role === "admin") {
          navigate("/admin/usersTable");
        } else {
          navigate("/user/profile");
        }
      })
      .catch(() => {
        toast.error("Login failed!");
      });
  }
  return (
    <Modal show={true} size="sm" popup>
      <h3 className="px-4 py-4 text-xl font-bold">Login</h3>
      <ModalBody>
        <div className="space-y-6">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="username">Username</Label>
            </div>
            <TextInput
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password">Password</Label>
            </div>
            <TextInput
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="w-full flex justify-between items-center mt-2">
            <Link to="/create" className="text-blue-600 hover:underline mt-2">
              Create an account
            </Link>
            <Button onClick={handleLogin}>Login</Button>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default Login;
