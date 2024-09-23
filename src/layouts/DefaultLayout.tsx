import { ColorModeButton } from "@/components";
import { Outlet } from "react-router-dom";

const DefaultLayout = () => {
  return (
    <>
      <ColorModeButton />
      <Outlet />
    </>
  );
};

export default DefaultLayout;
