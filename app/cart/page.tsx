"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useCart } from "@/lib/CartContext";
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowLeft, 
  ShieldCheck, 
  ArrowRight
} from "lucide-react";

export default function CartPage() {
  const { cartItems, allBooks, updateQuantity, removeFromCart, cartTotal, isMounted } = useCart();

  const fullCartItems = cartItems.map(item => {
    const book = allBooks.find(b => b.id === item.id);
    return { ...book, quantity: item.quantity, id: item.id };
  }).filter(item => item.title);

  if (!isMounted) return null;

  return (
    <main className="flex min-h-screen flex-col bg-white text-black font-mono">
      <Navbar />
      
      <section className="pt-28 pb-20">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 max-w-5xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <Link href="/collections" className="inline-flex items-center text-xs font-extrabold text-[#FF4500] hover:text-black transition-colors mb-2 uppercase tracking-widest gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Swiss Index
              </Link>
              <h1 className="text-3xl md:text-5xl font-extrabold text-black uppercase tracking-tighter flex items-center gap-3">
                <ShoppingBag className="w-8 h-8 text-[#FF4500]" />
                Folio Shopping Cart
              </h1>
            </div>
            <span className="text-xs font-black text-black bg-[#F0F0F0] px-4 py-2 border-2 border-black w-fit uppercase">
              {fullCartItems.length} {fullCartItems.length === 1 ? 'Selected Item' : 'Selected Items'}
            </span>
          </div>

          {fullCartItems.length === 0 ? (
            <div className="bg-white p-12 text-center border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-w-lg mx-auto my-8">
              <div className="w-16 h-16 bg-black text-white flex items-center justify-center mx-auto mb-4 border-2 border-black">
                <ShoppingBag className="w-8 h-8 text-[#FF4500]" />
              </div>
              <h3 className="text-2xl font-extrabold text-black uppercase mb-2">Cart is Empty</h3>
              <p className="text-xs text-black/70 mb-6 font-sans">Browse structured Swiss modernist page folios and digital EPUB books.</p>
              <Link 
                href="/collections" 
                className="inline-flex items-center gap-2 bg-[#FF4500] hover:bg-black text-white border-2 border-black px-8 py-3.5 font-bold text-xs uppercase tracking-wider transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              >
                <span>Explore Folio Index</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-12 gap-8 items-start">
              
              <div className="lg:col-span-7 space-y-4">
                {fullCartItems.map((item) => (
                  <div 
                    key={item.id} 
                    className="bg-white p-4 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:border-[#FF4500] transition-all flex gap-4 items-center"
                  >
                    <Link href={`/products/${item.id}`} className="w-16 md:w-20 aspect-[9/16] bg-[#F0F0F0] overflow-hidden flex-shrink-0 border-2 border-black block">
                      {item.cover_url ? (
                        <img src={item.cover_url} alt={item.title} className="object-cover w-full h-full" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-black text-[9px] font-bold">
                          {item.title}
                        </div>
                      )}
                    </Link>

                    <div className="flex-grow min-w-0 space-y-1.5">
                      <div className="flex justify-between items-start gap-2">
                        <Link href={`/products/${item.id}`} className="font-extrabold text-base md:text-lg text-black hover:text-[#FF4500] transition-colors line-clamp-1 uppercase">
                          {item.title}
                        </Link>
                        <span className="font-extrabold text-[#FF4500] text-sm whitespace-nowrap">
                          {item.price && item.price.startsWith('$') ? item.price : `$${item.price || '0.00'}`}
                        </span>
                      </div>

                      <p className="text-xs text-black/60">by {item.author}</p>

                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center space-x-3 bg-[#F0F0F0] border border-black px-3 py-1">
                          <button className="text-black hover:text-[#FF4500]" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-black text-black w-4 text-center">{item.quantity}</span>
                          <button className="text-black hover:text-[#FF4500]" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button className="text-rose-600 hover:bg-rose-50 p-2 rounded transition-all" onClick={() => removeFromCart(item.id)}>
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary - High Contrast Swiss Grid Box */}
              <div className="lg:col-span-5">
                <div className="bg-black text-white p-6 md:p-8 shadow-[8px_8px_0px_0px_rgba(255,69,0,1)] border-2 border-black space-y-6 sticky top-28">
                  <div className="flex items-center justify-between border-b-2 border-white/20 pb-4">
                    <h2 className="text-xl font-extrabold uppercase flex items-center gap-2 text-white">
                      Order Summary
                    </h2>
                    <span className="text-xs font-bold text-black bg-[#FF4500] px-2 py-0.5 uppercase">SWISS GRID</span>
                  </div>

                  <div className="space-y-3 text-xs text-white">
                    <div className="flex justify-between text-white/90">
                      <span>Subtotal ({fullCartItems.length} items)</span>
                      <span className="font-black text-white text-sm">${cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-white/90">
                      <span>Digital Transfer</span>
                      <span className="text-[#FF4500] font-black uppercase text-[10px]">Instant 1-Click Link</span>
                    </div>
                    <div className="flex justify-between text-white/90">
                      <span>Estimated Tax</span>
                      <span className="font-black text-white">$0.00</span>
                    </div>

                    <div className="flex justify-between items-baseline pt-4 border-t-2 border-white/20">
                      <span className="text-base font-extrabold text-white">Total Amount</span>
                      <span className="text-3xl font-black text-[#FF4500]">${cartTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  <Link 
                    href="/checkout" 
                    className="w-full bg-[#FF4500] hover:bg-white text-white hover:text-black border-2 border-white py-4 font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 group"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <div className="pt-2 border-t border-white/20 flex items-center justify-center gap-2 text-[10px] text-white/80 uppercase text-center">
                    <ShieldCheck className="w-4 h-4 text-[#FF4500] flex-shrink-0" />
                    <span>Verified Swiss Editorial Transfer</span>
                  </div>
                </div>
              </div>

            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
