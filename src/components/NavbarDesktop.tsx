"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

interface NavbarDesktopProps {
  navLinks: { name: string; href: string }[];
}

export default function NavbarDesktop({ navLinks }: NavbarDesktopProps) {
  const pathname = usePathname();

  return (
    <div className="hidden lg:flex items-center justify-center space-x-10 w-2/4">
      {navLinks.map((link) => {
        const isActive = pathname === link.href;
        return (
          <div key={link.name} className="relative py-2 group">
            <Link
              href={link.href}
              className={`text-[12px] uppercase tracking-[0.25em] transition-colors duration-300 ${
                isActive ? "text-[#a68a56]" : "text-[#1c1c1c]/70 hover:text-[#1c1c1c]"
              }`}
            >
              <span className="block transition-transform duration-300 group-hover:-translate-y-px">
                {link.name}
              </span>
            </Link>
            {isActive && (
              <motion.div
                layoutId="nav-underline"
                className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#a68a56]"
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
