import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AddToCartActions from "@/components/AddToCartActions";
import BookDescription from "@/components/BookDescription";
import ProductImageFrame from "@/components/ProductImageFrame";
import { getBook } from "@/lib/api";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Layers, User, Tag, Sparkles } from "lucide-react";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const book = await getBook(id);

  if (!book) {
    return {
      title: "Design Asset Not Found | OrderPages",
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.layerbit.fit";
  const rawDesc = (book.description || "").replace(/<[^>]*>?/gm, "").trim();
  const cleanDescription = rawDesc.slice(0, 160) || `Download ${book.title} in scalable vector formats (AI, EPS, CDR) from OrderPages.`;

  return {
    title: `${book.title} | OrderPages Vector Assets`,
    description: cleanDescription,
    keywords: [book.title, book.author, book.category, "Vector Design", "AI Vector", "EPS File", "CorelDRAW CDR"],
    openGraph: {
      title: `${book.title} | OrderPages Vector Assets`,
      description: cleanDescription,
      url: `${siteUrl}/products/${book.id}`,
      type: "article",
      images: book.cover_url ? [{ url: book.cover_url, alt: book.title }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${book.title} | OrderPages Vector Assets`,
      description: cleanDescription,
      images: book.cover_url ? [book.cover_url] : [],
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const book = await getBook(id);

  if (!book) {
    notFound();
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.layerbit.fit";
  const rawPrice = String(book.price || "0.50").replace(/[^0-9.]/g, "");
  const numericPrice = parseFloat(rawPrice) || 0.50;
  const formattedDisplayPrice = book.price 
    ? (book.price.startsWith("$") ? book.price : `$${book.price}`) 
    : `$${numericPrice.toFixed(2)}`;
  const cleanDescription = (book.description || "").replace(/<[^>]*>?/gm, "").trim();

  // Product Schema for Google Search & Stripe Trust verification
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": book.title,
    "image": book.cover_url ? [book.cover_url] : [],
    "description": cleanDescription || `${book.title} by ${book.author}`,
    "category": book.category,
    "offers": {
      "@type": "Offer",
      "url": `${siteUrl}/products/${book.id}`,
      "priceCurrency": "USD",
      "price": numericPrice.toFixed(2),
      "priceValidUntil": "2027-12-31",
      "itemCondition": "https://schema.org/NewCondition",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "OrderPages Design Assets"
      }
    },
    "brand": {
      "@type": "Brand",
      "name": book.author
    }
  };

  return (
    <main className="flex min-h-screen flex-col bg-paper-beige">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <Navbar />
      
      <section className="pt-28 pb-20">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 max-w-6xl">
          {/* Back link */}
          <Link href="/collections" className="inline-flex items-center text-xs font-manrope font-bold text-charcoal/50 hover:text-coral transition-colors mb-8 uppercase tracking-widest gap-2 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Vector Catalogue
          </Link>

          {/* Main Product Detail Grid (Optimized for both landscape and portrait graphics) */}
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 md:p-10 border border-charcoal/10 shadow-sm grid md:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left: Adaptive Product Image Frame (Auto-adjusts for landscape, portrait, and square) */}
            <div className="md:col-span-6 lg:col-span-6 flex justify-center w-full">
              <ProductImageFrame
                src={book.cover_url}
                title={book.title}
                category={book.category}
              />
            </div>

            {/* Right: Product Meta & Info */}
            <div className="md:col-span-6 lg:col-span-6 space-y-6">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#111827] text-white text-[11px] font-mono font-bold uppercase tracking-wider rounded-md mb-3 shadow-xs">
                  <Sparkles className="w-3.5 h-3.5 text-[#3B82F6]" />
                  Verified Digital Vector Asset
                </div>
                
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-newsreader font-bold text-charcoal leading-tight mb-2">
                  {book.title}
                </h1>
                
                <div className="flex items-center gap-2 text-sm text-charcoal/60 font-manrope">
                  <User className="w-4 h-4 text-coral" />
                  <span>By <strong className="text-charcoal">{book.author || "OrderPages Studio"}</strong></span>
                </div>
              </div>

              {/* Price & Delivery Badge */}
              <div className="bg-paper-beige/60 p-4 rounded-2xl border border-charcoal/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-manrope font-bold uppercase tracking-widest text-charcoal/40 block">Vector Package</span>
                  <span className="text-2xl font-newsreader font-bold text-coral">{formattedDisplayPrice}</span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-manrope font-semibold text-emerald-600 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full inline-flex items-center gap-1">
                    <Layers className="w-3 h-3" /> Instant Digital Archive
                  </span>
                </div>
              </div>

              {/* Add To Cart & Direct Checkout Buttons */}
              <AddToCartActions bookId={book.id} />

              {/* Collapsible Introduction Section */}
              <BookDescription description={book.description} />
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
