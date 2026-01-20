"use client";

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Instagram, Youtube, Twitter, Facebook, ChevronDown, Music2 } from 'lucide-react';

export default function Footer() {
  const footerSections = [
    {
      title: "About Us",
      links: [
        { name: "Our Company", href: "/about" },
        { name: "Our Coffee", href: "/coffee-story" },
        { name: "The Library", href: "/library" },
        { name: "Sustainability", href: "/impact" },
      ]
    },
    {
      title: "Careers",
      links: [
        { name: "Culture and Values", href: "/culture" },
        { name: "Belonging at The Neighbors", href: "/belonging" },
        { name: "Current Openings", href: "/jobs" },
      ]
    },
    {
      title: "Social Impact",
      links: [
        { name: "Community Outreach", href: "/community" },
        { name: "Neighbors Foundation", href: "/foundation" },
      ]
    },
    {
      title: "For Partners",
      links: [
        { name: "Local Roasters", href: "/partners" },
        { name: "Supplier Relations", href: "/suppliers" },
      ]
    },
  ];

  return (
    <footer className="bg-[#ece9e1] border-t border-[#1c1c1c]/10 pt-16 pb-8 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        
        {/* --- NAVIGATION --- */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-16">
          {footerSections.map((section) => (
            <FooterColumn key={section.title} title={section.title} links={section.links} />
          ))}
        </div>

        <hr className="border-[#1c1c1c]/10 mb-8" />

        {/* --- SOCIAL & LEGAL SECTION --- */}
        <div className="flex flex-col space-y-8">
          <div className="flex items-center gap-4">
            <SocialIcon icon={<Instagram size={20} />} href="https://instagram.com" />
            <SocialIcon icon={<Music2 size={20} />} href="https://spotify.com" />
            <SocialIcon icon={<Youtube size={20} />} href="https://youtube.com" />
            <SocialIcon icon={<Twitter size={20} />} href="https://twitter.com" />
            <SocialIcon icon={<Facebook size={20} />} href="https://facebook.com" />
          </div>

          {/* Legal Links (Stacked on Mobile) */}
          <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-8">
            <LegalLink href="/privacy">Privacy Notice</LegalLink>
            <LegalLink href="/terms">Terms of Use</LegalLink>
            <LegalLink href="/accessibility">Accessibility</LegalLink>
            <LegalLink href="/cookies">Cookie Preferences</LegalLink>
          </div>

          <p className="text-[11px] text-[#1c1c1c]/40 font-medium">
            © 2026 The Neighbors Coffee Company. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

// Sub-component for Mobile Responsiveness (Accordion)
function FooterColumn({ title, links }: { title: string; links: { name: string; href: string }[] }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col">
      <button 
        className="flex items-center justify-between w-full md:cursor-default"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h4 className="text-sm font-serif font-bold text-[#1c1c1c] mb-4 uppercase tracking-widest">
          {title}
        </h4>
        <div className="md:hidden text-[#1c1c1c]/40 mb-4">
          <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
            <ChevronDown size={18} />
          </motion.div>
        </div>
      </button>

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

function SocialIcon({ icon, href }: { icon: React.ReactNode; href: string }) {
  return (
    <Link 
      href={href} 
      className="w-10 h-10 rounded-full bg-[#1c1c1c] text-[#f4f1ea] flex items-center justify-center hover:bg-[#a68a56] transition-all"
    >
      {icon}
    </Link>
  );
}

function LegalLink({ children, href }: { children: React.ReactNode; href: string }) {
  return (
    <Link href={href} className="text-[13px] font-medium text-[#1c1c1c] hover:underline underline-offset-4">
      {children}
    </Link>
  );
}