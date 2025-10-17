import { useState, useEffect, useRef } from "react";

export function useScrollTracker({ targetRef = null, throttle = 0 } = {}) {
  const [scrollY, setScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [direction, setDirection] = useState(null);
  const lastScrollY = useRef(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const target = targetRef?.current || document.documentElement;
      const scrollTop = targetRef?.current
        ? target.scrollTop
        : window.scrollY || document.documentElement.scrollTop;

      const scrollHeight = target.scrollHeight - target.clientHeight;
      const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

      // Direction detection
      const newDirection =
        scrollTop > lastScrollY.current
          ? "down"
          : scrollTop < lastScrollY.current
          ? "up"
          : direction;
      lastScrollY.current = scrollTop;

      setScrollY(scrollTop);
      setScrollProgress(progress);
      setDirection(newDirection);
    };

    const scrollHandler = throttle
      ? () => {
          if (timeoutRef.current) return;
          timeoutRef.current = setTimeout(() => {
            handleScroll();
            timeoutRef.current = null;
          }, throttle);
        }
      : handleScroll;

    const scrollTarget = targetRef?.current || window;
    scrollTarget.addEventListener("scroll", scrollHandler, { passive: true });

    handleScroll(); // initialize on mount

    return () => {
      scrollTarget.removeEventListener("scroll", scrollHandler);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [targetRef, throttle]);

  return { scrollY, scrollProgress, direction };
}
