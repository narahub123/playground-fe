import { LuX } from "react-icons/lu";
import styles from "./AuthModal.module.css";

interface AuthModalProps {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthModal = ({ openModal, setOpenModal }: AuthModalProps) => {
  return (
    <div className={`${styles.wrapper} ${openModal ? styles.open : ""}`}>
      <div className={styles.container}>
        {/* <EmailSignup /> */}
        <button
          className={`${styles.close}`}
          onClick={() => setOpenModal(false)}
        >
          <LuX className="icon" />
        </button>
      </div>
    </div>
  );
};

export default AuthModal;
