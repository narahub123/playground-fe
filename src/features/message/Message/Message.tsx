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

interface MessageProps {
  message: MessageType;
  index: number;
}

const Message = ({ message, index }: MessageProps) => {
  const dispatch = useDispatch();
  const { status, text } = message;
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
      : undefined;

  const handleDelete = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
    e.stopPropagation();
    e.preventDefault();

    dispatch(deleteMessage(index));
  };
  return (
    <div
      className={`${styles.container} ${statusCond}`}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
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
