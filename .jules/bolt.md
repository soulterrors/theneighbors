## 2026-01-22 - Initial Setup
**Learning:** Initialized Bolt's performance journal.
**Action:** Document critical performance learnings here.

## 2026-01-22 - LCP Optimization on Grids
**Learning:** Lazy loading the first few images in a grid delays LCP significantly. `CoffeeCard` defaulted to lazy loading.
**Action:** Passed `priority={index < 4}` to the first row of items in `menu/page.tsx` and updated `CoffeeCard` to accept this prop.
