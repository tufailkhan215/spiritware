# Shopify 2.0 Theme Recreation Prompt

Use this document as a **detailed specification and prompt** to recreate the current Shopify theme from scratch. Do not change any code in the existing theme when using this; it is for reference and for instructing an AI or developer to rebuild an equivalent theme.

---

## 1. Theme Overview

- **Type:** Shopify 2.0 theme (Online Store 2.0).
- **Brand / Aesthetic:** “California 89” — mountain/Sierra lifestyle: apparel, home decor, lifestyle goods. Warm, earthy palette with amber accents, stone neutrals, clean typography.
- **Layout:** Single layout file; header and footer are **static sections** (always rendered by the layout). All other content is **dynamic** via JSON templates and section/block schemas.
- **Design system:** Tailwind-inspired utility names in comments (e.g. `py-20`, `max-w-7xl`, `amber-700`). Styling is implemented as **plain CSS** (no Tailwind build). Breakpoints: mobile-first; small ~576px, medium ~768px, large 1024px.

---

## 2. Technical Architecture

### 2.1 Layout

- **File:** `layout/theme.liquid`
- **Structure:**
  - `<head>`: charset, viewport, theme-color, canonical, favicon (from theme settings), preconnect for Shopify fonts (conditional), title (with tags/page), meta description, `{% render 'meta-tags' %}`, `visual-editor.js`, `global.js`, `{{ content_for_header }}`.
  - Inline `{% style %}`: font faces (body + header from theme settings), **CSS custom properties** for:
    - Fonts: `--font-body-*`, `--font-heading-*`
    - Colors: `--color-base-text`, `--color-shadow`, `--color-base-background-1/2`, `--color-base-solid-button-labels`, `--color-base-outline-button-labels`, `--color-base-accent-1/2`, gradients
    - Media: padding, border, radius, shadow (media, product card, collection card, blog card, badge, popup, drawer)
    - Layout: `--page-width`, `--page-width-margin`
    - Product/collection/blog card settings from theme editor
    - Buttons, inputs, variant pills, text boxes
    - Spacing: `--spacing-sections-desktop/mobile`, `--grid-desktop-horizontal-spacing`, etc.
    - **Hardcoded theme colors:** `--color-primary: #d97706`, `--color-primary-dark: #b45309`, `--color-dark-gray: #2a2a2a`, `--color-light-gray: #f5f5f5`, `--color-white: #ffffff`
  - Base document/body: `box-sizing`, `html` font-size `62.5%`, body grid `grid-template-rows: auto auto 1fr auto`, min-height 100%, typography from CSS vars.
  - Stylesheet order: `base.css`, `theme.css`, `components.css`, `utilities.css`, `responsive.css`.
  - Optional: predictive search CSS if enabled.
- **Body:** Skip-to-content link, optional cart notification, **`{% section 'header' %}`**, `<main id="MainContent">` with `{{ content_for_layout }}`, **`{% section 'footer' %}`**, hidden a11y list.
- **Scripts (bottom):** `window.shopUrl`, `window.routes` (cart_add, cart_change, cart_update, cart_url, predictive_search_url), `window.cartStrings`, `window.variantStrings`, `window.accessibilityStrings`, then: `theme.js`, `cart.js`, `slider.js`, `filters.js`, `product.js`, `menu.js`, `animations.js`.

### 2.2 Templates

- **Homepage:** `templates/index.json` (JSON template). Sections and order defined in JSON; sections are **addable/removable/reorderable** in theme editor. Default section order: hero-slider → feature-icons → featured-products → shop-by-category → feature-showcase → home-showcase → homepage-about → customer-testimonials → blog-posts → instagram-feed.
- **Default page:** `templates/page.json`. Single section: `page-content` (displays `page.title` and `page.content`).
- **About page (alternate):** `templates/page.about.json`. Sections: `page-content` (can be disabled), about-hero, about-story, about-values, about-cta, about-stores. Order and section settings stored in JSON.
- **Blog listing:** `templates/blog.liquid` (Liquid, not JSON). **Critical:** entire content wrapped in **one** `{% paginate blog.articles by 12 %}...{% endpaginate %}`; loops use **`paginate.articles`** (not `blog.articles`). Structure: blog header (title, description), grid of `blog-post-card` with image, date overlay, content (tags, title, excerpt, “Read More”), then pagination (Previous / Page X of Y / Next) when `paginate.pages > 1`.
- **Article:** `templates/article.liquid`. Featured image, tags, title, meta (date, author), article content, footer tags, prev/next article links.
- **Collection:** `templates/collection.liquid`. Renders `{% section 'collection-banner' %}`, `{% section 'collection-filters' %}`, then container with filter sidebar (`filter-sidebar` snippet), toolbar (filter toggle + product count, sort select, grid/list view toggle), product grid using `product-card` snippet.
- **Product:** `templates/product.liquid`. Product page with: image gallery (main image + thumbnails, JS to switch image), vendor, title, price (with compare_at_price and “Sale” badge), description, form (variant select, quantity, add to cart). Use a wrapper class (e.g. `.product-page`) so product page styles do **not** affect product cards in sections (e.g. featured-products, home-showcase).
- **Customer account:** All under `templates/customers/`: `login.liquid`, `register.liquid`, `account.liquid`, `addresses.liquid`, `order.liquid`, `activate_account.liquid`, `reset_password.liquid`. Each with appropriate forms, tables, and navigation; styling consistent with theme.

