// Hamburger for mobile nav:
const menuToggle = document.getElementById("menuToggle");
const dropdownMenu = document.getElementById("dropdownMenu");

menuToggle.addEventListener("click", function (event) {
  event.stopPropagation();
  dropdownMenu.classList.toggle("show");
  menuToggle.classList.toggle("active");
});

document.addEventListener("click", function (e) {
  if (!menuToggle.contains(e.target) && !dropdownMenu.contains(e.target)) {
    dropdownMenu.classList.remove("show");
    menuToggle.classList.remove("active");
  }
});

// Gallery modal logic:
const images = document.querySelectorAll(".gallery-img");
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-img");
const modalClose = document.getElementById("modal-close");

images.forEach((img) => {
  img.addEventListener("click", function () {
    modalImg.src = img.src;
    modal.classList.add("show");
  });
});

modalClose.addEventListener("click", function () {
  modal.classList.remove("show");
  modalImg.src = "";
});
modal.addEventListener("click", function (e) {
  // If clicked outside image, close modal
  if (e.target === modal) {
    modal.classList.remove("show");
    modalImg.src = "";
  }
});
