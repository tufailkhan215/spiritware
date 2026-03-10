




{% comment %}
  Header 1 (Sacred Rebel) — Fixed, transparent-to-solid on scroll.
  Per SACRED_REBEL_HOMEPAGE_PROMPT.md §2. Theme setting: header_style = 'header_1'.
{% endcomment %}

{%- assign header_bg = section.settings.background_color | default: 'transparent' -%}
{%- assign header_bg_scrolled = section.settings.background_color_scrolled | default: 'rgba(250, 247, 242, 0.95)' -%}
<header class="header-1" id="header-1" role="banner" data-scrolled-bg="{{ section.settings.header_scrolled_bg }}" style="--header-1-bg: {{ header_bg }}; --header-1-bg-scrolled: {{ header_bg_scrolled }};">
  <div class="header-1__container">
    <div class="header-1__inner">
      <a href="{{ routes.root_url }}" class="header-1__logo">
        <span class="header-1__logo-text">{{ section.settings.logo_text | default: shop.name }}</span>
      </a>

      <nav class="header-1__nav" aria-label="Main">
        {%- if section.settings.menu != blank -%}
          {%- for link in linklists[section.settings.menu].links -%}
            {%- assign link_handle = link.title | handleize -%}
            {%- assign mega_block = nil -%}
            {%- for block in section.blocks -%}
              {%- if block.type == 'mega_menu' and block.settings.trigger_handle != blank -%}
                {%- assign trigger_handle = block.settings.trigger_handle | strip | handleize -%}
                {%- if link_handle == trigger_handle -%}
                  {%- assign mega_block = block -%}
                  {%- break -%}
                {%- endif -%}
              {%- endif -%}
            {%- endfor -%}
            {%- assign has_dropdown = false -%}
            {%- if mega_block != nil or link.links != empty -%}
              {%- assign has_dropdown = true -%}
            {%- endif -%}
            {%- assign is_mega = false -%}
            {%- if mega_block != nil -%}
              {%- assign is_mega = true -%}
            {%- endif -%}
            <div class="header-1__nav-item {% if has_dropdown %}header-1__nav-item--has-dropdown{% endif %} {% if is_mega %}header-1__nav-item--mega{% endif %}" {% if has_dropdown %}aria-haspopup="true" aria-expanded="false" data-header-dropdown{% endif %}>
              <a href="{{ link.url }}" class="header-1__nav-link {% if link.active %}header-1__nav-link--active{% endif %}" {% if has_dropdown %}aria-expanded="false" aria-controls="header-1-dropdown-{{ section.id }}-{{ forloop.index }}" id="header-1-trigger-{{ section.id }}-{{ forloop.index }}"{% endif %}>
                {{ link.title | escape }}
                {%- if has_dropdown -%}
                  <span class="header-1__nav-chevron" aria-hidden="true">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                  </span>
                {%- endif -%}
              </a>
              {%- if is_mega and mega_block != nil -%}
                {%- assign col_count_raw = mega_block.settings.columns | default: 2 -%}
                {%- assign col_count = col_count_raw | plus: 0 -%}
                {%- if col_count <= 0 -%}
                  {%- assign col_count = 2 -%}
                {%- endif -%}
                <div class="header-1__mega" id="header-1-dropdown-{{ section.id }}-{{ forloop.index }}" role="menu" aria-label="{{ link.title | escape }}" style="--mega-columns: {{ col_count }};" {{ mega_block.shopify_attributes }}>
                  <div class="header-1__mega-inner">
                    {%- assign cols_done = 0 -%}
                    {%- for i in (1..5) -%}
                      {%- if cols_done >= col_count -%}
                        {%- break -%}
                      {%- endif -%}
                      {%- assign col_heading = '' -%}
                      {%- assign col_menu = '' -%}
                      {%- assign col_image = nil -%}
                      {%- if i == 1 -%}
                        {%- assign col_heading = mega_block.settings.column_1_heading -%}
                        {%- assign col_menu = mega_block.settings.column_1_menu -%}
                        {%- assign col_image = mega_block.settings.column_1_image -%}
                      {%- elsif i == 2 -%}
                        {%- assign col_heading = mega_block.settings.column_2_heading -%}
                        {%- assign col_menu = mega_block.settings.column_2_menu -%}
                        {%- assign col_image = mega_block.settings.column_2_image -%}
                      {%- elsif i == 3 -%}
                        {%- assign col_heading = mega_block.settings.column_3_heading -%}
                        {%- assign col_menu = mega_block.settings.column_3_menu -%}
                        {%- assign col_image = mega_block.settings.column_3_image -%}
                      {%- elsif i == 4 -%}
                        {%- assign col_heading = mega_block.settings.column_4_heading -%}
                        {%- assign col_menu = mega_block.settings.column_4_menu -%}
                        {%- assign col_image = mega_block.settings.column_4_image -%}
                      {%- elsif i == 5 -%}
                        {%- assign col_heading = mega_block.settings.column_5_heading -%}
                        {%- assign col_menu = mega_block.settings.column_5_menu -%}
                        {%- assign col_image = mega_block.settings.column_5_image -%}
                      {%- endif -%}
                      {%- assign col_has_content = false -%}
                      {%- if col_heading != blank or col_menu != blank -%}
                        {%- assign col_has_content = true -%}
                      {%- endif -%}
                      {%- if col_menu != blank and linklists[col_menu].links.size > 0 -%}
                        {%- assign col_has_content = true -%}
                      {%- endif -%}
                      {%- if col_has_content or col_image != blank -%}
                        {%- assign cols_done = cols_done | plus: 1 -%}
                        <div class="header-1__mega-column">
                          {%- if col_image != blank -%}
                            <div class="header-1__mega-column-image">
                              <img src="{{ col_image | image_url: width: 400 }}" alt="{{ col_heading | default: '' | escape }}" width="400" height="300" loading="lazy">
                            </div>
                          {%- endif -%}
                          {%- if col_heading != blank -%}
                            <p class="header-1__mega-column-heading">{{ col_heading | escape }}</p>
                          {%- endif -%}
                          {%- if col_menu != blank and linklists[col_menu].links.size > 0 -%}
                            <ul class="header-1__mega-column-links" role="none">
                              {%- for child in linklists[col_menu].links -%}
                                <li role="none">
                                  <a href="{{ child.url }}" class="header-1__mega-link" role="menuitem">{{ child.title | escape }}</a>
                                </li>
                              {%- endfor -%}
                            </ul>
                          {%- endif -%}
                        </div>
                      {%- endif -%}
                    {%- endfor -%}
                  </div>
                </div>
              {%- elsif link.links != empty -%}
                <div class="header-1__dropdown" id="header-1-dropdown-{{ section.id }}-{{ forloop.index }}" role="menu" aria-label="{{ link.title | escape }}">
                  {%- for child in link.links -%}
                    <a href="{{ child.url }}" class="header-1__dropdown-link" role="menuitem">{{ child.title | escape }}</a>
                  {%- endfor -%}
                </div>
              {%- endif -%}
            </div>
          {%- endfor -%}
        {%- endif -%}
      </nav>

      <div class="header-1__actions">
        <button type="button" class="header-1__cart cart-toggle group" aria-label="{{ 'sections.header.open_cart' | t | default: 'Open cart' }}">
          <span class="header-1__cart-icon">
            <svg class="header-1__cart-icon-svg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path><path d="M3 6h18"></path><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
          </span>
          <span class="header-1__cart-badge cart-count" data-cart-count>{{ cart.item_count }}</span>
        </button>
        <button type="button" class="header-1__menu-toggle" aria-label="{{ 'sections.header.open_menu' | t | default: 'Open menu' }}" aria-expanded="false" aria-controls="header-1-mobile">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 12h16"/><path d="M4 18h16"/><path d="M4 6h16"/></svg>
        </button>
      </div>
    </div>
  </div>