### 2.3 Schema Rules (Important for Re-creation)

- **URL settings:** For settings with `"type": "url"`, do **not** use `"default": "..."` in the schema (Shopify validation can fail). Same for `link_list` if a default causes issues.
- **Collection settings:** For `"type": "collection"`, do **not** use the `default` attribute.
- **Blog setting:** `"type": "blog"` for blog picker; no problematic defaults.
- **Richtext:** Use `"type": "richtext"` where the source design has rich heading text (e.g. line breaks in “Family Business, Mountain Roots”).

---

## 3. Sections (Detailed)

### 3.1 Header (static)

- **ID:** `sections/header.liquid`, rendered by layout.
- **Settings:** promo bar text, logo (image_picker), logo text, logo subtitle, menu (link_list), sticky header (checkbox).
- **Markup:** Optional promo bar; header with mobile menu toggle (hamburger), logo (image or text + subtitle), nav (linklist; active state; titles upcased). Cart link/icon. Desktop nav and mobile drawer (snippet) must both use same menu.

### 3.2 Footer (static)

- **ID:** `sections/footer.liquid`, rendered by layout.
- **Settings:** newsletter heading, newsletter description, company description, shop menu (link_list), company menu (link_list), Instagram URL, Facebook URL. **No default for url settings.**
- **Blocks:** “Store” — name, address, hours (no phone in footer schema in some versions; add if desired).
- **Layout:** Top: newsletter strip (heading, description, email input, Subscribe button). Main: 4-column grid — brand (title, description, social icons), Shop links, Company links, Visit Us (store blocks: name, address, hours). Bottom bar: copyright text, legal links (Privacy, Terms, Shipping & Returns).

### 3.3 Hero Slider

- **Blocks:** “Slide” — image, heading, subtitle, button text, button link (url).
- **Settings:** auto_play_delay (range 3–10s), show_dots, show_arrows.
- **Behavior:** Full-width hero; slide content over image; dots and arrows; JS (e.g. slider.js) for rotation and interaction.

### 3.4 Feature Icons

- **Blocks:** “Feature” — title, description, icon (select: truck, shield, return, headset, leaf, heart, star, gift, clock, check).
- **Layout:** Horizontal row/grid of icon + title + short description (e.g. shipping, returns, support). No section-level settings required; presets with 4 blocks.

### 3.5 Featured Products

- **Settings:** small_label, heading, description, collection (type: collection, no default), products_to_show (range 4–16, step 2).
- **Layout:** Section header (label, heading, description), product grid (use `product-card` snippet), “View All Products” link to collection. **Important:** Product cards here must be styled via a wrapper (e.g. `.featured-products-section .product-card`) so product page CSS (e.g. `.product-page .product-title`) does not override card title/price.

### 3.6 Shop by Category

- **Blocks:** “Category” — title, description, image, link (url), large_card (checkbox; first card often large).
- **Settings:** label, heading, description.
- **Layout:** Header then grid of category cards (image, overlay, title, description, CTA). One card can span 2 rows (large_card).

### 3.7 Feature Showcase

- **Blocks:** “Feature” — layout (left | right), label, heading, description, main_image, thumbnail_image (optional; left layout only), badge_text, price, show_sizes (checkbox), button_text, button_link, button_style (primary | outline), list_item_1..4 (for “right” layout bullet list).
- **Layout:** Alternating two-column blocks. **Left layout:** image left (with optional badge and small thumbnail overlay bottom-right), content right (label, heading, description, price, optional size chips, CTA). **Right layout:** image right (optional decorative circles, no thumbnail), content left (label, heading, description, bullet list from list_item_1..4, outline CTA). **Responsive:** Stack on small screens; at **1024px** (lg) switch to row / row-reverse and 50% width columns. Thumbnail and decorative elements hidden on smaller breakpoints where appropriate.

