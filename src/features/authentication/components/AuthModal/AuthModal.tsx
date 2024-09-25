import { LuX } from "react-icons/lu";
import styles from "./AuthModal.module.css";
import { useRef } from "react";
import {
  useClickOutside,
  useContainerFocusTrap,
  useFadeInAndOut,
} from "@/hooks";
import { CONSTANT } from "@/constants";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setOpenModal } from "@/store/slices/modalSlice";
import { Outlet, useNavigate } from "react-router-dom";

const AuthModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const firstFocusableRef = useRef<HTMLButtonElement | null>(null);
  const lastFocusableRef = useRef<HTMLButtonElement | null>(null);
  const openModal = useSelector((state: RootState) => state.modal.openModal);

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
    CONSTANT.MODAL_DURATION,
    () => navigate("/"),
    "out"
  );

  // 모달 밖을 클릭하면 모달창이 닫힘
  useClickOutside(containerRef);

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
          onClick={() => {
            dispatch(setOpenModal(false));
          }}
          ref={firstFocusableRef}
        >
          <LuX className="icon" />
        </button>
        <Outlet />
      </div>
    </div>
  );
};

export default AuthModal;
