import { Navigate, Outlet } from "react-router";
import { Link } from "react-router";
import { useLoggedInUsersContext } from "../Auth/LoggedInUserContext";
import {
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import Cookies from "universal-cookie";

const UserLayout = () => {
  const { loggedInUser, setLoggedInUser } = useLoggedInUsersContext();

  if (!loggedInUser) {
    return <Navigate to="/login" />;
  }

  if (loggedInUser!.role! === "admin") return <Navigate to="/admin/users" />;

  function handleLogout() {
    const cookies = new Cookies();
    cookies.remove("loggedInUser");
    setLoggedInUser(null);
  }

  return (
    <>
      <Navbar fluid rounded className="mb-6">
        <NavbarBrand as={Link} to="/">
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Kitap Portali
          </span>
        </NavbarBrand>
        <NavbarToggle />
        <NavbarCollapse>
          <NavbarLink as={Link} to="/user/profile">
            Profilim
          </NavbarLink>
          <NavbarLink as={Link} to="/user/books">
            Kitaplar
          </NavbarLink>
          <NavbarLink as={Link} to="/user/booklist">
            Kitap Listesi
          </NavbarLink>
          <NavbarLink href="#" onClick={handleLogout}>
            Çıkış Yap
          </NavbarLink>
        </NavbarCollapse>
      </Navbar>

      <Outlet />
    </>
  );
};

export default UserLayout;
