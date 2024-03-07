import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import RegisterPage from "./pages/auth/register";
import HomePage from "./pages/home";
import LoginPage from "./pages/auth/login";
import AdminPage from "./pages/admin";
import ProductAdminPage from "./pages/admin/products";
import UserAdminPage from "./pages/admin/users";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
    ],
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/admin",
    element: <AdminPage />,
  },
  {
    path: "/admin/product",
    element: <ProductAdminPage />,
  },
  {
    path: "/admin/users",
    element: <UserAdminPage />,
  },
]);
const App = () => {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
