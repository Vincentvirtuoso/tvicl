import { useState, useEffect } from "react";
import api from "../api/axiosInstance";

const useAgent = () => {
  const [agent, setAgent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAgent = async () => {
    setLoading(true);
    try {
      const res = await api(`/agents`);

      setAgent(res.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAgent();
  }, []);

  return { agent, loading, error, fetchAgent };
};

export default useAgent;
