## 2024-05-23 - SocialIcon Accessibility
**Learning:** `SocialIcon` components wrapping SVG icons were missing accessible names, making them invisible to screen readers.
**Action:** Added a `label` prop to `SocialIcon` to pass to `aria-label`. Always check wrapped icon components for accessible names.

## 2024-05-23 - Interactive Button Feedback
**Learning:** Adding feedback to buttons (e.g., "Added" state) improves UX but can introduce accessibility regressions if `disabled` state contrast is too low.
**Action:** Always ensure `disabled:opacity-100` or specific styles are applied when the disabled state is used for feedback rather than actual un-interactivity.

## 2026-01-25 - Pagination Link Accessibility
**Learning:** Visually disabling links using `pointer-events-none` does not remove them from the keyboard tab order, leaving them accessible and potentially confusing.
**Action:** When a link is disabled (e.g., current page, first/last page controls), render a non-interactive element (like `span`) instead of a `Link`, or ensure `aria-disabled="true"` and `tabIndex={-1}` are applied if the anchor must remain.

## 2026-02-14 - Responsive Semantics for Interactive Elements
**Learning:** Components like footer columns that are interactive accordions on mobile but static lists on desktop create "ghost" tab stops if the `<button>` element is used on desktop.
**Action:** Use responsive utility classes (e.g., `md:hidden`) to physically swap the HTML element from a `<button>` to a static heading (e.g., `<h4>`) on larger screens to match user expectation and remove invalid tab stops.

## 2026-03-01 - Mirroring Hover Effects for Keyboard Users
**Learning:** Complex interactive cards often rely on `hover` for affordance (lift, zoom), leaving keyboard users without the same context or delight.
**Action:** Use `focus-within` on the card container to mirror `hover` styles, ensuring that focusing any child element (like a button) triggers the card's "active" state.
