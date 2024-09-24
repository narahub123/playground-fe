import React, { createContext, useEffect, useRef, useState } from "react";

// 포커스 트랩 컨텍스트 타입 정의
interface FocusTrapContextType {
  setFirstFocusable: (ref: HTMLElement | null) => void;
  setLastFocusable: (ref: HTMLElement | null) => void;
  isContainerFocusTrap: boolean;
  setIsContainerFocusTrap: React.Dispatch<React.SetStateAction<boolean>>;
}

// context 생성하기
// createContext<전달하는 데이터 타입>(초기값: 주로 null)
export const FocusTrapContext = createContext<FocusTrapContextType | undefined>(
  undefined
);

// context.Provider 캡슐화
export const FocusTrapProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // containerFocusTrap 여부 상태
  const [isContainerFocusTrap, setIsContainerFocusTrap] = useState(false);

  // 첫 번째 포커스 가능한 요소에 대한 참조
  const firstFocusableRef = useRef<HTMLElement | null>(null);
  // 마지막 포커스 가능한 요소에 대한 참조
  const lastFocusableRef = useRef<HTMLElement | null>(null);

  // 첫 번째 포커스 가능한 요소를 설정하는 함수
  const setFirstFocusable = (ref: HTMLElement | null) => {
    firstFocusableRef.current = ref;
  };

  // 마지막 포커스 가능한 요소를 설정하는 함수
  const setLastFocusable = (ref: HTMLElement | null) => {
    lastFocusableRef.current = ref;
  };

  // 키보드 이벤트 처리
  useEffect(() => {
    const handleTabKey = (e: KeyboardEvent) => {
      // Tab 키가 눌렸을 때
      if (e.key === "Tab") {
        // Shift + Tab이 눌렸을 때 (역방향으로 포커스 이동)
        if (e.shiftKey) {
          if (document.activeElement === firstFocusableRef.current) {
            e.preventDefault();
            lastFocusableRef.current?.focus();
          }
        } else {
          // Tab이 눌렸을 때 (정방향으로 포커스 이동)
          if (document.activeElement === lastFocusableRef.current) {
            e.preventDefault();
            firstFocusableRef.current?.focus();
          }
        }
      }
    };

    document.addEventListener("keydown", handleTabKey);

    return () => {
      document.removeEventListener("keydown", handleTabKey);
    };
  }, []);

  return (
    <FocusTrapContext.Provider
      value={{
        setFirstFocusable,
        setLastFocusable,
        isContainerFocusTrap,
        setIsContainerFocusTrap,
      }}
    >
      {children}
    </FocusTrapContext.Provider>
  );
};
