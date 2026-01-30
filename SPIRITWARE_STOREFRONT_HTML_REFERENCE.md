# Spiritware Storefront HTML — Reference (Real Iframe Content)

**Source:** Captured HTML from the real Spiritware / Sacred Rebel storefront (Emergent app inside the iframe).  
**Use:** Single source of truth for copy, structure, design tokens, and section-by-section mapping to the Shopify preview theme.

---

## 1. What to Ignore (Not for Theme)

| Item | Reason |
|------|--------|
| `<div id="in-page-channel-node-id">` | Emergent channel node |
| PostHog scripts (`posthog.com`, `phc_*`) | Analytics; use Shopify analytics or omit |
| `emergent-main.js`, `debug-monitor.js`, `debug-monitor-styles` | Emergent/dev tooling; omit in theme |
| `tailwindcss.com` CDN, inline Tailwind CSS | Theme uses plain CSS in `assets/` |
| `/pod-backups/spiritware/build/static/js/main.*.js` | React app bundle; theme uses Liquid + vanilla JS |
| `data-discover="true"` on links | Emergent discovery; omit or repurpose |
| Inline `style="opacity: 0; transform: translateY(30px)"` etc. | React animation state; theme uses CSS/JS |

---

## 2. Head / Meta (Theme Mapping)

| HTML | Theme usage |
|------|-------------|
| `<meta charset="utf-8">` | In `layout/theme.liquid` |
| `<meta name="viewport" content="width=device-width,initial-scale=1">` | In theme.liquid |
| `<meta name="theme-color" content="#000000">` | Prefer `#1A1A1A` or `#FAF7F2` for brand |
| `<meta name="description" content="A product of emergent.sh">` | Use shop description or e.g. “Wearable prayers for those who live boldly.” |
| `<title>Emergent \| Fullstack App</title>` | Use `{{ page_title }}{% if current_page != 1 %} – Page {{ current_page }}{% endif %} \| {{ shop.name }}` |

---

## 3. Design Tokens (from Tailwind in HTML)

Extract into CSS variables or utility classes; theme already uses these in `preview-theme.css` / `preview-sections.css`.

| Token | Value | Usage in HTML |
|-------|--------|----------------|
| Cream | `#FAF7F2` | Backgrounds, light text on dark, placeholder |
| Dark | `#1A1A1A` | Text, buttons, footer bg, badges |
| Dark hover | `#2a2a2a` | Button hover |
| Accent gold | `#C4A77D` | Labels, icons, hover borders, cart badge |
| Light beige | `#EDE8E0` | Cards, placeholders, Story block |
| Borders (light on dark) | `#FAF7F2` at 10%, 20%, 30%, 40% | Footer borders, inputs, nav |
| Text muted | `#1A1A1A` at 50–80%, `#FAF7F2` at 40–90% | Body copy, subtitles |

**Typography (from HTML):**
- **Serif:** `font-serif` → `ui-serif, Georgia, Cambria, "Times New Roman", Times, serif` — headings, quotes, manifesto.
- **Sans:** `font-sans` → `ui-sans-serif, system-ui, …` — nav, buttons, labels, body.
- **Labels:** `text-xs tracking-[0.3em] uppercase text-[#C4A77D]`.
- **Headings:** Hero `text-6xl md:text-8xl lg:text-9xl`, section `text-4xl md:text-5xl lg:text-6xl`, footer heading `text-3xl md:text-4xl`.

**Spacing / layout:**
- Container: `max-w-7xl mx-auto px-6 lg:px-12` (80rem max, 1.5rem / 3rem padding).
- Section vertical: `py-32` (8rem) common; CTA/footer `py-20`, `py-16`.
- Gaps: `gap-6`, `gap-8`, `gap-12`, `gap-16`, `space-x-10` (nav).

---

## 4. Header (Exact Structure & Copy)

- **Wrapper:** `fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-transparent py-6`  
  (In theme, header-preview uses cream/blur when `header_style == 'preview'`; source HTML uses transparent here.)
