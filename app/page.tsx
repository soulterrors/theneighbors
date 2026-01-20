"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Sparkles, Leaf, Coffee, ArrowDown } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#fdfcf8] pb-24">
      
      <div className="bg-[#2c2926] text-[#f4f1ea] py-3 px-6 flex justify-center items-center gap-4 sticky top-24 z-[95] shadow-md border-b border-white/5">
        <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] font-medium italic">Your table is waiting</span>
        <Link 
          href="/coffee" 
          className="text-[10px] uppercase tracking-[0.2em] font-bold border border-[#f4f1ea] px-4 py-1.5 rounded-full hover:bg-[#8b5e3c] transition-all"
        >
          Start an order
        </Link>
      </div>

      {/* --- HERO BANNER --- */}
      <section className="relative h-[85vh] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1481833761820-0509d3217039?q=80&w=2000" 
            alt="The Neighbors Coffee Shop Interior" 
            className="w-full h-full object-cover sepia-[0.2] contrast-[0.9] brightness-[0.7]"
          />
          {/* Grain Overlay */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/p6.png')] opacity-30 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-[#ece9e1]/10" />
        </div>

        <div className="relative z-10 text-center px-6">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-[10px] md:text-xs uppercase tracking-[0.5em] text-[#f4f1ea] mb-6 block font-medium"
          >
            Est. 2026 — Ohio
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-8xl font-serif italic text-[#f4f1ea] mb-8"
          >
            Caffeine & Chapters
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-[#f4f1ea]/80 max-w-lg mx-auto font-sans text-sm md:text-base leading-relaxed mb-10 tracking-wide"
          >
            A quiet corner for the curious. Carefully curated beans paired with deeply moving stories.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex flex-col md:flex-row items-center justify-center gap-6"
          >
            <Link 
              href="/coffee" 
              className="bg-[#f4f1ea] text-[#2c2926] px-10 py-4 text-[10px] uppercase tracking-widest font-bold hover:bg-[#8b5e3c] hover:text-[#f4f1ea] transition-all duration-300 shadow-2xl"
            >
              Order Coffee
            </Link>
            <Link 
              href="/library" 
              className="border border-[#f4f1ea] text-[#f4f1ea] px-10 py-4 text-[10px] uppercase tracking-widest font-bold hover:bg-[#f4f1ea] hover:text-[#2c2926] transition-all duration-300"
            >
              Browse Books
            </Link>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }} 
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[#f4f1ea]/50"
        >
          <ArrowDown size={20} strokeWidth={1} />
        </motion.div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-24 space-y-32">
        
        {/* --- MAIN SPOTLIGHT --- */}
        <section className="grid md:grid-cols-2 bg-[#1e3932] text-white overflow-hidden rounded-sm shadow-xl">
          <div className="relative aspect-square md:aspect-auto">
            <img 
              src="https://images.unsplash.com/photo-1559496417-e7f25cb247f3?q=80&w=1000" 
              alt="Seasonal Brew" 
              className="w-full h-full object-cover sepia-[0.1] contrast-[1.1]"
            />
          </div>
          <div className="flex flex-col justify-center items-center text-center p-12 md:p-20 space-y-6">
            <h2 className="text-4xl md:text-5xl font-serif font-bold leading-tight">Vanilla Oak is here</h2>
            <p className="text-sm md:text-base font-sans leading-relaxed max-w-md opacity-90 italic">
              Steeped for 20 hours and finished with a touch of smoked vanilla. Pair it with our new collection of transcendentalist poetry.
            </p>
            <Link 
              href="/coffee" 
              className="mt-4 text-[11px] uppercase tracking-[0.25em] bg-white text-[#1e3932] px-8 py-3 rounded-full font-bold hover:bg-[#f4f1ea] transition-colors"
            >
              Explore the brew
            </Link>
          </div>
        </section>

        {/* --- REWARDS --- */}
        <section className="relative grid md:grid-cols-2 bg-[#f4f1ea] border border-[#dcd7cc] rounded-sm overflow-hidden">
          <div className="p-12 md:p-20 flex flex-col justify-center space-y-6">
            <div className="flex items-center gap-2 text-[#8b5e3c]">
              <Sparkles size={16} />
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Loyalty</span>
            </div>
            <h2 className="text-4xl font-serif font-bold text-[#2c2926]">Start a Tab.</h2>
            <p className="text-sm font-sans text-[#2c2926]/70 leading-relaxed italic">
              Become a regular. Earn "Ink Points" with every cup and book. Redeem them for limited edition zines or your morning pour-over.
            </p>
            <Link href="/account" className="inline-block w-fit text-[11px] uppercase tracking-[0.2em] bg-[#2c2926] text-white px-8 py-4 rounded-sm hover:bg-[#8b5e3c] transition-colors">
              Join the Circle
            </Link>
          </div>
          <div className="bg-[#8b5e3c]/10 flex items-center justify-center p-12">
            <div className="w-64 h-80 bg-white shadow-2xl rotate-3 flex flex-col p-6 border border-[#dcd7cc] relative">
              <div className="w-full h-40 bg-[#f4f1ea] mb-4" />
              <div className="space-y-2">
                <div className="h-2 w-3/4 bg-[#2c2926]/10" />
                <div className="h-2 w-1/2 bg-[#2c2926]/10" />
              </div>
              <div className="mt-auto pt-4 border-t border-[#dcd7cc] text-[10px] font-mono text-[#8b5e3c]">
                MEMBER NO. 042
              </div>
            </div>
          </div>
        </section>

        {/* --- SECONDARY TILES (About Us & Library) --- */}
        <div className="grid md:grid-cols-2 gap-8">
          <motion.section 
            whileHover={{ y: -4 }}
            className="bg-[#d4e9e2] text-[#1e3932] p-12 text-center flex flex-col items-center justify-center space-y-4 rounded-sm border border-[#1e3932]/10"
          >
            <h3 className="text-2xl font-serif font-bold italic">The Neighborhood Philosophy</h3>
            <p className="text-xs uppercase tracking-widest leading-loose max-w-xs">
              We believe the best stories are found in the margins of a well-loved book and the bottom of a warm cup.
            </p>
            <Link href="/about" className="text-[10px] border-b border-[#1e3932] pb-1 uppercase tracking-widest font-bold">
              Our Story
            </Link>
          </motion.section>

          <motion.section 
            whileHover={{ y: -4 }}
            className="bg-[#f2f0eb] text-[#2c2926] p-12 text-center flex flex-col items-center justify-center space-y-4 border border-[#dcd7cc] rounded-sm"
          >
            <h3 className="text-2xl font-serif font-bold">New Chapters</h3>
            <p className="text-xs uppercase tracking-widest leading-loose max-w-xs">
              Check out this month's curated selection of independent zines and vintage first-editions.
            </p>
            <Link href="/library" className="text-[10px] border-b border-[#2c2926] pb-1 uppercase tracking-widest font-bold">
              Browse Library
            </Link>
          </motion.section>
        </div>

        {/* --- SECRET MENU --- */}
        <section className="grid md:grid-cols-2 gap-8 items-center bg-[#fdfcf8] py-12">
          <div className="order-2 md:order-1 relative h-[500px] rounded-sm overflow-hidden group border border-[#dcd7cc]">
            <img 
              src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1000" 
              alt="Healthier Choices" 
              className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-[#4a5d4e]/10" />
          </div>
          <div className="order-1 md:order-2 p-8 md:pl-16 space-y-6 text-left">
            <div className="flex items-center gap-2 text-[#4a5d4e]">
              <Leaf size={16} />
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold">The Greenhouse</span>
            </div>
            <h2 className="text-4xl font-serif font-bold text-[#2c2926]">The Off-Menu Elixirs.</h2>
            <p className="text-sm font-sans text-[#2c2926]/70 leading-relaxed max-w-md">
              Our "Secret Menu" is actually our cleanest. Think functional mushrooms, house-made nut milks, and raw honey infusions. Better for the body, better for the mind.
            </p>
            <Link href="/coffee?category=secret" className="inline-block text-[11px] border-b-2 border-[#4a5d4e] pb-1 uppercase tracking-[0.2em] font-bold text-[#2c2926]">
              Ask the Barista
            </Link>
          </div>
        </section>

        {/* --- THE LISTENING CORNER (Can be updated to show "Next Event") --- */}
        <section className="bg-[#2c2926] text-[#f4f1ea] rounded-sm overflow-hidden flex flex-col md:flex-row shadow-2xl">
          <div className="md:w-1/3 h-64 md:h-auto overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=1000" 
              alt="Vinyl Records" 
              className="w-full h-full object-cover opacity-60"
            />
          </div>
          <div className="md:w-2/3 p-12 md:p-20 flex flex-col justify-center text-left">
            <div className="flex items-center gap-2 text-[#8b5e3c] mb-4">
              <Coffee size={16} />
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Atmosphere</span>
            </div>
            <h2 className="text-4xl font-serif font-bold leading-tight mb-6">The Listening Corner.</h2>
            <p className="text-stone-400 font-sans leading-relaxed max-w-xl mb-8">
              We spin vinyl from open to close. Come in, put on a pair of house headphones, and let the lofi beats guide your study session or your next great read.
            </p>
            <div className="flex gap-4">
              <Link href="/playlist" className="text-[10px] uppercase tracking-[0.2em] border border-stone-600 px-6 py-3 hover:bg-[#f4f1ea] hover:text-[#2c2926] transition-all">
                View Weekly Playlist
              </Link>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}