### 3.8 Home Showcase

- **Settings:** label, heading, description, button_text, button_link; then three category cards: for each (1–3) — category_collection, category_title, category_image, category_link; then products_collection (type: collection, no default), products_to_show (range, step 4).
- **Blocks:** “Product” — product (product picker), badge_text.
- **Layout:** Header row (icon + label, heading, description, CTA button). Top grid: 3 large category cards (background image, gradient overlay, product count, title, “Shop Now”). Bottom grid: 4-column product cards (image, badge, title, price). Category cards link to category_link or collection; products from products_collection.

### 3.9 Homepage About

- **Settings:** label, heading (richtext for line break), paragraph_1, paragraph_2, link_text, link_url (no default), stores_heading.
- **Blocks:** “Store” — name, address, hours, phone.
- **Layout:** Two columns (lg): left — label, heading, two paragraphs, “Learn more” link; right — “Visit Our Stores” heading, stacked store cards (name, address with icon, hours with icon, phone with icon). Background: amber-50.

### 3.10 Customer Testimonials

- **Settings:** label, heading, description; stat_1_value/label through stat_4_value/label (e.g. 12.4K Happy Customers, 4.9 Average Rating, 13+ Years, 3 Store Locations).
- **Blocks:** “Testimonial” — rating (1–5), text, author, product_name, verified (checkbox).
- **Layout:** Section header; grid of testimonial cards (stars, quote icon, text, author + product name, “Verified Purchase” badge). Below: 2x2 or 4-column stats row (large amber number, label). Background: stone-100.

### 3.11 Blog Posts (homepage section)

- **Settings:** label, heading, blog (blog picker), posts_to_show (range 2–12), view_all_link (url, no default).
- **Layout:** Header row (label, heading, “View All Posts” link). Grid of blog cards: same height/card style; image with date overlay, title, excerpt (e.g. line-clamp), “Read More.” **Layout:** Single row of equal cards (e.g. grid with `repeat(auto-fit, minmax(280px, 1fr))`); no featured “span 2” card in current version.

### 3.12 Instagram Feed

- **Settings:** instagram_handle, heading, description, instagram_url (url, no default).
- **Blocks:** “Image” — image, link (url), like_count (text, shown on hover).
- **Layout:** Header (Instagram icon + handle, heading, description). Grid: 6 columns (lg), 2–3 on smaller; each cell aspect-square, image, hover overlay with heart icon + like_count. Bottom: “Follow @handle” button. Background: stone-900; text white/stone-400.

### 3.13 Page Content

- **File:** `sections/page-content.liquid`. No settings. Renders `page.title` and `page.content` inside a container. Used inside `page.json` and optionally in `page.about.json`.

### 3.14 About-specific sections (for page.about)

- **about-hero:** background_image, heading, subtitle. Full-width hero.
- **about-story:** small_heading, heading, content (richtext), image. Two-column story block.
- **about-values:** heading; blocks “value” — icon (e.g. mountain, heart, person, leaf), title, description. Icon grid.
- **about-cta:** heading, description, button_text, button_link. CTA strip.
- **about-stores:** small_heading, heading, subtitle; blocks “store” — name, address, hours, phone, directions_link. List or grid of store cards.

### 3.15 Collection banner & collection filters

- **collection-banner:** Optional banner for collection page (title, image, etc.).
- **collection-filters:** Used with `collection.liquid` and filter sidebar snippet for filtering/sorting.

---

## 4. Snippets

- **product-card:** Receives `product`. Image, link, badges (Best Seller / New / Popular / Sale from tags or compare_at_price), hover overlay, action buttons (wishlist, quick view), “Add to Cart” button. Product info: category (first collection), title, price. Used in featured-products, collection, home-showcase product grid. **Important:** All product card styles must be scoped (e.g. under `.featured-products-section`, `.collection-products`, `.home-showcase-section`) so they are not overridden by product page styles.
- **pagination:** Renders `paginate` with Previous, page numbers/ellipsis, Next, and optional “Showing X–Y of Z items.” Used in blog.liquid (and optionally collection if paginated).
- **cart-drawer / cart-notification:** If theme uses drawer or notification for cart, document its structure (header, line items, subtotal, checkout button).
- **mobile-menu:** Drawer/slide-out menu using same linklist as header; close button, nav links.
- **filter-sidebar:** Used in collection template; filter groups (e.g. by tag, vendor, price) and “Apply”/clear.
- **meta-tags:** OG, Twitter, etc., for SEO/social.
- **search-bar:** If predictive search is used, search form and results container.