- **Container:** `max-w-7xl mx-auto px-6 lg:px-12`.
- **Logo:** `<a href="/">` → `<h1 class="font-serif text-2xl md:text-3xl font-semibold tracking-wide text-[#1A1A1A]">Sacred Rebel</h1></a>`.
- **Nav (desktop):** `hidden lg:flex items-center space-x-10`. Links:
  - Shop (with chevron-down) → `/shop`
  - Collections (with chevron-down) → `/collections`
  - Our Story → `/about`
  - Ethos → `/ethos`
  - Journal → `/journal`
- **Nav link class:** `font-sans text-sm tracking-widest uppercase text-[#1A1A1A]/80 hover:text-[#1A1A1A] transition-colors duration-300`.
- **Cart:** Button with Lucide shopping-bag icon; badge `0` in circle `bg-[#C4A77D]`, `text-[10px] text-white`, `absolute -top-2 -right-2 w-4 h-4 rounded-full`.
- **Mobile:** `lg:hidden` hamburger (three lines). No search in this HTML.

---

## 5. Main — Sections (Order, Copy, and Structure)

### 5.1 Hero

- **Section:** `relative min-h-screen flex items-center justify-center overflow-hidden bg-[#FAF7F2]`.
- **Background:** Image `https://images.pexels.com/photos/33648329/pexels-photo-33648329.jpeg`, `opacity-40`, full cover; overlay `bg-gradient-to-b from-[#FAF7F2]/30 via-transparent to-[#FAF7F2]`.
- **Content (centered):**
  - Label: `Where Sacred Meets Savage` — `font-sans text-xs tracking-[0.3em] uppercase text-[#C4A77D] mb-6`.
  - Headline: `Wear Your Truth` — `font-serif text-6xl md:text-8xl lg:text-9xl font-medium text-[#1A1A1A] mb-8 tracking-tight`.
  - Copy: `Consciously crafted clothing for those who live with presence and move with purpose. Minimal, powerful, poetic.` — `font-sans text-lg md:text-xl text-[#1A1A1A]/70 max-w-2xl mx-auto mb-12 leading-relaxed`.
  - CTAs: Primary `Explore Collection` → `#shop`, `bg-[#1A1A1A] text-[#FAF7F2] hover:bg-[#2a2a2a]`; Secondary `Our Story` → `#story`, `border border-[#1A1A1A]/30 text-[#1A1A1A] hover:border-[#1A1A1A]`.
- **Scroll indicator:** Bottom center, “Scroll” + arrow-down icon, `text-[#1A1A1A]/50`, `text-xs tracking-widest uppercase`.

**Theme:** `sections/preview-hero.liquid` — match labels, heading, copy, CTA text/links; image via section image picker or asset.

---

### 5.2 Story (`#story`)

- **Section:** `py-32 bg-[#FAF7F2] relative overflow-hidden`.
- **Decorative blurs:** `bg-[#C4A77D]/5 rounded-full blur-3xl` (top-right), `bg-[#EDE8E0]/50 rounded-full blur-2xl` (bottom-left).
- **Layout:** `grid lg:grid-cols-2 gap-16 lg:gap-24 items-center`. On desktop: image column first (order-1), text column second (order-2).
- **Image block:** Image `https://images.pexels.com/photos/6944915/pexels-photo-6944915.jpeg`, `aspect-[4/5] object-cover`; behind it `-inset-4 bg-[#EDE8E0] -z-10`.
- **Quote block (overlapping image):** `absolute -bottom-8 -right-8 lg:-right-16 bg-[#1A1A1A] text-[#FAF7F2] p-8 max-w-xs`.  
  **Copy:** `"Your body is the altar. Your style is the ritual."` — `font-serif text-xl italic leading-relaxed`.
- **Text column:**  
  - Label: `A Movement` — `text-[#C4A77D]`.  
  - Heading: `More Than Fashion` — `font-serif text-4xl md:text-5xl lg:text-6xl text-[#1A1A1A] mb-8 leading-tight`.  
  - Body: Three paragraphs (Sacred Rebel positioning, poems/prayers, “expression with impact”).  
  - Link: `Discover Our Ethos` → `#ethos`, with line that grows on hover (`group-hover:w-12`).

**Theme:** `sections/preview-story.liquid` — ensure quote and “Discover Our Ethos” link match; image via section picker.

---

