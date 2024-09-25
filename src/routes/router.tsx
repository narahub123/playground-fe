import { createBrowserRouter } from "react-router-dom";
import NotFound from "@/pages/NotFound/NotFound";
import { AuthModal } from "@/features/authentication/components";
import Signup from "@/features/authentication/signup/Signup";
import { DefaultLayout } from "@/layouts";

export const router = createBrowserRouter([
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "flow",
        element: <AuthModal />,
        children: [
          {
            path: "signup",
            element: <Signup />,
          },
          {
            path: "login",
          },
        ],
      },
    ],
  },
]);
