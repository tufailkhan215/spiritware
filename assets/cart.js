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