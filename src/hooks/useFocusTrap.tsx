/**
 * `useFocusTrap` 훅은 포커스 트랩 컨텍스트에서 값을 가져오는 커스텀 훅입니다.
 *
 * 이 훅은 `FocusTrapProvider` 내부에서만 사용될 수 있으며,
 * 포커스 가능한 요소를 설정하는 데 필요한 함수들을 반환합니다.
 *
 * @throws {Error} `FocusTrapProvider` 외부에서 사용될 경우 에러를 발생시킵니다.
 *
 * @returns {Object} 포커스 트랩과 관련된 함수들이 포함된 객체입니다.
 * @returns {Function} setFirstFocusable - 첫 번째 포커스 가능한 요소를 설정하는 함수입니다.
 * @returns {Function} setLastFocusable - 마지막 포커스 가능한 요소를 설정하는 함수입니다.
 * @returns {Function} setIsContainerFocusTrap - 특정 컨테이너에서 포커스 트랩을 활성화하는 함수입니다.
 *
 * ## 사용 예시
 *
 * ```tsx
 * import { useRef } from "react";
 * import useFocusTrap from "@/hooks/useFocusTrap";
 *
 * const MyComponent = () => {
 *   const { setFirstFocusable, setLastFocusable } = useFocusTrap();
 *   const firstButtonRef = useRef<HTMLButtonElement | null>(null);
 *   const lastButtonRef = useRef<HTMLButtonElement | null>(null);
 *
 *   return (
 *     <div>
 *       <button ref={firstButtonRef} onFocus={() => setFirstFocusable(firstButtonRef.current)}>첫 번째 버튼</button>
 *       <button>중간 버튼</button>
 *       <button ref={lastButtonRef} onFocus={() => setLastFocusable(lastButtonRef.current)}>마지막 버튼</button>
 *     </div>
 *   );
 * };
 * ```
 */

import { FocusTrapContext } from "@/contexts";
import { useContext } from "react";

// 커스텀 훅
const useFocusTrap = () => {
  // context 값 가져오기
  const context = useContext(FocusTrapContext);

  // context 유효성 검사
  if (!context) {
    throw new Error(
      "useFocusTrap 반드시 FocusTrapProvider 내부에서 사용되어야 합니다."
    );
  }

  // 값 반환
  return context;
};

export default useFocusTrap;
