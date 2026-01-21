import { getSupabase } from '@/src/utils/supabase/server';
import { CoffeeCard } from '@/src/components/CoffeeCard';
import { ArrowLeft, Bookmark, Sparkles, Heart, Brain, PenTool, Globe, Terminal } from 'lucide-react';
import Link from 'next/link';
import * as motion from 'framer-motion/client';

export const revalidate = 3600;

export default async function AllBooksPage() {
  const supabase = await getSupabase();
  const { data: books } = await supabase
    .from('products')
    .select('*')
    .eq('category', 'book');

  if (!books) return null;

  // LIBRARY CATEGORIES
  const genres = [
    { name: 'All Volumes', icon: <Bookmark size={14} /> },
    { name: 'Favorites', icon: <Heart size={14} /> },
    { name: 'Staff Picks', icon: <Sparkles size={14} /> },
    { name: 'Tech & AI', icon: <Terminal size={14} /> },
    { name: 'Philosophy', icon: <Brain size={14} /> },
    { name: 'Fiction', icon: <PenTool size={14} /> },
    { name: 'History', icon: <Globe size={14} /> },
  ];

  return (
    <main className="min-h-screen bg-[#fdfcf8] pb-32 px-4 md:px-8 pt-24">
      <div className="max-w-7xl mx-auto">
        
        {/* Back Navigation */}
        <Link href="/library" className="inline-flex items-center gap-2 text-stone-400 hover:text-stone-800 transition-colors mb-12 group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Back to Library</span>
        </Link>

        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* --- GENRE SIDEBAR --- */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="lg:sticky lg:top-24 space-y-8">
              <div>
                <h3 className="text-[10px] uppercase tracking-[0.4em] font-black text-stone-400 mb-6 px-4 text-center lg:text-left">
                  Filter By Genre
                </h3>
                <nav className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-visible no-scrollbar gap-2 p-1">
                  {genres.map((genre) => (
                    <button 
                      key={genre.name}
                      className="flex items-center gap-3 px-5 py-4 rounded-2xl text-[11px] font-bold uppercase tracking-widest whitespace-nowrap transition-all duration-300 bg-white border border-stone-100 shadow-sm hover:shadow-md hover:border-[#1a202c] text-stone-600 hover:text-[#1a202c] group"
                    >
                      <span className="opacity-40 group-hover:opacity-100 transition-opacity">
                        {genre.icon}
                      </span>
                      {genre.name}
                    </button>
                  ))}
                </nav>
              </div>
              
              {/* Library Note Card */}
              <div className="hidden lg:block p-8 bg-[#1a202c] text-[#f4f1ea] rounded-[2.5rem] shadow-xl">
                <p className="text-xs font-serif italic mb-2 text-[#a68a56]">The Librarian's Note:</p>
                <p className="text-[10px] leading-relaxed opacity-80 uppercase tracking-wider font-bold">
                  Take your time. A good book is meant to be discovered, not just found.
                </p>
              </div>
            </div>
          </aside>

          {/* --- BOOKS GRID --- */}
          <section className="flex-grow bg-[#e2e8f0] rounded-[3.5rem] py-16 px-8 md:px-12 border border-[#cbd5e1] shadow-inner">
            <div className="mb-12">
              <h1 className="text-4xl md:text-6xl font-serif italic tracking-tighter text-[#1e293b]">Full Collection</h1>
              <p className="text-[#1e293b]/60 text-[10px] uppercase tracking-[0.4em] mt-4 font-bold">
                Browsing {books.length} curated volumes
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {books.map((book) => (
                <CoffeeCard key={book.id} item={book} variant="standard" />
              ))}
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}