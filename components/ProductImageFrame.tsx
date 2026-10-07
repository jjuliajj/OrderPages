"use client";

import { useState, useEffect } from "react";
import { Sparkles, Maximize2, X, ZoomIn, ZoomOut, Check, Layers } from "lucide-react";

interface ProductImageFrameProps {
  src?: string;
  title: string;
  category?: string;
}

export default function ProductImageFrame({ src, title, category }: ProductImageFrameProps) {
  const [orientation, setOrientation] = useState<"landscape" | "portrait" | "square">("landscape");
  const [aspectRatio, setAspectRatio] = useState<number | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [zoomScale, setZoomScale] = useState(1);

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { naturalWidth, naturalHeight } = e.currentTarget;
    const ratio = naturalWidth / naturalHeight;
    setAspectRatio(ratio);

    if (ratio >= 1.15) {
      setOrientation("landscape");
    } else if (ratio <= 0.88) {
      setOrientation("portrait");
    } else {
      setOrientation("square");
    }
    setIsLoaded(true);
  };

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsModalOpen(false);
        setZoomScale(1);
      }
    };
    if (isModalOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  return (
    <>
      <div className="w-full flex justify-center items-center">
        {src ? (
          <div
            className={`relative w-full rounded-2xl overflow-hidden border border-charcoal/10 bg-slate-50/90 shadow-md group transition-all duration-300 flex items-center justify-center p-3 sm:p-5 ${
              orientation === "landscape"
                ? "aspect-[16/10] sm:aspect-[16/10] max-h-[520px]"
                : orientation === "portrait"
                ? "aspect-[3/4] sm:aspect-[9/13] max-w-[390px] mx-auto"
                : "aspect-square max-w-[460px] mx-auto"
            }`}
          >
            {/* Ambient Blurred Backdrop for seamless letterboxing */}
            <div
              className="absolute inset-0 bg-cover bg-center blur-2xl opacity-25 scale-110 pointer-events-none transition-opacity duration-700"
              style={{ backgroundImage: `url(${src})` }}
            />

            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/5 pointer-events-none z-10" />

            {/* Top Orientation & Scalable Badge */}
            <div className="absolute top-3 left-3 z-20 flex items-center gap-2">
              <span className="bg-black/75 backdrop-blur-md text-white text-[10px] font-mono font-bold px-2.5 py-1 rounded-full uppercase tracking-wider border border-white/20 flex items-center gap-1.5 shadow-xs">
                <Layers className="w-3 h-3 text-[#FF4500]" />
                {orientation === "landscape"
                  ? "Landscape Vector"
                  : orientation === "portrait"
                  ? "Portrait Vector"
                  : "Square Asset"}
              </span>
              <span className="bg-[#FF4500] text-white text-[9px] font-mono font-extrabold px-2 py-0.5 rounded uppercase shadow-xs">
                100% Vector
              </span>
            </div>

            {/* Zoom / Fullscreen Button */}
            <button
              type="button"
              onClick={() => {
                setIsModalOpen(true);
                setZoomScale(1);
              }}
              title="Click to view full preview"
              className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center backdrop-blur-md border border-white/20 opacity-80 hover:opacity-100 transition-all shadow-md group-hover:scale-105"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>

            {/* Main Interactive Product Image */}
            <div
              onClick={() => {
                setIsModalOpen(true);
                setZoomScale(1);
              }}
              className="relative z-10 w-full h-full flex items-center justify-center cursor-zoom-in"
            >
              <img
                src={src}
                alt={title}
                onLoad={handleImageLoad}
                className={`max-w-full max-h-full object-contain rounded-xl drop-shadow-md transition-all duration-500 group-hover:scale-[1.02] ${
                  isLoaded ? "opacity-100" : "opacity-0"
                }`}
              />

              {!isLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-100 animate-pulse rounded-xl">
                  <div className="w-8 h-8 rounded-full border-2 border-[#FF4500] border-t-transparent animate-spin" />
                </div>
              )}
            </div>

            {/* Bottom Hover Hint */}
            <div className="absolute bottom-3 inset-x-3 z-20 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <span className="bg-black/80 backdrop-blur-md text-white text-[10px] font-sans font-semibold px-3 py-1 rounded-full border border-white/20 flex items-center gap-1.5 shadow-lg">
                <Sparkles className="w-3 h-3 text-[#FF4500]" /> Click to inspect high-res vector preview
              </span>
            </div>
          </div>
        ) : (
          <div className="w-full aspect-[4/3] max-w-[480px] flex flex-col items-center justify-center bg-slate-100 text-slate-400 font-sans p-8 rounded-2xl border border-charcoal/10 text-center">
            <Sparkles className="w-10 h-10 mb-2 opacity-40 text-blue-600" />
            <span className="text-sm font-bold text-slate-600">{title}</span>
            <span className="text-xs text-slate-400 mt-1 uppercase font-mono tracking-wider">No Image Preview Available</span>
          </div>
        )}
      </div>

      {/* Lightbox Modal for High-Resolution Vector Inspection */}
      {isModalOpen && src && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-lg flex flex-col items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
          onClick={() => setIsModalOpen(false)}
        >
          {/* Header Controls */}
          <div
            className="w-full max-w-6xl flex items-center justify-between text-white pb-4 px-2"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <span className="bg-[#FF4500] text-white text-xs font-bold font-mono px-2.5 py-1 rounded">
                VECTOR PREVIEW
              </span>
              <h4 className="text-sm sm:text-base font-bold truncate max-w-md sm:max-w-xl text-slate-200">
                {title}
              </h4>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setZoomScale((prev) => Math.max(0.5, prev - 0.25))}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="text-xs font-mono text-slate-300 w-12 text-center">
                {Math.round(zoomScale * 100)}%
              </span>
              <button
                type="button"
                onClick={() => setZoomScale((prev) => Math.min(2.5, prev + 0.25))}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-2 ml-2 rounded-lg bg-white/10 hover:bg-[#FF4500] text-white transition-colors"
                title="Close (ESC)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Modal Image Container */}
          <div
            className="relative w-full max-w-6xl flex-grow flex items-center justify-center overflow-auto rounded-2xl bg-black/40 border border-white/10 p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={src}
              alt={title}
              style={{ transform: `scale(${zoomScale})` }}
              className="max-h-[80vh] max-w-full object-contain rounded-lg drop-shadow-2xl transition-transform duration-200 cursor-grab active:cursor-grabbing"
            />
          </div>

          {/* Footer note */}
          <div className="text-slate-400 text-xs font-mono pt-3">
            Press <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-slate-300">ESC</kbd> or click outside to exit preview
          </div>
        </div>
      )}
    </>
  );
}
