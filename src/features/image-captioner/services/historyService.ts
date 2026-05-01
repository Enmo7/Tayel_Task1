import { AxiosRequestConfig } from 'axios';
import { HistoryItem, HistoryResponse } from '../types';



export const getHistory = async (
  request: <T>(config: AxiosRequestConfig) => Promise<T>
): Promise<HistoryItem[]> => {
  try {
    const data = await request<HistoryResponse>({
      method: 'GET',
      url: '/caption/history',
    });
    return data.history;
  } catch (error) {
    console.error("Error in historyService:", error);
    throw error;
  }
};


export const deleteHistoryItem = async (
  request: (config: AxiosRequestConfig) => Promise<any>, 
  id: string
) => {
  return await request({
    method: 'DELETE',
    url: `/caption/history/${id}`,
  });
};