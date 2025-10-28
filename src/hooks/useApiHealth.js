import { useEffect, useState } from "react";
import { useToast } from "../context/ToastManager";
import { checkApiHealth } from "../api/axiosInstance";

export const useApiHealth = (intervalMs = 15000) => {
  const [apiStatus, setApiStatus] = useState({ ok: true, lastChecked: null });

  const { addToast: toast } = useToast();

  useEffect(() => {
    let mounted = true;

    const runCheck = async () => {
      const result = await checkApiHealth();
      if (!mounted) return;

      setApiStatus({
        ok: result.ok,
        lastChecked: new Date().toISOString(),
      });

      if (!result.ok) {
        toast.error("⚠️ API Connection Lost");
      } else {
        console.log("✅ API Healthy");
      }
    };

    // Run immediately once
    runCheck();

    // Run every X seconds
    const interval = setInterval(runCheck, intervalMs);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, [intervalMs]);

  return apiStatus;
};
