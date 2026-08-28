import { useLayoutEffect } from "react";

/**
 * Хук блокирует скролл body, пока isLocked === true
 */
export const useLockBodyScroll = (isLocked: boolean) => {
  useLayoutEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;

    if (isLocked) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = originalStyle;
    }

    // Очистка при размонтировании
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [isLocked]);
};
