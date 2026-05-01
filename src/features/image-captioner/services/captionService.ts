import { AxiosRequestConfig } from 'axios';
import { CaptionResponse } from '../types';

export const generateCaptionApi = async (
  request: <T>(config: AxiosRequestConfig) => Promise<T>,
  formData: FormData
): Promise<string> => {
  try {
    const data = await request<CaptionResponse>({
      method: 'POST',
      url: '/caption', 
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data.caption;
  } catch (error) {
    console.error("Error in generateCaptionApi:", error);
    throw error;
  }
};