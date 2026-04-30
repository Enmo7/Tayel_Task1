import { useRef } from 'react';
import { AnimatePresence } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';
import { AppHeader } from '../shared/components/AppHeader';
import { Toast } from '../shared/components/Toast';
import {
  HistorySidebar,
  ImageQueue,
  UploadDropzone,
  useImageCaptioner,
} from '../features/image-captioner';

const trustMarkers = ['Subject aware', 'Mood detection', 'Copy ready'] as const;

export default function App() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {
    images,
    history,
    error,
    toast,
    addFiles,
    removeImage,
    generateForImage,
    generateAll,
    copyCaption,
  } = useImageCaptioner();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <AppHeader />

      <main className="mx-auto flex max-w-7xl flex-col lg:flex-row">
        <section className="min-w-0 flex-1 px-3 py-5 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
          <div className="mx-auto max-w-3xl">
            <div className="mb-5 sm:mb-7">
              <p className="mb-2 text-[11px] font-black uppercase tracking-[0.22em] text-cyan-700 sm:mb-3 sm:text-xs">
                Visual caption studio
              </p>
              <h1 className="max-w-2xl text-3xl font-black leading-[1.05] tracking-tight text-slate-950 sm:text-5xl">
                Turn images into crisp captions.
              </h1>
              <p className="mt-3 max-w-2xl text-sm font-medium leading-6 text-slate-600 sm:mt-4 sm:text-base sm:leading-7">
                Upload one or more images, watch the analyzer inspect visual regions, then copy the typed caption when it lands.
              </p>
            </div>

            <AnimatePresence mode="wait">
              {images.length === 0 ? (
                <UploadDropzone
                  key="dropzone"
                  inputRef={fileInputRef}
                  onFilesSelected={addFiles}
                />
              ) : (
                <ImageQueue
                  key="queue"
                  images={images}
                  error={error}
                  inputRef={fileInputRef}
                  onFilesSelected={addFiles}
                  onGenerateAll={generateAll}
                  onGenerate={generateForImage}
                  onRemove={removeImage}
                  onCopy={copyCaption}
                />
              )}
            </AnimatePresence>

            <div className="mt-5 grid grid-cols-3 gap-2 text-[9px] font-black uppercase tracking-[0.1em] text-slate-400 sm:mt-6 sm:flex sm:flex-wrap sm:gap-3 sm:text-xs sm:tracking-[0.14em]">
              {trustMarkers.map((marker) => (
                <span key={marker} className="inline-flex min-h-9 items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2 py-2 text-center sm:min-h-0 sm:justify-start sm:gap-2 sm:border-0 sm:bg-transparent sm:px-0 sm:py-0">
                  <CheckCircle2 size={13} className="flex-none text-emerald-500 sm:size-[14px]" />
                  {marker}
                </span>
              ))}
            </div>
          </div>
        </section>

        <HistorySidebar history={history} onCopy={copyCaption} />
      </main>

      <Toast toast={toast} />
    </div>
  );
}
