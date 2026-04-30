import { useEffect, useState } from 'react';

interface CaptionTyperProps {
  text: string;
}

export function CaptionTyper({ text }: CaptionTyperProps) {
  const [visibleLength, setVisibleLength] = useState(0);

  useEffect(() => {
    setVisibleLength(0);
    const interval = window.setInterval(() => {
      setVisibleLength((current) => {
        if (current >= text.length) {
          window.clearInterval(interval);
          return current;
        }

        return current + 1;
      });
    }, 18);

    return () => window.clearInterval(interval);
  }, [text]);

  return (
    <p className="caption-type text-base font-semibold leading-7 text-slate-900 sm:text-lg">
      {text.slice(0, visibleLength)}
      {visibleLength < text.length && <span className="caption-caret" aria-hidden="true" />}
    </p>
  );
}
