import {
  LuBadgeAlert,
  LuBadgeCheck,
  LuBadgeHelp,
  LuBadgeInfo,
  LuBadgeX,
  LuX,
} from "react-icons/lu";
import styles from "./Message.module.css";

interface MessageProps {
  status: string;
}

const Message = ({ status }: MessageProps) => {
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
  return (
    <div className={`${styles.container} ${statusCond}`}>
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
      <span className={styles.content}>본문</span>

      <LuX className={`icon ${styles.close}`} />
    </div>
  );
};

export default Message;
