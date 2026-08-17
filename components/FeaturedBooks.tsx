import BookCard from "./BookCard";
import { getBooks } from "@/lib/api";
import Link from "next/link";
import { Command, ArrowRight } from "lucide-react";

export default async function FeaturedBooks() {
  const books = await getBooks();

  return (
    <section className="py-12 bg-[#F8F9FA] font-sans">
      <div className="container mx-auto px-4 sm:px-8 md:px-12 max-w-5xl space-y-6">
        
        {/* Header */}
        <div className="bg-white p-5 rounded-2xl border border-[#111827]/15 shadow-xs flex justify-between items-center font-mono">
          <div className="flex items-center gap-2">
            <Command className="w-5 h-5 text-[#3B82F6]" />
            <h2 className="font-bold text-lg text-[#111827] uppercase">
              LINEAR ACCORDION INDEX ({books.length})
            </h2>
          </div>
          <span className="text-xs font-bold text-[#3B82F6] bg-[#3B82F6]/10 px-3 py-1 rounded-full uppercase">
            CLICK TO EXPAND
          </span>
        </div>

        {/* Linear Accordion List Rows */}
        <div className="space-y-3">
          {books.map((book) => (
            <BookCard key={book.id} {...book} image={book.cover_url} description={book.description} />
          ))}
        </div>

      </div>
    </section>
  );
}
