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
        <Link to="/" className="flex items-center">
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Kitap Portali
          </span>
        </Link>
        <NavbarToggle />
        <div className="flex md:order-2 space-x-4">
          <Link
            to="/user/profile"
            className="text-gray-700 hover:text-blue-600"
          >
            Profilim
          </Link>
          <Link to="/user/books" className="text-gray-700 hover:text-blue-600">
            Kitaplar
          </Link>
          <Link
            to="/user/booklist"
            className="text-gray-700 hover:text-blue-600"
          >
            Kitap Listesi
          </Link>
          <button
            onClick={handleLogout}
            className="text-gray-700 hover:text-red-600"
          >
            Çıkış Yap
          </button>
        </div>
      </Navbar>

      <Outlet />
    </>
  );
};

export default UserLayout;
