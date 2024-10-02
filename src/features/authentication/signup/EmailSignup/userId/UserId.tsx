import styles from "./UserId.module.css";
import { UserInfoProps } from "../UserInfo/UserInfo";
import { AuthInput } from "@/features/authentication/components";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { langObj } from "@/data/language/language";
import { CONSTANT } from "@/constants";
import { useEffect } from "react";

const UserId = ({ setIsValid, setLoading }: UserInfoProps) => {
  const lang = useSelector((state: RootState) => state.settings.language);
  const id = useSelector((state: RootState) => state.signup.id);
  useEffect(() => {
    if (id) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [id]);
  
  return (
    <div className={styles.container}>
      <AuthInput
        title={langObj[lang].userId.title}
        field="id"
        setLoading={setLoading}
        limit={CONSTANT.MAX_USERID}
      />
    </div>
  );
};

export default UserId;