</header>

{%- render 'header-1-mobile', menu: section.settings.menu -%}

<div class="cart-drawer-overlay"></div>
{%- render 'cart-drawer' -%}

{% schema %}
{
  "name": "Header 1 (Sacred Rebel)",
  "class": "section-header-1",
  "settings": [
    {
      "type": "text",
      "id": "logo_text",
      "label": "Logo / brand name",
      "default": "Sacred Rebel"
    },
    {
      "type": "link_list",
      "id": "menu",
      "label": "Menu",
      "default": "main-menu"
    },
    {
      "type": "checkbox",
      "id": "header_scrolled_bg",
      "label": "Solid background on scroll",
      "default": true,
      "info": "When enabled, header gets a solid background after scrolling."
    },
    {
      "type": "header",
      "content": "Colors"
    },
    {
      "type": "color",
      "id": "background_color",
      "label": "Header background",
      "info": "Leave unset for transparent (e.g. over hero)."
    },
    {
      "type": "color",
      "id": "background_color_scrolled",
      "label": "Header background (when scrolled)",
      "default": "#faf7f2"
    }
  ],
  "blocks": [
    {
      "type": "mega_menu",
      "name": "Mega menu",
      "limit": 4,
      "settings": [
        {
          "type": "text",
          "id": "trigger_handle",
          "label": "Menu item handle",
          "info": "Handle of the nav link that opens this mega menu (e.g. shop, collections). Matches the link title in lowercase with dashes (e.g. 'Our Story' → our-story)."
        },
        {
          "type": "select",
          "id": "columns",
          "label": "Number of columns",
          "default": "2",
          "options": [
            { "value": "2", "label": "2" },
            { "value": "3", "label": "3" },
            { "value": "4", "label": "4" },
            { "value": "5", "label": "5" }
          ]
        },
        {
          "type": "header",
          "content": "Column 1"
        },
        { "type": "text", "id": "column_1_heading", "label": "Heading" },
        { "type": "link_list", "id": "column_1_menu", "label": "Menu" },
        { "type": "image_picker", "id": "column_1_image", "label": "Image (optional)" },
        {
          "type": "header",
          "content": "Column 2"
        },
        { "type": "text", "id": "column_2_heading", "label": "Heading" },
        { "type": "link_list", "id": "column_2_menu", "label": "Menu" },
        { "type": "image_picker", "id": "column_2_image", "label": "Image (optional)" },
        {
          "type": "header",
          "content": "Column 3"
        },
        { "type": "text", "id": "column_3_heading", "label": "Heading" },
        { "type": "link_list", "id": "column_3_menu", "label": "Menu" },
        { "type": "image_picker", "id": "column_3_image", "label": "Image (optional)" },
        {
          "type": "header",
          "content": "Column 4"
        },
        { "type": "text", "id": "column_4_heading", "label": "Heading" },
        { "type": "link_list", "id": "column_4_menu", "label": "Menu" },
        { "type": "image_picker", "id": "column_4_image", "label": "Image (optional)" },
        {
          "type": "header",
          "content": "Column 5"
        },
        { "type": "text", "id": "column_5_heading", "label": "Heading" },
        { "type": "link_list", "id": "column_5_menu", "label": "Menu" },
        { "type": "image_picker", "id": "column_5_image", "label": "Image (optional)" }
      ]
    }
  ]
}
{% endschema %}


