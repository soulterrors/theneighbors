import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import * as motion from 'framer-motion/client';

interface ViewAllButtonProps {
  href: string;
  label: string;
}

export default function ViewAllButton({ href, label }: ViewAllButtonProps) {
  return (
    <div className="flex justify-center py-12">
      <Link href={href} className="group outline-none">
        <motion.span
          whileHover={{ scale: 1.05, backgroundColor: "#1c1c1c", color: "#fff" }}
          whileTap={{ scale: 0.95 }}
          className="px-10 py-4 rounded-full border-2 border-stone-200 text-stone-800 text-[10px] uppercase tracking-[0.3em] font-bold transition-all duration-300 flex items-center gap-3 bg-white shadow-sm hover:border-transparent group-focus-visible:ring-2 group-focus-visible:ring-[#1c1c1c] group-focus-visible:ring-offset-2"
        >
          {label}
          <ChevronRight size={14} className="opacity-40" />
        </motion.span>
      </Link>
    </div>
  );
}
