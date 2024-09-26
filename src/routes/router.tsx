import { createBrowserRouter } from "react-router-dom";
import NotFound from "@/pages/NotFound/NotFound";
import { DefaultLayout } from "@/layouts";
import { AuthModal } from "@/features/authentication/components";
import { Signup } from "@/features/authentication/signup";

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
