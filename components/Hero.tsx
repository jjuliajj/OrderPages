import Link from "next/link";
import { ArrowRight, Layers, FileText, CheckSquare } from "lucide-react";

export default function Hero() {
  return (
    <section className="pt-32 pb-12 bg-white text-black font-mono">
      <div className="container mx-auto px-4 sm:px-8 md:px-12 max-w-7xl">
        
        {/* Asymmetric Swiss Modernist Poster Grid (Zero rounded corners, 2px solid black borders) */}
        <div className="grid lg:grid-cols-12 border-2 border-black divide-y-2 lg:divide-y-0 lg:divide-x-2 divide-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          
          {/* Box 1 (Left 7 cols): Giant Headline & Signal Orange Badge */}
          <div className="lg:col-span-7 p-8 sm:p-12 space-y-6 bg-white">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FF4500] text-white text-xs font-black uppercase">
              <Layers className="w-4 h-4" /> ISSUE N° 2026 • EDITORIAL INDEX
            </div>

            <h1 className="text-4xl sm:text-7xl font-sans font-black leading-none uppercase tracking-tighter text-black">
              ORDER.<br />
              <span className="text-[#FF4500]">FORM.</span><br />
              PAGES.
            </h1>

            <p className="text-xs sm:text-sm text-black/80 font-mono leading-relaxed border-t-2 border-black pt-4">
              High-contrast typographic precision. OrderPages delivers immaculate digital EPUB volumes organized by rigid modernist grids. Zero clutter. Pure form.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link 
                href="/collections" 
                className="bg-[#FF4500] hover:bg-black text-white border-2 border-black px-8 py-4 font-bold text-xs uppercase tracking-wider transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              >
                <span>Browse Page Index</span>
                <ArrowRight className="w-4 h-4 inline ml-2" />
              </Link>
            </div>
          </div>

          {/* Box 2 (Right 5 cols): Black Poster Box */}
          <div className="lg:col-span-5 bg-black text-white p-8 sm:p-12 flex flex-col justify-between space-y-6">
            <div className="text-xs font-bold text-[#FF4500] uppercase tracking-widest border-b border-white/30 pb-3">
              SWISS TYPOGRAPHIC SPEC N° 01
            </div>

            <div className="space-y-4 my-auto">
              <h3 className="text-3xl font-sans font-black uppercase text-white leading-none">
                STRUCTURED DIGITAL FOLIOS
              </h3>
              <p className="text-xs text-white/70">
                Pure typographic elegance applied to digital reading and archival EPUB collections.
              </p>
            </div>

            <div className="pt-4 border-t border-white/30 flex justify-between items-center text-xs font-black text-[#FF4500]">
              <span>VERIFIED EDITION</span>
              <span>100% VECTOR</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
