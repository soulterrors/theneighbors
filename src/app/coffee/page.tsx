import { getSupabase } from '@/src/utils/supabase/server';
import { CoffeeCard, type CoffeeItem } from '@/src/components/CoffeeCard';
import { Star, Leaf, Coffee as CoffeeIcon, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export const revalidate = 3600;

export default async function CoffeePage() {
  let featured: CoffeeItem[] = [];
  let greenhouse: CoffeeItem[] = [];
  let regulars: CoffeeItem[] = [];

  try {
    const supabase = await getSupabase();

    // PARALLEL QUERIES FOR SCALABILITY
    const [featuredData, greenhouseData, regularsData] = await Promise.all([
      // Query 1: Featured (Limit 3, price > 6.00)
      supabase
        .from('products')
        .select('id, name, price, image_url, description, category')
        .eq('category', 'coffee')
        .gt('price', 6.00)
        .limit(3),

      // Query 2: Greenhouse (Limit 6, text search)
      supabase
        .from('products')
        .select('id, name, price, image_url, description, category')
        .eq('category', 'coffee')
        .or('description.ilike.%greenhouse%,name.ilike.%Matcha%')
        .limit(6),

      // Query 3: Regulars (Limit 12, general selection)
      supabase
        .from('products')
        .select('id, name, price, image_url, description, category')
        .eq('category', 'coffee')
        .limit(12)
    ]);

    featured = featuredData.data || [];
    greenhouse = greenhouseData.data || [];
    regulars = regularsData.data || [];
  } catch (error) {
    console.warn("Supabase fetch failed, using fallback data:", error);
  }

  return (
    <main className="min-h-screen bg-[#fdfcf8] text-[#1c1c1c] pb-32 px-4 md:px-8">
      
      <header className="pt-24 pb-8 text-center">
        <h1
          className="text-5xl md:text-8xl font-serif italic tracking-tighter animate-fade-in-up"
        >
          The Neighbors
        </h1>
        <p className="text-stone-400 text-[10px] uppercase tracking-[0.6em] mt-6 font-bold">
          Coffee & Botanical Brews
        </p>
      </header>

      <ViewAllButton />

      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* SECTION 1: SEASONAL SPOTLIGHT */}
        <section className="bg-[#1c1c1c] text-[#f4f1ea] rounded-[3.5rem] py-16 md:py-24 px-8 md:px-16 shadow-2xl">
          <div className="flex items-center gap-3 mb-12">
            <Star size={18} className="text-[#a68a56]" fill="currentColor" />
            <h2 className="text-xs font-bold uppercase tracking-[0.4em]">Seasonal Spotlight</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {featured.map((item) => (
              <CoffeeCard key={item.id} item={item} variant="featured" />
            ))}
          </div>
        </section>

        {/* SECTION 2: THE GREENHOUSE */}
        <section className="bg-[#e9ece9] rounded-[3.5rem] py-16 md:py-24 px-8 md:px-16 border border-[#dce2dc]">
          <div className="flex items-center gap-3 mb-12 text-[#4a5d4e]">
            <Leaf size={20} />
            <h2 className="text-3xl font-serif italic font-bold">The Greenhouse</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {greenhouse.map((item) => (
              <CoffeeCard key={item.id} item={item} variant="standard" />
            ))}
          </div>
        </section>

        {/* SECTION 3: THE REGULARS */}
        <section className="bg-[#f2e8cf] rounded-[3.5rem] py-16 md:py-24 px-8 md:px-16 border border-[#e5d5b0]">
          <div className="flex items-center gap-3 text-stone-800 mb-12">
            <CoffeeIcon size={20} />
            <h2 className="text-3xl font-serif italic font-bold">The Regulars</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {regulars.map((item) => (
              <CoffeeCard key={item.id} item={item} variant="standard" />
            ))}
          </div>
        </section>

      </div>

      <ViewAllButton />
    </main>
  );
}

const ViewAllButton = () => (
  <div className="flex justify-center py-12">
    <Link
      href="/coffee/all"
      className="px-10 py-4 rounded-full border-2 border-stone-200 text-stone-800 text-[10px] uppercase tracking-[0.3em] font-bold transition-all duration-300 flex items-center gap-3 bg-white shadow-sm hover:border-transparent hover:scale-105 hover:bg-[#1c1c1c] hover:text-white active:scale-95"
    >
      Browse All Drinks
      <ChevronRight size={14} className="opacity-40" />
    </Link>
  </div>
);