/* eslint-disable react-hooks/exhaustive-deps */
import { FiCheck, FiCopy } from "react-icons/fi";
import useClipboard from "../../hooks/useClipboard";
import { useToast } from "../../context/ToastManager";
import { useEffect } from "react";

function CopyButton({ textToCopy, toastPosition = "bottom-right" }) {
  const { copy, isCopied, error } = useClipboard();
  const { addToast } = useToast();

  useEffect(() => {
    if (!isCopied) return;
    addToast("Link copied", "success", {
      duration: 2500,
      position: toastPosition,
    });
  }, [isCopied]);

  if (error) {
    addToast("Link copied", "error", {
      duration: 2500,
      position: toastPosition,
    });
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
