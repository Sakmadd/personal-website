const navbarHandler = () => {
  const arrowButton = document.getElementById('nav-arrow-button')
  const navigation = document.querySelector('.navigation')
  navigation.classList.toggle('active')
  arrowButton.classList.toggle('nav-arrow-active')
  
}

const arrowButton = document.getElementById('nav-arrow-button').addEventListener('click', navbarHandler)