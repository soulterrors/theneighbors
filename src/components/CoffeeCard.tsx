"use client";
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  image_url: string;
  description: string;
  category?: string;
}

export function CoffeeCard({ item, variant }: { item: Product, variant: 'featured' | 'standard' }) {
  const isFeatured = variant === 'featured';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`group relative bg-white border border-stone-200 rounded-[2rem] p-5 shadow-sm hover:shadow-xl transition-all duration-300 ${
        isFeatured ? 'md:col-span-1' : ''
      }`}
    >
      
      <div className="relative aspect-square overflow-hidden rounded-[1.5rem] mb-6 bg-stone-50">
        <Image 
          src={item.image_url || 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085'} 
          alt={item.name}
          fill
          priority={isFeatured}
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
        />
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-start">
          <div>
            <h4 className="text-xl font-serif font-bold text-[#1c1c1c] leading-tight">
              {item.name}
            </h4>
            <p className="text-[10px] uppercase tracking-widest text-stone-400 mt-1 font-bold">
              {isFeatured ? 'Seasonal Select' : 'House Blend'}
            </p>
          </div>
          <span className="bg-[#4a5d4e] text-white px-3 py-1 rounded-full text-xs font-bold">
            ${item.price.toFixed(2)}
          </span>
        </div>

        <p className="text-xs text-stone-500 leading-relaxed line-clamp-2">
          {item.description}
        </p>

        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full mt-4 bg-[#1c1c1c] text-white py-4 rounded-full text-[10px] uppercase tracking-[0.2em] font-bold flex items-center justify-center gap-2 hover:bg-[#4a5d4e] transition-colors"
        >
          <ShoppingCart size={14} />
          Add to Cart
        </motion.button>
      </div>
    </motion.div>
  );
}