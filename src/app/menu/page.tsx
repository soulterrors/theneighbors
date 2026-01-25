import { getSupabase } from '@/src/utils/supabase/server';
import { CoffeeCard } from '@/src/components/CoffeeCard';
import { 
  ShoppingBag, Coffee, BookOpen, Star, 
  Leaf, Terminal, Heart, Sparkles,
  ChevronLeft, ChevronRight 
} from 'lucide-react';
import Link from 'next/link';

export const revalidate = 3600;

export default async function OrderPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const supabase = await getSupabase();
  const PAGE_SIZE = 15;
  
  // 1. Handle Pagination Logic
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  const from = (currentPage - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  // 2. Fetch Paginated Data from 'products' table
  const { data: products, count } = await supabase
    .from('products')
    .select('id, name, price, image_url, description, category', { count: 'exact' })
    .in('category', ['coffee', 'book'])
    .range(from, to);

  const totalPages = count ? Math.ceil(count / PAGE_SIZE) : 1;

  // 3. Sidebar Category Data
  const categories = [
    { name: 'All Items', icon: <ShoppingBag size={14} />, group: 'general' },
    { name: 'Coffee', icon: <Coffee size={14} />, group: 'coffee' },
    { name: 'Espresso', icon: <Star size={14} />, group: 'coffee' },
    { name: 'Tea & Matcha', icon: <Leaf size={14} />, group: 'coffee' },
    { name: 'Library', icon: <BookOpen size={14} />, group: 'book' },
    { name: 'Tech & AI', icon: <Terminal size={14} />, group: 'book' },
    { name: 'Favorites', icon: <Heart size={14} />, group: 'book' },
  ];

  if (!products) return null;

  return (
    <main className="min-h-screen bg-[#fdfcf8] pb-32 px-4 md:px-8 pt-24">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER */}
        <header className="mb-12 text-center lg:text-left">
          <h1 className="text-4xl md:text-7xl font-serif italic tracking-tighter text-stone-900">The Market</h1>
          <p className="text-stone-400 text-[10px] uppercase tracking-[0.4em] mt-4 font-bold">
            Coffee, Books, & Everything in Between
          </p>
        </header>

        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* --- OMNI-SIDEBAR (RE-ADDED) --- */}
          <aside className="lg:w-72 flex-shrink-0">
            <div className="lg:sticky lg:top-24 space-y-10">
              
              <div>
                <h3 className="text-[10px] uppercase tracking-[0.4em] font-black text-stone-300 mb-6 px-4">Department</h3>
                <nav className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-visible no-scrollbar gap-2 p-1">
                  {categories.map((cat) => (
                    <button 
                      key={cat.name}
                      className="flex items-center gap-3 px-5 py-4 rounded-2xl text-[11px] font-bold uppercase tracking-widest whitespace-nowrap transition-all duration-300 bg-white border border-stone-100 shadow-sm hover:shadow-md hover:border-black text-stone-500 hover:text-black group"
                    >
                      <span className={`${cat.group === 'book' ? 'text-blue-600' : 'text-orange-700'} opacity-40 group-hover:opacity-100 transition-opacity`}>
                        {cat.icon}
                      </span>
                      {cat.name}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Status Card */}
              <div className="hidden lg:block p-8 bg-stone-900 text-stone-100 rounded-[2.5rem] shadow-xl relative overflow-hidden">
                <Sparkles className="absolute -top-2 -right-2 opacity-10 w-24 h-24" />
                <p className="text-[10px] uppercase tracking-widest font-bold opacity-50 mb-2 font-mono">Open Tab</p>
                <p className="text-xl font-serif italic mb-4 leading-snug">Everything you need, all in one place.</p>
                <div className="h-[1px] w-full bg-stone-700 mb-4" />
                <p className="text-[9px] uppercase tracking-widest opacity-60">Ready for pickup at Neighbors.</p>
              </div>
            </div>
          </aside>

          {/* --- MAIN MARKET GRID --- */}
          <section className="flex-grow bg-[#f2f2f2] rounded-[3.5rem] py-12 px-6 md:px-12 border border-stone-200 shadow-inner">
            <div className="flex justify-between items-end mb-12 border-b border-stone-300 pb-8">
              <div>
                <h2 className="text-3xl font-serif italic text-stone-800">Current Collection</h2>
                <p className="text-stone-500 text-[10px] uppercase tracking-widest mt-1">
                  Displaying {products.length} of {count} items
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {products.map((item, index) => (
                <CoffeeCard key={item.id} item={item} variant="standard" priority={index < 4} />
              ))}
            </div>

            {/* --- PAGINATION CONTROLS --- */}
            <div className="mt-20 flex items-center justify-center gap-4">
              {currentPage === 1 ? (
                <span className="p-4 rounded-full bg-white border border-stone-200 opacity-20 cursor-not-allowed">
                  <ChevronLeft size={20} aria-hidden="true" />
                </span>
              ) : (
                <Link
                  href={`/menu?page=${Math.max(1, currentPage - 1)}`}
                  aria-label="Previous page"
                  className="p-4 rounded-full bg-white border border-stone-200 transition-all hover:bg-black hover:text-white"
                >
                  <ChevronLeft size={20} aria-hidden="true" />
                </Link>
              )}

              <div className="flex gap-2">
                {[...Array(totalPages)].map((_, i) => (
                  <Link
                    key={i}
                    href={`/menu?page=${i + 1}`}
                    aria-label={`Page ${i + 1}`}
                    aria-current={currentPage === i + 1 ? 'page' : undefined}
                    className={`w-12 h-12 flex items-center justify-center rounded-full border text-[10px] font-bold transition-all ${
                      currentPage === i + 1
                      ? 'bg-black text-white border-black shadow-lg'
                      : 'bg-white border-stone-200 hover:border-black'
                    }`}
                  >
                    {i + 1}
                  </Link>
                ))}
              </div>

              {currentPage === totalPages ? (
                <span className="p-4 rounded-full bg-white border border-stone-200 opacity-20 cursor-not-allowed">
                  <ChevronRight size={20} aria-hidden="true" />
                </span>
              ) : (
                <Link
                  href={`/menu?page=${Math.min(totalPages, currentPage + 1)}`}
                  aria-label="Next page"
                  className="p-4 rounded-full bg-white border border-stone-200 transition-all hover:bg-black hover:text-white"
                >
                  <ChevronRight size={20} aria-hidden="true" />
                </Link>
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}