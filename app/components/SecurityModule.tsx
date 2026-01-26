"use client"; // 이 줄이 맨 위에 꼭 있어야 해!

import { useEffect } from 'react';

export default function SecurityModule() {
  useEffect(() => {
    // 우클릭 방지 함수
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault(); // 메뉴 뜨지 마!
    };

    // 키보드 단축키 방지 (F12, Ctrl+U 등 소스보기 방지)
    const handleKeyDown = (e: KeyboardEvent) => {
      // F12 (개발자 도구)
      if (e.key === 'F12') {
        e.preventDefault();
      }
      // Ctrl+Shift+I (개발자 도구)
      if (e.ctrlKey && e.shiftKey && e.key === 'I') {
        e.preventDefault();
      }
      // Ctrl+U (소스 보기)
      if (e.ctrlKey && e.key === 'u') {
        e.preventDefault();
      }
    };

    // [중요] { capture: true } 옵션을 넣어서 이벤트 가로채기
    document.addEventListener('contextmenu', handleContextMenu, { capture: true });
    document.addEventListener('keydown', handleKeyDown, { capture: true });

    // 청소하기
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu, { capture: true });
      document.removeEventListener('keydown', handleKeyDown, { capture: true });
    };
  }, []);

  return null;
}
