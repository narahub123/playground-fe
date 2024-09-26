import { LuChevronDown } from "react-icons/lu";
import styles from "./AuthInput.module.css";

interface AuthInputProps {
  list?: [];
}

const AuthInput = ({ list }: AuthInputProps) => {
  return (
    <div className={styles.wrapper}>
      <span className={styles.main}>
        <div className={styles.info}>
          <span className={styles.left}>좌측</span>
          <span className={styles.right}>우측</span>
        </div>
        <input type="text" className={styles.input} />
      </span>
      {list && (
        <span className={styles.icon}>
          <LuChevronDown className="icon" />
        </span>
      )}
    </div>
  );
};

export default AuthInput;
