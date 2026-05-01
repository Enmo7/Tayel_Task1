import imageCompression from 'browser-image-compression';

export const compressImageFile = async (imageFile: File): Promise<File> => {
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1024,
    useWebWorker: true,
  };

  try {
    return await imageCompression(imageFile, options);
  } catch (error) {
    throw new Error("Compression Error");
  }
};