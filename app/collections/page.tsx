import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getBooks } from "@/lib/api";
import BookCard from "@/components/BookCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vector Collections & Digital Design Archives",
  description: "Browse our complete catalog of curated scalable vector assets, mascot logos, AI, EPS, and CorelDRAW source files.",
};

export default async function CollectionsPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ genre?: string; category?: string; search?: string }> 
}) {
  const resolvedParams = await searchParams;
  const targetCategory = resolvedParams.category || resolvedParams.genre;
  const targetSearch = resolvedParams.search;
  const books = await getBooks();
  
  let filteredBooks = books;

  if (targetCategory) {
    filteredBooks = filteredBooks.filter(b => 
      b.category && b.category.toLowerCase() === targetCategory.toLowerCase()
    );
  }

  if (targetSearch) {
    const s = targetSearch.toLowerCase();
    filteredBooks = filteredBooks.filter(b => 
      b.title.toLowerCase().includes(s) || 
      b.author.toLowerCase().includes(s)
    );
  }


  return (
    <main className="flex min-h-screen flex-col bg-[#F8FAFC] font-sans text-slate-900">
      <Navbar />
      
      <section className="pt-28 pb-24">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 max-w-7xl space-y-12">
          
          {/* Header Banner */}
          <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-sm text-left space-y-4">
            <span className="text-blue-600 font-mono font-bold text-xs uppercase tracking-widest inline-block">
              Curated Vector Series
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 leading-tight">
              Vector Design Collections
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed font-medium">
              Explore our hand-picked vector collections, organized by design theme and creative application. Every collection includes scalable artwork and editable AI, EPS, and CDR source files.
            </p>
          </div>

          <div className="space-y-8">
            <div className="flex items-baseline justify-between border-b border-slate-200 pb-4">
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                <span className="w-2.5 h-6 bg-blue-600 rounded-sm block" />
                All Vector Assets
              </h2>
              <span className="font-mono text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200 uppercase">
                {filteredBooks.length} Assets
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredBooks.map((book) => (
                <BookCard key={book.id} {...book} image={book.cover_url} description={book.description} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
