import { useEffect, useState } from "react";

const VISIBLE_MS = 5500;
const FADE_MS = 500;

function SuccessToast({ show, message, onDismiss }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!show) return;
    setVisible(true);
    const fadeTimer = setTimeout(() => setVisible(false), VISIBLE_MS);
    const unmountTimer = setTimeout(() => onDismiss?.(), VISIBLE_MS + FADE_MS);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(unmountTimer);
    };
  }, [show, onDismiss]);

  if (!show) return null;

  return (
    <p
      role="status"
      aria-live="polite"
      data-visible={visible}
      className="pointer-events-none absolute left-0 right-0 top-full z-10 mt-3 rounded-xl border border-emerald-400/45 bg-white/[0.06] px-4 py-3 text-sm font-medium text-emerald-50 opacity-0 shadow-[0_0_24px_rgba(52,211,153,0.28),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl data-[visible=true]:opacity-100 motion-safe:transition-opacity motion-safe:duration-500 motion-safe:ease-out"
    >
      {message}
    </p>
  );
}

export default SuccessToast;
