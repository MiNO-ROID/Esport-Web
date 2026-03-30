const cart = [];

const cartButton = document.getElementById("cartButton");
const cartCount = document.getElementById("cartCount");
const cartPanel = document.getElementById("cartPanel");
const closeCart = document.getElementById("closeCart");
const cartOverlay = document.getElementById("cartOverlay");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const addToCartButtons = document.querySelectorAll(".add-to-cart");

function openCart() {
  cartPanel.classList.add("open");
  cartOverlay.classList.add("active");
}

function closeCartPanel() {
  cartPanel.classList.remove("open");
  cartOverlay.classList.remove("active");
}

function updateCartCount() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = totalItems;
}

function updateCartTotal() {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  cartTotal.textContent = total.toFixed(2);
}

function renderCart() {
  if (cart.length === 0) {
    cartItems.innerHTML = `<p class="empty-cart">Your cart is empty.</p>`;
    updateCartCount();
    updateCartTotal();
    return;
  }

  cartItems.innerHTML = cart
    .map(
      (item) => `
        <div class="cart-item">
          <div class="cart-item-top">
            <h4>${item.name}</h4>
            <div class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
          </div>

          <div class="cart-controls">
            <div class="qty-controls">
              <button class="qty-btn" onclick="changeQuantity('${item.name}', -1)">-</button>
              <span>${item.quantity}</span>
              <button class="qty-btn" onclick="changeQuantity('${item.name}', 1)">+</button>
            </div>

            <button class="remove-btn" onclick="removeItem('${item.name}')">Remove</button>
          </div>
        </div>
      `
    )
    .join("");

  updateCartCount();
  updateCartTotal();
}

function addToCart(name, price) {
  const existingItem = cart.find((item) => item.name === name);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      name: name,
      price: price,
      quantity: 1
    });
  }

  renderCart();
  openCart();
}

function changeQuantity(name, change) {
  const item = cart.find((product) => product.name === name);
  if (!item) return;

  item.quantity += change;

  if (item.quantity <= 0) {
    removeItem(name);
    return;
  }

  renderCart();
}

function removeItem(name) {
  const itemIndex = cart.findIndex((item) => item.name === name);
  if (itemIndex !== -1) {
    cart.splice(itemIndex, 1);
  }

  renderCart();
}

addToCartButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const name = button.dataset.name;
    const price = Number(button.dataset.price);
    addToCart(name, price);
  });
});

cartButton.addEventListener("click", openCart);
closeCart.addEventListener("click", closeCartPanel);
cartOverlay.addEventListener("click", closeCartPanel);

renderCart();

window.changeQuantity = changeQuantity;
window.removeItem = removeItem;