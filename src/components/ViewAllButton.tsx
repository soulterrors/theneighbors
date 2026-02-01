import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface ViewAllButtonProps {
  href: string;
  children: React.ReactNode;
}

export default function ViewAllButton({ href, children }: ViewAllButtonProps) {
  return (
    <div className="flex justify-center py-12">
      <Link
        href={href}
        className="px-10 py-4 rounded-full border-2 border-stone-200 text-stone-800 text-[10px] uppercase tracking-[0.3em] font-bold transition-all duration-300 flex items-center gap-3 bg-white shadow-sm hover:border-transparent hover:scale-105 hover:bg-[#1c1c1c] hover:text-white active:scale-95 group"
      >
        {children}
        <ChevronRight size={14} className="opacity-40 group-hover:opacity-100 transition-opacity" />
      </Link>
    </div>
  );
}
