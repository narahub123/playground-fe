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
