import { LuChevronDown } from "react-icons/lu";
import styles from "./AuthInput.module.css";
import { ReactNode, useEffect, useRef, useState } from "react";

interface AuthInputProps {
  title: string;
  limit?: number; // 최대 입력 가능 글 자 수
  list?: []; // 목록
  extra?: ReactNode; // 추가 기능 삽입
}

const AuthInput = ({ title, limit, list, extra }: AuthInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [focused, setFocused] = useState(false);
  const focusCond = focused ? styles.focused : "";

  useEffect(() => {
    if (!inputRef.current) return;
    if (focused) {
      inputRef.current.focus();
    }
  }, [focused]);

  return (
    // AuthInput의 틀: 높이는 고정되어 있고 width는 가변적임
    <div
      className={`${styles.wrapper} ${focusCond}`}
      onClick={() => setFocused(true)}
      onFocus={() => setFocused(true)}
      tabIndex={0}
    >
      {/* 목록이 있는 경우 메인없는 경우에는 wrapper가 하나 더 있는 것임 */}
      {/* 목록이 없는 경우를 상정해서 flex: 1 설정 */}
      <span className={styles.main}>
        {/* 타이틀과 그밖에 정보를 제공 */}
        <div className={styles.info}>
          {/* 좌측 */}
          <span className={styles.left}>
            <p className={`${styles.title} ${focusCond}`}>{title}</p>
          </span>
          {/* 우측 */}
          <span className={styles.right}>
            {limit && focused && (
              <p className={styles.count}>
                <span className={styles.length}>0</span> / {limit}
              </p>
            )}
          </span>
        </div>
        {/* input 필드: 목록이 있는 것을 다루면 코드 추가 예정*/}
        <div className={`${styles.box} ${focusCond}`}>
          <input
            type="text"
            className={`${styles.input} ${focusCond}`}
            ref={inputRef}
            onBlur={() => setFocused(false)}
          />
          {/* 간단한 버튼 등을 삽입 가능 */}
          {extra}
        </div>
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
