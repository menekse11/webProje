import { Navigate, Outlet } from "react-router";
import { Link } from "react-router";
import { useLoggedInUsersContext } from "../Auth/LoggedInUserContext";
import { Navbar, NavbarToggle } from "flowbite-react";
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
        <Link to="/" className="flex items-center">
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Admin Panel
          </span>
        </Link>
        <NavbarToggle />
        <div className="flex md:order-2 space-x-4">
          <Link
            to="/admin/usersTable"
            className="text-gray-700 hover:text-blue-600"
          >
            Kullanıcılar
          </Link>
          <Link
            to="/admin/booksTable"
            className="text-gray-700 hover:text-blue-600"
          >
            Kitaplar
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

export default AdminLayout;