whats wrong with this code it sends me to a 404 when i press checkout

I’m tracing the checkout path, because this header only opens the cart drawer; the 404 is more likely coming from the rendered cart-drawer snippet or its JS checkout link/form.

Stopped thinking

/**
 * Cart Functionality - AJAX Cart Drawer
 */

(function() {
  'use strict';

  class Cart {
    constructor() {
      this.drawer = document.querySelector('.cart-drawer');
      this.overlay = document.querySelector('.cart-drawer-overlay');
      this.cartToggle = document.querySelectorAll('.cart-toggle');
      this.cartClose = document.querySelector('.cart-drawer-close');
      this.cartItems = document.querySelector('.cart-items');
      this.cartTotal = document.querySelector('.cart-total-price');
      this.checkoutBtn = document.querySelector('.cart-checkout-btn');

      this.init();
    }

    init() {
      // Open cart drawer
      this.cartToggle.forEach(btn => {
        btn.addEventListener('click', () => this.openCart());
      });

      // Close cart drawer
      if (this.cartClose) {
        this.cartClose.addEventListener('click', () => this.closeCart());
      }

      if (this.overlay) {
        this.overlay.addEventListener('click', () => this.closeCart());
      }

      // Update cart count on load
      this.updateCartCount();

      // Listen for cart updates
      document.addEventListener('cart:updated', () => {
        this.updateCart();
        this.updateCartCount();
      });
    }

    openCart() {
      this.drawer?.classList.add('open');
      this.overlay?.classList.add('active');
      document.body.style.overflow = 'hidden';
      this.updateCart();
    }

    closeCart() {
      this.drawer?.classList.remove('open');
      this.overlay?.classList.remove('active');
      document.body.style.overflow = '';
    }

    async updateCart() {
      try {
        const response = await fetch(window.routes.cart_url + '.js');
        const cart = await response.json();
        this.renderCart(cart);
      } catch (error) {
        console.error('Error updating cart:', error);
      }
    }

    renderCart(cart) {
      if (!this.cartItems) return;

      if (cart.item_count === 0) {
        this.cartItems.innerHTML = '<p class="cart-empty">Your cart is empty</p>';
        if (this.cartTotal) {
          this.cartTotal.textContent = '$0.00';
        }
        return;
      }

      let html = '';
      cart.items.forEach(item => {
        html += 
          <div class="cart-item" data-key="${item.key}">
            <img src="${item.image}" alt="${item.title}" class="cart-item-image">
            <div class="cart-item-details">
              <div class="cart-item-title">${item.product_title}</div>
              <div class="cart-item-price">${this.formatMoney(item.final_line_price)}</div>
              <div class="cart-item-quantity">
                <button class="quantity-btn" onclick="Cart.updateQuantity('${item.key}', ${item.quantity - 1})">-</button>
                <span>${item.quantity}</span>
                <button class="quantity-btn" onclick="Cart.updateQuantity('${item.key}', ${item.quantity + 1})">+</button>
                <button class="cart-item-remove" onclick="Cart.removeItem('${item.key}')">Remove</button>
              </div>
            </div>
          </div>
        ;
      });

      this.cartItems.innerHTML = html;
      if (this.cartTotal) {
        this.cartTotal.textContent = this.formatMoney(cart.total_price);
      }
    }

    async addToCart(variantId, quantity = 1) {
      try {
        const response = await fetch(window.routes.cart_add_url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: variantId,
            quantity: quantity
          })
        });

        const data = await response.json();
        
        if (data.error) {
          alert(data.error);
          return;
        }

        // Trigger cart update event
        document.dispatchEvent(new CustomEvent('cart:updated'));
        
        // Open cart drawer
        this.openCart();

        return data;
      } catch (error) {
        console.error('Error adding to cart:', error);
        alert('Error adding item to cart');
      }
    }

    async updateQuantity(key, quantity) {
      if (quantity < 1) {
        this.removeItem(key);
        return;
      }

      try {
        const response = await fetch(window.routes.cart_change_url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: key,
            quantity: quantity
          })
        });

        const data = await response.json();
        document.dispatchEvent(new CustomEvent('cart:updated'));
        return data;
      } catch (error) {
        console.error('Error updating quantity:', error);
      }
    }

    async removeItem(key) {
      try {
        const response = await fetch(window.routes.cart_change_url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: key,
            quantity: 0
          })
        });

        const data = await response.json();
        document.dispatchEvent(new CustomEvent('cart:updated'));
        return data;
      } catch (error) {
        console.error('Error removing item:', error);
      }
    }

    async updateCartCount() {
      try {
        const response = await fetch(window.routes.cart_url + '.js');
        const cart = await response.json();
        
        const cartCountElements = document.querySelectorAll('.cart-count');
        cartCountElements.forEach(el => {
          el.textContent = cart.item_count;
          el.style.display = cart.item_count > 0 ? 'flex' : 'none';
        });
      } catch (error) {
        console.error('Error updating cart count:', error);
      }
    }

    formatMoney(cents) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(cents / 100);
    }
  }

  // Initialize cart
  let cartInstance;
  document.addEventListener('DOMContentLoaded', function() {
    cartInstance = new Cart();
    window.Cart = cartInstance;
  });
})();

