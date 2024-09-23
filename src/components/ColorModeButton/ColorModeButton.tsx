import styles from "./ColorModeButton.module.css";
import { useState } from "react";
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";

const ColorModeButton = () => {
  const [colorMode, setColorMode] = useState("light");

  const handleClick = () => {
    if (colorMode === "light") {
      setColorMode("dark");
    }
    if (colorMode === "dark") {
      setColorMode("light");
    }
  };

  return (
    <i className={styles.button} onClick={() => handleClick()}>
      {colorMode === "light" ? (
        <MdOutlineDarkMode className={`${styles.icon} icon`} />
      ) : (
        <MdOutlineLightMode className={`${styles.icon} icon`} />
      )}
    </i>
  );
};

export default ColorModeButton;
