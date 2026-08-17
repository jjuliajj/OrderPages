import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getBooks } from "@/lib/api";
import BookCard from "@/components/BookCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Special Collections & Digital Archives",
  description: "Browse our complete library catalog of curated EPUB e-books, rare editions, and literature collections.",
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

  const categories = Array.from(new Set(filteredBooks.map((b) => b.category).filter(Boolean)));


  return (
    <main className="flex min-h-screen flex-col bg-[#F8FAFC] font-sans text-slate-900">
      <Navbar />
      
      <section className="pt-28 pb-24">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 max-w-7xl space-y-12">
          
          {/* Header Banner */}
          <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-sm text-left space-y-4">
            <span className="text-blue-600 font-mono font-bold text-xs uppercase tracking-widest inline-block">
              Curated Linear Series
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 leading-tight">
              The Signature Collections
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed font-medium">
              Explore our hand-picked series, organized by literary movement and thematic resonance. Every collection is a digital journey.
            </p>
          </div>

          <div className="space-y-16">
            {categories.map((category) => (
              <div key={category} className="space-y-6">
                <div className="flex items-baseline justify-between border-b border-slate-200 pb-4">
                  <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-2.5 h-6 bg-blue-600 rounded-sm block" />
                    {category}
                  </h2>
                  <span className="font-mono text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200 uppercase">
                    {filteredBooks.filter(b => b.category === category).length} Volumes
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredBooks.filter((b) => b.category === category).map((book) => (
                    <BookCard key={book.id} {...book} image={book.cover_url} description={book.description} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
