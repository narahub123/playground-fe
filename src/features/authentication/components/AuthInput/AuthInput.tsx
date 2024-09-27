import { LuChevronDown } from "react-icons/lu";
import styles from "./AuthInput.module.css";
import { ReactNode, useEffect, useRef, useState } from "react";
import { AuthInputListType } from "@/types";
import AuthInputList from "../AuthInputList/AuthInputList";
import { useDispatch } from "react-redux";
import {
  BirthType,
  SignupState,
  updateField,
} from "@/store/slices/signupSlice";
import { debounce } from "@/utils";

interface AuthInputProps {
  title: string;
  field: string;
  limit?: number; // 최대 입력 가능 글 자 수
  list?: AuthInputListType[]; // 목록
  extra?: ReactNode; // 추가 기능 삽입
}

const AuthInput = ({ title, field, limit, list, extra }: AuthInputProps) => {
  const dispatch = useDispatch();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [focused, setFocused] = useState(false);
  const [text, setText] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [select, setSelect] = useState<AuthInputListType | undefined>(
    undefined
  );
  const [index, setIndex] = useState<number | undefined>(undefined);

  // focus 조건
  const focusCond = focused || text !== "" || select ? styles.focused : "";

  // open 조건
  const openCond = isOpen ? styles.open : undefined;

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

  // input 박스 값 입력
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setText(value);
    dispatch(updateField({ field: field as keyof SignupState, value }));
  };

  const debouncedHandleChangeInput = debounce<typeof handleChangeInput>(
    handleChangeInput,
    500
  );

  // 방향키로 값 입력
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!list) return;

    let newIndex = index;
    if (e.key === "ArrowDown") {
      if (index === undefined || index === list.length - 1) {
        newIndex = 0;
      } else {
        newIndex = index + 1;
      }
    } else if (e.key === "ArrowUp") {
      if (index === undefined || index === 0) {
        newIndex = list.length - 1;
      } else {
        newIndex = index - 1;
      }
    } else if (e.key === "Enter") {
      setIsOpen(!isOpen);
      const newField =
        field !== "year" && field !== "month" && field !== "date"
          ? field
          : "birth";
      const value =
        field !== "year" && field !== "month" && field !== "date"
          ? list[newIndex as number].value.toString()
          : {
              [field as keyof BirthType]: list[newIndex as number]
                .value as number,
            };
      dispatch(
        updateField({ field: newField as keyof SignupState, value: value })
      );
      return;
    } else if (e.key === "Escape") {
      setIsOpen(false);
      return;
    } else {
      return;
    }

    setIndex(newIndex);
    setSelect(list[newIndex as number]);
  };

  return (
    // AuthInput의 틀: 높이는 고정되어 있고 width는 가변적임
    <div
      className={`${styles.wrapper} ${focusCond}`}
      onMouseDown={() => {
        if (list) {
          setIsOpen((prev) => !prev);
        }
      }}
      onFocus={() => {
        setFocused(true);
        if (list && !isOpen) {
          setIsOpen(true);
        }
      }}
      onBlur={
        list
          ? () => {
              setFocused(false);
              setIsOpen(false);
              if (select) {
                const newField =
                  field !== "year" && field !== "month" && field !== "date"
                    ? field
                    : "birth";
                const value =
                  field !== "year" && field !== "month" && field !== "date"
                    ? select.value.toString()
                    : {
                        [field as keyof BirthType]: select.value as number,
                      };

                dispatch(
                  updateField({
                    field: newField as keyof SignupState,
                    value,
                  })
                );
              }
            }
          : undefined
      }
      onKeyDown={
        list
          ? (e) => {
              handleKeyDown(e);
            }
          : undefined
      }
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
          {list ? (
            <p>{select?.name}</p>
          ) : (
            <input
              type="text"
              className={`${styles.input} ${focusCond}`}
              ref={inputRef}
              onBlur={() => {
                setFocused(false);
              }}
              maxLength={limit} // 글자수 제한
              onChange={debouncedHandleChangeInput}
            />
          )}

          {/* 간단한 버튼 등을 삽입 가능 */}
          {extra}
        </div>
      </span>
      {list && (
        <span className={`${styles.icon} ${openCond}`}>
          <LuChevronDown className="icon" />
        </span>
      )}
      {/* 드롭박스 */}
      {list && (
        <AuthInputList
          list={list}
          index={index}
          isOpen={isOpen}
          setSelect={setSelect}
          setIsOpen={setIsOpen}
        />
      )}
    </div>
  );
};

export default AuthInput;
