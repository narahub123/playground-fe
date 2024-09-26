import { LuChevronDown } from "react-icons/lu";
import styles from "./AuthInput.module.css";

interface AuthInputProps {
  title: string;
  limit?: number; // 최대 입력 가능 글자 수
  list?: [];
}

const AuthInput = ({ title, limit, list }: AuthInputProps) => {
  return (
    // AuthInput의 틀: 높이는 고정되어 있고 width는 가변적임
    <div className={styles.wrapper}>
      {/* 목록이 있는 경우 메인없는 경우에는 wrapper가 하나 더 있는 것임 */}
      {/* 목록이 없는 경우를 상정해서 flex: 1 설정 */}
      <span className={styles.main}>
        {/* 타이틀과 그밖에 정보를 제공 */}
        <div className={styles.info}>
          {/* 좌측 */}
          <span className={styles.left}>
            <p className={styles.title}>{title}</p>
          </span>
          {/* 우측 */}
          <span className={styles.right}>
            {limit && <p className={styles.count}>0 / {limit}</p>}
          </span>
        </div>
        {/* input 필드: 목록이 있는 것을 다루면 코드 추가 예정*/}
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
