import type { UploadedImage } from '../types';

export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'] as const;
export const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024;

export interface FileValidationResult {
  accepted: File[];
  rejectedCount: number;
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';

  const units = ['Bytes', 'KB', 'MB', 'GB'] as const;
  const unitIndex = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  const value = bytes / 1024 ** unitIndex;

  return `${Number(value.toFixed(2))} ${units[unitIndex]}`;
}

export function validateImageFiles(files: File[]): FileValidationResult {
  const accepted = files.filter((file) => {
    return ACCEPTED_IMAGE_TYPES.includes(file.type as (typeof ACCEPTED_IMAGE_TYPES)[number])
      && file.size <= MAX_IMAGE_SIZE_BYTES;
  });

  return {
    accepted,
    rejectedCount: files.length - accepted.length,
  };
}

export function readImageFile(file: File): Promise<UploadedImage> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      if (typeof reader.result !== 'string') {
        reject(new Error('Could not read this image.'));
        return;
      }

      resolve({
        id: crypto.randomUUID(),
        url: reader.result,
        name: file.name,
        size: formatFileSize(file.size),
        type: file.type,
        status: 'pending',
      });
    });

    reader.addEventListener('error', () => reject(new Error('Could not read this image.')));
    reader.readAsDataURL(file);
  });
}
