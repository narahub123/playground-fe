import { createBrowserRouter } from "react-router-dom";
import NotFound from "@/pages/NotFound/NotFound";
import { AuthModal } from "@/features/authentication/components";
import AuthLayout from "@/layouts/AuthLayout";

const login = false;
export const router = createBrowserRouter([
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "/",
    element: login ? "" : <AuthLayout />,
    children: [
      {
        path: "flow",
        element: <AuthModal />,
        children: [
          {
            path: "signup",
          },
          {
            path: "login",
          },
        ],
      },
    ],
  },
]);
