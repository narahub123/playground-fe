import { CONSTANT } from "@/constants";
import styles from "./UserInfo.module.css";
import { AuthInput } from "@/features/authentication/components";
import { LuEye } from "react-icons/lu";
import { signupLists } from "@/data";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const UserInfo = () => {
  const lang = useSelector((state: RootState) => state.settings.language);

  return (
    <div className={styles.wrapper}>
      <section className={styles.field}>
        <AuthInput
          title="이름"
          field="username"
          limit={CONSTANT.MAX_USERNAME}
        />
      </section>
      <section className={styles.field}>
        <AuthInput title="성별" field="gender" list={signupLists.genderList} />
      </section>
      <section className={styles.field}>
        <AuthInput
          title="이메일"
          field="email"
          extra={<LuEye className="icon" />}
        />
      </section>
      <section className={styles.container}>
        <p className={styles.title}>생년월일</p>
        <p className={styles.detail}>
          이정보는 공개적으로 표시되지 않습니다. 비즈니스, 반려동물 등 계정
          주제에 상관없이 나의 연령을 확인하세요.
        </p>
        <div className={styles.birth}>
          <span className={styles.field}>
            <AuthInput
              title="년"
              field="year"
              list={signupLists.calendarList.yearList}
            />
          </span>
          <span className={styles.field}>
            <AuthInput
              title="월"
              field="month"
              list={signupLists.calendarList.monthList(lang)}
            />
          </span>
          <span className={styles.field}>
            {/* year, month 추가 필요 */}
            <AuthInput
              title="일"
              field="date"
              list={signupLists.calendarList.dateList()}
            />
          </span>
        </div>
      </section>
    </div>
  );
};

export default UserInfo;
