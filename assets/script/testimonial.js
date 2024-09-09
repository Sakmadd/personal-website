class Testimony {
  constructor(image, rating, description, name) {
      this.image = image;
      this.ratings = this.convertRatings(rating);
      this.description = description;
      this.name = name;
  }

  getHtml() {
      return `
      <div class="testimonial-card">
          <div class="testimonial-card__image">
              <img src="${this.image}" alt="customer">
          </div>
          <p class="testimonial-card__ratings" star="${this.ratings.length}">${this.ratings}</p>
          <p class="testimonial-card__description">${this.description}</p>
          <h2 class="testimonial-card__customer-name">${this.name}</h2>
      </div>
      `;
  }

  convertRatings(rating) {
      if (rating < 1 || rating > 5) {
          return "no rating";
      }
      return '⭐'.repeat(rating);
  }
}

async function fetchTestimonials() {
  try {
      const response = await fetch('https://api.npoint.io/ef4a1292c6548975904a');
      const data = await response.json();

      console.log('Fetched data:', data);

      return data.map(item => new Testimony(item.image, item.rating, item.description, item.name));
  } catch (error) {
      console.error('Error fetching testimonials:', error);
      return [];
  }
}

function createRatingFilter(rating) {
  return function(testimonial) {
      if (rating === 'all') {
          return true;
      }
      const starRating = testimonial.querySelector('.testimonial-card__ratings').getAttribute('star');
      return parseInt(starRating) === parseInt(rating);
  };
}

function renderTestimonials(filterFunction, testimonials) {
  const container = document.querySelector('.testimonial-container');

  if (!container) {
      console.error('Container element not found!');
      return;
  }

  container.innerHTML = ''; 
  testimonials.forEach(testimonial => {
      const testimonialHtml = document.createElement('div');
      testimonialHtml.innerHTML = testimonial.getHtml();
      if (filterFunction(testimonialHtml)) {
          container.appendChild(testimonialHtml.firstElementChild);
      }
  });
}

document.querySelectorAll('.rating-buttons button').forEach(button => {
  button.addEventListener('click', async function() {
      document.querySelectorAll('.rating-buttons button').forEach(btn => {
          btn.classList.remove('active');
      });

      this.classList.add('active');

      const rating = this.getAttribute('data-rating');
      const testimonials = await fetchTestimonials();
      const filterFunction = createRatingFilter(rating);
      renderTestimonials(filterFunction, testimonials);
  });
});

async function init() {
  const testimonials = await fetchTestimonials();
  document.querySelector('.rating-buttons button[data-rating="all"]').classList.add('active');
  renderTestimonials(() => true, testimonials);
}

init();
