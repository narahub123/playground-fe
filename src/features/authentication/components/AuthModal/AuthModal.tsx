import { LuX } from "react-icons/lu";
import styles from "./AuthModal.module.css";
import { useRef } from "react";
import { useContainerFocusTrap } from "@/hooks";

interface AuthModalProps {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthModal = ({ openModal, setOpenModal }: AuthModalProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const firstFocusableRef = useRef<HTMLButtonElement | null>(null);
  const lastFocusableRef = useRef<HTMLButtonElement | null>(null);

  useContainerFocusTrap(
    openModal,
    containerRef,
    firstFocusableRef,
    lastFocusableRef
  );

  return (
    <div
      role="dialog"
      aria-modal="true"
      className={`${styles.wrapper} ${openModal ? styles.open : ""}`}
      ref={containerRef}
    >
      <div className={styles.container}>
        <button
          className={`${styles.close}`}
          onClick={() => setOpenModal(false)}
          ref={firstFocusableRef}
        >
          <LuX className="icon" />
        </button>
        <button>호ㅑㅗㅑ</button>
        <button>akad </button>
        <span tabIndex={0}>didhifhil d</span>
        <div
          tabIndex={0}
          ref={lastFocusableRef as React.RefObject<HTMLDivElement>}
        >
          하이
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
