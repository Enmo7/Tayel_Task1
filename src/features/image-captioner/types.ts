export type UploadStatus = 'pending' | 'analyzing' | 'complete' | 'error';
export type CameraStatus = 'idle' | 'requesting' | 'ready' | 'denied' | 'unavailable' | 'error';

export interface UploadedImage {
  id: string;
  url: string;
  name: string;
  size: string;
  type: string;
  status: UploadStatus;
  caption?: string;
  error?: string;
}

export interface CaptionHistoryItem {
  id: string;
  image: string;
  caption: string;
  date: string;
}

export type ToastIntent = 'success' | 'error';

export interface ToastMessage {
  id: string;
  text: string;
  intent: ToastIntent;
}

export interface ApiResponse {
  caption: string;
}

export interface CaptionRequest {
  imageUrl: string;
  mimeType: string;
  fileName: string;
}

export interface CaptionResponse {
  caption: string;
}

export interface HistoryItem {
  _id: string;
  imageUrl: string;
  englishCaption: string;
  arabicCaption: string;
  createdAt: string;
}


export interface HistoryResponse {
  history: HistoryItem[];
}