---

## 5. Assets

### 5.1 CSS (load order: base → theme → components → utilities → responsive)

- **base.css:** Minimal reset (margin, padding, box-sizing), html font-size 62.5%, body line-height, img max-width, a/button/input defaults.
- **theme.css:** Theme-wide variables (primary, primary-dark, dark-gray, light-gray, white, text, spacing, radius, transition). Reset, typography (h1–h6, p, a). Container classes. **Product page styles must be scoped under `.product-page`** (e.g. `.product-page .product-title`, `.product-page .product-price`) so they do not affect product cards. **Do not use Tailwind-only properties** (e.g. `ring`, `ring-color`) in theme.css; use standard CSS (e.g. box-shadow) for focus states and borders.
- **components.css:** Section-specific classes for: feature-icons, category showcase, featured-products (and product grid/cards), feature-showcase (block layout, image, badge, thumbnail, content, buttons, list items), home-showcase (header, category cards, product grid), homepage-about, customer-testimonials (cards, stars, stats), blog-posts (header, grid, card image/content/date/read-more), instagram-feed (grid, overlay, like count), footer (newsletter, columns, store blocks). Match Tailwind-like spacing (e.g. py-20 → 8rem, max-w-7xl → 1280px, gap-12 → 4.8rem, amber-700, stone-800, etc.) with plain CSS.
- **utilities.css:** Helper classes (e.g. visually-hidden, skip-link).
- **responsive.css:** Mobile-first media queries. Key breakpoints: ~576px (sm), ~768px (md), **1024px (lg)**. At lg: feature-showcase two-column row/row-reverse and 50% widths; header/footer desktop layout; blog grid columns; home-showcase categories 3-col and products 4-col; testimonial stats row; instagram 6-col. Ensure product page and product card breakpoints are consistent (e.g. product gallery/thumbnails stack on small screens).

### 5.2 JavaScript

- **theme.js:** Global (e.g. cart form, global UI).
- **cart.js:** Add to cart, cart drawer/notification updates.
- **slider.js:** Hero slider (auto-play, dots, arrows).
- **product.js:** Product form: variant change updates price/image; thumbnail click switches main image; quantity; add to cart.
- **filters.js:** Collection filters (fetch/update URL or form submit).
- **menu.js:** Mobile menu open/close.
- **animations.js:** Optional scroll or entrance animations.
- **global.js:** Deferred global behavior.
- **visual-editor.js:** Theme editor (Shopify).

---

## 6. Config

- **config/settings_schema.json:** Can be empty `[]` or define global theme settings (e.g. colors, typography, cart type). Layout expects: type_body_font, type_header_font, colors_* (text, background_1/2, solid_button_labels, outline_button_labels, accent_1/2), media_*, card_*, collection_card_*, blog_card_*, badge_*, popup_*, drawer_*, spacing_sections, spacing_grid_*, text_boxes_*, buttons_*, inputs_*, variant_pills_*, favicon, cart_type, predictive_search_enabled, etc.
- **config/settings_data.json:** Auto-generated; stores current theme settings and (for “current”) homepage section config. Do not rely on editing this by hand for recreation; replicate structure in theme editor after building.

---

## 7. Locales

- **locales/en.default.json:** All translation keys for the theme (buttons, labels, errors, accessibility, cart, product form, etc.). Include keys referenced in layout (e.g. accessibility.skip_to_text, sections.cart.*, products.product.add_to_cart, etc.).

---

## 8. Design Tokens (for recreation)

- **Colors:** Primary #d97706 (amber-700), primary-dark #b45309, dark-gray #2a2a2a, light-gray #f5f5f5, white #fff. Stone palette for text (e.g. stone-800 #292524, stone-600, stone-500). Amber for accents (amber-700, amber-100 for icon bg). Green for “Verified” (green-600, green-50).
- **Spacing:** Section padding py-20 (8rem); container max-w-7xl (1280px), px-4 (1.6rem); gap-12 (4.8rem), gap-6 (1.5rem).
- **Typography:** Uppercase labels, tracking-wider, text-sm; headings text-4xl/md:text-5xl, font-bold; body text-lg, leading-relaxed.
- **Borders/radius:** rounded-2xl for cards/images, rounded-full for badges/pills, rounded-lg for buttons.
- **Shadows:** shadow-sm, shadow-lg, shadow-xl, shadow-2xl where specified in source.
- **Transitions:** duration-300, duration-500, duration-700 for hover/scale/opacity.

