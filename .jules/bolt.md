## 2026-01-22 - Initial Setup
**Learning:** Initialized Bolt's performance journal.
**Action:** Document critical performance learnings here.

## 2026-01-22 - LCP Optimization on Grids
**Learning:** Lazy loading the first few images in a grid delays LCP significantly. `CoffeeCard` defaulted to lazy loading.
**Action:** Passed `priority={index < 4}` to the first row of items in `menu/page.tsx` and updated `CoffeeCard` to accept this prop.

## 2026-01-23 - Font Optimization & CLS
**Learning:** The project relied on system fonts/unoptimized loading for "EB Garamond" and "Inter", causing potential CLS. `next/font` integration requires applying variable classes to `html` (not just `body`) when using Tailwind v4 to ensure correct cascade over Preflight styles.
**Action:** Implemented `next/font` in `layout.tsx` and mapped variables in `globals.css` using Tailwind v4 `@theme`.

## 2026-01-24 - Partial Hydration for Footers
**Learning:** Splitting static footer links (Server Component) from mobile accordion logic (Client Component) significantly reduces hydration cost. The previous monolithic Client Component hydrated everything even on desktop where no interactivity was needed.
**Action:** Identify other "interactive-only-on-mobile" components (like navigation menus or filters) and apply the same pattern: Server Component shell + Client Component islands for the interactive parts.

## 2026-01-25 - Framer Motion in Large Lists
**Learning:** Using `framer-motion`'s `whileInView` or `whileHover` on list items (like `CoffeeCard`) forces the entire item to be a Client Component, significantly increasing hydration cost.
**Action:** For lists, prefer standard CSS transitions for hover and native lazy loading for images. Extract interactive buttons into small Client Components ("Islands") to keep the main list item as a Server Component.

## 2026-01-26 - CSS Replacement for Interaction-Free Hovers
**Learning:** Simple hover effects (scaling, translation) implemented with JS libraries (like Framer Motion) force the parent component to be a Client Component. Replacing these with standard CSS `hover:` classes allows the component (like `Navbar`) to remain a Server Component, reducing JS bundle size.
**Action:** Audit interactive components; if an interaction is purely visual (hover/focus) and doesn't require state, rewrite it in CSS/Tailwind to avoid `use client`.

## 2026-01-27 - Landing Page Server Component Conversion
**Learning:** Using JS animation libraries for above-the-fold content (like Hero sections) forces the entire page to hydrate, delaying interactivity and LCP. Converting these to CSS keyframes allows the Landing Page to remain a Server Component, sending zero JS for the content.
**Action:** For Hero sections, always prefer CSS `@keyframes` over JS libraries to keep the page static and fast.

## 2026-01-28 - CSS over Framer Motion for Simple Interactions
**Learning:** Using `framer-motion` for simple hover states (like scaling) or entry animations forces component hydration, converting Server Components to Client Components.
**Action:** Replace `motion.button` and `motion.div` with standard CSS `hover:` states and CSS `@keyframes` (e.g., `animate-fade-in-up`) to keep pages as Server Components and reduce JS bundle size.
