import type { ChangeEvent, DragEvent, RefObject } from 'react';
import { motion } from 'motion/react';
import { ImagePlus, UploadCloud } from 'lucide-react';
import { CameraCapture } from './CameraCapture';

interface UploadDropzoneProps {
  inputRef: RefObject<HTMLInputElement | null>;
  onFilesSelected: (files: FileList | File[]) => void;
}

export function UploadDropzone({ inputRef, onFilesSelected }: UploadDropzoneProps) {
  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    onFilesSelected(event.dataTransfer.files);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      onFilesSelected(event.target.files);
      event.target.value = '';
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      className="rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl shadow-slate-200/60 sm:rounded-2xl sm:p-2"
    >
      <div
        role="button"
        tabIndex={0}
        onDragOver={(event) => event.preventDefault()}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') inputRef.current?.click();
        }}
        className="group grid min-h-[300px] cursor-pointer place-items-center rounded-lg border border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-center outline-none transition hover:border-cyan-400 hover:bg-cyan-50/50 focus-visible:ring-4 focus-visible:ring-cyan-200 sm:min-h-[360px] sm:rounded-xl sm:px-6"
      >
        <div>
          <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-white text-slate-950 shadow-sm ring-1 ring-slate-200 transition group-hover:-translate-y-1 sm:mb-5 sm:h-16 sm:w-16">
            <UploadCloud size={28} strokeWidth={2.1} />
          </div>
          <h2 className="text-xl font-black tracking-tight text-slate-950 sm:text-2xl">Drop images to caption</h2>
          <p className="mx-auto mt-2 max-w-sm text-sm font-medium leading-6 text-slate-500 sm:mt-3">
            Upload JPG, PNG, or WebP files. The app will read the image and produce a clean one-sentence caption.
          </p>
          <div className="mt-5 grid gap-2 min-[420px]:grid-cols-2 sm:mt-6">
            <span className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-slate-950 px-4 py-2.5 text-sm font-bold text-white shadow-sm">
              <ImagePlus size={17} />
              Browse images
            </span>
            <CameraCapture
              onCapture={(file) => onFilesSelected([file])}
              buttonClassName="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 shadow-sm transition hover:bg-slate-50"
            />
          </div>
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        multiple
        className="hidden"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFileChange}
      />
    </motion.div>
  );
}
