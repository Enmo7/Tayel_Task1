import { AnimatePresence, motion } from 'motion/react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import type { ToastMessage } from '../../features/image-captioner';

interface ToastProps {
  toast: ToastMessage | null;
}

export function Toast({ toast }: ToastProps) {
  const isError = toast?.intent === 'error';

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          key={toast.id}
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.96 }}
          className={`fixed bottom-5 right-5 z-50 flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold text-white shadow-2xl ${
            isError ? 'bg-rose-600' : 'bg-emerald-600'
          }`}
        >
          {isError ? <AlertCircle size={18} /> : <CheckCircle2 size={18} />}
          {toast.text}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
