"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useCart } from "@/lib/CartContext";
import { getBooks, Book } from "@/lib/api";
import { Search, X, Loader2, Menu, ShoppingBag, Command } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartCount, cartTotal, isMounted } = useCart();
  const pathname = usePathname();

  const [searchQuery, setSearchQuery] = useState("");
  const [allBooks, setAllBooks] = useState<Book[]>([]);
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isLoadingBooks, setIsLoadingBooks] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const handleSearchFocus = async () => {
    setIsSearchFocused(true);
    if (allBooks.length === 0 && !isLoadingBooks) {
      setIsLoadingBooks(true);
      try {
        const books = await getBooks();
        setAllBooks(books);
      } catch (err) {
        console.error("Failed to load search index:", err);
      } finally {
        setIsLoadingBooks(false);
      }
    }
  };

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    const query = searchQuery.toLowerCase().trim();
    const matches = allBooks.filter(
      (b) =>
        b.title.toLowerCase().includes(query) ||
        b.author.toLowerCase().includes(query) ||
        (b.category && b.category.toLowerCase().includes(query))
    ).slice(0, 6);
    setSearchResults(matches);
  }, [searchQuery, allBooks]);

  const navItems = [
    { label: "Linear Index", href: "/collections" },
    { label: "Genres", href: "/genres" },
    { label: "Authors", href: "/authors" },
    { label: "System API", href: "/about" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-8 md:px-12 py-3 flex justify-between items-center ${
        isScrolled || isMobileMenuOpen ? "bg-[#F8F9FA]/95 backdrop-blur-md border-b border-[#111827]/20 shadow-xs" : "bg-[#F8F9FA]/80 border-b border-[#111827]/10"
      }`}
    >
      {/* Brand Logo & Name - Linear/Silicon Valley Style */}
      <Link href="/" className="flex items-center gap-3 group font-sans">
        <div className="w-9 h-9 rounded-lg bg-[#111827] text-white p-2 flex items-center justify-center border border-[#111827] group-hover:bg-[#3B82F6] transition-colors">
          <Command className="w-4 h-4 text-white" />
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 font-mono">
            <span className="text-xl sm:text-2xl font-black tracking-tight text-[#111827] leading-none uppercase">
              Order<span className="text-[#3B82F6]">Pages</span>
            </span>
            <span className="bg-[#3B82F6] text-white text-[8px] font-bold px-1.5 py-0.5 rounded">v3.0</span>
          </div>
          <span className="text-[9px] font-mono font-bold tracking-widest text-[#111827]/70 uppercase mt-0.5">Silicon Valley Linear UI</span>
        </div>
      </Link>

      {/* Header Search Bar */}
      <div className="relative hidden lg:block w-72 xl:w-96" ref={searchRef}>
        <div className="relative flex items-center font-mono">
          <Search className="absolute left-3.5 w-4 h-4 text-[#3B82F6]" />
          <input
            type="text"
            placeholder="Cmd + K to search ISBN, title, author..."
            value={searchQuery}
            onFocus={handleSearchFocus}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-9 py-2 text-xs bg-white text-[#111827] rounded-lg border border-[#111827]/20 focus:border-[#3B82F6] focus:outline-none transition-all placeholder:text-[#111827]/40 font-mono font-bold"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")} className="absolute right-3 p-1 text-[#111827]/40 hover:text-[#3B82F6]">
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Live Search Results */}
        {isSearchFocused && (searchQuery.trim() !== "" || isLoadingBooks) && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-[#111827]/20 rounded-xl shadow-xl overflow-hidden z-50 p-2 font-mono">
            {isLoadingBooks ? (
              <div className="p-3 text-center text-xs text-[#111827] flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-[#3B82F6]" /> Querying ISBN database...
              </div>
            ) : searchResults.length > 0 ? (
              <div className="space-y-1">
                <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#3B82F6]">
                  ISBN Index ({searchResults.length})
                </div>
                {searchResults.map((book) => (
                  <Link
                    key={book.id}
                    href={`/products/${book.id}`}
                    onClick={() => {
                      setIsSearchFocused(false);
                      setSearchQuery("");
                    }}
                    className="flex items-center gap-3 p-2 hover:bg-[#F8F9FA] rounded-lg transition-colors group"
                  >
                    <div className="w-8 aspect-[9/14] bg-[#111827] rounded overflow-hidden flex-shrink-0 border border-[#111827]/20">
                      {book.cover_url && <img src={book.cover_url} alt={book.title} className="w-full h-full object-cover" />}
                    </div>
                    <div className="flex-grow min-w-0">
                      <div className="text-xs font-bold text-[#111827] truncate group-hover:text-[#3B82F6]">
                        {book.title}
                      </div>
                      <div className="text-[10px] text-[#111827]/60 truncate font-mono">ISBN: 978-0-123-{book.id}</div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="p-3 text-center text-xs text-[#111827]/50">Zero matches found.</div>
            )}
          </div>
        )}
      </div>

      {/* Nav Links & Commercial Cart */}
      <div className="flex items-center gap-4 sm:gap-6 font-sans">
        <div className="hidden md:flex items-center gap-6 text-xs font-bold text-[#111827]/80 uppercase tracking-wider">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`hover:text-[#3B82F6] transition-colors py-1 ${
                pathname === item.href ? "text-[#3B82F6] border-b-2 border-[#3B82F6]" : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <Link
          href="/cart"
          className="bg-[#111827] hover:bg-[#3B82F6] text-white px-4 py-2.5 rounded-lg font-mono font-bold text-xs flex items-center gap-2 transition-all duration-200 shadow-xs hover:scale-105"
        >
          <ShoppingBag className="w-4 h-4 text-white" />
          <span className="hidden sm:inline">Linear Cart</span>
          {isMounted && (
            <span className="bg-[#3B82F6] text-white text-[10px] font-black px-2 py-0.5 rounded">
              ${cartTotal.toFixed(2)} ({cartCount})
            </span>
          )}
        </Link>

        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-[#111827]"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
    </nav>
  );
}
