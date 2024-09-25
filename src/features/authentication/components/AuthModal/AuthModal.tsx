import { LuX } from "react-icons/lu";
import styles from "./AuthModal.module.css";
import { useRef } from "react";
import {
  useClickOutside,
  useContainerFocusTrap,
  useFadeInAndOut,
} from "@/hooks";
import { CONSTANT } from "@/constants";

interface AuthModalProps {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthModal = ({ openModal, setOpenModal }: AuthModalProps) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
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

  // 모달 밖을 클릭하면 모달창이 닫힘
  useClickOutside(containerRef, setOpenModal);

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
