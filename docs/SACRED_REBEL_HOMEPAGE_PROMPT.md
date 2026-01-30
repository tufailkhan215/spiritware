# Sacred Rebel Homepage — Source Analysis & Implementation Prompt

**Source:** [https://spiritware.preview.emergentagent.com/](https://spiritware.preview.emergentagent.com/)  
**Purpose:** Implement this homepage design in the Shopify theme as an **alternate** option. The **current** header and footer remain the **default**. The merchant must be able to **select header and footer style from the theme editor** (e.g. "Default" vs "Sacred Rebel").  
**Scope:** Prompt and documentation only — no code changes. Use this document to implement sections, CSS, and JS animations.

---

## 1. Design Tokens (from source)

| Token | Value | Usage |
|-------|--------|--------|
| **Background — primary** | `#FAF7F2` | Page, hero overlay, light sections |
| **Background — dark** | `#1A1A1A` | Header/footer dark, buttons, badges |
| **Background — warm gray** | `#EDE8E0` | Cards, image placeholders, decorative blurs |
| **Accent** | `#C4A77D` | Labels, badges, hover states, icons, links |
| **Hover dark** | `#2a2a2a` | Button hover, Quick Add hover |
| **Text — primary** | `#1A1A1A` | Headlines, body |
| **Text — muted** | `#1A1A1A` at 50–80% opacity | Descriptions, captions |
| **Text — light** | `#FAF7F2` | On dark backgrounds |
| **Borders** | `#1A1A1A` / `#FAF7F2` / `#C4A77D` at 10–30% opacity | Dividers, inputs, cards |

**Typography:**
- **Serif:** Headings, brand name, quotes, manifesto — `font-serif` (e.g. Georgia / ui-serif).
- **Sans:** Nav, body, labels, buttons — `font-sans` (system UI).
- **Labels:** `text-xs`, `tracking-[0.3em]` or `tracking-widest`, `uppercase`.
- **Headlines:** `text-4xl` → `text-9xl` (responsive), `font-medium` or `font-semibold`, `leading-tight` / `tracking-tight`.
- **Body:** `text-base` / `text-lg`, `leading-relaxed`, opacity 70% for secondary text.

**Spacing / layout:**
- Section vertical: `py-20` to `py-32`.
- Container: `max-w-7xl mx-auto px-6 lg:px-12`.
- Gaps: `gap-4` to `gap-24` (grid/flex).

---

## 2. Header (Alternate — “header-1” / Sacred Rebel)

**Implementation name:** **header-1** (section `header-1.liquid`, classes `.header-1`, assets `header-1.css`, `header-1.js`).

**Theme editor:** Expose a setting **“Header style”** with options: **“Default”** | **“Header 1 (Sacred Rebel)”**. Current theme header = default. When **Header 1 (Sacred Rebel)** is selected, load and render header-1; otherwise use the default header.

**Structure:**
- **Position:** Fixed, full width, top, `z-50`.
- **Background:** Transparent by default; use `transition-all duration-500` so it can change on scroll (e.g. to solid `#FAF7F2` or with shadow).
- **Layout:** Flex, space-between; max-width container as above.

**Left:**
- **Logo/Brand:** “Sacred Rebel” — `font-serif text-2xl md:text-3xl font-semibold tracking-wide text-[#1A1A1A]`, link to `/`.

**Center (desktop):**
- **Nav links:** SHOP, COLLECTIONS, OUR STORY, ETHOS, JOURNAL.
- **Style:** `font-sans text-sm tracking-widest uppercase text-[#1A1A1A]/80`.
- **Hover:** `hover:text-[#1A1A1A] transition-colors duration-300`.
- SHOP and COLLECTIONS: include a small chevron-down icon (`w-3 h-3`) with `transition-transform duration-300` (e.g. rotate when dropdown opens).

**Right:**
- **Cart:** Shopping bag icon, `w-5 h-5 text-[#1A1A1A]`, `transition-transform duration-300 group-hover:scale-110`.
- **Cart count badge:** `absolute -top-2 -right-2`, `w-4 h-4 bg-[#C4A77D] rounded-full text-[10px] text-white`, centered count.
- **Mobile menu:** Hamburger icon, `lg:hidden`, same dark color.

**CSS animations (header):**
- `transition-all duration-500` on header (background/backdrop).
- `transition-colors duration-300` on nav links.
- `transition-transform duration-300` on cart icon (scale 1.1 on hover) and chevrons.

---

## 3. Hero Section

**Content:**
- **Label:** “Where Sacred Meets Savage” — `text-xs tracking-[0.3em] uppercase text-[#C4A77D]`.
- **Headline:** “Wear Your Truth” — `font-serif text-6xl md:text-8xl lg:text-9xl font-medium text-[#1A1A1A] tracking-tight`.
- **Body:** “Consciously crafted clothing for those who live with presence and move with purpose. Minimal, powerful, poetic.” — `text-lg md:text-xl text-[#1A1A1A]/70 max-w-2xl mx-auto leading-relaxed`.
- **Primary CTA:** “Explore Collection” — `bg-[#1A1A1A] text-[#FAF7F2] px-10 py-4 font-sans text-sm tracking-widest uppercase`, link to `#shop`.
- **Secondary CTA:** “Our Story” — `border border-[#1A1A1A]/30 text-[#1A1A1A]`, same padding/type, link to `#story`.
- **Scroll hint:** “SCROLL” + arrow icon at bottom-center; small, muted text.

**Background:**
- Full-bleed image: `w-full h-full object-cover opacity-40`.
- **Resource:** `https://images.pexels.com/photos/33648329/pexels-photo-33648329.jpeg`.
- Overlay: `bg-gradient-to-b from-[#FAF7F2]/30 via-transparent to-[#FAF7F2]`; optional grain overlay (`.grain-overlay`).

**CSS animations (hero):**
- Primary/secondary buttons: `transition-all duration-500` (primary) and `transition-all duration-300` (secondary); primary `hover:bg-[#2a2a2a]`, secondary `hover:border-[#1A1A1A]`.
- Scroll indicator: continuous subtle vertical motion (e.g. `translateY` 4–6px) with smooth transition so it “bounces” or floats — implement via CSS keyframes or JS.

**JS / scroll behavior (optional from source):**
- Hero content may animate in on load (`opacity: 1; transform: none` after initial hidden state), e.g. fade-in or slight translateY. If implementing, use `opacity` and `transform` with a short duration (300–500ms).

---

## 4. Story Section (“A Movement: More Than Fashion”)

**ID:** `#story`. Background `#FAF7F2`. Optional decorative blurs: `bg-[#C4A77D]/5` and `bg-[#EDE8E0]/50` rounded-full blur.

**Layout:** Two columns (image + text). On large screens: image left, text right; on mobile: text first, then image.

**Left (image):**
- Image: **Resource** — `https://images.pexels.com/photos/6944915/pexels-photo-6944915.jpeg`, `aspect-[4/5] object-cover`.
- Optional “image-hover” effect (e.g. slight scale or overlay) with `transition` (e.g. `duration-300`).
- Quote card overlay: “Your body is the altar. Your style is the ritual.” — `bg-[#1A1A1A] text-[#FAF7F2] p-8 max-w-xs font-serif text-xl italic`, positioned e.g. `-bottom-8 -right-8 lg:-right-16`.

**Right (copy):**
- Label: “A Movement” — same label style, `text-[#C4A77D]`.
- Heading: “More Than Fashion” — `font-serif text-4xl md:text-5xl lg:text-6xl text-[#1A1A1A] leading-tight`.
- Body: Multiple paragraphs, `text-base md:text-lg text-[#1A1A1A]/70 leading-relaxed`.
- Link: “Discover Our Ethos” — `font-sans text-sm tracking-widest uppercase`; underline/line that expands on hover: e.g. `w-8 h-px` with `transition-all duration-300 group-hover:w-12`.

**CSS animations:**
- `transition-all duration-300` on “Discover Our Ethos” line.
- Optional fade-in/slide-up when section enters viewport (e.g. `opacity` + `translateY(20px)` → `opacity: 1; transform: none`).

---

## 5. Shop Section (“The Collection: Wearable Prayers”)

**ID:** `#shop`. Background `#FAF7F2`.

**Header:**
- Label: “The Collection”, accent color.
- Heading: “Wearable Prayers”.
- “View All” link with arrow icon; arrow: `transition-transform duration-300 group-hover:translate-x-2`.

**Product grid:** 4 columns on large, 2 on medium; `gap-6 lg:gap-8`.

**Product card:**
- Image container: `aspect-[3/4]`, overflow hidden, `bg-[#EDE8E0]`.
- **Image:** `object-cover transition-transform duration-700 group-hover:scale-105`.
- Optional badge (Best Seller, New, Limited): `absolute top-4 left-4`, `px-3 py-1 bg-[#1A1A1A] text-[#FAF7F2] font-sans text-xs tracking-wider uppercase`.
- **Quick Add:** `absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500`; button `py-3 bg-[#1A1A1A] text-[#FAF7F2] font-sans text-xs tracking-widest uppercase hover:bg-[#2a2a2a] transition-colors duration-300`.
- Title: `font-serif text-lg`, `group-hover:text-[#C4A77D] transition-colors duration-300`.
- Description: `text-sm text-[#1A1A1A]/60 line-clamp-2`.
- Price: `text-sm font-medium`.

**CSS animations:**
- Image: `transition-transform duration-700 group-hover:scale-105`.
- Quick Add bar: `translate-y-full` → `translate-y-0` on card hover, `transition-transform duration-500`.
- Title: `transition-colors duration-300` to accent on hover.
- “View All” arrow: `group-hover:translate-x-2`, `duration-300`.

**Resources (placeholder product images from source):**
- `https://images.pexels.com/photos/5665383/pexels-photo-5665383.jpeg`
- `https://images.pexels.com/photos/27919253/pexels-photo-27919253.jpeg`
- `https://images.pexels.com/photos/34386786/pexels-photo-34386786.jpeg`
- `https://images.pexels.com/photos/16982897/pexels-photo-16982897.jpeg`

---

## 6. Ethos Section (“Our Ethos”)

**ID:** `#ethos`. Background `#1A1A1A`, text `#FAF7F2`.

**Decorative:** Thin vertical gradient lines, e.g. `from-transparent to-[#C4A77D]/30`, at sides.

**Header:**
- Label: “What We Stand For”, `text-[#C4A77D]`.
- Heading: “Our Ethos”.
- Subtext: `text-[#FAF7F2]/60 max-w-2xl mx-auto`.

**Grid:** 4 columns on large, 2 on medium; cards `p-8 border border-[#FAF7F2]/10`.

**Per card:**
- Icon wrapper: `w-16 h-16` circle, `border border-[#C4A77D]/30`, `group-hover:border-[#C4A77D] transition-colors duration-500`.
- Title: `font-serif text-xl`.
- Body: `font-sans text-sm text-[#FAF7F2]/60 leading-relaxed`.
- Card border: `hover:border-[#C4A77D]/50 transition-all duration-500`.

**Icons (from source):** Leaf, Sparkles, Flame, Heart (e.g. Lucide-style SVGs), color `#C4A77D`.

**CSS / JS animations:**
- Cards and header can start as `opacity: 0; transform: translateY(30px)` and animate to `opacity: 1; transform: none` when in viewport (Intersection Observer or similar).
- Card border and icon border: `transition-all duration-500` / `transition-colors duration-500`.

---

## 7. Manifesto Section (“The Sacred Rebel Manifesto”)

Background `#EDE8E0`. Optional `.grain-overlay`.

**Content:**
- Label: “Our Words”, accent.
- Heading: “The Sacred Rebel Manifesto”.
- Lines (serif, large):
  - “We dress to reclaim our softness as strength.”
  - “Our beauty as boundary.”
  - “Our bodies as altar.”
  - “Power doesn't have to shout.”
  - “It drips in velvet, walks in gold, and speaks in sacred tongues.”
  - “We wear our truth like armor.”
  - “We rebel by remembering.”
- Closing: “You don't wear this to be seen—you wear it to be remembered.” with small accent line above.

**Typography:** `font-serif text-xl md:text-2xl lg:text-3xl text-[#1A1A1A]/80 leading-relaxed`.

**CSS / JS animations:**
- Each block can use `opacity: 0; transform: translateY(20px)` or `translateY(30px)` and animate in on scroll (same pattern as Ethos).

---

## 8. Community Section (“Community Voices”)

**ID:** `#community`. Background `#FAF7F2`.

**Header:** Label “The Tribe Speaks”, heading “Community Voices”.

**Layout:** Testimonial + image; nav (prev/next) and dots.

**Testimonial:**
- **Resource:** `https://images.pexels.com/photos/6697737/pexels-photo-6697737.jpeg`, `aspect-square object-cover`, `bg-[#EDE8E0]`.
- Quote icon block: `bg-[#C4A77D]`, quote SVG, `#FAF7F2`.
- Quote text: `font-serif text-2xl md:text-3xl text-[#1A1A1A] leading-relaxed`.
- Author: name + location, `font-sans`.

**Nav:**
- Prev/next: `w-12 h-12 border border-[#1A1A1A]/20`, `hover:border-[#C4A77D] hover:text-[#C4A77D] transition-all duration-300`.
- Dots: `w-2 h-2 rounded-full`, active `bg-[#C4A77D]`, inactive `bg-[#1A1A1A]/20 hover:bg-[#1A1A1A]/40`, `transition-all duration-300`.

**JS:** Carousel/slider for multiple testimonials (optional); CSS handles hover states only.

---

## 9. CTA Section (“Ready to Rebel with Reverence?”)

Full-bleed background image; overlay `bg-[#1A1A1A]/70`.

**Resource:** `https://images.pexels.com/photos/34386786/pexels-photo-34386786.jpeg` (or same as one shop image), `w-full h-full object-cover`.

**Content:**
- Heading: “Ready to Rebel with Reverence?” — `font-serif text-4xl md:text-5xl lg:text-6xl text-[#FAF7F2] leading-tight`.
- Subtext: “Join thousands of conscious warriors…” — `text-lg md:text-xl text-[#FAF7F2]/70`.
- Button: “Shop the Collection” — `px-12 py-5 bg-[#FAF7F2] text-[#1A1A1A] font-sans text-sm tracking-widest uppercase hover:bg-[#C4A77D] hover:text-[#FAF7F2] transition-all duration-500`; arrow with `group-hover:translate-x-2 transition-transform duration-300`.

**CSS / JS animations:**
- Content block: optional `opacity: 0; transform: translateY(30px)` → in-view animation.
- Button and arrow: transitions as above.

---

## 10. Footer (Alternate — “Sacred Rebel”)

**Theme editor:** Expose **“Footer style”** with options: **“Default”** | **“Sacred Rebel”**. Current theme footer = default.

**Background:** `#1A1A1A`. Text `#FAF7F2`; muted `#FAF7F2` at 40–70% opacity.

**Top block (newsletter):**
- Border bottom: `border-[#FAF7F2]/10`.
- Heading: “Join the Rebellion”; short description.
- Email input: `bg-transparent border-b border-[#FAF7F2]/30`, `placeholder-[#FAF7F2]/40`, `focus:border-[#C4A77D] transition-colors duration-300`.
- Submit: arrow icon, `text-[#C4A77D] hover:text-[#FAF7F2] transition-colors duration-300`.

**Links grid:** 4 columns (brand + Shop, Company, Support).

- **Brand:** “Sacred Rebel”, tagline, social (Instagram, TikTok) — circles `border-[#FAF7F2]/20`, `hover:border-[#C4A77D] hover:text-[#C4A77D] transition-all duration-300`.
- **Columns:** Uppercase labels `text-[#FAF7F2]/40`, links `text-[#FAF7F2]/70 hover:text-[#C4A77D] transition-colors duration-300`.

**Bottom bar:**
- Copyright; Privacy Policy, Terms — `text-[#FAF7F2]/40 hover:text-[#FAF7F2] transition-colors duration-300`.

**CSS animations:**
- All link and input focus/hover: `transition-colors duration-300` (or `transition-all duration-300` for borders).

---

## 11. Animation Summary (CSS & JS)

**CSS-only:**
- **Transitions:** `duration-300` (links, borders, icons, Quick Add bar), `duration-500` (header bg, primary buttons, card borders, CTA button), `duration-700` (product image scale).
- **Hover:** color/border changes, `scale-105` (images), `scale-110` (cart icon), `translate-y-0` (Quick Add), `translate-x-2` (arrows), `w-12` (underline).
- **Scroll indicator:** keyframes for subtle vertical motion (e.g. 4–6px translateY).

**JS-driven (recommended):**
- **Scroll-in:** Sections or blocks with `opacity: 0; transform: translateY(20px|30px)` animate to `opacity: 1; transform: none` when entering viewport (Intersection Observer); use one short duration (e.g. 400–600ms) and optional stagger for multiple elements.
- **Hero:** Optional initial load animation for tagline, headline, body, buttons (fade or slide).
- **Community:** Optional carousel for testimonials (prev/next + dots).
- **Header:** Optional scroll-based background change (e.g. add class when `scrollY > threshold`).

**Do not** rely on inline `style="opacity: 1; transform: none"` in the final theme; treat those as “already animated” state and implement via classes + JS/CSS.

---

## 12. Theme Editor Requirements

- **Header:** Setting **“Header style”** (or “Header layout”) with:
  - **Default** — current theme header.
  - **Header 1 (Sacred Rebel)** — alternate header per §2 (implementation name: **header-1**).
- **Footer:** Setting **“Footer style”** (or “Footer layout”) with:
  - **Default** — current theme footer.
  - **Sacred Rebel** — alternate footer per §10.
- Sections for Hero, Story, Shop, Ethos, Manifesto, Community, CTA should be addable/editable in the theme editor; use this doc for structure, tokens, and animations when building those sections.

---

## 13. Asset / Resource URLs (from source)

| Use | URL |
|-----|-----|
| Hero background | `https://images.pexels.com/photos/33648329/pexels-photo-33648329.jpeg` |
| Story image | `https://images.pexels.com/photos/6944915/pexels-photo-6944915.jpeg` |
| Shop product 1 | `https://images.pexels.com/photos/5665383/pexels-photo-5665383.jpeg` |
| Shop product 2 | `https://images.pexels.com/photos/27919253/pexels-photo-27919253.jpeg` |
| Shop product 3 / CTA | `https://images.pexels.com/photos/34386786/pexels-photo-34386786.jpeg` |
| Shop product 4 | `https://images.pexels.com/photos/16982897/pexels-photo-16982897.jpeg` |
| Community testimonial | `https://images.pexels.com/photos/6697737/pexels-photo-6697737.jpeg` |

Icons (Lucide-style): chevron-down, shopping-bag, menu, arrow-down, arrow-right, leaf, sparkles, flame, heart, quote, chevron-left, chevron-right, instagram, music (TikTok). Prefer inline SVG or theme assets; do not depend on external icon CDN in production.

---

## 14. Local Assets (Header-1 / Sacred Rebel Layout)

When **Header 1 (Sacred Rebel)** is selected in the theme editor, the layout loads these local assets (no external CDN beyond Google Fonts):

| Asset | Purpose |
|-------|--------|
| **sacred-rebel-base.css** | Sacred Rebel base: Google Fonts (Cormorant Garamond, Inter), `:root` CSS variables (--sr-cream, --sr-charcoal-hex, --sr-accent-hex, etc.), `.font-serif` / `.font-sans` under `.sr-theme`, keyframes (float, fadeInUp, reveal), animation classes (animate-float, animate-fade-in-up, animate-reveal), scrollbar, selection, `.image-hover`, `.text-gradient`, `.grain-overlay`. |
| **header-1.css** | Header 1 section styles (fixed header, nav, cart, mobile). |
| **header-1.js** | Header 1 scroll background, mobile menu, cart badge. |

**Body class:** When header style is Header 1, `<body>` gets class **sr-theme** so Sacred Rebel typography and utilities apply. New sections added for the Sacred Rebel homepage should use classes `.font-serif`, `.font-sans`, `.animate-fade-in-up`, `.image-hover`, `.grain-overlay`, and CSS variables (e.g. `var(--sr-cream-hex)`, `var(--sr-accent-hex)`) so they match the source.

**Source head not included:** PostHog, emergent.sh scripts, debug-monitor, and Tailwind CDN are not added; the theme uses sacred-rebel-base.css and section CSS instead of Tailwind.

---

## 15. Implementation Notes

- **Local assets:** See §14 for sacred-rebel-base.css, header-1.css, header-1.js, and body.sr-theme.
- **No code in this repo:** This file is prompt/reference only; implementation is done in theme sections, layout, and assets.
- **Liquid:** Header and footer variants are conditional on theme settings (e.g. `settings.header_style == 'sacred_rebel'`); default = current header/footer.
- **Tailwind:** Source uses Tailwind; theme may use plain CSS or a different system — map classes above to your CSS (variables for colors, typography, spacing).
- **Accessibility:** Preserve semantic HTML (header, main, footer, nav, sections, headings hierarchy), skip-to-content, and focus states when implementing.
- **Performance:** Prefer CSS transitions/animations; use JS only where needed (scroll-in, carousel, header scroll). Lazy-load below-the-fold images.
