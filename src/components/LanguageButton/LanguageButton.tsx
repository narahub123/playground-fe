import styles from "./LanguageButton.module.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useState } from "react";
import { changeLanguage } from "@/store/slices/settingsSlice";
import { languageList } from "@/data/index.data";

const LanguageButton = () => {
  const dispatch = useDispatch();
  const lang = useSelector((state: RootState) => state.settings.language);
  const [openDropdown, setOpenDropdown] = useState(false);

  console.log(lang);

  const handleClick = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;

    dispatch(changeLanguage(value));
  };

  return (
    <select
      className={`${styles.title} ${openDropdown ? styles.open : ""}`}
      onChange={handleClick}
    >
      {languageList.map((item) => (
        <option key={item.code} className={styles.item} value={item.code}>
          {item.ownName}
        </option>
      ))}
    </select>
  );
};

export default LanguageButton;
