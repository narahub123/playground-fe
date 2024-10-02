import { useSelector } from "react-redux";
import { UserInfoProps } from "../EmailSignup/UserInfo/UserInfo";
import styles from "./Password.module.css";
import { RootState } from "@/store/store";
import { AuthInput } from "../../components";
import { useEffect } from "react";

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
      <AuthInput title="비밀번호" field="password" setLoading={setLoading} />
      <AuthInput
        title="비밀번호 확인"
        field="password_confirm"
        setLoading={setLoading}
      />
    </div>
  );
};

export default Password;
