# Spiritware Preview Homepage — Description, Analysis & Prompt

**Source:** Homepage HTML from https://spiritware.preview.emergentagent.com/ (Sacred Rebel / Emergent).  
**Purpose:** Update the alternate-header/footer prompt accordingly. All resources and images must be stored in the **`assets/`** folder. New header and footer are **additive** (new sections/snippets); do **not** replace existing header/footer. Provide a theme option to **select between headers and footers**.

**Do not change any existing theme code from this document** — this file is suggestions/prompt only.

---

## 1. Meta & Branding (for prompt)

From the provided HTML:

- **Title (reference):** `Emergent | Fullstack App` → for Spiritware/Sacred Rebel use: e.g. `Sacred Rebel` or `{{ page_title }} | {{ shop.name }}`.
- **Description (reference):** `A product of emergent.sh` → for theme: use theme/shop description or “Wearable prayers for those who live boldly.”
- **Theme-color:** `#000000` in reference; preview uses cream `#FAF7F2` and dark `#1A1A1A` — suggest meta theme-color to match brand (e.g. `#1A1A1A`).

---

## 2. Design Tokens (from homepage HTML)

Extract into CSS variables or plain CSS; store in **`assets/`** (e.g. `assets/preview-theme.css` or within section-specific CSS).

| Token        | Value     | Usage |
|-------------|-----------|--------|
| Cream       | `#FAF7F2` | Page bg, header bg (with opacity), light text on dark |
| Dark        | `#1A1A1A` | Text, primary buttons, footer bg, badges |
| Dark hover  | `#2a2a2a` | Button hover |
| Accent gold | `#C4A77D` | Labels, borders on hover, badges, icons, links |
| Light beige | `#EDE8E0` | Cards, image placeholders, decorative blocks |
| Border/overlay | `#FAF7F2` / 10–30% opacity | Footer borders, overlays |
| Font serif  | ui-serif, Georgia, etc. | Headings (“Sacred Rebel”, “Wear Your Truth”) |
| Font sans   | ui-sans-serif, system-ui | Body, nav, buttons, labels |

Typography: headings large (e.g. text-6xl md:text-8xl lg:text-9xl for hero), uppercase labels with tracking (e.g. `tracking-[0.3em]`, `tracking-widest`), serif for hero/quote, sans for UI.

---

## 3. Header (preview style) — Analysis

- **Layout:** Fixed top, full width. Container `max-w-7xl mx-auto px-6 lg:px-12`. Flex: logo left, nav center (hidden on mobile), right: cart icon + mobile menu button.
- **Background:** `bg-[#FAF7F2]/95 backdrop-blur-md shadow-sm py-4` → cream with blur, light shadow.
- **Logo:** Text “Sacred Rebel” — `font-serif text-2xl md:text-3xl font-semibold tracking-wide text-[#1A1A1A]`. Link to `/` (home). No logo image in snippet; if added, store in **`assets/`** (e.g. `assets/logo-preview.svg`).
- **Nav (desktop):** `hidden lg:flex items-center space-x-10`. Links: Shop (with chevron), Collections, Our Story, Ethos, Journal. Style: `font-sans text-sm tracking-widest uppercase text-[#1A1A1A]/80 hover:text-[#1A1A1A] transition-colors duration-300`. Chevron down SVG on Shop/Collections.
- **Cart:** Button with shopping-bag icon, badge “0” — `absolute -top-2 -right-2 w-4 h-4 bg-[#C4A77D] rounded-full text-[10px] text-white`. Icon: Lucide-style bag SVG (store in **`assets/`** as snippet or SVG file).
- **Mobile:** `lg:hidden` menu (hamburger) icon — three lines. No search in header in this HTML.
- **Transitions:** `transition-all duration-500` on header; `duration-300` on nav hover and icon hover (`group-hover:scale-110` on bag).
- **Z-index:** Header `z-50`, logo link `relative z-10` so it stays clickable.

**Resources to store in `assets/`:**
- Logo image (if used): e.g. `assets/logo-preview.png` or `.svg`.
- Icons: cart (shopping-bag), menu (hamburger), chevron-down, chevron-right — as SVGs or sprite in **`assets/`** or snippets.

---

## 4. Footer (preview style) — Analysis

