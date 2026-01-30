export default function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-[200] px-6 py-3 bg-[#1c1c1c] text-[#fdfcf8] font-sans font-medium rounded-full shadow-xl transition-transform focus:outline-none focus:ring-2 focus:ring-[#a68a56] focus:ring-offset-2"
    >
      Skip to content
    </a>
  );
}
