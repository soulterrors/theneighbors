import { getSupabase } from '@/src/utils/supabase/server';
import { CoffeeCard } from '@/src/components/CoffeeCard';
import { Star, Leaf, Coffee as CoffeeIcon } from 'lucide-react';
import * as motion from 'framer-motion/client';

export default async function CoffeePage() {
  const supabase = await getSupabase();
  
  const { data: products } = await supabase
    .from('products')
    .select('id, name, price, image_url, description, category')
    .eq('category', 'coffee');

  if (!products) return null;

  // Curation Logic
  const featured = products.filter(p => p.price > 6.00).slice(0, 3);
  const greenhouse = products.filter(p => p.description.toLowerCase().includes('greenhouse') || p.name.includes('Matcha'));
  const regulars = products.filter(p => !greenhouse.includes(p) && !featured.includes(p));

  return (
    <main className="min-h-screen bg-[#fdfcf8] text-[#1c1c1c] pb-32 px-4 md:px-8">
      
      {/* HEADER */}
      <header className="pt-24 pb-16 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-8xl font-serif italic tracking-tighter"
        >
          The Neighbors
        </motion.h1>
        <p className="text-stone-400 text-[10px] uppercase tracking-[0.6em] mt-6 font-bold">
          Coffee & Botanical Brews
        </p>
      </header>

      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* SEASONAL SPOTLIGHT */}
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

        {/* THE GREENHOUSE */}
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

        {/* THE REGULARS */}
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
    </main>
  );
}