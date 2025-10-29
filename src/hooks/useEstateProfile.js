import { useEffect, useState } from "react";
import api from "../api/axiosInstance";

export const useEstateProfile = () => {
  const [estate, setEstate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProfile = async () => {
    try {
      const res = await api.get("/api/estate/profile", {});
      setEstate(res.data.estate);
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching estate profile");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProfile();
  }, []);

  return { estate, loading, error, fetchProfile };
};
