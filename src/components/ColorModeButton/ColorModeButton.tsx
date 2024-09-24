import { RootState } from "@/store/store";
import styles from "./ColorModeButton.module.css";
import { forwardRef, useEffect } from "react";
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { changeColorTheme } from "@/store/slices/settingsSlice";

const ColorModeButton = forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>((props, ref) => {
  // 두 번째 인자로 props와 ref 추가
  const dispatch = useDispatch();
  const colorTheme = useSelector(
    (state: RootState) => state.settings.colorTheme
  );

  // colorTheme 변경에 따라 html color-theme 속성 변경
  useEffect(() => {
    document.documentElement.setAttribute("color-theme", colorTheme);
  }, [colorTheme]);

  // 색상 모드 변경 핸들러
  const handleClick = () => {
    dispatch(changeColorTheme(colorTheme === "light" ? "dark" : "light"));
  };

  return (
    <button
      className={styles.button}
      onClick={handleClick}
      aria-label={
        colorTheme === "light" ? "밝은 색상으로 변경" : "어두운 색상으로 변경"
      }
      ref={ref}
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
});

export default ColorModeButton;
