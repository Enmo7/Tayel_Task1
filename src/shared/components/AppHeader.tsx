import { ImageIcon, Sparkles } from 'lucide-react';

export function AppHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-3 sm:h-16 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
          <div className="grid h-9 w-9 flex-none place-items-center rounded-xl bg-slate-950 text-white shadow-sm sm:h-10 sm:w-10">
            <ImageIcon size={20} strokeWidth={2.4} />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-black tracking-tight text-slate-950 sm:text-base">Image Captioner</p>
            <p className="truncate text-[11px] font-semibold text-slate-500 sm:text-xs">Vision notes in seconds</p>
          </div>
        </div>

        <div className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-[11px] font-bold text-slate-600 sm:gap-2 sm:px-3 sm:text-xs">
          <Sparkles size={14} className="text-cyan-600" />
          <span className="hidden min-[360px]:inline">AI assisted</span>
        </div>
      </div>
    </header>
  );
}
