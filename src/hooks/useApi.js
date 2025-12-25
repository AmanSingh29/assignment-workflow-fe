import { useState, useCallback } from "react";
import axiosInstance from "../api/axiosInstance";
import { getErrorMessage } from "../utils/getErrorMessage";

export function useApi() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const callApi = useCallback(
    async ({ url, method = "get", body, query, headers }) => {
      setLoading(true);
      setError(null);

      try {
        const response = await axiosInstance.request({
          url,
          method,
          data: body,
          params: query,
          headers,
        });

        return response.data;
      } catch (err) {
        const message = getErrorMessage(err);
        setError(message);
        throw err; // allow caller to handle if needed
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return {
    callApi,
    loading,
    error,
  };
}
