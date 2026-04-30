import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Camera, RefreshCw, RotateCcw, X } from 'lucide-react';
import type { CameraStatus } from '../types';

interface CameraCaptureProps {
  onCapture: (file: File) => void;
  buttonClassName?: string;
  buttonLabel?: string;
}

export function CameraCapture({
  onCapture,
  buttonClassName,
  buttonLabel = 'Take photo',
}: CameraCaptureProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<CameraStatus>('idle');
  const [message, setMessage] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const stopCamera = useCallback(() => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
  }, []);

  const closeCamera = useCallback(() => {
    stopCamera();
    setIsOpen(false);
    setStatus('idle');
    setMessage(null);
  }, [stopCamera]);

  const openCamera = useCallback(async () => {
    setIsOpen(true);
    setStatus('requesting');
    setMessage(null);

    if (!navigator.mediaDevices?.getUserMedia) {
      setStatus('unavailable');
      setMessage('Camera is not available in this browser. You can still upload an image.');
      return;
    }

    try {
      stopCamera();
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: 'environment' },
          width: { ideal: 1280 },
          height: { ideal: 960 },
        },
        audio: false,
      });

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }

      setStatus('ready');
    } catch (error) {
      const cameraError = error instanceof DOMException ? error : null;

      if (cameraError?.name === 'NotAllowedError' || cameraError?.name === 'PermissionDeniedError') {
        setStatus('denied');
        setMessage('Camera permission was blocked. Allow camera access in your browser settings, then try again.');
        return;
      }

      if (cameraError?.name === 'NotFoundError' || cameraError?.name === 'OverconstrainedError') {
        setStatus('unavailable');
        setMessage('No usable camera was found on this device. You can upload an image instead.');
        return;
      }

      if (cameraError?.name === 'NotReadableError') {
        setStatus('unavailable');
        setMessage('The camera is already in use by another app. Close it there, then try again.');
        return;
      }

      setStatus('error');
      setMessage('The camera could not be opened. Try again or upload an image instead.');
    }
  }, [stopCamera]);

  const capturePhoto = useCallback(() => {
    const video = videoRef.current;
    if (!video || status !== 'ready') return;

    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext('2d');
    if (!context) {
      setStatus('error');
      setMessage('The photo could not be captured. Try again.');
      return;
    }

    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    canvas.toBlob((blob) => {
      if (!blob) {
        setStatus('error');
        setMessage('The photo could not be captured. Try again.');
        return;
      }

      const file = new File([blob], getCaptureFileName(), { type: 'image/jpeg' });
      onCapture(file);
      closeCamera();
    }, 'image/jpeg', 0.92);
  }, [closeCamera, onCapture, status]);

  useEffect(() => {
    return () => stopCamera();
  }, [stopCamera]);

  return (
    <>
      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          void openCamera();
        }}
        className={buttonClassName}
      >
        <Camera size={17} />
        {buttonLabel}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 grid place-items-end bg-slate-950/60 p-0 backdrop-blur-sm sm:place-items-center sm:p-4"
            onClick={(event) => event.stopPropagation()}
            onKeyDown={(event) => event.stopPropagation()}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Camera capture"
              className="max-h-[92vh] w-full overflow-hidden rounded-t-2xl bg-white shadow-2xl sm:max-w-xl sm:rounded-2xl"
              initial={{ y: 32, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 32, opacity: 0 }}
            >
              <div className="flex items-center justify-between border-b border-slate-100 p-4">
                <div>
                  <h2 className="text-base font-black text-slate-950">Take a photo</h2>
                  <p className="mt-1 text-xs font-semibold text-slate-500">Use your camera, then add it to the queue.</p>
                </div>
                <button
                  type="button"
                  onClick={closeCamera}
                  className="grid h-10 w-10 place-items-center rounded-lg border border-slate-200 bg-white text-slate-600"
                  aria-label="Close camera"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="bg-slate-950 p-3">
                <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-slate-900 sm:aspect-[4/3]">
                  <video
                    ref={videoRef}
                    muted
                    playsInline
                    className={`h-full w-full object-cover ${status === 'ready' ? 'block' : 'hidden'}`}
                  />

                  {status !== 'ready' && (
                    <div className="absolute inset-0 grid place-items-center p-6 text-center text-white">
                      <div>
                        {status === 'requesting' ? (
                          <RefreshCw className="mx-auto mb-4 animate-spin text-cyan-200" size={30} />
                        ) : (
                          <Camera className="mx-auto mb-4 text-cyan-200" size={30} />
                        )}
                        <p className="text-sm font-black">
                          {status === 'requesting' ? 'Requesting camera access' : statusLabel[status]}
                        </p>
                        {message && (
                          <p className="mx-auto mt-2 max-w-xs text-sm font-medium leading-6 text-slate-200">
                            {message}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid gap-2 p-4 min-[420px]:grid-cols-2">
                <button
                  type="button"
                  onClick={capturePhoto}
                  disabled={status !== 'ready'}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-slate-950 px-4 py-3 text-sm font-black text-white disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Camera size={17} />
                  Capture photo
                </button>
                <button
                  type="button"
                  onClick={() => void openCamera()}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-black text-slate-700"
                >
                  <RotateCcw size={17} />
                  Try again
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

const statusLabel: Record<CameraStatus, string> = {
  idle: 'Camera is idle',
  requesting: 'Requesting camera access',
  ready: 'Camera is ready',
  denied: 'Camera permission denied',
  unavailable: 'Camera unavailable',
  error: 'Camera error',
};

function getCaptureFileName(): string {
  const timestamp = new Date()
    .toISOString()
    .replace(/[:.]/g, '-')
    .replace('T', '-')
    .slice(0, 19);

  return `camera-capture-${timestamp}.jpg`;
}
