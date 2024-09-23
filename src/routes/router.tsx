import { createBrowserRouter } from "react-router-dom";
import { DefaultLayout } from "@/layouts";
import { AuthPage } from "@/pages";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "auth",
        element: <AuthPage />,
      },
    ],
  },
]);
