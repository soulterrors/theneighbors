"use client";

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface FooterColumnProps {
  title: string;
  links: { name: string; href: string }[];
}

export default function FooterColumn({ title, links }: FooterColumnProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col">
      {/* Mobile Accordion Trigger */}
      <button
        aria-expanded={isOpen}
        className="flex md:hidden items-center justify-between w-full"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-sm font-serif font-bold text-[#1c1c1c] mb-4 uppercase tracking-widest">
          {title}
        </span>
        <div className="text-[#1c1c1c]/40 mb-4">
          <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
            <ChevronDown size={18} />
          </motion.div>
        </div>
      </button>

      {/* Desktop Static Header */}
      <h4 className="hidden md:block text-sm font-serif font-bold text-[#1c1c1c] mb-4 uppercase tracking-widest">
        {title}
      </h4>

      {/* Logic: Mobile to Desktop Response */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:block`}>
        <ul className="space-y-4">
          {links.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                className="text-[13px] text-[#1c1c1c]/60 hover:text-[#1c1c1c] transition-colors font-sans"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
