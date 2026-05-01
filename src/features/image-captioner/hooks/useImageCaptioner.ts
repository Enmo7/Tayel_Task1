import { compressImageFile } from './../utils/imageUtils';
import { useCallback, useEffect, useState } from 'react';
import { generateCaption } from '../services/captionApi';
import type { ApiResponse, CaptionHistoryItem, ToastMessage, UploadedImage } from '../types';
import {  readImageFile, validateImageFiles } from '../utils/files';
import { loadCaptionHistory, saveCaptionHistory, trimCaptionHistory } from '../utils/historyStorage';
import { useApi } from './useApi';
import { generateCaptionApi } from '../services/captionService';
import { getHistory } from '../services/historyService';
export function useImageCaptioner() {
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [history, setHistory] = useState<CaptionHistoryItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<ToastMessage | null>(null);
  const { request, loading } = useApi();

  useEffect(() => {
    saveCaptionHistory(history);
  }, [history]);

  useEffect(() => {
    if (!toast) return;

    const timer = window.setTimeout(() => setToast(null), 2600);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const showToast = useCallback((text: string, intent: ToastMessage['intent'] = 'success') => {
    setToast({ id: crypto.randomUUID(), text, intent });
  }, []);

  const addFiles = useCallback(async (fileList: FileList | File[]) => {
    const files = Array.from(fileList);
    if (files.length === 0) return;

    setError(null);
    const { accepted, rejectedCount } = validateImageFiles(files);

    if (rejectedCount > 0) {
      setError('Some files were skipped. Use JPG, PNG, or WebP images under 5MB.');
    }

    const nextImages = await Promise.allSettled(accepted.map(readImageFile));
    const readableImages = nextImages.flatMap((result) => result.status === 'fulfilled' ? [result.value] : []);

    if (readableImages.length > 0) {
      setImages((current) => [...current, ...readableImages]);
    }

    const failedReads = nextImages.length - readableImages.length;
    if (failedReads > 0) {
      setError(`${failedReads} image${failedReads === 1 ? '' : 's'} could not be read.`);
    }
  }, []);

  const removeImage = useCallback((id: string) => {
    setImages((current) => current.filter((image) => image.id !== id));
    setError(null);
  }, []);

  const loadHistory = useCallback(async () => {
    try {
     const data = await getHistory(request);
    const latestFive = data
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5);

      setHistory(latestFive);
    } catch (err) {
      console.error(err);
    }
  }, [request]);

  const generateForImage = useCallback(async (image: UploadedImage) => {
    setImages((current) => current.map((item) =>
      item.id === image.id ? { ...item, status: 'analyzing', error: undefined } : item
    ));

    try {
      
      const response = await fetch(image.url);
      const blob = await response.blob();
      const originalFile = new File([blob], image.name, { type: image.type });
      
      const compressedFile = await compressImageFile(originalFile);
 
      const formData = new FormData();
      formData.append('image', compressedFile); 
      formData.append('mimeType', image.type);

      const caption = await generateCaptionApi(request, formData);
      console.log(caption);
      
      setImages((current) => current.map((item) =>
        item.id === image.id ? { ...item, status: 'complete', caption: caption } : item
      ));

      await loadHistory();

    } catch (err: any) {
      const message = err.response?.data?.error || 'failed to generate Image caption.';
      setImages((current) => current.map((item) =>
        item.id === image.id ? { ...item, status: 'error', error: message } : item
      ));
      showToast(message, 'error');
    }
  }, [request, showToast]);

  const generateAll = useCallback(() => {
    images
      .filter((image) => image.status === 'pending' || image.status === 'error')
      .forEach((image) => void generateForImage(image));
  }, [generateForImage, images]);

  const copyCaption = useCallback(async (caption: string) => {
    await navigator.clipboard.writeText(caption);
    showToast('Caption copied.');
  }, [showToast]);

  return {
    images,
    history, 
    loadHistory,
    loading,
    error,
    toast,
    addFiles,
    removeImage,
    generateForImage,
    generateAll,
    copyCaption,
  };
}
