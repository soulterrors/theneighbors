## 2024-05-23 - SocialIcon Accessibility
**Learning:** `SocialIcon` components wrapping SVG icons were missing accessible names, making them invisible to screen readers.
**Action:** Added a `label` prop to `SocialIcon` to pass to `aria-label`. Always check wrapped icon components for accessible names.

## 2024-05-23 - Interactive Button Feedback
**Learning:** Adding feedback to buttons (e.g., "Added" state) improves UX but can introduce accessibility regressions if `disabled` state contrast is too low.
**Action:** Always ensure `disabled:opacity-100` or specific styles are applied when the disabled state is used for feedback rather than actual un-interactivity.
