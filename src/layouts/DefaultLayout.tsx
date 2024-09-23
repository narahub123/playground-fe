import ColorModeButton from "@/components/ColorModeButton/ColorModeButton";
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
