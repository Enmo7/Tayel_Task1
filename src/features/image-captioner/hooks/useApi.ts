import { useState, useCallback } from 'react';
import axios, { AxiosRequestConfig } from 'axios';


const api = axios.create({
  baseURL: 'http://localhost:4000/api',
});

export const useApi = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const request = useCallback(async <T>(config: AxiosRequestConfig): Promise<T> => {
    setLoading(true);
    try {
      const response = await api.request<T>(config);
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Something went wrong';
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  }, []);

  return { request, loading };
};