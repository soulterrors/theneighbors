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
