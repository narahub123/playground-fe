import { createBrowserRouter } from "react-router-dom";
import { DefaultLayout } from "@/layouts";
import { AuthPage } from "@/pages";
import NotFound from "@/pages/NotFound/NotFound";

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
        path: "auth",
        element: <AuthPage />,
      },
    ],
  },
]);
