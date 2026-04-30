import { Copy, ImageIcon } from 'lucide-react';
import type { CaptionHistoryItem } from '../types';

interface HistorySidebarProps {
  history: CaptionHistoryItem[];
  onCopy: (caption: string) => void;
}

export function HistorySidebar({ history, onCopy }: HistorySidebarProps) {
  return (
    <aside className="mx-3 mb-6 rounded-xl border border-slate-200 bg-white shadow-sm sm:mx-6 lg:sticky lg:top-16 lg:mx-0 lg:mb-0 lg:h-[calc(100vh-4rem)] lg:w-80 lg:flex-none lg:rounded-none lg:border-y-0 lg:border-r-0 lg:border-l">
      <div className="border-b border-slate-100 p-4 sm:p-5">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-slate-400">Recent captions</p>
      </div>

      <div className="grid max-h-[360px] gap-3 overflow-y-auto p-3 sm:max-h-[420px] sm:p-4 lg:max-h-none">
        {history.length === 0 ? (
          <div className="py-8 text-center sm:py-10">
            <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-xl border border-slate-200 bg-slate-50 text-slate-400">
              <ImageIcon size={21} />
            </div>
            <h2 className="text-sm font-black text-slate-600">No captions yet</h2>
            <p className="mx-auto mt-2 max-w-[13rem] text-xs font-medium leading-5 text-slate-400">
              Generated captions will be saved here for quick reuse.
            </p>
          </div>
        ) : (
          history.map((item) => (
            <article
              key={item.id}
              className="group relative flex gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3 transition hover:border-cyan-200 hover:bg-white"
            >
              <img src={item.image} alt="" className="h-16 w-16 flex-none rounded-lg object-cover sm:h-14 sm:w-14" />
              <div className="min-w-0 pr-7">
                <p className="mb-1 text-xs font-bold text-slate-400">{item.date}</p>
                <p className="line-clamp-3 text-sm font-semibold leading-5 text-slate-700">{item.caption}</p>
              </div>
              <button
                type="button"
                onClick={() => onCopy(item.caption)}
                className="absolute right-2 top-2 grid h-9 w-9 place-items-center rounded-lg border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:text-slate-950 sm:h-8 sm:w-8 sm:opacity-0 sm:group-hover:opacity-100"
                aria-label="Copy previous caption"
              >
                <Copy size={15} />
              </button>
            </article>
          ))
        )}
      </div>
    </aside>
  );
}
