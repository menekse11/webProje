import { Navigate, Outlet } from "react-router";
import { useLoggedInUsersContext } from "../Auth/LoggedInUserContext";

const AuthenticationLayout = () => {
  const { loggedInUser } = useLoggedInUsersContext();

  // Giriş yapmamışsa login'e yönlendir
  if (!loggedInUser) return <Navigate to="/login" />;

  return <Outlet />;
};

export default AuthenticationLayout;
