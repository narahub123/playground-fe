import styles from "./LanguageButton.module.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { changeLanguage } from "@/store/slices/settingsSlice";
import { languageList } from "@/data";

const LanguageButton = () => {
  // onChange를 destructure하여 기존 핸들러와 병합
  const dispatch = useDispatch();
  const lang = useSelector((state: RootState) => state.settings.language);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    dispatch(changeLanguage(value));
  };

  return (
    <select
      className={`${styles.title}`}
      onChange={handleChange}
      aria-label="언어 설정하기"
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
