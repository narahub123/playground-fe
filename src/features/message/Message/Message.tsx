import {
  LuBadgeAlert,
  LuBadgeCheck,
  LuBadgeHelp,
  LuBadgeInfo,
  LuBadgeX,
  LuX,
} from "react-icons/lu";
import styles from "./Message.module.css";
import { MessageType } from "@/types";
import { useDispatch } from "react-redux";
import { deleteMessage } from "@/store/slices/messageSlice";
import { useEffect, useRef } from "react";
import { CONSTANT } from "@/constants";

interface MessageProps {
  message: MessageType;
  index: number;
}

const Message = ({ message, index }: MessageProps) => {
  const dispatch = useDispatch();
  const msgRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLButtonElement>(null);
  const { status, text } = message;

  // fade in/fade down / fade down 효과
  useEffect(() => {
    if (index === 0) {
      msgRef.current?.classList.add(styles[`fade-in`]);
    } else if (index === 5) {
      msgRef.current?.classList.add(styles[`fade-out`]);

      const timer = setTimeout(() => {
        dispatch(deleteMessage(index));
      }, 300);

      return () => clearTimeout(timer);
    } else {
      msgRef.current?.classList.add(styles[`fade-down`]);
    }

    const handleAnimationEnd = () => {
      msgRef.current?.classList.remove(
        styles[`fade-in`],
        styles[`fade-down`],
        styles[`fade-out`]
      );
    };

    msgRef.current?.addEventListener("animationend", handleAnimationEnd);

    return () => {
      msgRef.current?.removeEventListener("animationend", handleAnimationEnd);
    };
  }, [index, message]);

  useEffect(() => {
    if (!msgRef.current) return;

    const newTimer = setTimeout(() => {
      msgRef.current?.classList.add(styles[`fade-out`]);

      setTimeout(() => {
        dispatch(deleteMessage(index));
      }, 300);
    }, CONSTANT.MESSAGE_DURATION * (CONSTANT.MAX_MESSAGES - index));

    return () => clearTimeout(newTimer);
  }, []);

  useEffect(() => {
    if (!iconRef.current) return;

    iconRef.current.focus();
  }, []);

  const statusCond =
    status === "success"
      ? styles.success
      : status === "error"
      ? styles.error
      : status === "warning"
      ? styles.warning
      : status === "info"
      ? styles.info
      : status === "help"
      ? styles.help
      : "";

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    e.preventDefault();

    msgRef.current?.classList.add(styles[`fade-out`]);
    setTimeout(() => {
      dispatch(deleteMessage(index));
    }, 500); // fade-out 애니메이션 후 삭제
  };

  return (
    <div
      className={`${styles.container} ${statusCond}`}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
      ref={msgRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby={`message-title-${index}`}
      aria-describedby={`message-content-${index}`}
    >
      <span
        className={`${styles.icon} ${statusCond}`}
        id={`message-title-${index}`}
      >
        {status === "success" ? (
          <LuBadgeCheck className={`icon`} aria-label="성공" />
        ) : status === "error" ? (
          <LuBadgeAlert className={`icon`} aria-label="에러" />
        ) : status === "warning" ? (
          <LuBadgeX className={`icon`} aria-label="경고" />
        ) : status === "info" ? (
          <LuBadgeInfo className={`icon`} aria-label="정보" />
        ) : status === "help" ? (
          <LuBadgeHelp className={`icon`} aria-label="도움" />
        ) : undefined}
      </span>
      <span className={styles.content} id={`message-content-${index}`}>
        {text}
      </span>
      <button
        className={`icon ${styles.close}`}
        ref={iconRef}
        onClick={(e) => handleDelete(e)}
      >
        <LuX aria-label="메시지 닫기" />
      </button>
    </div>
  );
};

export default Message;
