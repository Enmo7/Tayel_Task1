export interface CaptionRequest {
  imageUrl: string;
  mimeType: string;
  fileName: string;
}

interface CaptionApiResponse {
  caption?: unknown;
}

const captionApiUrl = import.meta.env.VITE_CAPTION_API_URL as string | undefined;

export async function generateCaption({ imageUrl, mimeType, fileName }: CaptionRequest): Promise<string> {
  if (!captionApiUrl) {
    throw new Error('Missing VITE_CAPTION_API_URL.');
  }

  const response = await fetch(captionApiUrl, {
    method: 'POST',
    body: buildCaptionFormData({ imageUrl, mimeType, fileName }),
  });

  if (!response.ok) {
    throw new Error(`Caption API failed with status ${response.status}.`);
  }

  const data = await response.json() as CaptionApiResponse;

  if (typeof data.caption !== 'string' || data.caption.trim().length === 0) {
    throw new Error('Caption API response must include a caption string.');
  }

  return data.caption;
}

function buildCaptionFormData({ imageUrl, mimeType, fileName }: CaptionRequest): FormData {
  const formData = new FormData();
  const imageBlob = dataUrlToBlob(imageUrl, mimeType);

  formData.append('image', imageBlob, fileName);
  formData.append('mimeType', mimeType);

  return formData;
}

function dataUrlToBlob(dataUrl: string, fallbackMimeType: string): Blob {
  const [metadata = '', base64Data] = dataUrl.split(',');

  if (!base64Data) {
    throw new Error('Invalid image data URL.');
  }

  const mimeType = metadata.match(/data:(.*?);base64/)?.[1] || fallbackMimeType;
  const binary = window.atob(base64Data);
  const bytes = new Uint8Array(binary.length);

  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }

  return new Blob([bytes], { type: mimeType });
}