having 404 error at checkout

The 404 is probably not in this JS block.

What this script does:

opens the cart drawer

fetches /cart.js

adds/removes items

updates the count

What it does not do:

send the user to checkout

bind any click handler to .cart-checkout-btn

You define this:

this.checkoutBtn = document.querySelector('.cart-checkout-btn');
…but never use it. So the 404 is almost certainly coming from the actual checkout button HTML in your cart-drawer snippet.

Most likely problem
Your checkout button/link is probably pointing to the wrong URL.

In Shopify, checkout should go to:

{{ routes.cart_url }}/checkout
or simply:

/cart/checkout
Correct examples
If it is a link:

<a href="{{ routes.cart_url }}/checkout" class="cart-checkout-btn">
  Checkout
</a>
If it is a form:

<form action="{{ routes.cart_url }}" method="post">
  <button type="submit" name="checkout" class="cart-checkout-btn">
    Checkout
  </button>
</form>
That name="checkout" is important for Shopify form-based checkout.

Another issue in your JS
These lines are also wrong:

onclick="Cart.updateQuantity(...)"
onclick="Cart.removeItem(...)"
Because Cart is your instance, not the class. You do later assign:

window.Cart = cartInstance;
So it can work, but naming the instance Cart is confusing and fragile. It is better to use window.cartInstance or bind events normally instead of inline onclick.

