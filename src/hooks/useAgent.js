import { useState, useEffect } from "react";
import api from "../api/axiosInstance";

const useAgent = (agentId) => {
  const [agent, setAgent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!agentId) return;

    const fetchAgent = async () => {
      setLoading(true);
      try {
        const res = await api(`/api/agents/${agentId}`);

        setAgent(res.data.agent);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAgent();
  }, [agentId]);

  return { agent, loading, error };
};

export default useAgent;
