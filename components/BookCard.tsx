"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/lib/CartContext";
import { ShoppingCart, Check, BookOpen, Sparkles } from "lucide-react";

interface BookCardProps {
  id: string;
  title: string;
  author: string;
  price: string;
  category: string;
  image?: string;
  description?: string;
}

export default function BookCard({ id, title, author, price, category, image }: BookCardProps) {
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(id, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const formattedPrice = price ? (price.startsWith("$") ? price : `$${price}`) : "$1.99";

  return (
    <div className="bg-white rounded-2xl p-4 border border-slate-200 hover:border-blue-500/60 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 font-sans flex flex-col justify-between h-full group text-left relative overflow-hidden">
      
      {/* Top Floating Badge */}
      <div className="flex items-center justify-between gap-1 mb-2.5 z-10">
        <span className="bg-blue-50 text-blue-700 text-[10px] font-mono font-bold px-2 py-0.5 rounded border border-blue-200">
          VECTOR #{id.slice(0, 4)}
        </span>
        <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded uppercase border border-slate-200">
          {category || "VECTOR"}
        </span>
      </div>

      {/* Vector Asset Image Container (Adaptive 4:3 with ambient backdrop) */}
      <div className="w-full mb-3">
        <Link 
          href={`/products/${id}`} 
          className="block relative group/cover overflow-hidden rounded-xl bg-slate-100/90 border border-slate-200 aspect-[4/3] w-full shadow-xs flex items-center justify-center p-2.5"
        >
          {image ? (
            <>
              {/* Ambient backdrop for letterboxed landscape/portrait graphics */}
              <div 
                className="absolute inset-0 bg-cover bg-center blur-md opacity-25 scale-110 pointer-events-none"
                style={{ backgroundImage: `url(${image})` }}
              />
              <img
                src={image}
                alt={title}
                className="relative z-10 max-w-full max-h-full object-contain rounded-lg drop-shadow-xs group-hover/cover:scale-105 transition-transform duration-300"
              />
            </>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center text-slate-400 bg-slate-100">
              <Sparkles className="w-8 h-8 mb-2 opacity-40 text-blue-600" />
              <span className="text-xs font-bold italic line-clamp-2 text-slate-600">{title}</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent opacity-0 group-hover/cover:opacity-100 transition-opacity flex items-end p-2.5 z-20">
            <span className="text-[10px] font-extrabold text-blue-300 uppercase tracking-widest flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-blue-400" /> View Vector Asset
            </span>
          </div>
        </Link>
      </div>

      {/* Book Information */}
      <div className="flex-grow flex flex-col justify-between space-y-3">
        <div>
          <Link href={`/products/${id}`}>
            <h3 className="font-bold text-base text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug min-h-[2.5rem]">
              {title}
            </h3>
          </Link>
          <p className="text-xs text-slate-500 italic mt-1 truncate">
            by <span className="text-slate-700 not-italic font-semibold">{author}</span>
          </p>
        </div>

        {/* Pricing & 1-Click Order Footer */}
        <div className="pt-3 border-t border-slate-100 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-lg font-black font-mono text-slate-900 leading-none">
              {formattedPrice}
            </span>
            <span className="text-[10px] font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              AI • EPS • CDR
            </span>
          </div>

          <button
            type="button"
            onClick={handleQuickAdd}
            className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-sm flex items-center justify-center gap-1.5 border ${
              added 
                ? "bg-emerald-600 border-emerald-600 text-white" 
                : "bg-[#111827] hover:bg-blue-600 border-[#111827] text-white active:scale-95"
            }`}
          >
            {added ? (
              <>
                <Check className="w-3.5 h-3.5 stroke-[3]" /> Added to Cart
              </>
            ) : (
              <>
                <ShoppingCart className="w-3.5 h-3.5 text-blue-300" /> Add to Cart
              </>
            )}
          </button>
        </div>

      </div>

    </div>
  );
}

