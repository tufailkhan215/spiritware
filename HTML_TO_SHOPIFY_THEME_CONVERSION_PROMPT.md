# HTML-to-Shopify Theme Conversion — Analysis & Prompt

## Part 1: Detailed Analysis of the Provided HTML

### What This HTML Actually Is

The provided HTML is **not a storefront or e-commerce layout**. It is:

1. **A loader/shell page** — A minimal host page whose only visible job is to show a full-screen iframe.
2. **An iframe embed** — The “content” is loaded from an external URL:  
   `https://app.emergent.sh/loading-preview?host=spiritware.preview.emergentagent.com`
3. **Injected third-party UI** — The large `<style>` block is for a **Trust Wallet / Binance “One Tap”** browser-extension component (wallet connection popup). It is not part of your store design.

### Structure Breakdown

| Element | Purpose | Relevant for Shopify theme? |
|--------|---------|-----------------------------|
| `<html lang="en">` | Document root | Yes (use in `theme.liquid`) |
| `<head>` | Meta, title, styles | Partially — only meta/viewport; rest is loader/extension |
| `<title>Loading...</title>` | Placeholder | No — theme should use `{{ page_title }}` / `{{ shop.name }}` |
| First `<style>` (body/iframe) | Full-viewport body, full-size iframe | No — loader-specific |
| Second `<style>` (Trust Wallet) | `.trust-wallet-one-tap`, Binance font, slide-in animation | **No** — browser-extension UI only |
| `<body>` | Single iframe + script | No — no store layout |
| `<iframe id="contentFrame">` | Loads Emergent app | No — real storefront lives inside this URL (not in your HTML) |
| `<script>` (message listener) | Reload / open URL from iframe | No — app-shell behavior |

### Trust Wallet / Binance Styles (Summary)

- **Scope:** All classes live under `.trust-wallet-one-tap` (fixed bottom-right popup, 384px wide, white, shadow).
- **Font:** `Binance` via `@font-face` with `chrome-extension://` URLs — **not usable** in a normal site or Shopify (extension-only).
- **Colors:** `#1e2329`, `#474d57`, `#e6e6e6`, `#fff`, button `rgb(5, 0, 255)`.
- **Animation:** `@keyframes slide-in-one-tap` (translateY 80px → 0).
- **Layout:** Flexbox (header, body, footer, connect indicator, button).

None of this describes a Shopify store layout, navigation, product grid, or cart.

### Conclusion for This HTML

- **Cannot be converted into a Shopify theme as-is** because:
  - There is no header, footer, product grid, collection page, or cart UI.
  - The only “content” is an iframe to another domain; that content is not in the HTML you provided.
  - The only substantial CSS is for a wallet-connection popup from a browser extension.

To convert something into a Shopify theme, you need **the actual storefront design** — for example:
- The **rendered HTML/CSS of the page inside the iframe** (e.g. from Spiritware preview when loaded directly or via “View Page Source” on the real storefront), or
- A **design mockup** (Figma, screenshot, or detailed wireframe) plus copy and structure.

---

## Part 2: Generic Prompt to Convert a Design into a Shopify Theme

Use the prompt below when you have **real storefront HTML** (or a clear design spec) that includes header, footer, homepage sections, product/collection pages, etc.

---

### PROMPT: Convert This Design into a Shopify 2.0 Theme

**Context:** I have a [design / HTML/CSS] for a storefront. I want it implemented as a **Shopify 2.0 theme** (Online Store 2.0) with sections, schema, and best practices. The theme should work with the existing Spiritware repo structure where applicable.

**Requirements:**

1. **Theme structure**
   - Use standard Shopify 2.0 layout: `layout/theme.liquid`, `templates/*.json`, `sections/`, `snippets/`, `assets/`, `config/settings_schema.json`, `locales/`.
   - One main layout that includes: meta tags, viewport, `content_for_header`, CSS/JS assets, skip link, header, main (`content_for_layout`), footer, and any global scripts.

2. **Design fidelity**
   - Recreate the provided design in Liquid + CSS (and minimal JS where needed).
   - Extract **design tokens** from the design:
     - Colors (backgrounds, text, accents, borders) → CSS variables in layout or a base CSS file.
     - Typography (font families, sizes, weights, letter-spacing) → variables and utility/section classes.
     - Spacing, breakpoints, border-radius, shadows → variables or consistent classes.
   - Store all images and icons in `assets/` (or use Shopify image_url / section image pickers). Do not rely on external URLs for production assets.

3. **Header**
   - Implement as a **section** (e.g. `sections/header.liquid`) with schema for: logo (image or text), navigation links, cart icon (with cart count), optional search, mobile menu.
   - Desktop: logo, nav, cart (and search if in design). Mobile: logo, cart, hamburger that opens a drawer/menu.
   - Match design: sticky/fixed behavior, background (solid or blur), typography, hover states.

4. **Footer**
   - Implement as a **section** (e.g. `sections/footer.liquid`) with schema for: columns (e.g. Shop, Company, Support), links, newsletter (if in design), social icons, copyright/legal links.
   - Match design: background, text/link colors, spacing, borders.

5. **Homepage**
   - Implement each distinct block as a **section** (hero, featured collection, testimonials, CTA, etc.).
   - Use a **JSON template** (e.g. `templates/index.json`) to order sections and allow merchants to add/remove/reorder in the theme editor.
   - Sections must have **schema** (settings and blocks) so content is editable without touching code.

6. **Product & collection**
   - Product page: use or create `sections/` for main product (gallery, title, price, variants, add to cart, description) and optional related products.
   - Collection page: use or create sections for filters (if needed), product grid, pagination. Use `snippets/product-card.liquid` for consistent cards.

