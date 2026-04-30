import { useCallback, useEffect, useState } from 'react';
import { generateCaption } from '../services/captionApi';
import type { CaptionHistoryItem, ToastMessage, UploadedImage } from '../types';
import { readImageFile, validateImageFiles } from '../utils/files';
import { loadCaptionHistory, saveCaptionHistory, trimCaptionHistory } from '../utils/historyStorage';

export function useImageCaptioner() {
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [history, setHistory] = useState<CaptionHistoryItem[]>(() => loadCaptionHistory());
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<ToastMessage | null>(null);

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

  const generateForImage = useCallback(async (image: UploadedImage) => {
    setImages((current) => current.map((item) => {
      return item.id === image.id ? { ...item, status: 'analyzing', error: undefined } : item;
    }));

    try {
      const caption = await generateCaption({
        imageUrl: image.url,
        mimeType: image.type,
        fileName: image.name,
      });

      setImages((current) => current.map((item) => {
        return item.id === image.id ? { ...item, status: 'complete', caption } : item;
      }));

      setHistory((current) => trimCaptionHistory([
        {
          id: `${Date.now()}-${image.id}`,
          image: image.url,
          caption,
          date: new Intl.DateTimeFormat(undefined, {
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
          }).format(new Date()),
        },
        ...current,
      ]));
    } catch (captionError) {
      const message = captionError instanceof Error
        ? captionError.message
        : 'Failed to generate caption. Try again.';

      setImages((current) => current.map((item) => {
        return item.id === image.id
          ? { ...item, status: 'error', error: message }
          : item;
      }));
      showToast('Caption generation failed.', 'error');
    }
  }, [showToast]);

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
    error,
    toast,
    addFiles,
    removeImage,
    generateForImage,
    generateAll,
    copyCaption,
  };
}
