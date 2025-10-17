/* eslint-disable react-hooks/exhaustive-deps */
import { FiCheck, FiCopy } from "react-icons/fi";
import useClipboard from "../../hooks/useClipboard";
import { useToast } from "../../context/ToastManager";
import { useEffect } from "react";

function CopyButton({ textToCopy, position = "bottom-right", duration = 2 }) {
  duration *= 1000;
  const { copy, isCopied, error } = useClipboard(duration);
  const { addToast } = useToast();

  useEffect(() => {
    if (!textToCopy || !isCopied) return;
    addToast("Link copied", "success", { duration, position });
  }, [isCopied]);

  if (error) {
    addToast("Link copied", "error", { duration, position });
  }

  return (
    <button
      className="w-10 h-10 flex items-center justify-center bg-primary text-black absolute right-0"
      onClick={() => copy(textToCopy)}
    >
      {isCopied ? <FiCheck /> : <FiCopy />}
    </button>
  );
}

export default CopyButton;
