import { useCallback, useMemo, useState } from "react";

const VIDEO_ID = "tHCXF4-tvrw";
const BASE_EMBED_URL = "https://www.youtube.com/embed/";
const AUTOPLAY_PARAMS = "?autoplay=1&modestbranding=1&rel=0&showinfo=0";

const VideoShowcase = () => {
  const [isInlinePlaying, setIsInlinePlaying] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const inlineVideoSrc = useMemo(() => {
    if (!isInlinePlaying) {
      return "";
    }

    return `${BASE_EMBED_URL}${VIDEO_ID}${AUTOPLAY_PARAMS}`;
  }, [isInlinePlaying]);

  const lightboxVideoSrc = useMemo(() => {
    if (!isLightboxOpen) {
      return "";
    }

    return `${BASE_EMBED_URL}${VIDEO_ID}${AUTOPLAY_PARAMS}`;
  }, [isLightboxOpen]);

  const handlePlayInline = useCallback(() => {
    setIsInlinePlaying(true);
  }, []);

  const handleOpenLightbox = useCallback(() => {
    setIsLightboxOpen(true);
  }, []);

  const handleCloseLightbox = useCallback(() => {
    setIsLightboxOpen(false);
  }, []);

  const handleOverlayClick = useCallback(
    (event) => {
      if (event.target === event.currentTarget) {
        handleCloseLightbox();
      }
    },
    [handleCloseLightbox]
  );

  return (
    <section className="px-5 md:px-20 mt-16 md:mt-24">
      <div className="relative w-full pb-[53%] h-0 overflow-hidden">
        {!isInlinePlaying && (
          <img
            src="https://saralynndesigns.com/wp-content/uploads/2024/12/RORS-logo-SM.jpg"
            alt="Custom Thumbnail"
            className="absolute inset-0 h-full w-full cursor-pointer object-cover"
            onClick={handlePlayInline}
          />
        )}

        <iframe
          src={inlineVideoSrc}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className={`absolute inset-0 h-full w-full border-none ${
            isInlinePlaying ? "block" : "hidden"
          }`}
        />

        <button
          type="button"
          className="absolute bottom-[10%] left-1/2 flex -translate-x-1/2 items-center bg-[#0037ff] px-10 py-6 text-[15px] font-semibold uppercase text-white shadow-lg"
          onClick={handleOpenLightbox}
        >
          Watch Full Video
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 16 16"
            width="24"
            height="24"
            className="ml-2"
          >
            <path d="M6.5 3.5v9l7-4.5-7-4.5z" />
          </svg>
        </button>
      </div>

      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-[999] flex h-full w-full items-center justify-center bg-black/80"
          onClick={handleOverlayClick}
        >
          <button
            type="button"
            onClick={handleCloseLightbox}
            className="absolute right-10 top-20 text-[35px] text-white"
            aria-label="Close video"
          >
            &times;
          </button>

          <iframe
            src={lightboxVideoSrc}
            title="Full Video Player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-[80%] border-none"
            style={{ height: "calc(42.25vw)" }}
          />
        </div>
      )}
    </section>
  );
};

export default VideoShowcase;
