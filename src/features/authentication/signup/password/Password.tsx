import { useSelector } from "react-redux";
import { UserInfoProps } from "../EmailSignup/UserInfo/UserInfo";
import styles from "./Password.module.css";
import { RootState } from "@/store/store";
import { AuthInput } from "../../components";
import { useEffect } from "react";
import { langObj } from "@/data/language/language";

const Password = ({ setIsValid, setLoading }: UserInfoProps) => {
  const lang = useSelector((state: RootState) => state.settings.language);
  const { password, password_confirm } = useSelector(
    (state: RootState) => state.signup
  );

  useEffect(() => {
    if (password && password_confirm && password === password_confirm) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [password, password_confirm]);

  return (
    <div className={styles.wrapper}>
      <AuthInput
        title={langObj[lang].password.title}
        field="password"
        setLoading={setLoading}
      />
      <AuthInput
        title={langObj[lang].password.title2}
        field="password_confirm"
        setLoading={setLoading}
      />
    </div>
  );
};

export default Password;
