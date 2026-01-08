import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import { PageNotFound } from "./Components/HomePage/PageNotFound.tsx";
import Login from "./Components/Auth/Login.tsx";
import Register from "./Components/Auth/Register.tsx";
import LoggedInUserContextProvider from "./Components/Auth/LoggedInUserContext.tsx";
import { ProfilePage } from "./Components/Pages/userPages/profile/ProfilePage.tsx";
import UserLayout from "./Components/layouts/UserLayout.tsx";
import { BookTable } from "./Components/Pages/userPages/book/BookTable.tsx";
import { BookListTable } from "./Components/Pages/userPages/book-list/BookListTable.tsx";
import { UsersTable } from "./Components/Pages/adminPages/UserPanel/UsersTable.tsx";
import AdminLayout from "./Components/layouts/AdminLayout.tsx";
import { BooksTable } from "./Components/Pages/adminPages/BookTable/BooksTable.tsx";
const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/login", element: <Login /> },
  { path: "/create", element: <Register /> },
  { path: "*", element: <PageNotFound /> },
  {
    path: "/user",
    element: <UserLayout />,

    children: [
      {
        path: "profile",
        element: <ProfilePage />,
      },
      {
        path: "books",
        element: <BookTable />,
      },
      {
        path: "booklist",
        element: <BookListTable />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,

    children: [
      {
        path: "usersTable",
        element: <UsersTable />,
      },
      {
        path: "booksTable",
        element: <BooksTable></BooksTable>,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LoggedInUserContextProvider>
      <RouterProvider router={router} />
    </LoggedInUserContextProvider>
  </StrictMode>
);
