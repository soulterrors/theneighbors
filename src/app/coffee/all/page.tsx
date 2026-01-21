import { getSupabase } from '@/src/utils/supabase/server';
import { CoffeeCard } from '@/src/components/CoffeeCard';
import { ArrowLeft, Coffee, Droplets, Leaf, Star, Thermometer, Wind } from 'lucide-react';
import Link from 'next/link';
import * as motion from 'framer-motion/client';

export const revalidate = 3600;

export default async function AllDrinksPage() {
  const supabase = await getSupabase();
  const { data: drinks } = await supabase
    .from('products')
    .select('*')
    .eq('category', 'coffee');

  if (!drinks) return null;

  const categories = [
    { name: 'All Brews', icon: <Coffee size={14} /> },
    { name: 'Espresso', icon: <Thermometer size={14} /> },
    { name: 'Cold Brew', icon: <Droplets size={14} /> },
    { name: 'Loose Leaf Tea', icon: <Leaf size={14} /> },
    { name: 'Matcha & Lattes', icon: <Wind size={14} /> },
    { name: 'Seasonal', icon: <Star size={14} /> },
  ];

  return (
    <main className="min-h-screen bg-[#fdfcf8] pb-32 px-4 md:px-8 pt-24">
      <div className="max-w-7xl mx-auto">
        
        {/* Back Navigation */}
        <Link href="/coffee" className="inline-flex items-center gap-2 text-stone-400 hover:text-stone-800 transition-colors mb-12 group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Back to Curation</span>
        </Link>

        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* --- FILTER SIDEBAR --- */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="lg:sticky lg:top-24 space-y-8">
              <div>
                <h3 className="text-[10px] uppercase tracking-[0.4em] font-black text-stone-400 mb-6 px-4">Filter By Type</h3>
                <nav className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-visible no-scrollbar gap-2 p-1">
                  {categories.map((cat) => (
                    <button 
                      key={cat.name}
                      className="flex items-center gap-3 px-5 py-4 rounded-2xl text-[11px] font-bold uppercase tracking-widest whitespace-nowrap transition-all duration-300 bg-white border border-stone-100 shadow-sm hover:shadow-md hover:border-[#4a5d4e] text-stone-600 hover:text-[#4a5d4e] group"
                    >
                      <span className="opacity-40 group-hover:opacity-100 transition-opacity">
                        {cat.icon}
                      </span>
                      {cat.name}
                    </button>
                  ))}
                </nav>
              </div>
              
              {/* Promo Card */}
              <div className="hidden lg:block p-8 bg-[#4a5d4e] text-[#eff2ef] rounded-[2.5rem] shadow-xl">
                <p className="text-xs font-serif italic mb-2">Barista's Tip:</p>
                <p className="text-[10px] leading-relaxed opacity-80 uppercase tracking-wider font-bold">
                  Try the Cold Brew with a splash of oat milk for the smoothest finish.
                </p>
              </div>
            </div>
          </aside>

          {/* --- PRODUCTS GRID --- */}
          <section className="flex-grow bg-[#e9ece9] rounded-[3.5rem] py-16 px-8 md:px-12 border border-[#dce2dc] shadow-inner">
            <div className="mb-12">
              <h1 className="text-4xl md:text-6xl font-serif italic tracking-tighter text-[#4a5d4e]">The Full Menu</h1>
              <p className="text-[#4a5d4e]/60 text-[10px] uppercase tracking-[0.4em] mt-4 font-bold">
                Showing all {drinks.length} handcrafted beverages
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {drinks.map((drink) => (
                <CoffeeCard key={drink.id} item={drink} variant="standard" />
              ))}
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}