---

## 9. Prompt Summary (copy-paste for “recreate this theme”)

Use this block as the high-level prompt for recreation:

```
Build a Shopify 2.0 theme that matches the following spec.

- Layout: Single layout file (theme.liquid) with static header and footer sections; CSS variables from theme settings; load order: base.css, theme.css, components.css, utilities.css, responsive.css. Scripts: theme, cart, slider, filters, product, menu, animations.

- Homepage: JSON template (index.json) with sections in this order: hero-slider, feature-icons, featured-products, shop-by-category, feature-showcase, home-showcase, homepage-about, customer-testimonials, blog-posts, instagram-feed. All sections must be addable/removable/reorderable in the theme editor.

- Pages: Default page template is page.json with one section “page-content” (shows page title and content). Optional page.about.json with about-hero, about-story, about-values, about-cta, about-stores.

- Templates: blog.liquid must wrap the entire listing in a single paginate tag (paginate blog.articles by 12) and use paginate.articles in the loop; include pagination when pages > 1. Product template must scope all product-specific styles under .product-page so they do not affect product cards in sections. Collection template uses collection-banner, collection-filters, filter sidebar snippet, toolbar (sort, view toggle), and product-card snippet. Article template: featured image, tags, title, meta, content, tag links, prev/next. Customer templates: login, register, account, addresses, order, activate_account, reset_password.

- Sections: Implement header (promo, logo, menu, sticky), footer (newsletter, 4-column with brand/shop/company/stores, bottom bar), hero-slider (slides with image/heading/subtitle/button, dots/arrows, auto-play), feature-icons (block per icon: title, description, icon type), featured-products (collection picker, products_to_show, product grid using product-card), shop-by-category (blocks: title, description, image, link, large_card), feature-showcase (blocks: layout left/right, label, heading, description, images, badge, price, sizes, button, list items; responsive two-column at 1024px), home-showcase (header + 3 category cards + 4 product blocks from collection), homepage-about (richtext heading, paragraphs, link, store blocks with name/address/hours/phone), customer-testimonials (blocks: rating, text, author, product_name, verified; stats row), blog-posts (blog picker, posts_to_show 2–12, view_all link, single-row grid), instagram-feed (handle, heading, description, image blocks with like_count on hover, dark bg). Page-content section: no settings, output page title and content.

- Schema rules: No “default” on settings with type url or type collection. Use richtext for headings that need line breaks.

- Snippets: product-card (scoped for use in featured-products, collection, home-showcase; badges from tags/compare_at_price; do not let product page CSS override card styles), pagination, mobile-menu, filter-sidebar, meta-tags; cart drawer/notification if applicable.

- Styling: Plain CSS only; no Tailwind build. Use design tokens: primary #d97706, stone/amber palette, max-w-7xl 1280px, py-20 8rem, gap-12/6, rounded-2xl/rounded-full, shadows. Scoped product page styles under .product-page; scoped product card styles under section wrappers. Responsive: 576px, 768px, 1024px; feature-showcase two-column at 1024px.

- JS: Slider (hero), product (variant/price/image, add to cart), cart, filters, menu, animations. No Tailwind-specific JS.
```

---

## 10. File Checklist (for recreation)

- [ ] layout/theme.liquid
- [ ] templates/index.json
- [ ] templates/page.json
- [ ] templates/page.about.json
- [ ] templates/blog.liquid (paginate correct)
- [ ] templates/article.liquid
- [ ] templates/collection.liquid
- [ ] templates/product.liquid
- [ ] templates/customers/*.liquid (7 files)
- [ ] sections/header.liquid, footer.liquid
- [ ] sections/hero-slider, feature-icons, featured-products, shop-by-category, feature-showcase, home-showcase, homepage-about, customer-testimonials, blog-posts, instagram-feed, page-content
- [ ] sections/collection-banner, collection-filters
- [ ] sections/about-hero, about-story, about-values, about-cta, about-stores (if using page.about)
- [ ] snippets/product-card, pagination, mobile-menu, filter-sidebar, meta-tags, cart-drawer or cart-notification (if used)
- [ ] assets/base.css, theme.css, components.css, utilities.css, responsive.css
- [ ] assets/theme.js, cart.js, slider.js, product.js, filters.js, menu.js, animations.js, global.js, visual-editor.js
- [ ] config/settings_schema.json (or empty [])
- [ ] locales/en.default.json

---

*This document describes the current Shopify theme for the purpose of recreation only. Do not modify the live theme based on this document without explicit intent to change behavior or design.*
