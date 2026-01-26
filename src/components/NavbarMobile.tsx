"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarMobileProps {
  navLinks: { name: string; href: string }[];
}

export default function NavbarMobile({ navLinks }: NavbarMobileProps) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1024px)');

    const handleMediaChange = (e: MediaQueryListEvent | MediaQueryList) => {
      if (e.matches) setIsMenuOpen(false);
    };

    // Initial check
    handleMediaChange(mediaQuery);

    mediaQuery.addEventListener('change', handleMediaChange);
    return () => mediaQuery.removeEventListener('change', handleMediaChange);
  }, []);

  return (
    <>
      <button
        aria-label="Open menu"
        onClick={() => setIsMenuOpen(true)}
        className="lg:hidden p-2 text-[#1c1c1c]"
      >
        <Menu size={24} strokeWidth={1.2} />
      </button>

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
                <button
                  aria-label="Close menu"
                  onClick={() => setIsMenuOpen(false)}
                  className="self-end p-2 text-[#1c1c1c]/40 mb-8"
                >
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
