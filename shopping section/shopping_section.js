const bagData = {
  kyana: {
    title: "Kyana",
    desc: "Elegantan izbor za svaki dan. Ručno izrađena torba od kvalitetnih materijala, dostupna u četiri boje i sa podesivim kaišem.",
    price: "€40",
    images: {
      beige: "/img/kyana/ky_beige.png",
      burgundy: "/img/kyana/ky_red.png",
      black: "/img/kyana/ky_black.png",
      tiger: "/img/kyana/ky_tiger.png",
    },
  },
  lyra: {
    title: "Lyra",
    desc: "Moderan dizajn i funkcionalnost u jednom. Lyra torba je savršena za urbani stil i dolazi u nijansama koje dopunjuju svaku kombinaciju.",
    price: "€35",
    images: {
      beige: "/img/lyra/ly_beige.png",
      burgundy: "/img/lyra/ly_red.png",
      black: "/img/lyra/ly_black.png",
      tiger: "/img/lyra/ly_tiger.png",
    },
  },
};

function getBagType() {
  const params = new URLSearchParams(window.location.search);
  const bag = params.get("bag");
  return bag && bagData[bag] ? bag : "kyana";
}
function getBagColor(bagObj) {
  const params = new URLSearchParams(window.location.search);
  const color = params.get("color");
  return color && bagObj.images[color] ? color : "beige";
}

const bagType = getBagType();
const bagObj = bagData[bagType];
const bagImg = document.getElementById("bagImg");

// Hide belt option if Lyra
const beltBlock = document.getElementById("beltBlock");
if (beltBlock) {
  beltBlock.style.display = bagType === "lyra" ? "none" : "";
}

document.getElementById("bagTitle").textContent = bagObj.title;
document.getElementById("bagDesc").textContent = bagObj.desc;
document.getElementById("bagPrice").textContent = bagObj.price;

// --- Set color on load ---
const defaultColor = getBagColor(bagObj);
bagImg.src = bagObj.images[defaultColor];

document.querySelectorAll(".color-btn").forEach((btn) => {
  if (btn.getAttribute("data-color") === defaultColor) {
    btn.classList.add("selected");
  } else {
    btn.classList.remove("selected");
  }
});

// --- Belt selection ---
document.querySelectorAll(".belt-btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    document
      .querySelectorAll(".belt-btn")
      .forEach((el) => el.classList.remove("selected"));
    btn.classList.add("selected");
  });
});

// --- Color picker switches image ---
document.querySelectorAll(".color-btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    document
      .querySelectorAll(".color-btn")
      .forEach((el) => el.classList.remove("selected"));
    btn.classList.add("selected");
    const colorKey = btn.getAttribute("data-color");
    if (bagObj.images[colorKey]) {
      bagImg.src = bagObj.images[colorKey];
    }
  });
});

// --- Add to cart and update badge --- //
function addToCart() {
  const selectedColor = document
    .querySelector(".color-btn.selected")
    .getAttribute("data-color");
  let selectedBelt = "";
  if (bagType !== "lyra") {
    selectedBelt = document
      .querySelector(".belt-btn.selected")
      .textContent.trim();
  }
  const item = {
    model: bagObj.title,
    desc: bagObj.desc,
    price: bagObj.price,
    color: selectedColor,
    belt: selectedBelt,
    img: bagObj.images[selectedColor],
  };
  const cart = JSON.parse(localStorage.getItem("jana_cart_items") || "[]");
  cart.push(item);
  localStorage.setItem("jana_cart_items", JSON.stringify(cart));
  updateCartBadge(); // immediate badge update
  alert("Proizvod dodat u korpu!");
}

document.querySelector(".order-btn").addEventListener("click", addToCart);

function updateCartBadge() {
  const cart = JSON.parse(localStorage.getItem("jana_cart_items") || "[]");
  let badge =
    document.getElementById("cartBadgeHeader") ||
    document.querySelector(".cart-btn .cart-badge");
  if (badge) {
    badge.textContent = cart.length > 0 ? cart.length : "";
  }
}
updateCartBadge();
