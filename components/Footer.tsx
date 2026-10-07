import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-14 pb-10 border-t-4 border-[#FF5500] font-mono">
      <div className="container mx-auto px-4 sm:px-6 md:px-12 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-white/20">
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <span className="bg-[#FF5500] text-white px-2 py-0.5 font-black text-sm">OP</span>
              <span className="font-extrabold text-2xl tracking-tighter uppercase text-white">OrderPages</span>
            </div>
            <p className="text-xs text-white/70 leading-relaxed max-w-md">
              Swiss modernist design studio and structured vector archives. High-precision CorelDRAW (CDR), Illustrator (AI), and EPS design assets for creators, apparel, and print.
            </p>
          </div>
          <div>
            <h4 className="text-xs font-bold text-[#FF5500] uppercase tracking-widest mb-3">Index Directory</h4>
            <ul className="space-y-1.5 text-xs text-white/80">
              <li><Link href="/collections" className="hover:text-[#FF5500]">Vector Collections</Link></li>
              <li><Link href="/genres" className="hover:text-[#FF5500]">Design Categories</Link></li>
              <li><Link href="/authors" className="hover:text-[#FF5500]">Designers & Creators</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold text-[#FF5500] uppercase tracking-widest mb-3">Asset Support</h4>
            <ul className="space-y-1.5 text-xs text-white/80">
              <li><Link href="/privacy" className="hover:text-[#FF5500]">Privacy Protocol</Link></li>
              <li><Link href="/terms" className="hover:text-[#FF5500]">Licensing & Terms</Link></li>
              <li><Link href="/contact" className="hover:text-[#FF5500]">Contact Desk</Link></li>
            </ul>
          </div>
        </div>
        <div className="pt-6 text-center text-xs text-white/50">
          © {new Date().getFullYear()} OrderPages Design Studio & Vector Assets. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
