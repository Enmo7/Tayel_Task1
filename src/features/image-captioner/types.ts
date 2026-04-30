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
