import type { RefObject } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { AlertCircle, ImagePlus, WandSparkles } from 'lucide-react';
import type { UploadedImage } from '../types';
import { ImageCard } from './ImageCard';

interface ImageQueueProps {
  images: UploadedImage[];
  error: string | null;
  inputRef: RefObject<HTMLInputElement | null>;
  onFilesSelected: (files: FileList | File[]) => void;
  onGenerateAll: () => void;
  onGenerate: (image: UploadedImage) => void;
  onRemove: (id: string) => void;
  onCopy: (caption: string) => void;
}

export function ImageQueue({
  images,
  error,
  inputRef,
  onFilesSelected,
  onGenerateAll,
  onGenerate,
  onRemove,
  onCopy,
}: ImageQueueProps) {
  const canGenerate = images.some((image) => image.status === 'pending' || image.status === 'error');

  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="rounded-xl border border-slate-200 bg-white p-3 shadow-xl shadow-slate-200/60 sm:rounded-2xl sm:p-6"
    >
      <div className="mb-4 flex flex-col gap-3 sm:mb-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-black tracking-tight text-slate-950 sm:text-xl">Uploaded images</h2>
          <p className="mt-1 text-sm font-semibold text-slate-500">{images.length} image{images.length === 1 ? '' : 's'} in the queue</p>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-row">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm font-black text-slate-700 transition hover:bg-slate-50 sm:px-4"
          >
            <ImagePlus size={17} />
            Add images
          </button>
          <button
            type="button"
            onClick={onGenerateAll}
            disabled={!canGenerate}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-slate-950 px-3 py-2.5 text-sm font-black text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50 sm:px-4"
          >
            <WandSparkles size={17} />
            Generate all
          </button>
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        multiple
        className="hidden"
        accept="image/jpeg,image/png,image/webp"
        onChange={(event) => {
          if (event.target.files) {
            onFilesSelected(event.target.files);
            event.target.value = '';
          }
        }}
      />

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="mb-4 flex items-start gap-2 rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm font-bold leading-5 text-rose-700 sm:mb-5 sm:p-4"
          >
            <AlertCircle size={18} className="mt-0.5 flex-none" />
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid gap-4 sm:gap-5">
        <AnimatePresence initial={false}>
          {images.map((image) => (
            <ImageCard
              key={image.id}
              image={image}
              onGenerate={onGenerate}
              onRemove={onRemove}
              onCopy={onCopy}
            />
          ))}
        </AnimatePresence>
      </div>
    </motion.section>
  );
}
