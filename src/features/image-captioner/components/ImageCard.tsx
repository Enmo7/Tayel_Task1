import { motion } from 'motion/react';
import { Copy, RefreshCw, Sparkles, Trash2, WandSparkles } from 'lucide-react';
import type { UploadedImage } from '../types';
import { AnalysisOverlay } from './AnalysisOverlay';
import { CaptionTyper } from './CaptionTyper';

interface ImageCardProps {
  image: UploadedImage;
  onGenerate: (image: UploadedImage) => void;
  onRemove: (id: string) => void;
  onCopy: (caption: string) => void;
}

export function ImageCard({ image, onGenerate, onRemove, onCopy }: ImageCardProps) {
  const caption = image.status === 'complete' ? image.caption : undefined;
  const isComplete = typeof caption === 'string' && caption.length > 0;
  const isAnalyzing = image.status === 'analyzing';

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm sm:rounded-2xl"
    >
      <div className="relative aspect-[16/11] overflow-hidden bg-slate-100 sm:aspect-[21/9]">
        <img
          src={image.url}
          alt={image.name}
          className={`h-full w-full object-contain transition duration-500 ${isAnalyzing ? 'scale-[1.02] blur-[1px]' : ''}`}
        />
        {isAnalyzing && <AnalysisOverlay />}
        <button
          type="button"
          onClick={() => onRemove(image.id)}
          className="absolute right-2 top-2 grid h-10 w-10 place-items-center rounded-lg bg-slate-950/75 text-white shadow-lg backdrop-blur transition hover:bg-rose-600 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-rose-200 sm:right-3 sm:top-3 sm:h-9 sm:w-9"
          aria-label={`Remove ${image.name}`}
        >
          <Trash2 size={17} />
        </button>
      </div>

      <div className="grid gap-3 p-3 sm:gap-5 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="line-clamp-2 text-sm font-black leading-5 text-slate-950">{image.name}</h3>
            <p className="mt-1 text-xs font-bold text-slate-400">{image.size}</p>
          </div>

          <StatusBadge status={image.status} />
        </div>

        {isComplete ? (
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 sm:p-4">
            <div className="mb-2 flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.16em] text-emerald-600 sm:mb-3 sm:text-xs">
              <Sparkles size={14} />
              Caption ready
            </div>
            <CaptionTyper text={caption} />
          </div>
        ) : (
          <div className="min-w-0 rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm font-medium leading-6 text-slate-500 sm:p-4">
            {image.status === 'error' ? image.error : (
              <>
                <span className="sm:hidden">Ready to analyze.</span>
                <span className="hidden sm:inline">Ready to analyze. Generate a caption when you are set.</span>
              </>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 gap-2 min-[420px]:grid-cols-2">
          <button
            type="button"
            onClick={() => onGenerate(image)}
            disabled={isAnalyzing}
            className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-lg bg-slate-950 px-4 py-3 text-sm font-black text-white shadow-sm transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isAnalyzing ? <RefreshCw size={17} className="animate-spin" /> : <WandSparkles size={17} />}
            {isComplete ? 'Regenerate' : isAnalyzing ? 'Analyzing' : 'Generate caption'}
          </button>

          {isComplete && (
            <button
              type="button"
              onClick={() => onCopy(caption)}
              className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-black text-slate-700 transition hover:bg-slate-50"
            >
              <Copy size={17} />
              Copy
            </button>
          )}
        </div>
      </div>
    </motion.article>
  );
}

function StatusBadge({ status }: Pick<UploadedImage, 'status'>) {
  const styles = {
    pending: 'bg-slate-100 text-slate-600',
    analyzing: 'bg-cyan-100 text-cyan-700',
    complete: 'bg-emerald-100 text-emerald-700',
    error: 'bg-rose-100 text-rose-700',
  } satisfies Record<UploadedImage['status'], string>;

  const labels = {
    pending: 'Pending',
    analyzing: 'Analyzing',
    complete: 'Complete',
    error: 'Needs retry',
  } satisfies Record<UploadedImage['status'], string>;

  return (
    <span className={`inline-flex w-fit flex-none items-center rounded-full px-2.5 py-1 text-[11px] font-black sm:px-3 sm:text-xs ${styles[status]}`}>
      {labels[status]}
    </span>
  );
}
