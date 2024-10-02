import { IoCheckbox, IoSquareOutline } from "react-icons/io5";
import styles from "./AuthCheck.module.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import {
  AlarmType,
  SignupState,
  updateField,
} from "@/store/slices/signupSlice";
import { langObj } from "@/data/language/language";

interface AuthCheckProps {
  title: string;
  detail: string;
  subField: keyof AlarmType;
}

const AuthCheck = ({ title, detail, subField }: AuthCheckProps) => {
  const dispatch = useDispatch();
  const lang = useSelector((state: RootState) => state.settings.language);
  const alarm = useSelector((state: RootState) => state.signup.alarm);
  const handleClick = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e.stopPropagation();
    if (alarm[subField]) {
      dispatch(
        updateField({
          field: "alarm" as keyof SignupState,
          value: { [subField]: false },
        })
      );
    } else {
      dispatch(
        updateField({
          field: "alarm" as keyof SignupState,
          value: { [subField]: true },
        })
      );
    }
  };

  const handleKeydown = (e: React.KeyboardEvent<HTMLSpanElement>) => {
    e.stopPropagation();

    if (e.key === "Enter") {
      if (alarm[subField]) {
        dispatch(
          updateField({
            field: "alarm" as keyof SignupState,
            value: { [subField]: false },
          })
        );
      } else {
        dispatch(
          updateField({
            field: "alarm" as keyof SignupState,
            value: { [subField]: true },
          })
        );
      }
    }
  };
  return (
    <div className={styles.container} aria-live="polite">
      <span className={styles.info}>
        <p className={styles.title}>{title}</p>
        <p className={styles.detail}>{detail}</p>
      </span>
      <span
        className={styles.checkbox}
        role="checkbox"
        aria-checked={alarm[subField]}
        onClick={(e) => handleClick(e)}
        onKeyDown={(e) => handleKeydown(e)}
        tabIndex={0}
        aria-label={
          alarm[subField]
            ? langObj[lang].alarm.check
            : langObj[lang].alarm.uncheck
        }
      >
        {alarm[subField] ? (
          <IoCheckbox className={`icon`} />
        ) : (
          <IoSquareOutline className={`icon`} />
        )}
      </span>
    </div>
  );
};

export default AuthCheck;
