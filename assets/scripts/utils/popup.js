document.addEventListener('DOMContentLoaded', () => {
    const popup = document.querySelector('.popup');
    const form = document.querySelector('.auth-form');
  
    const offset = 170; 
    const elementPosition = form.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - offset;
  
    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth' 
    });
    
    if (popup) {
        setTimeout(() => {
            popup.classList.add('popup-hidden');
        }, 2500);
    }
  
  });
