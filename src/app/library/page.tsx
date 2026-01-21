import { getSupabase } from '@/src/utils/supabase/server';
import { CoffeeCard } from '@/src/components/CoffeeCard'; 
import { Bookmark, Sparkles, Heart, ChevronRight } from 'lucide-react';
import * as motion from 'framer-motion/client';
import Link from 'next/link';

export const revalidate = 3600; // Vercel Speed Boost

export default async function LibraryPage() {
  const supabase = await getSupabase();
  
  // Fetch all books from the shared products table
  const { data: products } = await supabase
    .from('products')
    .select('id, name, price, image_url, description, category')
    .eq('category', 'book');

  if (!products || products.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#fdfcf8]">
        <p className="font-serif italic text-stone-400">The shelves are currently being organized...</p>
      </div>
    );
  }

  // --- CURATION LOGIC ---
  // 1. Favorites: The top-tier spotlight (First 3 books)
  const favorites = products.slice(0, 3); 

  // 2. Staff Picks: Premium curated selections (Price > $15)
  const staffPicks = products.filter(p => !favorites.includes(p) && p.price > 15).slice(0, 6);

  // 3. Classics: The rest of the collection
  const classics = products.filter(p => !favorites.includes(p) && !staffPicks.includes(p));

  // --- REUSABLE VIEW ALL BUTTON ---
  const ViewAllButton = () => (
    <div className="flex justify-center py-12">
      <Link href="/library/all">
        <motion.button
          whileHover={{ scale: 1.05, backgroundColor: "#1c1c1c", color: "#fff" }}
          whileTap={{ scale: 0.95 }}
          className="px-10 py-4 rounded-full border-2 border-stone-200 text-stone-800 text-[10px] uppercase tracking-[0.3em] font-bold transition-all duration-300 flex items-center gap-3 bg-white shadow-sm hover:border-transparent"
        >
          Browse All Books
          <ChevronRight size={14} className="opacity-40" />
        </motion.button>
      </Link>
    </div>
  );

  return (
    <main className="min-h-screen bg-[#fdfcf8] text-[#1c1c1c] pb-32 px-4 md:px-8">
      
      {/* HEADER */}
      <header className="pt-24 pb-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-6xl md:text-8xl font-serif italic tracking-tighter">
            The Library
          </h1>
          <p className="text-stone-400 text-[10px] uppercase tracking-[0.6em] mt-6 font-bold">
            Quiet Corners & Neighbors' Picks
          </p>
        </motion.div>
      </header>

      {/* TOP VIEW ALL */}
      <ViewAllButton />

      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* SECTION 1: THE FAVORITES (Deep Charcoal) */}
        {favorites.length > 0 && (
          <section className="bg-[#1c1c1c] text-[#f4f1ea] rounded-[3.5rem] py-16 md:py-24 px-8 md:px-16 shadow-2xl overflow-hidden">
            <div className="flex items-center gap-3 mb-12">
              <Heart size={18} className="text-[#a68a56]" fill="currentColor" />
              <h2 className="text-xs font-bold uppercase tracking-[0.4em]">The Favorites</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {favorites.map((item) => (
                <CoffeeCard key={item.id} item={item} variant="featured" />
              ))}
            </div>
          </section>
        )}

        {/* SECTION 2: STAFF PICKS (Steel Blue) */}
        {staffPicks.length > 0 && (
          <section className="bg-[#e2e8f0] rounded-[3.5rem] py-16 md:py-24 px-8 md:px-16 border border-[#cbd5e1] overflow-hidden">
            <div className="flex items-center gap-3 mb-12 text-[#1e293b]">
              <Sparkles size={20} className="text-[#a68a56]" />
              <h2 className="text-3xl font-serif italic font-bold">Staff Picks</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {staffPicks.map((item) => (
                <CoffeeCard key={item.id} item={item} variant="standard" />
              ))}
            </div>
          </section>
        )}

        {/* SECTION 3: THE CLASSICS (Aged Parchment) */}
        {classics.length > 0 && (
          <section className="bg-[#f4f1e8] rounded-[3.5rem] py-16 md:py-24 px-8 md:px-16 border border-[#e5dec9] overflow-hidden">
            <div className="flex items-center gap-3 text-stone-800 mb-12">
              <Bookmark size={20} />
              <h2 className="text-3xl font-serif italic font-bold">The Classics</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {classics.map((item) => (
                <CoffeeCard key={item.id} item={item} variant="standard" />
              ))}
            </div>
          </section>
        )}

      </div>

      {/* BOTTOM VIEW ALL */}
      <ViewAllButton />
      
    </main>
  );
}