- **Background:** `bg-[#1A1A1A] text-[#FAF7F2]`.
- **Top block:** Border bottom `border-[#FAF7F2]/10`. Two columns: left — “Join the Rebellion” (serif 3xl/4xl), short copy; right — email form: input `bg-transparent border-b border-[#FAF7F2]/30 py-4`, placeholder `placeholder-[#FAF7F2]/40`, submit = arrow icon `text-[#C4A77D] hover:text-[#FAF7F2]`. `max-w-7xl mx-auto px-6 lg:px-12 py-20`.
- **Main grid:** `grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12`.
  - Column 1: Brand — “Sacred Rebel” (link), tagline “Wearable prayers…”, social (Instagram, TikTok) — circles `border border-[#FAF7F2]/20 hover:border-[#C4A77D] hover:text-[#C4A77D]`.
  - Column 2: “Shop” — All Products, New Arrivals, Best Sellers, Limited Drops, Gift Cards.
  - Column 3: “Company” — Our Story, Our Ethos, Sustainability, Journal, Press.
  - Column 4: “Support” — Contact, FAQ, Size Guide, Shipping & Returns, Track Order.
- **Headings:** `font-sans text-xs tracking-widest uppercase mb-6 text-[#FAF7F2]/40`.
- **Links:** `text-sm text-[#FAF7F2]/70 hover:text-[#C4A77D] transition-colors duration-300`.
- **Bottom bar:** `border-t border-[#FAF7F2]/10 mt-16 pt-8`, flex between: “© 2025 Sacred Rebel. All rights reserved.” and links Privacy Policy, Terms of Service (`text-[#FAF7F2]/40 hover:text-[#FAF7F2]`).

**Resources:** Social icons (Instagram, TikTok / music) — store SVGs in **`assets/`** or snippets.

---

## 5. Homepage Sections (for reference — all new sections/snippets)

Implement as **new** sections/snippets; do not replace existing theme sections.