Also, if item.key ever contains a ', your HTML string can break.

What to check right now
Open your cart-drawer snippet and look for the checkout button. It is likely something like one of these bad patterns:

<a href="/checkout">Checkout</a>
or

<a href="{{ routes.checkout_url }}">Checkout</a>
or a form posting somewhere incorrect.

Use one of these instead:

Best link option
<a href="{{ routes.cart_url }}/checkout" class="cart-checkout-btn">
  Checkout
</a>
Best form option
<form action="{{ routes.cart_url }}" method="post">
  <button type="submit" name="checkout" class="cart-checkout-btn">
    Checkout
  </button>
</form>
Optional JS fallback
If you want JS to handle checkout explicitly:

if (this.checkoutBtn) {
  this.checkoutBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = `${window.routes.cart_url}/checkout`;
  });
}
One more Shopify-specific note
If you are testing on a development theme/store preview, sometimes checkout can behave oddly if:

the store password/setup is incomplete

the store is not on a plan that supports live checkout behavior the way you expect

the checkout button points to a custom domain/path mismatch

But from the code you shared, the biggest issue is still this:

your checkout button itself is not shown here, and this JS never handles checkout at all.

Paste your cart-drawer snippet and I’ll point to the exact broken line.


can you modify the whole code to fix the issue. the checkout url /cart/checkout

Yes. Since your checkout path is /cart/checkout, here’s a cleaned-up version of your cart JS that:

keeps all current cart drawer behavior

fixes the checkout button handling

avoids fragile inline onclick

uses delegated events for quantity/remove

