"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/lib/CartContext";
import { ChevronDown, ChevronUp, Plus, Command, Download, ShieldCheck } from "lucide-react";

interface BookCardProps {
  id: string;
  title: string;
  author: string;
  price: string;
  category: string;
  image?: string;
  description?: string;
}

export default function BookCard({ id, title, author, price, category, image, description }: BookCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { addToCart } = useCart();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(id, 1);
  };

  return (
    <div className="bg-white border border-[#111827]/20 rounded-xl overflow-hidden shadow-xs transition-all font-mono">
      
      {/* Accordion Row Header */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 flex items-center justify-between gap-4 text-left hover:bg-[#F8F9FA] transition-colors"
      >
        <div className="flex items-center gap-4 min-w-0">
          <span className="bg-[#3B82F6] text-white text-[9px] font-bold px-2 py-0.5 rounded font-mono">
            ISBN-978-{id.slice(0, 4)}
          </span>
          <h3 className="font-sans font-bold text-sm sm:text-base text-[#111827] truncate">
            {title}
          </h3>
          <span className="text-xs text-[#111827]/60 hidden sm:inline">by {author}</span>
        </div>

        <div className="flex items-center gap-4 flex-shrink-0">
          <span className="font-bold text-sm text-[#3B82F6]">{price}</span>
          <div className="w-6 h-6 rounded-md bg-[#F8F9FA] flex items-center justify-center text-[#111827]">
            {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </div>
      </button>

      {/* Accordion Fold/Unfold Details */}
      {isOpen && (
        <div className="p-5 bg-[#F8F9FA] border-t border-[#111827]/10 space-y-4 font-sans">
          <div className="grid sm:grid-cols-12 gap-4 items-center">
            
            {image && (
              <div className="sm:col-span-3 w-20 aspect-[4/5] bg-gray-200 rounded-lg overflow-hidden border border-[#111827]/10">
                <img src={image} alt={title} className="w-full h-full object-cover" />
              </div>
            )}

            <div className={`space-y-2 ${image ? 'sm:col-span-9' : 'sm:col-span-12'}`}>
              <div className="text-xs font-mono font-bold text-[#3B82F6] uppercase">
                CATEGORY: {category || "LINEAR_SYSTEM"} • DRM_FREE
              </div>
              <p className="text-xs text-[#111827]/80 leading-relaxed">
                {description || "Linear Silicon Valley interactive digital book edition. Formatted for high performance mobile and desktop e-reading."}
              </p>

              <div className="pt-2 flex flex-wrap gap-3">
                <button 
                  onClick={handleQuickAdd}
                  className="bg-[#111827] hover:bg-[#3B82F6] text-white px-4 py-2 rounded-lg text-xs font-mono font-bold uppercase transition-all shadow-xs flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" /> 1-Click Order
                </button>

                <Link
                  href={`/products/${id}`}
                  className="bg-white hover:bg-gray-100 text-[#111827] px-4 py-2 rounded-lg text-xs font-mono font-bold border border-[#111827]/20 transition-all flex items-center gap-1.5"
                >
                  <Command className="w-3.5 h-3.5 text-[#3B82F6]" /> Full Specs
                </Link>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
