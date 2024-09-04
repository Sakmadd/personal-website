
class Testimony {
  constructor(image, ratings, description, name) {
      this.image = image;
      this.ratings = this.convertRatings(ratings);
      this.description = description;
      this.name = name;
  }
  getHtml() {
      return `
      <div class="testimonial-card">
          <div class="testimonial-card__image">
              <img src="${this.image}" alt="customer">
          </div>
          <p class="testimonial-card__ratings" star="${this.ratings}">${this.ratings}</p>
          <p class="testimonial-card__description">${this.description}</p>
          <h2 class="testimonial-card__customer-name">${this.name}</h2>
      </div>
      `;
  }

  convertRatings(ratings) {
      if (ratings < 1 || ratings > 5) {
          return "no rating";
      }
      return '⭐'.repeat(ratings);
  }
}

const testimonial1 = new Testimony(
  "/assets/profile1.jpeg",
  5,
  "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  "Rizki Anwar"
);
const testimonial2 = new Testimony(
  "/assets/profile2.jpeg",
  1,
  "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  "Rahma Dewi"
);
const testimonial3 = new Testimony(
  "/assets/profile3.jpeg",
  3,
  "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  "Raju Kareem"
);
const testimonial4= new Testimony(
  "/assets/profile2.jpeg",
  2,
  "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  "Rahma Dewi"
);
const testimonial5 = new Testimony(
  "/assets/profile1.jpeg",
  4,
  "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  "Rizki Anwar"
);

const testimonials = [testimonial1, testimonial2, testimonial3,testimonial4,testimonial5];
function createRatingFilter(rating) {
  return function(testimonial) {
      if (rating === 'all') {
          return true;
      }
      const starRating = testimonial.querySelector('.testimonial-card__ratings').getAttribute('star').length;
      return starRating === parseInt(rating);
  };
}

function renderTestimonials(filterFunction) {
  const container = document.querySelector('.testimonial-container');
  container.innerHTML = ''; // Clear previous content
  testimonials.forEach(testimonial => {
      const testimonialHtml = document.createElement('div');
      testimonialHtml.innerHTML = testimonial.getHtml();
      if (filterFunction(testimonialHtml)) {
          container.appendChild(testimonialHtml.firstElementChild);
      }
  });
}

document.querySelectorAll('.rating-buttons button').forEach(button => {
  button.addEventListener('click', function() {
      document.querySelectorAll('.rating-buttons button').forEach(btn => {
          btn.classList.remove('active');
      });

      this.classList.add('active');

      const rating = this.getAttribute('data-rating');
      const filterFunction = createRatingFilter(rating);
      renderTestimonials(filterFunction);
  });
});

document.querySelector('.rating-buttons button[data-rating="all"]').classList.add('active');
renderTestimonials(() => true);