safely redirects checkout to /cart/checkout

Replace your current script with this:

/**
 * Cart Functionality - AJAX Cart Drawer
 */

(function () {
  'use strict';

  class Cart {
    constructor() {
      this.drawer = document.querySelector('.cart-drawer');
      this.overlay = document.querySelector('.cart-drawer-overlay');
      this.cartToggle = document.querySelectorAll('.cart-toggle');
      this.cartClose = document.querySelector('.cart-drawer-close');
      this.cartItems = document.querySelector('.cart-items');
      this.cartTotal = document.querySelector('.cart-total-price');
      this.checkoutBtn = document.querySelector('.cart-checkout-btn');

      this.init();
    }

    init() {
      // Open cart drawer
      this.cartToggle.forEach((btn) => {
        btn.addEventListener('click', () => this.openCart());
      });

      // Close cart drawer
      if (this.cartClose) {
        this.cartClose.addEventListener('click', () => this.closeCart());
      }

      if (this.overlay) {
        this.overlay.addEventListener('click', () => this.closeCart());
      }

      // Checkout button
      if (this.checkoutBtn) {
        this.checkoutBtn.addEventListener('click', (event) => {
          event.preventDefault();
          this.goToCheckout();
        });
      }

      // Delegated cart item actions
      if (this.cartItems) {
        this.cartItems.addEventListener('click', (event) => {
          const target = event.target;

          if (target.classList.contains('quantity-btn')) {
            const key = target.dataset.key;
            const quantity = parseInt(target.dataset.quantity, 10);

            if (key && !Number.isNaN(quantity)) {
              this.updateQuantity(key, quantity);
            }
          }

          if (target.classList.contains('cart-item-remove')) {
            const key = target.dataset.key;

            if (key) {
              this.removeItem(key);
            }
          }
        });
      }

      // Update cart count on load
      this.updateCartCount();

      // Listen for cart updates
      document.addEventListener('cart:updated', () => {
        this.updateCart();
        this.updateCartCount();
      });
    }

    openCart() {
      this.drawer?.classList.add('open');
      this.overlay?.classList.add('active');
      document.body.style.overflow = 'hidden';
      this.updateCart();
    }

    closeCart() {
      this.drawer?.classList.remove('open');
      this.overlay?.classList.remove('active');
      document.body.style.overflow = '';
    }

    goToCheckout() {
      window.location.href = '/cart/checkout';
    }

    async updateCart() {
      try {
        const response = await fetch(`${window.routes.cart_url}.js`, {
          headers: {
            Accept: 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Cart fetch failed: ${response.status}`);
        }

        const cart = await response.json();
        this.renderCart(cart);
      } catch (error) {
        console.error('Error updating cart:', error);
      }
    }

    renderCart(cart) {
      if (!this.cartItems) return;

      if (cart.item_count === 0) {
        this.cartItems.innerHTML = '<p class="cart-empty">Your cart is empty</p>';

        if (this.cartTotal) {
          this.cartTotal.textContent = '$0.00';
        }

        if (this.checkoutBtn) {
          this.checkoutBtn.setAttribute('disabled', 'disabled');
          this.checkoutBtn.setAttribute('aria-disabled', 'true');
        }

        return;
      }

      let html = '';

      cart.items.forEach((item) => {
        const imageSrc = item.image ? item.image : '';
        const altText = this.escapeHtml(item.title || item.product_title || 'Product');
        const title = this.escapeHtml(item.product_title || item.title || 'Product');

        html += `
          <div class="cart-item" data-key="${this.escapeHtml(item.key)}">
            ${
              imageSrc
                ? `<img src="${imageSrc}" alt="${altText}" class="cart-item-image">`
                : ''
            }
            <div class="cart-item-details">
              <div class="cart-item-title">${title}</div>
              <div class="cart-item-price">${this.formatMoney(item.final_line_price)}</div>
              <div class="cart-item-quantity">
                <button
                  type="button"
                  class="quantity-btn"
                  data-key="${this.escapeHtml(item.key)}"
                  data-quantity="${item.quantity - 1}"
                  aria-label="Decrease quantity for ${title}"
                >
                  -
                </button>
                <span>${item.quantity}</span>
                <button
                  type="button"
                  class="quantity-btn"
                  data-key="${this.escapeHtml(item.key)}"
                  data-quantity="${item.quantity + 1}"
                  aria-label="Increase quantity for ${title}"
                >
                  +
                </button>
                <button
                  type="button"
                  class="cart-item-remove"
                  data-key="${this.escapeHtml(item.key)}"
                  aria-label="Remove ${title} from cart"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        `;
      });

      this.cartItems.innerHTML = html;

      if (this.cartTotal) {
        this.cartTotal.textContent = this.formatMoney(cart.total_price);
      }

      if (this.checkoutBtn) {
        this.checkoutBtn.removeAttribute('disabled');
        this.checkoutBtn.removeAttribute('aria-disabled');
      }
    }

    async addToCart(variantId, quantity = 1) {
      try {
        const response = await fetch(window.routes.cart_add_url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            id: variantId,
            quantity: quantity,
          }),
        });

        const data = await response.json();

        if (!response.ok || data.status || data.error || data.description) {
          throw new Error(data.description || data.error || 'Error adding item to cart');
        }

        document.dispatchEvent(new CustomEvent('cart:updated'));
        this.openCart();

        return data;
      } catch (error) {
        console.error('Error adding to cart:', error);
        alert(error.message || 'Error adding item to cart');
      }
    }

    async updateQuantity(key, quantity) {
      if (quantity < 1) {
        return this.removeItem(key);
      }

      try {
        const response = await fetch(window.routes.cart_change_url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            id: key,
            quantity: quantity,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(`Quantity update failed: ${response.status}`);
        }

        document.dispatchEvent(new CustomEvent('cart:updated'));
        return data;
      } catch (error) {
        console.error('Error updating quantity:', error);
      }
    }

    async removeItem(key) {
      try {
        const response = await fetch(window.routes.cart_change_url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            id: key,
            quantity: 0,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(`Remove item failed: ${response.status}`);
        }

        document.dispatchEvent(new CustomEvent('cart:updated'));
        return data;
      } catch (error) {
        console.error('Error removing item:', error);
      }
    }

    async updateCartCount() {
      try {
        const response = await fetch(`${window.routes.cart_url}.js`, {
          headers: {
            Accept: 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Cart count fetch failed: ${response.status}`);
        }

        const cart = await response.json();

        const cartCountElements = document.querySelectorAll('.cart-count');
        cartCountElements.forEach((el) => {
          el.textContent = cart.item_count;
          el.style.display = cart.item_count > 0 ? 'flex' : 'none';
        });
      } catch (error) {
        console.error('Error updating cart count:', error);
      }
    }

    formatMoney(cents) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(cents / 100);
    }

    escapeHtml(str) {
      return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    }
  }

  let cartInstance;

  document.addEventListener('DOMContentLoaded', function () {
    cartInstance = new Cart();
    window.cartInstance = cartInstance;
  });
})();
Also make sure your checkout button HTML looks like this:

<button type="button" class="cart-checkout-btn">
  Checkout
</button>
Or if it is an anchor:

<a href="/cart/checkout" class="cart-checkout-btn">Checkout</a>
The important part is that this script now intercepts the click and sends the customer to:

/cart/checkout
One more thing: if /cart/checkout still 404s after this change, the problem is no longer this JS. Then the issue is usually one of these:

the store is not using a valid Shopify checkout route in that environment

a custom proxy/app is interfering

the theme/snippet has another button layered over the real one

the store preview/domain setup is broken

If you paste your cart-drawer snippet too, I’ll rewrite that part so the whole drawer is aligned with this script.




