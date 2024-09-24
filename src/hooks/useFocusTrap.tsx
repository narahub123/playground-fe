import { useEffect } from "react";
interface useFocusTrapProps {
  openModal: boolean;
  modalRef: React.MutableRefObject<HTMLElement | null>;
  firstFocusableRef: React.MutableRefObject<HTMLElement | null>;
  lastFocusableRef: React.MutableRefObject<HTMLElement | null>;
}
const useFocusTrap = ({
  openModal,
  modalRef,
  firstFocusableRef,
  lastFocusableRef,
}: useFocusTrapProps) => {
  useEffect(() => {
    // 모달이 열린 경우
    if (openModal) {
      // 모달이 열리면 외부 요소에 tabindex 설정
      // tab 사용 가능한 외부 요소 배열 생성
      const focusableElementsOutsideModal = Array.from(
        document.querySelectorAll(
          'a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
        )
        // 모달에 포함된 요소들은 제외함
      ).filter((el) => !modalRef.current?.contains(el)) as HTMLElement[];
      // 모든 외부 tab 가능 요소들에 tabIndex = -1을 주어서 tab 이동에 방해 발생을 막음
      focusableElementsOutsideModal.forEach((el) => {
        el.setAttribute("tabindex", "-1");
      });

      // 키 이벤트 핸들러
      const handleTabKey = (e: KeyboardEvent) => {
        // tab을 통한 이동
        if (e.key === "Tab") {
          // shift도 같이 누른 경우
          if (e.shiftKey) {
            // Shift + Tab
            if (document.activeElement === firstFocusableRef.current) {
              e.preventDefault();
              lastFocusableRef.current?.focus();
            }
          } else {
            // Tab
            if (document.activeElement === lastFocusableRef.current) {
              e.preventDefault();
              firstFocusableRef.current?.focus();
            }
          }
        }
      };

      document.addEventListener("keydown", handleTabKey);

      return () => {
        // Cleanup: 모달 외부 요소들의 tabindex 제거
        focusableElementsOutsideModal.forEach((el) => {
          el.removeAttribute("tabindex");
        });

        document.removeEventListener("keydown", handleTabKey);
      };
    }
  }, [openModal]);
};

export default useFocusTrap;
