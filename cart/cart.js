function readCart() {
  return JSON.parse(localStorage.getItem("jana_cart_items") || "[]");
}
function writeCart(cart) {
  localStorage.setItem("jana_cart_items", JSON.stringify(cart));
}

function renderCart() {
  const cart = readCart();
  const cartList = document.getElementById("cartList");
  const cartBadge = document.getElementById("cartBadgeHeader");
  if (cart.length === 0) {
    cartList.innerHTML =
      '<p style="font-size:1.15rem;">Vaša korpa je prazna.</p>';
    if (cartBadge) cartBadge.textContent = "";
    return;
  }
  cartList.innerHTML = cart
    .map(
      (item, idx) => `
    <div class="cart-item">
      <img src="${item.img}" class="cart-item-img" alt="${item.model}"/>
      <div class="cart-item-details">
        <div class="cart-item-title">${item.model}</div>
        <div class="cart-item-opts">
          Boja: <span>${
            item.color[0].toUpperCase() + item.color.slice(1)
          }</span>
          ${item.belt ? `&nbsp;| Dužina kaiša: <span>${item.belt}</span>` : ""}
        </div>
        <div class="cart-item-price">${item.price}</div>
      </div>
      <button class="remove-btn" onclick="removeFromCart(${idx})">Ukloni</button>
    </div>
  `
    )
    .join("");
  if (cartBadge) cartBadge.textContent = cart.length;
}

window.removeFromCart = function (idx) {
  const cart = readCart();
  cart.splice(idx, 1);
  writeCart(cart);
  renderCart();
};

document.getElementById("checkoutBtn").onclick = function () {
  window.location.href = "/placanje/placanje.html";
};

renderCart();
