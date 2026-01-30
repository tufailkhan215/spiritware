# Alternate Header & Footer — Analysis & Implementation Suggestions

**Reference site:** https://spiritware.preview.emergentagent.com/  
**Scope:** Add a second header and footer (preview style) without replacing existing ones. All new sections, snippets, and assets. Theme setting to choose which header/footer to use.

---

## 1. Site Analysis Checklist (spiritware.preview.emergentagent.com)

Use this checklist when you can load the preview site (browser or tools). Document findings so the alternate header/footer can be recreated accurately.

### 1.1 Overall structure
- [ ] Layout: full-width vs contained, grid/flex
- [ ] Background colors/gradients, section spacing
- [ ] Typography: font families, sizes, weights, line-heights
- [ ] Breakpoints and responsive behavior

### 1.2 Header (preview style)
- [ ] **Structure:** Promo bar (yes/no), logo area, nav, search, cart, CTA
- [ ] **Logo:** Image vs text, size, alignment, link
- [ ] **Navigation:** Horizontal vs mega menu, dropdowns, link style (uppercase, underline, etc.)
- [ ] **Search:** Inline vs icon-triggered, position
- [ ] **Cart:** Icon + count, position, opens drawer or goes to cart page
- [ ] **Sticky:** Sticky on scroll (yes/no), background/opacity change
- [ ] **Mobile:** Hamburger, slide-out menu, full-screen overlay, or accordion
- [ ] **Animations:** Fade-in on load, slide-down on scroll, hover transitions, menu open/close
- [ ] **CSS:** Classes used, custom properties, shadows, borders

### 1.3 Footer (preview style)
- [ ] **Structure:** Rows/columns (e.g. newsletter, 4 columns, bottom bar)
- [ ] **Newsletter:** Heading, description, input, button, placement
- [ ] **Columns:** Number, headings, link lists, store info, social
- [ ] **Bottom bar:** Copyright, legal links, payment icons
- [ ] **Background:** Solid color, gradient, or image
- [ ] **Animations:** Hover on links, icons, or CTA; scroll-in effects
- [ ] **CSS:** Spacing, typography, link styles

### 1.4 CSS to document
- [ ] All CSS files or inline `<style>` blocks
- [ ] Custom properties (e.g. `--header-height`, `--footer-bg`)
- [ ] Media queries and breakpoints
- [ ] Animations/keyframes: names, duration, easing
- [ ] Transitions on interactive elements

### 1.5 JavaScript / animations
- [ ] Header: menu toggle, search open/close, cart drawer, sticky behavior
- [ ] Footer: newsletter form, accordions (if any)
- [ ] Scroll-based: header shrink, fade-in sections, parallax
- [ ] GSAP, AOS, or vanilla JS
- [ ] Event listeners and data attributes used

### 1.6 Resources & images
- [ ] Logo file(s)
- [ ] Icons (cart, menu, search, social)
- [ ] Background images for header/footer
- [ ] Any SVG or PNG assets

---

## 2. Implementation Approach (Suggestions Only — No File Edits Here)

### 2.1 Principle
- **Do not replace** existing `sections/header.liquid` or `sections/footer.liquid`.
- **Add new** sections and snippets for the “preview” header and footer.
- **Store all** new CSS, JS, and images in the **`assets/`** folder.
- **Add a theme setting** so the merchant can choose which header and which footer to use.

### 2.2 New files to create (suggested)

