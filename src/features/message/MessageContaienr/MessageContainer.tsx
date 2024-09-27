import Message from "../Message/Message";
import styles from "./MessageContainer.module.css";

const MessageContainer = () => {
  return (
    <div className={styles.wrapper}>
      <Message status="success" />
      <Message status="error" />
      <Message status="warning" />
      <Message status="info" />
      <Message status="help" />
    </div>
  );
};

export default MessageContainer;
