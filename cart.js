let closeBtn = document.querySelector(".close-cart");

closeBtn.addEventListener("click", function() {
  let mycart = document.querySelector(".cart");
  mycart.classList.add("hide-cart");
});