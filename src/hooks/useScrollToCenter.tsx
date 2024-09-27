import { useEffect } from "react";

const useScrollToCenter = (
  index: number | undefined | null, // 현재 위치
  containerRef: React.RefObject<HTMLElement>, // 목록을 감싸는 컨네이너 참조 ref
  MIDDEL_INDEX: number = 4 // 가운데 올 순서
) => {
  useEffect(() => {
    if (!index || index < 0 || !containerRef.current) return;

    const container = containerRef.current;

    // 목록 아이템 하나당 높이 계산하기
    const itemHeight = container?.children[0].clientHeight;

    // 현재 아이템이 가운데 올 때 목록의 상단 높이 계산
    const scrollTop = itemHeight * (index - MIDDEL_INDEX);

    // 스크롤 이동 설정
    container.scrollTo({ top: scrollTop, behavior: "smooth" });
  }, [index, containerRef]);
};

export default useScrollToCenter;
