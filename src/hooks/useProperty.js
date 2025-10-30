import { useState, useRef, useEffect, useCallback } from "react";
import api from "../api/axiosInstance";

export const usePropertyAPI = (userId = null, debounceMs = 400) => {
  const [data, setData] = useState({});
  const [loadingMap, setLoadingMap] = useState({}); // 🆕 loading per key
  const [errorMap, setErrorMap] = useState({}); // 🆕 error per key
  const controllerRef = useRef(null);
  const debounceTimer = useRef(null);
  const cache = useRef({});

  // 🔄 Cancel ongoing requests
  const cancelOngoing = () => {
    if (controllerRef.current) controllerRef.current.abort();
  };

  // ⚙️ Centralized Fetcher
  const fetchData = useCallback(
    async (endpoint, key, params = {}, options = {}) => {
      const cacheKey = `${endpoint}-${JSON.stringify(params)}`;

      // Serve cached data instantly if available
      if (cache.current[cacheKey]) {
        setData((prev) => ({ ...prev, [key]: cache.current[cacheKey] }));
        return;
      }

      cancelOngoing();
      const controller = new AbortController();
      controllerRef.current = controller;

      try {
        // 🆕 Start loading for this key
        setLoadingMap((prev) => ({ ...prev, [key]: true }));
        setErrorMap((prev) => ({ ...prev, [key]: null }));

        const res = await api.get(`/properties/${endpoint}`, {
          params,
          signal: controller.signal,
          ...options,
        });

        const result = res.data.data;
        setData((prev) => ({ ...prev, [key]: result }));
        cache.current[cacheKey] = result;
      } catch (err) {
        if (err?.name !== "AbortError") {
          setErrorMap((prev) => ({
            ...prev,
            [key]: err?.message || "Failed to fetch data",
          }));
        }
      } finally {
        // 🆕 Stop loading for this key
        setLoadingMap((prev) => ({ ...prev, [key]: false }));
      }
    },
    []
  );

  // 🧠 Debounced Fetch
  const debouncedFetch = useCallback(
    (endpoint, key, params) => {
      clearTimeout(debounceTimer.current);
      debounceTimer.current = setTimeout(
        () => fetchData(endpoint, key, params),
        debounceMs
      );
    },
    [fetchData, debounceMs]
  );

  // 🧩 CRUD Operations
  const createProperty = async (payload) =>
    api.post("/properties/create", payload);
  const updateProperty = async (id, payload) =>
    api.put(`/properties/${id}`, payload);
  const deleteProperty = async (id) => api.delete(`/properties/${id}`);
  const restoreProperty = async (id) => api.patch(`/properties/${id}/restore`);
  const verifyProperty = async (id) => api.patch(`/properties/${id}/verify`);

  // 📊 Analytics Fetchers
  const fetchAnalytics = useCallback(() => {
    Promise.all([
      fetchData("analytics/trending", "trending"),
      fetchData(`analytics/recommend/${userId}`, "recommended"),
      fetchData("analytics/top-searches", "topSearches"),
      fetchData("analytics/top-viewed", "topViewed"),
      fetchData("analytics/stats", "stats"),
      fetchData("analytics/average-price", "averagePrice"),
      fetchData("analytics/by-state", "listingsByState"),
      fetchData("analytics/recent", "recent"),
    ]);
  }, [fetchData, userId]);

  const fetchRelated = (propertyId) =>
    fetchData(`analytics/related/${propertyId}`, "related");

  // 🔍 Debounced search handler
  const searchProperties = (query) =>
    debouncedFetch("", "properties", { search: query });

  // 🧹 Cleanup
  useEffect(() => cancelOngoing, []);

  // 🧭 Utilities
  const isLoading = (key) => !!loadingMap[key];
  const getError = (key) => errorMap[key];

  return {
    data,
    loadingMap,
    errorMap,
    isLoading,
    getError,
    createProperty,
    updateProperty,
    deleteProperty,
    restoreProperty,
    verifyProperty,
    fetchAnalytics,
    fetchRelated,
    searchProperties,
    refetch: fetchAnalytics,
  };
};
