import LanguageButton from "@/components/LanguageButton/LanguageButton";
import styles from "./SettingButtonLayout.module.css";
import { ColorModeButton } from "@/components";

const SettingButtonsLayout = () => {
  return (
    <div className={styles.container}>
      <ColorModeButton />
      <LanguageButton />
    </div>
  );
};

export default SettingButtonsLayout;
