import { useSelector } from "react-redux";
import Message from "../Message/Message";
import styles from "./MessageContainer.module.css";
import { RootState } from "@/store/store";

const MessageContainer = () => {
  const messages = useSelector((state: RootState) => state.message.messages);

  return (
    <div className={styles.wrapper}>
      {messages.map((message, index) => (
        <Message message={message} index={index} key={index} />
      ))}
    </div>
  );
};

export default MessageContainer;
