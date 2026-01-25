## 2024-05-23 - SocialIcon Accessibility
**Learning:** `SocialIcon` components wrapping SVG icons were missing accessible names, making them invisible to screen readers.
**Action:** Added a `label` prop to `SocialIcon` to pass to `aria-label`. Always check wrapped icon components for accessible names.

## 2024-05-23 - Interactive Button Feedback
**Learning:** Adding feedback to buttons (e.g., "Added" state) improves UX but can introduce accessibility regressions if `disabled` state contrast is too low.
**Action:** Always ensure `disabled:opacity-100` or specific styles are applied when the disabled state is used for feedback rather than actual un-interactivity.

## 2026-01-25 - Pagination Link Accessibility
**Learning:** Visually disabling links using `pointer-events-none` does not remove them from the keyboard tab order, leaving them accessible and potentially confusing.
**Action:** When a link is disabled (e.g., current page, first/last page controls), render a non-interactive element (like `span`) instead of a `Link`, or ensure `aria-disabled="true"` and `tabIndex={-1}` are applied if the anchor must remain.