### 5.3 Shop (`#shop`)

- **Section:** `py-32 bg-[#FAF7F2] relative`.
- **Header row:** Label `The Collection`, heading `Wearable Prayers`, link `View All` (arrow-right) → `#` (theme: use collection URL).
- **Grid:** `grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8`.
- **Product cards (4 in HTML):**
  1. **GOD SQUAD Hoodie** — Best Seller, $128, “Bold typography meets divine intention. Statement piece for the spiritually armed.” — image 5665383.
  2. **Milk & Honey Cropped** — New, $98, “Cozy meets chic. A spiritual message wrapped in premium organic cotton.” — image 27919253.
  3. **Pray Naked Set** — Limited, $168, “Soft, sacred, unapologetic. Hoodie & sweats for your most intimate rituals.” — image 34386786.
  4. **Bad Bitch Soft Heart Tank** — no badge, $58, “Strength meets vulnerability. For the ones who feel deeply and speak boldly.” — image 16982897.
- **Card structure:** Image `aspect-[3/4]`, badge top-left, Quick Add bar at bottom (`translate-y-full group-hover:translate-y-0`), then title (serif lg), description (`line-clamp-2`), price.
- **Theme:** `sections/preview-shop.liquid` + `snippets/product-card-preview.liquid`; products from Shopify collection; images from product media or assets.

---

### 5.4 Ethos (`#ethos`)

- **Section:** `py-32 bg-[#1A1A1A] text-[#FAF7F2] relative overflow-hidden`.
- **Decorative lines:** Vertical gradient lines (gold accent) top-left and bottom-right.
- **Header:** Label `What We Stand For`, heading `Our Ethos`, subheading `Every piece we create is an embodiment of these sacred principles.`
- **Grid:** `grid md:grid-cols-2 lg:grid-cols-4 gap-8`.
- **Cards (4):** Each: icon in circle `border border-[#C4A77D]/30 rounded-full group-hover:border-[#C4A77D]`, title (serif xl), description (sans sm, `text-[#FAF7F2]/60`).
  1. **Conscious Creation** — Leaf icon. “Every garment is woven with organic threads, recycled fabrics, and naturally dyed materials. We honor Pacha Mama in every stitch.”
  2. **Wearable Prayers** — Sparkles icon. “Each piece is infused with intention—poems, prayers, and passages designed to spark self-awareness and embody your highest truth.”
  3. **Radical Authenticity** — Flame icon. “We celebrate the full spectrum—holy and wild, raw and refined, rebellious and reverent. No suppression, only expression.”
  4. **Ethical by Design** — Heart icon. “Partnering with certified ethical manufacturers, we ensure fair wages, safe conditions, and sustainable practices throughout our supply chain.”

**Theme:** `sections/preview-ethos.liquid` — blocks for each value with icon, title, description; schema defaults can use the copy above.

---

### 5.5 Manifesto (no id in HTML)

- **Section:** `py-32 bg-[#EDE8E0] relative overflow-hidden`; grain overlay.
- **Header:** Label `Our Words`, heading `The Sacred Rebel Manifesto`.
- **Quote lines (serif, italic, `text-[#1A1A1A]/80`):**
  1. We dress to reclaim our softness as strength.
  2. Our beauty as boundary.
  3. Our bodies as altar.
  4. Power doesn't have to shout.
  5. **It drips in velvet, walks in gold, and speaks in sacred tongues.**
  6. We wear our truth like armor.
  7. We rebel by remembering.
- **Footer:** Line (gold), then: `You don't wear this to be seen—you wear it to be remembered.`

**Theme:** `sections/preview-manifesto.liquid` — preset currently has 6 lines; **add the 5th line** (“It drips in velvet…”) to match the source HTML.

---

### 5.6 Community (`#community`)

- **Section:** `py-32 bg-[#FAF7F2] relative`.
- **Header:** Label `The Tribe Speaks`, heading `Community Voices`.
- **Content:** Two-column grid (image + quote). Image `aspect-square`, `https://images.pexels.com/photos/6697737/pexels-photo-6697737.jpeg`; quote icon overlay (gold bg).  
  **Quote:** “Finally, a brand that gets it. Sacred Rebel isn't just clothing—it's armor for my soul. I've never felt more seen.”  
  **Author:** Maya R., Los Angeles, CA.
