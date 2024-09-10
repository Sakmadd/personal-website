document.addEventListener('DOMContentLoaded', function() {
  var navbar = document.getElementById("navigation-bar");
  var sticky = navbar.offsetTop;

  window.onscroll = function() {
    if (window.location.pathname !== '/contact') {
      if (window.scrollY >= sticky) {
        navbar.classList.add("sticky");
      } else {
        navbar.classList.remove("sticky");
      }
    }
  };
});

const navbarHandler = () => {
  const arrowButton = document.getElementById('nav-arrow-button')
  const navigation = document.querySelector('.navigation')
  navigation.classList.toggle('active')
  arrowButton.classList.toggle('nav-arrow-active')
  
}

const arrowButton = document.getElementById('nav-arrow-button').addEventListener('click', navbarHandler)