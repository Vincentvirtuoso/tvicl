import { useState, useEffect } from "react";

export function useScreen() {
  const isClient = typeof window !== "undefined";

  function getScreenInfo() {
    if (!isClient) {
      return {
        width: 0,
        height: 0,
        isSmallMobile: false,
        isMobile: false,
        isTablet: false,
        isDesktop: false,
        isLargeDesktop: false,
        orientation: "portrait",
        isTouch: false,
      };
    }

    const width = window.innerWidth;
    const height = window.innerHeight;
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;

    return {
      width,
      height,
      isSmallMobile: width < 480,
      isMobile: width < 640,
      isTablet: width >= 640 && width < 1024,
      isDesktop: width >= 1024,
      isLargeDesktop: width >= 1440,
      orientation: width > height ? "landscape" : "portrait",
      isTouch,
    };
  }

  const [screen, setScreen] = useState(getScreenInfo);

  useEffect(() => {
    if (!isClient) return;

    let timeout;
    const handleResize = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setScreen(getScreenInfo());
      }, 200);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener("resize", handleResize);
    };
  }, [isClient]);

  return screen;
}
