import { createBrowserRouter } from "react-router-dom";
import { DefaultLayout } from "@/layouts";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [],
  },
]);
