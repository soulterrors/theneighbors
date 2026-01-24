"use client";
import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ShoppingCart, BookOpen, Coffee, Check } from 'lucide-react';

interface CoffeeItem {
  id?: number | string;
  name: string;
  price: number;
  image_url: string | null;
  description: string;
  category: string;
}

export function CoffeeCard({ item, variant, priority = false }: { item: CoffeeItem, variant: 'featured' | 'standard', priority?: boolean }) {
  const [isAdded, setIsAdded] = useState(false);
  const isFeatured = variant === 'featured';
  const isBook = item.category === 'book';
  const shouldPrioritize = isFeatured || priority;

  const handleAddToCart = () => {
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="group relative bg-white border border-stone-200 rounded-[2.5rem] p-5 shadow-sm hover:shadow-2xl transition-all duration-500"
    >
      <div className={`relative overflow-hidden rounded-[2rem] mb-6 bg-stone-50 ${
        isBook ? 'aspect-[2/3]' : 'aspect-square'
      }`}>
        <Image 
          src={item.image_url || 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085'} 
          alt={item.name}
          fill
          priority={shouldPrioritize}
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-in-out"
        />
        
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md p-2 rounded-full shadow-sm">
          {isBook ? <BookOpen size={14} className="text-stone-800" /> : <Coffee size={14} className="text-stone-800" />}
        </div>
      </div>

      <div className="space-y-3 px-1">
        <div className="flex justify-between items-start gap-2">
          <div>
            <h4 className="text-xl font-serif font-bold text-[#1c1c1c] leading-tight">
              {item.name}
            </h4>
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#a68a56] mt-1 font-extrabold">
              {isBook ? 'Library Select' : 'House Blend'}
            </p>
          </div>
          <span className="flex-shrink-0 bg-stone-100 text-stone-800 px-3 py-1 rounded-full text-[11px] font-mono font-bold">
            ${item.price.toFixed(2)}
          </span>
        </div>

        <p className="text-[11px] text-stone-500 leading-relaxed line-clamp-2 italic">
          {item.description}
        </p>

        <motion.button 
          onClick={handleAddToCart}
          disabled={isAdded}
          aria-label={isAdded ? "Added to cart" : `Add ${item.name} to cart`}
          whileHover={!isAdded ? { scale: 1.03, backgroundColor: "#4a5d4e" } : {}}
          whileTap={!isAdded ? { scale: 0.97 } : {}}
          animate={{ backgroundColor: isAdded ? "#4a5d4e" : "#1c1c1c" }}
          className="w-full mt-4 text-white py-4 rounded-full text-[10px] uppercase tracking-[0.2em] font-bold flex items-center justify-center gap-2 cursor-pointer disabled:cursor-default disabled:opacity-100"
        >
          {isAdded ? (
            <>
              <Check size={14} />
              Added
            </>
          ) : (
            <>
              <ShoppingCart size={14} />
              Add to Cart
            </>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
}