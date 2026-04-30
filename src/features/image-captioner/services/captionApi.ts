export interface CaptionRequest {
  imageUrl: string;
  mimeType: string;
  fileName: string;
}

interface CaptionApiResponse {
  caption?: unknown;
}

const captionApiUrl = import.meta.env.VITE_CAPTION_API_URL as string | undefined;
const mockCaptions = [
  'A clean visual snapshot with clear structure, strong contrast, and content ready to be described.',
  'An uploaded image prepared for analysis, with the main subject and visual details ready for captioning.',
  'A captured moment with enough visual context to generate a concise and useful caption.',
] as const;

export async function generateCaption({ imageUrl, mimeType, fileName }: CaptionRequest): Promise<string> {
  if (!captionApiUrl) {
    return generateMockCaption(fileName);
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

async function generateMockCaption(fileName: string): Promise<string> {
  await new Promise((resolve) => window.setTimeout(resolve, 1400));

  const captionIndex = Math.abs(hashText(fileName)) % mockCaptions.length;
  return mockCaptions[captionIndex];
}

function hashText(text: string): number {
  return Array.from(text).reduce((hash, character) => {
    return ((hash << 5) - hash) + character.charCodeAt(0);
  }, 0);
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
