let mycartbutton = document.querySelector(".cart-button");
let closeBtn = document.querySelector(".close-cart");
let mycart = document.querySelector(".cart");

mycartbutton.addEventListener("click", function() {
  mycart.classList.toggle("hide-cart");
});

closeBtn.addEventListener("click", function() {
  mycart.classList.add("hide-cart");
});