- **Nav:** Prev/next buttons (chevron-left/right), dots (first active = gold, others muted).

**Theme:** `sections/preview-community.liquid` — testimonial blocks; first preset block can use this quote and author.

---

### 5.7 CTA (no id)

- **Section:** `relative py-32 overflow-hidden`. Full-bleed image + overlay.
- **Background:** Image `https://images.pexels.com/photos/34386786/pexels-photo-34386786.jpeg`, overlay `bg-[#1A1A1A]/70`.
- **Content (centered):** Heading `Ready to Rebel with Reverence?`, copy `Join thousands of conscious warriors who wear their truth and walk in purpose.`, button `Shop the Collection` (arrow-right) → `#shop`. Button: `bg-[#FAF7F2] text-[#1A1A1A] hover:bg-[#C4A77D] hover:text-[#FAF7F2]`.

**Theme:** `sections/preview-cta.liquid` — match heading, copy, button text/link; image via section picker.

---

## 6. Footer (Exact Structure & Copy)

- **Background:** `bg-[#1A1A1A] text-[#FAF7F2]`.
- **Newsletter block:** Border bottom `border-[#FAF7F2]/10`. Two columns:  
  - Left: “Join the Rebellion” (serif 3xl/4xl), “Be the first to know about exclusive drops, sacred stories, and conscious community gatherings.”  
  - Right: Email input `border-b border-[#FAF7F2]/30`, placeholder “Enter your email”, submit = arrow-right icon `text-[#C4A77D] hover:text-[#FAF7F2]`.
- **Main grid:** `grid-cols-2 md:grid-cols-4 gap-8 md:gap-12`.
  - **Column 1:** “Sacred Rebel” (link to `/`), tagline “Wearable prayers for the ones who live boldly, love deeply, and walk in purpose.”, social (Instagram, TikTok/music icon).
  - **Column 2 — Shop:** All Products, New Arrivals, Best Sellers, Limited Drops, Gift Cards. Links: `/shop`, `/shop/new`, `/shop/best-sellers`, `/collections/limited`, `/gift-cards`.
  - **Column 3 — Company:** Our Story, Our Ethos, Sustainability, Journal, Press. Links: `/about`, `/ethos`, `/ethos#sustainability`, `/journal`, `/press`.
  - **Column 4 — Support:** Contact Us, FAQ, Size Guide, Shipping & Returns, Track Order. Links: `/contact`, `/faq`, `/size-guide`, `/shipping`, `/track-order`.
- **Bottom bar:** “© 2025 Sacred Rebel. All rights reserved.” | Privacy Policy, Terms of Service (`/privacy`, `/terms`).

**Theme:** `sections/footer-preview.liquid` — already matches; menus and URLs come from Shopify navigation + section link_list settings.

---

## 7. Images (External URLs in HTML → Theme)

Replace with theme assets or Shopify Files; do not rely on Pexels in production.

| Section | HTML URL (Pexels) | Theme usage |
|---------|-------------------|-------------|
| Hero | 33648329 | Section image picker or `assets/hero-preview.jpg` |
| Story | 6944915 | Section image picker or asset |
| Shop | 5665383, 27919253, 34386786, 16982897 | Product featured images |
| Community | 6697737 | Testimonial block image |
| CTA | 34386786 | Section image picker or asset |

---

## 8. Optional Theme Tweaks (from This HTML)

1. **Manifesto:** Add 7th preset line: “It drips in velvet, walks in gold, and speaks in sacred tongues.” (Insert as 5th line in preset blocks.)
2. **Story quote:** Default section/block copy: “Your body is the altar. Your style is the ritual.”
3. **Header:** Source uses `bg-transparent`; theme can keep cream/blur for contrast or add a “transparent until scroll” option in schema if desired.
4. **Footer links:** Map HTML paths to Shopify pages/menus (e.g. `/contact` → contact page, `/faq` → FAQ page, etc.) via footer menu settings.

---

*This reference was generated from the captured Spiritware storefront HTML. Use it to align the Shopify preview theme (sections, snippets, assets) with the live Emergent design.*
