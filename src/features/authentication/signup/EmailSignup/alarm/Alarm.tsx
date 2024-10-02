import { AuthCheck } from "@/features/authentication/components";
import { UserInfoProps } from "../UserInfo/UserInfo";
import styles from "./Alarm.module.css";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { langObj } from "@/data/language/language";
import { useEffect } from "react";

const Alarm = ({ setIsValid }: UserInfoProps) => {
  const lang = useSelector((state: RootState) => state.settings.language);

  useEffect(() => {
    setIsValid(true);
  }, []);

  return (
    <div className={styles.container}>
      <AuthCheck
        title={langObj[lang].alarm.message}
        detail={langObj[lang].alarm.mdetail}
        subField="message"
      />
      <AuthCheck
        title={langObj[lang].alarm.comment}
        detail={langObj[lang].alarm.cdetail}
        subField="comment"
      />
      <AuthCheck
        title={langObj[lang].alarm.following}
        detail={langObj[lang].alarm.fdetail}
        subField="following"
      />
      <AuthCheck
        title={langObj[lang].alarm.newpost}
        detail={langObj[lang].alarm.ndetail}
        subField="newpost"
      />
    </div>
  );
};

export default Alarm;
