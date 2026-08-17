import BookCard from "./BookCard";
import { getBooks } from "@/lib/api";
import Link from "next/link";
import { Command, ArrowRight } from "lucide-react";

export default async function FeaturedBooks() {
  const books = await getBooks();

  return (
    <section className="py-12 bg-[#F8FAFC] font-sans">
      <div className="container mx-auto px-4 sm:px-8 md:px-12 max-w-7xl space-y-8">
        
        {/* Header */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 font-sans">
          <div className="flex items-center gap-2">
            <Command className="w-5 h-5 text-blue-600" />
            <h2 className="font-bold text-lg text-slate-900 uppercase">
              Featured Linear Releases ({books.length})
            </h2>
          </div>
          <Link
            href="/collections"
            className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1.5 uppercase tracking-wider transition-colors"
          >
            <span>Browse Full Catalogue</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 4-Column Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {books.map((book) => (
            <BookCard key={book.id} {...book} image={book.cover_url} description={book.description} />
          ))}
        </div>

      </div>
    </section>
  );
}
