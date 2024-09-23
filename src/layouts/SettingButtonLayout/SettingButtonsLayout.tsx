import styles from "./SettingButtonLayout.module.css";
import { ColorModeButton } from "@/components";

const SettingButtonsLayout = () => {
  return (
    <div className={styles.container}>
      <ColorModeButton />
    </div>
  );
};

export default SettingButtonsLayout;
