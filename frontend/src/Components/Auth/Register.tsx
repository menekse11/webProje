import { Button, Label, Modal, ModalBody, TextInput } from "flowbite-react";
import { useState } from "react";
import { api } from "../../helper/api";
import Cookies from "universal-cookie";
import { useLoggedInUsersContext } from "./LoggedInUserContext";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router";

const Register = () => {
  const cookies = new Cookies();
  const { setLoggedInUser } = useLoggedInUsersContext();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  function handleRegister() {
    api
      .request({
        url: "auth/register",
        method: "post",
        data: { firstName, lastName, username, password, email },
      })
      .then((res) => {
        // İsteğe bağlı: kayıt sonrası otomatik login
        cookies.set("loggedInUser", JSON.stringify(res.data), {
          expires: new Date(Date.now() + 1000 * 60 * 60),
        });
        setLoggedInUser(res.data);
        toast.success("Registration successful!");
        navigate("/login");
      })

      .catch((err) => {
        toast.error("Registration failed!");
        console.error(err);
      });
  }

  return (
    <Modal show={true} size="sm" popup>
      <h3 className="px-4 py-4 text-xl font-bold">Register</h3>
      <ModalBody>
        <div className="space-y-6">
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
            <Label htmlFor="email">Email</Label>
            <TextInput
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            <Label htmlFor="password">Password</Label>
            <TextInput
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="w-full flex justify-between items-center mt-2">
            <Link to="/login" className="text-blue-600 hover:underline mt-2">
              Login
            </Link>
            <Button onClick={handleRegister}>Register</Button>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default Register;
