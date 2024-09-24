import { RootState } from "@/store/store";
import styles from "./ColorModeButton.module.css";
import { useEffect } from "react";
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { changeColorTheme } from "@/store/slices/settingsSlice";

const ColorModeButton = () => {
  const dispatch = useDispatch();
  const colorTheme = useSelector(
    (state: RootState) => state.settings.colorTheme
  );

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
      dispatch(changeColorTheme("dark"));
    }
    if (colorTheme === "dark") {
      dispatch(changeColorTheme("light"));
    }
  };

  return (
    <button
      className={styles.button}
      onClick={handleClick}
      aria-label={
        colorTheme === "light" ? "밝은 색상으로 변경" : "어두운 색상으로 변경"
      }
    >
      {colorTheme === "light" ? (
        <MdOutlineDarkMode
          className={`${styles.icon} icon`}
          title="어두운 색상으로 변경"
          aria-hidden="true"
        />
      ) : (
        <MdOutlineLightMode
          className={`${styles.icon} icon`}
          title="밝은 색상으로 변경"
          aria-hidden="true"
        />
      )}
    </button>
  );
};

export default ColorModeButton;
