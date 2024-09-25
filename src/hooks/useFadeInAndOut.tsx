/**
 * useFadeInAndOut 훅은 요소에 fade-in 및 fade-out 애니메이션 효과를 적용하는 데 사용됩니다.
 *
 * @param {React.MutableRefObject<HTMLElement | null>} containerRef - 애니메이션 효과를 적용할 HTML 요소의 참조입니다.
 * @param {boolean} isFadeIn - true일 경우 fade-in 효과를 적용하고, false일 경우 fade-out 효과를 적용합니다.
 * @param {CSSModuleClasses} styles - fade-in과 fade-out 효과에 사용될 CSS 모듈 클래스입니다.
 * @param {number} [duration=300] - 애니메이션 효과의 지속 시간 (밀리초)입니다. 기본값은 300ms입니다.
 *
 * @returns {{ closed: boolean }} - 현재 요소가 닫혀 있는지 여부를 나타내는 객체를 반환합니다.
 * closed가 true인 경우, 요소는 화면에 보이지 않습니다.
 *
 * @example
 * import React, { useRef, useState } from 'react';
 * import useFadeInAndOut from './useFadeInAndOut';
 * import styles from './styles.module.css'; // CSS 모듈을 임포트합니다.
 *
 * const MyComponent = () => {
 *   const [isVisible, setIsVisible] = useState(false);
 *   const containerRef = useRef(null);
 *
 *   const { closed } = useFadeInAndOut(containerRef, isVisible, styles);
 *
 *   return (
 *     <div>
 *       <button onClick={() => setIsVisible(true)}>Open Modal</button>
 *       <button onClick={() => setIsVisible(false)}>Close Modal</button>
 *       <div
 *         ref={containerRef}
 *         className={closed ? styles.hidden : styles.visible}
 *       >
 *         <h1>모달 내용</h1>
 *       </div>
 *     </div>
 *   );
 * };
 */

import { useEffect, useRef, useState } from "react";

const useFadeInAndOut = (
  containerRef: React.MutableRefObject<HTMLElement | null>,
  isFadeIn: boolean, // true: fadeIn 효과 false: fadeOut 효과
  styles: CSSModuleClasses,
  duration: number = 300
) => {
  const [animate, setAnimate] = useState(false);
  const [visible, setVisible] = useState(false);
  const styleRef = useRef<HTMLStyleElement | null>(null);
  const timerRef = useRef<number | null>(null);

  // animation과 duration 속도를 정확히 일치시키기 어려움
  // 가끔 모달이 닫혔다 잠시 보였다 사라지는 경우가 생김
  // 어느 정도 차이가 있어야 함
  // 너무 짧아서 gif에 담겨지지 않음
  const cssDuration = (duration - 50) / 1000;

  console.log(isFadeIn);

  useEffect(() => {
    // 변경 시작
    setAnimate(true);

    // 스타일 시트가 있는 경우 재사용
    if (!styleRef.current) {
      // 새 시트 생성
      const fadeAnimationStyleSheet = document.createElement("style");
      // 속성 추가
      fadeAnimationStyleSheet.setAttribute("type", "text/css");
      fadeAnimationStyleSheet.setAttribute(
        "data-styleSheet",
        "fade-animation-styleSheet"
      );
      // 헤드에 해당 시트 추가하기
      document.head.appendChild(fadeAnimationStyleSheet);
      // 생성된 시트를 ref에 넣어 줌
      styleRef.current = fadeAnimationStyleSheet;

      // keyframes 동적 추가
      // fadeIn 효과
      const fadeInKeyframes = `
      @keyframes fadeIn {
        0% { opacity: 0;}
        100% { opacity: 1;}
      }
    `;
      // fadeOut 효과
      const fadeOutKeyframes = `
      @keyframes fadeOut {
        0% { opacity: 1; }
        100% { opacity: 0; }
      }
    `;

      // 새로 생성한 시트에 keyframes 추가
      fadeAnimationStyleSheet.sheet?.insertRule(
        fadeInKeyframes,
        fadeAnimationStyleSheet.sheet.cssRules.length
      );
      fadeAnimationStyleSheet.sheet?.insertRule(
        fadeOutKeyframes,
        fadeAnimationStyleSheet.sheet.cssRules.length
      );
    }

    // Fade 애니메이션 함수
    const handleFadeAnimation = () => {
      if (!containerRef.current) return;

      if (isFadeIn) {
        containerRef.current.classList.remove(styles["fade-out"]);
        containerRef.current.classList.add(styles["fade-in"]);
        // 모달을 열 대 fadeIn 애니메이션 적용
        containerRef.current.style.animation = `fadeIn ${cssDuration}s forwards`;
        // display: flex 적용
        containerRef.current.style.display = "flex";
        containerRef.current.style.justifyContent = "center";
        containerRef.current.style.alignItems = "center";
      } else {
        containerRef.current.classList.remove(styles["fade-in"]);
        containerRef.current.classList.add(styles["fade-out"]);
        // 모달을 닫을 때 fadeOut 애니메이션 적용
        containerRef.current.style.animation = `fadeOut ${cssDuration}s forwards`;
      }

      // 애니메이션 클래스 제거 타이머: 애니매이션 진행 중일 때 ui 상태 변경 방지
      timerRef.current = setTimeout(() => {
        // 임시 클래스 삭제하기
        if (!containerRef.current) return;
        containerRef.current?.classList.remove(
          styles["fade-in"],
          styles["fade-out"]
        );
        // animation 스타일 삭제
        containerRef.current.style.removeProperty("animation");
      }, duration);
    };

    handleFadeAnimation();

    // 적용시킬 효과와 실제 보이는 것과 일치시킴
    setVisible(isFadeIn);

    // 변경 종료
    setAnimate(false);

    // cleanup 함수
    return () => {
      // useEffect가 완료되면 스타일 시트 제거
      if (styleRef.current) {
        document.head.removeChild(styleRef.current);
        styleRef.current = null; // 참조 초기화
      }

      // 타이머 정리(청소)
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isFadeIn, visible, duration]);

  console.log("visible", visible);
  console.log("animate", animate);

  const closed = !visible && !animate;

  console.log("모달 닫기", closed);

  return { closed };
};

export default useFadeInAndOut;
