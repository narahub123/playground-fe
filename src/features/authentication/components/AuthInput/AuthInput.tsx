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
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [focused, setFocused] = useState(false);
  const [text, setText] = useState("");

  // focus 조건
  const focusCond = focused || text !== "" ? styles.focused : "";

  // tab / shift + tab 이동을 위한 훅
  useEffect(() => {
    if (!inputRef.current || !wrapperRef.current) return;
    // 포커스시 input으로 포커스 이동
    // wrapper을 포커스 불가 변경
    if (focused) {
      inputRef.current.focus();
      wrapperRef.current.tabIndex = -1;
    }

    // wrapper에 포커스 가능으로 변경
    return () => {
      if (!wrapperRef.current) return;
      wrapperRef.current.tabIndex = 0;
    };
  }, [focused]);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setText(value);
  };

  return (
    // AuthInput의 틀: 높이는 고정되어 있고 width는 가변적임
    <div
      className={`${styles.wrapper} ${focusCond}`}
      onClick={() => setFocused(true)}
      onFocus={() => setFocused(true)}
      tabIndex={0}
      ref={wrapperRef}
    >
      {/* 목록이 있는 경우 메인없는 경우에는 wrapper가 하나 더 있는 것임 */}
      {/* 목록이 없는 경우를 상정해서 flex: 1 설정 */}
      <span className={`${styles.main} ${focusCond}`}>
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
                {/* 현재 글자수 확인 */}
                <span className={styles.length}>{text.length}</span> / {limit}
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
            maxLength={limit} // 글자수 제한
            onChange={(e) => handleChangeInput(e)}
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
