"use client";

import { useEffect } from 'react';

export default function SecurityModule() {
  useEffect(() => {
    // 1. 우클릭 방지 함수
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault(); // "원래 하려던 거(메뉴 뜨기) 하지 마"
    };

    // 2. 드래그 방지 (선택적으로 사용)
    // const handleSelectStart = (e: Event) => {
    //   e.preventDefault();
    // };

    // 이벤트 리스너 등록 (경비원 배치)
    document.addEventListener('contextmenu', handleContextMenu);
    // document.addEventListener('selectstart', handleSelectStart);

    // 청소하기 (컴포넌트 사라질 때 경비원 철수)
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      // document.removeEventListener('selectstart', handleSelectStart);
    };
  }, []);

  // 화면에는 아무것도 안 보여줌 (투명 경비원)
  return null;
}
