import { useState, useCallback } from "react";

export default function useClipboard(timeout = 2000) {
  const [isCopied, setIsCopied] = useState(false);
  const [error, setError] = useState(null);

  const copy = useCallback(
    async (text = "") => {
      if (!text) {
        setError("Nothing to copy");
        return;
      }

      try {
        await navigator.clipboard.writeText(text);
        setIsCopied(true);
        setError(null);

        setTimeout(() => setIsCopied(false), timeout);
      } catch (err) {
        setError("Failed to copy text");
        console.error("Clipboard error:", err);
      }
    },
    [timeout]
  );

  return { copy, isCopied, error };
}
