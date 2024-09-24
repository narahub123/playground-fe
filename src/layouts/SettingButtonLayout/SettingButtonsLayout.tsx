import styles from "./SettingButtonLayout.module.css";
import { ColorModeButton, LanguageButton } from "@/components";
import { useEffect, useRef } from "react";
import { useFocusTrap } from "@/hooks";

const SettingButtonsLayout = () => {
  const { setFirstFocusable } = useFocusTrap();
  const colorButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    setFirstFocusable(colorButtonRef.current);

    return () => {
      // 컴포넌트가 언마운트될 때 포커스 설정을 해제합니다.
      setFirstFocusable(null);
    };
  }, [setFirstFocusable]);

  return (
    <div className={styles.container}>
      <ColorModeButton ref={colorButtonRef} />
      <LanguageButton />
    </div>
  );
};

export default SettingButtonsLayout;