7. **Cart**
   - Prefer a **cart drawer** (section + snippet) that opens from the header and uses Section Rendering API to refresh, plus a fallback cart page if needed.

8. **Behavior**
   - Mobile menu: open/close, no layout shift; accessible (focus trap, Escape to close).
   - Cart drawer: open on “Cart” click; update count and content after add-to-cart (e.g. Section Rendering API or theme.cart).
   - Optional: predictive search in header if in design.
   - No external scripts unless specified; keep JS minimal and in `assets/`.

9. **Accessibility & SEO**
   - Semantic HTML (header, main, nav, footer, sections with headings).
   - Skip-to-content link, ARIA where needed (e.g. menu open/closed, cart count).
   - Meta title/description from Shopify (e.g. `{{ page_title }}`, `{{ page_description }}`).

10. **What I’m providing**
    - [ ] Full HTML of the storefront (paste or attach).  
    - [ ] CSS (inline or file) and/or design tokens.  
    - [ ] Screenshots or Figma link.  
    - [ ] Copy and structure (e.g. nav labels, footer links, section headings).

**If the design is “preview” or “alternate”:** Implement it as **additive** pieces (e.g. `header-preview.liquid`, `footer-preview.liquid`, `preview-*.liquid` sections) and add a **theme setting** (e.g. “Header style: Default / Preview”) so merchants can switch without replacing the default theme.

---

## Part 3: What to Provide for Spiritware Specifically

For the **Spiritware / Sacred Rebel** storefront that normally loads inside the Emergent iframe:

1. **Get the real storefront HTML**
   - Open the actual storefront URL (or the same host without the loader) in the browser, then “View Page Source” or “Inspect” and copy the **full HTML** (and any critical CSS) of the page that shows header, hero, sections, footer — not the loader page you pasted.
   - Alternatively, use the existing **SPIRITWARE_PREVIEW_HOMEPAGE_PROMPT.md** in this repo; it already describes the same design (tokens, header, footer, homepage sections) and has been used to build the preview theme (sections, snippets, assets). You can say: “Implement or refine the theme using SPIRITWARE_PREVIEW_HOMEPAGE_PROMPT.md as the design spec.”

2. **Do not use**
   - The loader HTML (title “Loading...”, single iframe, Trust Wallet styles) as the source for a theme conversion.
   - Any `chrome-extension://` or extension-only resources (e.g. Binance font) in the theme.

3. **Use**
   - The prompt above with the **real** storefront HTML or the existing **SPIRITWARE_PREVIEW_HOMEPAGE_PROMPT.md** as the design reference.

---

## Part 4: How to Capture the Real Spiritware Storefront HTML (from the iframe)

The storefront you see is loaded **inside** the iframe. To get its HTML for conversion or comparison:

### Option A: Inspect the iframe document (recommended)

1. Open the **loader page** in Chrome/Edge (the page that contains the iframe).
2. **Right‑click inside the storefront** (header, hero, or any visible content) → **Inspect** (or F12).
3. In DevTools, confirm you’re in the **iframe context**:
   - At the top of the Elements panel you may see a dropdown like “top” vs “contentFrame” (or the iframe’s name). Select the **iframe** so the DOM you see is the storefront, not the parent.
   - Or click once inside the storefront, then in Elements click “Select an element” and click the `<html>` or `<body>` of the **inner** page — that’s the storefront.
4. **Right‑click the `<html>` node** of that inner document → **Copy** → **Copy outerHTML**.
5. Paste into a file (e.g. `spiritware-storefront-capture.html`). That’s the **markup** of the storefront (after any JS has run). Inline `<style>` and `<script>` will be included; linked CSS/JS will be URLs.

To capture **computed styles** or **all CSS** affecting the page, use “Copy” → “Copy styles” on key nodes, or in the Sources panel save the CSS files the iframe loads.

### Option B: Direct URL (if the host serves the same page)

1. In the address bar, try opening **directly**:  
   `https://spiritware.preview.emergentagent.com/`  
   (or whatever host the loader uses).
2. If that URL shows the same storefront (not a blank or login page):
   - **View Page Source** (Ctrl+U / Cmd+U) to get the initial HTML.
   - Or use **Inspect** and copy the `<html>` outerHTML as in Option A (you’ll get the post‑JS DOM if you copy from DevTools).

### Option C: Save full page from browser

1. With the storefront visible (inside the iframe or on the direct URL): **Ctrl+S** (Cmd+S) → **Save As** “Webpage, Complete” or “Webpage, HTML only”.
2. Open the saved HTML and remove any parent/loader markup so you’re left with only the storefront’s `<html>…</html>`.

### What to provide for theme conversion

- **Minimum:** The **outerHTML of the storefront’s `<html>`** (or the full saved page trimmed to that). That gives structure, classes, and inline styles.
- **Better:** That plus any **linked CSS** (copy from DevTools → Network filter “CSS”, or from Sources). Replace CDN/absolute URLs with “save to `assets/`” in your prompt.
- **Best:** The HTML + CSS plus a note like: “Convert this into a Shopify 2.0 theme; use the existing Spiritware theme structure and add/update sections to match this design.”

If you can’t reach the preview (auth, private URL), use **SPIRITWARE_PREVIEW_HOMEPAGE_PROMPT.md** as the design spec; the theme already implements that.

---

*This document: (1) analyses the provided loader HTML in detail, (2) explains why it cannot be turned into a theme as-is, and (3) gives a reusable prompt and Spiritware-specific guidance for converting a real design into a Shopify theme.*
