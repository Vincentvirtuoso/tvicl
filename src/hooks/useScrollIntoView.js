import { useCallback } from "react";

export const useScrollIntoView = () => {
  const scrollToRef = useCallback((ref) => {
    if (ref?.current) {
      ref.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, []);

  return scrollToRef;
};
