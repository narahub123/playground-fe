import { LuX } from "react-icons/lu";
import styles from "./AuthModal.module.css";
import { useRef } from "react";
import { useContainerFocusTrap, useFadeInAndOut } from "@/hooks";
import { CONSTANT } from "@/constants";

interface AuthModalProps {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthModal = ({ openModal, setOpenModal }: AuthModalProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const firstFocusableRef = useRef<HTMLButtonElement | null>(null);
  const lastFocusableRef = useRef<HTMLButtonElement | null>(null);

  // 포커스 트랩
  useContainerFocusTrap(
    openModal,
    containerRef,
    firstFocusableRef,
    lastFocusableRef
  );

  // 모달 fade in and out 효과
  const { closed } = useFadeInAndOut(
    wrapperRef,
    openModal,
    styles,
    CONSTANT.MODAL_DURATION
  );

  if (closed) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className={`${styles.wrapper} `}
      ref={wrapperRef}
    >
      <div className={styles.container} ref={containerRef}>
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
