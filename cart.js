document.addEventListener('DOMContentLoaded', () => {
  godUpdateCount();
  renderCart();

  function renderCart() {
    const root = document.getElementById('cart-content');
    const cart = godReadCart();

    if (!cart.length) {
      root.innerHTML = `
        <div class="empty-cart">
          <span>GD / 001</span>
          <h2>Your bag is<br><em>waiting.</em></h2>
          <p>You haven't added anything yet. Explore the collection and find your pieces.</p>
          <a class="lime-button" href="shop.html">Explore collection ↗</a>
        </div>`;
      return;
    }

    const lines = cart.map((item, i) => {
      const product = GOD_PRODUCTS.find(p => p.id === item.id);
      return `
        <article class="cart-line">
          <img src="${product ? godImage(product,item.color) : ''}" alt="${godEscape(item.name)}">
          <div class="line-info">
            <p class="product-type">${product ? product.type : 'GOD DESIGN'}</p>
            <h3>${godEscape(item.name)}</h3>
            <p>${godEscape(item.color)} / ${godEscape(item.size)}</p>
            <button class="remove-link" data-remove="${i}">REMOVE ×</button>
          </div>
          <div class="line-qty">
            <button data-minus="${i}" aria-label="Decrease quantity">−</button>
            <span>${item.qty}</span>
            <button data-plus="${i}" aria-label="Increase quantity">＋</button>
          </div>
          <strong class="request-price">PRICE<br>ON REQUEST</strong>
        </article>`;
    }).join('');

    const itemCount = cart.reduce((total, item) => total + item.qty, 0);
    root.innerHTML = `
      <div class="cart-layout">
        <div class="cart-lines">${lines}</div>
        <aside class="cart-summary">
          <p class="eyebrow">ORDER OVERVIEW</p>
          <div class="summary-row"><span>Items</span><strong>${itemCount}</strong></div>
          <div class="summary-row"><span>Product pricing</span><strong>To be confirmed</strong></div>
          <div class="summary-row"><span>Delivery</span><strong>To be confirmed</strong></div>
          <div class="summary-total"><span>TOTAL</span><strong>Price on request</strong></div>
          <p class="summary-note">Our team will confirm your final price and delivery fee on WhatsApp.</p>
          <a class="lime-button full" href="checkout.html">Continue to checkout <span>↗</span></a>
        </aside>
      </div>`;

    root.querySelectorAll('[data-remove]').forEach(button => {
      button.addEventListener('click', () => {
        const updated = godReadCart();
        updated.splice(Number(button.dataset.remove), 1);
        godSaveCart(updated);
        renderCart();
        godToast('Item removed');
      });
    });

    root.querySelectorAll('[data-plus]').forEach(button => {
      button.addEventListener('click', () => {
        const updated = godReadCart();
        updated[Number(button.dataset.plus)].qty++;
        godSaveCart(updated);
        renderCart();
      });
    });

    root.querySelectorAll('[data-minus]').forEach(button => {
      button.addEventListener('click', () => {
        const updated = godReadCart();
        const index = Number(button.dataset.minus);
        updated[index].qty--;
        if (updated[index].qty <= 0) updated.splice(index, 1);
        godSaveCart(updated);
        renderCart();
      });
    });
  }
});
