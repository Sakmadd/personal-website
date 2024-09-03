window.onscroll = function() {myFunction()};
var navbar = document.getElementById("navigation-bar");
var sticky = navbar.offsetTop;
function myFunction() {
  if (window.scrollY >= sticky) {
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky");
  }
}

