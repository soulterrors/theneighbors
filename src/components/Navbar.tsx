"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingBag, Search, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { debounce } from '../utils/performance';

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) setIsMenuOpen(false);
    };

    const debouncedHandleResize = debounce(handleResize, 150);
    window.addEventListener('resize', debouncedHandleResize);
    return () => window.removeEventListener('resize', debouncedHandleResize);
  }, []);

  const navLinks = [
    { name: 'Order', href: '/contact' },
    { name: 'Coffee', href: '/coffee' },
    { name: 'Library', href: '/library' },
    { name: 'Events', href: '/events' },
  ];

  return (
    <>
      <nav className="bg-[#ece9e1]/90 backdrop-blur-md sticky top-0 z-[100] border-b-[0.5px] border-[#dcd7cc] shadow-[0_1px_3px_rgba(0,0,0,0.05)] w-full">
        <div className="max-w-7xl mx-auto px-6 h-24 flex justify-between items-center">
          
          {/* Logo Section */}
          <div className="flex-shrink-0 w-1/4">
            <Link href="/" className="group flex flex-col items-start">
              <motion.span 
                whileHover={{ y: -2 }}
                className="text-xl font-serif font-bold tracking-[0.3em] text-[#1c1c1c] transition-opacity group-hover:opacity-70"
              >
                THE NEIGHBORS
              </motion.span>
              <span className="text-[8px] tracking-[0.4em] text-[#a68a56] uppercase mt-0.5 font-sans font-medium">
                Coffee & Chapters
              </span>
            </Link>
          </div>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center justify-center space-x-10 w-2/4">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <motion.div key={link.name} className="relative py-2" whileHover="hover">
                  <Link
                    href={link.href}
                    className={`text-[12px] uppercase tracking-[0.25em] transition-colors duration-300 ${
                      isActive ? "text-[#a68a56]" : "text-[#1c1c1c]/70 hover:text-[#1c1c1c]"
                    }`}
                  >
                    <motion.span variants={{ hover: { y: -1, color: "#1c1c1c" } }}>
                      {link.name}
                    </motion.span>
                  </Link>
                  {isActive && (
                    <motion.div 
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#a68a56]"
                    />
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Right Icons */}
          <div className="flex items-center justify-end space-x-8 w-1/4">
            <motion.button whileHover={{ y: -3, scale: 1.1 }} className="hidden lg:block text-[#1c1c1c]/50">
              <Search size={18} strokeWidth={1.2} />
            </motion.button>
            <motion.button whileHover={{ y: -3, scale: 1.1 }} className="hidden lg:block text-[#1c1c1c]/50">
              <ShoppingBag size={18} strokeWidth={1.2} />
            </motion.button>
            <button onClick={() => setIsMenuOpen(true)} className="lg:hidden p-2 text-[#1c1c1c]">
              <Menu size={24} strokeWidth={1.2} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-[#1c1c1c]/30 backdrop-blur-sm z-[104]"
            />
            <motion.div 
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[320px] bg-[#ece9e1] z-[105] shadow-2xl border-l border-[#dcd7cc] overflow-y-auto overflow-x-hidden"
            >
              <div className="p-10 flex flex-col min-h-full">
                <button onClick={() => setIsMenuOpen(false)} className="self-end p-2 text-[#1c1c1c]/40 mb-8">
                  <X size={26} strokeWidth={1.2} />
                </button>
                <div className="flex flex-col space-y-8">
                  {navLinks.map((link, i) => (
                    <motion.div key={link.name} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}>
                      <Link
                        href={link.href}
                        onClick={() => setIsMenuOpen(false)}
                        className={`text-2xl font-serif italic tracking-wide flex items-center gap-4 ${
                          pathname === link.href ? "text-[#a68a56]" : "text-[#1c1c1c]"
                        }`}
                      >
                        {link.name}
                        {pathname === link.href && <div className="w-1.5 h-1.5 rounded-full bg-[#a68a56]" />}
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