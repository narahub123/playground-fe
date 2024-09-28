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
import { useEffect, useRef, useState } from "react";
import { CONSTANT } from "@/constants";

interface MessageProps {
  message: MessageType;
  index: number;
}

const Message = ({ message, index }: MessageProps) => {
  const dispatch = useDispatch();
  const msgRef = useRef<HTMLDivElement>(null);
  const { status, text } = message;
  const [timer, setTimer] = useState<number | undefined>(undefined);

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

  const handleDelete = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
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
    >
      <span className={`${styles.icon} ${statusCond}`}>
        {status === "success" ? (
          <LuBadgeCheck className={`icon`} />
        ) : status === "error" ? (
          <LuBadgeAlert className={`icon`} />
        ) : status === "warning" ? (
          <LuBadgeX className={`icon`} />
        ) : status === "info" ? (
          <LuBadgeInfo className={`icon`} />
        ) : status === "help" ? (
          <LuBadgeHelp className={`icon`} />
        ) : undefined}
      </span>
      <span className={styles.content}>{text}</span>

      <LuX
        className={`icon ${styles.close}`}
        onClick={(e) => handleDelete(e)}
      />
    </div>
  );
};

export default Message;
