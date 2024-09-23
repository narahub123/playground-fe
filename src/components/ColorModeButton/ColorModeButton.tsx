import styles from "./ColorModeButton.module.css";
import { useEffect, useState } from "react";
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";

const ColorModeButton = () => {
  const [colorTheme, setColorTheme] = useState("light");

  // colorTheme 변경에 따라 html color-theme 속성 변경
  useEffect(() => {
    if (colorTheme === "light") {
      document.documentElement.setAttribute("color-theme", "light");
    }
    if (colorTheme === "dark") {
      document.documentElement.setAttribute("color-theme", "dark");
    }
  }, [colorTheme]);

  // 색상 모드 변경 핸들러
  const handleClick = () => {
    if (colorTheme === "light") {
      setColorTheme("dark");
    }
    if (colorTheme === "dark") {
      setColorTheme("light");
    }
  };

  return (
    <i className={styles.button} onClick={() => handleClick()}>
      {colorTheme === "light" ? (
        <MdOutlineDarkMode
          className={`${styles.icon} icon`}
          title="어두운 색상"
        />
      ) : (
        <MdOutlineLightMode
          className={`${styles.icon} icon`}
          title="밝은 색상"
        />
      )}
    </i>
  );
};

export default ColorModeButton;
