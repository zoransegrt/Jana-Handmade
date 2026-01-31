// Header menu toggle
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

// Mini gallery modal logic for Home page
const miniImages = document.querySelectorAll(".mini-gallery-img");
const miniModal = document.getElementById("miniModal");
const miniModalImg = document.getElementById("miniModalImg");
const miniModalClose = document.getElementById("miniModalClose");

miniImages.forEach((img) => {
  img.addEventListener("click", function () {
    miniModalImg.src = img.src;
    miniModal.classList.add("show");
  });
});
miniModalClose.addEventListener("click", function () {
  miniModal.classList.remove("show");
  miniModalImg.src = "";
});
miniModal.addEventListener("click", function (e) {
  if (e.target === miniModal) {
    miniModal.classList.remove("show");
    miniModalImg.src = "";
  }
});
