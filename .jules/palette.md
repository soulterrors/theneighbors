## 2024-05-23 - SocialIcon Accessibility
**Learning:** `SocialIcon` components wrapping SVG icons were missing accessible names, making them invisible to screen readers.
**Action:** Added a `label` prop to `SocialIcon` to pass to `aria-label`. Always check wrapped icon components for accessible names.
