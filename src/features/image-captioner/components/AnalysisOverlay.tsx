import { motion } from 'motion/react';

const scanWindows = [
  { top: '14%', left: '10%', width: '34%', height: '24%', delay: 0 },
  { top: '46%', left: '52%', width: '32%', height: '28%', delay: 0.35 },
  { top: '58%', left: '16%', width: '24%', height: '18%', delay: 0.7 },
] as const;

export function AnalysisOverlay() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-slate-950/35 backdrop-blur-[1px]" />
      <motion.div
        className="absolute inset-x-0 top-0 h-24 bg-linear-gradient-to-b from-cyan-300/0 via-cyan-300/45 to-cyan-300/0 mix-blend-screen"
        animate={{ y: ['-35%', '430%'] }}
        transition={{ duration: 2.1, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.18)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.18)_1px,transparent_1px)] bg-[size:42px_42px] opacity-40" />

      {scanWindows.map((window) => (
        <motion.div
          key={`${window.top}-${window.left}`}
          className="absolute rounded-md border border-cyan-200/90 bg-cyan-100/10 shadow-[0_0_26px_rgba(34,211,238,.35)]"
          style={{
            top: window.top,
            left: window.left,
            width: window.width,
            height: window.height,
          }}
          animate={{ opacity: [0.25, 1, 0.35], scale: [0.96, 1.02, 0.98] }}
          transition={{ duration: 1.6, delay: window.delay, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="absolute -left-1 -top-1 h-3 w-3 border-l-2 border-t-2 border-white" />
          <span className="absolute -right-1 -top-1 h-3 w-3 border-r-2 border-t-2 border-white" />
          <span className="absolute -bottom-1 -left-1 h-3 w-3 border-b-2 border-l-2 border-white" />
          <span className="absolute -bottom-1 -right-1 h-3 w-3 border-b-2 border-r-2 border-white" />
        </motion.div>
      ))}

      <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between gap-2 rounded-lg border border-white/20 bg-slate-950/75 px-3 py-2.5 text-white shadow-xl backdrop-blur-md sm:bottom-4 sm:left-4 sm:right-4 sm:gap-3 sm:px-4 sm:py-3">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-cyan-200 sm:text-xs sm:tracking-[0.22em]">Analyzing image</p>
          <p className="mt-1 text-xs font-semibold text-white/90 sm:text-sm">Detecting subjects and mood</p>
        </div>
        <div className="flex h-8 w-8 flex-none items-center justify-center rounded-full border border-cyan-200/40 sm:h-9 sm:w-9">
          <motion.span
            className="h-2.5 w-2.5 rounded-full bg-cyan-200"
            animate={{ scale: [0.75, 1.35, 0.75], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.1, repeat: Infinity }}
          />
        </div>
      </div>
    </div>
  );
}
