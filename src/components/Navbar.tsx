import Link from 'next/link';
import { ShoppingBag, Search } from 'lucide-react';
import NavbarMobile from './NavbarMobile';
import NavbarDesktop from './NavbarDesktop';

export default function Navbar() {
  const navLinks = [
    { name: 'Order', href: '/menu' },
    { name: 'Coffee', href: '/coffee' },
    { name: 'Library', href: '/library' },
    { name: 'Events', href: '/events' },
  ];

  return (
    <nav className="bg-[#ece9e1]/90 backdrop-blur-md sticky top-0 z-[100] border-b-[0.5px] border-[#dcd7cc] shadow-[0_1px_3px_rgba(0,0,0,0.05)] w-full">
      <div className="max-w-7xl mx-auto px-6 h-24 flex justify-between items-center">

        {/* Logo Section */}
        <div className="flex-shrink-0 w-1/4">
          <Link href="/" className="group flex flex-col items-start">
            <span
              className="text-xl font-serif font-bold tracking-[0.3em] text-[#1c1c1c] transition-opacity group-hover:opacity-70 transition-transform duration-300 group-hover:-translate-y-0.5"
            >
              THE NEIGHBORS
            </span>
            <span className="text-[8px] tracking-[0.4em] text-[#a68a56] uppercase mt-0.5 font-sans font-medium">
              Coffee & Chapters
            </span>
          </Link>
        </div>

        {/* Desktop Links */}
        <NavbarDesktop navLinks={navLinks} />

        {/* Right Icons */}
        <div className="flex items-center justify-end space-x-8 w-1/4">
          <button
            aria-label="Search"
            className="hidden lg:block text-[#1c1c1c]/50 transition-transform duration-300 hover:-translate-y-1 hover:scale-110"
          >
            <Search size={18} strokeWidth={1.2} />
          </button>
          <button
            aria-label="View cart"
            className="hidden lg:block text-[#1c1c1c]/50 transition-transform duration-300 hover:-translate-y-1 hover:scale-110"
          >
            <ShoppingBag size={18} strokeWidth={1.2} />
          </button>

          <NavbarMobile navLinks={navLinks} />
        </div>
      </div>
    </nav>
  );
}