| Type   | Suggested path | Purpose |
|--------|----------------|---------|
| Section | `sections/header-preview.liquid` | Alternate header (preview design). |
| Section | `sections/footer-preview.liquid` | Alternate footer (preview design). |
| Snippet | `snippets/header-preview-nav.liquid` | Nav/menu for preview header. |
| Snippet | `snippets/header-preview-mobile.liquid` | Mobile menu for preview header. |
| Snippet | `snippets/footer-preview-newsletter.liquid` | Newsletter block for preview footer. |
| Snippet | `snippets/footer-preview-columns.liquid` | Column links for preview footer. |
| CSS    | `assets/header-preview.css` | Styles for preview header only. |
| CSS    | `assets/footer-preview.css` | Styles for preview footer only. |
| JS     | `assets/header-preview.js` | Header behavior (menu, search, sticky, etc.). |
| JS     | `assets/footer-preview.js` | Footer behavior if any (e.g. accordions). |
| Images | `assets/logo-preview.png` (or .svg) | Preview header logo (example). |
| Images | `assets/icon-*.svg` | Icons used only by preview header/footer. |

All new resources and images for this alternate design should live under **`assets/`** (no external URLs for critical UI assets).

### 2.3 Theme setting to select header and footer

**Suggested:** Add to `config/settings_schema.json` (in the “Theme” or a new “Header & Footer” group):

```json
{
  "type": "select",
  "id": "header_style",
  "label": "Header style",
  "options": [
    { "value": "default", "label": "Default header" },
    { "value": "preview", "label": "Preview header (alternate)" }
  ],
  "default": "default"
},
{
  "type": "select",
  "id": "footer_style",
  "label": "Footer style",
  "options": [
    { "value": "default", "label": "Default footer" },
    { "value": "preview", "label": "Preview footer (alternate)" }
  ],
  "default": "default"
}
```

**Suggested layout change** (in `layout/theme.liquid` — **only as a suggestion**, not an edit in this repo):

- **Header:** Instead of always `{% section 'header' %}`, use:
  - `{% if settings.header_style == 'preview' %}{% section 'header-preview' %}{% else %}{% section 'header' %}{% endif %}`
- **Footer:** Instead of always `{% section 'footer' %}`, use:
  - `{% if settings.footer_style == 'preview' %}{% section 'footer-preview' %}{% else %}{% section 'footer' %}{% endif %}`

Optional: load preview-only CSS/JS conditionally, e.g. only when `settings.header_style == 'preview'` or `settings.footer_style == 'preview'`, so the default theme is unchanged when not using the alternate.

### 2.4 Section schemas
- `header-preview.liquid` and `footer-preview.liquid` should have their own **section schemas** (settings for logo, menus, links, newsletter, etc.), independent of the default header/footer.
- Reuse existing global settings (e.g. colors, fonts) where it makes sense, but keep preview-specific options in the new sections.

---

## 3. CSS & JS Animation Notes (To Document From Preview Site)

When analyzing https://spiritware.preview.emergentagent.com/, record:

1. **Header**
   - Transition duration/easing for sticky, menu open/close, hover.
   - Keyframe names (e.g. `slideDown`, `fadeIn`).
   - Z-index and stacking context for overlay/dropdown.

2. **Footer**
   - Hover effects on links and buttons.
   - Any “scroll into view” or stagger animations.

3. **Shared**
   - Whether animations are reduced when `prefers-reduced-motion: reduce`.
   - Any inline styles that should become CSS classes in `header-preview.css` / `footer-preview.css`.

---

## 4. Summary

| Item | Suggestion |
|------|------------|
| **Analyze** | Use Section 1 checklist on the preview site and document structure, CSS, JS, animations, and assets. |
| **Assets** | All new images, CSS, and JS for the alternate header/footer go in **`assets/`**. |
| **Sections** | New sections: `header-preview.liquid`, `footer-preview.liquid` — do not replace `header.liquid` or `footer.liquid`. |
| **Snippets** | New snippets for preview header/footer only (nav, mobile menu, newsletter, columns, etc.). |
| **Selection** | Add theme settings `header_style` and `footer_style` (e.g. default vs preview) and, in layout, conditionally render the chosen header and footer. |
| **No edits** | This document does not change any existing theme files; it only suggests new files and one optional layout change. |

Implement by: (1) analyzing the preview site with the checklist above, (2) adding the new sections/snippets and assets, (3) adding the theme settings, and (4) optionally updating the layout to use the selected header and footer.
