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

const AdminLayout = () => {
  const { loggedInUser, setLoggedInUser } = useLoggedInUsersContext();

  if (!loggedInUser) {
    return <Navigate to="/login" />;
  }
  if (loggedInUser.role !== "admin") {
    return <Navigate to="/user/profile" />;
  }

  function handleLogout() {
    const cookies = new Cookies();
    cookies.remove("loggedInUser");
    setLoggedInUser(null);
  }

  return (
    <>
      <Navbar fluid rounded className="mb-6">
        {/* @ts-expect-ignore */}
        <NavbarBrand as={Link} to="/">
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Admin Panel
          </span>
        </NavbarBrand>
        <NavbarToggle />
        <NavbarCollapse>
          {/* @ts-expect-ignore */}
          <NavbarLink as={Link} to="/admin/usersTable">
            Kullanıcılar
          </NavbarLink>
          {/* @ts-expect-ignore */}
          <NavbarLink as={Link} to="/admin/usersTable">
            Kitaplar
          </NavbarLink>
          {/* @ts-expect-ignore */}
          <NavbarLink href="#" to={handleLogout}>
            Çıkış Yap
          </NavbarLink>
        </NavbarCollapse>
      </Navbar>

      <Outlet />
    </>
  );
};

export default AdminLayout;
