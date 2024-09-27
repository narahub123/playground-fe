import { CONSTANT } from "@/constants";
import styles from "./UserInfo.module.css";
import { AuthInput } from "@/features/authentication/components";
import { LuEye } from "react-icons/lu";
import { signupLists } from "@/data";

const UserInfo = () => {
  return (
    <div className={styles.wrapper}>
      <section className={styles.field}>
        <AuthInput title="이름" limit={CONSTANT.MAX_USERNAME} />
      </section>
      <section className={styles.field}>
        <AuthInput title="성별" list={signupLists.genderList} />
      </section>
      <section className={styles.field}>
        <AuthInput title="이메일" extra={<LuEye className="icon" />} />
      </section>
      <section className={styles.container}>
        <p className={styles.title}>생년월일</p>
        <p className={styles.detail}>어쩌구 저쩌구</p>
        <div className={styles.birth}>
          <span className={styles.field}>
            <AuthInput title="년" list={signupLists.calendarList.yearList} />
          </span>
          <span className={styles.field}>
            <AuthInput title="월" />
          </span>
          <span className={styles.field}>
            <AuthInput title="일" />
          </span>
        </div>
      </section>
    </div>
  );
};

export default UserInfo;
