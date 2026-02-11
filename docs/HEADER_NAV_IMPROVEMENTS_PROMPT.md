# Header Navigation: Improvements & Mega Menu — Suggestion Prompt

Use this as a prompt or brief for improving the main menu header navigation and adding mega menu support. **Do not change code from this file alone; use it to guide implementation.**

---

## 1. Current Dropdown & Chevron Analysis (header-1)

### Where it lives
- **File:** `sections/header-1.liquid`
- **Nav loop:** `linklists[section.settings.menu].links`
- **Chevron condition (problem):** Line ~18

### Issue: Chevron shows without child menu
The chevron (dropdown icon) is shown when:
- `link.links != empty` **OR**
- `forloop.index <= 2`

So the **first two menu items always get a chevron**, even if they have no child links in Shopify Navigation. That’s why “Shop” and “Collections” show a dropdown icon when they don’t have submenus.

### Fix (suggestion)
- **Show the chevron only when the link has children.**  
  Remove the `or forloop.index <= 2` part and rely only on `link.links != empty` (or equivalent check like `link.links.size > 0`).
- **Optional:** Add a class on the nav item when it has children (e.g. `header-1__nav-item--has-dropdown`) so CSS/JS can target only real dropdowns (styling, hover, focus).

### Dropdown behavior
- Ensure the dropdown panel is shown only for items where `link.links` is not empty.
- Use the same condition for:
  - Rendering the dropdown markup
  - Adding ARIA attributes (`aria-haspopup`, `aria-expanded`)
  - Any JS that opens/closes the panel
- Prefer **hover + focus** (and/or click) so it works for keyboard and touch. Keep `aria-expanded` in sync with open/closed state.

---

## 2. Dropdown implementation checklist

- **Conditional chevron:** Only render the chevron SVG when `link.links != empty` (no “first 2 items” rule).
- **Conditional dropdown:** Only render the dropdown container and list of child links when `link.links != empty`.
- **ARIA:** Use `aria-haspopup="true"` and `aria-expanded="true|false"` only on items that actually have a dropdown; leave them off for plain links.
- **Keyboard:** Support Enter/Space to open, Escape to close, arrow keys to move between items if you have multiple levels.
- **No dead dropdowns:** Don’t show an empty panel or a panel that only appears for “first 2” items regardless of children.

---

## 3. Mega menu (2–5 columns) — modern, elegant approach

### Concept
- Some nav items open a **mega menu**: a wide panel (often full width or near full width) with 2–5 columns of links, optional images, or short copy.
- Other items keep the current **simple dropdown** (single list).
- Decide per item whether it’s “mega” or “simple” (e.g. via metafield, menu handle, or section blocks).

### Suggested implementation options

**Option A — Menu-based (no new schema)**  
- Use one main menu; items with children get a dropdown.
- To “mark” mega items: use a second menu (e.g. “Mega menu items”) and in Liquid check `link.handle` or `link.url` against that list to decide “mega vs simple.”
- For mega content: use **nested link lists**. In Shopify, a link list can’t be nested in another, but you can use **multiple menus** and match by handle (e.g. “Shop” → use menu “shop-mega”). So: main menu for top-level labels and order; separate menus for each mega’s columns (e.g. “shop-col-1”, “shop-col-2”), and in Liquid you fetch those by a naming convention or a section setting that maps “link handle” → list of menu handles for columns.

**Option B — Section blocks (most flexible)**  
- In the header section schema, add **blocks** of type “mega_menu” (or one block per mega).
- Each block has: “Trigger” = link title or URL or handle (to match a main-menu link), “Number of columns” (2–5), and then either:
  - **Column 1 … Column 5:** each is a `link_list` picker, and optionally an image + heading per column, or
  - One “Links” list and you split into N columns in Liquid (e.g. by chunking the list).
- In the nav loop: if current `link` matches a mega block’s trigger, render the mega panel (2–5 columns); otherwise if `link.links != empty` render the simple dropdown.
- **Pro:** Full control over columns, images, and which items are mega. **Con:** More schema and Liquid.

**Option C — Single “mega” menu with structure**  
- One menu where structure implies layout: e.g. first child = column 1 heading, next children = column 1 links; then a “break” (e.g. a link with a specific title like “—Column—” or a URL like `#column`) or a second level that you interpret as “column 2,” etc.  
- **Con:** Fragile and hard to maintain; not recommended unless you have no other way.

**Recommended:** Option B (section blocks) for a modern theme: one block per mega, 2–5 columns, each column = link list + optional image/heading. Option A is acceptable if you want to avoid blocks and can live with a fixed convention (e.g. menu handle = “shop” → fetch “shop-mega-1”, “shop-mega-2”, …).

### Mega menu UX (modern & elegant)

- **Layout:** CSS Grid, e.g. `grid-template-columns: repeat(var(--columns, 2), minmax(0, 1fr));` with `--columns` set per mega (2–5). Max-width on the panel (e.g. 1200px) centered, or full-bleed with content constrained.
- **Animation:** Subtle open/close (e.g. opacity + translateY or a short height transition). Prefer `transform`/`opacity` for performance.
- **Typography:** Clear column headings (if you have them), consistent with the rest of the header; links slightly smaller than top-level nav.
- **Spacing:** Generous padding (e.g. 2–3rem) and gap between columns so it doesn’t feel cramped.
- **Images (optional):** One image per column or one hero image for the whole mega; use `image_picker` in block settings and lazy-load.
- **Mobile:** On small viewports, mega menu collapses to an accordion or a single-column list under the same parent item (reuse the same link data, different layout).
- **Accessibility:** Same as dropdowns: focus management, Escape to close, and `aria-expanded` on the trigger.

### Schema sketch for mega (Option B)

- Block type: `mega_menu`
- Settings:
  - `trigger_link_handle` (text) or “Link” (url) to match which nav link opens this mega
  - `columns` (range or select): 2, 3, 4, or 5
  - For each column (1–5): `link_list` (optional), optional `heading`, optional `image`
- In Liquid: loop nav links; if a mega block’s trigger matches `link.handle` (or `link.url`), render the mega panel with that block’s columns; else if `link.links != empty` render the simple dropdown.

---

## 4. Summary

1. **Chevron / dropdown:** Show chevron and dropdown only when `link.links != empty`; remove the “first two items” rule in `sections/header-1.liquid`.
2. **Dropdown behavior:** Only render and open dropdowns for items that have child links; keep ARIA and keyboard behavior correct.
3. **Mega menu:** Prefer section blocks (Option B) with 2–5 columns per mega; each column = link list + optional heading/image; use CSS Grid and light animation; on mobile, collapse to one column or accordion.

Use this document as the “suggestion prompt” when implementing or briefing the header navigation improvements and mega menu; adjust file paths and class names to match your actual theme.