1. **Hero:** Full-viewport, centered. Background image (store in **`assets/`** or use CDN placeholder then replace with asset), overlay gradient, “Where Sacred Meets Savage” label, “Wear Your Truth” headline, short copy, two CTAs (primary dark, outline), scroll indicator (arrow down). Animations: optional fade/transform on load.
2. **Story (#story):** Two-column grid; image (4/5 aspect) with offset quote block; “A Movement” / “More Than Fashion” copy and “Discover Our Ethos” link. Blur decorative circles in bg.
3. **Shop (#shop):** “The Collection” / “Wearable Prayers”, “View All”. Grid of product cards (4 cols desktop): image aspect 3/4, badge (Best Seller, New, Limited), hover “Quick Add” bar (translate-y-full → translate-y-0), title, short description, price. Product images → use **`assets/`** or Shopify product images.
4. **Ethos (#ethos):** Dark bg `#1A1A1A`, “Our Ethos”, 4 value cards (icon in circle, title, text). Icons: leaf, sparkles, flame, heart — store in **`assets/`** (e.g. SVG sprite or snippet).
5. **Manifesto:** Cream/beige bg, “The Sacred Rebel Manifesto”, serif quote lines, grain overlay. No new images if grain is CSS/svg.
6. **Community (#community):** “Community Voices”, testimonial (image + quote + author), prev/next + dots. Testimonial image → **`assets/`**.
7. **CTA:** Full-width image, dark overlay, “Ready to Rebel with Reverence?”, button “Shop the Collection”. Image → **`assets/`**.

All section images and icons should be stored in **`assets/`** (or referenced from Shopify Files and linked in section settings). Do not rely on external URLs (e.g. Pexels) in production; add as theme assets.

---

## 6. CSS & Animations (from HTML)

- **Tailwind-style classes in source:** The reference uses Tailwind (CDN). For Shopify, reimplement with **plain CSS** in **`assets/`** (e.g. `assets/preview-theme.css`, `assets/header-preview.css`, `assets/footer-preview.css`). No Tailwind build required; map utilities to classes (e.g. `duration-300` → `transition-duration: 300ms`).
- **Transitions:** `transition-all duration-500`, `transition-colors duration-300`, `transition-transform duration-300/500/700`. Hover: `group-hover:scale-105`, `group-hover:translate-y-0`, `group-hover:border-[#C4A77D]`, `group-hover:text-[#C4A77D]`.
- **Header:** `backdrop-blur-md` → `backdrop-filter: blur(12px)`.
- **Scroll indicator:** Optional subtle translateY animation (e.g. 2–4px bounce).
- **Product cards:** Image `group-hover:scale-105`; Quick Add bar `translate-y-full` → `translate-y-0` on hover.
- **Ethos cards:** Border `border-[#FAF7F2]/10 hover:border-[#C4A77D]/50`, icon circle `group-hover:border-[#C4A77D]`.
- **Breakpoints:** sm 640px, md 768px, lg 1024px, xl 1280px (max-w-7xl = 80rem).

---

## 7. JavaScript / Behavior (for prompt)

- **Header:** Mobile menu toggle (hamburger) opens drawer/overlay; cart icon opens cart drawer or goes to cart. No search in this header snippet.
- **Footer:** Newsletter form submit (e.g. Shopify customer form or app).
- **Optional:** Scroll-based header background change, fade-in sections on scroll (reimplement with vanilla JS or minimal script; store in **`assets/`**, e.g. `assets/header-preview.js`, `assets/preview-animations.js`).
- **Testimonials:** Prev/next and dots (store slider logic in **`assets/`**).
- **Quick Add:** Product cards “Quick Add” → add to cart (e.g. existing cart drawer + variant picker or link to product page). No change to existing theme code; new sections use new snippets/JS if needed.

---

## 8. Resources & Images — Must Live in `assets/`

| Resource | Suggested path | Notes |
|----------|----------------|--------|
| Logo (preview) | `assets/logo-preview.svg` or `.png` | If text logo is replaced |
| Header icons | `assets/icon-bag.svg`, `assets/icon-menu.svg`, `assets/icon-chevron-down.svg` | Or snippet SVGs |
| Footer social | `assets/icon-instagram.svg`, `assets/icon-tiktok.svg` | Or single sprite |
| Hero image | `assets/hero-preview.jpg` | Replace Pexels URL |
| Story image | `assets/story-preview.jpg` | Replace Pexels URL |
| Product images | Shopify product media or `assets/` placeholders | Section uses collection/products |
| Ethos icons | `assets/icon-leaf.svg`, etc. or sprite | Leaf, sparkles, flame, heart |
| Community/CTA images | `assets/testimonial-preview.jpg`, `assets/cta-preview.jpg` | Replace external URLs |
| Preview CSS | `assets/header-preview.css`, `assets/footer-preview.css`, `assets/preview-theme.css` | Plain CSS, no Tailwind |
| Preview JS | `assets/header-preview.js`, `assets/preview-animations.js` | Menu, optional scroll/animations |

Do **not** hotlink Pexels or external URLs in production; add files to **`assets/`** (or Shopify Files) and reference via Liquid `asset_url` / `file_url`.

---

## 9. Option to Select Header & Footer (suggestion only)

- **Theme settings (suggested):** In `config/settings_schema.json`, add:
  - `header_style`: `default` | `preview`
  - `footer_style`: `default` | `preview`
- **Layout (suggestion only — do not change code from this doc):** In `layout/theme.liquid`, conditionally render:
  - If `settings.header_style == 'preview'` → `{% section 'header-preview' %}` else → `{% section 'header' %}`.
  - If `settings.footer_style == 'preview'` → `{% section 'footer-preview' %}` else → `{% section 'footer' %}`.
- **New sections:** `sections/header-preview.liquid`, `sections/footer-preview.liquid` (and any new homepage sections) — **all new**; do not replace `header.liquid` or `footer.liquid`.
- **New snippets:** e.g. `header-preview-nav.liquid`, `header-preview-mobile.liquid`, `footer-preview-newsletter.liquid`, `footer-preview-columns.liquid`, product card for preview style, etc. — **all new**.

---

## 10. Summary Checklist for Implementation

- [ ] **Prompt updated** from this homepage HTML (Sacred Rebel / Spiritware preview).
- [ ] **Design tokens** (#FAF7F2, #1A1A1A, #C4A77D, #EDE8E0, fonts) implemented in CSS in **`assets/`**.
- [ ] **Header (preview):** Fixed, blur, logo, nav, cart badge, mobile menu — new section + snippets; icons/CSS/JS in **`assets/`**.
- [ ] **Footer (preview):** Newsletter, 4 columns, bottom bar — new section + snippets; CSS/icons in **`assets/`**.
- [ ] **All images and icons** stored in **`assets/`** (or Shopify Files); no replacement of existing header/footer files.
- [ ] **Theme setting** to choose header style and footer style (suggested in schema; layout change suggested only).
- [ ] **No changes** to existing theme code made from this document — implementation follows this as a prompt/spec only.

Use this file as the single source of truth for “update the prompt accordingly” for the Spiritware preview homepage, header, footer, resources, and header/footer selection option.
