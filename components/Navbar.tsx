"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingBag, Search, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) setIsMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navLinks = [
    { name: 'Order', href: '/contact' },
    { name: 'Coffee', href: '/coffee' },
    { name: 'Library', href: '/library' },
    { name: 'Events', href: '/events' },
    { name: 'About', href: '/about' }
  ];

  return (
    <>
      <nav className="bg-[#f4f1ea]/90 backdrop-blur-md sticky top-0 z-[100] border-b-[0.5px] border-[#dcd7cc] shadow-[0_1px_3px_rgba(0,0,0,0.05)] w-full">
        <div className="max-w-7xl mx-auto px-6 h-24 flex justify-between items-center">
          
          {/* Logo Section */}
          <div className="flex-shrink-0 w-1/4">
            <Link href="/" className="group flex flex-col items-start">
              {/* Added a slight lift animation on logo hover */}
              <motion.span 
                whileHover={{ y: -2 }}
                className="text-xl font-serif font-bold tracking-[0.3em] text-[#2c2926] transition-opacity group-hover:opacity-70"
              >
                THE NEIGHBORS
              </motion.span>
              <span className="text-[8px] tracking-[0.4em] text-[#8b5e3c] uppercase mt-0.5 font-sans font-medium">
                Coffee & Chapters
              </span>
            </Link>
          </div>

          {/* Desktop Links with Hover Effects */}
          <div className="hidden lg:flex items-center justify-center space-x-10 w-2/4">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <motion.div 
                  key={link.name} 
                  className="relative py-2"
                  whileHover="hover" // Triggers "hover" variant in children
                >
                  <Link
                    href={link.href}
                    className={`text-[12px] uppercase tracking-[0.25em] transition-colors duration-300 ${
                      isActive ? "text-[#8b5e3c]" : "text-[#2c2926]/70 group-hover:text-[#2c2926]"
                    }`}
                  >
                    {/* Character-level hover pop effect */}
                    <motion.span
                      variants={{
                        hover: { y: -1, color: "#2c2926" }
                      }}
                      className="inline-block"
                    >
                      {link.name}
                    </motion.span>
                  </Link>
                  
                  {/* The Underline (Now with a hover "preview" state) */}
                  {isActive ? (
                    <motion.div 
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#8b5e3c]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  ) : (
                    <motion.div 
                      variants={{
                        hover: { scaleX: 1, opacity: 1 }
                      }}
                      initial={{ scaleX: 0, opacity: 0 }}
                      className="absolute bottom-0 left-0 w-full h-[1px] bg-[#8b5e3c]/30 origin-left"
                    />
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Right Section Icons */}
          <div className="flex items-center justify-end space-x-8 w-1/4">
            <motion.button
              whileHover={{ y: -3, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="hidden lg:block text-[#2c2926]/50 hover:text-[#2c2926] transition-colors"
              aria-label="Search"
            >
              <Search size={18} strokeWidth={1.2} />
            </motion.button>

            <motion.button
              whileHover={{ y: -3, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="hidden lg:block text-[#2c2926]/50 hover:text-[#2c2926] transition-colors"
              aria-label="Cart"
            >
              <ShoppingBag size={18} strokeWidth={1.2} />
            </motion.button>
            
            <button 
              onClick={() => setIsMenuOpen(true)}
              className="lg:hidden p-2 text-[#2c2926] hover:text-[#8b5e3c] transition-colors"
            >
              <Menu size={24} strokeWidth={1.2} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu (Persistent from previous step) */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-[#2c2926]/30 backdrop-blur-sm z-[104]"
            />
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[320px] bg-[#f4f1ea] z-[105] shadow-2xl border-l border-[#dcd7cc]"
            >
              <div className="p-10 flex flex-col h-full bg-[url('https://www.transparenttextures.com/patterns/p6.png')]">
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="self-end p-2 text-[#2c2926]/40 mb-16 hover:rotate-90 transition-transform duration-300"
                >
                  <X size={26} strokeWidth={1.2} />
                </button>

                <div className="flex flex-col space-y-10">
                  {navLinks.map((link, i) => (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 + 0.2 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsMenuOpen(false)}
                        className={`text-3xl font-serif italic tracking-wide group flex items-center gap-4 ${
                          pathname === link.href ? "text-[#8b5e3c]" : "text-[#2c2926]"
                        }`}
                      >
                        {link.name}
                        {pathname === link.href && (
                          <motion.div 
                            layoutId="mobile-dot"
                            className="w-1.5 h-1.5 rounded-full bg-[#8b5e3c]" 
                          />
                        )}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}