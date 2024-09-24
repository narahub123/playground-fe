/**
 * useContainerFocusTrap 훅은 특정 컨테이너 내에서 포커스를 트랩합니다.
 *
 * @param shouldTrap - 포커스를 트랩할지 여부
 * @param containerRef - 포커스를 트랩할 컨테이너의 Ref
 * @param firstFocusableRef - 첫 번째 포커스 가능한 요소의 Ref
 * @param lastFocusableRef - 마지막 포커스 가능한 요소의 Ref
 *
 * @example
 * const containerRef = useRef<HTMLDivElement>(null);
 * const firstFocusableRef = useRef<HTMLButtonElement>(null);
 * const lastFocusableRef = useRef<HTMLButtonElement>(null);
 *
 * useContainerFocusTrap(isModalOpen, containerRef, firstFocusableRef, lastFocusableRef);
 */

import { useEffect, RefObject } from "react";
import useFocusTrap from "./useFocusTrap";

const useContainerFocusTrap = (
  shouldTrap: boolean,
  containerRef: RefObject<HTMLElement>,
  firstFocusableRef: RefObject<HTMLElement | null>,
  lastFocusableRef: RefObject<HTMLElement | null>
) => {
  const { setFirstFocusable, setLastFocusable, setIsContainerFocusTrap } =
    useFocusTrap();

  useEffect(() => {
    if (shouldTrap) {
      setIsContainerFocusTrap(true);
      // 모달 외부의 포커스 가능한 요소 가져오기
      const focusableElementsOutsideModal = Array.from(
        document.querySelectorAll(
          'a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
        )
      ).filter((el) => !containerRef.current?.contains(el)) as HTMLElement[];

      // 모달 외부 요소의 tabIndex를 -1로 설정
      focusableElementsOutsideModal.forEach((el) =>
        el.setAttribute("tabIndex", "-1")
      );

      // 첫 번째와 마지막 포커스 가능한 요소 설정
      setFirstFocusable(firstFocusableRef.current);
      setLastFocusable(lastFocusableRef.current);

      // 첫 번째 포커스 가능한 요소에 포커스
      firstFocusableRef.current?.focus();

      // 정리 함수
      return () => {
        // 모달 외부 요소의 tabIndex를 원래대로 되돌리기
        focusableElementsOutsideModal.forEach((el) =>
          el.removeAttribute("tabIndex")
        );

        setIsContainerFocusTrap(false);
      };
    }
  }, [
    shouldTrap,
    containerRef,
    firstFocusableRef,
    lastFocusableRef,
    setFirstFocusable,
    setLastFocusable,
  ]);
};

export default useContainerFocusTrap;
